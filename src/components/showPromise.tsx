
import ErorShow from "./eror";

// const token = localStorage.getItem("token");
//   // שולח לשרת "מי אני?" רק אם יש טוקן שמור
//   const {isSuccess data, isLoading,isError} = useMeQuery(undefined, { skip: !token });


interface PromiseProp{
    isSuccess?:boolean
    isLoading:boolean
    isError:boolean
    eror?:unknown
    successText?:string
}
const ShowPromise=({isLoading,isError,eror,successText,isSuccess}:PromiseProp)=>{
    

  if (isLoading) return <p>טוען...</p>;

  // הטוקן תקף - המשתמשת מחוברת
  if(isError) return <ErorShow eror={eror} ></ErorShow>
  if (isSuccess && successText) return <p>{successText}</p>
  return null


  // אין טוקן / הטוקן לא תקף (נמחק ב-apiSlice) - מציגים הרשמה וכניסה
}
export default ShowPromise