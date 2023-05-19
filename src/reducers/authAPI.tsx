import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import db, { auth } from "../firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const signUserOut = () => {
  return signOut(auth);
};

export const login = async (userInput: { email: any; password: any }) => {
  const { email, password } = userInput;

  const userData: any = await signInWithEmailAndPassword(auth, email, password);

  const { uid } = userData.user;
  const userRef = doc(db, "users", uid);
   const docSnap = await getDoc(userRef);

  return docSnap.data();
};

// const userRef = doc(db, "users", user.uid);
// onSnapshot(userRef, (doc) => {
//   const userData: any = doc.data();

// })

export const signUp = async (userInput: {
  email: any;
  password: any;
  fName: any;
  lName: any;
}) => {
  const { email, password, fName, lName } = userInput;
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

 await setDoc(doc(db, "users", user.uid), {
    id: user.uid,
    fName,
    lName,
    isTarot: false,
    email: user.email,
  });

  await setDoc(doc(db, "userChats", user.uid), {});
  return user;
};
