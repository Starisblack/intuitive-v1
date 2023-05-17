import React from "react";
import { RouteComponentProps, useHistory, useParams } from "react-router";
import "./SinglePost.css";
import {
  IonPage,
  IonImg,
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
  IonIcon,
  IonSpinner,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
// import db from "../../firebase-config";
// import DeletePost from "../Post/DeletePost/DeletePost";
import { create } from "ionicons/icons";
import DeletePost from "../DeletePost/DeletePost";
import db from "../../../firebase-config";
import VideoPlayer from "../../../components/VideoPlayer";
import UpdatePost from "../UpdatePost/UpdatePost";
import { useAppSelector } from "../../../store/store";
import { user } from "../../../reducers/authReducers";
// import updatePost from "../Post/UpdatePost/UpdatePost";

type UserDetailPageProps = {
  id?: any;
};

const SinglePost: React.FC<UserDetailPageProps> = () => {
  const inputRef = useRef(null);
  const currentUser = useAppSelector(user);

  const { id } = useParams<any>();

  let history = useHistory();

  const [post, setPost] = useState<any>();
  const [edit, setEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const getDocument = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let postFetch = docSnap.data();

        setPost(postFetch);
        setLoading(false);
      } else {
        alert("No such document!");
        history.push("/home");
      }
    };

    getDocument();
  }, [history, id]);

  const editHandler = () => {
    setEdit(true);
    document.getElementById("edit")?.classList.remove("show");
    document.getElementById("edit")?.classList.add("hide");
  };

  const cancelHandler = () => {
    setEdit(false);
    document.getElementById("edit")?.classList.remove("hide");
    document.getElementById("edit")?.classList.add("show");
  };

  const editableStyling = {
    border: "2px solid green",
    padding: "10px",
    backgroundColor: "white",
  };

  let showEditDelButton = null;
  let singlePost;

  if (post && currentUser) {
    singlePost = (
      <>
        {post.postMedia.imgURL ? (
          <IonImg src={post.postMedia.imgURL} alt=""></IonImg>
        ) : (
          <VideoPlayer link={post.postMedia.videoURL} height="350px" />
        )}

        <div className="post-content-container">
          <h1
            id="title"
            style={edit ? editableStyling : {}}
            contentEditable={edit}
            suppressContentEditableWarning={true}
            ref={inputRef}
          >
            {post.title}
          </h1>
          <p
            id="content"
            style={edit ? editableStyling : {}}
            contentEditable={edit}
            suppressContentEditableWarning={true}
          >
            {post.content}{" "}
          </p>
        </div>
      </>
    );

    if (currentUser.uid === post.createdBy) {
      showEditDelButton = (
        <div className="del-edit-box">
          <div id="edit" onClick={editHandler}>
            <div className="edit-container">
              <IonIcon icon={create} color="dark"></IonIcon>
              <p style={{ margin: "0" }}>Edit</p>
            </div>
          </div>
          <DeletePost
            id={id}
            fileRef={
              post.postMedia.imgURL
                ? post.postMedia.imgURL
                : post.postMedia.videoURL
            }
            path={post.postMedia.imgURL ? "images/" : "videos/"}
          />
        </div>
      );
    }
  }

  return (
    <IonPage className="singlePostPage">
      <IonHeader collapse="fade" className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="dark"></IonBackButton>
          </IonButtons>

          {edit ? (
            <div slot="end">
              <IonButton
                style={{ fontSize: "14px" }}
                onClick={cancelHandler}
                color="danger"
              >
                Cancel
              </IonButton>
              <UpdatePost id={id} setEdit={setEdit} />
            </div>
          ) : (
            <>{showEditDelButton}</>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {loading ? (
          <div
            style={{
              height: "70vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IonSpinner name="circles"></IonSpinner>
          </div>
        ) : (
          <div className="post-container">{singlePost}</div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default React.memo(SinglePost);
