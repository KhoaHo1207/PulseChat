import assets, { messagesDummyData } from "@/public/assets/assets";
import { User } from "@/types/user.type";
import { dateFormatter } from "@/utils/format";
import Image from "next/image";

export default function ChatContainer({
  selectedUser,
  setSelectedUser,
}: {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
}) {
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
        {messagesDummyData.map((message, index) => (
          <div
            key={index}
            className={
              `flex items-end justify-end gap-2 ${message.senderId !== "680f50e4f10f3cd28382ecf9"}` &&
              "flex-row-reverse"
            }
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
                {dateFormatter(message.createdAt)}
              </p>
            </div>
          </div>
        ))}
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
