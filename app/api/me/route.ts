// /app/api/me/route.ts
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return new Response("Unauthorized", { status: 401 });

  try {
    const user = verifyToken(token);
    return Response.json({ user });
  } catch {
    return new Response("Invalid token", { status: 403 });
  }
}
