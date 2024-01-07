"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import logoGoogle from "#/assets/images/logo_Google.png";
import logoFacebook from "#/assets/images/Logo_Facebook.png";
import TextInput from "@/components/inputText";
import userData from "@/models/userModel";
import { redirectWithDelay } from "@/core/utils";
import { notifySuccess, notifyError } from "@/components/notificationMessages";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
export default function Login() {
  useEffect(() => {
    const userToken = localStorage.getItem("token");

    if (userToken) {
      // Token tồn tại - coi như người dùng đã đăng nhập
      notifyError("Bạn đã đăng nhập");
      redirectWithDelay("/", 1000);
    }
  });

  const [userData, setFormData] = useState<userData>({
    uid: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthDay: "",
    gender: "",
    defaultAddress: "",
    shippingAddress: "",
    userPhone: "",
    imageUserUrl: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userData.email === "") {
      notifyError("Email không được để trống");
      return;
    } else if (userData.password === "") {
      notifyError("Mật khẩu không được để trống");
      return;
    }
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then(async (userCredential) => {
        const token = await (userCredential.user?.getIdToken?.() ?? null);
        // Lưu token vào local storage hoặc cookie
        localStorage.setItem("token", token ?? "");
        localStorage.setItem("userData", userData.imageUserUrl);
        notifySuccess("Đăng nhập thành công");
        redirectWithDelay("/", 1000);
        // Lưu ý: Firebase quản lý refresh token một cách tự động
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          notifyError("Email đã tồn tại");
          console.log("66 - Lỗi đăng nhập:", error);
        } else if (error.code === "auth/invalid-email") {
          notifyError(
            "Tên tài khoản hoặc email không đúng. Vui lòng kiểm tra lại"
          );
          console.log("66 - Lỗi đăng nhập:", error);
        } else if (error.code === "auth/wrong-password") {
          notifyError("Password không đúng. Vui lòng kiểm tra lại");
          console.log("66 - Lỗi đăng nhập:", error);
        } else if (error.code === "auth/user-not-found") {
          notifyError("Tài khoản không tồn tại. Vui lòng kiểm tra lại");
          console.log("66 - Lỗi đăng nhập:", error);
        } else if (
          typeof error === "object" &&
          error !== null &&
          "code" in error
        ) {
          notifyError("Lỗi đăng nhập. Vui long kiểm tra lại");
          console.log("66 - Lỗi đăng nhập:", error);
        }
      });
  };

  return (
    <div className="max-w-md mx-auto my-64 p-6 bg-white rounded-md shadow-2xl">
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
        />
        <Image
          className="h-12 w-auto"
          src={logoFacebook}
          alt="Logo"
          width={48}
          height={48}
        />
      </div>
      <h5 className="text-center text-sm font-extrabold text-gray-900 mb-6">
        Đăng nhập bằng tài khoản khác
      </h5>
      <form className="space-y-4">
        <div>
          <TextInput
            label="Email"
            type="text"
            name="email"
            value={userData.email}
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
            value={userData.password}
            placeholder="Mật khẩu của bạn"
            isRequired={false}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded w-full"
          onClick={handleSubmit}
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
