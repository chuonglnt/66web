"use client";
import firebase from "firebase/compat/app";
import "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";
import logo from "#/assets/images/logo.png";
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { notifyError, notifySuccess } from "@/components/notificationMessages";
import { redirectWithDelay } from "@/core/utils";
import avata from "@/assets/images/avarta.png";

const Header: React.FC = () => {
  // interface userInfo {
  //   token: string;
  //   // Thêm các thuộc tính khác tại đây nếu cần
  // }
  const [isMenuExpanded, setMenuExpanded] = useState(false);
  const [isAvataMenuExpanded, setAvataMenuExpanded] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const menuAvataRef = useRef<HTMLUListElement>(null);
  const iconAvataRef = useRef<HTMLDivElement>(null);

  // const useUser = () => {
  //   const [userInfo, setUserInfo] = useState<userInfo | null>(null);
  //   useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     const userInfo = localStorage.getItem("userInfo");
  //     if (token && userInfo) {
  //       setUserInfo(userInfo);
  //     } else {
  //       setUserInfo(userInfo);
  //     }
  //   }, []);

  //   return userInfo ? JSON.parse(userInfo) : null;
  // };
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        notifySuccess("Đăng xuất thành công");
        // Xóa token từ localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("UserData");
        redirectWithDelay("/", 0);
        // Đăng xuất thành công.
        // Xóa thông tin người dùng khỏi state hoặc context nếu bạn đang quản lý trạng thái người dùng.
        // Có thể chuyển hướng người dùng về trang chủ hoặc trang đăng nhập.
      })
      .catch((error) => {
        // Xử lý lỗi đăng xuất.
        notifyError("Đăng xuất thất bại");
        console.error("Lỗi đăng xuất:", error);
      });
  };

  const useAuthStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      const UserData = localStorage.getItem("UserData");
      setIsLoggedIn(!!token);
    }, []);

    return isLoggedIn;
  };
  const isLoggedIn = useAuthStatus();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const topAvataMenu = menuAvataRef.current;
      const toggleTopAvataMenuIcon = iconAvataRef.current;
      const topMenu = menuRef.current;
      const toggleTopMenuIcon = iconAvataRef.current;

      if (
        topMenu &&
        toggleTopMenuIcon &&
        !topMenu.contains(event.target as Node) &&
        !toggleTopMenuIcon.contains(event.target as Node)
      ) {
        // Click ra ngoài
        setMenuExpanded(false);
      }
      if (
        topAvataMenu &&
        toggleTopAvataMenuIcon &&
        !topAvataMenu.contains(event.target as Node) &&
        !toggleTopAvataMenuIcon.contains(event.target as Node)
      ) {
        // Click ra ngoài
        setAvataMenuExpanded(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const toggleMenuIcon = () => {
    setMenuExpanded((prev) => !prev);
  };
  const toggleAvataIcon = () => {
    setAvataMenuExpanded((prev) => !prev);
  };

  return (
    <header className="sticky top-0">
      <nav className="flex flex-row justify-between items-center relative bg-white">
        {/* LOGO STORE */}
        <Link href="/">
          <Image
            className="logo hover:cursor-pointer basic-1/6 text-center"
            src={logo}
            alt="66 Shop"
            width={200}
            height={100}
            priority={true}
          />
        </Link>
        {/* END LOGO STORE */}
        {/* NAVBAR MENU */}
        <ul
          id="c66-top-menu"
          ref={menuRef}
          className={classNames(
            "basic-1/6",
            "lg:basic-4/6",
            "lg:flex",
            "lg:items-center",
            "lg:gap-6",
            "uppercase",
            "text-sm",
            "text-gray-500",
            "font-medium",
            {
              "c66-top-menu-expanded": isMenuExpanded,
              hidden: !isMenuExpanded,
            }
          )}
        >
          <li className="c66-top-menu-item">
            <Link href="/" className="">
              Trang chủ
            </Link>
          </li>
          <li className="c66-top-menu-item">
            <Link href="/danh-muc" className="">
              Danh mục
            </Link>
          </li>
          <li className="c66-top-menu-item">
            <Link href="/san-pham" className="">
              Sản phẩm
            </Link>
          </li>
          <li className="c66-top-menu-item">
            <Link href="/thanh-toan" className="">
              Thanh toán
            </Link>
          </li>
          <li className="c66-top-menu-item">
            <Link href="/lien-he" className="">
              Liên hệ
            </Link>
          </li>
        </ul>
        {/* END NAVBAR MENU */}
        {/* CART MENU */}
        <ul className="basic-4/6 lg:basic-1/6 flex justify-start lg:justify-end items-center uppercase lg:text-sm lg:font-medium text-xs font-normal gap-1 ml-auto lg:mx-2 text-gray-600 lg:gap-2">
          <li className="c66-top-menu-item">
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
            {/* END CART MENU */}
          </li>
          <ul></ul>
        </ul>
        {/* <HeaderUser
          {...{
            isLoggedIn,
            user: {
              imageUserUrl: { avata },
            },
            onLogout: logout,
          }}
        /> */}
        {/* DROPDOWN MENU IF USER ALREADY LOGIN */}
        {isLoggedIn ? (
          // id="c66-top-avata-menu"
          // ref={menuAvataRef}
          // className={classNames(
          //   "flex",
          //   "text-sm",
          //   "bg-gray-800",
          //   "rounded-full",
          //   "md:me-0",
          //   "focus:ring-4",
          //   "focus:ring-gray-300",
          //   "dark:focus:ring-gray-600",
          //   "font-medium",
          //   {
          //     "c66-top-menu-expanded": isAvataMenuExpanded,
          //     hidden: !isAvataMenuExpanded,
          //   }
          // )}
          // <button
          //   id="dropdownUserAvatarButton"
          //   data-dropdown-toggle="dropdownAvatar"
          //   className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          //   type="button"
          // >
          // <Image
          //   className="w-8 h-8 rounded-full"
          //   src="/docs/images/people/profile-picture-3.jpg"
          //   alt="user photo"
          //   width={32}
          //   height={32}
          // />
          // </button>
          // <div
          //   id="dropdownAvatar"
          //   className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          // >
          //   <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          //       <div>Chương Lê</div>
          //       <div className="font-medium truncate">
          //         chuonglnt@gmail.com
          //       </div>
          //     </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownUserAvatarButton"
          >
            <li>
              <Link
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Thông tin tài khoản
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Đổi mật khẩu
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Đơn hàng
              </Link>
            </li>
            <button
              onClick={logout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Đăng xuất
            </button>
          </ul>
        ) : (
          <li className="c66-top-menu-button">
            <Link href="/dang-nhap" className="">
              Đăng nhập
            </Link>
          </li>
        )}

        {/* </ul>***************************************** */}
        {/* END DROPDOWN MENU IF USER LOGOUT */}
        {/* MENU ICON */}
        <div
          id="c66-toggle-top-menu-icon"
          ref={iconRef}
          onClick={toggleMenuIcon}
          className="basic-1/6 flex lg:hidden items-center px-4 cursor-pointer"
        >
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
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </div>
        {/* END MENU ICON */}
      </nav>
      {/* END NAVBAR */}
    </header>
  );
};

export default Header;
