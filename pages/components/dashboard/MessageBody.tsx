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
import { Message } from "../types/types";

interface Props {
  scrollRef: any;
}
const MessageBody = ({ scrollRef }: Props) => {
  const message = useSelector((state: any) => state.message);
  const user = useSelector((state: any) => state.auth);
  console.log(message);
  // get friend details
  const {
    friend: { _id },
  } = useSelector((state: any) => state.friend);
  const {
    data: messages,
    isLoading: messageLoading,
    error: messageError,
  }: any = useGetMessagesQuery(_id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (messages) {
      dispatch(getMessages(messages?.data));
    }
  }, [messages, dispatch]);

  return (
    <div ref={scrollRef} className=" overflow-y-auto scrollbar-hide ">
      <div className="px-5 py-5 h-[820px]">
        {message?.messages &&
          message?.messages?.length > 0 &&
          message?.messages?.map((msg: Message) => {
            return msg?.sender === user?.user?._id ? (
              <div ref={scrollRef} className="flex justify-end my-4">
                <div>
                  <p className="text-end pb-2 text-gray-400 text-[12px] pr-5 ">
                    3:10PM
                  </p>
                  <div className="flex px-3 items-center gap-3 justify-end">
                    <Image
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                      src={userImg}
                      alt="image"
                    />
                    <p className="bg-[#444242] px-7 py-3 rounded-full">
                      {msg?.message}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div ref={scrollRef} className="flex-start flex my-4">
                <div>
                  <p className="text-end pb-2 text-gray-400 text-[12px] pr-4">
                    3:10PM
                  </p>
                  <div className="flex px-3 items-center gap-3 justify-start">
                    <Image
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                      src={userImg}
                      alt="image"
                    />
                    <p className="bg-[#444242] px-7 py-3 rounded-full">
                      {msg?.message}
                    </p>
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
