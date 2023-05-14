import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase-config";


export const signUserOut = () => {
    return signOut(auth);
 };  

 export const login = (userInput: { email: any; password: any; }) => {
    const {email, password} = userInput
    return signInWithEmailAndPassword(auth, email, password);
  };