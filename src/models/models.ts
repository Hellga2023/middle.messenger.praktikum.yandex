import WebSocketService from "../utils/websocketService";

export interface LoginFormModel {
    email: string;
    password: string;
  };

export interface  SignUpFormModel{    
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string     
};

export interface UserInChatModel extends UserWithAvatarModel{
  role: string
}

export interface UserWithAvatarModel extends UserWithPasswordModel{
  id: number,
  avatar: string   
};

export interface UserWithPasswordModel extends UserModel {
  password: string
};

export interface UserModel {
  first_name: string,
  second_name: string,
  display_name: string;
  login: string,
  email: string,
  phone: string
};

export interface ChatInfoModel{
  id: number,
  title:string,
  avatar:string | null, // this is chat avatar!!!! no user
  unread_count:number,
  last_message: MessageModel | null,
  created_by: number,
  socket: WebSocketService|null,
  token: string|null
}

export interface MessageModel{
  user: UserWithAvatarModel,
  time: string, //$timestamp,
  content: string
}

export interface MessageDetailsModel{
  id: number,
  chat_id: number,
  user_id: number,
  content: string,
  file: any,
  is_read: boolean,
  type: string,
  time: string //timestamp
}

