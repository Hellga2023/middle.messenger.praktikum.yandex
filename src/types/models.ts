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

export interface User{
  id: number,
  first_name: string,
  second_name: string,
  display_name: string;
  login: string,
  email: string,
  password: string,
  phone: string,
  avatar: string   
};

