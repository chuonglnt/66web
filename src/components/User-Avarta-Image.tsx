import Image from "next/image";
import React from "react";

type MyComponentProps = {
  // Định nghĩa các props ở đây
  src: string;
  alt: string;
};

class UserVartaImage extends React.Component<MyComponentProps> {
  render() {
    const { src, alt } = this.props;
    return (
      <Image src={src} alt={alt} width={200} height={200} priority={true} />
    );
  }
}

export default UserVartaImage;
