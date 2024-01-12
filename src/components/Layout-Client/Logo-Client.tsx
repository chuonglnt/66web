import React from "react";
import Image from "next/image";
import Link from "next/link";
import { initAdmin } from "@/lib/firebase/firebase-admin.config";
import { getLogo, getLogoFromStorage } from "@/lib/firebase/firebase";
export default async function Logo() {
  await initAdmin();
  const logo = "/api/image";
  // const logo = await getLogoFromStorage();
  return (
    <Link href="/">
      <Image
        className="-mt-2 ml-2 -mb-2 logo hover:cursor-pointer basic-1/6 text-center"
        src={logo || "/assets/images/logo.png"}
        alt="66 Shop"
        width={200}
        height={100}
        priority={true}
      />
    </Link>
  );
}
