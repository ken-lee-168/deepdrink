import { createDeepSeek } from "@ai-sdk/deepseek";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const deepseek = createDeepSeek({
  apiKey: "sk-3b4ebd1a8cc44ddf9d33a8f6e8823377",
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
});

console.log("DeepSeek client initialized");

export async function POST(req: Request) {
  console.log("Received POST request to /api/chat");
  try {
    // if (!process.env.DASHSCOPE_API_KEY) {
    //   throw new Error("DASHSCOPE_API_KEY is not configured");
    // }
    // if (!process.env.BASE_URL) {
    //   throw new Error("BASE_URL is not configured");
    // }
    const body = await req.json();
    console.log("Request body:", body);
    const { messages } = body;
    console.log("Messages:", messages);

    console.log("Creating stream with model deepseek-v3");
    const result = streamText({
      model: deepseek("deepseek-v3"),
      system: "You are a helpful assistant.",
      messages,
      onFinish: async (result) => {
        console.log(result);
      },
    });
    console.log("Stream created successfully");

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "An error occurred",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
