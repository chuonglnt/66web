import { Icon } from "@iconify/react";

import { SideNavItem } from "@/Components/Layout-Admin/Types-Admin";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/admin",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: "Tài Khoản",
    path: "/account",
    icon: <Icon icon="lucide:account" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Danh sách", path: "/admin/users" },
      { title: "Thêm mới", path: "/admin/add-user" },
      { title: "Chỉnh sửa", path: "/admin/users" },
    ],
  },
  {
    title: "Đơn hàng",
    path: "/account",
    icon: <Icon icon="lucide:account" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Đơn mới", path: "/admin" },
      { title: "Đang giao", path: "/admin" },
      { title: "Đơn hoàn thành", path: "/admin" },
    ],
  },
  {
    title: "Sản Phẩm",
    path: "/san-pham",
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
  },
  {
    title: "Danh mục",
    path: "/danh-muc",
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Thêm danh mục", path: "/admin" },
      { title: "Privacy", path: "/admin" },
    ],
  },
  {
    title: "Báo cáo",
    path: "/account",
    icon: <Icon icon="lucide:account" width="24" height="24" />,
  },
  {
    title: "Cài đặt",
    path: "/",
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
];
