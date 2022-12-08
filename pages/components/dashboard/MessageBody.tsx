import React from "react";
import { FiSend } from "react-icons/fi";

const MessageBody = () => {
  return (
    <div className="h-full ">
      <div className="flex gap-8 items-end h-full  px-20">
        <div className="w-full ">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full bg-[#0b0f1d]"
          />
        </div>
        <div>
          <button className="btn bg-[#0b0f1d] px-7 border-0 hover:bg-[#0b0f1d]">
            <FiSend className="text-2xl text-white font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageBody;
