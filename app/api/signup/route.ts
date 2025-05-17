// /app/api/signup/route.ts
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/auth"; // bcrypt.hash
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return new Response("User exists", { status: 400 });

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({ data: { email, password: hashed } });

  return Response.json({ message: "User created", id: user.id });
}
