import type { errResponse } from "../types/eror";
import Alert from "./Alert";


const ErorShow = ({ eror }: { eror: unknown }) => {
    const stat = (eror as { data?: errResponse } | null)?.data?.error
    if (stat && ["TOKEN_EXPIRED", "INVALID_TOKEN", "MISSING_TOKEN"].includes(stat.code))
        return <Alert tone="error">פג תוקף הגלישה, יש להתחבר שוב</Alert>

    if (stat)
        return <Alert tone="error">{stat.message}</Alert>
    return <Alert tone="error">אירעה שגיאה, נסי שוב</Alert>
}
export default ErorShow
