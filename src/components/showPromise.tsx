import ErorShow from "./eror";
import Loader from "./Loader";
import Alert from "./Alert";

interface PromiseProp {
    isSuccess?: boolean
    isLoading: boolean
    isError: boolean
    eror?: unknown
    successText?: string
}
const ShowPromise = ({ isLoading, isError, eror, successText, isSuccess }: PromiseProp) => {
    if (isLoading) return <Loader />
    if (isError) return <ErorShow eror={eror} />
    if (isSuccess && successText) return <Alert tone="success">{successText}</Alert>
    return null
}
export default ShowPromise
