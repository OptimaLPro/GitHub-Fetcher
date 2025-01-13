import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MAX_STARS = 999999;

const fetchSearchedRepositories = async ({
  query = "",
  stars = MAX_STARS,
  page = 1,
  perPage = 10,
}) => {
  const response = await axios.get(
    "http://localhost:5000/api/repositories/search",
    {
      params: { query: query, stars: stars, page: page, per_page: perPage },
    }
  );
  console.log(response.data);
  return response.data;
};

const useSearch = (
  query: string,
  stars: number,
  page: number,
  perPage: number
) =>
  useQuery({
    queryKey: ["search", query, stars, page, perPage],
    queryFn: () => fetchSearchedRepositories({ query, stars, page, perPage }),
    retry: 0,
  });

export default useSearch;
