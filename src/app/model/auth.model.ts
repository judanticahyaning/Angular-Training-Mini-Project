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