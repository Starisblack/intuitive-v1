import {
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
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
    setLoading(true);

    try {
      const getAllUsers = () => {
        const q = query(
          collection(db, "users"),
          where("id", "!=", currentUser.uid)
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
    let userInput = e.target.value;
    setUserInput(userInput);
  };

  const searchHandler = (users: any) => {
    return users.filter((user: any) =>
      user.fName.toLowerCase().includes(userInput.toLowerCase())
    );
  };

 

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
          <> <SearchBar  onChange={searchInput} />
          <UserListCard data={users} />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Users;
