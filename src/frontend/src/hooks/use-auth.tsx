import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";

export function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    loginStatus,
  } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { actor, isFetching: actorFetching } = useActor(createActor);

  const { data: isAdmin = false, isLoading: isAdminLoading } =
    useQuery<boolean>({
      queryKey: ["isCallerAdmin"],
      queryFn: async () => {
        if (!actor) return false;
        return actor.isCallerAdmin();
      },
      enabled: !!actor && !actorFetching && isAuthenticated,
      retry: false,
    });

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    clear();
    queryClient.clear();
  };

  const principal = identity?.getPrincipal();
  const principalStr = principal?.toString() ?? null;

  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    isAdmin,
    isAdminLoading,
    principal: principalStr,
    loginStatus,
    login: handleLogin,
    logout: handleLogout,
  };
}
