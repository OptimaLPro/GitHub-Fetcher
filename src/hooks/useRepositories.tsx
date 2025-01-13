import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SearchProps } from "@/types/search";

const fetchRepositories = async ({
  page,
  perPage,
  stars,
  query,
  order,
}: SearchProps) => {
  const response = await axios.get("http://localhost:5000/api/repositories", {
    params: {
      page: page,
      per_page: perPage,
      stars: stars,
      query: query,
      order: order,
    },
  });
  return response.data;
};

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
  });

export default useRepositories;
