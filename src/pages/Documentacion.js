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

export default function Documentacion() {
  const theme = useTheme();
  const { user, linkDoc } = useAuth();
  const chatUrl = 'https://mediafiles.botpress.cloud/634d2b82-4a73-4676-85d7-764180e85b0f/webchat/bot.html';

  return (
    <>
      <Helmet>
        <title> GADM RIOBAMBA </title>
      </Helmet>

      <Container
        maxWidth="xl"
        style={{
          height: '250%', // Cambiado a 100%
          marginTop: '-2%', // Eliminado el margen superior negativo
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          paddingBottom: '50%',
        }}
      >
        <iframe
          title="Gestión Documental"
          src={linkDoc}
          style={{ position: 'absolute', left: '0', width: '100%', height: '250%', border: 'none' }}
          allowFullScreen
        />
      </Container>
      <Apu url={chatUrl} />
    </>
  );
}
