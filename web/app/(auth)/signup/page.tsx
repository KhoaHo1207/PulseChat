"use client";

import assets from "@/public/assets/assets";
import { SignUpFormData, signUpSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function SignUp() {
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
        alt="logo"
        width={500}
        height={500}
        className="w-[min(30vw,250px)]"
      />

      {/* Right */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-1/2 max-w-md flex-col gap-6 rounded-lg border-2 border-gray-500 bg-white/8 p-6 text-white shadow-lg lg:w-2/3"
      >
        <h2 className="flex items-center justify-between text-2xl font-medium">
          Sign up
        </h2>

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
            className="w-full rounded-md border border-gray-500 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            rows={5}
          />
          {errors.bio && (
            <p className="mt-1 text-xs text-red-400">{errors.bio.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer rounded-md bg-linear-to-r from-purple-400 to-violet-600 py-3 text-white"
        >
          {isSubmitting ? "Submitting..." : "Create Account"}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms" className="cursor-pointer">
            Agree to the terms of use & privacy policy.
          </label>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-base text-gray-600">
            Already have an account?{" "}
            <Link
              href={`/login`}
              className="cursor-pointer font-medium text-violet-500"
            >
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
