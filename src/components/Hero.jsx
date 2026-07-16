import { SITE } from '../data/content';
import './Hero.css';
import './AnchorSection.css';

function Hero() {
  return (
    <>
      <section id="home" className="hero">
        <img
          className="hero__image"
          src="/images/photo-hero.jpg"
          alt="Lo chef di Fermenteria con un piatto di tartare e un bicchiere di birra artigianale"
          loading="eager"
          fetchpriority="high"
        />
        <div className="hero__scrim" />
        <div className="hero__content container">
          <h1>Benvenuti in Fermenteria</h1>
          <p>Qui tutto nasce e si trasforma nella propria versione migliore</p>
          <div className="hero__actions">
            <a href="#menu" className="btn btn--primary">
              Scopri il menù
            </a>
            <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="btn btn--ghost">
              Prenota un tavolo
            </a>
          </div>
        </div>
        <a href="#menu" className="hero__scroll-cue" aria-label="Scorri per scoprire di più">
          <span>clicca qui</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 4v16m0 0-6-6m6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </section>

      <div id="menu" className="hero__menu-band">
        <a className="anchor-section__badge" href={SITE.menuPdf} target="_blank" rel="noreferrer">
          <img src="/images/badge-menu-italiano.png" alt="Menù italiano" loading="lazy" />
          <span>Menù italiano</span>
        </a>
        <a className="anchor-section__extra" href={SITE.allergeniPdf} target="_blank" rel="noreferrer">
          Allergeni
        </a>
      </div>
    </>
  );
}

export default Hero;
