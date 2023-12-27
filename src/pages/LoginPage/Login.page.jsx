import strings from '../../constants/Strings'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/Firebase'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send } from 'iconsax-react'
import { PasswordCheck } from 'iconsax-react'
import Logo from '../../assets/Logo.png'
import GoogleLogo from '../../assets/GoogleLogo.png'
import InputField from '../../components/Inputfield/InputField.component'
import Button from '../../components/Button/Button.component'
import NaviagateLink from '../../components/NavigateLink/NaviagateLink.component'
import { ZodLoginSchema } from '../../utils'
import { ToastContainer, toast } from 'react-toastify';
import SocialMediaButton from '../../components/SocialMediaButton/SocialMediaButton.component'
import { useContext } from 'react'
import { UserContext } from '../../context/AuthContext'
export default function LoginPage() {
    const { user, isLoading } = useContext(UserContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogging, setIsLogging] = useState(false)
    const navigation = useNavigate()
    useEffect(() => {
        // Wait for user data to be loaded before redirecting
        //if user exists (already logged in then dont show the login page)
        if (!isLoading) {
            if (user) {
                navigation('/home');
            }
        }
    }, [user, isLoading, navigation]);
    const HandleLogin = async (e) => {
        e.preventDefault()

        //perform the zod validation
        try {

            ZodLoginSchema.parse({ email, password });

        } catch (errors) {
            let LoginErrors = JSON.parse(errors);
            LoginErrors.forEach(error => {
                toast.error(error.message)
            })
            return;
        }
        //if user inputs passed the validation then login
        try {
            setIsLogging(true)
            await signInWithEmailAndPassword(auth, email, password)
            if (!isLoading && user)
                navigation("/home")
            setIsLogging(false)
        } catch (error) {
            setIsLogging(false)
            const errorMessage = error.message;
            toast.error(errorMessage)
        }

    };

    return (
        <div className="min-h-screen flex justify-between">
            <ToastContainer />
            <div className='w-[50%] bg-accent min-h-screen flex flex-col items-center justify-center'>
                <img src={Logo} width={300} height={300} />
                <h3 className='text-primary text-2xl'>{strings.loginHeading1}</h3>
                <h3 className='text-primary text-2xl text-center mt-4'>{strings.loginHeading2}</h3>
                <h3 className='text-primary text-2xl text-center '>{strings.loginHeading3}</h3>
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

                    <div className="text-right my-4">
                        <NaviagateLink toURL={''}>Forgot Password</NaviagateLink>
                    </div>
                    <div className='my-4'>
                        {<Button onClickHandler={HandleLogin} isDisabled={isLogging}>
                            {isLogging ? 'Logging...' : 'Login'}
                        </Button>}
                    </div>

                    <div className="mt-4 text-center">
                        <NaviagateLink toURL={'/register'}>Dont have an account? Register</NaviagateLink>
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
    )
}
