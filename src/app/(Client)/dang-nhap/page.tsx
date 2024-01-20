"use client";
// ************ Start Import ************
import { useState, useEffect, ChangeEvent, use } from "react";
import Image from "next/image";
import logoGoogle from "$/assets/images/logo_Google.png";
import logoFacebook from "$/assets/images/logo_Facebook.png";
import TextInput from "@/Components/Input-Text";
import { isValidateEmail, redirectWithDelay } from "@/Core/Utils";
import { notifySuccess, notifyError } from "@/Components/Notification-Messages";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignIn } from "@/lib/redux/features/loginUserSlice";
import { setEmail, setPassword } from "@/lib/redux/features/loginFormSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase.config";
import {
  setAuthentication,
  setUnAuthentication,
} from "@/lib/redux/features/authSlice";

// ************ End Import ************

export default function LoginUserPage() {
  const dispatch = useDispatch<AppDispatch>();
  const email = useSelector((state: RootState) => state.loginForm.email);
  const password = useSelector((state: RootState) => state.loginForm.password);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(setAuthentication(isAuthenticated));
        redirectWithDelay("/", 1000);
      }
      return () => unsubscribe();
    });
  }, [dispatch, isAuthenticated]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      dispatch(setEmail(value));
    } else if (name === "password") {
      dispatch(setPassword(value));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email === "") {
      notifyError("Email không được để trống");
      return;
    }
    if (isValidateEmail(email) === false) {
      notifyError("Email không đúng định dạng");
      return;
    }
    if (password === "") {
      notifyError("Mật khẩu không được để trống");
      return;
    }
    dispatch(fetchSignIn({ email, password }));
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(setAuthentication(isAuthenticated));
        redirectWithDelay("/", 1000);
      }
      return () => unsubscribe();
    });
  };

  return (
    <div className="max-w-md mx-auto my-20 p-6 bg-slate-50 rounded-md shadow-2xl">
      <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
        Đăng Nhập
      </h2>

      <div className="flex justify-center space-x-4 mb-6">
        <Image
          className="h-12 w-auto"
          src={logoGoogle}
          alt="Logo"
          width={28}
          height={28}
          priority={true}
        />
        <Image
          className="h-12 w-auto"
          src={logoFacebook}
          alt="Logo"
          width={48}
          height={48}
          priority={true}
        />
      </div>
      <h5 className="text-center text-sm font-extrabold text-gray-900 mb-6">
        Đăng nhập bằng tài khoản khác
      </h5>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <TextInput
            label="Email"
            type="text"
            name="email"
            value={email}
            placeholder="Tài khoản hoặc email của bạn"
            isRequired={false}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextInput
            label="Mật khẩu"
            type="password"
            name="password"
            value={password}
            placeholder="Mật khẩu của bạn"
            isRequired={false}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded w-full"
        >
          Đăng nhập
        </button>
      </form>
      <div className="my-2">
        <a href="#" className="text-sm text-blue-500 hover:underline">
          Quên mật khẩu?
        </a>
      </div>
      <div className="my-2">
        <p className="text-sm text-center">
          Bạn chưa có tài khoản?{" "}
          <a href="/dang-ky" className="text-blue-500 hover:underline">
            Đăng ký
          </a>
        </p>
      </div>
    </div>
  );
}
