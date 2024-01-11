"use client";
import NotificationMessages from "@/Components/Notification-Messages";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import HeaderMobile from "../../Components/Layout-Admin/Header-Mobile-Admin";
import HeaderAdmin from "../../Components/Layout-Admin/Header-Admin";
import "@/app/globals.css";
import SideNavAdmin from "../../Components/Layout-Admin/SideNav-Admin";
import MarginWidthWrapper from "../../Components/Layout-Admin/Margin-Width-Wrapper-Admin";
import PageWrapper from "../../Components/Layout-Admin/Page-Wrapper-Admin";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <AppRouterCacheProvider>
            <NotificationMessages />
            <SideNavAdmin />
          </AppRouterCacheProvider>
        </div>
        <main className="flex-1">
          <MarginWidthWrapper>
            <HeaderAdmin />
            <HeaderMobile />
            <PageWrapper>{children}</PageWrapper>
          </MarginWidthWrapper>
        </main>
      </body>
    </html>
  );
}
