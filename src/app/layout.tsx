import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header3 from "@/components/header3";
import Footer from "@/components/footer";
import Copyright from "@/components/copyright";
import NotificationMessages from "@/components/notificationMessages";

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
    <html lang="en">
      <body className={roboto.className}>
        <div className="content-wrapper max-w-screen-2xl text-base mx-auto bg-white">
          <NotificationMessages />
          <Header3 />
          {children}
          <Footer />
          <Copyright />
        </div>
      </body>
    </html>
  );
}
