import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
  Firestore,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
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

export const getById = async <T extends DocumentData>(
  db: Firestore,
  collectionName: string,
  documentId: string
): Promise<T | undefined> => {
  const docRef = doc(db, collectionName, documentId);
  const docSnapshot = await getDoc(docRef);
  
  if (docSnapshot.exists()) {
    return { id: docSnapshot.id, ...(docSnapshot.data() as T) };
  } else {
    return undefined;
  }
};

export const updateById = async <T extends DocumentData>(
  db: Firestore,
  collectionName: string,
  documentId: string,
  data: T
): Promise<void> => {
  const docRef = doc(db, collectionName, documentId);
  await updateDoc(docRef, data);
};

export const deleteById = async (
  db: Firestore,
  collectionName: string,
  documentId: string
): Promise<void> => {
  const docRef = doc(db, collectionName, documentId);
  await deleteDoc(docRef);
};