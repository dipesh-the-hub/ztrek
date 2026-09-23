"use server";

import { v2 as cloudinary } from "cloudinary";
import { requireAdmin } from "@/lib/auth";

function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

export interface UploadResult {
  url?: string;
  error?: string;
}

export async function uploadImageAction(formData: FormData): Promise<UploadResult> {
  await requireAdmin();

  if (!isCloudinaryConfigured()) {
    return { error: "Image upload isn't configured yet. Set the CLOUDINARY_* env vars, or paste an image URL directly." };
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { error: "No file provided." };
  }
  if (!file.type.startsWith("image/")) {
    return { error: "Only image files are allowed." };
  }
  if (file.size > 10 * 1024 * 1024) {
    return { error: "Image must be smaller than 10MB." };
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve) => {
    cloudinary.uploader
      .upload_stream({ folder: "trekvibe-nepal" }, (error, result) => {
        if (error || !result) {
          resolve({ error: "Upload failed. Please try again." });
          return;
        }
        resolve({ url: result.secure_url });
      })
      .end(buffer);
  });
}
