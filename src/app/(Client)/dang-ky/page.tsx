"use client";
import {
  validateEmail,
  ValidPhoneNumber,
  checkPasswordLength,
  redirectWithDelay,
  formatDateTime,
} from "@/Core/Utils";
import { useState, FormEvent } from "react";
import { UserModel } from "@/Core/Base-Model";
import TextInput from "@/Components/Input-Text";
import Button from "@/Components/Button";
import { notifySuccess, notifyError } from "@/Components/Notification-Messages";
import { db, auth } from "@/lib/firebase/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import EnumSelect from "@/Components/Enum-Select";
import { Gender } from "@/Core/Global-Enums";
import hashPassword from "@/Core/Hash-Password";
import DateInput from "@/Components/Input-Date";

export default function RegisterForm() {
  const [UserData, setUserData] = useState<UserModel>({
    uid: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthDay: "",
    gender: "" || Gender.Male || Gender.Female || Gender.Other,
    defaultAddress: "",
    shippingAddress: "",
    displayName: "",
    phoneNumber: "",
    photoUrl: "/assets/images/avata-default.jpg",
    createdAt: formatDateTime(new Date()),
    updatedAt: formatDateTime(new Date()),
    emailVerified: false,
    isdeleted: false,
  });

  const handleDateChange = (newDate: string) => {
    setUserData({ ...UserData, birthDay: newDate });
  };
  // const [birthDay, setbirthDay] = useState(Date);
  // const handleDateChange = (x: React.ChangeEvent<HTMLInputElement>) => {
  //   const rawDate = x.target.value;
  //   // Chuyển đổi sang dd/mm/yyyy
  //   const formatedDate = rawDate.split("-").reverse().join("/");
  //   setUserData({ ...UserData, birthDay: formatedDate });
  //   setbirthDay(rawDate);
  // };

  const [confirmPassword, setConfirmPassword] = useState("");
  const handlePasswordChange = (x: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(x.target.value);
  };
  const handleGenderChange = (value: Gender) => {
    setUserData((prevUserData) => {
      if (typeof prevUserData === "object" && prevUserData !== null) {
        return { ...prevUserData, gender: value };
      }
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
      UserData.phoneNumber === ""
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
    const isValidPhoneNumber = ValidPhoneNumber(UserData.phoneNumber);
    if (!isValidPhoneNumber) {
      notifyError("Số điện thoại không đúng định dạng");
      return;
    }

    createUserWithEmailAndPassword(auth, UserData.email, UserData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        const updatedUserData = {
          ...UserData,
          uid: user.uid,
        };
        return addUserDataToFirestore(updatedUserData);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          notifyError("Tài khoản email đã được đăng ký. Vui lòng kiểm tra lại");
          return;
        } else {
          notifyError("Đăng ký thất bại. Vui lòng kiểm tra và thử lại!");
          return;
        }
      });

    const addUserDataToFirestore = async (UserData: UserModel) => {
      try {
        const hashedPassword = await hashPassword(UserData.password);
        UserData.password = hashedPassword as string;
        await addDoc(collection(db, "users"), UserData);
        notifySuccess("Đăng ký thành công. Vui lòng đăng nhập");
        // redirectWithDelay("/dang-nhap", 2000);
      } catch (error) {
        notifyError("Đăng ký thất bại. Vui lòng kiểm tra và thử lại!");
        console.error("Lỗi khi thêm dữ liệu người dùng vào Firestore:", error);
        console.log("UserData sau khi hash:", UserData);
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
        <DateInput
          label="Ngày sinh"
          value={UserData.birthDay}
          onChange={handleDateChange}
        ></DateInput>
        {/* <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Ngày sinh
          </label>
          <input
            type="date"
            name="birthDay"
            value={birthDay}
            max="2010-01-01"
            min="1960-01-01"
            onChange={handleDateChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div> */}
        <EnumSelect
          label="Giới tính"
          enumObj={Gender}
          selectedValue={UserData.gender}
          onChange={(value: string) => handleGenderChange(value as Gender)}
          includeEmpty={false}
          emptyLabel="Chọn giới tính"
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
          type="text"
          name="phoneNumber"
          value={UserData.phoneNumber}
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
