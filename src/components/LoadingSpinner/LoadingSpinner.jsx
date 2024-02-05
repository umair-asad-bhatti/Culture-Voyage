
// import { Spinner } from "@chakra-ui/react";
import Lottie from "lottie-react";
import loading from '../../assets/loading2.json'
// eslint-disable-next-line react/prop-types
export const LoadingSpinner = ({ size = 8 }) => {
    return (
        // <Spinner className={'dark:text-textPrimary text-textSecondary'} size={size} />
        <div className={`w-${size} h-${size} `}>
            <Lottie animationData={loading} loop={true} size={size} />
        </div>
    )
}