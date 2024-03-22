import SvgColor from '../../../components/svg-color';
import { useAuth } from '../../../context/supaContex';

// ----------------------------------------------------------------------
const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig2 = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <img src="https://cdn-icons-png.freepik.com/512/8899/8899687.png" alt="login" width="30px" height="30px" />,
  },
  {
    title: 'Registro de PAC',
    path: '/dashboard/user',
    icon: <img src="https://cdn-icons-png.flaticon.com/256/1425/1425669.png" alt="login" width="30px" height="30px" />,
  },
  {
    title: 'Vista de PAC',
    path: '/dashboard/vista-pac',
    icon: <img src="https://cdn-icons-png.flaticon.com/512/5956/5956592.png" alt="login" width="30px" height="30px" />,
  },
  {
    title: 'Documentación de PAC',
    path: '/dashboard/products',
    icon: <img src="https://cdn-icons-png.flaticon.com/512/3396/3396255.png" alt="login" width="30px" height="30px" />,
  },
  {
    title: 'SERCOP',
    path: '/dashboard/sercop',
    icon: <img src={`/assets/sercop.png`} alt="login" width="30px" height="30px" />,
  },
  {
    title: 'Subsistemas',
    path: '/dashboard/subsistemas',
    icon: <img src="https://cdn-icons-png.flaticon.com/512/3206/3206042.png" alt="login" width="30px" height="30px" />,
  },
  {
    title: 'Cerrar sesión',
    path: '/login',
    icon: <img src="https://cdn-icons-png.flaticon.com/256/4083/4083031.png" alt="login" width="30px" height="30px" />,
  },

];

export default navConfig2;