import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import userImg from "../assets/user.png";
import { SocketUser } from "../types/types";

interface Props {
  activeUsers: SocketUser[] | [];
}
const MessengerHeadActiveUser = ({ activeUsers }: Props) => {
  const { friend } = useSelector((state: any) => state);
  const isActive = activeUsers?.some(
    (u: SocketUser) => u?.userId === friend?.friend?._id
  );

  return (
    <div>
      <div className="relative w-[50px] h-[50px] cursor-pointer">
        <Image
          src={friend?.friend?.img ? friend?.friend?.img : userImg}
          alt="userImg"
            height={50}
            width={50}
          className="rounded-full w-full h-full"
        />
        <div
          className={`w-[10px] h-[10px] ${
            isActive ? "bg-green-500" : "bg-slate-400"
          } rounded-full absolute top-[3px] right-[3px]`}
        ></div>
      </div>
    </div>
  );
};

export default MessengerHeadActiveUser;
