import React from "react";
import { useDispatch } from "react-redux";
import { addFriend } from "../features/friend/friendSlice";
import { Users } from "../types/types";
import ActiveUser from "./ActiveUser";

const AllUsers = ({ users }: any) => {
  const dispatch = useDispatch();

  const handleAddFriend = (user: Users): void => {
    dispatch(addFriend(user));
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
