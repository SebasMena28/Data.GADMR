import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import AuthProvider from './context/supaContex';
import {AuthRoute} from "./components/protectRoute/AuthRoute";
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import UserPage from './pages/UserPage';
import DashboardAppPage from './pages/DashboardAppPage';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
                   
         <Router/>
        </ThemeProvider>
      </BrowserRouter>
      </AuthProvider>
     
    </HelmetProvider>
  );
}
