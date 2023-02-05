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
  resetMessages,
} from "../features/message/messagesSlice";
import { friend, msgNotification, Users } from "../types/types";
import OutsideClickHandler from "react-outside-click-handler";
import moment from "moment";
import { addFriend } from "../features/friend/friendSlice";
import { userLoggedIn } from "../features/auth/authSlice";
import ProfileModal from "../profile/ProfileModal";
import { openProfileModal } from "../features/menuBar/menuSlice";

const MessageLeftBar = ({ data }: any) => {
  const [cookies, removeCookie]: any = useCookies(["chatUser"]);
  const { name, _id, img } = cookies?.chatUser?.data?.result || {};
  const [notification, setNotification] = useState<boolean>(false);
  const [outSide, setOutSide] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [openModal, setOpenModal] = useState<any | null>(null);
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
    (state: any) => state.message || {}
  );
  const { img: authImg, name: authName } = useSelector(
    (state: any) => state.auth || {}
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

  const handleAddFriend = (user: friend): void => {
    dispatch(addFriend(user));
    dispatch(userLoggedIn(cookies?.chatUser));
    if (user?._id !== _id) {
      dispatch(resetMessages([]));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center px-3 w-full">
        <div className="flex items-center gap-3">
          <div className="relative w-[50px] h-[50px] cursor-pointer">
            <Image
              src={authImg ? authImg : userImg}
              alt="userImg"
              className="rounded-full w-full h-full object-cover"
              width={50}
              height={50}
            />
            <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute top-[3px] right-[3px]"></div>
          </div>
          <p>{authName ? authName : name}</p>
        </div>
        <div className="flex items-center gap-4">
          {/* <p>
            <BsThreeDots className="text-xl text-white font-bold cursor-pointer" />
          </p> */}
          <div className="dropdown dropdown-end bg-transparent">
            <label tabIndex={0} className="">
              <BsThreeDots className="text-xl text-white font-bold cursor-pointer" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-black mt-2"
            >
              <li>
                <label
                  onClick={() =>
                    dispatch(openProfileModal(cookies?.chatUser?.data?.result))
                  }
                  htmlFor="my-modal-6"
                >
                  Update Profile
                </label>
              </li>
            </ul>
          </div>
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
      <div className="my-7 px-3 relative">
        <input
          type="text"
          placeholder="Search here"
          className="input input-bordered w-full bg-[#0b0f1d] "
          onChange={(e: React.FormEvent<HTMLInputElement>): void => {
            setValue(e.currentTarget.value);
          }}
          value={value}
        />
        {value && (
          <div className="px-2  absolute top-[57px] left-0 w-full z-[1200]">
            <div className="w-full bg-[#545556] p-2 rounded-md  h-auto z-[1200] ">
              {data?.result
                ?.filter((data: Users) => {
                  return (
                    value &&
                    data.friendInfo.name
                      .toLocaleLowerCase()
                      .includes(value.toLocaleLowerCase())
                  );
                })
                .map((data: Users) => (
                  <div
                    onClick={() => {
                      handleAddFriend(data.friendInfo);
                      setValue("");
                    }}
                    className="bg-white p-2 text-black rounded-md cursor-pointer flex gap-3 my-2 justify-start"
                    key={data.friendInfo._id}
                  >
                    <Image
                      src={userImg}
                      alt="userImg"
                      className="rounded-full  w-[30px] h-[30px]"
                    />
                    {data.friendInfo.name}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageLeftBar;
