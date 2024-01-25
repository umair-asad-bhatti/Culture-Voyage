
import {Spinner} from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
export const LoadingSpinner=({size})=>{
    return (
        <Spinner className={'dark:text-textPrimary text-textSecondary'} size={size} />
    )
}