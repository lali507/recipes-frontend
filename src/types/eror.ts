
interface erorProp {
    code:string,
    message:string,
    details?:{field:string,message:string}[]
};
interface errResponse{
    error:erorProp
}
export type {errResponse, erorProp};