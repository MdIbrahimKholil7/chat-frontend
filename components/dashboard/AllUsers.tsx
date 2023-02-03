import React from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";
import { addFriend } from "../features/friend/friendSlice";
import { resetMessages } from "../features/message/messagesSlice";
import { friend, Users } from "../types/types";
import ActiveUser from "./ActiveUser";
import moment from "moment";
import Image from "next/image";
import userImg from "../assets/user.png";
const AllUsers = ({ users }: any) => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["chatUser"]);
  const { name, _id: ownId } = cookies?.chatUser?.data?.result || {};
  const { friend } = useSelector((state: any) => state?.friend || {});
  const { _id } = friend || {};

  const handleAddFriend = (user: friend): void => {
    dispatch(addFriend(user));
    dispatch(userLoggedIn(cookies?.chatUser));
    if (user?._id !== _id) {
      dispatch(resetMessages([]));
    }
  };

  return (
    <div>
      <div>
        {users &&
          users?.map((user: Users, i: number) => (
            <div
              onClick={() => handleAddFriend(user.friendInfo)}
              key={i}
              className={`${
                _id === user?.friendInfo?._id && "bg-[#39394e]"
              }  my-3 cursor-pointer hover:bg-[#39394e] py-2 px-2 rounded-md duration-150 `}
            >
              <div className="flex gap-4 items-center">

                <div>
                  <div className="relative w-[50px] h-[50px] cursor-pointer mx-auto">
                    <Image
                      src={user?.friendInfo?.img ? user?.friendInfo?.img : userImg}
                      alt="userImg"
                      className="rounded-full w-full h-full"
                      width={50}
                      height={50}
                    />
                  </div>
                </div>
                <div>
                  <p>{user.friendInfo?.name}</p>
                  <div>
                    {user?.lastMsg && (
                      <p>
                        {user?.lastMsg?.sender === ownId ? (
                          <p className="text-[11px]">
                            You {user?.lastMsg?.message}{" "}
                            {moment(user?.lastMsg?.updatedAt).fromNow()}
                          </p>
                        ) : (
                          <p className="text-[11px]">
                            {user?.friendInfo?.name} {user?.lastMsg?.message}
                          </p>
                        )}
                      </p>
                    )}
                    {!user?.lastMsg && (
                      <p className="text-[11px]">
                        {user?.friendInfo?.name} connected{" "}
                        {moment(user?.friendInfo?.updatedAt).fromNow()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllUsers;
