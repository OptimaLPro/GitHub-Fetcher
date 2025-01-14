import axios from "axios";

export const fetchLanguageData = async () => {
  try {
    const response = await axios("http://localhost:5000/api/charts/languages");
    return response.data;
  } catch (error) {
    console.error("Error fetching language data:", error);
    throw error;
  }
};

export const fetchStarsData = async () => {
  try {
    const response = await axios(
      "http://localhost:5000/api/charts/stars-distribution"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stars data:", error);
    throw error;
  }
};
