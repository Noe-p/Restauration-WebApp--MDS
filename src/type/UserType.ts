export interface UserType {
  id: string;
  role: string;
  username: string;
}

export interface UserApiType {
  _id: string;
  username: string;
  token: string;
  role: string;
  password: string;
}
