import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import db, { auth } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";

export const signUserOut = () => {
  return signOut(auth);
};

export const login = (userInput: { email: any; password: any }) => {
  const { email, password } = userInput;
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUp = async (userInput: {
  email: any;
  password: any;
  fName: any;
  lName: any;
}) => {


  const { email, password, fName, lName } = userInput;
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  setDoc(doc(db, "users", user.uid), {
    id: user.uid,
    fName,
    lName,
    isTarot: false,
    email: user.email,
  });
  return user
};
