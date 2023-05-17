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
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
} from "@ionic/react";
import { power } from "ionicons/icons";
import UploadProfileImg from "../../components/UploadProfileImg";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import db from "../../firebase-config";
import PopUp from "../../components/PopUp";
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
  followers?: any;
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
    followers: 0,
    following: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [userPosts, setUserPosts] = useState<any>([]);

  const signOutHandler = async () => {
    await dispatch(logoutAsync());
  };

  useEffect(() => {
    if (!userDetail) {
      history.push("/login");
    }
    // setLoading(true);

    try {
      const getUserDetails = async () => {
        const userRef = doc(db, "users", userDetail.id);
        onSnapshot(userRef, (doc) => {
          const userData: any = doc.data();
          setUserData(userData);
        });
      };

      const getUserPosts = () => {
        const q = query(
          collection(db, "posts"),
          where("createdBy", "==", userDetail?.id)
        );

        onSnapshot(q, (querySnapshot) => {
          setUserPosts(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );

          setLoading(false);
        });
      };

      getUserDetails();
      getUserPosts();
    } catch (error) {
      console.log(error);
    }
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
    showProfileImg = <UploadProfileImg id={userDetail.id} fileURL={userDetail?.profileImg} />;
    showPopUp = (
      <PopUp
        openPopUp={open}
        id={userDetail.id}
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
              height: "70vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <IonSpinner color="light" name="lines"></IonSpinner>{" "}
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
                            ? userData?.profileImg
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
                            {userData?.followers?.length >= 1
                              ? userData?.followers?.length
                              : 0}
                          </h3>
                          <p>Followers</p>
                        </div>
                      </IonCol>
                      <IonCol>
                        <div className="follow">
                          <h3 className="font-light">
                            {userData?.following?.length >= 1
                              ? userData?.following?.length
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
              <div style={{ padding: "5%", backgroundColor: "white" }}>
                <h1>Your Posts</h1>
                <div style={{ marginTop: "2rem" }}>
                  {userPosts?.length >= 1 ? (
                    <IonGrid>
                      <IonRow>
                        {userPosts?.map((post: any) => {
                          return (
                            <IonCol
                              key={post?.id}
                              size="12"
                              size-sm="6"
                              size-lg="4"
                            >
                              <IonCard color="light">
                                <IonCardHeader>
                                  <IonCardTitle>{post?.title}</IonCardTitle>
                                </IonCardHeader>

                                <IonCardContent>{post?.content}</IonCardContent>

                                <IonButton
                                  href={"/post/" + post?.id}
                                  fill="clear"
                                >
                                  View Post
                                </IonButton>
                              </IonCard>
                            </IonCol>
                          );
                        })}
                      </IonRow>
                    </IonGrid>
                  ) : (
                    <div>
                      {" "}
                      <h1>You have no Post</h1>
                      <IonButton>Add Post</IonButton>
                    </div>
                  )}
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
