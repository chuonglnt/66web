// ************ Start Import ************
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  UserCredential,
} from "firebase/auth"; // ************ End Import ************
// ************ Start Interface ************

// ************ End Interface ************
// ************ Login User ************
export async function signIn(email: string, password: string): Promise<any> {
  try {
    const auth = getAuth();
    // Cài đặt Persistence
    await setPersistence(auth, browserLocalPersistence);

    // Thực hiện đăng nhập
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    console.error("Error signing in: ", error);
    return error;
  }
}
