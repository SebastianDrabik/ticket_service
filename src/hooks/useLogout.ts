// hooks/useLogout.ts
import { useNavigate } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";

export function useLogout() {
  const navigate = useNavigate();

  return async () => {
    await authClient.signOut();
    navigate({ to: '/user/login' });
  };
}