import Image from "next/image";
import React from "react";
import { useCookies } from "react-cookie";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import userImg from "../assets/user.png";
import { Users } from "../types/types";
const MessageLeftBar = ({ data }: any) => {
  const [cookies, removeCookie]: any = useCookies(["chatUser"]);
  const { name } = cookies?.chatUser?.data?.result || {};

  return (
    <div>
      <div className="flex justify-between items-center px-3 w-full">
        <div className="flex items-center gap-3">
          <div className="relative w-[50px] h-[50px] cursor-pointer">
            <Image
              src={userImg}
              alt="userImg"
              className="rounded-full w-full h-full"
            />
            <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute top-[3px] right-[3px]"></div>
          </div>
          <p>{name}</p>
        </div>
        <div className="flex items-center gap-4">
          <p>
            <BsThreeDots className="text-xl text-white font-bold cursor-pointer" />
          </p>
          <p>
            <FaEdit className="text-xl text-white font-bold cursor-pointer" />
          </p>
        </div>
      </div>
      <div className="my-7 px-3">
        <form action="">
          <input
            type="text"
            placeholder="Search here"
            className="input input-bordered w-full bg-[#0b0f1d]"
          />
        </form>
      </div>
    </div>
  );
};

export default MessageLeftBar;
