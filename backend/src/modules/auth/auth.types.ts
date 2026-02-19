export interface RegisterUser {
  name: string,
  email: string,
  password: string,
  role: 'CANDIDATE' | 'RECRUITER',
  gender: 'MALE' | 'FEMALE'
}

export interface LoginUser {
  email: string,
  password: string
}

export interface UserInfo {
  id: number,
  email: string,
}

export interface JwtPayload {
  userInfo: {
    id: number;
    email: string;
  }
}
