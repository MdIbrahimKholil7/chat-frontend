
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