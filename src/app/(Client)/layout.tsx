import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/app/globals.css";
import HeaderMenu from "@/Components/Layout-Client/Header-Menu-Client";
import Footer from "@/Components/Layout-Client/Footer";
import Copyright from "@/Components/Layout-Client/Copyright";
import NotificationMessages from "@/Components/Notification-Messages";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

const roboto = Roboto({
  display: "swap",
  style: ["normal", "italic"],
  subsets: [
    "latin",
    "latin-ext",
    "vietnamese",
    "cyrillic-ext",
    "cyrillic",
    "greek-ext",
    "greek",
  ],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Cty TNHH Nam Phú Hưng",
  description: "Đồng hành phát triển cùng bạn",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="bg-slate-100" lang="en">
      <body className={`{roboto.className} bg-slate-200`}>
        <AppRouterCacheProvider>
          <NotificationMessages />
          <div className="min-h-screen content-wrapper max-w-screen-2xl mx-auto bg-slate-200 shadow-2xl rounded-2xl">
            <NotificationMessages />
            <HeaderMenu />
            {children}
          </div>
          <Footer />
          <Copyright />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
