"use client";

import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SIDENAV_ITEMS } from "./Constants-Menu-Admin";
import { SideNavItem } from "./Types-Admin";
import { Icon } from "@iconify/react";

const SideNavAdmin = () => {
  return (
    <div className="md:w-60 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex">
      <div className="flex flex-col space-y-6 w-full">
        <Link href="/admin" className="h-30 w-full">
          {/* <span className="h-7 w-7 bg-zinc-300 rounded-lg" /> */}
          <Image
            src={"/assets/images/logo.png"}
            alt="Picture of the author"
            width={100}
            height={100}
            priority={true}
            className="w-full mx-1 my-1"
          />
          {/* <span className="font-bold text-xl hidden md:flex">Logo</span> */}
        </Link>

        <div className="flex flex-col space-y-1 text-md  md:px-6 ">
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNavAdmin;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 w-full font-medium justify-between hover:bg-green-default rounded-lg ${
              pathname.includes(item.path) ? "bg-zinc-100" : ""
            }`}
          >
            <div className="flex flex-row space-x-2 items-center">
              {item.icon}
              <span className="font-semibold text-lg flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4 ">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`hover:bg-green-default rounded-lg items-center justify-center px-2 py-0.5${
                      subItem.path === pathname ? "font-bold" : ""
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-2 items-center p-2 hover:bg-green-default rounded-lg ${
            item.path === pathname ? "bg-zinc-100" : ""
          }`}
        >
          {item.icon}
          <span className="font-semibold text-xl flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
