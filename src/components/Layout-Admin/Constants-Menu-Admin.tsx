import { Icon } from "@iconify/react";

import { SideNavItem } from "@/Components/Layout-Admin/Types-Admin";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/admin",
    icon: <Icon icon="icon-park:home" width="32" height="32" />,
  },
  {
    title: "Tài Khoản",
    path: "/account",
    icon: <Icon icon="icon-park:open-an-account" width="32" height="32" />,
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
    icon: <Icon icon="icon-park:transaction-order" width="32" height="32" />,
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
    icon: <Icon icon="logos:productboard-icon" width="32" height="32" />,
  },
  {
    title: "Danh mục",
    path: "/danh-muc",
    icon: <Icon icon="icon-park:category-management" width="32" height="32" />,
    submenu: true,
    subMenuItems: [
      { title: "Thêm danh mục", path: "/admin" },
      { title: "Privacy", path: "/admin" },
    ],
  },
  {
    title: "Báo cáo",
    path: "/account",
    icon: <Icon icon="icon-park:table-report" width="32" height="32" />,
  },
  {
    title: "Cài đặt",
    path: "/",
    icon: <Icon icon="icon-park:setting" width="32" height="32" />,
  },
];
