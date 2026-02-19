import axios from "axios";
import { LoginData } from "../types";
import { useMutation } from "@tanstack/react-query";

const url = "http://localhost:3000/api/v1/auth/login"

const loginApi = async (data: LoginData) => {
  try {
    const res = await axios.post(url, data)
    return res.data
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginData) => loginApi(data),
  });
};