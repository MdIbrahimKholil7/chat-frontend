import Image from "next/image";
import React from "react";
import userImg from "../assets/user.png";

const ActiveUser = () => {
  return (
    <div>
      <div className="relative w-[50px] h-[50px] cursor-pointer">
        <Image
          src={userImg}
          alt="userImg"
        //   height={50}
        //   width={50}
          className="rounded-full w-full h-full"
        />
        <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute top-[3px] right-[3px]"></div>
      </div>
    </div>
  );
};

export default ActiveUser;
