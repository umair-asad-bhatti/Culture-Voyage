/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const SideBarTab = ({ children, label, to, activeTab, setActiveTab }) => {
   
    return (
        <Link
            onClick={() => setActiveTab(to)}
            to={to}
            className={`dark:text-textPrimary rounded-xl dark:hover:bg-darkerGrey hover:bg-softGrey hover:text-textSecondary  text-textSecondary dark:hover:text-textPrimary p-4 flex items-center gap-3  ${(activeTab.toLowerCase() === to.toLowerCase()) ? 'dark:accent bg-accent text-white' : ''
                } `}
        >
            {children}
            <h2>{label}</h2>
        </Link>
    );
};

export { SideBarTab };
