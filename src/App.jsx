
import { auth } from './firebase/Firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import {useCheckUserInformation} from "./hooks/useCheckUserInformation.js";
export default function App() {
  const navigation = useNavigate()
  onAuthStateChanged(auth, (user) => {
    if (user) {
        navigation('/home')
    } else {
      navigation('/login')
    }
  });
}
