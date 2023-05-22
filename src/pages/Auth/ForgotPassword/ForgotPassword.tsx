import { SetStateAction, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import "./ForgotPassword.css";
import { IonContent, IonPage, IonSpinner } from "@ionic/react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase-config";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onChangeHandler = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
  };

  const submitHandler = async (e: { preventDefault: () => void }) => {
    setLoading(true);
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Reset Email Sent! Check your inbox");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error: any) {
      setError(error);

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="forgot-page" style={{ marginTop: "64px" }}>
          <Container component="main" maxWidth="xs">
            <form onSubmit={submitHandler}>
              <p style={{ color: "red", padding: "1rem 2rem" }}>{error}</p>
              {success && (
                <p
                  style={{
                    color: "white",
                    background: "green",
                    padding: "1rem 2rem",
                  }}
                >
                  {success}
                </p>
              )}
              <Typography component="h1" variant="h5">
                Forgot Password?
              </Typography>
              <p className="mb-2 text-muted">
                Enter your registered email ID to reset the password
              </p>
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={onChangeHandler}
                label="Email Address"
                name="email"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2, bgcolor: "rgb(186, 137, 60)" }}
              >
                {loading ? (
                  <IonSpinner name="lines"></IonSpinner>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </Container>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
