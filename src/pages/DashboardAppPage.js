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

      <Container maxWidth="xl" style={{width: '90%', overflow: 'hidden', marginLeft: '-30px', marginRight: '-50px'}}>
      <iframe
        title="DASHBOARD"
        src={linkLooker}
        style={{ position: 'fixed', border: 0, width: '80%', flex: 1, height: '100%' }}
        allowFullScreen
      />
      <ChatBubble url={chatUrl} />
    </Container>

    </>
  );
}
