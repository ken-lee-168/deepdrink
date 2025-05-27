import { createDeepSeek } from "@ai-sdk/deepseek";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.CHAT_URL,
});
export async function POST(req: Request) {
  try {
    if (!process.env.DEEPSEEK_API_KEY) {
      throw new Error("DEEPSEEK_API_KEY is not configured");
    }
    if (!process.env.CHAT_URL) {
      throw new Error("CHAT_URL is not configured");
    }
    const body = await req.json();
    const { messages } = body;

    const result = streamText({
      model: deepseek("deepseek-v3"),
      system: "You are a helpful assistant.",
      messages,
      onFinish: async (result) => {
        console.log(result);
      },
    });
    return result.toDataStreamResponse();
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "An error occurred",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
