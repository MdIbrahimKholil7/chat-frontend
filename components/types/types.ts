
export type UserForm = {
    name?: string,
    email: string,
    password: string,
    img?: string
}

export type Users = {

    friendInfo: {
        name: string,
        email: string,
        _id: string,
        updatedAt?:string
    },
    lastMsg:{
        message: string,
        sender:string,
        receiver:string,
        updatedAt:string
    }
}

export type Friend = {
    name: string,
    email: string,
    _id: string,

}

export type MessageAdd = {
    receiverId: string,
    message: string
}

export type Message = {
    sender: string,
    receiverId: string,
    message: string
    name: string,
    createdAt: string
}

export type SocketUser = {
    socketId: string,
    userId: string,
    user: {
        name: string,
        _id: string,
        email: string,
        password?: string
    }
}




export type SocketUsers = {
    socketId: string,
    userId: string,
    user: {
        name: string,
        _id: string,
        email: string,
        password?: string
    }
}

export type SendMessage = {
    sender: string,
    receiverId: string,
    message: string,
}

export type notification = {
    sender: string,
    receiverId: string,
}

export type msgNotification = {
    _id: string,
    total: number,
    name: string,
}

// add friend type 
export type friend={
    createdAt?:string,
    email:string,
    name:string,
    __v?:string,
    _id:string,
    updatedAt?: string | undefined
}


