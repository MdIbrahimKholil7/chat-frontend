import React from "react";
import { Users } from "../types/types";
import ActiveUser from "./ActiveUser";

const AllUsers = ({ users }: any) => {
  const data: number[] = [1, 2, 3, 4, 5, 3, 3, 4, 5, 3, 3, 4, 5, 3];
  return (
    <div>
      <div>
        {users?.map((user: Users, i: number) => (
          <div
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
