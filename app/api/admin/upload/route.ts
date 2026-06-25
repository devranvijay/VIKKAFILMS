import { NextRequest } from "next/server";
import { verifySession } from "@/app/lib/dal";

export async function POST(req: NextRequest) {
  await verifySession();

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return Response.json({ error: "Cloudinary not configured" }, { status: 500 });
  }

  // Generate signature for signed upload
  const timestamp = Math.round(Date.now() / 1000);
  const folder = "vikafilms";
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;

  const crypto = await import("crypto");
  const signature = crypto
    .createHash("sha256")
    .update(paramsToSign + apiSecret)
    .digest("hex");

  const uploadFormData = new FormData();
  uploadFormData.append("file", file);
  uploadFormData.append("api_key", apiKey);
  uploadFormData.append("timestamp", timestamp.toString());
  uploadFormData.append("signature", signature);
  uploadFormData.append("folder", folder);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: uploadFormData,
  });

  if (!res.ok) {
    const err = await res.json();
    return Response.json({ error: "Cloudinary upload failed", details: err }, { status: 500 });
  }

  const data = await res.json();
  return Response.json({
    publicId: data.public_id,
    url: data.secure_url,
    width: data.width,
    height: data.height,
  });
}
