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
import { SocketUser } from "../types/types";

const { io } = require("socket.io-client");

const Message = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>();
  const [number, setNumber] = useState<number>(0);
  const [fetch, setFetch] = useState(false);
  const { friend } = useSelector((state: any) => state?.friend);
  const { auth } = useSelector((state: any) => state);
  const { name } = friend || {};
  const [activeUsers, setActiveUsers] = useState<SocketUser[] | []>([]);
  const dispatch = useDispatch();
  let scrollNumber = 0;
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
    slidesToScroll: 1,
    speed: 500,
    cssEase: "linear",
    arrows: false,
  };

  if (isLoading) return <Loader />;

  return (
    <div className="bg-[#212533] h-screen text-white">
      <div className="flex h-full">
        <div className="max-w-[400px]  border-r-2 border-white max-h-screen pt-5">
          <MessageLeftBar data={allUser} />
          <div className="cursor-pointer border-b-[1px] border-white pb-9 ">
            <div className="px-3">
              <Slider {...settings}>
                {activeUsers?.length &&
                  data.map((d, i) => <ActiveUser key={i} />)}
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
              activeUsers={activeUsers}
              />
              <div className="max-h-[82%] overflow-y-auto scrollbar-hide">
                <MessageBody scrollRef={scrollRef} />
              </div>
              <div className="mt-5">
                <MessageSend setFetch={setFetch} fetch={fetch} />
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
