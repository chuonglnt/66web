import React from "react";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import AvatarMenu from "@/components/AvatarMenu";

const Header = () => {
  return (
    <header>
      <Logo />
      <Navbar />
      <AvatarMenu />
    </header>
  );
};

export default Header;
