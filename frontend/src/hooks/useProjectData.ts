import { useQuery } from "@tanstack/react-query";
import { getProjectsRequest } from "../services/projects";

export const useProjectData = () => {
  const {
    data: projects = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjectsRequest(),
    // enabled: !!userId,
  });

  // // Add mutation
  // const addStockMutation = useMutation({
  //   mutationFn: addToPortfolio,
  //   onSuccess: (stock) => {
  //     queryClient.setQueryData<Stock[]>(["userStocks", userId], (old) => {
  //       if (!old) return [stock];
  //       if (old.some((s) => s.ticker === stock.ticker)) return old;
  //       return [...old, stock];
  //     });
  //   },
  // });

  // // Delete mutation
  // const deleteStockMutation = useMutation({
  //   mutationFn: removeUserStock,
  //   onSuccess: (_, id) => {
  //     queryClient.setQueryData<Stock[]>(["userStocks", userId], (old) =>
  //       old ? old.filter((s) => s.id.toString() !== id) : [],
  //     );
  //   },
  // });

  // const addStock = (ticker: string) => addStockMutation.mutate(ticker);
  // const removeStock = (id: string) => deleteStockMutation.mutate(id);
  return {
    projects,
    error,
    isLoading,
    // addStock,
    // removeStock,
    // addStockMutation,
    // deleteStockMutation,
  };
};
