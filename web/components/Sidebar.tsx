import Image from "next/image";
import { User } from "@/types/user.type";
import assets, { userDummyData } from "@/public/assets/assets";
import { useRouter } from "next/navigation";
export default function Sidebar({
  selectedUser,
  setSelectedUser,
}: {
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
}) {
  const router = useRouter();

  return (
    <div
      className={`h-full overflow-y-scroll rounded-r-xl bg-[#8185B2]/10 p-5 text-white ${selectedUser ? "max-md:hidden" : ""}`}
    >
      <div className="pb-5">
        <div className="flex items-center justify-between">
          <Image
            src={assets.logo}
            alt="logo"
            width={500}
            height={500}
            className="max-w-40"
          />
          <div className="group relative py-2">
            <Image
              src={assets.menu_icon}
              alt="menu"
              width={100}
              height={100}
              className="max-w-5 cursor-pointer"
            />
            <div className="absolute top-full right-0 z-20 hidden w-32 rounded-md border border-gray-600 bg-[#282142] p-2 text-gray-100 group-hover:block">
              <p
                className="cursor-pointer rounded-md p-2 text-sm hover:bg-purple-900/50"
                onClick={() => router.push("/profile")}
              >
                Edit Profile
              </p>
              <hr className="my-1.5 border-t border-gray-500" />
              <p className="cursor-pointer rounded-md p-2 text-sm hover:bg-purple-900/50">
                Logout
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-full bg-[#282142] px-4 py-3">
          <Image
            src={assets.search_icon}
            alt="search"
            width={100}
            height={100}
            className="w-3"
          />
          <input
            type="text"
            className="flex-1 border-none bg-transparent text-xs text-white placeholder-[#c8c8c8] outline-none"
            placeholder="Search Users..."
          />
        </div>
      </div>

      <div className="flex flex-col">
        {userDummyData.map((user, index) => (
          <div
            key={index}
            className={`relative flex cursor-pointer items-center gap-2 rounded p-2 pl-4 max-sm:text-sm ${selectedUser?._id === user._id && "bg-[#282142]/50"}`}
            onClick={() => {
              setSelectedUser(user);
            }}
          >
            <Image
              src={user?.profilePic || assets.avatar_icon}
              alt="user"
              width={100}
              height={100}
              className="aspect-square w-[25px] rounded-full"
            />
            <div className="flex flex-col leading-5">
              <p>{user.fullName}</p>
              {index < 3 ? (
                <span className="text-xs text-green-500">Online</span>
              ) : (
                <span className="text-xs text-neutral-400">Offline</span>
              )}
            </div>
            {index > 2 && (
              <p className="absolute top-4 right-4 flex size-5 items-center justify-center rounded-full bg-violet-500/50 text-xs">
                {index}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
