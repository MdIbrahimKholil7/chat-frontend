import React, { useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddMessageMutation,
  useGetMessagesQuery,
} from "../features/message/messageApi";
import userImg from "../assets/user.png";
import Image from "next/image";
import { getMessages } from "../features/message/messagesSlice";
import { Message, SendMessage } from "../types/types";

interface Props {
  socketRef: any;
  scrollRef: any;
}
const MessageBody = ({ scrollRef, socketRef }: Props) => {
  const message = useSelector((state: any) => state.message);
  const user = useSelector((state: any) => state.auth);
  // console.log(message)
  // get friend details
  const {
    friend: { _id },
  } = useSelector((state: any) => state.friend);
  console.log(_id);
  const {
    data: messages,
    isLoading: messageLoading,
    error: messageError,
  }: any = useGetMessagesQuery(_id, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (messages) {
      dispatch(getMessages(messages?.data));
    }
  }, [messages, dispatch]);

  useEffect(() => {
    socketRef?.current?.on("sendMessage", (msg: SendMessage) => {});
  }, [socketRef]);

  return (
    <div ref={scrollRef} className=" overflow-y-auto scrollbar-hide ">
      <div ref={scrollRef} className="px-5 py-5 h-[820px]">
        {message?.messages &&
          message?.messages?.length > 0 &&
          message?.messages?.map((msg: Message) => {
            return msg?.sender === user?.user?._id ? (
              <div className="chat chat-end my-7">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                      src={userImg}
                      alt="image"
                    />
                  </div>
                </div>
                <div className="chat-bubble">{msg?.message}</div>
                <div className="">
                  <div className="chat-header justify-end">
                    <time className="text-xs opacity-50 pt-1">12:45</time>
                  </div>
                </div>
               
              </div>
            ) : (
              <div className="chat chat-start my-7">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                      src={userImg}
                      alt="image"
                    />
                  </div>
                </div>
                <div className="">
                  <div className="chat-bubble "> {msg?.message}</div>
                  <div className="chat-header flex justify-end">
                    <time className="text-xs opacity-50 pt-1">12:46</time>
                  </div>
                </div>
              
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MessageBody;
