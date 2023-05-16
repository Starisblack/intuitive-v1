import React, { FC, useEffect, useState } from "react";
import "./Profile.css";
import {
  IonContent,
  IonPage,
  IonCol,
  IonGrid,
  IonRow,
  IonButton,
  IonIcon,
  IonToolbar,
  IonButtons,
  IonSpinner,
  useIonViewWillEnter,
} from "@ionic/react";
import { power } from "ionicons/icons";
import UploadProfileImg from "../../components/UploadProfileImg";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import db from "../../firebase-config";
import PopUp from "../../components/PopUp";
import EditProfile from "./EditProfile/EditProfile";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { logoutAsync } from "../../reducers/authReducers";
import { useHistory } from "react-router";
import { user } from "../../reducers/authReducers";

interface IUser {
  fName?: string;
  lName?: string;
  email?: string;
  isTarot?: boolean;
  profileImg?: string;
  bio?: string;
  follower?: any;
  following?: any;
}

const Profile: FC = () => {
  const history = useHistory();

  const userDetail = useAppSelector(user);

  const dispatch = useAppDispatch();

  const [userData, setUserData] = useState<IUser>({
    fName: "",
    lName: "",
    email: "",
    isTarot: false,
    profileImg: "",
    bio: "",
    follower: 0,
    following: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [isVisible, setIsvisible] = useState<boolean>(false);

  const signOutHandler = async () => {
    await dispatch(logoutAsync());
    history.push("/login");
  };

  useIonViewWillEnter(() => console.log("profile"));

  useEffect(() => {
    if (!userDetail) {
      history.push("/login");
    }

    const getUserDetails = async () => {
      setLoading(true);
      const userRef = doc(db, "users", userDetail.uid);
      onSnapshot(userRef, (doc) => {
        const userData: any = doc.data();
        setUserData(userData);
        setLoading(false);
      });
    };

    getUserDetails();
  }, [history, userDetail]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  let showProfileImg = null;
  let showPopUp = null;

  if (userDetail) {
    showProfileImg = <UploadProfileImg id={userDetail.uid} />;
    showPopUp = (
      <PopUp
        openPopUp={open}
        id={userDetail.uid}
        userDetail={userData}
        handleClose={handleClose}
      />
    );
  }

  return (
    <IonPage>
      <IonToolbar className="home-toolbar">
        <IonButtons
          onClick={signOutHandler}
          className="logout-container"
          slot="primary"
        >
          <IonIcon
            size="large"
            slot="end"
            icon={power}
            aria-hidden="true"
          ></IonIcon>
        </IonButtons>
      </IonToolbar>

      <IonContent fullscreen className="profile-page">
        {loading ? (
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <IonSpinner name="lines"></IonSpinner>{" "}
          </div>
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
                        src={
                          userData?.profileImg
                            ? userData.profileImg
                            : "https://ionicframework.com/docs/img/demos/card-media.png"
                        }
                        alt="user"
                      />
                      {showProfileImg}
                    </div>
                  </div>
                  <h3 className="username">
                    {userData?.fName + " " + userData?.lName}
                  </h3>
                  <p className="bio">
                    {userData?.bio
                      ? userData?.bio
                      : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown"}
                  </p>{" "}
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <div className="follow">
                          <h3 className="font-light">
                            {userData.follower?.length >= 1
                              ? userData.follower?.length
                              : 0}
                          </h3>
                          <p>Followers</p>
                        </div>
                      </IonCol>
                      <IonCol>
                        <div className="follow">
                          <h3 className="font-light">
                            {userData.following?.length >= 1
                              ? userData.following?.length
                              : 0}
                          </h3>
                          <p>Following</p>
                        </div>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                  {showPopUp}
                  <IonButton onClick={handleClickOpen}>Edit Profile</IonButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Profile;
