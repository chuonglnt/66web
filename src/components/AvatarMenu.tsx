"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const AvatarMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div>
      <button onClick={toggleMenu}>
        <Image
          src="assets\images\avarta.png"
          alt="Avatar"
          width={50}
          height={50}
        />
      </button>
      <Link href="/dang-nhap">Đăng nhập</Link>
      <Link href="/dang-ky">Đăng ký</Link>
      {menuOpen && (
        <div>
          <button>Đăng xuất</button>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;
