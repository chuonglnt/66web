import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      {/* Thêm các link điều hướng ở đây */}
      <Link href="/">Trang chủ</Link>
      <Link href="/danh-muc">Danh mục</Link>
      <Link href="/san-pham">Sản phẩm</Link>
      <Link href="/thanh-toan">Thanh toán</Link>
      <Link href="/lien-he">Liên hệ</Link>
      {/* Các link khác */}
    </nav>
  );
};

export default Navbar;
