import React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/Core/Utils";
import UseScroll from "@/Core/Use-Scroll";
import Image from "next/image";

const HeaderAdmin = () => {
  const scrolled = UseScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
        {
          "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
          "border-b border-gray-200 bg-white": selectedLayout,
        }
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            {/* <span className="h-7 w-7 bg-zinc-300 rounded-lg" /> */}
            <Image
              src={"/assets/images/logo.png"}
              alt="Picture of the author"
              width={24}
              height={24}
              priority={true}
              className="h-22 w-52 mt-2 items-center justify-center"
            />
            {/* <span className="font-bold text-xl flex ">Logo</span> */}
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center">
            <Image
              src={"/assets/images/avarta.png"}
              alt="Picture of the author"
              width={24}
              height={24}
              className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
