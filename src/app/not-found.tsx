import Link from "next/link";
import React from "react";
import "@/app/globals.css";
import Image from "next/image";
import errorImg from "$/assets/images/404-error.jpg";

export default function NotFound() {
  return (
    <div className="flex flex-col w-full h-screen">
      <h1 className="text-2xl font-medium text-center">Ôiiiiiiiii!</h1>
      <p className="text-2xl font-medium text-center">
        Trang bạn đang tìm kiếm không tồn tại.
      </p>
      <Link
        href="/"
        className="c66-btn-ok-global text-2xl my-4 w-56 mx-auto py-3"
      >
        Quay lại trang chủ
      </Link>
      <Image
        src={errorImg}
        alt="Hình ảnh vui nhộn"
        width={1024}
        height={1024}
        priority={true}
        className="w-full max-h-screen"
      />
    </div>
  );
}
