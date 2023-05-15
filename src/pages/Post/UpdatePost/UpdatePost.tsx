import { FC, useState } from "react";
import "./UpdatePost.css";
import { doc, updateDoc} from "firebase/firestore";
import db from "../../../firebase-config";
import { IonButton, IonLoading } from "@ionic/react";

type updatePostProps ={
  id: string
  setEdit: any
}

const UpdatePost: FC<updatePostProps> = ({id, setEdit}) => {

  const [loading, setLoading] = useState<boolean>(false);


  const saveHandler = async () => {
    setLoading(true);
    const title = String(document.getElementById("title")?.textContent?.trim());
    const content = String(
      document.getElementById("content")?.textContent?.trim()
    );

    const postDocRef = doc(db, "posts", id);

    try {
          await updateDoc(postDocRef, {
            title: title,
            content: content,
          });
          setLoading(false)
          setEdit(false)
        } catch (err) {
          alert(err);
          setLoading(false)
        }

  };

  return (

    <IonButton onClick={saveHandler} color="success">
       <IonLoading
          cssClass="my-custom-class"
          isOpen={loading}
          onDidDismiss={() => {
            alert("updated successfully");
            // cancelHandler();
          }}
          message={"Updating..."}
        />
        Save
       </IonButton>
  );
};

export default UpdatePost;
