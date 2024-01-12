import "server-only";
import { getStorage, getDownloadURL } from "firebase-admin/storage";
import { getFirestore } from "firebase-admin/firestore";

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
  console.log(imageUrl);
  return imageUrl;
};
