// ************ Start Import ************
import { signInWithEmailAndPassword, getAuth, getIdToken } from "firebase/auth";
// ************ End Import ************
// ************ Start Interface ************

interface LoginData {
  email: string;
  password: string;
}

interface LoginResult {
  token: string | null;
  uid: string | null;
}
// ************ End Interface ************
// ************ Login User ************
export const loginUser = async (loginData: LoginData): Promise<LoginResult> => {
  const auth = getAuth();

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginData.email,
      loginData.password
    );
    const token = await getIdToken(userCredential.user);
    const uid = userCredential.user.uid;

    return { token, uid };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
