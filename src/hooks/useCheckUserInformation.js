import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase/Firebase.js";
import {useNavigate} from "react-router-dom";
import {useState} from 'react'
export const useCheckUserInformation=()=> {
    const navigate = useNavigate();
    const [checkingUserInformation, setCheckingUserInformation] = useState(true)
    const isAdditionalInformationComplete = async (user) => {
        if(!user.emailVerified)
            return;
        const response = await getDoc(doc(db, 'Users', user.uid));
        if (response.exists()) {
            const userData = response.data();
            if (userData['First Name'] && userData['Last Name'] && userData['Username'] && userData['Country'] && userData['Country Code'] && userData['Country Dial Code'] && userData['National Number'] && userData['Phone Number'] && userData['Gender'] && userData['Date Of Birth']) {
                setCheckingUserInformation(false);
                navigate('/home')
            } else {
                setCheckingUserInformation(false);
                navigate('/additionalinformation')
            }
        }
    }
        const checkIsEmailVerified = (user) => {
            if (!user.emailVerified)
                navigate('/emailverification')
        }

        return {isAdditionalInformationComplete, checkIsEmailVerified, checkingUserInformation}
    }
