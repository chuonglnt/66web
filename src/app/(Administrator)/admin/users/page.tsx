"use client";
// ************ Start Import ************
import React, { useState, useEffect } from "react";
import ConfirmModal from "@/Components/Confirm-Modal";
import CustomDataGrid from "@/Components/Custom-Data-Grid";
import { notifyError, notifySuccess } from "@/Components/Notification-Messages";
import Link from "next/link";
import { GridRowParams } from "@mui/x-data-grid";
import {
  fetchAllUsers,
  setCurrentUserId,
  fetchDeleteUser,
} from "@/lib/redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
// ************ End Import ************
export default function UsersDataGridPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const dataObj = useSelector((state: RootState) => state.user.dataObj);
  const currentUserId = useSelector(
    (state: RootState) => state.user.currentUserId || ""
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  // ************ Getl All Data User First Load For Data Grid ************
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  // ************ Config Field For Data Grid ************
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
  // ************ Handle One Click On Data Grid ************
  const handleRowClick = (params: GridRowParams) => {
    dispatch(setCurrentUserId(params.row.id));
    // router.push(`users/${params.row.id}`);
  };
  // ************ Handle Double Click On Data Grid ************

  const handleRowDoubleClick = (params: GridRowParams) => {
    dispatch(setCurrentUserId(params.row.id));
    router.push(`users/${params.row.id}`);
  };
  // ************ Handle Open Modal To Confirm Delete On Data Grid ************

  const handleOpenModal = (id: string) => {
    dispatch(setCurrentUserId(id));
    setIsModalOpen(true);
  };
  // ************ Handle Close Modal To Confirm Delete On Data Grid ************

  const handleClose = () => {
    setIsModalOpen(false);
  };
  // ************ Handle Delete After Confirm Delete On Data Grid ************
  const handleConfirmDelete = async (currentUserId: string) => {
    setIsModalOpen(false);
    try {
      dispatch(fetchDeleteUser(currentUserId));
      dispatch(fetchAllUsers());
      notifySuccess("Đã xóa thành công");
    } catch (error) {
      notifyError("Xóa dữ liệu thất bại. Vui lòng thử lại sau");
    }
  };
  // ************ View - Data Grid - Confirm Modal ************

  return (
    <div>
      <div>
        <Link href="/admin/users/create">Thêm mới</Link>
      </div>
      <div>
        <CustomDataGrid
          columns={columns}
          rows={dataObj}
          basePath="/admin/users"
          editPath={`${dataObj}`}
          onRowClick={handleRowClick}
          onRowDoubleClick={handleRowDoubleClick}
          handleDelete={handleOpenModal}
        />
      </div>
      <div>
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={handleClose}
          onConfirm={() => handleConfirmDelete(currentUserId)}
          message="Bạn có chắc chắn muốn xóa mục này không?"
          confirmText="Xác nhận"
          cancelText="Hủy"
          id={""}
        />
      </div>
    </div>
  );
}
