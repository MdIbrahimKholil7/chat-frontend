import React from "react";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useAddMessageMutation } from "../features/message/messageApi";

const MessageBody = () => {
  // add message
  const [addMessage, { data, isLoading, isError, error }] =
    useAddMessageMutation();
  // get friend details
  const {
    friend: { _id },
  } = useSelector((state: any) => state.friend);

  const handleForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      input: { value: string };
    };

    addMessage({
      receiverId: _id,
      message: target.input.value,
    });
    target.input.value = "";
    console.log(target.input.value);
  };
  
  console.log(error);

  return (
    <div className="h-full ">
      <div></div>
      <form className="w-full h-full" onSubmit={handleForm}>
        <div className="flex gap-8 items-end h-full  px-20">
          <div className="w-full ">
            <input
              name="input"
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full bg-[#0b0f1d]"
              autoComplete="off"
            />
          </div>
          <div>
            <button className="btn bg-[#0b0f1d] px-7 border-0 hover:bg-[#0b0f1d]">
              <FiSend className="text-2xl text-white font-bold" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageBody;
