"use client";
import ChatContainer from "@/components/ChatContainer";
import RightSidebar from "@/components/RightSidebar";
import Sidebar from "@/components/Sidebar";
import { User } from "@/types/user.type";
import { useState } from "react";

export default function Home() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <main className="h-screen w-full border sm:px-[15%] sm:py-[5%]">
      <div
        className={`relative grid h-full grid-cols-1 overflow-hidden rounded-2xl border-2 border-gray-600 backdrop-blur-xl ${selectedUser ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]" : "md:grid-cols-2"}`}
      >
        <Sidebar
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        <ChatContainer
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        <RightSidebar selectedUser={selectedUser} />
      </div>
    </main>
  );
}
