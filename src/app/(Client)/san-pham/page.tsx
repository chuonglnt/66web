"use client";
import React from "react";
import { notifySuccess, notifyError } from "@/Components/Notification-Messages";

const ProductPage: React.FC = () => {
  const handleSuccessClick = () => {
    notifySuccess("Thông báo thành công!");
  };

  const handleErrorClick = () => {
    notifyError("Thông báo thất bại!");
  };

  return (
    <div className="gap-4 items-center justify-center w-full flex flex-col mx-4 my-6">
      <h1 className="text-2xl font-semibold">Trang Sản Phẩm</h1>
      <button
        className="c66-btn-ok-global px-2 py-1"
        onClick={handleSuccessClick}
      >
        Hiển thị thông báo thành công
      </button>
      <button
        className="c66-btn-cancel-global px-2 py-1"
        onClick={handleErrorClick}
      >
        Hiễn thị thông báo thất bại
      </button>
    </div>
  );
};

export default ProductPage;
