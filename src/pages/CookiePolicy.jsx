import LegalPage from '../components/LegalPage';
import { COOKIE_POLICY_TEXT } from '../data/content';

function CookiePolicy() {
  return <LegalPage title="Cookie Policy (UE)" updated="Ultimo aggiornamento: 26 giugno 2026" text={COOKIE_POLICY_TEXT} />;
}

export default CookiePolicy;
