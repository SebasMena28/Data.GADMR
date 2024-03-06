import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { Box, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../context/supaContex';

export default function EditUserPage({
  openEditUser,
  handleCloseEdit,
  selectClient,
  setSelectedRowData,
  fetchAgentes,
}) {
  const { updateClient } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const {
    codigo,
    nombreProgramaFinanciero,
    partida,
    nombrePartida,
    codigoOrientadorGasto,
    descripcionGasto,
    asignacionInicial,
    codificado,
    reformaPresupuesto,
    presupuestoCodificado2023,
    traspasos,
    presupuestoCodificado,
    id,
  } = selectClient;

  const [client, setClient] = React.useState({
    nombre: '',
    apellido: '',
    cedula: '',
    celular: '',
    observaciones: '',
    comoSeEntero: '',
    direccion: '',
    email: '',
    id,
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setSelectedRowData((prevSelectClient) => ({
      ...prevSelectClient,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    const res = await updateClient(selectClient);

    if (res === 'OK') {
      setLoading(false);
      handleCloseEdit();
      fetchAgentes();
      enqueueSnackbar('Cliente actualizado!', { variant: 'success' });
    } else {
      enqueueSnackbar('Algo salio mal..', { variant: 'error' });
    }
  };

  return (
    <div>
      <SnackbarProvider />
      <Dialog open={openEditUser} onClose={handleCloseEdit} maxWidth="md" fullWidth>
        <DialogTitle>Editar PAC</DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box component="form" sx={{ flexGrow: 1,  }} noValidate autoComplete="off">
              <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 3, sm: 8, md: 8 }}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="codigo"
                    label="Codigo"
                    color="secondary"
                    value={selectClient.codigo}
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
                    defaultValue={selectClient.nombreProgramaFinanciero}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    margin="dense"
                    id="partida"
                    label="Partida"
                    type="email"
                    fullWidth
                    onChange={handleInputChange}
                    defaultValue={selectClient.partida}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    margin="dense"
                    id="nombrePartida"
                    label="Nombre de la partida"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                    defaultValue={selectClient.nombrePartida}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    margin="dense"
                    id="codigoOrientadorGasto"
                    label="Código orientador del gasto"
                    type="number"
                    fullWidth
                    defaultValue={selectClient.codigoOrientadorGasto}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    margin="dense"
                    id="descripcionGasto"
                    label="Descripción del gasto"
                    fullWidth
                    defaultValue={selectClient.descripcionGasto}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    margin="dense"
                    id="asignacionInicial"
                    label="Asignación inicial"
                    type="number"
                    fullWidth
                    defaultValue={selectClient.asignacionInicial}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    margin="dense"
                    id="codificado"
                    label="Codificado"
                    type="number"
                    fullWidth
                    defaultValue={selectClient.codificado}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    margin="dense"
                    id="reformaPresupuesto"
                    label="Reforma presupuesto"
                    type="number"
                    fullWidth
                    defaultValue={selectClient.reformaPresupuesto}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    margin="dense"
                    id="presupuestoCodificado2023"
                    label="Presupuesto codificado con aprobación POA 2023"
                    type="number"
                    fullWidth
                    defaultValue={selectClient.presupuestoCodificado2023}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    margin="dense"
                    id="traspasos"
                    label="Traspasos"
                    type="number"
                    fullWidth
                    defaultValue={selectClient.traspasos}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    margin="dense"
                    id="presupuestoCodificado"
                    label="Presupuesto codificado"
                    type="number"
                    fullWidth
                    defaultValue={selectClient.presupuestoCodificado}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit}>Cancelar</Button>
            <LoadingButton size="small" color="secondary" onClick={handleSubmit} loading={loading} variant="contained">
              <span>Guardar</span>
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
