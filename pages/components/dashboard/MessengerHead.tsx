import React from "react";
import { useSelector } from "react-redux";
import ActiveUser from "./ActiveUser";

const MessengerHead = () => {
  const {
    friend: { name },
  } = useSelector((state: any) => state?.friend);

  return (
    <div className="border-b-[1px] border-white">
      <div className="flex items-center gap-7 py-4 px-5">
        <ActiveUser />
        <p className="font-bold text-xl text-white">{name}</p>
      </div>
    </div>
  );
};

export default MessengerHead;
