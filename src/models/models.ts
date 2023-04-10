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

export interface UserWithAvatarModel extends UserWithPasswordModel{
  id: number,
  avatar: string   
};

export interface UserWithPasswordModel {
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
