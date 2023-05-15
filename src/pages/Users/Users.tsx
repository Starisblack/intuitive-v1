import {
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../../components/ExploreContainer";
import "./Users.css";
import UserListCard from "./UserListCard/UserListCard";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import db from "../../firebase-config";
import { useAppSelector } from "../../store/store";
import { user } from "../../reducers/authReducers";

const Users: React.FC = () => {
  const [users, setUsers] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const currentUser = useAppSelector(user);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    console.log(currentUser.uid);

    try {
      const getAllPosts = () => {
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
      getAllPosts();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

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
          <UserListCard data={users} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Users;
