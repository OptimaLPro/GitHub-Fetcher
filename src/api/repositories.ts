import { SearchProps } from "@/types/search";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchRepositories = async ({
  page,
  perPage,
  stars,
  query,
  order,
}: SearchProps) => {
  const response = await axios.get(`${API_BASE_URL}/api/repositories`, {
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
    const response = await axios(`${API_BASE_URL}/api/repositories/` + id);
    return response.data;
  } catch (error) {
    console.error("Error fetching language data:", error);
    throw error;
  }
};
