import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";

export function useSession() {
  const isClient = typeof document !== "undefined";
  
  const query = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      if (!isClient) return { user: null };
      
      const tokenMatch = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
      if (!tokenMatch) {
        return { user: null };
      }
      return fetchApi("/api/auth/me");
    },
    retry: false,
    staleTime: 0, // Always refetch on mount to ensure auth state is accurate after redirects
    refetchOnWindowFocus: true, // Refetch when user comes back to tab
  });

  const tokenExists = isClient && !!document.cookie.match(new RegExp("(^| )token=([^;]+)"));
  const hasUser = query.data && query.data.user;

  return {
    data: hasUser ? { user: query.data.user } : null,
    isLoading: query.isLoading || (tokenExists && !hasUser),
    isError: query.isError,
    error: query.error,
  };
}
