import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Message, SocketUser } from "../types/types";
import ActiveUser from "./ActiveUser";
import MessengerHeadActiveUser from "./MessengerHeadActiveUser";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { addCallUser } from "../features/socket/socketSlice";
interface Props {
  activeUsers: SocketUser[] | [];
  typingMessage: Message | {} | any;
}
const MessengerHead = ({ activeUsers, typingMessage }: Props) => {
  const dispatch=useDispatch()
  const {
    friend: { name, _id },
  } = useSelector((state: any) => state?.friend);
  const handleCall=()=>{
    dispatch(addCallUser(true))
  }
  return (
    <div className="border-b-[1px] border-white flex items-center justify-between">
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
      <div>
        <label htmlFor="my-modal-5" className="">
          <BsFillCameraVideoFill onClick={handleCall} className="text-3xl mr-5 cursor-pointer" />
        </label>
      </div>
    </div>
  );
};

export default MessengerHead;
