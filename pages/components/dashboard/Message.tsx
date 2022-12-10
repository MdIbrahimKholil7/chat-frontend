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
import { useSelector } from "react-redux";
import MessageSend from "./MessageSend";

const Message = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fetch, setFetch] = useState(false);
  const { friend } = useSelector((state: any) => state?.friend);
  const { name } = friend || {};
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
  const data: number[] = [1, 2, 3, 4, 5, 3, 3, 4, 5, 3, 3, 4, 5, 3];
  const settings: any = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    speed: 500,
    cssEase: "linear",
    arrows: false,
  };

  if (isLoading) return <Loader />;

  console.log(error);
  return (
    <div className="bg-[#212533] h-screen text-white">
      <div className="flex h-full">
        <div className="max-w-[400px]  border-r-2 border-white max-h-screen pt-5">
          <MessageLeftBar data={allUser} />
          <div className="cursor-pointer border-b-[1px] border-white pb-9 ">
            <div className="px-3">
              <Slider {...settings}>
                {data.map((d, i) => (
                  <ActiveUser key={i} />
                ))}
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
              <MessengerRightBar />
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
