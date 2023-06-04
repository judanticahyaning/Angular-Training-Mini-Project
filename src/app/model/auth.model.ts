export interface authRequestData{
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface authResponseData{
  idToken: string;
  email: string;
  refreshToken: string;
  expired: string;
  localId: string;
  registered?: string;
}

export interface authReqDataUser{
  idToken: string;
}

export interface authResDataUser{
  idToken?:string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}