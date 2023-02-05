import React, { useEffect, useContext } from "react";
import { FiSend } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddMessageMutation,
  useGetMessagesQuery,
} from "../features/message/messageApi";
import userImg from "../assets/user.png";
import Image from "next/image";
import { getMessages } from "../features/message/messagesSlice";
import { Message, SendMessage, SocketUser } from "../types/types";
// import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import { SocketContext } from "../utils/ContextProvider";

interface Props {
  socketRef: any;
  scrollRef: any;
  activeUsers: SocketUser[] | [];
}
const MessageBody = ({ scrollRef, socketRef, activeUsers }: Props) => {
 
  const { message, activeUser } = useSelector((state: any) => state);
  const user = useSelector((state: any) => state.auth);

  const {
    friend: { _id,img },
  } = useSelector((state: any) => state.friend);

  const {
    data: messages,
    isLoading,
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
    <>
      {!message?.messages.length && !isLoading &&(
        <div className="text-center py-5 h-[75vh] md:h-[80vh]  text-white font-bold">
          <p className="text-[14px]">No message created yet</p>
        </div>
      )}
      {
        isLoading && <div className="text-center py-5 h-[80vh]">
          <p>Please wait....</p>
        </div>
      }
      {message?.messages.length > 0 && (
        <div  className=" overflow-y-auto scrollbar-hide ">
          <div  className="px-5 py-5 h-[82vh] 2xl:h-[84vh]">
            {message?.messages &&
              message?.messages?.length > 0 &&
              message?.messages?.map((msg: Message, i: number) => {
                return msg?.sender === user?.user?._id ? (  
                  <div key={i} ref={scrollRef} className="chat chat-end my-7">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <Image
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                          src={user?.user?.img?user?.user?.img:userImg}
                          alt="image"
                        />
                      </div>
                    </div>
                    <div className="chat-bubble">{msg?.message}</div>
                    <div className="">
                      <div className="chat-header justify-end">
                        <time className="text-xs opacity-50 pt-1">
                          {moment(msg?.createdAt).fromNow()}
                        </time>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div ref={scrollRef} className="chat chat-start my-7">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <Image
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                          src={img?img:userImg}
                          alt="image"
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="chat-bubble "> {msg?.message}</div>
                      <div className="chat-header flex justify-end">
                        <time className="text-xs opacity-50 pt-1">
                          {moment(msg?.createdAt).fromNow()}
                        </time>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default MessageBody;
