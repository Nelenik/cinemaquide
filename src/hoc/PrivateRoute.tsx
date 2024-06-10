import { Loader } from "@/components/Loader";
import { useAuth } from "@/hooks/useAuth"
import { FC } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode
}
export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthorized, isLoading } = useAuth();
  if (isLoading) return <Loader />
  return isAuthorized ? children : <Navigate to={'/'} replace />
}