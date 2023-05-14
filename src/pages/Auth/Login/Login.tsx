import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { Link, Redirect, useHistory } from "react-router-dom";
import "./Login.css";
// import { useEffect, useState } from "react";
// import axios from "axios";
import PasswordInput from "../../../components/PasswordInput";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { FC, useEffect, useState } from "react";
// import { UserAuth } from "../../../context/AuthContext";
import {
  IonContent,
  IonPage,
  IonSpinner,
  useIonViewDidEnter,
} from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { error, isAuth, loginAsync } from "../../../reducers/authReducers";

type Inputs = {
  fName: string;
  lName: string;
  email: string;
  password: string;
  confirmPassword: string;
  error: any;
};

const Login: FC = () => {
  let history = useHistory();
  const auth = useAppSelector(isAuth);
  const dispatch = useAppDispatch();
  const errorRedux = useAppSelector(error);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsvisible] = useState(false);

  console.log(auth)

  const { register, handleSubmit, reset } = useForm<Inputs>();

  useEffect(() => {
    if (auth) {
      history.push("/home");
    } 
  }, [auth]);



  //login in user and validate
  const onSubmitHandler: SubmitHandler<Inputs> = async (userInput) => {
    setLoading(true);
    await dispatch(loginAsync(userInput));
    setLoading(false);
    reset()
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="login-page">
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "rgb(186, 137, 60)" }}>
                <LockOutlinedIcon />
              </Avatar>

              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <TextField
                  {...register("email")}
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                />
                <PasswordInput
                  label="password"
                  register={{ ...register("password") }}
                />
                <Grid item xs={12} md={12}>
                  <Link
                    to="/forgotpassword"
                    className="text-start forgot-password "
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <p style={{ color: "red" }}>{errorRedux}</p>

                <Button
                  className="login-button"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: "rgb(186, 137, 60)" }}
                >
                  {loading ? <IonSpinner color="white"></IonSpinner> : "Login"}
                </Button>
                <Grid container>
                  <Grid item>
                    <p>
                      Don't have an account?{" "}
                      <Link to="/register" className="signup">
                        Sign Up
                      </Link>
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

export default Login;
