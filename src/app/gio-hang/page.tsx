"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { getAll } from "@/services/baseService";

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

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number", width: 90, hideable: true },
  {
    field: "firstName",
    headerName: "Tên",
    type: "string",
    width: 150,
    editable: false,
  },
  {
    field: "lastName",
    headerName: "Họ",
    type: "string",
    width: 150,
    editable: false,
  },
  {
    field: "birthDay",
    headerName: "Ngày sinh",
    type: "Date",
    width: 150,
    editable: false,
  },
  {
    field: "gender",
    headerName: "Giới tính",
    type: "string",
    width: 150,
    editable: false,
  },
  {
    field: "defaultAddress",
    headerName: "Địa chỉ mặc định",
    type: "string",
    width: 300,
    editable: false,
  },
  {
    field: "shippingAddress",
    headerName: "Địa chỉ giao hàng",
    type: "string",
    width: 300,
    editable: false,
  },
  {
    field: "userPhone",
    headerName: "Số điện thoại",
    type: "number",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 120,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UserPage() {
  const [rows, setRows] = useState<User[]>([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAll("users");
      setRows(users as User[]);
    };

    fetchUsers();
  }, []);
  return (
    <Box sx={{ height: 1000, width: "100%", border: 0.5 }}>
      <div className="flex my-4 mx-4">
        <div className="flex">
          <div>
            <Button onClick={handleOpen} className="mx-2 c66-top-menu-button">
              Thêm mới
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Chi tiết người dùng
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                ></Typography>
              </Box>
            </Modal>
          </div>
          <Button className="mx-2 c66-top-menu-button">Sửa</Button>
          <Button className="mx-2 c66-top-menu-button">Xóa</Button>
        </div>
        <div>
          <label htmlFor="" className="text-center font-bold text-2xl ml-96">
            Quản lý người dùng
          </label>
        </div>
      </div>
      <DataGrid
        className="mx-4 py-16 justify-center border-0"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 30,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={(row) => row.userPhone}
      />
    </Box>
  );
}
