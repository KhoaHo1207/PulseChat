import { z } from "zod";

const MIN_FULL_NAME_LENGTH = 3;
const MAX_FULL_NAME_LENGTH = 60;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 128;

const trim = (value) => (typeof value === "string" ? value.trim() : value);
const lowerCaseString = (value) =>
  typeof value === "string" ? value.trim().toLowerCase() : value;

const signUpSchema = z
  .object({
    fullName: z.preprocess(
      trim,
      z
        .string()
        .min(MIN_FULL_NAME_LENGTH, {
          message: `Full name must be at least ${MIN_FULL_NAME_LENGTH} characters.`,
        })
        .max(MAX_FULL_NAME_LENGTH, {
          message: `Full name cannot exceed ${MAX_FULL_NAME_LENGTH} characters.`,
        })
    ),
    email: z.preprocess(
      lowerCaseString,
      z.string().email({
        message: "Email must be valid.",
      })
    ),
    bio: z.string(),
    password: z
      .string()
      .min(MIN_PASSWORD_LENGTH, {
        message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
      })
      .max(MAX_PASSWORD_LENGTH, {
        message: `Password cannot exceed ${MAX_PASSWORD_LENGTH} characters.`,
      }),
    confirmPassword: z
      .string()
      .min(MIN_PASSWORD_LENGTH, {
        message: `Confirm password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
      })
      .max(MAX_PASSWORD_LENGTH, {
        message: `Confirm password cannot exceed ${MAX_PASSWORD_LENGTH} characters.`,
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const formatZodErrors = (issues) =>
  issues.map((issue) => ({
    field: issue.path[0] ? String(issue.path[0]) : "body",
    message: issue.message,
  }));

export const validateSignUpPayload = (payload) => {
  const result = signUpSchema.safeParse(payload ?? {});

  if (result.success) {
    return { success: true, data: result.data };
  }

  return {
    success: false,
    errors: formatZodErrors(result.error.issues),
  };
};
