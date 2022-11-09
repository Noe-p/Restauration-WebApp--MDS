export interface UserType {
  id: string;
  role: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  country: string;
}

export interface UserApiType {
  _id: string;
  username: string;
  token: string;
  role: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  country: string;
}
