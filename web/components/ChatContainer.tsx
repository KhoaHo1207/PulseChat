import assets, { messagesDummyData } from "@/public/assets/assets";
import { User } from "@/types/user.type";
import { timeFormatter } from "@/utils/format";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function ChatContainer({
  selectedUser,
  setSelectedUser,
}: {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
}) {
  const scrollEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollEndRef.current) {
      scrollEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return selectedUser ? (
    <div className="relative h-full overflow-scroll backdrop-blur-lg">
      {/* header */}
      <div className="mx-4 flex items-center gap-3 border-b border-stone-500 py-3">
        <Image
          src={assets.profile_martin}
          alt="profile"
          width={100}
          height={100}
          className="w-8 rounded-full"
        />
        <p className="flex flex-1 items-center gap-2 text-lg text-white">
          Martin Johnson{" "}
          <span className="size-2 rounded-full bg-green-500"></span>
        </p>
        <Image
          src={assets.arrow_icon}
          alt="arrow"
          width={100}
          height={100}
          className="max-w-7 md:hidden"
          onClick={() => setSelectedUser(null)}
        />
        <Image
          src={assets.help_icon}
          alt="help"
          width={100}
          height={100}
          className="max-w-5 max-md:hidden"
        />
      </div>
      {/* chat area */}
      <div className="flex h-[calc(100%-120px)] flex-col overflow-y-scroll p-3 pb-6">
        {messagesDummyData.map((message) => (
          <div
            key={message._id}
            className={`flex items-end justify-end gap-2 ${message.senderId !== "680f50e4f10f3cd28382ecf9" && "flex-row-reverse"}`}
          >
            {message.image ? (
              <Image
                src={message.image}
                alt="image"
                width={100}
                height={100}
                className="mb-8 max-w-[230px] overflow-hidden rounded-lg border border-gray-700"
              />
            ) : (
              <p
                className={`mb-8 max-w-[200px] rounded-lg bg-violet-500/30 p-2 font-light break-all text-white md:text-sm ${message.senderId === "680f50e4f10f3cd28382ecf9" ? "rounded-br-none" : "rounded-bl-none"}`}
              >
                {message.text}
              </p>
            )}

            <div className="text-center text-xs">
              <Image
                src={
                  message.senderId === "680f50e4f10f3cd28382ecf9"
                    ? assets.avatar_icon
                    : assets.profile_martin
                }
                alt="profile"
                width={100}
                height={100}
                className="w-7 rounded-full"
              />
              <p className="text-gray-500">
                {timeFormatter(message.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollEndRef}></div>
      </div>
      {/* Bottom Area */}

      <div className="absolute right-0 bottom-0 left-0 flex items-center gap-3 p-3">
        <div className="flex flex-1 items-center rounded-full bg-gray-100/12 px-3">
          <input
            type="text"
            placeholder="Send a message..."
            className="flex-1 rounded-lg border-none p-3 text-sm text-white placeholder-gray-400 outline-none"
          />
          <input
            type="file"
            id="upload"
            accept="image/png, image/jpeg"
            hidden
          />
          <label htmlFor="upload">
            <Image
              src={assets.gallery_icon}
              alt="gallery"
              width={100}
              height={100}
              className="mr-2 w-5 cursor-pointer"
            />
          </label>
        </div>
        <Image
          src={assets.send_button}
          alt="send"
          width={100}
          height={100}
          className="w-7 cursor-pointer"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 bg-white/10 text-gray-500 max-md:hidden">
      <Image
        src={assets.logo_icon}
        alt="logo"
        width={100}
        height={100}
        className="max-w-16"
      />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  );
}
