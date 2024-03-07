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
  /*{
    title: 'Documentación',
    path: '/dashboard/products',
    icon: icon('docs'),
  },*/
  {
    title: 'SERCOP',
    path: '/dashboard/sercop',
    icon: <img src={`/assets/sercop.png`} alt="login" width="30px" height="30px" />,
  },
  {
    title: 'Cerrar sesión',
    path: '/login',
    icon: <img src="https://cdn-icons-png.flaticon.com/256/4083/4083031.png" alt="login" width="30px" height="30px" />,
  },

];

export default navConfig2;