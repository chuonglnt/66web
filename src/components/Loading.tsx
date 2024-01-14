import Image from "next/image";
import React from "react";
import loadingImg from "$/assets/images/loading.gif";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full w-full mx-auto my-auto">
      <Image src={loadingImg} alt="Loading..." width={200} height={200} />
    </div>
  );
};

export default Loading;
