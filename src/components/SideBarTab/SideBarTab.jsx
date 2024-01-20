
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const SideBarTab = ({ children, label, to }) => {
    return (
        <Link
            style={{ transition: '0.1s ease' }}
            to={to}
            className="text-secondary hover:text-white p-4 flex items-center gap-3 bg-gray-100 dark:bg-gray-700 dark:text-primary rounded-xl  hover:bg-accent "
        >
            {children}
            <h2>{label}</h2>
        </Link>
    )
}
export { SideBarTab }