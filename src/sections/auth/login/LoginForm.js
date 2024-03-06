import { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { useAuth } from '../../../context/supaContex';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [mostrar, setMostrar] = useState();

  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMostrar('');
      setErrorMsg('');
      setLoading(true);
      console.log(email);
      if (!email || !password) {
        setErrorMsg('Please fill in the fields');
        setMostrar('true');
        return;
      }
      const {
        data: { user, session },
        error,
      } = await login(email, password);

      if (error) setErrorMsg(error.message);
      if (user && session) navigate('/dashboard/app');
    } catch (error) {
      setErrorMsg('Email or Password Incorrect');
      setMostrar('true');
    }
    setLoading(false);
    setMostrar('true');
  };

  return (
    <>
      <Stack
        spacing={3}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '35ch' },
        }}
      >
        <Stack visibility={mostrar == 'true' ? 'visible' : 'hidden'}>
          <p style={{ color: 'red' }}> Datos ingresados incorrectos. Intente de nuevo</p>
        </Stack>

        <TextField name="email" label="Correo electrónico" onChange={(e) => setEmail(e.target.value)} required />

        <TextField
          name="password"
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover">
          ¿Olvidaste tu contraseña?
        </Link>
      </Stack>

      <LoadingButton size="large" type="submit" variant="contained" onClick={handleSubmit}>
        Iniciar sesión
      </LoadingButton>
    </>
  );
}
