"use client";
// ************ Start Import ************
import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import logoGoogle from "$/assets/images/logo_Google.png";
import logoFacebook from "$/assets/images/logo_Facebook.png";
import TextInput from "@/Components/Input-Text";
import { redirectWithDelay } from "@/Core/Utils";
import { notifySuccess, notifyError } from "@/Components/Notification-Messages";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginUser } from "@/lib/redux/features/loginUserSlice";
import { setEmail, setPassword } from "@/lib/redux/features/loginFormSlice";
import { LoginModel } from "@/Core/Base-Model";
import { AppDispatch, RootState } from "@/lib/redux/store";
// ************ End Import ************
// const loginData = {
//   email: "",
//   password: "",
// };
export default function Login() {
  useEffect(() => {
    const userToken = localStorage.getItem("token");

    if (userToken) {
      // Token tồn tại - coi như người dùng đã đăng nhập
      notifyError("Bạn đã đăng nhập");
      redirectWithDelay("/", 1000);
    }
  }, []);
  const email = useSelector((state: RootState) => state.loginForm.email);
  const password = useSelector((state: RootState) => state.loginForm.password);
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      dispatch(setEmail(value));
    } else if (name === "password") {
      dispatch(setPassword(value));
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchLoginUser({ email, password }));
    notifySuccess("Đăng nhập thành công");
    redirectWithDelay("/", 1000);
  };

  // const handleSubmit = (loginData: LoginModel) => {
  //   loginData.email = newEmail;
  //   loginData.password = newPassword;
  //   dispatch(fetchLoginUser(loginData));
  // };
  // const [userDataLogin, setFormData] = useState<LoginModel>({
  //   email: "",
  //   password: "",
  // });
  // const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (userDataLogin.email === "") {
  //     notifyError("Email không được để trống");
  //     return;
  //   } else if (userDataLogin.password === "") {
  //     notifyError("Mật khẩu không được để trống");
  //     return;
  //   }

  //   signInWithEmailAndPassword(
  //     auth,
  //     userDataLogin.email,
  //     userDataLogin.password
  //   )
  //     .then(async (userCredential) => {
  //       const user = userCredential.user;
  //       const token = await (userCredential.user?.getIdToken?.() ?? null);
  //       const uid = user?.uid ?? "";
  //       const userItem = await GetUserDataByUid(uid);
  //       if (!userItem) {
  //         console.log("Không tìm thấy thông tin người dùng", userItem);
  //         return;
  //       }
  //       localStorage.setItem("token", token ?? "");
  //       localStorage.setItem(
  //         "dataInfo",
  //         JSON.stringify(
  //           userItem.displayName && userItem.firstName && userItem.photoUrl
  //         )
  //       );
  //       notifySuccess("Đăng nhập thành công");
  //       redirectWithDelay("/", 1000);
  //     })
  //     .catch((error) => {
  //       if (error.code === "auth/email-already-in-use") {
  //         notifyError("Email đã tồn tại");
  //       } else if (error.code === "auth/invalid-email") {
  //         notifyError("Email không đúng. Vui lòng kiểm tra lại");
  //       } else if (error.code === "auth/wrong-password") {
  //         notifyError("Password không đúng. Vui lòng kiểm tra lại");
  //       } else if (error.code === "auth/user-not-found") {
  //         notifyError("Tài khoản không tồn tại. Vui lòng kiểm tra lại");
  //       } else if (
  //         typeof error === "object" &&
  //         error !== null &&
  //         "code" in error
  //       ) {
  //         notifyError("Lỗi đăng nhập. Vui long kiểm tra lại");
  //       }
  //     });
  // const setLocalStore = async () => {
  //   // Lấy thông tin người dùng từ Firestore
  //   const uid = localStorage.getItem("userid");
  //   const userRef = doc(db, "users", `${uid}`);
  //   const docSnap = await getDoc(userRef);
  //   console.log("************************* userRef:", userRef);
  //   console.log("************************* docSnap:", docSnap);
  //   if (docSnap.exists()) {
  //     const userDataLogin = docSnap.data();
  //     // Lưu token vào local storage hoặc cookie
  //     localStorage.setItem("user", JSON.stringify(userDataLogin.firstName));
  //     localStorage.setItem("user", JSON.stringify(userDataLogin.imageUserUrl));

  //     // Lưu ý: Firebase quản lý refresh token một cách tự động
  //   } else {
  //     console.log("No user data found!");
  //   }
  // };
  // };

  return (
    <div className="max-w-md mx-auto my-20 p-6 bg-slate-50 rounded-md shadow-2xl">
      <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
        Đăng Nhập
      </h2>

      <div className="flex justify-center space-x-4 mb-6">
        <Image
          className="h-12 w-auto"
          src={logoGoogle}
          alt="Logo"
          width={28}
          height={28}
          priority={true}
        />
        <Image
          className="h-12 w-auto"
          src={logoFacebook}
          alt="Logo"
          width={48}
          height={48}
          priority={true}
        />
      </div>
      <h5 className="text-center text-sm font-extrabold text-gray-900 mb-6">
        Đăng nhập bằng tài khoản khác
      </h5>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <TextInput
            label="Email"
            type="text"
            name="email"
            value={email}
            placeholder="Tài khoản hoặc email của bạn"
            isRequired={false}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextInput
            label="Mật khẩu"
            type="password"
            name="password"
            value={password}
            placeholder="Mật khẩu của bạn"
            isRequired={false}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded w-full"
        >
          Đăng nhập
        </button>
      </form>
      <div className="my-2">
        <a href="#" className="text-sm text-blue-500 hover:underline">
          Quên mật khẩu?
        </a>
      </div>
      <div className="my-2">
        <p className="text-sm text-center">
          Bạn chưa có tài khoản?{" "}
          <a href="/dang-ky" className="text-blue-500 hover:underline">
            Đăng ký
          </a>
        </p>
      </div>
    </div>
  );
}
