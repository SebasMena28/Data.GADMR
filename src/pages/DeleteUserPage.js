import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import NewUserForm from '../sections/newRows/newUser/NewUserForm';
import { useAuth } from '../context/supaContex';


export default function DeleteUserPage({handleCloseDelete,openDeleteUser, id, fetchAgentes}) {
    const {deleteClient} = useAuth();
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (event) => {

        event.preventDefault()

        setLoading(true);
      const res = await deleteClient(id);

      setLoading(false);
      handleCloseDelete();
      if(res === "OK"){
        fetchAgentes()
        enqueueSnackbar('Cliente eliminado!',{ variant: 'success' })
      }else{
        enqueueSnackbar('Algo salio mal..',{ variant: 'error' })
      }
    }
     



  return (
    <div>
<SnackbarProvider />
      <Dialog open={openDeleteUser} onClose={handleCloseDelete} fullWidth sx={{borderRadius:"20px"}} >
        <DialogTitle>Eliminar</DialogTitle>
        
        <DialogContent>

        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '26.5ch' },
      }}
      noValidate
      autoComplete="off"
    >
          <DialogContentText>
            ¿Estas seguro de eliminar este PAC?
          </DialogContentText>

        <DialogActions>
        <LoadingButton
          size="small"
          color="secondary"
          onClick={handleSubmit}
          loading={loading}
          variant="contained"
        >Eliminar</LoadingButton>


        <Button onClick={handleCloseDelete}>Cancelar</Button>


        </DialogActions>


    </Box>


        </DialogContent>

      </Dialog>
    </div>
  );
}