import { FC, useRef, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import db, { app } from "../firebase-config";
import { IonIcon, IonLoading } from "@ionic/react";
import { camera } from "ionicons/icons";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

type UploadProfileImgProps = {
  id?: any;
};

const UploadProfileImg: FC<UploadProfileImgProps> = ({ id }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef: any = useRef();


  const postDocRef = doc(db, "users", id);

  const uploadProfileImg = (file: any) => {
    setLoading(true)
    const storage = getStorage(app);
    const storageRef = ref(storage, "profile/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        alert(error);
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          try {
            await updateDoc(postDocRef, {
                profileImg: url
            });
            setLoading(false);
            
          } catch (err) {
            alert(err);
            setLoading(false);
          }
        });
      }
    );
  };

  const handleChange = (e: any) => {
    uploadProfileImg(e.target.files[0])
  };

  return (
    <IonIcon onClick={() => inputRef.current.click()} icon={camera}>
      <IonLoading
        cssClass="my-custom-class"
        isOpen={loading}
        onDidDismiss={() => {}}
        message={"Uploading..."}
      />
      <input
        onChange={handleChange}
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
      />
    </IonIcon>
  );
};

export default UploadProfileImg;
