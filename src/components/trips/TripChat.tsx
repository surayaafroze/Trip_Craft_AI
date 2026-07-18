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
    <div className="flex flex-col h-[650px] bg-white rounded-3xl premium-shadow border border-gray-100 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ocean-400 via-purple-500 to-orange-400" />
      <div className="p-5 border-b border-gray-100 bg-white/50 backdrop-blur-md flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center shadow-sm">
          <BrainCircuit className="text-purple-600" size={20} />
        </div>
        <div>
          <h3 className="font-bold text-foreground tracking-tight">Trip Agent AI</h3>
          <p className="text-xs text-gray-400 font-medium">Always online</p>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-gray-50/30">
        {messages.length === 0 && !isLoading && (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-gray-300">
              <Bot size={40} />
            </div>
            <p className="font-bold text-gray-900 mb-1">Hi! I am your AI travel agent.</p>
            <p className="text-sm max-w-[200px] text-center leading-relaxed">Ask me to add destinations or update your itinerary.</p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm border border-purple-100/50 mt-auto">
                <Bot size={18} />
              </div>
            )}
            <div className={`max-w-[80%] px-5 py-3.5 shadow-sm ${
              msg.role === "user" ? "bg-gradient-to-r from-ocean-600 to-ocean-700 text-white rounded-2xl rounded-br-sm" : "bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-100"
            }`}>
              <div className="whitespace-pre-wrap text-[15px] leading-relaxed">{msg.content}</div>
              {msg.isStreaming && <span className="inline-block w-2 h-4 ml-1 bg-purple-500 animate-pulse rounded-full" />}
            </div>
            {msg.role === "user" && (
              <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-200 mt-auto">
                <User size={18} />
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

      <div className="p-5 border-t border-gray-100 bg-white">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {suggestions.map((s, i) => (
            <button 
              key={i}
              onClick={() => handleSubmit(undefined, s)}
              disabled={isLoading}
              className="whitespace-nowrap px-4 py-2 bg-gray-50 border border-gray-100 hover:border-purple-200 hover:bg-purple-50 text-gray-700 text-sm rounded-full transition-all disabled:opacity-50 font-medium"
            >
              {s}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-3 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Ask AI to plan your trip..."
            className="flex-grow pl-6 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 disabled:bg-gray-100 transition-all font-medium text-[15px]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 bottom-2 aspect-square bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full flex items-center justify-center hover:shadow-md disabled:opacity-50 transition-all"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="ml-0.5" />}
          </button>
        </form>
      </div>
    </div>
  );
}
