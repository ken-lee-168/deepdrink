"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import EastIcon from "@mui/icons-material/East";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    onError: (error) => {
      console.error("Chat error:", error);
    },
    onResponse: (response) => {
      console.log("Chat response:", response);
    },
  });

  const endRef = useRef<HTMLDivElement>(null);
  const [model, setModel] = useState("deepseek-r1");

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleModelChange = () => {
    console.log({ model });
    setModel(model === "deepseek-r1" ? "deepseek-v3" : "deepseek-r1");
  };

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <div className="flex flex-col w-2/3 gap-8 overflow-y-auto justify-between flex-1">
        <div className="h-4"></div>
        <div className="flex flex-col gap-8 flex-1">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-lg flex flex-row ${
                message?.role === "user"
                  ? "justify-end ml-10"
                  : "justify-start mr-18"
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.role === "user" ? "bg-slate-100" : "bg-blue-400"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <div className="h-4" ref={endRef}></div>

        <div className="flex flex-col items-center justify-center mt-4 mb-4 shadow-lg border-[1px] border-gray-300 h-32 rounded-lg">
          <textarea
            className="w-full h-30 rounded-lg p-3 focus:outline-none"
            name=""
            id=""
            placeholder="请输入您的问题"
            value={input}
            onChange={handleInputChange}
          ></textarea>

          <div className="flex flex-row items-center justify-between w-full h-12 mb-2 ">
            <div>
              <div
                className={`flex flex-row items-center justify-center rounded-lg border-[1px] px-2 py-1 ml-2 cursor-pointer ${
                  model === "deepseek-r1"
                    ? "border-blue-300 bg-blue-200"
                    : "border-gary-300"
                }`}
                onClick={handleModelChange}
              >
                <p className="text-sm">{model}</p>
              </div>
            </div>

            <div
              className="flex items-center justify-center border-2 mr-4 border-black p-1 rounded-full"
              onClick={handleSubmit}
            >
              <EastIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
