export interface Member{
  id?: string;
  fullname: string;
  age: number;
  address: string;
  work: string;
  phonenumber: string;
}

export interface rentBook{
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  available: boolean;
  member:string;
}

export interface returnBook{
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  available: boolean;
  member:string;
}