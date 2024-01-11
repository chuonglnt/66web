import sliderBg from "@/assets/images/slider-bg.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="content-wrapper">
      <main>
        {/* <Image
          src={sliderBg}
          alt="Picture of the author"
          width={500}
          height={500}
        /> */}
        <div className="slider h-[530px] bg-slider-bg">Slider</div>
        {/* End Slider */}
        <div className="story">Story</div>
        {/* End Story */}
        <div className="more-product">More Product</div>
        {/* End More Product */}
        <div className="coffee-magazine">Coffee-magazine</div>
        {/* End Coffee-magazine */}
        <div className="lifestyle-stories">Lifestyle-stories</div>
        {/* End Lifestyle-stories */}
        <div className="subcribe">Subcribe</div>
        {/* End Subcribe */}
        <span>
          Nga, Hàn Quốc và Triều Tiên phát cảnh báo sóng thần tại các vùng giáp
          Biển Nhật Bản, yêu cầu người dân sơ tán đến nơi an toàn. "Sóng thần có
          thể ảnh hưởng nhiều khu vực dọc bờ biển phía tây đảo Sakhalin. Các
          nhóm phản ứng đã sẵn sàng đối phó với hậu quả của sóng thần", cơ quan
          phụ trách vùng Viễn Đông thuộc Bộ Tình trạng khẩn cấp Nga ra thông báo
          hôm nay. Cảnh báo sóng thần cũng được phát tại vùng Primorsky và
          Khabarovsk, trong đó đợt sóng cao nhất có thể đạt mức 1,2 m. Giới chức
          Nga nói rằng hệ thống cảnh báo tại các địa phương đã kích hoạt và
          người dân đang được sơ tán đến nơi an toàn. Chính quyền thành phố
          Vladivostok đã yêu cầu ngư dân "khẩn cấp về bờ". Cơ quan khí tượng Hàn
          Quốc (KMA) cũng cảnh báo mực nước dâng ở vùng bờ biển phía đông nước
          này, nhận định sóng thần đạt độ cao 0,5 m nhưng có thể dâng cao hơn
          khi ập vào bờ, thêm rằng các đợt sóng có thể tiếp tục trong vòng 24
          giờ. Tỉnh Gangwon ở miền đông đã gửi tin nhắn báo động đến cư dân tại
          6 thành phố và đô thị duyên hải, yêu cầu họ nhanh chóng tránh xa bờ
          biển và sơ tán đến điểm cao. Bộ Nội vụ và An toàn Hàn Quốc cho biết
          giới chức thành phố Samcheok cũng khuyến cáo cư dân di chuyển đến
          những khu vực cao hơn tòa nhà ba tầng để bảo đảm an toàn. Hãng tin
          Yonhap cùng ngày cho biết truyền thanh nhà nước Triều Tiên đã phát báo
          động sóng thần ở bờ biển phía đông, cảnh báo những đợt sóng cao 2,08 m
          có thể quét qua bờ biển nước này. Các động thái được đưa ra sau trận
          động đất mạnh 7,6 độ xảy ra tại vùng Noto thuộc tỉnh Ishikawa của Nhật
          Bản lúc 16h10 (14h10 giờ Hà Nội). Cơ quan Khí tượng Nhật Bản (JMA) đã
          phát cảnh báo sóng thần ở các tỉnh Ishikawa, Niigata, Toyama,
          Yamagata, Ishikawa, Fukui và Hyogo, kêu gọi người dân nhanh chóng rời
          khỏi các khu vực ven biển, với dự đoán sóng thần cao 3-5 mét sẽ ập vào
          các khu vực này. Cảnh báo sóng thần lớn được phát ra cho khu vực bán
          đảo Noto là cấp cao nhất, tương đương cảnh báo được đưa ra sau trận
          động đất ở vùng Tohoku tháng 3/2011. Nga, Hàn Quốc và Triều Tiên phát
          cảnh báo sóng thần tại các vùng giáp Biển Nhật Bản, yêu cầu người dân
          sơ tán đến nơi an toàn. "Sóng thần có thể ảnh hưởng nhiều khu vực dọc
          bờ biển phía tây đảo Sakhalin. Các nhóm phản ứng đã sẵn sàng đối phó
          với hậu quả của sóng thần", cơ quan phụ trách vùng Viễn Đông thuộc Bộ
          Tình trạng khẩn cấp Nga ra thông báo hôm nay. Cảnh báo sóng thần cũng
          được phát tại vùng Primorsky và Khabarovsk, trong đó đợt sóng cao nhất
          có thể đạt mức 1,2 m. Giới chức Nga nói rằng hệ thống cảnh báo tại các
          địa phương đã kích hoạt và người dân đang được sơ tán đến nơi an toàn.
          Chính quyền thành phố Vladivostok đã yêu cầu ngư dân "khẩn cấp về bờ".
          Cơ quan khí tượng Hàn Quốc (KMA) cũng cảnh báo mực nước dâng ở vùng bờ
          biển phía đông nước này, nhận định sóng thần đạt độ cao 0,5 m nhưng có
          thể dâng cao hơn khi ập vào bờ, thêm rằng các đợt sóng có thể tiếp tục
          trong vòng 24 giờ. Tỉnh Gangwon ở miền đông đã gửi tin nhắn báo động
          đến cư dân tại 6 thành phố và đô thị duyên hải, yêu cầu họ nhanh chóng
          tránh xa bờ biển và sơ tán đến điểm cao. Bộ Nội vụ và An toàn Hàn Quốc
          cho biết giới chức thành phố Samcheok cũng khuyến cáo cư dân di chuyển
          đến những khu vực cao hơn tòa nhà ba tầng để bảo đảm an toàn. Hãng tin
          Yonhap cùng ngày cho biết truyền thanh nhà nước Triều Tiên đã phát báo
          động sóng thần ở bờ biển phía đông, cảnh báo những đợt sóng cao 2,08 m
          có thể quét qua bờ biển nước này. Các động thái được đưa ra sau trận
          động đất mạnh 7,6 độ xảy ra tại vùng Noto thuộc tỉnh Ishikawa của Nhật
          Bản lúc 16h10 (14h10 giờ Hà Nội). Cơ quan Khí tượng Nhật Bản (JMA) đã
          phát cảnh báo sóng thần ở các tỉnh Ishikawa, Niigata, Toyama,
          Yamagata, Ishikawa, Fukui và Hyogo, kêu gọi người dân nhanh chóng rời
          khỏi các khu vực ven biển, với dự đoán sóng thần cao 3-5 mét sẽ ập vào
          các khu vực này. Cảnh báo sóng thần lớn được phát ra cho khu vực bán
          đảo Noto là cấp cao nhất, tương đương cảnh báo được đưa ra sau trận
          động đất ở vùng Tohoku tháng 3/2011. Nga, Hàn Quốc và Triều Tiên phát
          cảnh báo sóng thần tại các vùng giáp Biển Nhật Bản, yêu cầu người dân
          sơ tán đến nơi an toàn. "Sóng thần có thể ảnh hưởng nhiều khu vực dọc
          bờ biển phía tây đảo Sakhalin. Các nhóm phản ứng đã sẵn sàng đối phó
          với hậu quả của sóng thần", cơ quan phụ trách vùng Viễn Đông thuộc Bộ
          Tình trạng khẩn cấp Nga ra thông báo hôm nay. Cảnh báo sóng thần cũng
          được phát tại vùng Primorsky và Khabarovsk, trong đó đợt sóng cao nhất
          có thể đạt mức 1,2 m. Giới chức Nga nói rằng hệ thống cảnh báo tại các
          địa phương đã kích hoạt và người dân đang được sơ tán đến nơi an toàn.
          Chính quyền thành phố Vladivostok đã yêu cầu ngư dân "khẩn cấp về bờ".
          Cơ quan khí tượng Hàn Quốc (KMA) cũng cảnh báo mực nước dâng ở vùng bờ
          biển phía đông nước này, nhận định sóng thần đạt độ cao 0,5 m nhưng có
          thể dâng cao hơn khi ập vào bờ, thêm rằng các đợt sóng có thể tiếp tục
          trong vòng 24 giờ. Tỉnh Gangwon ở miền đông đã gửi tin nhắn báo động
          đến cư dân tại 6 thành phố và đô thị duyên hải, yêu cầu họ nhanh chóng
          tránh xa bờ biển và sơ tán đến điểm cao. Bộ Nội vụ và An toàn Hàn Quốc
          cho biết giới chức thành phố Samcheok cũng khuyến cáo cư dân di chuyển
          đến những khu vực cao hơn tòa nhà ba tầng để bảo đảm an toàn. Hãng tin
          Yonhap cùng ngày cho biết truyền thanh nhà nước Triều Tiên đã phát báo
          động sóng thần ở bờ biển phía đông, cảnh báo những đợt sóng cao 2,08 m
          có thể quét qua bờ biển nước này. Các động thái được đưa ra sau trận
          động đất mạnh 7,6 độ xảy ra tại vùng Noto thuộc tỉnh Ishikawa của Nhật
          Bản lúc 16h10 (14h10 giờ Hà Nội). Cơ quan Khí tượng Nhật Bản (JMA) đã
          phát cảnh báo sóng thần ở các tỉnh Ishikawa, Niigata, Toyama,
          Yamagata, Ishikawa, Fukui và Hyogo, kêu gọi người dân nhanh chóng rời
          khỏi các khu vực ven biển, với dự đoán sóng thần cao 3-5 mét sẽ ập vào
          các khu vực này. Cảnh báo sóng thần lớn được phát ra cho khu vực bán
          đảo Noto là cấp cao nhất, tương đương cảnh báo được đưa ra sau trận
          động đất ở vùng Tohoku tháng 3/2011. Nga, Hàn Quốc và Triều Tiên phát
          cảnh báo sóng thần tại các vùng giáp Biển Nhật Bản, yêu cầu người dân
          sơ tán đến nơi an toàn. "Sóng thần có thể ảnh hưởng nhiều khu vực dọc
          bờ biển phía tây đảo Sakhalin. Các nhóm phản ứng đã sẵn sàng đối phó
          với hậu quả của sóng thần", cơ quan phụ trách vùng Viễn Đông thuộc Bộ
          Tình trạng khẩn cấp Nga ra thông báo hôm nay. Cảnh báo sóng thần cũng
          được phát tại vùng Primorsky và Khabarovsk, trong đó đợt sóng cao nhất
          có thể đạt mức 1,2 m. Giới chức Nga nói rằng hệ thống cảnh báo tại các
          địa phương đã kích hoạt và người dân đang được sơ tán đến nơi an toàn.
          Chính quyền thành phố Vladivostok đã yêu cầu ngư dân "khẩn cấp về bờ".
          Cơ quan khí tượng Hàn Quốc (KMA) cũng cảnh báo mực nước dâng ở vùng bờ
          biển phía đông nước này, nhận định sóng thần đạt độ cao 0,5 m nhưng có
          thể dâng cao hơn khi ập vào bờ, thêm rằng các đợt sóng có thể tiếp tục
          trong vòng 24 giờ. Tỉnh Gangwon ở miền đông đã gửi tin nhắn báo động
          đến cư dân tại 6 thành phố và đô thị duyên hải, yêu cầu họ nhanh chóng
          tránh xa bờ biển và sơ tán đến điểm cao. Bộ Nội vụ và An toàn Hàn Quốc
          cho biết giới chức thành phố Samcheok cũng khuyến cáo cư dân di chuyển
          đến những khu vực cao hơn tòa nhà ba tầng để bảo đảm an toàn. Hãng tin
          Yonhap cùng ngày cho biết truyền thanh nhà nước Triều Tiên đã phát báo
          động sóng thần ở bờ biển phía đông, cảnh báo những đợt sóng cao 2,08 m
          có thể quét qua bờ biển nước này. Các động thái được đưa ra sau trận
          động đất mạnh 7,6 độ xảy ra tại vùng Noto thuộc tỉnh Ishikawa của Nhật
          Bản lúc 16h10 (14h10 giờ Hà Nội). Cơ quan Khí tượng Nhật Bản (JMA) đã
          phát cảnh báo sóng thần ở các tỉnh Ishikawa, Niigata, Toyama,
          Yamagata, Ishikawa, Fukui và Hyogo, kêu gọi người dân nhanh chóng rời
          khỏi các khu vực ven biển, với dự đoán sóng thần cao 3-5 mét sẽ ập vào
          các khu vực này. Cảnh báo sóng thần lớn được phát ra cho khu vực bán
          đảo Noto là cấp cao nhất, tương đương cảnh báo được đưa ra sau trận
          động đất ở vùng Tohoku tháng 3/2011. Nga, Hàn Quốc và Triều Tiên phát
          cảnh báo sóng thần tại các vùng giáp Biển Nhật Bản, yêu cầu người dân
          sơ tán đến nơi an toàn. "Sóng thần có thể ảnh hưởng nhiều khu vực dọc
          bờ biển phía tây đảo Sakhalin. Các nhóm phản ứng đã sẵn sàng đối phó
          với hậu quả của sóng thần", cơ quan phụ trách vùng Viễn Đông thuộc Bộ
          Tình trạng khẩn cấp Nga ra thông báo hôm nay. Cảnh báo sóng thần cũng
          được phát tại vùng Primorsky và Khabarovsk, trong đó đợt sóng cao nhất
          có thể đạt mức 1,2 m. Giới chức Nga nói rằng hệ thống cảnh báo tại các
          địa phương đã kích hoạt và người dân đang được sơ tán đến nơi an toàn.
          Chính quyền thành phố Vladivostok đã yêu cầu ngư dân "khẩn cấp về bờ".
          Cơ quan khí tượng Hàn Quốc (KMA) cũng cảnh báo mực nước dâng ở vùng bờ
          biển phía đông nước này, nhận định sóng thần đạt độ cao 0,5 m nhưng có
          thể dâng cao hơn khi ập vào bờ, thêm rằng các đợt sóng có thể tiếp tục
          trong vòng 24 giờ. Tỉnh Gangwon ở miền đông đã gửi tin nhắn báo động
          đến cư dân tại 6 thành phố và đô thị duyên hải, yêu cầu họ nhanh chóng
          tránh xa bờ biển và sơ tán đến điểm cao. Bộ Nội vụ và An toàn Hàn Quốc
          cho biết giới chức thành phố Samcheok cũng khuyến cáo cư dân di chuyển
          đến những khu vực cao hơn tòa nhà ba tầng để bảo đảm an toàn. Hãng tin
          Yonhap cùng ngày cho biết truyền thanh nhà nước Triều Tiên đã phát báo
          động sóng thần ở bờ biển phía đông, cảnh báo những đợt sóng cao 2,08 m
          có thể quét qua bờ biển nước này. Các động thái được đưa ra sau trận
          động đất mạnh 7,6 độ xảy ra tại vùng Noto thuộc tỉnh Ishikawa của Nhật
          Bản lúc 16h10 (14h10 giờ Hà Nội). Cơ quan Khí tượng Nhật Bản (JMA) đã
          phát cảnh báo sóng thần ở các tỉnh Ishikawa, Niigata, Toyama,
          Yamagata, Ishikawa, Fukui và Hyogo, kêu gọi người dân nhanh chóng rời
          khỏi các khu vực ven biển, với dự đoán sóng thần cao 3-5 mét sẽ ập vào
          các khu vực này. Cảnh báo sóng thần lớn được phát ra cho khu vực bán
          đảo Noto là cấp cao nhất, tương đương cảnh báo được đưa ra sau trận
          động đất ở vùng Tohoku tháng 3/2011. Nga, Hàn Quốc và Triều Tiên phát
          cảnh báo sóng thần tại các vùng giáp Biển Nhật Bản, yêu cầu người dân
          sơ tán đến nơi an toàn. "Sóng thần có thể ảnh hưởng nhiều khu vực dọc
          bờ biển phía tây đảo Sakhalin. Các nhóm phản ứng đã sẵn sàng đối phó
          với hậu quả của sóng thần", cơ quan phụ trách vùng Viễn Đông thuộc Bộ
          Tình trạng khẩn cấp Nga ra thông báo hôm nay. Cảnh báo sóng thần cũng
          được phát tại vùng Primorsky và Khabarovsk, trong đó đợt sóng cao nhất
          có thể đạt mức 1,2 m. Giới chức Nga nói rằng hệ thống cảnh báo tại các
          địa phương đã kích hoạt và người dân đang được sơ tán đến nơi an toàn.
          Chính quyền thành phố Vladivostok đã yêu cầu ngư dân "khẩn cấp về bờ".
          Cơ quan khí tượng Hàn Quốc (KMA) cũng cảnh báo mực nước dâng ở vùng bờ
          biển phía đông nước này, nhận định sóng thần đạt độ cao 0,5 m nhưng có
          thể dâng cao hơn khi ập vào bờ, thêm rằng các đợt sóng có thể tiếp tục
          trong vòng 24 giờ. Tỉnh Gangwon ở miền đông đã gửi tin nhắn báo động
          đến cư dân tại 6 thành phố và đô thị duyên hải, yêu cầu họ nhanh chóng
          tránh xa bờ biển và sơ tán đến điểm cao. Bộ Nội vụ và An toàn Hàn Quốc
          cho biết giới chức thành phố Samcheok cũng khuyến cáo cư dân di chuyển
          đến những khu vực cao hơn tòa nhà ba tầng để bảo đảm an toàn. Hãng tin
          Yonhap cùng ngày cho biết truyền thanh nhà nước Triều Tiên đã phát báo
          động sóng thần ở bờ biển phía đông, cảnh báo những đợt sóng cao 2,08 m
          có thể quét qua bờ biển nước này. Các động thái được đưa ra sau trận
          động đất mạnh 7,6 độ xảy ra tại vùng Noto thuộc tỉnh Ishikawa của Nhật
          Bản lúc 16h10 (14h10 giờ Hà Nội). Cơ quan Khí tượng Nhật Bản (JMA) đã
          phát cảnh báo sóng thần ở các tỉnh Ishikawa, Niigata, Toyama,
          Yamagata, Ishikawa, Fukui và Hyogo, kêu gọi người dân nhanh chóng rời
          khỏi các khu vực ven biển, với dự đoán sóng thần cao 3-5 mét sẽ ập vào
          các khu vực này. Cảnh báo sóng thần lớn được phát ra cho khu vực bán
          đảo Noto là cấp cao nhất, tương đương cảnh báo được đưa ra sau trận
          động đất ở vùng Tohoku tháng 3/2011.
        </span>
      </main>
    </div>
  );
}
