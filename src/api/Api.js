import axios from "axios";
export const Api = axios.create({
  baseURL: "http://localhost:3000/",
  headers: { "Content-Type": "application/json" },
});
// "https://server-rhyy.onrender.com"
