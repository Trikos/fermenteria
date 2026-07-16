import { ORARI, SITE } from '../data/content';
import { asset } from '../utils/asset';
import './Contatti.css';

const LINKS = [
  { icon: asset('images/icon-chat.png'), label: 'Chat WhatsApp', href: SITE.whatsapp, external: true },
  { icon: asset('images/icon-facebook.png'), label: 'Facebook', href: SITE.facebook, external: true },
  { icon: asset('images/icon-mail.png'), label: 'Scrivici via email', href: `mailto:${SITE.email}`, external: false },
  { icon: asset('images/icon-instagram.png'), label: 'Instagram', href: SITE.instagram, external: true },
  { icon: asset('images/icon-dove-siamo.png'), label: 'Dove siamo', href: SITE.maps, external: true },
];

function Contatti() {
  return (
    <section id="contatti" className="contatti">
      <div className="container">
        <h2>Prenota il tuo posto</h2>
        <p className="contatti__lead">Prenota un tavolo da Fermenteria, ti aspettiamo</p>

        <ul className="contatti__links">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} target={l.external ? '_blank' : undefined} rel={l.external ? 'noreferrer' : undefined}>
                <span className="contatti__icon">
                  <img src={l.icon} alt={l.label} loading="lazy" />
                </span>
                <span className="visually-hidden">{l.label}</span>
              </a>
            </li>
          ))}
          <li>
            <div className="contatti__orari">
              <span className="contatti__icon">
                <img src={asset('images/icon-orari.png')} alt="Orari di apertura" loading="lazy" />
              </span>
              <ul>
                {ORARI.map((o) => (
                  <li key={o.giorni}>
                    <strong>{o.giorni}</strong> {o.ore}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>

        <div className="contatti__info">
          <p>{SITE.address}</p>
          <p className="contatti__info-links">
            <a href={`tel:+39${SITE.phone}`}>{SITE.phoneDisplay}</a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contatti;
