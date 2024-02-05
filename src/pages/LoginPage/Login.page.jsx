import strings from "../../constants/Strings";
import { useState, useEffect } from "react";
import { Send } from "iconsax-react";
import { PasswordCheck } from "iconsax-react";
import Logo from "../../assets/Logo.png";
import GoogleLogo from "../../assets/GoogleLogo.png";
import InputField from "../../components/Inputfield/InputField.component";
import Button from "../../components/Button/Button.component";
import NavigateLink from "../../components/NavigateLink/NavigateLink.component.jsx";
import SocialMediaButton from "../../components/SocialMediaButton/SocialMediaButton.component";
import { useContext } from "react";
import { UserContext } from "../../context/AuthContext";
import { Spinner } from "@chakra-ui/react";
import { Colors } from "../../constants/Colors.js";
import { useLogin } from "../../hooks/useLogin.js";
import { useGoogleLogin } from "../../hooks/useGoogleLogin.js";
import { useCheckUserInformation } from "../../hooks/useCheckUserInformation.js";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner.jsx";
import Lottie from "lottie-react";

import hello from '../../assets/hello.json'

export default function LoginPage() {
  // const toast = useToast()
  const { user, isLoading } = useContext(UserContext);
  const { HandleLogin, isLogging } = useLogin();
  const { handleGoogleLogin, isGoogleLoading } = useGoogleLogin()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigation = useNavigate();
  const { isAdditionalInformationComplete, checkIsEmailVerified } = useCheckUserInformation()
  useEffect(() => {
    if (!isLoading && user) {
      checkIsEmailVerified(user)
      if (user.emailVerified && !isGoogleLoading)
        isAdditionalInformationComplete(user)
    }
  }, [user, isLoading, isGoogleLoading, checkIsEmailVerified, isAdditionalInformationComplete]);
  return (
    <>
      {(
        <>
          <div className="min-h-screen flex justify-between">
            <div className="w-[50%] bg-accent  min-h-screen flex flex-col items-center justify-center">
              <img src={Logo} width={300} height={300} />
              {/* <div className="w-[300px] h-[300px]  rounded-full">
                <Lottie animationData={hello} loop={true} />
              </div> */}
              <h3 className="text-primary text-2xl">{strings.loginHeading1}</h3>
              <h3 className="text-primary text-2xl text-center mt-4">
                {strings.loginHeading2}
              </h3>
              <h3 className="text-primary text-2xl text-center ">
                {strings.loginHeading3}
              </h3>
            </div>
            <div className=" p-8 rounded dark:bg-secondary  w-[50%] flex justify-center items-center ">
              <form className="w-96">
                <div className="mb-4">
                  <InputField type="email" value={email} setValue={setEmail}>
                    <Send className={'dark:text-primary text-darkGrey'} />
                  </InputField>
                </div>
                <div className="mb-4">
                  <InputField
                    type="password"
                    value={password}
                    setValue={setPassword}
                  >
                    <PasswordCheck className={'dark:text-primary text-darkGrey'} />
                  </InputField>
                </div>

                <div className="text-right my-4">
                  <NavigateLink toURL={"/forgetpassword"}>
                    Forgot Password
                  </NavigateLink>
                </div>
                <div className="my-4">
                  {
                    <Button
                      onClickHandler={() => HandleLogin(event, email, password)}
                      isDisabled={isLogging}
                    >
                      {isLogging ? (
                        <Spinner color={Colors.white} size={"sm"} />
                      ) : (
                        "Login"
                      )}
                    </Button>
                  }
                </div>

                <div className="mt-4 text-center">
                  <NavigateLink toURL={"/register"}>
                    Dont have an account? Register
                  </NavigateLink>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <div className="w-16 h-[1px] border border-gray-300"></div>
                  <h1 className="text-center my-4 dark:text-primary">Or signin with</h1>
                  <div className="w-16 h-[1px] border border-gray-300"></div>
                </div>

                <SocialMediaButton onClickHandler={handleGoogleLogin}>
                  {isGoogleLoading ? (
                    <LoadingSpinner size={'sm'} />
                  ) : (
                    <img src={GoogleLogo} alt="" width={30} height={30} />
                  )}
                </SocialMediaButton>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
