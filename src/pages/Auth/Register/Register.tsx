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
import { FC, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import PasswordInput from "../../../components/PasswordInput";
import { UserAuth } from "../../../context/AuthContext";
import db from "../../../firebase-config";
import Spinner from "../../../components/UI/Spinner/Spinner";

type Inputs = {
  fName: string;
  lName: string;
  email: string;
  password: string;
  confirmPassword: string;
  error: any;
};

const Register: FC = () => {
  const history = useHistory();

  const { createUser, setIsAuth } = UserAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { handleSubmit, register, reset } = useForm<Inputs>();

  const onSubmitHandler: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const { fName, lName, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setError("Password do not match!");
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      try {
        const addUserData = async () => {
          const { user } = await createUser(email, password);
          const userId = user.uid;

          setDoc(doc(db, "users", userId), {
            fName,
            lName,
            isTarot: false,
            email: user.email,
          });

          reset();
          setLoading(false);
        };

        await addUserData();
        setIsAuth(true);
        history.push("/home");
      } catch (error: any) {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setError("There is an account with this email, please Sign In");
          setLoading(false);
        }
        setTimeout(() => {
          setError("");
        }, 3000);
      }
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
                  {error}
                </p>

                <Button
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
                  {loading ? <Spinner /> : "Register"}
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
