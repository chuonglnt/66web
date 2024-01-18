// import React, { createContext, ReactNode, useContext, useState } from "react";
// import { UserModel } from "@/Core/Base-Model";
// import { Gender } from "@/Core/Global-Enums";
// import { formatDateTime } from "@/Core/Utils";

// // Bước 1: Tạo một Dynamic Context
// type DynamicContextType<T> = {
//   model: T;
//   setModel: (model: T) => void;
// };

// const DynamicContext = createContext<DynamicContextType<any> | null>(null);

// // Bước 2: Tạo Dynamic Provider
// type DynamicProviderProps<T> = {
//   children: ReactNode;
//   defaultModel: T;
// };

// export function ContextProvider<T>({
//   children,
//   defaultModel,
// }: DynamicProviderProps<T>) {
//   const [model, setModel] = useState(defaultModel);

//   return (
//     <DynamicContext.Provider value={{ model, setModel }}>
//       {children}
//     </DynamicContext.Provider>
//   );
// }

// export default function useDynamicContext<T>() {
//   const context = useContext(DynamicContext) as DynamicContextType<T>;
//   if (!context) {
//     throw new Error("useDynamicContext must be used within DynamicProvider");
//   }
//   return context;
// }
