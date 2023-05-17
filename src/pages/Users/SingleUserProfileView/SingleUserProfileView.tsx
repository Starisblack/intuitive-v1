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
  IonSpinner,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import "./SingleUserProfileView.css";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import db from "../../../firebase-config";
import { useParams } from "react-router";
import Spinner from "../../../components/Spinner";
import { useSelector } from "react-redux";
import { user } from "../../../reducers/authReducers";
import Toast from "../../../components/Toast/Toast";
import defaultImg from "../../../assets/card-media.png";

const SingleUserProfileView = () => {
  const { id } = useParams<any>();
  const [userDetail, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [followLoading, setFollowLoading] = useState<boolean>(false);
  const [imageExist, setImageExist] = useState<boolean>(false);
  const currentUser = useSelector(user);
  const presentToast = Toast();

  useEffect(() => {
    setLoading(true);
    const getUserDetails = async () => {
      const userRef = doc(db, "users", id);

      onSnapshot(userRef, (doc) => {
        const userData: any = doc.data();
        setUser(userData);
        checkIfImageExists(userData.profileImg, (exists: any) => {
          if (exists) {
            setImageExist(true)
          } else {
           setImageExist(false)
          }
        })
      });
      setLoading(false);
    };

    getUserDetails();
  }, [id]);

  function checkIfImageExists(url:any, callback: any) {
    const img = new Image();
    img.src = url;

    if (img.complete) {
      callback(true);
    } else {
      img.onload = () => {
        callback(true);
      };
      
      img.onerror = () => {
        callback(false);
      };
    }
  }

 

  const followHandler = async (id: string) => {
    setFollowLoading(true);
    try {
      //  func to update user followers and those who are following
      updateDoc(doc(db, "users", currentUser.uid), {
        following: arrayUnion(userDetail.id),
      }).then(() => {
        updateDoc(doc(db, "users", id), {
          followers: arrayUnion(currentUser.uid),
        }).then((res) => {
          setFollowLoading(false);
          presentToast("Following", 1500, "top");
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const unFollowHandler = async (id: string) => {
    setFollowLoading(true);
    try {
      //  func to update user followers and those who are following
      updateDoc(doc(db, "users", currentUser.uid), {
        following: arrayRemove(id),
      }).then(() => {
        updateDoc(doc(db, "users", id), {
          followers: arrayRemove(currentUser.uid),
        }).then((res) => {
          setFollowLoading(false);
          presentToast("success", 1500, "top");
        });
      });
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
                        src={
                          imageExist
                            ? userDetail?.profileImg
                            : defaultImg
                        }
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
                          <h3 className="font-light">
                            {userDetail?.followers?.length >= 1
                              ? userDetail?.followers?.length
                              : 0}
                          </h3>
                          <p>
                            {userDetail?.followers?.length <= 1
                              ? "Follower"
                              : "Followers"}
                          </p>
                        </div>
                      </IonCol>
                      <IonCol>
                        <div className="follow">
                          <h3 className="font-light">
                            {userDetail?.following?.length >= 1
                              ? userDetail?.following?.length
                              : 0}
                          </h3>
                          <p>Following</p>
                        </div>
                      </IonCol>
                    </IonRow>
                  </IonGrid>

                  <IonButton style={{ margin: "10px" }}>Message</IonButton>

                  {userDetail?.followers?.includes(currentUser.uid) ? (
                    <IonButton
                      onClick={() => unFollowHandler(userDetail.id)}
                      style={{ margin: "10px" }}
                    >
                      {followLoading ? (
                        <IonSpinner name="dots"></IonSpinner>
                      ) : (
                        "Unfollow"
                      )}
                    </IonButton>
                  ) : (
                    <IonButton
                      onClick={() => followHandler(userDetail.id)}
                      style={{ margin: "10px" }}
                    >
                      {followLoading ? (
                        <IonSpinner name="dots"></IonSpinner>
                      ) : (
                        "Follow"
                      )}
                    </IonButton>
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

export default SingleUserProfileView;
