import { LandingPage } from './pages/LandingPage';
import { PrivacyNoticePage } from './pages/PrivacyNoticePage';

export default function App() {
  if (window.location.pathname === '/aviso-de-privacidad') {
    return <PrivacyNoticePage />;
  }
  return <LandingPage />;
}
