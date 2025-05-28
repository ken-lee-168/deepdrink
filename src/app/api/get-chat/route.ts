import { getChat } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { chatId } = await request.json();
  const { userId } = await auth();
    
  if (!userId) {
    return new Response(JSON.stringify({error: 'unauthorized'}), {
        status: 401
    })
  }

  const chat = await getChat(chatId, userId);

  return new Response(JSON.stringify(chat), {
    status: 200
  })

}
