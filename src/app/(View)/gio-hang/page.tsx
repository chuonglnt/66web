"use client";
interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDay: string;
  gender: string;
  defaultAddress: string;
  shippingAddress: string;
  userPhone: string;
  imageUserUrl: string;
}
interface UserGridProps {
  users: User[];
}

import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import UserModel from "@/models/userModel";
import { getAll, deleteById } from "@/services/baseService";
import { db } from "@/lib/firebase";
import UserModal from "./UserModal";

export default function UserGrid(): { arg0: any } {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "gender", headerName: "Gender", width: 120 },
    { field: "defaultAddress", headerName: "Default Address", width: 160 },
    { field: "shippingAddress", headerName: "Shipping Address", width: 160 },
    { field: "userPhone", headerName: "Phone", width: 130 },
    // { field: "imageUserUrl", headerName: "Image URL", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params: any) => (
        <>
          <Button variant="contained" onClick={() => handleEdit(params.row)}>
            Edit
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleDelete(event, params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  let handleEdit = (currentUser: UserModel) => {
    console.log("Edit", currentUser);
    // Code to handle edit
  };

  let handleDelete = (event: any, id: string) => {
    console.log("Delete", id);
    event.stopPropagation();
    deleteById(db, "users", id)
      .then(() => {
        console.log("Tài liệu đã được xóa thành công");
        // Cập nhật UI hoặc thông báo cho người dùng ở đây
      })
      .catch((error: any) => {
        console.error("Lỗi khi xóa tài liệu:", error);
        // Xử lý lỗi ở đây
      });
  };
  let [isModalOpen, setIsModalOpen] = useState(false);
  let [currentUser, setCurrentUser] = useState<UserModel | undefined>(
    undefined
  );
  let [UserData, setUserData] = useState<UserModel[]>([]);

  let handleOpenModal = (UserData: UserModel[]) => {
    // Tìm người dùng cụ thể từ mảng users dựa vào id
    let userToEdit = UserData.find((user) => user.id === user.id);
    if (userToEdit) {
      setCurrentUser(userToEdit);
      setIsModalOpen(true);
    }
  };

  let handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let handleSaveUser = (UserData: any) => {
    console.log("Lưu người dùng:", UserData);
    // Lưu dữ liệu người dùng ở đây (ví dụ: gửi tới server)
    setIsModalOpen(false);
  };
  let getAllUsers = async () => {
    try {
      // Giả sử fetchUsers là hàm lấy dữ liệu từ API hoặc cơ sở dữ liệu
      let responseData = await getAll("users");
      setUserData(responseData as UserModel[]);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal(UserData)}
        style={{ marginBottom: "20px" }}
      >
        Add New
      </Button>
      <DataGrid
        rows={UserData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
      />
      <UserModal onClose={handleCloseModal} open={isModalOpen} />
    </div>
  );
}
