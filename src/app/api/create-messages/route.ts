import { createMessages } from "@/db";

export async function POST(request: Request) {
    const {chatId, content, role} = await request.json()

    if (!chatId || !content || !role) {
        return new Response(null, {status: 401})
    }

    const res = await createMessages(chatId, content, role)
    return new Response(JSON.stringify(res), {status: 200})
}