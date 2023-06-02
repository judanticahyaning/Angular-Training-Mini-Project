export class User{

  constructor(
    public id: string,
    public email: string,
    private token: any,
    private tokenExpirationDate: Date
  ){}
  
  get tokens(){
    if(!this.tokenExpirationDate || new Date() > this.tokenExpirationDate){
      return null;
    }
    return this.token;
  }
}