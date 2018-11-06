export class User {
    login:string;
    name:string;
    surname: string;
    passwordHash?:String;
    password:string;
    confirmPassword?:string;
    userRole: number;
  }