"use client";
import React, { useEffect, useState } from "react";
import CustomDataGrid from "@/Components/Custom-Data-Grid";
import { GetAll, Delete } from "@/Services/Base-Service";
import { UserModel } from "@/Core/Base-Model";

const UserPage = () => {
  // Định nghĩa các cột cho DataGrid
  const columns = [
    { field: "email", headerName: "Email", width: 150 },
    { field: "firstName", headerName: "Tên", width: 150 },
    { field: "lastName", headerName: "Họ", width: 150 },
    { field: "birthDay", headerName: "Ngày sinh", width: 150 },
    { field: "gender", headerName: "Giới tính", width: 100 },
    { field: "userPhone", headerName: "Điện thoại", width: 150 },
    { field: "defaultAddress", headerName: "Địa chỉ mặc định", width: 300 },
    { field: "shippingAddress", headerName: "Địa chỉ giao hàng", width: 300 },
    // Thêm các cột khác theo cần thiết
  ];
  const [users, setUsers] = useState<UserModel[]>([]);

  useEffect(() => {
    GetAll("Users")
      .then((data) => {
        setUsers(data as UserModel[]);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching users: ", error);
      });
  }, []);

  // Hàm xử lý khi nhấn nút delete
  const handleDelete = (uid: string) => {
    // Gọi hàm Delete từ Base-Service
    Delete("Users", uid)
      .then(() => {
        // Cập nhật trạng thái hoặc thông báo sau khi xóa thành công
        console.log(`User with id ${uid} deleted successfully`);
        // Reload hoặc cập nhật danh sách users
      })
      .catch((error) => {
        console.error("Error deleting user: ", error);
        // Xử lý lỗi ở đây
      });
  };

  return (
    <CustomDataGrid
      columns={columns}
      rows={users}
      
      editPath="/users" // Đường dẫn cơ bản cho trang edit
      handleDelete={handleDelete}
    />
  );
};

export default UserPage;
