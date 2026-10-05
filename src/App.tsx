import { LandingPage } from './pages/LandingPage';
import { PrivacyNoticePage } from './pages/PrivacyNoticePage';

export default function App() {
  if (window.location.pathname.replace(/\/$/, '') === `${import.meta.env.BASE_URL}aviso-de-privacidad`) {
    return <PrivacyNoticePage />;
  }
  return <LandingPage />;
}
