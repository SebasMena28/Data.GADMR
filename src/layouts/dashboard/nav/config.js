// component
import SvgColor from '../../../components/svg-color';
import { useAuth } from '../../../context/supaContex';

// ----------------------------------------------------------------------
const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <img src="https://cdn-icons-png.freepik.com/512/8899/8899687.png" alt="login" width="30px" height="30px" />,
  },
  {
    title: 'Registro de PAC',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },  
  /*{
    title: 'Documentación de PAC',
    path: '/dashboard/products',
    icon: icon('docs'),
  },
  {
    title: 'Mapa',
    path: '/dashboard/mapa',
    icon: <img src="https://cdn-icons-png.flaticon.com/512/854/854980.png" alt="login" width="30px" height="30px" />,
  },*/
  {
    title: 'SERCOP',
    path: '/dashboard/sercop',
    icon: <img src="https://c8.alamy.com/compes/2d7n6b3/icono-de-solicitud-de-documento-esquema-documento-solicitud-vector-icono-para-diseno-web-aislado-sobre-fondo-blanco-2d7n6b3.jpg" alt="login" width="30px" height="30px" />,
  },
  {
    title: 'Cerrar sesión',
    path: '/login',
    icon: icon('logout'),
  },

];

export default navConfig;
