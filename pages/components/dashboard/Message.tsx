import React from "react";
import MessageLeftBar from "./MessageLeftBar";

const Message = () => {
  return (
    <div className="bg-[#212533] h-screen text-white pt-5">

      <div className="grid grid-cols-5">
        <div className="col-span-2 max-w-[400px] px-3">
            <MessageLeftBar/>
        </div>
        <div className="bg-green-500 col-span-3 ">
             <h1>Col-1</h1>
        </div>
      </div>
    </div>
  );
};

export default Message;
