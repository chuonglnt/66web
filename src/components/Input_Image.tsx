import React, { useState } from "react";
import Image from "next/image";
import resizeImage from "../Core/Utils";

type InputImageProps = {
  onChange: (file: File | null) => void;
};

const InputImage: React.FC<InputImageProps> = ({ onChange }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onChange(event.target.files[0]);
    } else {
      onChange(null);
    }
  };
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Giả sử bạn muốn resize ảnh thành kích thước 300x300 pixels
  const resizeImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      // Tạo một Image trong HTML để chúng ta có thể đọc kích thước và thực hiện resize
      // @ts-ignore
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        // Tạo một canvas để thực hiện resize
        const canvas = document.createElement("canvas");
        const maxSize = 300; // Thay đổi kích thước max theo yêu cầu
        let width = image.width;
        let height = image.height;

        // Tính toán kích thước mới để giữ nguyên tỉ lệ
        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }

        // Đặt kích thước cho canvas
        canvas.width = width;
        canvas.height = height;

        // Vẽ hình ảnh với kích thước mới vào canvas
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Kiểm tra ctx không phải null trước khi sử dụng
          ctx.drawImage(image, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                // Làm gì đó với blob
              }
            },
            "image/jpeg",
            0.9
          );
        } else {
          // Xử lý trường hợp không lấy được context (có thể thông báo lỗi)
        }
        // Chuyển canvas về Blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Không thể tạo Blob từ canvas"));
            }
          },
          "image/png",
          0.9
        );
      };
      image.onerror = reject;
    });
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      try {
        const resizedBlob = await resizeImage(event.target.files[0]);
        const previewUrl = URL.createObjectURL(resizedBlob);
        setImagePreview(previewUrl);
      } catch (error) {
        console.error("Error resizing image:", error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      {imagePreview && (
        <div style={{ width: 360, height: 360, position: "relative" }}>
          <Image
            src={imagePreview}
            alt="Preview"
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}
    </div>
  );
};

export default InputImage;
