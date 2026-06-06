import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading, hasRole } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Skeleton className="w-64 h-8" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!hasRole("admin") && !hasRole("editor")) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-destructive text-lg font-semibold">Brak uprawnień. Skontaktuj się z administratorem.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
