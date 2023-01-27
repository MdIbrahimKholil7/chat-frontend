import React, { useContext } from "react";
import { SocketContext } from "./ContextProvider";

const ShowCaller = () => {
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
  return (
    <div className="w-[500px] h-[500px]">
      <div>hello</div>
      <div>
        <div>
          <div>
            {stream && (
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
          {callAccepted && !callEnded &&(
            <label
              htmlFor="my-modal-5"
              className=" btn bg-red-500 text-white font-bold"
              onClick={leaveCall}
            >
              Hang Up
            </label>
          )}
        </div>
        {/* <button className="btn bg-red-500 text-white font-bold" onClick={leaveCall}>
              Hang Up
            </button> */}
        <div>
          {call.isReceivingCall && !callAccepted && (
            <div>
              <h1>is calling:</h1>
              <button onClick={answerCall}>Answer</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowCaller;
