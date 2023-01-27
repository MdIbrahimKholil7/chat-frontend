import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { useSelector } from "react-redux";

const SocketContext = createContext<any>("");
const socket = io("http://localhost:5000");

const ContextProvider = ({ children }: any) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState<any>();
  const [name, setName] = useState("");
  const [call, setCall] = useState<any>({});
  const [me, setMe] = useState("");
  const { callUser: checkCallUser, resetCall } = useSelector(
    (state: any) => state.activeUser
  );
  const myVideo = useRef<any>();
  const userVideo = useRef<any>();
  const connectionRef = useRef<HTMLDivElement | any>();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream: any) => {
        setStream(currentStream);
        if (myVideo.current) myVideo.current.srcObject = currentStream;
      });

    socket.on("me", (id: string) => setMe(id));

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      console.log("callUser", from, name, signal);
      setCall({ isReceivingCall: true, from, signal });
    });
  }, [checkCallUser, myVideo, resetCall]);

  useEffect(() => {
    socket.on("callUsers", ({ from, name: callerName, signal }) => {
      console.log("callUser", from, name, signal);
      setCall({ isReceivingCall: true, from, signal });
    });
  }, [connectionRef]);
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data: any) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream: any) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };
  console.log(me, "from context");
  const callUser = (id: string, own: string) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    console.log(id, "id");
    console.log(own, "me");
    console.log('userId',id)
    peer.on("signal", (data: any) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: own,
        name,
      });
    });

    peer.on("stream", (currentStream: any) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
    console.log(connectionRef.current);
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
