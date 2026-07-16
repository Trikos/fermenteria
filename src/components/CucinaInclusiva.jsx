import { asset } from '../utils/asset';
import './CucinaInclusiva.css';

const FEATURES = [
  { src: asset('images/badge-gluten-free.png'), label: 'Gluten free' },
  { src: asset('images/badge-veg.png'), label: 'Veg' },
  { src: asset('images/badge-bio.png'), label: 'Ingredienti bio' },
];

function CucinaInclusiva() {
  return (
    <section id="cucina-inclusiva" className="cucina">
      <div className="cucina__photo">
        <img
          src={asset('images/photo-tartare.jpg')}
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
              <img src={f.src} alt={f.label} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default CucinaInclusiva;
