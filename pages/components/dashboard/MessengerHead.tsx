import React from "react";
import { useSelector } from "react-redux";
import { SocketUser } from "../types/types";
import ActiveUser from "./ActiveUser";
import MessengerHeadActiveUser from "./MessengerHeadActiveUser";

interface Props {
  activeUsers: SocketUser[] | [];
}
const MessengerHead = ({activeUsers}:Props) => {
  const {
    friend: { name },
  } = useSelector((state: any) => state?.friend);

  return (
    <div className="border-b-[1px] border-white">
      <div className="flex items-center gap-7 py-4 px-5">
       <MessengerHeadActiveUser
       activeUsers={activeUsers}
       />
        <p className="font-bold text-xl text-white">{name}</p>
      </div>
    </div>
  );
};

export default MessengerHead;
