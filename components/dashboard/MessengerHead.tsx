import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Message, SocketUser } from "../types/types";
import ActiveUser from "./ActiveUser";
import MessengerHeadActiveUser from "./MessengerHeadActiveUser";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { addCallUser } from "../features/socket/socketSlice";
import { openMenuFn } from "../features/menuBar/menuSlice";
import { GiHamburgerMenu } from "react-icons/gi";
interface Props {
  activeUsers: SocketUser[] | [];
  typingMessage: Message | {} | any;
}
const MessengerHead = ({ activeUsers, typingMessage }: Props) => {
  const dispatch = useDispatch();
  const {
    friend: { name, _id },
  } = useSelector((state: any) => state?.friend);

  return (
    <div className="border-b-[1px] border-white flex items-center justify-between">
      <div className="flex items-center gap-7 py-4 px-1 md:px-5">
        <span
          onClick={() => dispatch(openMenuFn({}))}
          className="pb-2 px-3 cursor-pointer pt-3 block md:hidden"
        >
          <GiHamburgerMenu className="text-2xl text-white " />
        </span>

        <MessengerHeadActiveUser activeUsers={activeUsers} />
        <>
          <div>
            <p className="font-bold text-xl text-white">{name}</p>
            {typingMessage?.message && typingMessage?.sender === _id && (
              <p className="text-[13px]">typing...</p>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default MessengerHead;
