import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CookieConsent.css';

const STORAGE_KEY = 'fermenteria-cookie-consent';

const DEFAULT_PREFS = {
  funzionale: true,
  statistiche: false,
  marketing: false,
};

function readStoredConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);

  useEffect(() => {
    const stored = readStoredConsent();
    if (!stored) setVisible(true);
    else setPrefs(stored);
  }, []);

  const save = (next) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setPrefs(next);
    setVisible(false);
    setShowPrefs(false);
  };

  const acceptAll = () => save({ funzionale: true, statistiche: true, marketing: true });
  const rejectAll = () => save({ funzionale: true, statistiche: false, marketing: false });
  const savePrefs = () => save(prefs);

  if (!visible) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-modal="true" aria-label="Gestione consenso cookie">
      <div className="cookie-consent__panel">
        {!showPrefs ? (
          <>
            <p>
              Utilizziamo cookie tecnici necessari al funzionamento del sito e, previo tuo consenso, cookie statistici e
              di marketing. Consulta la{' '}
              <Link to="/cookie-policy-ue" onClick={() => setVisible(false)}>
                Cookie Policy
              </Link>{' '}
              e la{' '}
              <Link to="/privacy-policy" onClick={() => setVisible(false)}>
                Privacy Policy
              </Link>
              .
            </p>
            <div className="cookie-consent__actions">
              <button type="button" className="cookie-btn cookie-btn--ghost" onClick={() => setShowPrefs(true)}>
                Personalizza
              </button>
              <button type="button" className="cookie-btn cookie-btn--outline" onClick={rejectAll}>
                Rifiuta
              </button>
              <button type="button" className="cookie-btn cookie-btn--solid" onClick={acceptAll}>
                Accetta tutti
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>Preferenze cookie</h2>
            <ul className="cookie-consent__prefs">
              <li>
                <label>
                  <input type="checkbox" checked readOnly />
                  <span>
                    <strong>Funzionali</strong> — sempre attivi, necessari al funzionamento del sito.
                  </span>
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    checked={prefs.statistiche}
                    onChange={(e) => setPrefs((p) => ({ ...p, statistiche: e.target.checked }))}
                  />
                  <span>
                    <strong>Statistiche</strong> — ci aiutano a capire come viene usato il sito.
                  </span>
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    checked={prefs.marketing}
                    onChange={(e) => setPrefs((p) => ({ ...p, marketing: e.target.checked }))}
                  />
                  <span>
                    <strong>Marketing</strong> — usati per contenuti social e pubblicità personalizzata.
                  </span>
                </label>
              </li>
            </ul>
            <div className="cookie-consent__actions">
              <button type="button" className="cookie-btn cookie-btn--ghost" onClick={() => setShowPrefs(false)}>
                Indietro
              </button>
              <button type="button" className="cookie-btn cookie-btn--solid" onClick={savePrefs}>
                Salva preferenze
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CookieConsent;
