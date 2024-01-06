import Link from "next/link";
const FooterMain = () => {
  return (
    <div className="text-center max-w-full bg-black mt-4">
      <h1 className="text-green-default text-2xl font-bold mb-2">
        Công Ty TNHH Công Nghệ Nam Phú Hưng
      </h1>
      <h2 className="text-red-600 font-bold my-2">
        Địa chỉ: 366 Đường Số 7 - Phường.Tân Tạo - Quận.Bình Tân - TP HCM
      </h2>
      <h2 className="text-orange-400 font-bold my-2">
        Hotline: 0933 32 32 34 - 0931 868 943
      </h2>
      <span className="text-white">
        Email :{" "}
        <Link href="mailto:info@namphuhung.com">info@namphuhung.com</Link>
      </span>
      <br />
      <span className="text-white">
        Website :<Link href="/">www.namphuhung.com</Link>
      </span>
    </div>
  );
};

export default FooterMain;
