import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { PasswordCheck, Send } from 'iconsax-react'
import { useContext, useState } from 'react'
import PasswordChecklist from "react-password-checklist"
import { useNavigate } from 'react-router-dom'
import GoogleLogo from '../../assets/GoogleLogo.png'
import Logo from '../../assets/Logo.png'
import Button from '../../components/Button/Button.component'
import InputField from '../../components/Inputfield/InputField.component'
import NavigateLink from '../../components/NavigateLink/NavigateLink.component.jsx'
import SocialMediaButton from '../../components/SocialMediaButton/SocialMediaButton.component'
import strings from '../../constants/Strings'
import { UserContext } from '../../context/AuthContext'
import { auth, db } from '../../firebase/Firebase'
import { ZodSignupSchema } from '../../utils'
import { useToast } from "@chakra-ui/react";
import { ToastStrings } from "../../constants/ToastStrings.js";
import { Colors } from '../../constants/Colors.js'
import { Spinner } from "@chakra-ui/react";

export default function RegisterPage() {
    const toast = useToast()
    const { user } = useContext(UserContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confrimPassword, setConfirmPassword] = useState('')
    const [isSigningUp, setisSigningUp] = useState(false)


    const navigation = useNavigate()
    const HandleLogin = async (e) => {
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
        //if validation is good then login
        try {
            setisSigningUp(true)
            await createUserWithEmailAndPassword(auth, email, password)
            if (user) {
                //saving user data in firestore
                await setDoc(doc(db, 'users', user.uid), {
                    email, password, firstname: '', lastname: '', dob: '', phone: '', emailVerified: user.emailVerified
                })
                navigation("/emailverification")
            }

        } catch (error) {
            setisSigningUp(false)
            const errorMessage = error.message;
            //TODO show toast
            toast({
                title: errorMessage,
                status: 'error',
                duration: ToastStrings.duration,
                isClosable: true
            })
        }

    };


    return (
        <>

            <div className="min-h-screen flex  justify-between">

                <div className='w-[50%] bg-accent min-h-screen flex flex-col items-center justify-center'>
                    <img src={Logo} width={300} height={300} />
                    <h3 className='text-primary text-2xl'>{strings.signUpHeading}</h3>

                </div>
                <div className=" p-8 rounded  w-[50%] flex justify-center items-center ">

                    <form className='w-96'>
                        <div className='mb-4'>

                            <InputField type='email' value={email} setValue={setEmail} >
                                <Send color='#808998' />
                            </InputField>
                        </div>
                        <div className="mb-4">
                            <InputField type='password' value={password} setValue={setPassword} >
                                <PasswordCheck color='#808998' />
                            </InputField>

                        </div>
                        <div className=''>
                            <InputField type='password' value={confrimPassword} setValue={setConfirmPassword} >
                                <PasswordCheck color='#808998' />
                            </InputField>
                            <div className='mt-4'>
                                <PasswordChecklist

                                    rules={["minLength", "specialChar", "number", "capital", "match"]}
                                    minLength={5}
                                    value={password}
                                    valueAgain={confrimPassword}
                                />
                            </div>

                        </div>

                        <div className='my-4'>
                            {<Button onClickHandler={HandleLogin} isDisabled={isSigningUp}>
                                {isSigningUp ? <Spinner color={Colors.white} size={'sm'} /> : 'Sign Up'}
                            </Button>}
                        </div>

                        <div className="mt-4 text-center">
                            <NavigateLink toURL={'/login'}>Already have an account? Login</NavigateLink>
                        </div>
                        <div className='flex justify-center items-center gap-2'>
                            <div className='w-16 h-[1px] border border-gray-300'></div>
                            <h1 className='text-center my-4'>Or signin with</h1>
                            <div className='w-16 h-[1px] border border-gray-300'></div>
                        </div>

                        <SocialMediaButton onClickHandler={() => { }}>
                            <img src={GoogleLogo} alt="" width={30} height={30} />
                        </SocialMediaButton>
                    </form>
                </div>
            </div >
        </>
    )
}
