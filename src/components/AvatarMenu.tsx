"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "@/lib/firebase";

export default function AvatarMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Nếu user tồn tại, tức là đã đăng nhập
        setIsLoggedIn(true);
      } else {
        // Người dùng đã đăng xuất
        setIsLoggedIn(false);
      }
    });
    // Dọn dẹp khi component unmount
    return unsubscribe;
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function handleLogout() {
    const auth = getAuth(app);

    signOut(auth)
      .then(() => {
        // Đăng xuất thành công
        console.log("Đăng xuất thành công");
        localStorage.removeItem("token");
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error("Lỗi khi đăng xuất:", error);
      });
  }

  return (
    <div>
      <div className="flex justify-center text-center">
        <div>
          <ul className="basic-4/6 lg:basic-1/6 flex justify-start lg:justify-end items-center uppercase lg:text-sm lg:font-medium text-xs font-normal gap-1 ml-auto lg:mx-2 text-gray-600 lg:gap-2">
            <li className="c66-top-menu-item my-3">
              <Link href="/gio-hang" className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="c66-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                <span className="c66-cart-circle bg-orange-400 text-white">
                  6
                </span>
              </Link>
            </li>
          </ul>
        </div>
        {isLoggedIn ? (
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Avatar alt="Remy Sharp" src="assets\images\avarta.png" />
            </Button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>
                <Link href="/tai-khoản">Thông tin tài khoản</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/doi-mat-khau">Đổi mật khẩu</Link>
              </MenuItem>{" "}
              <MenuItem>
                <Link href="/don-hang">Đơn hàng</Link>
              </MenuItem>{" "}
              <MenuItem>
                <a onClick={handleLogout}>Đăng xuất</a>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div className="mt-3">
            <Link className="c66-top-menu-button" href="/dang-nhap">
              Đăng nhập
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// const AvatarMenu = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };
//   return (
//     <div>
//       <button onClick={toggleMenu}>
//         <Image
//           src="assets\images\avarta.png"
//           alt="Avatar"
//           width={50}
//           height={50}
//         />
//       </button>
//       <Link href="/dang-nhap">Đăng nhập</Link>
//       <Link href="/dang-ky">Đăng ký</Link>
//       {menuOpen && (
//         <div>
//           <button>Đăng xuất</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AvatarMenu;
