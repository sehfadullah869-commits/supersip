import { Navigate } from "@tanstack/react-router";
import type React from "react";
import { useAuth } from "../../hooks/use-auth";
import { LoadingSpinner } from "../ui/LoadingSpinner";

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, isInitializing, isAdmin, isAdminLoading } =
    useAuth();

  if (isInitializing || isAdminLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoadingSpinner size="lg" message="Verifying access..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
