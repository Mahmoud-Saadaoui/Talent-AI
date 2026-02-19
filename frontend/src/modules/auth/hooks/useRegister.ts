import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RegisterData } from "../types";

const url = "http://localhost:3000/api/v1/auth/register"

const registerApi = async (data: RegisterData) => {
  try {
    const res = await axios.post(url, data)
    return res.data
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterData) => registerApi(data),
  });
};