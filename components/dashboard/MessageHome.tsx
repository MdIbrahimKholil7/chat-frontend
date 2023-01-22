import React from "react";
import PrivateRoute from "../utils/PrivateRoute";
import Message from "./Message";

const MessageHome = () => {
  return (
    <div>
      <PrivateRoute>
        <Message />
      </PrivateRoute>
    </div>
  );
};

export default MessageHome;
