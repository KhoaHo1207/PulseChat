"use client";

import assets from "@/public/assets/assets";
import Image from "next/image";
import RequireAuth from "@/components/RequireAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profile() {
  const router = useRouter();
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("Hi everyone, I am using PulseChat");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    router.refresh();
  };
  return (
    <RequireAuth>
      <div className="flex min-h-screen items-center justify-center bg-cover bg-no-repeat">
        <div className="flex w-5/6 max-w-2xl items-center justify-between rounded-lg border-2 border-gray-600 text-gray-300 backdrop-blur-2xl max-sm:flex-col-reverse">
          <form action="" className="flex flex-1 flex-col gap-5 p-10">
            <h3 className="text-lg">Profile Details</h3>
            <label
              htmlFor="avatar"
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="file"
                id="avatar"
                hidden
                accept=".png .jpg .jpeg"
                onChange={(e) => setSelectedImg(e.target.files?.[0] ?? null)}
              />
              <Image
                src={
                  selectedImg
                    ? URL.createObjectURL(selectedImg)
                    : assets.avatar_icon
                }
                alt="avatar"
                width={100}
                height={100}
                className={`size-12 ${selectedImg && "rounded-full"}`}
              />
              Upload profile image
            </label>
            <input
              type="text"
              required
              placeholder="Your name"
              className="rounded-md border border-gray-500 p-2 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              name=""
              id=""
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="rounded-md border border-gray-500 p-2 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              rows={5}
            />
            <button
              type="submit"
              className="cursor-pointer rounded-full bg-linear-to-r from-purple-400 to-violet-600 p-2 text-lg text-white"
              onClick={() => handleSubmit()}
              disabled={isSubmitting}
            >
              Save
            </button>
          </form>

          <Image
            src={assets.logo_icon}
            alt="logo"
            width={200}
            height={200}
            className="mx-10 aspect-square max-w-44 rounded-full max-sm:mt-10"
          />
        </div>
      </div>
    </RequireAuth>
  );
}
