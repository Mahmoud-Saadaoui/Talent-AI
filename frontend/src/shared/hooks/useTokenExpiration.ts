import { useEffect, useState } from "react";

interface JwtPayload {
  exp?: number;
}

export const useTokenExpiration = (
  token: string | undefined,
  onExpire: () => void
) => {
  const [isExpired, setIsExpired] = useState<boolean>(false);

  useEffect(() => {
    if (!token) {
      setIsExpired(true);
      return;
    }

    try {
      const tokenParts = token.split(".");
      if (tokenParts.length !== 3) throw new Error("Invalid token format");

      const decoded: JwtPayload = JSON.parse(atob(tokenParts[1]));

      if (!decoded.exp) throw new Error("Token has no expiration");

      const expired = decoded.exp * 1000 < Date.now();
      setIsExpired(expired);

      if (expired) {
        onExpire();
      }
    } catch (error) {
      console.error("Invalid token:", error);
      setIsExpired(true);
      onExpire();
    }
  }, [token, onExpire]);

  return isExpired;
};