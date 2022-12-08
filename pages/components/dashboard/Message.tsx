import React from "react";
import ActiveUser from "./ActiveUser";
import MessageLeftBar from "./MessageLeftBar";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AllUsers from "./AllUsers";
import { useGetUserQuery } from "../features/friend/friendApi";
import Loader from "../utils/Loader";
import MessengerRightBar from "./MessengerRightBar";
import MessageBody from "./MessageBody";
import PrivateRoute from "../utils/PrivateRoute";

const Message = () => {
  const { data: users, isLoading, isError, error } = useGetUserQuery();

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

  return (
    <PrivateRoute>
      <div className="bg-[#212533] h-screen text-white">
        <div className="flex h-full">
          <div className="max-w-[400px]  border-r-2 border-white max-h-screen pt-5">
            <MessageLeftBar />
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
              <AllUsers />
            </div>
          </div>
          <div className=" w-full h-full">
            <MessengerRightBar />
            <div className="h-[90%]">
              <MessageBody />
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Message;