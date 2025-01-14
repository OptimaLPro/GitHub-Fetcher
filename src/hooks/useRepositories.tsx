import { fetchRepositories } from "@/api/repositories";
import { useQuery } from "@tanstack/react-query";

const useRepositories = (
  page = 1,
  perPage = 9,
  stars = 1,
  query = "",
  order = "desc"
) =>
  useQuery({
    queryKey: ["repositories", page, perPage, stars, query, order],
    queryFn: () => fetchRepositories({ page, perPage, stars, query, order }),
    retry: 0,
    staleTime: 300000, // 5 minutes
    refetchOnWindowFocus: false,
  });

export default useRepositories;
