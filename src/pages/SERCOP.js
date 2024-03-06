import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box } from '@mui/material';
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

export default function SERCOP() {
  const theme = useTheme();
  //const { user, sercop } = useAuth();
  const [codigo, setCodigo] = useState('ocds-5wno2w-RE-CSCD-GADMR-2023-008-33554');
  const chatUrl = 'https://mediafiles.botpress.cloud/634d2b82-4a73-4676-85d7-764180e85b0f/webchat/bot.html';

  const opcionesCodigos = [
    { texto: 'Contratación de pautas publicitarias en RADIO TRICOLOR 97.7 FM', valor: 'ocds-5wno2w-RE-CSCD-GADMR-2023-008-33554' },
    { texto: 'Contratación de fiscalización de la ejecución de los sistemas de agua potable para la comunidad Shobol', valor: 'ocds-5wno2w-CDC-GADMR-2023-007-33554' },
    { texto: 'Conservación y restauración de la fachade, cúpulas y monumento Virgen Dolorosa - Yaruquies', valor: 'ocds-5wno2w-MCO-GADMR-006-2023-33554' },
    { texto: 'Provisión de productos de confección textil', valor: 'ocds-5wno2w-CE-20230002476364-33554' },
    { texto: 'Neumáticos no catalogados, tubos y defensas para vehículos y maquinaria que prestan servicios al GADM del cantón Riobamba', valor: 'ocds-5wno2w-SIE-GADMR-020-2023-33554' },
    { texto: 'Repuestos para los diferentes sistemas de los recolectores carga lateral DAF que pertenece al GADM del cantón Riobamba', valor: 'ocds-5wno2w-SIE-GADMR-014-2023-33554' },
    { texto: 'Selección de proveedores para la adquisición de calzado de seguridad', valor: 'ocds-5wno2w-CE-20230002403988-33554' },
    { texto: 'Selección de proveedores para la prestación del servicio de vigilancia y seguridad privada fija', valor: 'ocds-5wno2w-CE-20230002483123-33554' },
    { texto: 'Medio de comunicación escrito de cobertura nacional, para publicar el trámite defensorial no. Caso-dpe-0601-060101-202-2023-003021-MVSA', valor: 'ocds-5wno2w-RE-CSCD-GADMR-23-003-33554' },
    { texto: 'Servicio de recolección, transporte diferenciado, tratamiento y disposición final de los desechos sanitarios y farmacéuticos generados dentro del cantón Riobamba', valor: 'ocds-5wno2w-SIE-GADMR-0020-2023-33554' },
    { texto: 'Estudio diagnóstico situacional para la generación de una línea base de personas de los grupos de atención prioritaria en estado de vulnerabilidad', valor: 'ocds-5wno2w-CDC-GADMR-2023-010-33554' },
    { texto: 'Contratación de pautas publicitarias en www.aquichimborazo.compara promocionar y difundir la gestión que realiza el GADM del cantón de Riobamba', valor: 'ocds-5wno2w-RE-CSCD-GADMR-2023-044-33554' },
    { texto: 'Adquisición de equipos tipo kioscos para cobranzas de servicios de la municipalidad', valor: 'ocds-5wno2w-SIE-GADMR-2023-034-33554' },
    { texto: 'Alimentos, productos de aseo, accesorios, medicinas para prevención y tratamiento para canes y equinos del Centro Despertar de los Ángeles', valor: 'ocds-5wno2w-SIE-GADMR-2023-041-33554' },
    { texto: 'Maquinaria y equipos para el faenamiento en el Camal Municipal', valor: 'ocds-5wno2w-SIE-GADMR-2023-047-33554' },
    { texto: 'Adquisición de pintura de alto tráfico, microesferas y thinner para señaletica horizontal del canton Riobamba', valor: 'ocds-5wno2w-SIE-GADMR-2023-055-33554' },
    { texto: 'Adquisición de material de ferretería para mantenimiento de áreas verdes y espacios recreativos del cantón Riobamba', valor: 'ocds-5wno2w-SIE-GADMR-2023-057-33554' },
    { texto: 'Construcción de la plaza de rastro de la parroquia Licto', valor: 'ocds-5wno2w-COTO-GADMR-2023-003-33554' },
    { texto: 'Provisión e Instalación de señalética tipo placas para identificativo de establecimientos turísticos del cantón Riobamba por categoría.', valor: 'ocds-5wno2w-MCB-GADMR-2023-001-33554' },
    { texto: 'Adquisición de cemento para la fabricación de adoquines y varias obras dentro del cantón Riobamba', valor: 'ocds-5wno2w-SIE-GADMR-2023-0053-33554' },
    // Agrega más opciones según sea necesario
  ];

  const handleChangeCodigo = (nuevoCodigo) => {
    setCodigo(nuevoCodigo);
  };

  const sercopEmbebido = `https://datosabiertos.compraspublicas.gob.ec/PLATAFORMA/ocds/${codigo}?etapa=licitacion`;
  //console.log(user)
  //console.log(linkLooker)
  return (
    <>
      <Helmet>
        <title> GADM RIOBAMBA</title>
      </Helmet>

      <div>
        <label htmlFor="codigoSelect">Elemento:  </label>
        <select
          id="codigoSelect"
          value={codigo}
          onChange={(e) => handleChangeCodigo(e.target.value)}
        >
          {opcionesCodigos.map((opcion) => (
            <option key={opcion.valor} value={opcion.valor}>
              {opcion.texto}
            </option>
          ))}
        </select>
      </div>
    
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', overflow: 'hidden', border: '1px solid #000' }}>
        <iframe title="Google Spreadsheet" src={sercopEmbebido} style={{ position: 'absolute', top: '-45%', left: '0', width: '100%', height: '150%', border: 'none' }}></iframe>
      </div>

      <ChatBubble url={chatUrl} />
        
    </>
  );
}
