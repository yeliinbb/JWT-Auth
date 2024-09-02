import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

export const authApi = axios.create({
  baseURL: baseURL,
});

// axios instance 추가
