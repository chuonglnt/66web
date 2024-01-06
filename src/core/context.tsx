// "use client";
// import { createContext, useContext } from "react";
// import { WebStoreId } from "@/core/config";
// type WebStoreIdContextType = {
//   webStoreId: string;
// };

// const WebStoreIdContext = createContext<WebStoreIdContextType | undefined>(
//   undefined
// );

// export const WebStoreIdProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const contextValue: WebStoreIdContextType = {
//     webStoreId: WebStoreId,
//   };

//   return (
//     <WebStoreIdContext.Provider value={contextValue}>
//       {children}
//     </WebStoreIdContext.Provider>
//   );
// };

// export const useWebStoreId = () => {
//   const context = useContext(WebStoreIdContext);
//   if (!context) {
//     throw new Error(
//       "useCorpNetIdStoreId must be used within a CorpIdStoreIdProvider"
//     );
//   }
//   return context;
// };
