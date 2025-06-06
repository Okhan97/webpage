"use client";
import { Parallax } from "react-scroll-parallax";

const Page = () => {
  return (
    <main className="flex min-h-[300vh] flex-col items-center justify-between p-24">
      <Parallax scale={[1, 0]}>
        <div className="w-48 h-48 bg-red-500" />
      </Parallax>
    </main>
  );
};

export default Page;
