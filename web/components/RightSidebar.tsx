import { imagesDummyData } from "@/public/assets/assets";
import { User } from "@/types/user.type";
import Image from "next/image";

export default function RightSidebar({
  selectedUser,
}: {
  selectedUser: User | null;
}) {
  return (
    selectedUser && (
      <div
        className={`relative w-full overflow-y-scroll bg-[#8185B2]/10 text-white ${selectedUser ? "max-md:hidden" : ""}`}
      >
        <div className="mx-auto flex flex-col items-center gap-2 pt-16 text-xs font-light">
          <Image
            src={selectedUser?.profilePic}
            alt="profile"
            width={100}
            height={100}
            className="aspect-square w-20 rounded-full"
          />
          <h1 className="mx-auto flex items-center gap-2 px-10 text-xl font-medium">
            <p className="h-2 w-2 rounded-full bg-green-500"></p>
            {selectedUser.fullName}
          </h1>
          <p className="mx-auto px-10">{selectedUser.bio}</p>
        </div>

        <hr className="my-4 border-[#ffffff50]" />

        <div className="px-5 text-xs">
          <p>Media</p>
          <div className="mt-2 grid max-h-[200px] grid-cols-2 gap-4 overflow-y-scroll opacity-80">
            {imagesDummyData.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url.src, "_blank")}
                className="cursor-pointer rounded"
              >
                <Image
                  src={url}
                  alt="image"
                  width={100}
                  height={100}
                  className="h-full rounded-md"
                />
              </div>
            ))}
          </div>
        </div>

        <button className="absolute bottom-5 left-1/2 -translate-x-1/2 transform cursor-pointer rounded-full border-none bg-linear-to-r from-purple-400 to-violet-600 px-20 py-2 text-sm font-light text-white">
          Logout
        </button>
      </div>
    )
  );
}
