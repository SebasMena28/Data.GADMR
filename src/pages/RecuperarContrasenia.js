import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../context/supaContex';
//import { supabase } from './supabase'; // Asegúrate de importar tu instancia de Supabase

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { reset } = useAuth();

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      setError(null);
      await reset(email);
      setSuccess(true);
    } catch (error) {
      console.error('Error resetting password:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
      {error && <Typography variant="body2" color="error" gutterBottom>Error: {error}</Typography>}
      {success && <Typography variant="body2" gutterBottom>Se ha enviado un correo electrónico para restablecer tu contraseña.</Typography>}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleResetPassword}
        disabled={loading || !email}
        style={{ marginTop: 16 }}
      >
        {loading ? 'Cargando...' : 'Enviar correo de recuperación'}
      </Button>
    </div>
  );
}

export default ResetPassword;