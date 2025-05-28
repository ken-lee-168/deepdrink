import { createChat } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { title, model } = await request.json();
  const { userId } = await auth();

  if (userId) {
    // 创建一个chat
    const newChat = await createChat(title, userId, model);
    // 返回新的chat_id
    // return Response.json(JSON.stringify({id: newChat?.id}), {status: 200})
    return new Response(JSON.stringify({ id: newChat?.id }), { status: 200 });
  }

  return new Response(null, { status: 200 });
}
