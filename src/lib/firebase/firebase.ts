import "server-only";
import { getStorage, getDownloadURL } from "firebase-admin/storage";
import { getFirestore } from "firebase-admin/firestore";
import { initAdmin } from "@/lib/firebase/firebase-admin.config";

export const getLogo = async () => {
  const firestore = getFirestore();
  const logoSnapshot = await firestore.collection("Images").doc("Logo").get();
  const logoData = logoSnapshot.data() as { url: string } | undefined;
  if (!logoSnapshot.exists || !logoData) {
    return null;
  }
  return logoData.url;
};

export const getLogoFromStorage = async () => {
  const bucket = getStorage().bucket();
  const file = bucket.file("logo.png");
  const imageUrl = await getDownloadURL(file);
  return imageUrl;
};

export const GetAll = async (collectionName: string) => {
  await initAdmin();
  const firestore = getFirestore();
  const usersSnapshot = await firestore.collection(collectionName).get();
  const documents = usersSnapshot.docs.map((doc) => doc.data());
  return documents;
};
