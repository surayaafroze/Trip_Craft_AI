"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Loader2, Bot, User, BrainCircuit } from "lucide-react";

interface TripChatProps {
  tripId: string;
}

interface Message {
  id: string;
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  isStreaming?: boolean;
}

export default function TripChat({ tripId }: TripChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch initial history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/api/agent/chat/${tripId}/history`, {
          // Add auth headers if needed, but fetch might need withCredentials or explicit JWT
          // For Better Auth in client side, cookies are sent automatically if configured, or we can use the fetch wrapper.
        });
        
        // Using our API client to ensure auth headers are included
        const { fetchApi } = await import("@/lib/api");
        const historyRes = await fetchApi(`/agent/chat/${tripId}/history`);
        
        const formattedHistory = historyRes
          .filter((m: Record<string, unknown>) => m.role === "user" || m.role === "assistant")
          .map((m: Record<string, unknown>) => ({
            id: m._id,
            role: m.role,
            content: m.content || "",
          }));
        
        setMessages(formattedHistory);
      } catch (err) {
        console.error("Failed to load history", err);
      }
    };
    fetchHistory();
  }, [tripId]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeTool]);

  const handleSubmit = async (e?: React.FormEvent, textOverride?: string) => {
    e?.preventDefault();
    const text = textOverride || input;
    if (!text.trim() || isLoading) return;

    const newMsgId = crypto.randomUUID();
    setMessages(prev => [...prev, { id: newMsgId, role: "user", content: text }]);
    setInput("");
    setIsLoading(true);
    setActiveTool(null);

    const assistantMsgId = crypto.randomUUID();
    setMessages(prev => [...prev, { id: assistantMsgId, role: "assistant", content: "", isStreaming: true }]);

    try {
      // Let's actually use the api client to get the token or just send cookies.
      // Better-auth uses cookies by default (`better-auth.session_token`). We should include credentials: 'include'.
      const sseRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/api/agent/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Adding authorization from localstorage if JWT was used, else cookies handle it.
        },
        body: JSON.stringify({ tripId, message: text }),
        credentials: "include" 
      });

      if (!sseRes.body) throw new Error("No response body");

      const reader = sseRes.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let done = false;
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6);
              if (dataStr === '[DONE]') {
                done = true;
                break;
              }
              
              try {
                const data = JSON.parse(dataStr);
                if (data.type === "text") {
                  setMessages(prev => prev.map(m => 
                    m.id === assistantMsgId ? { ...m, content: m.content + data.content } : m
                  ));
                } else if (data.type === "tool_start") {
                  setActiveTool(`Running ${data.name}...`);
                } else if (data.type === "tool_end") {
                  setActiveTool(null);
                } else if (data.type === "error") {
                  console.error("Agent error:", data.error);
                }
              } catch {
                // Ignore parse errors on incomplete chunks if any
              }
            }
          }
        }
      }

      setMessages(prev => prev.map(m => 
        m.id === assistantMsgId ? { ...m, isStreaming: false } : m
      ));
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
      setActiveTool(null);
    }
  };

  const suggestions = [
    "Find cheap hotels nearby.",
    "Add a museum visit to Day 1.",
    "Recalculate my total budget."
  ];

  return (
    <div className="flex flex-col h-[600px] bg-white border rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-gray-50 flex items-center gap-2">
        <BrainCircuit className="text-purple-600" />
        <h3 className="font-bold text-gray-900">Trip Agent AI</h3>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !isLoading && (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <Bot size={48} className="mb-4 text-gray-300" />
            <p>Hi! I am your AI travel agent.</p>
            <p className="text-sm">Ask me to add destinations or update your itinerary.</p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                <Bot size={16} />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
              msg.role === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-100 text-gray-800 rounded-bl-none"
            }`}>
              <div className="whitespace-pre-wrap">{msg.content}</div>
              {msg.isStreaming && <span className="inline-block w-2 h-4 ml-1 bg-purple-500 animate-pulse" />}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center flex-shrink-0">
                <User size={16} />
              </div>
            )}
          </div>
        ))}
        
        {activeTool && (
          <div className="flex gap-3 items-center text-sm text-purple-600 font-medium animate-pulse">
            <Loader2 size={16} className="animate-spin" />
            {activeTool}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-white">
        <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
          {suggestions.map((s, i) => (
            <button 
              key={i}
              onClick={() => handleSubmit(undefined, s)}
              disabled={isLoading}
              className="whitespace-nowrap px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Ask AI to plan your trip..."
            className="flex-grow px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="-ml-0.5" />}
          </button>
        </form>
      </div>
    </div>
  );
}
