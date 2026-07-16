import LegalPage from '../components/LegalPage';
import { PRIVACY_POLICY_TEXT } from '../data/content';

function PrivacyPolicy() {
  return <LegalPage title="Privacy Policy" updated="Ultimo aggiornamento: 26 giugno 2026" text={PRIVACY_POLICY_TEXT} />;
}

export default PrivacyPolicy;
