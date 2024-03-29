import React from "react";
import Image from "next/image";
import Link from "next/link";
import logoImg from "$/assets/images/logo.png";
// This file is intentionally left empty.
export default async function Logo() {
  return (
    <Link href="/">
      <Image
        className="-mt-2 ml-2 -mb-2 logo hover:cursor-pointer basic-1/6 text-center"
        src={logoImg}
        alt="66 Shop"
        width={200}
        height={100}
        priority={true}
      />
    </Link>
  );
}
