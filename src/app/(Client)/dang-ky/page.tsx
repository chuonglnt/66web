"use client";
import {
  validateEmail,
  ValidPhoneNumber,
  checkPasswordLength,
  redirectWithDelay,
} from "@/Core/Utils";
import { useState, FormEvent, useEffect } from "react";
import UserModel from "@/Models/User-Model";
import TextInput from "@/Components/Input-Text";
import Button from "@/Components/Button";
import { notifySuccess, notifyError } from "@/Components/Notification-Messages";
import { auth, db } from "@/Lib/firebase";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import EnumSelect from "@/Components/Enum-Select";
import { Gender } from "@/Core/Global-Enums";
import { formatDate } from "@/Core/Utils";

export default function RegisterForm() {
  const [UserData, setUserData] = useState<UserModel>({
    id: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthDay: new Date(),
    gender: "" || Gender.Male || Gender.Female || Gender.Other,
    defaultAddress: "",
    shippingAddress: "",
    userPhone: "",
    imageUserUrl: "/assets/images/avataDefault.png",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const handlePasswordChange = (x: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(x.target.value);
  };

  const handleGenderChange = (value: Gender) => {
    setUserData((prevUserData) => {
      if (typeof prevUserData === "object" && prevUserData !== null) {
        return { ...prevUserData, gender: value };
      }
      console.log("UserData.gender", UserData.gender);
      return prevUserData;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData: typeof UserData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      UserData.firstName === "" ||
      UserData.lastName === "" ||
      UserData.email === "" ||
      UserData.password === "" ||
      confirmPassword === "" ||
      UserData.defaultAddress === "" ||
      UserData.shippingAddress === "" ||
      UserData.userPhone === ""
    ) {
      notifyError("Thông tin không được để trống. Vui lòng kiểm tra lại");
      return;
    }

    const isValidEmail = validateEmail(UserData.email);
    if (!isValidEmail) {
      notifyError("Email không đúng định dạng");
      return;
    }
    const isValidPassword = checkPasswordLength(UserData.password);
    if (!isValidPassword) {
      notifyError("Mật khẩu phải ít nhất 6 ký tự");
      return;
    }
    if (UserData.password !== confirmPassword) {
      notifyError("Mật khẩu không khớp");
      return;
    }
    const isValidPhoneNumber = ValidPhoneNumber(UserData.userPhone);
    if (!isValidPhoneNumber) {
      notifyError("Số điện thoại không đúng định dạng");
      return;
    }
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, UserData.email, UserData.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("Đăng ký thất bại. userrrrrrrrrrrrrrr:", user);
        // Cập nhật UserData với uid
        const updatedUserData = {
          ...UserData,
          id: user.uid,
        };

        // Thêm vào Firestore
        return addUserDataToFirestore(updatedUserData);
      })
      .catch((error) => {
        // Xử lý lỗi
        notifyError("Đăng ký thất bại. Vui lòng kiểm tra và thử lại!1111");
        console.log("Đăng ký thất bại. Vui lòng kiểm tra và thử lại!", error);
      });

    // Hàm thêm dữ liệu người dùng vào Firestore
    const addUserDataToFirestore = async (userData: UserModel) => {
      try {
        await addDoc(collection(db, "users"), userData);

        notifySuccess("Đăng ký thành công. Vui lòng đăng nhập");
        redirectWithDelay("/dang-nhap", 2000);
        // Lưu thông tin vào local storage
      } catch (error) {
        notifyError("Đăng ký thất bại. Vui lòng kiểm tra và thử lại!2222");
        console.log("Đăng ký thất bại. Vui lòng kiểm tra và thử lại!", error);
      }
    };
  };

  return (
    <div className="max-w-md mx-auto my-4 p-6 bg-slate-50 rounded-md shadow-2xl">
      <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
        Đăng Ký Tài Khoản
      </h2>
      <form className="mx-auto mt-10">
        <TextInput
          label="Email"
          type="text"
          name="email"
          value={UserData.email}
          onChange={handleChange}
          placeholder="Email"
          isRequired={true}
        />
        <TextInput
          label="Mật khẩu"
          type="password"
          name="password"
          value={UserData.password}
          onChange={handleChange}
          placeholder="Mật khẩu"
          isRequired={true}
        />
        <TextInput
          label="Xác nhận mật khẩu"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handlePasswordChange}
          placeholder="Xác nhận lại mật khẩu"
          isRequired={true}
        />
        <TextInput
          label="Tên"
          type="text"
          name="firstName"
          value={UserData.firstName}
          onChange={handleChange}
          placeholder="Tên của bạn"
          isRequired={true}
        />
        <TextInput
          label="Họ"
          type="text"
          name="lastName"
          value={UserData.lastName}
          onChange={handleChange}
          placeholder="Họ của bạn"
          isRequired={true}
        />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Ngày sinh
          </label>
          <input
            type="date"
            name="birthDay"
            value={formatDate(UserData.birthDay).toString()}
            max="2010-01-01"
            min="1960-01-01"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <EnumSelect
          label="Giới tính"
          enumObj={Gender}
          selectedValue={UserData.gender}
          onChange={(value: string) => handleGenderChange(value as Gender)}
          includeEmpty={false}
          emptyLabel="Chọn giới tính" // Label tùy chỉnh cho option rỗng
        />
        <TextInput
          label="Địa chỉ mặc định"
          type="text"
          name="defaultAddress"
          value={UserData.defaultAddress}
          onChange={handleChange}
          placeholder="Địa chỉ"
          isRequired={true}
        />
        <TextInput
          label="Địa chỉ giao hàng"
          type="text"
          name="shippingAddress"
          value={UserData.shippingAddress}
          onChange={handleChange}
          placeholder="Địa chỉ"
          isRequired={false}
        />
        <TextInput
          label="Số điện thoại"
          type="string"
          name="userPhone"
          value={UserData.userPhone}
          onChange={handleChange}
          placeholder="0123456789"
          isRequired={false}
        />
        <div className="mb-4 text-center">
          <Button variant="success" onClick={handleSubmit} label="Đăng ký" />
        </div>
      </form>
    </div>
  );
}
