import { z } from "zod";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const updateProfileSchema = z.object({
  profilePic: z
    .object({
      originalname: z.string(),
      mimetype: z.string(),
      size: z.number(),
    })
    .passthrough()
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File is too large (maximum 5MB)",
    })
    .refine((file) => ACCEPTED_TYPES.includes(file.mimetype), {
      message: "Only JPEG, PNG, WEBP are allowed",
    })
    .optional(),

  fullName: z.string().optional(),
  bio: z.string().optional(),
});

export const validateUpdateProfilePayload = (payload) => {
  const result = updateProfileSchema.safeParse(payload ?? {});
  console.log("result", result);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error.issues };
};
