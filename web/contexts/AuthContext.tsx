"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { AuthService } from "@/services/auth.service";
import { SignInFormData, SignUpFormData } from "@/schemas/auth.schema";
import { User } from "@/types/user.type";
import { API_URL } from "@/config/axiosConfig";

type AuthContextType = {
  authUser: User | null;
  onlineUsers: string[];
  socket: Socket | null;
  isAuthLoading: boolean;
  signIn: (data: SignInFormData) => Promise<void>;
  signUp: (data: SignUpFormData) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  /* =========================
        CHECK AUTH
  ========================== */
  const checkAuth = async () => {
    try {
      const res = await AuthService.checkAuth();

      if (res.success) {
        setAuthUser(res.results);
        connectSocket(res.results);
      }
    } catch (err) {
      console.log("Not authenticated");
    } finally {
      setIsAuthLoading(false);
    }
  };

  /* =========================
        SOCKET
  ========================== */
  const connectSocket = (user: User) => {
    if (!user) return;

    const newSocket = io(API_URL, {
      query: { userId: user._id },
    });

    newSocket.on("getOnlineUsers", (userIds: string[]) => {
      setOnlineUsers(userIds);
    });

    setSocket(newSocket);
  };

  /* =========================
        SIGN IN
  ========================== */
  const signIn = async (data: SignInFormData) => {
    const res = await AuthService.signIn(data);

    if (res.success) {
      const { accessToken, refreshToken, user } = res.results;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setAuthUser(user);
      connectSocket(user);
    }
  };

  /* =========================
        SIGN UP
  ========================== */
  const signUp = async (data: SignUpFormData) => {
    await AuthService.signUp(data);
  };

  /* =========================
        SIGN OUT
  ========================== */
  const signOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setAuthUser(null);

    socket?.disconnect();
    setSocket(null);
  };

  /* =========================
        INIT
  ========================== */
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      checkAuth();
    } else {
      setIsAuthLoading(false);
    }
  }, [authUser]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        onlineUsers,
        socket,
        isAuthLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* =========================
        CUSTOM HOOK
========================== */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
