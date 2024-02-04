
// import { Spinner } from "@chakra-ui/react";
import Lottie from "lottie-react";
import loading from '../../assets/loading2.json'
// eslint-disable-next-line react/prop-types
export const LoadingSpinner = ({ size }) => {
    return (
        // <Spinner className={'dark:text-textPrimary text-textSecondary'} size={size} />
        <div className="w-16 h-16">
            <Lottie animationData={loading} loop={true} size={size} />
        </div>
    )
}