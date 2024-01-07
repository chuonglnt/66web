"use client";
import { useState, FormEvent } from "react";
import UserModel from "@/models/userModel";
import TextInput from "@/components/inputText";
import Button from "@/components/button";
import { notifySuccess, notifyError } from "@/components/notificationMessages";
import {
  validateEmail,
  validateNoSpecialCharacters,
  ValidPhoneNumber,
  checkPasswordLength,
  redirectWithDelay,
} from "@/core/utils";
import { auth, db } from "@/lib/firebase";

export default function RegisterForm() {
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (x: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(x.target.value);
  };
  const [UserData, setUserData] = useState<UserModel>({
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
    imageUserUrl: "/assets/images/avataDefault.png",
  });

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
      (console.log(UserData),
      UserData.firstName === "" ||
        UserData.lastName === "" ||
        UserData.birthDay === "" ||
        UserData.email !== "" ||
        UserData.password === "" ||
        confirmPassword === "" ||
        UserData.defaultAddress === "" ||
        UserData.shippingAddress === "" ||
        UserData.userPhone === "")
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

    try {
      // Tạo người dùng trên Firebase Authentication
      const userCredential = await auth.createUserWithEmailAndPassword(
        auth,
        UserData.email,
        UserData.password
      );
      const user = userCredential.user;

      if (!user) throw new Error("User creation failed");

      // Lưu thông tin người dùng vào Firestore
      const userRef = await db
        .collection("users")
        .doc(user.uid)
        .set({
          ...UserData,
          uid: user.uid,
        });

      // Lưu thông tin vào local storage
      notifySuccess("Đăng ký thành công. Vui lòng đăng nhập");
      redirectWithDelay("/dang-nhap", 2000);
    } catch (error) {
      notifyError("Đăng ký thất bại. Vui lòng kiểm tra và thử lại!");
    }
  };
  return (
    <div className="max-w-md mx-auto my-32 p-6 bg-white rounded-md shadow-2xl">
      <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
        Đăng Ký Tài Khoản
      </h2>
      <form className="max-w-md mx-auto mt-10">
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
          placeholder="Password"
          isRequired={true}
        />
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Xác nhận lại mật khẩu"
          >
            Xác nhận lại mật khẩu
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handlePasswordChange}
            placeholder="Xác nhận lại mật khẩu"
            className="w-full p-2 border border-gray-300 rounded-md"
            required={true}
          />
        </div>
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
            value={UserData.birthDay}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <TextInput
          label="Giớ tính"
          type="text"
          name="gender"
          value={UserData.gender}
          onChange={handleChange}
          placeholder="Giới tính của bạn"
          isRequired={true}
        />
        {/* <RadioButton
          labelName="Giới tính"
          name="gender"
          value={selectedGenderOptions}
          onChange={setSelectedGenderOptions}
        /> */}
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
