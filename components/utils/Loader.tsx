import Image from "next/image";
import React from "react";
import Load from "../assets/Ripple-1s-200px.gif"

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#212533] text-white">
      <Image width={100} height={100} src={Load} alt="loader" />
    </div>
  );
};

export default Loader;
