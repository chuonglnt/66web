"use client";
import React, { useState } from "react";
import ConfirmModal from "@/Components/Confirm-Modal";
import CustomDataGrid from "@/Components/Custom-Data-Grid";
import { GetAll, Delete } from "@/Services/Base-Service";
import useSWR, { mutate } from "swr";
import Loading from "@/Components/Loading";
import { notifyError, notifySuccess } from "@/Components/Notification-Messages";
import Link from "next/link";
import { UserModel } from "@/Core/Base-Model";

function UsersPage() {
  const columns = [
    { field: "firstName", headerName: "Tên", width: 150 },
    { field: "lastName", headerName: "Họ", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "birthDay", headerName: "Ngày sinh", width: 100 },
    { field: "gender", headerName: "Giới tính", width: 70 },
    { field: "phoneNumber", headerName: "Điện thoại", width: 120 },
    { field: "defaultAddress", headerName: "Địa chỉ mặc định", width: 430 },
    { field: "shippingAddress", headerName: "Địa chỉ giao hàng", width: 430 },
    { field: "createdAt", headerName: "Ngày tạo", width: 180 },
    { field: "updatedAt", headerName: "Cập nhật", width: 180 },
    { field: "emailVerified", headerName: "Xác nhận Email", width: 60 },
    { field: "isdeleted", headerName: "Xóa", width: 60 },
  ];

  const fetcher = async (): Promise<UserModel[] | any> => {
    try {
      const data = await GetAll("users"); // 'users' là tên collection
      return data as UserModel[];
    } catch (error) {
      throw error;
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const { data, error } = useSWR<UserModel[]>("usersCollection", fetcher);

  const handleOpenModal = (id: string) => {
    setSelectedItemId(id);
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };
  const handleConfirmDelete = async (id: string) => {
    setIsModalOpen(false);
    try {
      await Delete("users", id);
      const updatedData = data?.filter((item: UserModel) => item.id !== id);
      mutate("usersCollection", updatedData, false);
      notifySuccess("Đã xóa thành công");
    } catch (error) {
      notifyError("Xóa thất bại. Vui lòng thử lại sau");
    }
  };

  if (error) return <div>Failed to load users</div>;
  if (!data) return <Loading />;

  return (
    <div>
      <div>
        <Link href="/users/create">Thêm mới</Link>
      </div>
      <div>
        <CustomDataGrid
          columns={columns}
          rows={data}
          editPath={`/users/${data}`}
          handleDelete={handleOpenModal}
        />
      </div>
      <div>
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={handleClose}
          onConfirm={() => handleConfirmDelete(selectedItemId)}
          message="Bạn có chắc chắn muốn xóa mục này không?"
          confirmText="Xác nhận"
          cancelText="Hủy"
          id={""}
        />
      </div>
    </div>
  );
}

export default UsersPage;
