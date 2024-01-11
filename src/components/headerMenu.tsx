import React from "react";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import AvatarMenu from "@/components/AvatarMenu";

const HeaderMenu = () => {
  return (
    <nav className="flex justify-between items-center sticky top-0 bg-white">
      <Logo />
      <Navbar />
      <AvatarMenu />
    </nav>
  );
};

export default HeaderMenu;
