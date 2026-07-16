import LegalPage from '../components/LegalPage';
import { COOKIE_POLICY_TEXT } from '../data/content';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

function CookiePolicy() {
  useDocumentMeta(
    'Cookie Policy | Fermenteria',
    'Informativa sui cookie del sito Fermenteria, ristorante inclusivo con birrificio a Bassano del Grappa.'
  );
  return <LegalPage title="Cookie Policy (UE)" updated="Ultimo aggiornamento: 26 giugno 2026" text={COOKIE_POLICY_TEXT} />;
}

export default CookiePolicy;
