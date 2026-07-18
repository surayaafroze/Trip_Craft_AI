import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";

export const useChatHistory = (tripId: string) => {
  return useQuery({
    queryKey: ["chatHistory", tripId],
    queryFn: async () => {
      const res = await fetchApi(`/api/agent/chat/${tripId}/history`);
      return res;
    },
    enabled: !!tripId,
  });
};
