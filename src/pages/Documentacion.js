import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { useAuth } from '../context/supaContex';

// ----------------------------------------------------------------------

export default function Documentacion() {
  const theme = useTheme();
  const { user, linkDoc } = useAuth();
  //console.log(user)
  //console.log(linkLooker)
  return (
    <>
      <Helmet>
        <title> GADM RIOBAMBA </title>
      </Helmet>

      <Container maxWidth="xl" 
      style={{ height: '200%', // Cambiado a 100%
        marginTop: '-2%', // Eliminado el margen superior negativo
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        paddingBottom: '50%',}}>
  <iframe
    title="Gestión Documental"
    src={linkDoc}
    style={{ position: 'absolute', left: '0', width: '100%', height: '200%', border: 'none'}}
    allowFullScreen
    
/>
</Container>



    </>
  );
}
