import React, { useState, useRef, useEffect } from "react";
import ActiveUser from "./ActiveUser";
import MessageLeftBar from "./MessageLeftBar";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AllUsers from "./AllUsers";
import { GiHamburgerMenu } from "react-icons/gi";
import Loader from "../utils/Loader";
import MessengerRightBar from "./MessengerRightBar";
import MessageBody from "./MessageBody";
import { useGetAllUserQuery } from "../features/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import MessageSend from "./MessageSend";
import { Message, SocketUser } from "../types/types";
import {
  getMessages,
  notificationMessage,
} from "../features/message/messagesSlice";
import { useAddNotificationMutation } from "../features/message/messageApi";
import { addUsers, updateUsersMessage } from "../features/users/usersSlice";
import { openMenuFn } from "../features/menuBar/menuSlice";
import OutsideClickHandler from "react-outside-click-handler";
import ProfileModal from "../profile/ProfileModal";
import { useCookies } from "react-cookie";

const { io } = require("socket.io-client");

const Message = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>();
  const [number, setNumber] = useState<number>(0);
  const [fetch, setFetch] = useState(false);
  const [ownSocketId, setOwnSocketId] = useState<string | undefined>("");
  const [cookies, removeCookie]: any = useCookies(["chatUser"]);

  const {
    friend: { friend },
    users,
    message
  } = useSelector((state: any) => state);

  const {
    auth,
    message: { notificationMsg },
    menu: { openMenu, openModal },
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
  }, [message?.messages]);

  useEffect(() => {

    socketRef.current = io("https://socket-chat-server-v9fs.onrender.com");
    socketRef.current.on("sendMessageToUser", (data: Message) => {
      setUserSocketMsg(data);
    });
    socketRef.current.on("sendTypingInputMsg", (data: Message) => {
      setTypingMessage(data);
    });
    dispatch(addUsers(allUser?.result));
  }, [allUser, dispatch]);

  useEffect(() => {
    socketRef.current.emit("add-user", auth?.user?._id, auth?.user);
  }, [auth]);

  useEffect(() => {
    socketRef.current.on("getUser", (user: SocketUser[]) => {
      const findArr = user.find(
        (u: SocketUser) => u.userId === auth?.user?._id
      );
      setOwnSocketId(findArr?.socketId);
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

    if (userSocketMsg?.sender) {
      dispatch(updateUsersMessage({ sender, message }));
    }
  }, [userSocketMsg, friend, auth?.user?._id, dispatch]);

  // adding notification
  useEffect(() => {
    const { sender, receiverId, message, name } = userSocketMsg || {};
    if (receiverId === auth?.user?._id && friend?._id !== sender) {
      dispatch(
        notificationMessage({
          _id: sender,
          receiver: receiverId,
          name,
          total: 1,
        })
      );
      addNotification({
        sender,
        receiver: receiverId,
      });
    }
  }, [userSocketMsg, friend, auth?.user?._id, dispatch, addNotification]);

  useEffect(() => {
    if (activeUsers?.length === 1) {
      setNumber(1);
    }
    if (activeUsers?.length === 2) {
      setNumber(2);
    }
    if (activeUsers?.length === 3) {
      setNumber(3);
    }
    if (activeUsers?.length === 4) {
      setNumber(3);
    }
    if (activeUsers?.length >= 5) {
      setNumber(4);
    }
  }, [activeUsers, number]);

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
    <div className="bg-[#212533] h-screen text-white relative">
      <div className="flex h-full md:h-full">
        <div className="xl:w-[400px] 2xl:w-[480px] hidden md:block border-r-2 border-white max-h-screen pt-5">
          <MessageLeftBar data={allUser} />
          <div className="cursor-pointer border-b-[1px] border-white pb-9 ">
            <div className="">
              <Slider {...settings}>
                {activeUsers?.length &&
                  activeUsers?.map((d, i) => <ActiveUser data={d} key={i} />)}
              </Slider>
            </div>
          </div>
          <div className="mt-4 overflow-y-auto lg:max-h-[65%] xl:max-h-[58%%] 2xl:max-h-[73%] scrollbar-hide overflow-hidden px-3 ">
            <AllUsers users={users?.users} />
          </div>
        </div>
        <div>
          <OutsideClickHandler
            onOutsideClick={() => {
              if (openMenu) dispatch(openMenuFn({}));
            }}
          >
            <div
              className={`w-[330px] block h-full md:hidden border-r-2 pt-5 absolute top-0 ${
                openMenu ? "left-0" : "left-[-500px]"
              }  bg-[#2d303a] duration-300 z-50`}
            >
              <MessageLeftBar data={allUser} />
              <div className="cursor-pointer border-b-[1px] border-white pb-9 ">
                <div className="px-3">
                  <Slider {...settings}>
                    {activeUsers?.length &&
                      activeUsers?.map((d, i) => (
                        <ActiveUser data={d} key={i} />
                      ))}
                  </Slider>
                </div>
              </div>
              <div className="mt-14 overflow-y-auto max-h-[53%] overflow-hidden px-3 scrollbar-hide">
                <AllUsers users={users?.users} />
              </div>
            </div>
          </OutsideClickHandler>
        </div>

        <div className=" w-full h-full">
          {name ? (
            <>
              <MessengerRightBar
                typingMessage={typingMessage}
                activeUsers={activeUsers}
              />
              <div className="max-h-[82%] overflow-y-auto scrollbar-hide">
                <MessageBody
                  activeUsers={activeUsers}
                  socketRef={socketRef}
                  scrollRef={scrollRef}
                />
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
            <div className="w-full h-full  flex flex-col justify-center items-center text-white">
              <div className="w-full h-full block md:hidden">
                <span
                  onClick={() => dispatch(openMenuFn({}))}
                  className="border-b-2 border-white block pb-2 px-3 cursor-pointer pt-3"
                >
                  <GiHamburgerMenu className="text-2xl text-white " />
                </span>
              </div>
              <h3 className="text-[18px] px-2 md:text-2xl font-bold font-serif h-full md:flex md:justify-center md:items-center">
                Please select your friend to start chat
              </h3>
            </div>
          )}
        </div>
      </div>
      {openModal && (
        <ProfileModal />
      )}
    </div>
  );
};

export default Message;
