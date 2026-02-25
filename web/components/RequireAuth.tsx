"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

type RequireAuthProps = {
  children: ReactNode;
};

export default function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const { authUser, isAuthLoading } = useAuth();

  useEffect(() => {
    if (!isAuthLoading && !authUser) {
      toast.error("You are not authenticated");
      router.replace("/login");
    }
  }, [authUser, isAuthLoading, router]);

  if (isAuthLoading || !authUser) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-200">
        <p>Checking authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
}
