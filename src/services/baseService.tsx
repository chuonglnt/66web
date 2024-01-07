import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase"; // Đường dẫn đến cấu hình Firebase của bạn

export default function BaseService() {
  getAll;
}

export const getAll = async <T extends DocumentData>(
  collectionName: string
): Promise<T[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
    id: doc.id,
    ...(doc.data() as T), // Sử dụng type assertion ở đây
  }));
};
