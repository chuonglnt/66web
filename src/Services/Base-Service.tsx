// ************ Start Import ************
import {
  collection,
  addDoc,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firebase.config";
import { formatDateForInput } from "@/Core/Utils";
import {
  FirebaseStorage,
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
// ************ End Import ************
// ************ interface ************

// ************ GetAll Data From Collection ************
export const GetAll = async <T extends DocumentData>(
  collectionName: string
): Promise<T[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
    id: doc.id,
    ...(doc.data() as T),
  }));
};
// ************ Get Detail By Id Document ************
export const GetById = async <T extends DocumentData>(
  collectionName: string,
  documentId: string
): Promise<T | undefined> => {
  const docRef = doc(db, collectionName, documentId);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    return {
      id: docSnapshot.id,
      birthDay: formatDateForInput(docSnapshot.data().birthDay),
      ...(docSnapshot.data() as T),
    };
  } else {
    return undefined;
  }
};
// ************ Get Detail By Uid Document ************
export const GetByUid = async (collectionName: string, uid: string) => {
  const db = getFirestore();
  const querySnapshot = await getDocs(
    query(collection(db, collectionName), where("uid", "==", uid))
  );
  if (!querySnapshot.empty) {
    // Lấy document đầu tiên tìm được
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } else {
    // Xử lý trường hợp không tìm thấy document
    return null;
  }
};
// ************ Create Document Data  ************
export const Create = async <T extends DocumentData>(
  collectionName: string,
  data: T
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error("Lỗi khi tạo tài liệu:", error);
    throw error;
  }
};
// ************ Update Document Data  ************
export const Update = async <T extends DocumentData>(
  collectionName: string,
  documentId: string,
  data: T
): Promise<T> => {
  const docRef = doc(db, collectionName, documentId);
  await updateDoc(docRef, data);
  const updatedDoc = await getDoc(docRef);
  if (updatedDoc.exists()) {
    return updatedDoc.data() as T;
  } else {
    throw new Error("Document does not exist");
  }
};
// ************ Delete Document Data  ************
export const Delete = async (collectionName: string, documentId: string) => {
  try {
    await deleteDoc(doc(db, collectionName, documentId));
    console.log("Document successfully deleted!", deleteDoc);
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};
// ************ Update File to Firebase Storage  ************
export const UploadFile = async (file: File, path: string): Promise<string> => {
  const storage: FirebaseStorage = getStorage();
  const fileRef = storageRef(storage, path);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
};
// ************ Get Detail User To Save LocalStorage  ************
