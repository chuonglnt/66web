import HeaderMenu from "@/Components/Layout-Client/Header-Menu-Client";
import Footer from "@/Components/Layout-Client/Footer";
import Copyright from "@/Components/Layout-Client/Copyright";
import StoreProvider from "@/lib/redux/StoreProvider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="min-h-screen content-wrapper max-w-screen-2xl mx-auto bg-slate-200 shadow-2xl rounded-2xl">
        <HeaderMenu />
        <StoreProvider>{children}</StoreProvider>
      </div>
      <Footer />
      <Copyright />
    </section>
  );
}
