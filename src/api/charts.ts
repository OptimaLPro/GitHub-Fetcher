import axios from "axios";

export const fetchLanguageData = async () => {
  try {
    const response = await axios(`/api/charts/languages`);
    return response.data;
  } catch (error) {
    console.error("Error fetching language data:", error);
    throw error;
  }
};

export const fetchStarsData = async () => {
  try {
    const response = await axios(`/api/charts/stars-distribution`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stars data:", error);
    throw error;
  }
};

export const fetchTrendingData = async (per_page = 5, lastDate = "month") => {
  try {
    const response = await axios(`/api/charts/trending-repos`, {
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
