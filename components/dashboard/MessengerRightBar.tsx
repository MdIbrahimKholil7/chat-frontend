import React from "react";
import { Message, SocketUser } from "../types/types";
import MessengerHead from "./MessengerHead";

interface Props {
  activeUsers: SocketUser[] | [];
  typingMessage:Message | {}
}

const MessengerRightBar = ({ activeUsers,typingMessage }: Props) => {
  return (
    <div>
      <MessengerHead
        typingMessage={typingMessage}
      activeUsers={activeUsers} />
    </div>
  );
};

export default MessengerRightBar;
