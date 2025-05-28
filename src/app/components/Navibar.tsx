"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
type Props = {};
interface NavibarItem {
  key: string;
}

function Navibar({}: Props) {
  const [navibarList, setNavibarList] = React.useState<NavibarItem[]>([]);
  const { user } = useUser();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["chats"],
  });

  const getNavibarList = () => {};

  return (
    <div className="h-screen bg-gray-200">
      <div className="flex items-center justify-center">
        <p className="font-bold text-2xl">deepdrink</p>
      </div>

      <div
        className="h-10 flex items-center justify-center mt-4 cursor-pointer"
        onClick={() => {
          console.log("router");
          router.push("/");
        }}
      >
        <p className="h-full w-2/3 bg-blue-300 rounder-lg flex items-center justify-center font-thin text-blue-700">
          开启新对话
        </p>
      </div>

      {/* 目录 */}
      <div className="flex flex-col items-center justify-center gap-2 p-6">
        {navibarList.map((item, index) => (
          <div key={index}>{item.key}</div>
        ))}
      </div>
    </div>
  );
}

export default Navibar;
