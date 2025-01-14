import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchLanguageData = async () => {
  try {
    const response = await axios(`${API_BASE_URL}/api/charts/languages`);
    return response.data;
  } catch (error) {
    console.error("Error fetching language data:", error);
    throw error;
  }
};

export const fetchStarsData = async () => {
  try {
    const response = await axios(
      `${API_BASE_URL}/api/charts/stars-distribution`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stars data:", error);
    throw error;
  }
};

export const fetchTrendingData = async (per_page = 5, lastDate = "month") => {
  try {
    const response = await axios(
      `${API_BASE_URL}/api/charts/trending-repos`
    ,{
      params: {
        per_page: per_page,
        lastDate: lastDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching trending data:", error);
    throw error;
  }
};
