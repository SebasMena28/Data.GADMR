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

export default function Mapa() {
  const theme = useTheme();
  const { user, mapa } = useAuth();
  //console.log(user)
  //console.log(linkLooker)
  return (
    <>
      <Helmet>
        <title> GADM RIOBAMBA</title>
      </Helmet>

      <Container maxWidth="xl" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
  <iframe
    title="Mapa"
    src={mapa}
    style={{ border: 0, width: '100%', flex: 1,}}
    allowFullScreen
    
/>
</Container>



    </>
  );
}
