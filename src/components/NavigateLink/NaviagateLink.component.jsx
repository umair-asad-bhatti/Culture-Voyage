
import { Link } from "react-router-dom"
// eslint-disable-next-line react/prop-types
export default function NaviagateLink({ children, toURL }) {
    return <Link to={toURL} className="text-accent hover:underline font-bold ">
        {children}
    </Link>

}
