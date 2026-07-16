import './CucinaInclusiva.css';

const FEATURES = [
  { src: '/images/badge-gluten-free.png', label: 'Gluten free' },
  { src: '/images/badge-veg.png', label: 'Veg' },
  { src: '/images/badge-bio.png', label: 'Ingredienti bio' },
];

function CucinaInclusiva() {
  return (
    <section id="cucina-inclusiva" className="cucina">
      <div className="cucina__photo">
        <img
          src="/images/photo-tartare.jpg"
          alt="Tartare di carne con uovo in camicia, un piatto della cucina inclusiva di Fermenteria"
          loading="lazy"
        />
      </div>
      <div className="cucina__content container">
        <h2>La nostra cucina inclusiva</h2>
        <p>Abbracciamo tutte le filosofie alimentari</p>
        <ul className="cucina__features">
          {FEATURES.map((f) => (
            <li key={f.label}>
              <img src={f.src} alt="" loading="lazy" />
              <span>{f.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default CucinaInclusiva;
