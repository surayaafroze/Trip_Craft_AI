import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";

export const useTrips = () => {
  return useQuery({
    queryKey: ["trips"],
    queryFn: async () => {
      const res = await fetchApi("/api/trips");
      return res;
    },
  });
};

export const useTrip = (id: string) => {
  return useQuery({
    queryKey: ["trips", id],
    queryFn: async () => {
      const res = await fetchApi(`/api/trips/${id}`);
      return res;
    },
    enabled: !!id,
  });
};

export const useCreateTrip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { title: string; region: string; budgetTarget: number }) => {
      const res = await fetchApi("/api/trips", { method: "POST", body: JSON.stringify(data) });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
};

export const useDeleteTrip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetchApi(`/api/trips/${id}`, { method: "DELETE" });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
};
