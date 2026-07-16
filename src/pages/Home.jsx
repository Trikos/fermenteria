import Hero from '../components/Hero';
import AnchorSection from '../components/AnchorSection';
import CucinaInclusiva from '../components/CucinaInclusiva';
import Gallery from '../components/Gallery';
import DiconoDiNoi from '../components/DiconoDiNoi';
import Contatti from '../components/Contatti';
import { SITE } from '../data/content';
import './Home.css';

function Home() {
  return (
    <>
      <Hero />

      <CucinaInclusiva />

      <AnchorSection
        id="birrificio"
        photoSrc="/images/photo-brewery.jpg"
        photoAlt="Tini in acciaio del birrificio interno di Fermenteria"
        heading="L'unico birrificio di Bassano del Grappa"
        subtitle="Creiamo le nostre birre come fossero dei piatti gourmet: Ingredienti, tecnica e amore"
        badgeSrc="/images/badge-brewery.png"
        badgeAlt="Brewery"
        badgeHref={SITE.birraArticle}
        badgeLabel="Brewery"
      />

      <AnchorSection
        id="storia"
        photoSrc="/images/photo-chef-fiori.jpg"
        photoAlt="Lo chef Nicola Scaramuzzi in un prato con fiori di tarassaco"
        heading="Ho raccontato la nostra storia in un libro"
        subtitle="Ma il vero intento di queste pagine è farti fiorire"
        badgeSrc="/images/badge-stai-dove-fiorisci.png"
        badgeAlt="Stai dove fiorisci"
        badgeHref={SITE.amazonBook}
        badgeLabel="Stai dove fiorisci"
      />

      <Gallery />

      <DiconoDiNoi />

      <Contatti />
    </>
  );
}

export default Home;
