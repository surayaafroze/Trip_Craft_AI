import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";

// Item Hooks
export const useItems = (params: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["items", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value) searchParams.append(key, String(value));
      });
      return fetchApi(`/api/items?${searchParams.toString()}`);
    }
  });
};

export const useItem = (id: string) => {
  return useQuery({
    queryKey: ["item", id],
    queryFn: () => fetchApi(`/api/items/${id}`),
    enabled: !!id
  });
};

export const useRelatedItems = (id: string) => {
  return useQuery({
    queryKey: ["related-items", id],
    queryFn: () => fetchApi(`/api/items/${id}/related`),
    enabled: !!id
  });
};

export const useMyItems = () => {
  return useQuery({
    queryKey: ["my-items"],
    queryFn: () => fetchApi(`/api/items/mine`)
  });
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => fetchApi("/api/items", {
      method: "POST",
      body: JSON.stringify(data)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["my-items"] });
    }
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetchApi(`/api/items/${id}`, {
      method: "DELETE"
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["my-items"] });
    }
  });
};

// Review Hooks
export const useReviews = (destinationId: string) => {
  return useQuery({
    queryKey: ["reviews", destinationId],
    queryFn: () => fetchApi(`/api/items/${destinationId}/reviews`),
    enabled: !!destinationId
  });
};

export const useCreateReview = (destinationId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => fetchApi(`/api/items/${destinationId}/reviews`, {
      method: "POST",
      body: JSON.stringify(data)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", destinationId] });
      queryClient.invalidateQueries({ queryKey: ["item", destinationId] }); // Refresh rating
    }
  });
};
