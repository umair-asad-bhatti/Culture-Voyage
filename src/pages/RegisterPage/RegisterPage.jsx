import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { PasswordCheck, Send } from 'iconsax-react'
import { useContext, useState } from 'react'
import PasswordChecklist from "react-password-checklist"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import GoogleLogo from '../../assets/GoogleLogo.png'
import Logo from '../../assets/Logo.png'
import Button from '../../components/Button/Button.component'
import InputField from '../../components/Inputfield/InputField.component'
import NaviagateLink from '../../components/NavigateLink/NaviagateLink.component'
import SocialMediaButton from '../../components/SocialMediaButton/SocialMediaButton.component'
import strings from '../../constants/Strings'
import { UserContext } from '../../context/AuthContext'
import { auth, db } from '../../firebase/Firebase'
import { ZodSignupSchema } from '../../utils'
export default function RegisterPage() {
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
            let LoginErrors = JSON.parse(errors);
            LoginErrors.forEach(error => {
                toast.error(error.message)
            })
            return;
        }
        //if validation is good then login
        try {
            setisSigningUp(true)
            await createUserWithEmailAndPassword(auth, email, password)
            if (user) {
                await setDoc(doc(db, 'users', user.uid), {
                    email, password, firstname: '', lastname: '', dob: '', phone: '', emailVerified: user.emailVerified
                })
                navigation("/emailverification")
            }

        } catch (error) {
            setisSigningUp(false)
            const errorMessage = error.message;
            toast.error(errorMessage)
        }

    };


    return (
        <>

            <div className="min-h-screen flex  justify-between">
                <ToastContainer />
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
                                <Send color='#808998' />
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
                                {isSigningUp ? 'Creating...' : 'Create Account'}
                            </Button>}
                        </div>

                        <div className="mt-4 text-center">
                            <NaviagateLink toURL={'/login'}>Already have an account? Login</NaviagateLink>
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
