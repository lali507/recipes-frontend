interface userRegister  {
  name: string;
  email: string;
  password: string;
};
interface userLogin  {
  email: string;
  password: string;
};
interface userResponse{
    id:number,
    name:string,
    email:string,
    role:"USER"|"ADMIN",
    createdAt:string,
    
}
export type { userRegister, userLogin ,userResponse};