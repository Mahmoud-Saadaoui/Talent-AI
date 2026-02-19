import { LoginData } from "../types";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../shared/config";

const loginApi = async (data: LoginData) => {
  try {
    const res = await api.post('/auth/login', data)
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