import React from "react";
import { useSelector } from "react-redux";
import { Message, SocketUser } from "../types/types";
import ActiveUser from "./ActiveUser";
import MessengerHeadActiveUser from "./MessengerHeadActiveUser";

interface Props {
  activeUsers: SocketUser[] | [];
  typingMessage: Message | {} | any;
}
const MessengerHead = ({ activeUsers, typingMessage }: Props) => {
  const {
    friend: { name, _id },
  } = useSelector((state: any) => state?.friend);
  console.log(typingMessage, "msg");
  return (
    <div className="border-b-[1px] border-white">
      <div className="flex items-center gap-7 py-4 px-5">
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
