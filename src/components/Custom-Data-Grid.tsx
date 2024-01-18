import * as React from "react";
import Link from "next/link";
import {
  DataGrid as MuiDataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";

type CustomDataGridProps = {
  setModel?: (model: any) => void; // Hàm set model cho context
  basePath: string; // Đường dẫn cơ bản cho trang
  columns: GridColDef[];
  rows: any[];
  editPath?: string; // Đường dẫn cơ bản cho trang edit
  handleDelete?: (id: string) => void;
  onRowClick: (params: GridRowParams) => void;
  onRowDoubleClick: (params: GridRowParams) => void; // Hàm xử lý khi nhấn nút delete
};

const CustomDataGrid = ({
  basePath,
  columns,
  rows,
  editPath,
  handleDelete,
  onRowClick,
  onRowDoubleClick,
}: CustomDataGridProps) => {
  let clickTimeout: null | ReturnType<typeof setTimeout> = null;
  const handleClick = (params: GridRowParams) => {
    if (!clickTimeout) {
      // Nếu clickTimeout chưa được set, set nó để kiểm tra double-click
      clickTimeout = setTimeout(() => {
        clickTimeout = null; // Reset sau khi đợi
      }, 250); // Đặt thời gian chờ cho double-click
    } else {
      // Nếu clickTimeout đã được set, nghĩa là đây là double-click
      clearTimeout(clickTimeout); // Clear timeout
      clickTimeout = null; // Reset clickTimeout

      onRowDoubleClick(params); // Thực hiện hành động cho double-click
    }
  };

  const actionColumn: GridColDef = {
    field: "actions",
    headerName: "Actions",
    width: 180,
    renderCell: (params: GridRenderCellParams) => (
      <div className="flex items-center justify-center gap-2 ">
        {editPath && (
          <Link href={`${basePath}/${params.row.id}`} passHref>
            <span className="c66-btn-edit-data-grid">Edit</span>
          </Link>
        )}
        {handleDelete && (
          <button
            className="c66-btn-delete-data-grid"
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
    <div style={{ height: "100%", width: "100%" }}>
      <MuiDataGrid
        sx={{
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
        rows={rows}
        getRowId={(row) => row.id}
        columns={gridColumns}
        onRowClick={handleClick}
        checkboxSelection={false}
      />
    </div>
  );
};

export default CustomDataGrid;
