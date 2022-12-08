import React from "react";
import ActiveUser from "./ActiveUser";

const AllUsers = () => {
  const data: number[] = [1, 2, 3, 4, 5, 3, 3, 4, 5, 3, 3, 4, 5, 3];
  return (
    <div>
      <div>
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-4 my-3 cursor-pointer hover:bg-[#39394e] py-2 px-2 rounded-md duration-150">
            <ActiveUser />
            <p>Robert</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
