import type { errResponse } from "../types/eror";


const ErorShow=({eror}:{eror:unknown})=>{
const stat = (eror as {data?:errResponse} | null)?.data?.error
     if (stat && ["TOKEN_EXPIRED", "INVALID_TOKEN", "MISSING_TOKEN"].includes(stat.code))
           {return <div>פג תוקף גלישה התחברי שוב</div>
         }

      if(stat)
         return <div>{stat.message}</div>
      return <div>אירעה שגיאה, נסי שוב</div>


}
export default ErorShow
