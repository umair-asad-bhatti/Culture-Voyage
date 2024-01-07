import { useState } from "react";
import { auth } from "../../firebase/Firebase"; // Import your Firebase configuration
import { sendPasswordResetEmail } from "firebase/auth";

import ForgetPassword from "../../assets/ForgetPassword.png";
import strings from "../../constants/Strings";
import InputField from "../../components/Inputfield/InputField.component";
import { Send } from "iconsax-react";
import Button from "../../components/Button/Button.component";
import {Spinner, useToast} from "@chakra-ui/react";
import {ToastStrings} from "../../constants/ToastStrings.js";
import {Colors} from "../../constants/Colors.js";

const ForgetPasswordPage = () => {
  const toast=useToast();
  const [email, setEmail] = useState("");
  const [submitting,setIsSubmitting]=useState(false)
  const handleForgetPassword = async () => {
    //TODO check if the email provided by user is registered or not

    if(!email){
      toast({
        title:'No email has been provided',
        status:'error',
        duration:ToastStrings.duration,
        isClosable:true
      })
      return
    }
    setIsSubmitting(true)
    try {

    await sendPasswordResetEmail(auth, email);

      toast({
        title:'Password reset link has been sent...',
        status:'success',
        duration:ToastStrings.duration,
        isClosable:true
      })
    }catch (error){
      toast({
        title:error.message,
        status:'error',
        duration:ToastStrings.duration,
        isClosable:true
      })
    }
    finally {
      setIsSubmitting(false)
      setEmail('')
    }


  };

  return (

    <div className="min-h-screen flex justify-between">

      <div className="w-[50%] bg-accent min-h-screen flex flex-col items-center justify-center">
        <img src={ForgetPassword} width={300} height={300} />
        <h3 className="text-primary text-2xl text-center mt-4">
          {strings.ForgetPassword}
        </h3>
        <h5 className="text-primary text-xl text-center mt-4 p-4">
          {strings.ForgetPasswordHeading}
        </h5>
      </div>

      <div className="p-8 rounded  w-[50%] flex justify-center items-center">
        <div className="w-96">
          <div className="mb-4">
            <InputField type="email" value={email} setValue={setEmail}>
              <Send color="#808998" />
            </InputField>
          </div>
          <div className="mb-4">
            <Button isDisabled={submitting}  onClickHandler={handleForgetPassword}>
              {!submitting?'submit':<Spinner  size={'sm'} color={Colors.white}/>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
