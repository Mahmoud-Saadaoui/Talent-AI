import { api } from "../../../shared/config";
import { useQuery } from "@tanstack/react-query";

const verifyEmailApi = async (userId: string, token: string) => {
  try {
    const res = await api.get(`/auth/${userId}/verify/${token}`)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const useVerifyEmail = (userId?: string, token?: string) => {
  return useQuery({
    queryKey: ['verifyEmail', userId, token],
    queryFn: () => verifyEmailApi(userId!, token!),
    enabled: !!userId && !!token,
  });
};