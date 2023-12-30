import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase/Firebase'; // Import your Firebase configuration
import {sendEmailVerification, onAuthStateChanged, signOut} from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore'
import NavigateLink from '../../components/NavigateLink/NavigateLink.component.jsx';
import EmailVerify from '../../assets/EmailVerify.png'
import strings from '../../constants/Strings'
import {useToast} from "@chakra-ui/react";
import {ToastStrings} from "../../constants/ToastStrings.js";
import {useContext} from "react";
import {UserContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {Colors} from '../../constants/Colors.js'
import {Spinner} from "@chakra-ui/react";
import Button from '../../components/Button/Button.component.jsx'
const EmailVerificationPage = () => {
    const {user,isLoading}=useContext(UserContext)
    const navigation=useNavigate()
    const toast=useToast()
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isSending,setIsSending]=useState(false)
    useEffect(()=>{
        if(!user)
            navigation('/login')
    },[user,isLoading])
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // -> Alert Email Verification
                const onIdTokenChangedUnsubscribe = auth.onIdTokenChanged((user) => {
                    const unsubscribeSetInterval = setTimeout(() => {
                        auth.currentUser.reload();
                        auth.currentUser.getIdToken(/* forceRefresh */ true)
                    }, 10000);

                    if (user && user.emailVerified) {
                        clearInterval(unsubscribeSetInterval) //delete interval
                        setIsEmailVerified(true)
                        updateDoc(doc(db, 'users', user.uid), { emailVerified: user.emailVerified })
                        // -> Go to your screnn
                        return onIdTokenChangedUnsubscribe() //unsubscribe onIdTokenChanged
                    }
                })
            }
        })
    }, [])
    const signout =async () => {
        try {
        await signOut(auth);
        }catch (e) {
            toast({
                title:e.message,
                status:'error',
                duration:ToastStrings.duration,
                isClosable:true
            })
        }
    }

    const handleResendVerificationEmail = async () => {
        try {
            setIsSending(true)
            await sendEmailVerification(auth.currentUser)
            toast({
                description:'Verification Email has been sent',
                status:'success',
                duration:ToastStrings.duration
            })
        }catch (e) {
            toast({
                description:e.message,
                status:'error',
                duration:ToastStrings.duration
            })
        }finally {
            setIsSending(false)
        }

    };

    return (
        <div className="min-h-screen flex justify-between">

            <div className='w-[50%] bg-accent min-h-screen flex flex-col items-center justify-center'>
                <img src={EmailVerify} width={300} height={300} />
                <h3 className='text-primary text-2xl text-center mt-4'>{strings.EmailVerify}</h3>

            </div>
            
            <div className="p-8 rounded  w-[50%] flex  flex-col justify-center items-center gap-4">
                <div className='flex  flex-col justify-center items-start gap-6'>
                    {isEmailVerified ? (
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Email Verified</h2>
                            <NavigateLink toURL={'/additionalinformation'}>Continue</NavigateLink>
                            {/* Add a button or link to redirect to the main application */}
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Email Verification</h2>
                            <p>Please verify your email before continuing.</p>
                            <Button onClickHandler={handleResendVerificationEmail}>

                                {isSending?<Spinner color={Colors.white} size={'sm'}/>:'Send Verification Email'}
                            </Button>
                        </div>
                    )}
                    <Button onClickHandler={signout}>
                        Logout
                    </Button>
                </div>

            </div>

        </div>
    
    );
};

export default EmailVerificationPage;
