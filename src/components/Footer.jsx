import { Link } from 'react-router-dom';
import { SITE } from '../data/content';
import './Footer.css';

function Footer() {
  const year = 2026;
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>
          © 2017 - {year} FERMENTERIA S.A.S. / P.IVA: {SITE.piva}
        </p>
        <nav aria-label="Link legali">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <span aria-hidden="true">|</span>
          <Link to="/cookie-policy-ue">Cookie Policy</Link>
        </nav>
        <a href={SITE.aic} target="_blank" rel="noreferrer" className="site-footer__aic">
          <img src="/images/logo-aic.png" alt="AIC Veneto - Associazione Italiana Celiachia" width="64" height="64" loading="lazy" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
