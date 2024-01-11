// FirebaseService.ts

// import firebase from "firebase/app";
// import { UserModel } from "@/models/userModel";

// class FirebaseService {
//   static async getAllUsers(): Promise<UserModel[]> {
//     const users: UserModel[] = [];
//     const snapshot = await firebase.firestore().collection("users").get();

//     snapshot.forEach((doc) => {
//       users.push({ ...doc.data() } as UserModel);
//     });

//     return users;
//   }

//   static async getUserById(uid: string): Promise<UserModel | null> {
//     const doc = await firebase.firestore().collection("users").doc(uid).get();

//     if (doc.exists) {
//       return { uid: doc.id, ...doc.data() } as UserModel;
//     } else {
//       return null;
//     }
//   }

//   static async createUser(userData: UserModel): Promise<string> {
//     const docRef = await firebase.firestore().collection("users").add(userData);
//     return docRef.id;
//   }

//   static async updateUser(uid: string, updatedData: UserModel): Promise<void> {
//     await firebase.firestore().collection("users").doc(uid).update(updatedData);
//   }

//   static async deleteUser(uid: string): Promise<void> {
//     await firebase.firestore().collection("users").doc(uid).delete();
//   }
// }

// export default FirebaseService;
