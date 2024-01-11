"use client";
import Link from "next/link";
import React from "react";
import { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="lg:mr-32">
      <div className="lg:hidden w-auto mx-auto">
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="c66-menu-icon-top"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </Button>
        <Menu
          className="flex justify-center items-center w-full"
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Link className="c66-top-menu-item" href="/">
            <MenuItem>Trang chủ</MenuItem>
          </Link>
          <Link className="c66-top-menu-item" href="/danh-muc">
            <MenuItem>Danh mục</MenuItem>
          </Link>
          <Link className="c66-top-menu-item" href="/san-pham">
            <MenuItem>Sản Phẩm</MenuItem>
          </Link>
          <Link className="c66-top-menu-item" href="/thanh-toan">
            <MenuItem>Thanh Toán</MenuItem>
          </Link>
          <Link className="c66-top-menu-item" href="/lien-he">
            <MenuItem>Liên hệ</MenuItem>
          </Link>
        </Menu>
      </div>
      <div>
        <ul
          id="c66-top-menu"
          className={classNames(
            "basic-1/6",
            "lg:basic-4/6",
            "lg:flex",
            "lg:items-center",
            "lg:gap-6",
            "uppercase",
            "text-sm",
            "text-gray-500",
            "hidden"
          )}
        >
          <li>
            <Link className="c66-top-menu-item" href="/">
              Trang chủ
            </Link>
          </li>
          <li>
            <Link className="c66-top-menu-item" href="/danh-muc">
              Danh mục
            </Link>
          </li>
          <li>
            <Link className="c66-top-menu-item" href="/san-pham">
              Sản phẩm
            </Link>
          </li>
          <li>
            <Link className="c66-top-menu-item" href="/thanh-toan">
              Thanh toán
            </Link>
          </li>
          <li>
            <Link className="c66-top-menu-item" href="/lien-he">
              Liên hệ
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
