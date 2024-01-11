import { Icon } from "@iconify/react";

import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/admin",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: "Projects",
    path: "/admin",
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "All", path: "/admin" },
      { title: "Web Design", path: "/admin" },
      { title: "Graphic Design", path: "/admin" },
    ],
  },
  {
    title: "Messages",
    path: "/admin",
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
  },
  {
    title: "Settings",
    path: "/admin",
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Account", path: "/admin" },
      { title: "Privacy", path: "/admin" },
    ],
  },
  {
    title: "Help",
    path: "/",
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
];
