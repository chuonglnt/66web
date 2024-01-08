import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        className="logo hover:cursor-pointer basic-1/6 text-center"
        src="/assets/images/logo.png"
        alt="66 Shop"
        width={200}
        height={100}
        priority={true}
      />
    </Link>
  );
};

export default Logo;
