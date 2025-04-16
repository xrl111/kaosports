export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface IUserCreate extends IUser {
  url: string;
  status: boolean;
  phone: string;
}
