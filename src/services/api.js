import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function for GET requests
export const get = async (url, config) => {
  try {
    const response = await api.get(url, config);
    return response;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

const handleError = (error) => {
  alert(error)
  console.error('API call error:', error);
};

export default api;
