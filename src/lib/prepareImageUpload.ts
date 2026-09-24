// Runs in the browser before an admin upload. Server Actions accept request
// bodies up to the limit in next.config.ts, so large phone photos are resized
// and re-encoded as JPEG to fit comfortably under it.

const MAX_UPLOAD_BYTES = 3.5 * 1024 * 1024;
const MAX_EDGE_PX = 2400;

function toJpeg(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
}

export async function prepareImageUpload(file: File): Promise<File> {
  if (file.size <= MAX_UPLOAD_BYTES || !file.type.startsWith("image/") || file.type === "image/gif") {
    return file;
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_EDGE_PX / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.fillStyle = "#ffffff"; // JPEG has no transparency
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  for (const quality of [0.88, 0.8, 0.7, 0.6]) {
    const blob = await toJpeg(canvas, quality);
    if (blob && blob.size <= MAX_UPLOAD_BYTES) {
      const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
      return new File([blob], name, { type: "image/jpeg" });
    }
  }
  return file;
}
