"use client";
import { Provider } from "react-redux";
import { store, persistor } from "@/lib/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "@/Components/Auth-Context";
import Loading from "@/Components/Loading";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>
        <Provider store={store}>{children}</Provider>
      </AuthProvider>
    </>
  );
}
