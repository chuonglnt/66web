"use client";
import HeaderMenu from "@/Components/Layout-Client/Header-Menu-Client";
import Footer from "@/Components/Layout-Client/Footer";
import Copyright from "@/Components/Layout-Client/Copyright";
import StoreProvider from "@/lib/redux/StoreProvider";
import Loading from "@/Components/Loading";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/lib/redux/store";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StoreProvider>
        <section className="min-h-screen content-wrapper max-w-screen-2xl mx-auto bg-slate-200 shadow-2xl rounded-2xl">
          <div className="min-h-screen content-wrapper max-w-screen-2xl mx-auto bg-slate-200 shadow-2xl rounded-2xl">
            <HeaderMenu />
            <PersistGate loading={<Loading />} persistor={persistor}>
              {children}
            </PersistGate>
          </div>
          <Footer />
          <Copyright />
        </section>
      </StoreProvider>
    </>
  );
}
