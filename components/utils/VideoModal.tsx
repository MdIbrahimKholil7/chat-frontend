import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCallUser, resetCallUser } from "../features/socket/socketSlice";
import { SocketUser } from "../types/types";
import { SocketContext } from "./ContextProvider";

interface Props {
  activeUsers: SocketUser[] | [];
  ownSocketId:string | undefined;
}
const VideoModal = ({ activeUsers,ownSocketId }: Props) => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    callUser,
    leaveCall,
    answerCall,
    me,
  } = useContext(SocketContext);
  const [callerId, setCallerId] = useState<string>("");
  const {
    activeUser: { resetCall },
    friend,
  } = useSelector((state: any) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    if (myVideo.current) {
      dispatch(resetCallUser(true));
    }
    dispatch(resetCallUser(true));
  }, [myVideo, dispatch]);

  useEffect(() => {
    const findId = activeUsers.find((d) => d.user?._id === friend?.friend?._id);
    console.log(findId)
    if (findId?.socketId) {
      setCallerId(findId.socketId);
    }
  }, [activeUsers, friend?.friend?._id]);

//   console.log(friend);
  console.log(activeUsers);
  console.log(callAccepted)
//   console.log(callerId)
  console.log(call.isReceivingCall)
  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="my-modal-5" className="btn">
        open modal
      </label>

      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-6/12 max-w-5xl h-[70vh] text-black">
          <div>
            <div>
              <div>
                {stream && resetCall && (
                  <video
                    className="w-[120px] h-[120px]  mt-4 rounded-md"
                    //   width={500}
                    //   height={500}
                    playsInline
                    muted
                    ref={myVideo}
                    autoPlay
                  />
                )}
              </div>
              <div>
                {!callAccepted && stream && resetCall && (
                  <video
                    className="w-[450px] h-[350px] mx-auto bg-red-500 mt-4 "
                    //   width={500}
                    //   height={500}
                    playsInline
                    muted
                    ref={userVideo}
                    autoPlay
                  />
                )}
              </div>
              {callAccepted && !callEnded && (
                <video
                  className="w-[450px] h-[350px] mx-auto bg-red-500 mt-4 "
                  width={500}
                  height={500}
                  playsInline
                  ref={userVideo}
                  autoPlay
                />
              )}
            </div>

            <div className="text-center mt-20">
              {callAccepted && !callEnded ? (
                <label
                  htmlFor="my-modal-5"
                  className=" btn bg-red-500 text-white font-bold"
                  onClick={leaveCall}
                >
                  Hang Up
                </label>
              ) : (
                <button
                  className="btn bg-green-600 text-white font-bold"
                  onClick={() => callUser(callerId,ownSocketId)}
                >
                  Call
                </button>
              )}
            </div>
            {/* <button className="btn bg-red-500 text-white font-bold" onClick={leaveCall}>
              Hang Up
            </button> */}
            <div>
              {call.isReceivingCall && !callAccepted && (
                <div>
                  <h1>{friend?.friend?.name} is calling:</h1>
                  <button onClick={answerCall}>Answer</button>
                </div>
              )}
            </div>
          </div>
          <div className="modal-action">
            <label htmlFor="my-modal-5" className="btn bg-red-500 text-white ">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
