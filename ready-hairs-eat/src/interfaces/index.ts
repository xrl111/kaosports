export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  address: string;
  role: string;
  status: boolean;
  gender: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DataResponse<T> {
  message: string;
  data: T;
}

export interface ListResponse<T> {
  result: T[];
  totalCount: number;
}
export interface UserProps {
  userType: 'users';
}
