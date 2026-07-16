import './AnchorSection.css';

function AnchorSection({
  id,
  photoSrc,
  photoAlt,
  heading,
  subtitle,
  badgeSrc,
  badgeAlt,
  badgeHref,
  badgeLabel,
  children,
}) {
  return (
    <section id={id} className="anchor-section">
      <div className="anchor-section__photo">
        <img src={photoSrc} alt={photoAlt} loading="lazy" />
      </div>
      <div className="anchor-section__panel">
        <div className="anchor-section__panel-inner">
          <h2>{heading}</h2>
          <p>{subtitle}</p>
          {badgeHref && (
            <a
              className="anchor-section__badge"
              href={badgeHref}
              target="_blank"
              rel="noreferrer"
            >
              <img src={badgeSrc} alt={badgeAlt} loading="lazy" />
              <span>{badgeLabel}</span>
            </a>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

export default AnchorSection;
