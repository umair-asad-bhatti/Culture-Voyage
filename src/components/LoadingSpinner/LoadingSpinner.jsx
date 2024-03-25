
// import { Spinner } from "@chakra-ui/react";
import Lottie from "lottie-react";
import loading from '../../assets/loading2.json'
import { Spinner } from "@chakra-ui/react";
// eslint-disable-next-line react/prop-types
export const LoadingSpinner = ({ size = 8 }) => {
    return (
        <div className={`w-full h-full `}>
            <Lottie animationData={loading} loop={true} size={size} />
            {/* <Spinner className={'dark:text-textPrimary text-textSecondary'} size={size} /> */}
        </div>
    )
}