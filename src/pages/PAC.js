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

export default function PAC() {
  const theme = useTheme();
  const { user, linkPAC } = useAuth();
  const chatUrl = 'https://mediafiles.botpress.cloud/634d2b82-4a73-4676-85d7-764180e85b0f/webchat/bot.html';

  return (
    <>
      <Helmet>
        <title> GADM RIOBAMBA </title>
      </Helmet>

      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', overflow: 'hidden', border: '1px solid #000' }}>
        <iframe title="Google Spreadsheet" src="https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252" style={{ position: 'absolute', top: '-21%', left: '0', width: '100%', height: '150%', border: 'none' }}></iframe>
      </div>

      <ChatBubble url={chatUrl} />
    </>
  );
}
