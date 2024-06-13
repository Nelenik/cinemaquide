import { AuthInfo, RegData, UserProfile, getProfile, login, logout, register } from "@/api/User";
import { UseMutateFunction, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, createContext } from "react";
import { NOOP } from "@/utils";

export const AuthContext = createContext<AuthContext>({
  isAuthorized: false,
  isLoading: false,
  isError: false,
  profile: null,
  mutateLogin: NOOP,
  mutateLogout: NOOP,
  mutateRegister: NOOP
});

interface AuthContext {
  isAuthorized: boolean,
  isLoading: boolean,
  isError: boolean,
  profile: UserProfile | null,
  mutateRegister: UseMutateFunction<void, Error, RegData, unknown>,
  mutateLogin: UseMutateFunction<void, Error, AuthInfo, unknown>,
  mutateLogout: UseMutateFunction<void, Error, void, unknown>,
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const queryClient = useQueryClient()

  const profileQuery = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: getProfile,
    retry: false,
  })


  const registerMutation = useMutation({
    mutationFn: register
  })

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
    }
  })

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
    }
  })
  const value: AuthContext = {
    isAuthorized: profileQuery.isSuccess,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    profile: profileQuery.data || null,
    mutateRegister: registerMutation.mutate,
    mutateLogin: loginMutation.mutate,
    mutateLogout: logoutMutation.mutate
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )

}