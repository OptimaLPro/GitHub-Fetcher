import { SearchProps } from "@/types/search";
import axios from "axios";

export const fetchRepositories = async ({
  page,
  perPage,
  stars,
  query,
  order,
}: SearchProps) => {
  const response = await axios.get(`/api/repositories`, {
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

export const fetchRepositoryByID = async (id: number) => {
  try {
    const response = await axios(`/api/repositories/` + id);
    return response.data;
  } catch (error) {
    console.error("Error fetching repository by ID:", error);
    throw error;
  }
};
