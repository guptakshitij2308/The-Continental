import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins.js";

export function useCabins() {
  const {
    data: cabins,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cabins"], // uniquely identifies the query data for caching
    queryFn: getCabins, // function needs to return a promise
  });

  return { isLoading, cabins, error };
}
