import { useMutation } from "@tanstack/react-query";
import { RegisterData } from "../types";
import { api } from "../../../shared/config";

const registerApi = async (data: RegisterData) => {
  try {
    const res = await api.post('/auth/register', data)
    return res.data
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterData) => registerApi(data),
  });
};