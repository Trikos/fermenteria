import './Gallery.css';

function Gallery() {
  return (
    <section className="gallery" aria-label="Il locale">
      <img
        className="gallery__photo"
        src="/images/photo-interno-sala.jpg"
        alt="Interno del locale Fermenteria con mensole in legno, libri, piante, quadri e tavoli in legno massello"
        loading="lazy"
      />
    </section>
  );
}

export default Gallery;
