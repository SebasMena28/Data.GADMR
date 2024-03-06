import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import PAC from './pages/PAC';
import Documentacion from './pages/Documentacion';
import Mapa from './pages/Mapa';
import SERCOP from './pages/SERCOP';
import Chatbot from './pages/Chatbot';
import {AuthRoute} from './components/protectRoute/AuthRoute';
import RegisterPage from './pages/RegisterPage';
import NewUserPage from './pages/NewUserPage';
import DocsPage from './pages/DocsPage';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <AuthRoute  ><DashboardAppPage /></AuthRoute>},
        { path: 'user',  element: <AuthRoute  ><PAC /></AuthRoute>},

        { path: 'products',element: <AuthRoute  ><Documentacion/> </AuthRoute>},
        { path: 'mapa',element: <AuthRoute  ><Mapa/> </AuthRoute>},
        { path: 'sercop',element: <AuthRoute  ><SERCOP/> </AuthRoute>},
        { path: 'blog', element: <AuthRoute  ><BlogPage /> </AuthRoute>},
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}