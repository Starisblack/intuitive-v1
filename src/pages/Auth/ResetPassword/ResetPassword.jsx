import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import PasswordInput from "../../../components/PasswordInput";
import "./ResetPassword.css";
import { useForm } from "react-hook-form";
import BeatLoader from "react-spinners/BeatLoader";
import { UserAuth } from "../../../context/AuthContext";

const ResetPassword = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sumbitHandler = async (userInput) => {};

  return (
    <div className="reset-page" style={{ marginTop: "64px" }}>
      <Container component="main" maxWidth="xs">
        <form onSubmit={handleSubmit(sumbitHandler)}>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>

          <p
            style={{
              color: "red",
              textAlign: "center",
              padding: ".7rem 1.2rem",
            }}
          >
            {error && error}
          </p>
          {success && (
            <p
              style={{
                color: "white",
                background: "green",
                textAlign: "center",
                padding: ".7rem 1.2rem",
              }}
            >
              {success}{" "}
              <Link
                to="/login"
                style={{
                  color: "white",
                  marginLeft: "5px",
                  fontWeight: "700",
                  textDecoration: "underline",
                }}
              >
                {" "}
                Login
              </Link>
            </p>
          )}

          <PasswordInput register={{ ...register("password") }} />
          <PasswordInput register={{ ...register("confirmPassword") }} />

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

export default ResetPassword;
