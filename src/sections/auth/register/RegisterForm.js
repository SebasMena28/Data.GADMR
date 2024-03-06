import { useRef, useState } from "react";
import { Link } from 'react-router-dom';

import { Card, CardContent, Typography, TextField, Button, Alert } from '@mui/material';
import { supabase } from "../../../utility/SupabaseClient";

const Register = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const register = (email, password) =>
    supabase.auth.signUp({ email, password });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !passwordRef.current?.value ||
      !emailRef.current?.value ||
      !confirmPasswordRef.current?.value
    ) {
      setErrorMsg("Please fill all the fields");
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrorMsg("Passwords doesn't match");
      return;
    }
    try {
      setErrorMsg("");
      setLoading(true);
      const { data, error } = await register(
        emailRef.current.value,
        passwordRef.current.value
      );
      if (!error && data) {
        setMsg(
          "Registration Successful. Check your email to confirm your account"
        );
      }
    } catch (error) {
      setErrorMsg("Error in Creating Account");
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h2" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            inputRef={emailRef}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            inputRef={passwordRef}
            required
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            inputRef={confirmPasswordRef}
            required
          />
          {errorMsg && (
            <Alert severity="error" onClose={() => setErrorMsg('')}>
              {errorMsg}
            </Alert>
          )}
          {msg && (
            <Alert severity="success" onClose={() => setMsg('')}>
              {msg}
            </Alert>
          )}
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Button
              disabled={loading}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Register
            </Button>
          </div>
        </form>
      </CardContent>
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        Already a User? <Link component={Link} to="/login">Login</Link>
      </div>
    </Card>
  );
}

export default Register;