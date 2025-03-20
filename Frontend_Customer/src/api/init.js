import axios from "axios";

const API_URL = "https://supplychain-fxgtbahbdjg2b9ch.francecentral-01.azurewebsites.net";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
