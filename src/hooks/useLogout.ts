// hooks/useLogout.ts
import { useNavigate } from "@tanstack/react-router";
import { authClient } from "#/features/auth/auth-client";

export function useLogout() {
  const navigate = useNavigate();

  return async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess() {
          navigate({ to: '/user/login' });
        }
      }
    });
  };
}