import React, { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddMessageMutation,
  useAddNotificationMutation,
} from "../features/message/messageApi";
import { getMessages } from "../features/message/messagesSlice";
import { Message, SendMessage, SocketUser } from "../types/types";

interface Props {
  socketRef: any;
  fetch: boolean;
  setFetch: React.Dispatch<React.SetStateAction<boolean>>;
  activeUsers: SocketUser[] | [];
}

const MessageSend = ({ setFetch, fetch, socketRef, activeUsers }: Props) => {
  const dispatch = useDispatch();
  // add message
  const [addMessage, { data, isLoading, isError, error }] =
    useAddMessageMutation();
  const [addNotification, { data: notification, error: notificationError }] =
    useAddNotificationMutation();

  const { user } = useSelector((state: any) => state.auth || {});
  const { friend } = useSelector((state: any) => state || {});
  const [msg, setMsg] = useState<string>("");
  const [isAddNotification, setIsAddNotification] = useState<boolean>(false);
  // get friend details
  const {
    friend: { _id },
  } = useSelector((state: any) => state.friend);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    socketRef.current.emit("sendTypingInput", {
      sender: user?._id,
      receiverId: friend?.friend?._id,
      message: e.target.value,
    });
  };

  useEffect(() => {
    const user = activeUsers.some((u: SocketUser) => u.user._id === _id);
    setIsAddNotification(user);
    console.log(user);
  }, [activeUsers, _id]);

  const handleForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      input: { value: string };
    };

    addMessage({
      receiverId: _id,
      message: target.input.value,
    });

    dispatch(
      getMessages([
        {
          sender: user?._id,
          receiverId: _id,
          message: target.input.value,
        },
      ])
    );
    setFetch(!fetch);

    if (!isAddNotification) {
      addNotification({
        sender: user?._id,
        receiver: _id,
      });
    }

    socketRef?.current?.emit("sendMessage", {
      receiverId: friend?.friend?._id,
      sender: user?._id,
      message: target.input.value,
      name: user?.name,
      createdAt: new Date().getTime()
    });

    socketRef.current.emit("sendTypingInput", {
      sender: user?._id,
      receiverId: friend?.friend?._id,
      message: "",
    });

    target.input.value = "";
  };

  return (
    <div>
      <form className="w-full" onSubmit={handleForm}>
        <div className="flex gap-8 items-end h-full  px-20">
          <div className="w-full ">
            <input
              onChange={(e) => handleInput(e)}
              name="input"
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full bg-[#0b0f1d]"
              autoComplete="off"
            />
          </div>
          <div>
            <button className="btn bg-[#0b0f1d] px-7 border-0 hover:bg-[#0b0f1d]">
              <FiSend className="text-2xl text-white font-bold" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageSend;
