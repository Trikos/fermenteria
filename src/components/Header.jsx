import { useEffect, useState } from 'react';
import { NAV_LINKS, SITE } from '../data/content';
import './Header.css';

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="site-header__bar container">
        <a href="#home" className="site-header__brand" onClick={closeMenu}>
          <img src="/images/logo-header.png" alt="Fermenteria" width="44" height="44" />
          <span>
            Fermenteria
            <small>Ristorante &amp; Birrificio</small>
          </span>
        </a>

        <nav className="site-header__nav" aria-label="Navigazione principale">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="site-header__cta">
          Prenota
        </a>

        <button
          type="button"
          className={`hamburger ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Chiudi il menu' : 'Apri il menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`mobile-menu ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
      >
        <nav aria-label="Navigazione mobile">
          <ul>
            {NAV_LINKS.map((link, i) => (
              <li key={link.href} style={{ '--delay': `${i * 0.04}s` }}>
                <a href={link.href} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__footer">
          <a href={SITE.whatsapp} target="_blank" rel="noreferrer" onClick={closeMenu}>
            Prenota su WhatsApp
          </a>
          <div className="mobile-menu__socials">
            <a href={SITE.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <img src="/images/icon-facebook.png" alt="" width="22" height="22" />
            </a>
            <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <img src="/images/icon-instagram.png" alt="" width="22" height="22" />
            </a>
          </div>
        </div>
      </div>
      {open && <button type="button" className="mobile-menu__backdrop" aria-label="Chiudi il menu" onClick={closeMenu} />}
    </header>
  );
}

export default Header;
