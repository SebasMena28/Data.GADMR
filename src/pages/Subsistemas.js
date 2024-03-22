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
import ChatBubble from 'src/layouts/chatbot/chatbot';

// ----------------------------------------------------------------------

export default function Subsistemas() {
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
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        paddingBottom: '50%',}}>
      <iframe
        title="SUBSISTEMAS"
        src="https://lookerstudio.google.com/embed/reporting/3cdd4c47-8054-44f1-951f-fe4955f97e8f/page/p_gngp2cicfd "
        style={{ position: 'absolute', left: '0', width: '100%', height: '150%', border: 'none' }}
        allowFullScreen
      />
      
    </Container>
    <ChatBubble url={chatUrl} />
    </>
  );
}
