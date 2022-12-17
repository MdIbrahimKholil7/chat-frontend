
export type UserForm = {
    name?: string,
    email: string,
    password: string,
    img?: string
}

export type Users = {
   
        name: string,
        email: string,
        _id: string
    

}

export type Friend={
    name: string,
    email: string,
    _id: string,

}

export type MessageAdd={
    receiverId:string,
    message:string
}

export type Message={
    sender:string,
    receiver:string,
    message:string
}

export type SocketUser={
    socketId:string,
    userId:string,
    user:{
        name:string,
        _id:string,
        email:string,
        password?:string
    }
}

export type SocketUsers={
    socketId:string,
    userId:string,
    user:{
        name:string,
        _id:string,
        email:string,
        password?:string
    }
}

