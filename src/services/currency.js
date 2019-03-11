import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Fetch currencies
export const fetchcurrencies = async (data, successHandler, errorHandler) => {
  try {
    const response = await axios.get(`${API_URL}/currencies`);

    successHandler(response);
  } catch (error) {
    errorHandler(error);
  }
};

// Fetch conversion rate
export const fetchRate = async (data, successHandler, errorHandler) => {
  try {
    const response = await axios.get(`${API_URL}/exchange`, {
      params: data
    });

    successHandler(response);
  } catch (error) {
    errorHandler(error);
  }
};
