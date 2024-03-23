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
import Apu from './chatbotApu';

// ----------------------------------------------------------------------

export default function VistaPAC() {
  const theme = useTheme();
  const { user, linkPAC } = useAuth();
  const chatUrl = 'https://mediafiles.botpress.cloud/634d2b82-4a73-4676-85d7-764180e85b0f/webchat/bot.html';

  return (
    <>
      <Helmet>
        <title> GADM RIOBAMBA </title>
      </Helmet>

      <Container maxWidth="xl" 
      style={{height: '100%', // Cambiado a 100%
        marginTop: '-2%', // Eliminado el margen superior negativo
        position: 'relative',
        width: '100%',
        overflow: 'auto',
        paddingBottom: '50%',}}>
      <iframe
        title="DASHBOARD"
        src="https://docs.google.com/spreadsheets/d/1tJe-1HmJx2LRGx1BKp6PKlqQ72d0uEH9eDWlGpnKH_I/edit?usp=drive_link"
        style={{ position: 'absolute', top: '-22%', left: '0', width: '100%', height: '115%', border: 'none' }}
        allowFullScreen
      />
      
    </Container>
    <Apu url={chatUrl} />
    </>
  );
}
