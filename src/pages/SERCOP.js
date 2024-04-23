import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import Select from 'react-select';
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
import Apu from './chatbotApu';
//import Select from 'react-select';

// ----------------------------------------------------------------------

export default function SERCOP() {
  const theme = useTheme();
  //const { user, sercop } = useAuth();
  const [codigo, setCodigo] = useState('ocds-5wno2w-RE-CSCD-GADMR-2023-008-33554');
  const chatUrl = 'https://mediafiles.botpress.cloud/634d2b82-4a73-4676-85d7-764180e85b0f/webchat/bot.html';

  const opcionesCodigos = [
    { label: 'Contratación de pautas publicitarias en RADIO TRICOLOR 97.7 FM', value: 'ocds-5wno2w-RE-CSCD-GADMR-2023-008-33554' },
    { label: 'Contratación de fiscalización de la ejecución de los sistemas de agua potable para la comunidad Shobol', value: 'ocds-5wno2w-CDC-GADMR-2023-007-33554' },
    { label: 'Conservación y restauración de la fachade, cúpulas y monumento Virgen Dolorosa - Yaruquies', value: 'ocds-5wno2w-MCO-GADMR-006-2023-33554' },
    { label: 'Provisión de productos de confección textil', value: 'ocds-5wno2w-CE-20230002476364-33554' },
    { label: 'Neumáticos no catalogados, tubos y defensas para vehículos y maquinaria que prestan servicios al GADM del cantón Riobamba', value: 'ocds-5wno2w-SIE-GADMR-020-2023-33554' },
    { label: 'Repuestos para los diferentes sistemas de los recolectores carga lateral DAF que pertenece al GADM del cantón Riobamba', value: 'ocds-5wno2w-SIE-GADMR-014-2023-33554' },
    { label: 'Selección de proveedores para la adquisición de calzado de seguridad', value: 'ocds-5wno2w-CE-20230002403988-33554' },
    { label: 'Selección de proveedores para la prestación del servicio de vigilancia y seguridad privada fija', value: 'ocds-5wno2w-CE-20230002483123-33554' },
    { label: 'Medio de comunicación escrito de cobertura nacional, para publicar el trámite defensorial no. Caso-dpe-0601-060101-202-2023-003021-MVSA', value: 'ocds-5wno2w-RE-CSCD-GADMR-23-003-33554' },
    { label: 'Servicio de recolección, transporte diferenciado, tratamiento y disposición final de los desechos sanitarios y farmacéuticos generados dentro del cantón Riobamba', value: 'ocds-5wno2w-SIE-GADMR-0020-2023-33554' },
    { label: 'Estudio diagnóstico situacional para la generación de una línea base de personas de los grupos de atención prioritaria en estado de vulnerabilidad', value: 'ocds-5wno2w-CDC-GADMR-2023-010-33554' },
    { label: 'Contratación de pautas publicitarias en www.aquichimborazo.compara promocionar y difundir la gestión que realiza el GADM del cantón de Riobamba', value: 'ocds-5wno2w-RE-CSCD-GADMR-2023-044-33554' },
    { label: 'Adquisición de equipos tipo kioscos para cobranzas de servicios de la municipalidad', value: 'ocds-5wno2w-SIE-GADMR-2023-034-33554' },
    { label: 'Alimentos, productos de aseo, accesorios, medicinas para prevención y tratamiento para canes y equinos del Centro Despertar de los Ángeles', value: 'ocds-5wno2w-SIE-GADMR-2023-041-33554' },
    { label: 'Maquinaria y equipos para el faenamiento en el Camal Municipal', value: 'ocds-5wno2w-SIE-GADMR-2023-047-33554' },
    { label: 'Adquisición de pintura de alto tráfico, microesferas y thinner para señaletica horizontal del canton Riobamba', value: 'ocds-5wno2w-SIE-GADMR-2023-055-33554' },
    { label: 'Adquisición de material de ferretería para mantenimiento de áreas verdes y espacios recreativos del cantón Riobamba', value: 'ocds-5wno2w-SIE-GADMR-2023-057-33554' },
    { label: 'Construcción de la plaza de rastro de la parroquia Licto', value: 'ocds-5wno2w-COTO-GADMR-2023-003-33554' },
    { label: 'Provisión e Instalación de señalética tipo placas para identificativo de establecimientos turísticos del cantón Riobamba por categoría.', value: 'ocds-5wno2w-MCB-GADMR-2023-001-33554' },
    { label: 'Adquisición de cemento para la fabricación de adoquines y varias obras dentro del cantón Riobamba', value: 'ocds-5wno2w-SIE-GADMR-2023-0053-33554' },
  ];

  const handleChangeCodigo = (nuevoCodigo) => {
    setCodigo(nuevoCodigo);
  };

  const [fechaActual, setFechaActual] = useState('');

  useEffect(() => {
    // Fecha actual en formato 'DD/MM/AAAA'
    const obtenerFechaActual = () => {
      const hoy = new Date();
      const dia = hoy.getDate();
      const mes = hoy.getMonth() + 1; 
      const año = hoy.getFullYear();

      return `${dia}/${mes}/${año}`;
    };

    // Actualizo el estado con la fecha actual
    setFechaActual(obtenerFechaActual());
  }, []);


  const sercopEmbebido = `https://datosabiertos.compraspublicas.gob.ec/PLATAFORMA/ocds/${codigo}?etapa=licitacion`;

  return (
    <>
      <Helmet>
        <title> GADM RIOBAMBA</title>
      </Helmet>

      <div style={{marginBottom: '10px', marginTop: '-7%'}}>

        <label style={{ display: 'block', marginBottom: '10px' }}>
          Fecha de actualización: {fechaActual}
        </label>
        <label htmlFor="codigoSelect">Elemento:  </label>

        <Select 
        options={opcionesCodigos} 
        placeholder="Elija un elemento de la lista" 
        value={opcionesCodigos.find(opcion => opcion.value === codigo)}
        onChange={(selectedOption) => handleChangeCodigo(selectedOption.value)}

        />

      </div>

      <div style={{ height: '100%', // Cambiado a 100%
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        paddingBottom: '50%', }}>
        <iframe title="Google Spreadsheet" src={sercopEmbebido} style={{ position: 'absolute', top: '-20%', left: '0', width: '100%', height: '248%', border: 'none' }}></iframe>
      </div>

      <Apu url={chatUrl} />
        
    </>
  );
}
