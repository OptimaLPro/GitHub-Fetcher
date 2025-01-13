import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchRepositories = async ({ page = 1, perPage = 10 }) => {
  const response = await axios.get("http://localhost:5000/api/repositories", {
    params: { page, per_page: perPage },
  });
  return response.data;
};

const useRepositories = (page: number, perPage: number) =>
  useQuery({
    queryKey: ["repositories", page, perPage],
    queryFn: () => fetchRepositories({ page, perPage }),
  });

export default useRepositories;
