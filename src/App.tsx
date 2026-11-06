import { LandingPage } from './pages/LandingPage';
import { PrivacyNoticePage } from './pages/PrivacyNoticePage';
import { SharedValuationPage } from './pages/SharedValuationPage';
import { decodeShareLink } from '@shared/shareLink';

export default function App() {
  if (window.location.pathname === '/aviso-de-privacidad') {
    return <PrivacyNoticePage />;
  }
  const shared = decodeShareLink(window.location.pathname.slice(1));
  if (shared) return <SharedValuationPage data={shared} />;
  return <LandingPage />;
}
