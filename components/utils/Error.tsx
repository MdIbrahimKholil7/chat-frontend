import React from "react";

const Error = ({ message }: any) => {
  return (
    <div className="bg-red-400 my-3">
      <p className="text-center py-3 font-bold text-white">{message}</p>
    </div>
  );
};

export default Error;
