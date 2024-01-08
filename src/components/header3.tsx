import React from "react";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import AvatarMenu from "@/components/AvatarMenu";

const Header3 = () => {
  return (
    <header className="sticky top-0">
      <nav className="flex flex-row justify-between items-center relative bg-white">
        <Logo />
        <Navbar />
        <AvatarMenu />
      </nav>
    </header>
  );
};

export default Header3;
