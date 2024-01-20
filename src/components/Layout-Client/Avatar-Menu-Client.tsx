"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import avatarImgDefault from "$/assets/images/avata-default.jpg";
import { AppDispatch, RootState, persistor } from "@/lib/redux/store";
import { useAuth } from "@/Components/Auth-Context";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { redirectWithDelay } from "@/Core/Utils";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase.config";
import { notifySuccess, notifyError } from "@/Components/Notification-Messages";
import {
  fetchLocalStorageUserByUid,
  setCurrentUserUid,
} from "@/lib/redux/features/userSlice";
import { fetchSignOut } from "@/lib/redux/features/loginUserSlice";
import {
  setAuthentication,
  setUnAuthentication,
} from "@/lib/redux/features/authSlice";

export default function AvatarMenu() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch<AppDispatch>();
  const [displayName, setDisplayName] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [photoUrl, setphotoUrl] = useState(null);
  const [currentUser, setCurrentUser] = useState<Boolean>(false);
  const currentUserUid = useSelector(
    (state: RootState) => state.user.currentUserUid
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(setAuthentication(isAuthenticated));
        setCurrentUser(isAuthenticated);
        dispatch(setCurrentUserUid(userAuth.uid));
        const dataInfo = localStorage.getItem("dataInfo");
        if (dataInfo) {
          dispatch(fetchLocalStorageUserByUid(currentUserUid));
          const dataInftoString = dataInfo ? JSON.parse(dataInfo) : null;
          setDisplayName(dataInftoString.displayName);
          setFirstName(dataInftoString.firstName);
          setphotoUrl(dataInftoString.photoUrl);
        } else {
          dispatch(fetchLocalStorageUserByUid(currentUserUid));
        }
      } else {
        localStorage.removeItem("dataInfo");
        dispatch(setUnAuthentication(isAuthenticated));
      }
      return () => unsubscribe();
    });
  }, [dispatch, isAuthenticated, currentUserUid]);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     console.log("user:", user);
  //     if (user && user !== null) {
  //       dispatch(setCurrentUserRedux(true));
  //       const dataInfoString = localStorage.getItem("dataInfo");
  //       const dataInfo = dataInfoString ? JSON.parse(dataInfoString) : null;
  //       if (dataInfo && dataInfo.displayName) {
  //         setDisplayName(dataInfo.displayName);
  //       }
  //       if (dataInfo && dataInfo.firstName) {
  //         setFirstName(dataInfo.firstName);
  //       }
  //       if (dataInfo && dataInfo.photoUrl) {
  //         setphotoUrl(dataInfo.photoUrl);
  //       }
  //       // Nếu user tồn tại, tức là đã đăng nhập
  //       notifyError("Bạn đã đăng nhập");
  //       // redirectWithDelay("/", 1000);
  //     } else {
  //       // Người dùng đã đăng xuất
  //       dispatch(setCurrentUserRedux(false));
  //     }
  //   });
  // }, [dispatch]);
  const greetingName = displayName || firstName || "Guest";
  const [openMenuAvarta, setOpenMenuAvarta] =
    React.useState<null | HTMLElement>(null);
  const open = Boolean(openMenuAvarta);
  const handleClickAvarta = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenMenuAvarta(event.currentTarget);
  };
  const handleClose = () => {
    setOpenMenuAvarta(null);
  };
  // const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    setOpenMenuAvarta(null);
    dispatch(fetchSignOut());
    dispatch(setUnAuthentication(isAuthenticated));
    localStorage.removeItem("token");
    localStorage.removeItem("dataInfo");
    notifySuccess("Đăng xuất thành công");
    redirectWithDelay("/", 1000);
  };
  return (
    <div>
      <div className="flex justify-center text-center lg:-mt-3 sm:mt-0">
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
                  className="c66-cart-icon-top"
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
        {currentUser === true ? (
          <div className="mt-1 sm:mt-2 lg:mt-3 mx-auto">
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickAvarta}
            >
              <Avatar
                alt="avarta customer"
                src={photoUrl || avatarImgDefault.src}
              />
            </Button>

            <Menu
              id="basic-menu"
              anchorEl={openMenuAvarta}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <p>Xin chào, {greetingName}!</p>
              <hr />
              <MenuItem>
                <Link href="/admin">Thông tin tài khoản</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/doi-mat-khau">Đổi mật khẩu</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/don-hang">Đơn hàng</Link>
              </MenuItem>
              <MenuItem>
                <span onClick={handleLogout}>Đăng xuất</span>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div className="mt-4 lg:mt-6 lg:mr-4 w-16 sm:w-auto">
            <Link className="c66-top-menu-button" href="/dang-nhap">
              Đăng nhập
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
