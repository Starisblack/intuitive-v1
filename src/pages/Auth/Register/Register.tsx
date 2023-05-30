import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useHistory } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import "./Register.css";
import { doc, setDoc } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { IonContent, IonPage, IonSpinner } from "@ionic/react";
import PasswordInput from "../../../components/PasswordInput";
import db from "../../../firebase-config";
import Spinner from "../../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  clearError,
  error,
  isAuth,
  loadingStatus,
  setError,
  signUpAsync,
} from "../../../reducers/authReducers";

type Inputs = {
  fName: string;
  lName: string;
  email: string;
  uid: string;
  password: string;
  confirmPassword: string;
  error: any;
};

const Register: FC = () => {
  const history = useHistory();

  const Auth = useAppSelector(isAuth);
  const err = useAppSelector(error);
  const loading = useAppSelector(loadingStatus)

  const dispatch = useAppDispatch();

  const { handleSubmit, register, reset } = useForm<Inputs>();

  useEffect(() => {
    if (Auth) {
      history.push("/home");
    } else {
      setTimeout(() => {
        dispatch(clearError());
      }, 4000);
    }
  }, [Auth, history]);

  const onSubmitHandler: SubmitHandler<Inputs> = async (userInput) => {

    const { password, confirmPassword } = userInput;

    if (password !== confirmPassword) {
      dispatch(setError("Password do not match!"));
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    } else {
      dispatch(signUpAsync(userInput));
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="signUp-page">
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "rgb(186, 137, 60)" }}></Avatar>
              <Typography component="h1" variant="h5">
                Create an account
              </Typography>

              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <TextField
                  {...register("fName")}
                  margin="normal"
                  required
                  fullWidth
                  label="First Name"
                />

                <TextField
                  {...register("lName")}
                  margin="normal"
                  required
                  fullWidth
                  label="Last Name"
                />

                <TextField
                  {...register("email")}
                  type="email"
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  autoComplete="email"
                />

                <PasswordInput
                  label="Password"
                  register={{ ...register("password") }}
                />
                <PasswordInput
                  label="Confirm Password"
                  register={{ ...register("confirmPassword") }}
                />

                <p
                  style={{
                    color: "red",
                    marginTop: "15px",
                    textAlign: "center",
                  }}
                >
                  {err}
                </p>

                <Button
                  disabled={loading}
                  className="signup-button"
                  type="submit"
                  color="success"
                  fullWidth
                  variant="contained"
                  sx={{
                    my: 2,
                    bgcolor: "rgb(186, 137, 60)",
                    textTransform: "none",
                  }}
                >
                  {loading ?   <IonSpinner name="lines"></IonSpinner> : "Register"}
                </Button>
                <Grid container>
                  <Grid item>
                    <p>
                      Already have an account? <Link to="/login">Sign In</Link>
                    </p>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Container>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
