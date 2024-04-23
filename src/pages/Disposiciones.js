import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container } from '@mui/material';

import { useAuth } from '../context/supaContex';
import Apu from './chatbotApu';

// ----------------------------------------------------------------------

export default function Disposiciones() {
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
        src="https://app.appsmith.com/app/untitled-application-1/page1-6627ccb48b14287e2718d1b3?branch=pruebas"
        style={{ position: 'absolute', top: '-7%', left: '0', width: '100%', height: '100%', border: 'none' }}
        allowFullScreen
      />
      
    </Container>
    <Apu url={chatUrl} />
    </>
  );
}
