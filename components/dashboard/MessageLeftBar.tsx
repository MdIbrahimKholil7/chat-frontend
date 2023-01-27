import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BsThreeDots } from "react-icons/bs";
import { MdNotificationsNone } from "react-icons/md";
import { TiWeatherCloudy } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import userImg from "../assets/user.png";
import {
  useGetNotificationQuery,
  useResetNotificationsQuery,
} from "../features/message/messageApi";
import {
  addNotificationFromDb,
  resetAllNotificationFromDb,
} from "../features/message/messagesSlice";
import { msgNotification, Users } from "../types/types";
import OutsideClickHandler from "react-outside-click-handler";
import moment from "moment";

const MessageLeftBar = ({ data }: any) => {
  const [cookies, removeCookie]: any = useCookies(["chatUser"]);
  const { name, _id } = cookies?.chatUser?.data?.result || {};
  const [notification, setNotification] = useState<boolean>(false);
  const [outSide, setOutSide] = useState<boolean>(false);
  const {
    data: notificationData,
    isLoading,
    error,
  } = useGetNotificationQuery(_id, {
    skip: _id ? false : true,
  });

  const {
    data: resetData,
    isLoading: resetLoading,
    error: resetError,
  } = useResetNotificationsQuery(_id, {
    skip: notification ? false : true,
  });

  const dispatch = useDispatch();
  const { notificationMsg, totalNotifications } = useSelector(
    (state: any) => state.message
  );

  useEffect(() => {
    if (outSide) {
      dispatch(resetAllNotificationFromDb());
    }
  }, [outSide, dispatch]);

  useEffect(() => {
    dispatch(
      addNotificationFromDb({
        result: notificationData?.result,
        total: notificationData?.totalNotification,
      })
    );
  }, [notificationData, dispatch]);

  const resetNotifications = (id: string) => {
    setNotification(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center px-3 w-full">
        <div className="flex items-center gap-3">
          <div className="relative w-[50px] h-[50px] cursor-pointer">
            <Image
              src={userImg}
              alt="userImg"
              className="rounded-full w-full h-full"
            />
            <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute top-[3px] right-[3px]"></div>
          </div>
          <p>{name}</p>
        </div>
        <div className="flex items-center gap-4">
          <p>
            <BsThreeDots className="text-xl text-white font-bold cursor-pointer" />
          </p>
          <p>
            <OutsideClickHandler
              onOutsideClick={() => {
                setOutSide(true);
              }}
            >
              <div className="dropdown dropdown-end text-black">
                <label
                  onClick={() => resetNotifications(_id)}
                  tabIndex={0}
                  className="mb-3 relative"
                >
                  {totalNotifications > 0 && (
                    <p className="absolute bg-red-500 text-white p-1 rounded-full top-[-10px] right-[9px] w-[25px] h-[25px] flex justify-center items-center cursor-pointer">
                      {totalNotifications}
                    </p>
                  )}
                  <MdNotificationsNone className="text-4xl text-white font-bold cursor-pointer" />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu px-1 shadow rounded-box w-72 mt-2 bg-[#333a54]"
                >
                  {notificationMsg?.length > 0 ? (
                    notificationMsg?.map((notification: msgNotification) => (
                      <li
                        key={notification._id}
                        className={`text-white rounded-md my-2 `}
                      >
                        <p className="text-[15px] flex item-center gap-2">
                          <span className="">
                            {" "}
                            <MdNotificationsNone className="text-xl text-white font-bold cursor-pointer" />
                          </span>{" "}
                          You have {notification?.total} new{" "}
                          {notification?.total > 1 ? "messages" : "message"}{" "}
                          from {notification?.name}
                        </p>
                      </li>
                    ))
                  ) : (
                    <div className="text-center text-white font-bold py-4">
                      <span className="flex justify-center">
                        <TiWeatherCloudy className="text-3xl text-white" />
                      </span>
                      <p className="mt-2 ">No new message for you</p>
                    </div>
                  )}
                </ul>
              </div>
            </OutsideClickHandler>
          </p>
        </div>
      </div>
      <div className="my-7 px-3">
        <form action="">
          <input
            type="text"
            placeholder="Search here"
            className="input input-bordered w-full bg-[#0b0f1d]"
          />
        </form>
      </div>
    </div>
  );
};

export default MessageLeftBar;
