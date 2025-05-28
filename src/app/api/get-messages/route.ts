import { getMessages } from "@/db";
import { messagesTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { chatId, chatUserId } = await request.json();
  const { userId } = await auth();

  if (!chatId || chatUserId !== userId) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }

  const messages = await getMessages(chatId);

  return new Response(JSON.stringify(messages), {
    status: 200,
  });
}
