import {ZodSignupSchema} from "../utils/index.js";
import {ToastStrings} from "../constants/ToastStrings.js";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../firebase/Firebase.js";
import {doc, setDoc} from "firebase/firestore";
import { useToast } from "@chakra-ui/react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FireBaseErrorHandler} from "../utils/index.js";

const useSignup=()=>{

    const navigation=useNavigate()
    const toast=useToast()
    const [isSigningUp, setIsSigningUp] = useState(false)
    const handleSignup = async (e,email,password) => {
        e.preventDefault()
        try {

            ZodSignupSchema.parse({ email, password });

        } catch (errors) {
            let SignupErrors = JSON.parse(errors);
            SignupErrors.forEach(error => {
                toast({
                    title: error.message,
                    status: 'error',
                    duration: ToastStrings.duration,
                    isClosable: true
                })
            })
            return;
        }
        //if email and password validations are passed then perform login
        try {
            setIsSigningUp(true)
            const {user}=await createUserWithEmailAndPassword(auth, email, password)
            if (user) {
                //saving user data in firestore
                await setDoc(doc(db, 'users', user.uid), {
                    email, password, firstname: '', lastname: '', dob: '', phone: '', emailVerified: user.emailVerified
                })
                navigation("/emailverification")
            }

        } catch (error) {

            setIsSigningUp(false)
            const errorMessage = FireBaseErrorHandler(error.code)
            //TODO show toast
            toast({
                title: errorMessage,
                status: 'error',
                duration: ToastStrings.duration,
                isClosable: true
            })
        }

    };
    return {handleSignup,isSigningUp}
}
export default  useSignup