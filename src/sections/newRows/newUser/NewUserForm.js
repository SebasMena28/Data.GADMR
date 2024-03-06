import * as React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, DialogActions, DialogContent } from '@mui/material';
import { useAuth } from '../../../context/supaContex';

export default function NewUserForm({handleClose}) {

    const {addClient} = useAuth();


    const [client, setClient] = React.useState({
        nombre: '',
        apellido: '',
        cedula:'',
        celular:'',
        observaciones:'',
        como_se_entero:'',
        direccion:'',
        email: '',
      })


      const handleInputChange = (event) => {
        const { id, value } = event.target;
        setClient((prevClient) => ({
          ...prevClient,
          [id]: value,
        }));
      };
    

 
    const handleSubmit = async (event) => {
    event.preventDefault()

      const res = await addClient(client);

        console.log(res)

    }
     
console.log(client)
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >

      <form onSubmit={handleSubmit}>
      <DialogContent>

      <TextField
          autoFocus
          id="nombre"
          label="Nombres"
          color="secondary"
          value={client.nombre}
          onChange={handleInputChange}
        />
        <TextField
          autoFocus
          id="apellido"
          label="Apellidos"
          placeholder="Placeholder"
          value={client.apellido}
          onChange={handleInputChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Correo electrónico"
          type="email"
          fullWidth
          value={client.email}
          onChange={handleInputChange}
        />
        <TextField
            autoFocus
            margin="dense"
            id="cedula"
            label="Número de cedula"
            type="number"
            fullWidth
            value={client.cedula}
            onChange={handleInputChange}
          />
        <TextField
            autoFocus
            margin="dense"
            id="celular"
            label="Número de celular"
            type="number"
            fullWidth
            value={client.celular}
            onChange={handleInputChange}
          />
        <TextField
            autoFocus
            margin="dense"
            id="direccion"
            label="Dirección"
            fullWidth
            value={client.direccion}
            onChange={handleInputChange}
          />
        <TextField
            autoFocus
            margin="dense"
            id="como_se_entero"
            label="Como se entero de nosotros"
            fullWidth
            value={client.como_se_entero}
            onChange={handleInputChange}
          />

        <TextField
          id="observaciones"
          label="observaciones"
          multiline
          rows={4}
          value={client.observaciones}
          onChange={handleInputChange}
          type='text'
          />
                  </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="outlined" color="secondary" type="submit">Guardar</Button>
        </DialogActions>

      </form>
    </Box>
  );
}