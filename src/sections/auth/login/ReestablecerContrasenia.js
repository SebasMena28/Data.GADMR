import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from 'src/context/supaContex';
//import { supabase } from './supabase'; // Asegúrate de importar tu instancia de Supabase

function ModificarContrasenia() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showReturnButton, setShowReturnButton] = useState(false);
  const { cambiar } = useAuth();

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      setError(null);
      await cambiar(password);
      setSuccess(true);
      setShowReturnButton(true); // Mostrar el botón "Volver al Login" después de enviar el correo de recuperación
    } catch (error) {
      console.error('Error resetting password:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangesMade = () => {
    setShowReturnButton(true); // Mostrar el botón "Volver al Login" después de realizar cambios
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>Recuperar Contraseña</Typography>
      <TextField
        fullWidth
        id="email"
        label="Correo Electrónico"
        variant="outlined"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        id="password"
        label="Contraseña"
        type="password"
        variant="outlined"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <Typography variant="body2" color="error" gutterBottom>Error: {error}</Typography>}
      {success && <Typography variant="body2" gutterBottom>Contraseña actualizada!.</Typography>}
      {showReturnButton && <Button
        fullWidth
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/login"
        style={{ marginTop: 16 }}
      >
        Volver a Login
      </Button>}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => {
            handleResetPassword();
            handleChangesMade();
          }}
        disabled={loading || !email}
        style={{ marginTop: 16 }}
      >
        {loading ? 'Cargando...' : 'Recuperar contraseña'}
      </Button>
    </div>
  );
}

export default ModificarContrasenia;

