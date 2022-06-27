import axios from "axios";
import { AppConfig } from "../config/app-config";

export const instance = axios.create({
  baseURL: AppConfig.BASE_URL,
});

export const indexAPI = {
  auth(data: any) {
    return instance.post("/auth", data);
  },
  getInfo() {
    return instance.get("/");
  },
  getWorks() {
    return instance.get("/works");
  },
  updateInfo(data: any) {
    return instance.post("/info", data, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  },
  addWork(data: any) {
    return instance.post("/works", data, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  },
  deleteWork(id: string) {
    return instance.delete(`/works?id=${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  },
};
