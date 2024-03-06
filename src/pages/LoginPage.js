import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
import Carrusel from '../sections/auth/login/Carrucel';

import useResponsive from '../hooks/useResponsive';

import Logo from '../components/logo';
import Iconify from '../components/iconify';
import { LoginForm } from '../sections/auth/login';

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column', // Columna en dispositivos pequeños
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row', // Fila en pantallas más grandes (md y superiores)
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  flex: 1, // Toma el 100% del espacio disponible en dispositivos pequeños
  [theme.breakpoints.up('md')]: {
    flex: '60%', // Toma el 70% del espacio disponible en pantallas más grandes (md y superiores)
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  flex: 1, // Toma el 100% del espacio disponible en dispositivos pequeños
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
  [theme.breakpoints.up('md')]: {
    flex: '40%', // Toma el 30% del espacio disponible en pantallas más grandes (md y superiores)
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
  },
}));

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Login | GADM RIOBAMBA </title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection sx={{alignItems:"center", Width:"500px"}}>
          {/*<Carrusel/>*/}
          <img
            className="d-block w-100"
            //src={"https://emiralfg.com/wp-content/uploads/2022/11/emiral-proyectos-ventas-compras.svg"}
            src={"../../assets/portada.png"}
            alt="First slide"
            
          />
          </StyledSection>

        )}


        <StyledContent sx={{alignItems:"center"}}>
          <Typography variant="h4" sx={{fontFamily:" Roman", color: "blue"}}>

          <img src="../../assets/iconoRiobamba.png" alt="login" width="300px" />

          </Typography>
          <Divider sx={{ my: 1 }} />
          <LoginForm />
        </StyledContent>
      </StyledRoot>
    </>
  );
}
