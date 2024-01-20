import {Colors} from "../../constants/Colors.js";
import {Spinner} from "@chakra-ui/react";

export const LoadingSpinner=({size})=>{
    return (
        <Spinner className={'dark:text-primary text-darkGrey'} size={size} />
    )
}