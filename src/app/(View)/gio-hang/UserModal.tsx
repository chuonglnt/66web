import React, { useState, useEffect } from "react";
import { Modal, Button, TextField, Box } from "@mui/material";
import TextInput from "@/components/inputText";
import Gender from "@/core/globalEnum";

interface dataItem {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDay: string;
  gender: typeof Gender;
  defaultAddress: string;
  shippingAddress: string;
  userPhone: string;
  imageUserUrl: string;
  // các trường khác...
}

interface Props {
  dataItem: any;
  open: boolean;
  onClose: () => void;
  onSave: (user: dataItem) => void;
  userToEdit?: dataItem; // User cần chỉnh sửa, không bắt buộc
}

const UserModal: React.FC<Props> = ({
  dataItem,
  open,
  onClose,
  onSave,
  userToEdit,
}) => {
  const [user, setUser] = useState<dataItem>({
    email: "",
    firstName: "",
    lastName: "",
    birthDay: "",
    gender: "",
    defaultAddress: "",
    shippingAddress: "",
    userPhone: "",
    imageUserUrl: "",
  });

  useEffect(() => {
    if (userToEdit) {
      setUser(userToEdit);
    } else {
      setUser({
        email: "",
        firstName: "",
        lastName: "",
        birthDay: "",
        gender: "",
        defaultAddress: "",
        shippingAddress: "",
        userPhone: "",
        imageUserUrl: "",
      });
    }
  }, [userToEdit]);

  const handleSave = () => {
    onSave(user);
    onClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (x: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(x.target.value);
  };

  return (
    <Modal open={open} onClose={onClose}>
      {/* <Box
        p={2}
        style={{
          backgroundColor: "white",
          width: "400px",
          margin: "20px auto",
        }}
      > */}
      <div className="max-w-xl mx-auto my-10 p-6 bg-white rounded-md shadow-2xl">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
          Thêm Tài Khoản Mới
        </h2>
        <form className="max-w-md mx-auto mt-10">
          <TextInput
            label="Email"
            type="text"
            name="email"
            value={dataItem}
            onChange={handleChange}
            placeholder="Email"
            isRequired={true}
          />
          <TextInput
            label="Mật khẩu"
            type="password"
            name="password"
            value={dataItem}
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
            value={dataItem}
            onChange={handleChange}
            placeholder="Tên của bạn"
            isRequired={true}
          />
          <TextInput
            label="Họ"
            type="text"
            name="lastName"
            value={dataItem}
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
              value={dataItem}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <TextInput
            label="Giớ tính"
            type="text"
            name="gender"
            value={dataItem}
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
            value={dataItem}
            onChange={handleChange}
            placeholder="Địa chỉ"
            isRequired={true}
          />
          <TextInput
            label="Địa chỉ giao hàng"
            type="text"
            name="shippingAddress"
            value={dataItem}
            onChange={handleChange}
            placeholder="Địa chỉ"
            isRequired={false}
          />
          <TextInput
            label="Số điện thoại"
            type="string"
            name="userPhone"
            value={dataItem}
            onChange={handleChange}
            placeholder="0123456789"
            isRequired={false}
          />
          <div className="mb-4 text-center">
            <Button variant="contained" color="success" onClick={handleSave}>
              Lưu Lại
            </Button>
          </div>
        </form>
      </div>
      {/* </Box> */}
    </Modal>
  );
};

export default UserModal;
