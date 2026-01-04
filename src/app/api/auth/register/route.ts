import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Body received:", body); // 🔥 check this

    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, name, password: hashed },
    });

    console.log("User created:", user); // 🔥 check this

    return NextResponse.json(user);
  } catch (err) {
    console.error("Registration error:", err); // 🔥 check this
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
