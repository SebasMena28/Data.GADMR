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

export default function DashboardAppPage() {
  const theme = useTheme();
  const { user, linkLooker } = useAuth();
  const chatUrl = 'https://mediafiles.botpress.cloud/634d2b82-4a73-4676-85d7-764180e85b0f/webchat/bot.html';

  return (
    <>
      <Helmet>
        <title> GADM RIOBAMBA </title>
      </Helmet>

      <Container maxWidth="xl" style={{height: '150%', position: 'relative', width: '100%', paddingTop: '56.25%', overflow: 'hidden'}}>
      <iframe
        title="DASHBOARD"
        src={linkLooker}
        style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '175%', border: 'none' }}
        allowFullScreen
      />
    </Container>
    <ChatBubble url={chatUrl} />

    </>
  );
}
