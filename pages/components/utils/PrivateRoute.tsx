import { useRouter } from 'next/router';
import React from 'react';
import { useCookies } from 'react-cookie';
type Props = {
    children?: React.ReactNode | JSX.Element | JSX.Element[] | any;
  };


const PrivateRoute = ({children}:Props )=> {

    const router=useRouter()
    const [cookies, setCookie, removeCookie] = useCookies(["chatToken"]);
    console.log(cookies?.chatToken)

    if(cookies?.chatToken){
        
    }else{
       return router.push('/')
    }

    return children

};

export default PrivateRoute;