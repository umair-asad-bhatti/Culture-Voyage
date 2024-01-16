import "react-phone-number-input/style.css";

import { useContext, useState } from "react";
import InputField from "../../components/Inputfield/InputField.component";
import { User, CalendarSearch, UserSquare } from "iconsax-react";
import Button from "../../components/Button/Button.component";
import PhoneInput from "react-phone-number-input";
import {
  formatPhoneNumberIntl,
  parsePhoneNumber,
  getCountryCallingCode,
  getCountries,
} from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import AdditionalInfo from "../../assets/AdditionalInfo.png";
import strings from "../../constants/Strings";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase.js";
import { UserContext } from "../../context/AuthContext.jsx";
import axios from "axios";

// eslint-disable-next-line react/prop-types

const AdditionalInformationPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDOB] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const navigation = useNavigate();
  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
=======
    const DOB = new Date(dob).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

    //TODO extract related information from user phone number ==>Zain
>>>>>>> 0a281dcf4c9d36d2a3af59c3c7d18f9a33f06655
    const parsedPhoneNumber = parsePhoneNumber(phoneNumber);
    const countryCode = `+${parsedPhoneNumber?.countryCallingCode || ""}`;
    const countryDialCode = parsedPhoneNumber?.country || "";
    const nationalNumber = parsedPhoneNumber?.nationalNumber || "";
    const response = await axios.get(
      `https://restcountries.com/v3.1/alpha/${countryDialCode}`
    );
    const country = response.data?.[0]?.name?.common || "";

<<<<<<< HEAD
=======
    //console.log("Country Name:", country);
    

>>>>>>> 0a281dcf4c9d36d2a3af59c3c7d18f9a33f06655
    await updateDoc(doc(db, "Users", user.uid), {
      ["First Name"]: firstName,
      ["Last Name"]: lastName,
      ["Username"]: username,
      ["Country"]: country,
      ["Country Code"]: countryCode,
      ["Country Dial Code"]: countryDialCode,
      ["National Number"]: nationalNumber,
      ["Phone Number"]: phoneNumber,
      ["Gender"]: gender,
      ["Date Of Birth"]: DOB,
      ["Phone Verified"]: false,
    });
    navigation("/home");
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center bg-gray-100">
      <div className="w-[50%]  p-8  ">
        <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex gap-2 md:flex-row flex-col">
            <InputField
              type="First Name"
              value={firstName}
              setValue={setFirstName}
            >
              <User color="#808998" />
            </InputField>
            <InputField
              type="Last Name"
              value={lastName}
              setValue={setLastName}
            >
              <User color="#808998" />
            </InputField>
          </div>

          <div className="mb-4">
            <InputField type="Username" value={username} setValue={setUsername}>
              <UserSquare color="#808998" />
            </InputField>
          </div>
          <div className="mb-4">
            <InputField type="date" value={dob} setValue={setDOB}>
              <CalendarSearch color="#808998" />
            </InputField>
          </div>
          <div className="mb-4">
            <div className="w-full py-2 px-4 text-lg border-2 border-[#808998] rounded-lg focus-within:border-accent">
              <PhoneInput
                international
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
            </div>
          </div>
          <div className="mb-4">
            <select
              className="w-full py-2 px-4 text-lg border-2 border-[#808998] rounded-lg focus-within:border-accent outline-none"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <Button onClickHandler={() => null} isDisabled={false}>
            Save
          </Button>
        </form>
      </div>
      <div className="w-[50%] bg-accent min-h-screen flex flex-col items-center justify-center">
        <img src={AdditionalInfo} width={300} height={300} />
        <h3 className="text-primary text-2xl">{strings.signUpHeading}</h3>
      </div>
    </div>
  );
};

export default AdditionalInformationPage;
