import { FC, useState } from "react";
import { useIonAlert, IonIcon, IonLoading } from "@ionic/react";
import { trash } from "ionicons/icons";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import "./DeletePost.css";
import db, { storage } from "../../../firebase-config";
import { useHistory } from "react-router";

type DeletePostProps = {
  id: string;
  fileRef?: string;
  path?: string;
};
const DeletePost: FC<DeletePostProps> = ({ id, fileRef, path }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const httpsReference = ref(storage, fileRef);

  let fileName = httpsReference.name;

  const history = useHistory();

  const [presentAlert] = useIonAlert();

  const desertRef = ref(storage, path + fileName);

  const handleDelete = () => {
    const deletePost = async () => {
      const postDocRef = doc(db, "posts", id);
      try {
        if (!fileRef) {
          await deleteDoc(postDocRef);
          setLoading(false);
          history.push("/");
        } else {
          await deleteDoc(postDocRef);
          await deleteObject(desertRef)
            .then(() => {
              console.log("File deleted successfully");
            })
            .catch((error) => {
              console.log(" Uh-oh, an error occurred!");
            });

          setLoading(false);
          history.push("/");
        }
      } catch (err) {
        alert(err);
      }
    };

    presentAlert({
      header: "Do you want to delete this post?",
      cssClass: "custom-alert",
      buttons: [
        {
          text: "No",
          cssClass: "alert-button-cancel",
        },
        {
          text: "Yes",
          cssClass: "alert-button-confirm",
          handler: () => {
            setLoading(true);
            deletePost();
          },
        },
      ],
    });
  };
  return (
    <div onClick={handleDelete} className="del-container">
      <IonLoading
        cssClass="my-custom-class"
        isOpen={loading}
        message={"deleting..."}
      />
      <IonIcon slot="end" icon={trash} color="danger"></IonIcon>
      <p style={{ margin: "0" }}>Delete</p>
    </div>
  );
};
export default DeletePost;
