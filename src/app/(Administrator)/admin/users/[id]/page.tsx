"use client";
import React, { useState, useEffect } from "react";
import Tabs from "@/Components/Tabs"; // Adjust path as necessary
import TextInput from "@/Components/Input-Text";
import { Gender } from "@/Core/Global-Enums";
import EnumSelect from "@/Components/Enum-Select";
import { ChangeEvent } from "react";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import DateInput from "@/Components/Input-Date";
import { notifyError, notifySuccess } from "@/Components/Notification-Messages";
import UserVartaImage from "@/Components/User-Avarta-Image";
import {
  UpdateUserPayload,
  updateUserField,
  fetchUserDetailById,
  fetchUpdateUser,
} from "@/lib/redux/features/userSlice";
import InputImage from "@/Components/Input_Image";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserModel } from "@/Core/Base-Model";

const UserDetailPage = () => {
  const [dataItem, setDataItem] = useState<UserModel>({
    id: "",
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
    createdAt: "",
    updatedAt: "",
    emailVerified: false,
    isdeleted: false,
  });
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const currentUserId = useSelector(
    (state: RootState) => state.user.currentUserId
  );
  const dataItemRedux = useSelector((state: RootState) => state.user.dataItem);

  useEffect(() => {
    dispatch(fetchUserDetailById(currentUserId));
    setDataItem(dataItemRedux);
  }, [currentUserId, dispatch, dataItemRedux]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateUserField({ field: name, value }));
  };

  const handleChangeGender = (value: Gender) => {
    dispatch(updateUserField({ field: "gender", value: value }));
  };

  const handleDateChange = (newDate: string) => {
    dispatch(updateUserField({ field: "birthDay", value: newDate }));
  };

  // const handleImageChange = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const file = event.target.files[0];

  //     try {
  //       const resizedImage = await resizeImage(file, 360, 360); // Resize với maxWidth là 800 và maxHeight là 600
  //       setFile(resizedImage);
  //       // ...
  //     } catch (error) {
  //       console.error("Error resizing image:", error);
  //     }
  //   }
  // };

  const handleImageChange = (file: File | null) => {
    // Xử lý file ảnh được chọn ở đây
    if (file) {
      // Nếu có file, cập nhật state hoặc thực hiện hành động khác
      setSelectedImage(file);

      // Ví dụ: tạo URL để xem trước ảnh
      const previewUrl = URL.createObjectURL(file);
      // Làm gì đó với URL xem trước, như cập nhật state hoặc hiển thị ảnh
    } else {
      // Xử lý trường hợp không có file, có thể là người dùng đã hủy chọn file
      setSelectedImage(null);
    }
  };

  const handleUpdateProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload: UpdateUserPayload = {
      currentUserId: currentUserId,
      dataItem: dataItem,
    };

    if (selectedImage !== undefined) {
      payload.file = selectedImage;
    }

    dispatch(fetchUpdateUser(payload))
      .then((action) => {
        if (fetchUpdateUser.fulfilled.match(action)) {
          // Thông báo thành công
          notifySuccess("Cập nhật thành công");
          router.push("/admin/users");
        } else {
          // Thông báo lỗi
          notifyError("Cập nhật thất bại. Vui lòng thử lại sau");
          console.log("Cập nhật thất bại");
        }
      })
      .catch((error) => {
        // Xử lý lỗi
        notifyError("Có lỗi xảy ra. Vui lòng thử lại sau");

        console.error("Có lỗi xảy ra:", error);
      });
  };
  // const [activeTab, setActiveTab] = useState<string | number>(""); // State này giữ key của tab đang hoạt động

  // Hàm này sẽ được gọi khi một tab được click
  // const handleChangeTab = (key: string | number) => {
  //   setActiveTab(key); // Cập nhật state với key của tab được click
  // };
  const tabs = [
    {
      key: "info",
      title: "Thông Tin",
      content: (
        <div className="flex flex-row w-full">
          <div className="flex-col w-96 mx-10 my-auto items-center justify-center">
            <TextInput
              label="Email"
              type="text"
              name="email"
              value={dataItem.email}
              onChange={handleChange}
              placeholder="Email"
              isRequired={true}
            />
            <TextInput
              label="Tên"
              type="text"
              name="firstName"
              value={dataItem.firstName}
              onChange={handleChange}
              placeholder="Tên của bạn"
              isRequired={true}
            />
            <TextInput
              label="Họ"
              type="text"
              name="lastName"
              value={dataItem.lastName}
              onChange={handleChange}
              placeholder="Họ của bạn"
              isRequired={true}
            />
            <DateInput
              label="Ngày sinh"
              value={dataItem.birthDay}
              onChange={handleDateChange}
            ></DateInput>
            <EnumSelect
              label="Giới tính"
              enumObj={Gender}
              selectedValue={dataItem.gender}
              onChange={(value: string) => handleChangeGender(value as Gender)}
              includeEmpty={false}
              emptyLabel="Chọn giới tính"
            />
            <TextInput
              label="Địa chỉ mặc định"
              type="text"
              name="defaultAddress"
              value={dataItem.defaultAddress}
              onChange={handleChange}
              placeholder="Địa chỉ"
              isRequired={true}
            />
            <TextInput
              label="Địa chỉ giao hàng"
              type="text"
              name="shippingAddress"
              value={dataItem.shippingAddress}
              onChange={handleChange}
              placeholder="Địa chỉ"
              isRequired={false}
            />
            <TextInput
              label="Số điện thoại"
              type="text"
              name="phoneNumber"
              value={dataItem.phoneNumber}
              onChange={handleChange}
              placeholder="0123456789"
              isRequired={false}
            />
            <button
              type="submit"
              onClick={handleUpdateProfile}
              className="c66-btn-edit-data-grid"
            >
              {dataItem.id === "create" ? "Thêm Mới" : "Cập Nhật"}
            </button>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col ">
              <label className="mx-6 my-4 font-medium">
                Ảnh đại diện hiện tại
              </label>
              <UserVartaImage
                src={dataItem.photoUrl || "/assets/images/avata-default.jpg"}
                alt="avarta user image"
              />
            </div>
            <div className="flex flex-col ">
              {/* Sử dụng component InputImage và truyền hàm handleImageChange cho prop onChange */}
              <InputImage onChange={handleImageChange} />

              {/* Nếu bạn muốn hiển thị ảnh được chọn, hãy thêm một element img và sử dụng URL xem trước */}
              {selectedImage && (
                <Image
                  src={URL.createObjectURL(selectedImage)}
                  alt="Preview"
                  width={200}
                  height={200}
                  priority={true}
                />
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "detail",
      title: "Thông Tin Chi Tiết",
      content: <h1>Thông tin chi tiết</h1>,
    },
  ];

  return (
    // <form className="items-center justify-center flex">
    <Tabs tabs={tabs} />
    // </form>
  );
};

export default UserDetailPage;
