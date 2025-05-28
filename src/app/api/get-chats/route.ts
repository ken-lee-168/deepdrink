import { getChats } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  } else {
    const chats = await getChats(userId);
    return new Response(JSON.stringify(chats), {
      status: 200,
    });
  }
}
