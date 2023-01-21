import React, { useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useAddMessageMutation } from "../features/message/messageApi";
import { getMessages } from "../features/message/messagesSlice";
import { SendMessage } from "../types/types";

interface Props {
  socketRef: any;
  fetch: boolean;
  setFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessageSend = ({ setFetch, fetch, socketRef }: Props) => {
  const dispatch = useDispatch();
  // add message
  const [addMessage, { data, isLoading, isError, error }] =
    useAddMessageMutation();

  const { user } = useSelector((state: any) => state.auth || {});
  const { friend } = useSelector((state: any) => state || {});

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
    dispatch(
      getMessages([
        {
          sender: user?._id,
          receiverId: _id,
          message: target.input.value,
        },
      ])
    );
    setFetch(!fetch);
    console.log("socket", socketRef);
    socketRef?.current?.emit("sendMessage", {
      receiverId: friend?.friend?._id,
      sender: user?._id,
      message: target.input.value,
    });
    target.input.value = "";
  };

  return (
    <div>
      <form className="w-full" onSubmit={handleForm}>
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

export default MessageSend;
