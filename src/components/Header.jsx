import { useEffect, useRef, useState } from 'react';
import { NAV_LINKS, SITE } from '../data/content';
import { useSectionNav } from '../hooks/useSectionNav';
import { asset } from '../utils/asset';
import './Header.css';

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const goToSection = useSectionNav();
  const hamburgerRef = useRef(null);
  const drawerRef = useRef(null);
  const wasOpen = useRef(false);

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

  useEffect(() => {
    if (open) {
      drawerRef.current?.querySelector('a')?.focus();
    } else if (wasOpen.current) {
      hamburgerRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="site-header__bar container">
        <a href="#home" className="site-header__brand" onClick={goToSection('#home')}>
          <img src={asset('images/logo-header.png')} alt="Fermenteria" width="44" height="44" />
          <span>
            Fermenteria
            <small>Ristorante &amp; Birrificio</small>
          </span>
        </a>

        <nav className="site-header__nav" aria-label="Navigazione principale">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={goToSection(link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="site-header__cta">
          Prenota
        </a>

        <button
          ref={hamburgerRef}
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
        ref={drawerRef}
        className={`mobile-menu ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Navigazione mobile">
          <ul>
            {NAV_LINKS.map((link, i) => (
              <li key={link.href} style={{ '--delay': `${i * 0.04}s` }}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    goToSection(link.href)(e);
                    closeMenu();
                  }}
                >
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
              <img src={asset('images/icon-facebook.png')} alt="" width="22" height="22" />
            </a>
            <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <img src={asset('images/icon-instagram.png')} alt="" width="22" height="22" />
            </a>
          </div>
        </div>
      </div>
      {open && <button type="button" className="mobile-menu__backdrop" aria-label="Chiudi il menu" onClick={closeMenu} />}
    </header>
  );
}

export default Header;
