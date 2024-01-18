"use client";
import NotificationMessages from "@/Components/Notification-Messages";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import HeaderMobile from "../../Components/Layout-Admin/Header-Mobile-Admin";
import HeaderAdmin from "../../Components/Layout-Admin/Header-Admin";
import "@/app/globals.css";
import SideNavAdmin from "../../Components/Layout-Admin/SideNav-Admin";
import MarginWidthWrapper from "../../Components/Layout-Admin/Margin-Width-Wrapper-Admin";
import PageWrapper from "../../Components/Layout-Admin/Page-Wrapper-Admin";
import StoreProvider from "@/lib/redux/StoreProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
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
          <PageWrapper>
            <StoreProvider>{children}</StoreProvider>
          </PageWrapper>
        </MarginWidthWrapper>
      </main>
    </section>
  );
}
// Suspense Vẫn chưa work đang dùng loading từ SWR load Loading.tsx
