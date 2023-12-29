import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/Firebase"; // Import your Firebase configuration
import { sendPasswordResetEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import ForgetPassword from "../../assets/ForgetPassword.png";
import strings from "../../constants/Strings";
import InputField from "../../components/Inputfield/InputField.component";
import { Send } from "iconsax-react";
import Button from "../../components/Button/Button.component";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  console.log(email);

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Email send");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex justify-between">
      <div className="w-[50%] bg-accent min-h-screen flex flex-col items-center justify-center">
        <img src={ForgetPassword} width={300} height={300} />
        <h3 className="text-primary text-2xl text-center mt-4">
          {strings.ForgetPassword}
        </h3>
        <h5 className="text-primary text-xl text-center mt-4">
          {strings.ForgetPasswordHeading}
        </h5>
      </div>

      <div className="p-8 rounded  w-[50%] flex justify-center items-center">
        <form className="w-96">
          <div className="mb-4">
            <InputField type="email" value={email} setValue={setEmail}>
              <Send color="#808998" />
            </InputField>
          </div>
          <div className="mb-4">
            <Button type="button" onClick={handleForgetPassword}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
