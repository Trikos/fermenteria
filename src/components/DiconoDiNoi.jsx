import { SITE } from '../data/content';
import './DiconoDiNoi.css';

function DiconoDiNoi() {
  return (
    <section id="dicono-di-noi" className="dicono">
      <div className="container dicono__inner">
        <h2>Dicono di noi</h2>
        <p>Leggi le recensioni dei nostri ospiti direttamente su Google.</p>
        <a href={SITE.maps} target="_blank" rel="noreferrer" className="btn btn--primary">
          Leggi le recensioni su Google Maps
        </a>
      </div>
    </section>
  );
}

export default DiconoDiNoi;
