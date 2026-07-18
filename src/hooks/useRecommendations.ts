import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";

interface RecommendationParams {
  budget?: string;
  category?: string;
  region?: string;
  prompt?: string;
}

export const useRecommendations = (params: RecommendationParams) => {
  return useQuery({
    queryKey: ["recommendations", params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (params.budget) queryParams.append("budget", params.budget);
      if (params.category) queryParams.append("category", params.category);
      if (params.region) queryParams.append("region", params.region);
      if (params.prompt) queryParams.append("prompt", params.prompt);

      const qs = queryParams.toString();
      const response = await fetchApi(`/api/recommendations${qs ? `?${qs}` : ""}`);
      return response.data;
    },
    // Don't refetch on window focus to avoid unnecessary OpenAI API calls
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
};
