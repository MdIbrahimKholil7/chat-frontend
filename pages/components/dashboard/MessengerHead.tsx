import React from "react";
import ActiveUser from "./ActiveUser";

const MessengerHead = () => {
  return (
    <div>
      <div className="flex items-center gap-7 py-4 px-5">
        <ActiveUser />
        <p className="font-bold text-xl text-white">Ibrahim Kholil</p>
      </div>
    </div>
  );
};

export default MessengerHead;
