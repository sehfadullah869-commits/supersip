import { Navigate } from "@tanstack/react-router";
import type React from "react";
import { useAuth } from "../../hooks/use-auth";
import { LoadingSpinner } from "../ui/LoadingSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoadingSpinner size="lg" message="Loading your account..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
