import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {  Form} from 'react-bootstrap';

import NewUserForm from '../sections/newRows/newUser/NewUserForm';
import { useAuth } from '../context/supaContex';
import Iconify from '../components/iconify';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
export default function AddProcesoPage({ openNewUser, handleClose, fetchAgentes }) {
  const { addClient } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const {uploadDocument} = useAuth();
    const [client, setClient] = React.useState({
    codigo: '',
    nombreProgramaFinanciero: '',
    partida: '',
    nombrePartida: '',
    codigoOrientadorGasto: '',
    descripcionGasto: '',
    asignacionInicial: '',
    codificado: '',
    reformaPresupuesto: '',
    presupuestoCodificado2023: '',
    traspasos: '',
    presupuestoCodificado: '',
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setClient((prevClient) => ({
      ...prevClient,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const res = await addClient(client);

    setLoading(false);
    handleClose();
    if (res === 'OK') {
      fetchAgentes();
      enqueueSnackbar('Cliente creado!', { variant: 'success' });
    } else {
      enqueueSnackbar('Algo salio mal..', { variant: 'error' });
    }
  };

  return (
    <div>
      <SnackbarProvider />
      <Dialog open={openNewUser} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Documentar PAC</DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
              <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 3, sm: 8, md: 8 }}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="codigo"
                    label="Codigo"
                    color="secondary"
                    value={client.codigo}
                    onChange={handleInputChange}
                    type="text"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="nombreProgramaFinanciero"
                    label="Nombre del programa financiero / proyecto POA"
                    placeholder="Placeholder"
                    onChange={handleInputChange}
                    type="text"
                    value={client.nombreProgramaFinanciero}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    margin="dense"
                    id="descripcionGasto"
                    label="Descripción del gasto"
                    fullWidth
                    value={client.descripcionGasto}
                    onChange={handleInputChange}
                  />
                </Grid> 
                <Grid item xs={5}>
                <Form.Group className="mb-3" style={{maxWidth: "500px"}}>
            <Form.Control type="file" accept="content/pdf" />
          </Form.Group>
                </Grid>


              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <LoadingButton size="small" color="secondary" onClick={handleSubmit} loading={loading} variant="contained">
              Guardar
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
