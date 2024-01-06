"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AvatarMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  onAuthStateChanged(auth, (user) => {
    if (user) {
      <div>
        <Link href="/dang-nhap">Đăng nhập</Link>
        <button onClick={() => signOut()}>Đăng ký</button>
      </div>;
    } else {
      <div>
        <Image
          src="\assets\images\avarta.png"
          alt="Avatar"
          onClick={toggleMenu}
          height={50}
          width={50}
        />
        {menuOpen && (
          <div>
            <button onClick={() => signOut()}>Đăng xuất</button>
          </div>
        )}
      </div>;
    }
  });
};

export default AvatarMenu;
