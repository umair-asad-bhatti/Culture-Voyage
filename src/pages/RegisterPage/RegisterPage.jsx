import { PasswordCheck, Send } from "iconsax-react";
import PasswordChecklist from "react-password-checklist";
import GoogleLogo from "../../assets/GoogleLogo.png";
import Logo from "../../assets/Logo.png";
import Button from "../../components/Button/Button.component";
import InputField from "../../components/Inputfield/InputField.component";
import NavigateLink from "../../components/NavigateLink/NavigateLink.component.jsx";
import SocialMediaButton from "../../components/SocialMediaButton/SocialMediaButton.component";
import strings from "../../constants/Strings";
import { Colors } from "../../constants/Colors.js";
import { Spinner } from "@chakra-ui/react";
import {useContext, useEffect, useState} from "react";
import useSignup from "../../hooks/useSignup.js";
import {useGoogleLogin} from "../../hooks/useGoogleLogin.js";
import {UserContext} from "../../context/AuthContext.jsx";
import {useCheckUserInformation} from "../../hooks/useCheckUserInformation.js";

export default function RegisterPage() {
  // const toast = useToast()
  // const { user } = useContext(UserContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { handleSignup, isSigningUp } = useSignup();
  const {handleGoogleLogin,isGoogleLoading}=useGoogleLogin();
  const {user, isLoading}= useContext(UserContext)
  const {isAdditionalInformationComplete,checkIsEmailVerified} =useCheckUserInformation()
  useEffect(() => {
    if (!isLoading && user) {

        checkIsEmailVerified(user)
        if(user.emailVerified)
           isAdditionalInformationComplete(user)

    }
  }, [user, isLoading]);
  // const navigation = useNavigate()
  return (
    <>
      <div className="min-h-screen flex  justify-between">
        <div className="w-[50%] bg-accent min-h-screen flex flex-col items-center justify-center">
          <img src={Logo} width={300} height={300} />
          <h3 className="text-primary text-2xl">{strings.signUpHeading}</h3>
        </div>
        <div className=" p-8 rounded  w-[50%] flex justify-center items-center ">
          <form className="w-96">
            <div className="mb-4">
              <InputField type="email" value={email} setValue={setEmail}>
                <Send color="#808998" />
              </InputField>
            </div>
            <div className="mb-4">
              <InputField
                type="password"
                value={password}
                setValue={setPassword}
              >
                <PasswordCheck color="#808998" />
              </InputField>
            </div>
            <div className="">
              <InputField
                type="password"
                value={confirmPassword}
                setValue={setConfirmPassword}
              >
                <PasswordCheck color="#808998" />
              </InputField>
              <div className="mt-4">
                <PasswordChecklist
                  rules={[
                    "minLength",
                    "specialChar",
                    "number",
                    "capital",
                    "match",
                  ]}
                  minLength={5}
                  value={password}
                  valueAgain={confirmPassword}
                />
              </div>
            </div>

            <div className="my-4">
              {
                <Button
                  onClickHandler={() => handleSignup(event, email, password)}
                  isDisabled={isSigningUp}
                >
                  {isSigningUp ? (
                    <Spinner color={Colors.white} size={"sm"} />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              }
            </div>

            <div className="mt-4 text-center">
              <NavigateLink toURL={"/login"}>
                Already have an account? Login
              </NavigateLink>
            </div>
            <div className="flex justify-center items-center gap-2">
              <div className="w-16 h-[1px] border border-gray-300"></div>
              <h1 className="text-center my-4">Or signin with</h1>
              <div className="w-16 h-[1px] border border-gray-300"></div>
            </div>

            <SocialMediaButton onClickHandler={handleGoogleLogin}>
              {isGoogleLoading ? (
                <Spinner color={Colors.black} size={"sm"} />
              ) : (
                <img src={GoogleLogo} alt="" width={30} height={30} />
              )}
            </SocialMediaButton>
          </form>
        </div>
      </div>
    </>
  );
}
