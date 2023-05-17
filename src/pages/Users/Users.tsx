import {
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Users.css";
import UserListCard from "./UserListCard/UserListCard";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import db from "../../firebase-config";
import { useAppSelector } from "../../store/store";
import { user } from "../../reducers/authReducers";
import SearchBar from "../../components/SearchBar/SearchBar";


const Users: React.FC = () => {
  const [users, setUsers] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const currentUser = useAppSelector(user);
  const [userInput, setUserInput] = useState("");


  useEffect(() => {
    window.scrollTo(0, 0);
  

    try {
      const getAllUsers = () => {
        setLoading(true);
        const q = query(
          collection(db, "users"),
          where("id", "!=", currentUser.id)
        );

        onSnapshot(q, (querySnapshot) => {
          setUsers(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );

          setLoading(false);
        });
      };
      getAllUsers();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [currentUser]);



  const searchInput = (e: any) => {
   
    setUserInput(e.target.value);
  };

  const searchHandler = (users: any) => {
    if(users){
      return users.filter((user: any) =>
      user.fName.toLowerCase().includes(userInput.toLowerCase()) || user.lName.toLowerCase().includes(userInput.toLowerCase())
    );
    }
   
    return users
  };


// if(!users) return null
 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Users</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {loading ? (
          <div
            style={{
              height: "70vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <IonSpinner name="lines"></IonSpinner>
          </div>
        ) : (
          <div style={{padding: "5%"}}> <SearchBar placeHolder="search users"  onChange={searchInput} />
          <UserListCard data={searchHandler(users)} />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Users;
