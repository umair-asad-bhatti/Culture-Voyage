import { ZodLoginSchema } from "../utils/index.js";
import { ToastStrings } from "../constants/ToastStrings.js";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth, db} from "../firebase/Firebase.js";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { FireBaseErrorHandler } from "../utils/index.js";
import {UserModel} from "../Models/UserModel.js";
import {doc, setDoc,getDoc} from "firebase/firestore";

export const useLogin = () => {
    const toast = useToast()
    const navigation = useNavigate()
    const [isLogging, setIsLogging] = useState(false)
    const [isloading, setIsloading] = useState(false)

    const HandleLogin = async (e, email, password) => {

        e.preventDefault()
        //perform the zod validation
        try {

            ZodLoginSchema.parse({ email, password });

        } catch (errors) {
            let LoginErrors = JSON.parse(errors);
            LoginErrors.forEach(error => {
                toast({
                    title: 'Invalid Email or Password.',
                    description: error.message,
                    status: 'error',
                    duration: ToastStrings.duration,
                    isClosable: true,
                })
            })
            return;
        }
        //if user inputs passed the validation then login
        setIsLogging(true)
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password)
            if (user)
                navigation("/home")

        } catch (error) {

            const errorMessage = FireBaseErrorHandler(error.code)
            toast({
                title: errorMessage,
                duration: ToastStrings.duration,
                status: 'error',
                isClosable: true
            })
        } finally {
            setIsLogging(false)
        }

    };
    const googleSignup = async (e) => {
        e.preventDefault()
        const provider = new GoogleAuthProvider();

        try {

            setIsloading(true)
            const {user} = await signInWithPopup(auth, provider)
            //check if user is already present or not
            const alreadyPresentUser=await getDoc(doc(db,'Users',user.uid))
            if(!alreadyPresentUser.exists())
            {
                //saving user data in firestore
                const newUser = new UserModel(user.email)
                await setDoc(doc(db, 'Users', user.uid), { ...newUser })

            }

        } catch (error) {

            setIsloading(false)
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
    return { HandleLogin, isLogging, setIsLogging, googleSignup, isloading }
}
