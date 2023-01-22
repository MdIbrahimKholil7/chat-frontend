import Image from "next/image";
import React from "react";
import { useCookies } from "react-cookie";
import { BsThreeDots } from "react-icons/bs";
import { MdNotificationsNone } from "react-icons/md";
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
            <div className="dropdown dropdown-end text-black">
              <label tabIndex={0} className="mb-3 relative">
                <p className="absolute bg-red-500 text-white p-1 rounded-full top-[-10px] right-[9px] w-[25px] h-[25px] flex justify-center items-center cursor-pointer">
                  26
                </p>
                <MdNotificationsNone className="text-4xl text-white font-bold cursor-pointer" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
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
