import LegalPage from '../components/LegalPage';
import { PRIVACY_POLICY_TEXT } from '../data/content';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

function PrivacyPolicy() {
  useDocumentMeta(
    'Privacy Policy | Fermenteria',
    'Informativa sul trattamento dei dati personali di Fermenteria, ristorante inclusivo con birrificio a Bassano del Grappa.'
  );
  return <LegalPage title="Privacy Policy" updated="Ultimo aggiornamento: 26 giugno 2026" text={PRIVACY_POLICY_TEXT} />;
}

export default PrivacyPolicy;
