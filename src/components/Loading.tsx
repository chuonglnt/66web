import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full w-full mx-auto my-auto">
      <Image
        src="/assets/images/loading.gif"
        alt="Loading..."
        width={200}
        height={200}
      />
    </div>
  );
};

export default Loading;
