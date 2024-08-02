import axios from "axios";
export const Api = axios.create({
  baseURL: "https://server-rhyy.onrender.com",
  headers: { "Content-Type": "application/json" },
});
