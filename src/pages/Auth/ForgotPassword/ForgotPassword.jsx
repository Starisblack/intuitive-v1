import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { UserAuth } from "../../../context/AuthContext";

const ForgotPassword = () => {
  const navigate = useNavigate();

  //reset password func
  console.log(UserAuth());
  const { resetPassword } = UserAuth();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setSuccess("Reset email sent!");
    } catch (error) {
      setError(error);
    }
  };

  return (
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <BeatLoader color="white" /> : "Reset Password"}
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default ForgotPassword;
