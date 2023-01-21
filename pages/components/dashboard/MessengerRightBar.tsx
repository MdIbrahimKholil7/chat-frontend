import React from "react";
import { SocketUser } from "../types/types";
import MessengerHead from "./MessengerHead";

interface Props {
  activeUsers: SocketUser[] | [];
}

const MessengerRightBar = ({ activeUsers }: Props) => {
  return (
    <div>
      <MessengerHead activeUsers={activeUsers} />
    </div>
  );
};

export default MessengerRightBar;
