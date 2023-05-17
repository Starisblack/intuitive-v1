import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useHistory } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import "./EditProfile.css";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { FC, useState } from "react";
import { IonContent, IonLoading, IonPage } from "@ionic/react";
import PasswordInput from "../../../components/PasswordInput";
import db from "../../../firebase-config";

type Inputs = {
  fName?: string;
  lName?: string;
  email?: string;
  error?: any;
  bio?: string;
};

type EditProfileProps = {
  handleClose: () => void;
  userDetail?: any;
  id?: any;
  setLoading: any
};
const EditProfile: FC<EditProfileProps> = ({ handleClose, id, userDetail, setLoading }) => {
  const history = useHistory();

  const [error, setError] = useState("");

  const { handleSubmit, register, reset } = useForm<Inputs>();

  const onSubmitHandler: SubmitHandler<Inputs> = async (data) => {
    const { fName, lName, bio } = data;

    setLoading(true);
    const saveHandler = async () => {
      const postDocRef = doc(db, "users", id);

      try {
        await updateDoc(postDocRef, {
          fName,
          lName,
          bio,
        });
        handleClose()
        setLoading(false);
        
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    };

    saveHandler();
  };

  return (
    <>

      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <TextField
          {...register("fName")}
          margin="normal"
          fullWidth
          label="First Name"
          defaultValue={userDetail?.fName}
        />

        <TextField
          {...register("lName")}
          margin="normal"
          fullWidth
          label="Last Name"
          defaultValue={userDetail?.lName}
        />

        <TextField
          {...register("email")}
          type="email"
          margin="normal"
          fullWidth
          disabled
          defaultValue={userDetail?.email}
        />

        <TextField
          id="outlined-multiline-static"
          label="Bio"
          {...register("bio")}
          fullWidth
          multiline
          margin="normal"
          rows={4}
          defaultValue={userDetail?.bio}
        
        />

        <p
          style={{
            color: "red",
            marginTop: "15px",
            textAlign: "center",
          }}
        >
          {error}
        </p>

        <div>
          <Button type="button" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit">Update</Button>
        </div>
      </form>
    </>
  );
};

export default EditProfile;
