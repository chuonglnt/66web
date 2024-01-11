"use client";
import NotificationMessages from "@/components/notificationMessages";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import HeaderMobile from "./header-mobileAdmin";
import HeaderAdmin from "./headerAdmin";
import "@/app/globals.css";
import SideNavAdmin from "./side-navAdmin";
import MarginWidthWrapper from "./margin-width-wrapper";
import PageWrapper from "./page-wrapper";

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
