import * as React from "react";
import Link from "next/link";
import {
  DataGrid as MuiDataGrid,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";

type CustomDataGridProps = {
  columns: GridColDef[];
  rows: any[];
  editPath?: string; // Đường dẫn cơ bản cho trang edit
  handleDelete?: (id: string) => void; // Hàm xử lý khi nhấn nút delete
};

const CustomDataGrid = ({
  columns,
  rows,
  editPath,
  handleDelete,
}: CustomDataGridProps) => {
  // Thêm cột hành động nếu cần
  const actionColumn: GridColDef = {
    field: "actions",
    headerName: "Actions",
    width: 180,
    renderCell: (params: GridRenderCellParams) => (
      <div className="flex gap-2">
        {editPath && (
          <Link href={`/users/${params.row.id}`} passHref>
            <span className="text-blue-500 cursor-pointer">Edit</span>
          </Link>
        )}
        {handleDelete && (
          <button
            className="text-red-500"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </button>
        )}
      </div>
    ),
  };

  // Thêm cột hành động vào mảng cột nếu có editPath hoặc handleDelete
  const gridColumns =
    editPath || handleDelete ? [...columns, actionColumn] : columns;

  return (
    <div style={{ height: 400, width: "100%" }}>
      <MuiDataGrid
        rows={rows}
        getRowId={(row) => row.uid}
        columns={gridColumns}
        checkboxSelection={false}
      />
    </div>
  );
};

export default CustomDataGrid;
