
import ErorShow from "./eror";



interface PromiseProp{
    isSuccess?:boolean
    isLoading:boolean
    isError:boolean
    eror?:unknown
    successText?:string
}
const ShowPromise=({isLoading,isError,eror,successText,isSuccess}:PromiseProp)=>{


  if (isLoading) return <p>טוען...</p>;

  if(isError) return <ErorShow eror={eror} ></ErorShow>
  if (isSuccess && successText) return <p>{successText}</p>
  return null


}
export default ShowPromise