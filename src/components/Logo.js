import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <Image
        src="\assets\images\logo.png"
        alt="Picture of the author"
        width={200}
        height={200}
      />
    </div>
  );
};

export default Logo;
