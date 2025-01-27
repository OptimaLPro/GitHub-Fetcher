import axios from "axios";

export const fetchFavorites = async () => {
  try {
    const response = await axios.get(`/api/users/favorites`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
};

export const toggleFavorite = async (repo: any, isFavorite: boolean) => {
  try {
    if (isFavorite) {
      await axios.delete(`/api/users/favorites`, {
        data: { id: repo.id },
        withCredentials: true,
      });
    } else {
      await axios.post(
        `/api/users/favorites`,
        { ...repo },
        { withCredentials: true }
      );
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    throw error;
  }
};
