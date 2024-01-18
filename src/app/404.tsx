"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import errorImg from "$/assets/images/404-error.jpg";

export default function Custom404() {
  return (
    <div className="">
      <h1>Ôiiiiiiiii!</h1>
      <p>Trang bạn đang tìm kiếm không tồn tại.</p>
      <Image
        src={errorImg}
        alt="Hình ảnh vui nhộn"
        width={400}
        height={400}
        priority={true}
      />{" "}
      {/* Thay thế đường dẫn với hình ảnh của bạn */}
      <Link href="/">
        <a className="">Quay lại trang chủ</a>
      </Link>
    </div>
  );
}
