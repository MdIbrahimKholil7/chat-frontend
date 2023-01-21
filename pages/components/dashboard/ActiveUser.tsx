import Image from "next/image";
import React from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import userImg from "../assets/user.png";
import { userLoggedIn } from "../features/auth/authSlice";
import { addFriend } from "../features/friend/friendSlice";
import { resetMessages } from "../features/message/messagesSlice";
import { SocketUser } from "../types/types";

const ActiveUser = ({ data }: any) => {
  const dispatch = useDispatch();

  const [cookies, removeCookie]: any = useCookies(["chatUser"]);
  const handleAddFriend = (user: SocketUser): void => {
    dispatch(addFriend(user?.user));
    dispatch(userLoggedIn(cookies?.chatUser));
    dispatch(resetMessages([]));
  };

  return (
    <div onClick={() => handleAddFriend(data)}>
      <div className="relative w-[50px] h-[50px] cursor-pointer mx-auto">
        <Image
          src={userImg}
          alt="userImg"
          //   height={50}
          //   width={50}
          className="rounded-full w-full h-full"
        />
        <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute top-[3px] right-[3px]"></div>
      </div>
      <p className="text-[14px] text-center">{data?.user?.name}</p>
    </div>
  );
};

export default ActiveUser;
