import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useGetUserInformationQuery } from "../features/auth/authApi";
import { userLoggedIn } from "../features/auth/authSlice";
import Loader from "./Loader";
type Props = {
  children?: React.ReactNode | JSX.Element | JSX.Element[] | any;
};

const PrivateRoute = ({ children }: Props) => {
  const router = useRouter();
  const [cookies, removeCookie]: any = useCookies(["chatUser"]);
  const dispatch = useDispatch();

  useEffect((): any => {
    if (!cookies?.chatUser?.data?.token) {
      router.push("/");
    } else {
      dispatch(userLoggedIn(cookies?.chatUser));
    }
  }, [cookies, dispatch, router, removeCookie]);

  const { data, isLoading, isError, error }: any = useGetUserInformationQuery();

  useEffect((): any => {
    if (cookies?.chatUser?.data?.token) {
   
      if (data) {
     
        cookies.chatUser.data.result = data?.result;
      }
      if (isError) {
   
        removeCookie("chatUser",/* {path:'/dashboard'} */);
        router.push("/");
      }
    } else {
     
      router.push("/");
    }
  }, [data, isError, error, cookies, router, removeCookie]);

  if (isLoading) return <Loader />;
 
  if (!cookies?.chatUser?.data?.token) {
    
    router.push("/");
    return;
  }
  return children;
};

export default PrivateRoute;
