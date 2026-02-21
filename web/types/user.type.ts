import type { StaticImageData } from "next/image";

export interface User {
  _id: string;
  email: string;
  fullName: string;
  profilePic: string | StaticImageData;
  bio: string;
}
