import { FC } from "react";
import "./CreatePost.css";
import { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonInput,
  IonItem,
  IonTextarea,
  IonButton,
  IonSpinner,
  IonLoading,
  IonSelect,
  IonSelectOption,
  IonImg,
} from "@ionic/react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useHistory } from "react-router";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useForm, SubmitHandler } from "react-hook-form";
import db, { app } from "../../../firebase-config";
import { user } from "../../../reducers/authReducers";
import "./CreatePost.css";
import { useAppSelector } from "../../../store/store";
import { format } from "date-fns";
import Resizer from "react-image-file-resizer";

type Inputs = {
  category: string;
  title: string;
  content: string;
  picture: any;
  video: any;
};


const resizeFile = (file: any) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });



const CreatePost: FC = () => {
  let history = useHistory();

  const currentUser = useAppSelector(user);
  const { handleSubmit, register, resetField, reset, watch, setValue } = useForm<Inputs>({
    mode: "onChange",
    defaultValues: {
      video: "",
      picture: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);

  // const picture = watch("picture");
  // const video = watch("video");

  const createPost = async (userInput: any, url?: string) => {
    const { content, category, title } = userInput;

    const postMedia =
      userInput.picture === "" ? { videoURL: url } : { imgURL: url };

    try {
      if (!url) {
        await addDoc(collection(db, "posts"), {
          content,
          category,
          title,
          author: currentUser.fName + " " + currentUser.lName,
          date: format(new Date(), "MMMM dd, yyyy"),
          createdBy: currentUser.uid,
          created: Timestamp.now(),
        });

        setLoading(false);
        reset();
        history.push("/home");
      } else {
        await addDoc(collection(db, "posts"), {
          content,
          category,
          title,
          author: currentUser.fName + " " + currentUser.lName,
          date: format(new Date(), "MMMM dd, yyyy"),
          postMedia,
          createdBy: currentUser.uid,
          created: Timestamp.now(),
        });

        setLoading(false);
        reset();
        history.push("/home");
      }
    } catch (e) {
      alert("Error adding document: " + e);
      setLoading(false);
    }
  };

  const uploadPostImg = (userInput: any) => {
    const path = userInput.picture === "" ? "videos/" : "images/";

    const storage = getStorage(app);
    const storageRef = ref(storage, path + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        alert(error);
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          createPost(userInput, url);
        });
      }
    );
  };


  const validateSelectedVideoFile = (file: any) => {
    const MAX_FILE_SIZE = 100120 // 100MB

    if (!file) {
      return  alert("Please choose a file");
    }

    const fileSizeKiloBytes = file.size / 1024

    if(fileSizeKiloBytes > MAX_FILE_SIZE){
      alert("File size is greater than maximum limit 100MB");
      setValue("video", null)
    } else{
      setFile(file)
    }


    
  };

  const onSubmitHandler: SubmitHandler<Inputs> = async (userInput) => {
    setLoading(true);
    if (!file) {
      createPost(userInput);
    } else {
        uploadPostImg(userInput);
    }
   
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Create a New Post</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <main className="create-post-content">
          <IonLoading
            cssClass="my-custom-class"
            isOpen={loading}
            // onDidDismiss={() => {
            //   alert("published");
            // }}
            message={"Publishing..."}
          />

          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <IonItem>
              <IonSelect
                label="Post Category"
                // onIonChange={onInput}
                {...register("category")}
                // placeholder="Post Category"
                labelPlacement="floating"
              >
                <IonSelectOption value="Health">Health</IonSelectOption>
                <IonSelectOption value="Family">Family</IonSelectOption>
                <IonSelectOption value="Career">Career</IonSelectOption>
                <IonSelectOption value="Life">Life</IonSelectOption>
                <IonSelectOption value="Marriage">Marriage</IonSelectOption>
                <IonSelectOption value="Others">Others</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonInput
                // onIonInput={onInput}
                type="text"
                label="Post Title"
                {...register("title")}
                required
                labelPlacement="floating"
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonTextarea
                autoGrow={true}
                // onIonInput={onInput}
                {...register("content")}
                label="Post Content"
                labelPlacement="floating"
                required
              ></IonTextarea>
            </IonItem>

            {/* div to display image selected */}
            {/* {picture  &&  <div style={{height: "250px", width: "100%", margin: "20px 0"}} >
                <IonImg style={{height: "100%"}} src={URL.createObjectURL(file)} />
            </div>}

            {video &&  <div style={{height: "250px", width: "100%", margin: "20px 0"}} >
                <VideoPlayer  link={URL.createObjectURL(file)} height="250px" />
            </div>} */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                margin: "15px 0",
              }}
            >
              <label className="form-label">Select Picture</label>
              <input
                className="pick-img-Btn"
                type="file"
                {...register("picture", {
                  onChange: async (e) => {
                    // setFile(e.target.files[0]);
                    try {
                      const file = e.target.files[0];
                      const image = await resizeFile(file);
                       setFile(image);
                    } catch (err) {
                      console.log(err);
                    }
                    resetField("video");
                  },
                })}
                accept="image/*"
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                margin: "15px 0",
              }}
            >
              <label className="form-label">Select Video</label>
              <input
                type="file"
                {...register("video", {
                  onChange: (e) => {
                    validateSelectedVideoFile(e.target.files[0]);
                    resetField("picture");
                  },
                })}
                accept="video/*"
              ></input>
            </div>

            <IonButton id="publish" type="submit" expand="block">
              {" "}
              {loading ? (
                <IonSpinner name="dots" color="light" />
              ) : (
                "Publish"
              )}{" "}
            </IonButton>
          </form>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default CreatePost;
