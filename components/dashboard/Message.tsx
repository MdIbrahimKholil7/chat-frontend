import React, { useState, useRef, useEffect } from "react";
import ActiveUser from "./ActiveUser";
import MessageLeftBar from "./MessageLeftBar";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AllUsers from "./AllUsers";

import Loader from "../utils/Loader";
import MessengerRightBar from "./MessengerRightBar";
import MessageBody from "./MessageBody";
import { useGetAllUserQuery } from "../features/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import MessageSend from "./MessageSend";
import { Message, SendMessage, SocketUser } from "../types/types";
import {
  getMessages,
  notificationMessage,
} from "../features/message/messagesSlice";
import { useAddNotificationMutation } from "../features/message/messageApi";

const { io } = require("socket.io-client");

const Message = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>();
  const [number, setNumber] = useState<number>(0);
  const [fetch, setFetch] = useState(false);
  const { friend } = useSelector((state: any) => state?.friend);
  const {
    auth,
    message: { notificationMsg },
  } = useSelector((state: any) => state);
  const { name } = friend || {};
  const [activeUsers, setActiveUsers] = useState<SocketUser[] | []>([]);
  const [userSocketMsg, setUserSocketMsg] = useState<Message>();
  const [typingMessage, setTypingMessage] = useState<Message | {}>({});
  const dispatch = useDispatch();
  const [addNotification, { data: notification, error: notificationError }] =
    useAddNotificationMutation();
  const {
    data: allUser,
    isLoading,
    isError,
    error,
    refetch,
  }: any = useGetAllUserQuery(undefined, {});

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [fetch]);

  useEffect(() => {
    socketRef.current = io("http://localhost:5000");
    socketRef.current.on("sendMessageToUser", (data: Message) => {
      setUserSocketMsg(data);
    });
    socketRef.current.on("sendTypingInputMsg", (data: Message) => {
      setTypingMessage(data);
    });
  }, []);

  useEffect(() => {
    socketRef.current.emit("add-user", auth?.user?._id, auth?.user);
  }, [auth]);

  useEffect(() => {
    socketRef.current.on("getUser", (user: SocketUser[]) => {
      const uArr = user.filter((u: SocketUser) => u.userId !== auth?.user?._id);
      setActiveUsers(uArr);
    });
  }, [auth]);

  // adding socket message
  useEffect(() => {
    const { sender, receiverId, message } = userSocketMsg || {};
    if (receiverId === auth?.user?._id && friend?._id === sender) {
      dispatch(
        getMessages([
          {
            sender,
            receiverId,
            message,
          },
        ])
      );
    }
  }, [userSocketMsg, friend, auth?.user?._id, dispatch]);

  // adding notification
  useEffect(() => {
    const { sender, receiverId, message,name } = userSocketMsg || {};
    console.log('hell',userSocketMsg)
    if (receiverId === auth?.user?._id && friend?._id !== sender) {
      console.log('hello',userSocketMsg)
      dispatch(
        notificationMessage({
          _id:sender,
          receiver:receiverId,
          name,
          total:1
        })
      );
      addNotification({
        sender,
        receiver:receiverId,
      });
    }
  }, [userSocketMsg, friend, auth?.user?._id, dispatch, addNotification]);

  // console.log(userSocketMsg, "socketMesage");
  useEffect(() => {
    if (activeUsers?.length === 1) {
      setNumber(1);
    }
    if (activeUsers?.length === 2) {
      setNumber(2);
    }
    if (activeUsers?.length === 3) {
      setNumber(2);
    }
    if (activeUsers?.length >= 5) {
      setNumber(4);
    }
  }, [activeUsers, number]);

  const data: number[] = [1, 2, 4, 8, 8];

  const settings: any = {
    dots: false,
    infinite: true,
    slidesToShow: number,
    slidesToScroll: 2,
    speed: 500,
    cssEase: "linear",
    arrows: false,
  };

  if (isLoading) return <Loader />;

  return (
    <div className="bg-[#212533] h-screen text-white">
      <div className="flex h-full">
        <div className="w-[480px]  border-r-2 border-white max-h-screen pt-5">
          <MessageLeftBar data={allUser} />
          <div className="cursor-pointer border-b-[1px] border-white pb-9 ">
            <div className="px-3">
              <Slider {...settings}>
                {activeUsers?.length &&
                  activeUsers?.map((d, i) => <ActiveUser data={d} key={i} />)}
              </Slider>
            </div>
          </div>
          <div className="mt-14 overflow-y-auto max-h-[66%] scrollbar-hide overflow-hidden px-3">
            <AllUsers users={allUser?.result} />
          </div>
        </div>
        <div className=" w-full h-full">
          {name ? (
            <>
              <MessengerRightBar
                typingMessage={typingMessage}
                activeUsers={activeUsers}
              />
              <div className="max-h-[82%] overflow-y-auto scrollbar-hide">
                <MessageBody socketRef={socketRef} scrollRef={scrollRef} />
              </div>
              <div className="mt-5">
                <MessageSend
                  socketRef={socketRef}
                  setFetch={setFetch}
                  fetch={fetch}
                  activeUsers={activeUsers}
                />
              </div>
            </>
          ) : (
            <div className="w-full h-full flex justify-center items-center text-white">
              <h3 className="text-2xl font-bold font-serif">
                Please select your friend to start chat
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
