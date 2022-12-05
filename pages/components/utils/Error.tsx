import React from "react";

interface ErrorMessage {
    message: string;
}
const Error = ({ message }: ErrorMessage) => {
  return (
    <div className="text-center bg-red-500 my-5 rounded-lg py-2">
      <h3 className="text-white font-bold text-[16px]">{message}! </h3>
    </div>
  );
};

export default Error;
