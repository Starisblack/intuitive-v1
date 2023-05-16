import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import { Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./SingleUserProfileView.css";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import db from "../../../firebase-config";
import { useParams } from "react-router";
import Spinner from "../../../components/Spinner";
import { useSelector } from "react-redux";
import { user } from "../../../reducers/authReducers";

const SingleUserProfileView = () => {
  const { id } = useParams<any>();
  const [userDetail, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const currentUser = useSelector(user);

  useEffect(() => {
    setLoading(true);
    const getUserDetails = async () => {
      const userRef = doc(db, "users", id);
      const userSnap = await getDoc(userRef);
      const userData: any = userSnap.data();
      setUser(userData);
      setLoading(false);
    };

    getUserDetails();
    setLoading(true);
  }, [id]);

  const followHandler = async (id: string) => {
   

    try {
      // func to check if the user as document
      const userRef = doc(db, "user", currentUser.uid);
      const docSnap = await getDoc(userRef);


      await updateDoc(doc(db, "users", currentUser.uid), {
        following: arrayUnion({
          id: userDetail.id,
        }),
      });

      await updateDoc(doc(db, "users", userDetail.id), {
        followers: arrayUnion({
          id: currentUser.id,
        }),
      });

      // if (docSnap.exists()) {
    
      // } else {
        // await setDoc(doc(db, "users", currentUser.uid), {
        //   following: arrayUnion({
        //     id: userDetail.id,
        //   }),
        // });

        // await setDoc(doc(db, "users", userDetail.id), {
        //   followers: arrayUnion({
        //     id: currentUser.id,
        //   }),
        // });
      // }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <IonPage className="single-user-profile-page">
      <IonHeader collapse="fade" className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="dark"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="single-user-profile">
        {loading ? (
          <Spinner />
        ) : (
          <div className="profile-content">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body little-profile text-center">
                  <div className="pro-img">
                    <div
                      style={{
                        width: "fit-content",
                        margin: "0 auto",
                        position: "relative",
                      }}
                    >
                      <img
                        src="https://ionicframework.com/docs/img/demos/card-media.png"
                        alt="user"
                      />
                    </div>
                  </div>
                  <h3 className="username">
                    {userDetail?.fName + " " + userDetail?.lName}
                  </h3>

                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <div className="follow">
                          <h3 className="font-light">0</h3>
                          <p>Followers</p>
                        </div>
                      </IonCol>
                      <IonCol>
                        <div className="follow">
                          <h3 className="font-light">0</h3>
                          <p>Following</p>
                        </div>
                      </IonCol>
                    </IonRow>
                  </IonGrid>

                  <IonButton style={{ margin: "10px" }}>Message</IonButton>
                  <IonButton
                    onClick={() => followHandler(userDetail.id)}
                    style={{ margin: "10px" }}
                  >
                    Follow
                  </IonButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SingleUserProfileView;
