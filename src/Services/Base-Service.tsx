import {
  collection,
  addDoc,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
  Firestore,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firebase.config";

export const GetAll = async <T extends DocumentData>(
  collectionName: string
): Promise<T[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
    uid: doc.id,
    ...(doc.data() as T),
    // Sử dụng type assertion ở đây
  }));
  console.log("Promiseeeeeeeeeeeeeeeeeeeeeeeeee", Promise<T[]>);
};

export const Detail = async <T extends DocumentData>(
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

export const Create = async <T extends DocumentData>(
  collectionName: string,
  data: T
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error("Lỗi khi tạo tài liệu:", error);
    throw error; // Rethrow lỗi để xử lý ở mức cao hơn nếu cần thiết
  }
};

export const Update = async <T extends DocumentData>(
  collectionName: string,
  documentId: string,
  data: T
): Promise<void> => {
  const docRef = doc(db, collectionName, documentId);
  await updateDoc(docRef, data);
};

export const Delete = async (collectionName: string, documentId: string) => {
  try {
    await deleteDoc(doc(db, collectionName, documentId));
    console.log("Document successfully deleted!", deleteDoc);
    // Logic xử lý sau khi xóa thành công
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};
