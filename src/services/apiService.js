import axios from "axios";

export const apiService = axios.create({
  baseURL: "https://www.nrb.org.np/api/forex/v1",
  headers: {
    "Content-type": "application/json",
  },
});
