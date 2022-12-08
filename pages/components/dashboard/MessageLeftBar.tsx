import Image from "next/image";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import userImg from "../assets/user.png";
const MessageLeftBar = () => {
  return (
    <div>
      <div className="flex justify-between items-center px-3">
        <div>
          <Image
            className="rounded-full"
            src={userImg}
            alt="image"
            width={50}
            height={50}
          />
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
            placeholder="Type here"
            className="input input-bordered w-full bg-[#0b0f1d]"
          />
        </form>
      </div>
    </div>
  );
};

export default MessageLeftBar;
