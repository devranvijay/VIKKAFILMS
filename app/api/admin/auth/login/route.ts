import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/app/lib/db";
import { createSession } from "@/app/lib/session";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return Response.json({ error: "Username and password are required" }, { status: 400 });
    }

    const user = await prisma.adminUser.findUnique({ where: { username } });
    if (!user) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    await createSession(user.id);
    return Response.json({ success: true });
  } catch (err) {
    console.error("[admin/auth/login]", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
