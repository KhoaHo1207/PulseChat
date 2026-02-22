"use client";

import assets from "@/public/assets/assets";
import { SignUpFormData, signUpSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    console.log(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center gap-8 bg-cover bg-center backdrop-blur-2xl max-sm:flex-col sm:justify-evenly">
      {/* Left */}
      <Image
        src={assets.logo_big}
        alt="Facebook Logo"
        width={500}
        height={500}
        className="w-[min(30vw,250px)]"
        priority
      />

      {/* Right */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-1/2 max-w-md flex-col gap-6 rounded-lg border-2 border-gray-500 bg-white/8 p-6 text-white shadow-lg lg:w-2/3"
      >
        <h1 className="text-2xl font-medium">Sign up</h1>

        {/* Full Name */}
        <div>
          <input
            type="text"
            placeholder="Full Name"
            {...register("fullName")}
            className="w-full rounded-md border border-gray-500 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-400">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full rounded-md border border-gray-500 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full rounded-md border border-gray-500 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            className="w-full rounded-md border border-gray-500 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Bio */}
        <div>
          <textarea
            placeholder="Provide a short bio..."
            {...register("bio")}
            rows={5}
            className="w-full rounded-md border border-gray-500 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.bio && (
            <p className="mt-1 text-xs text-red-400">{errors.bio.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-gradient-to-r from-purple-400 to-violet-600 py-3 text-white disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Create Account"}
        </button>

        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-violet-500">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
