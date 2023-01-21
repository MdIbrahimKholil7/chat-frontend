import React from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";
import { addFriend } from "../features/friend/friendSlice";
import { resetMessages } from "../features/message/messagesSlice";
import { Users } from "../types/types";
import ActiveUser from "./ActiveUser";

const AllUsers = ({ users }: any) => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["chatUser"]);
  const { friend } = useSelector((state: any) => state?.friend || {});
  const { _id } = friend || {};
  const handleAddFriend = (user: Users): void => {
    dispatch(addFriend(user));
    dispatch(userLoggedIn(cookies?.chatUser));
    if (user?._id !== _id) {
      dispatch(resetMessages([]));
    }
  };

  return (
    <div>
      <div>
        {users?.map((user: Users, i: number) => (
          <div
            onClick={() => handleAddFriend(user)}
            key={i}
            className="flex items-center gap-4 my-3 cursor-pointer hover:bg-[#39394e] py-2 px-2 rounded-md duration-150"
          >
            <ActiveUser />
            <p>{user?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
