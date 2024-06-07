"use client";

import dynamic from "next/dynamic";

const Feed = dynamic(() => import("../app/components/molecules/Feed"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 drop-shadow-md">
      <Feed />
    </main>
  );
}
