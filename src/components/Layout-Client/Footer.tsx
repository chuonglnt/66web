import Link from "next/link";
const FooterMain = () => {
  return (
    <div className="text-center max-w-full mt-6">
      <h1 className="text-green-default text-2xl font-bold mb-2">
        Công Ty TNHH Công Nghệ Nam Phú Hưng
      </h1>
      <h2 className="text-red-600 font-bold my-2">
        Địa chỉ: 366 Đường Số 7 - Phường.Tân Tạo - Quận.Bình Tân - TP HCM
      </h2>
      <h2 className="text-orange-400 font-bold my-2">
        <Link href="tel:+84933323234">Hotline: 0933 32 32 34</Link> -{" "}
        <Link href="tel:+84931868943"> 0931 868 943</Link>
      </h2>
      <span className="text-black">
        Email:{" "}
        <Link href="mailto:info@namphuhung.com">info@namphuhung.com</Link>
      </span>
      <br />
      <span className="text-black">
        Website:{" "}
        <Link href="https://www.namphuhung.com">www.namphuhung.com</Link>
      </span>
    </div>
  );
};

export default FooterMain;
