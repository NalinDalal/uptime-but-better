// /app/api/signin/route.ts
import { PrismaClient } from "@prisma/client";
import { comparePasswords, signToken } from "@/lib/auth";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await comparePasswords(password, user.password)))
    return new Response("Invalid credentials", { status: 401 });

  const token = signToken({ id: user.id, email: user.email });

  return Response.json({ token }); // or use cookies().set(...) if using cookies
}
