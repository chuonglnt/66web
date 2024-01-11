import React from "react";
import Logo from "@/Components/Layout-Client/Logo-Client";
import NavBar from "@/Components/Layout-Client/Nav-Bar-Client";
import AvatarMenu from "@/Components/Layout-Client/Avatar-Menu-Client";

const HeaderMenu = () => {
  return (
    <nav className="flex justify-between items-center sticky top-0 bg-white">
      <Logo />
      <NavBar />
      <AvatarMenu />
    </nav>
  );
};

export default HeaderMenu;
