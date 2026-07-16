import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import AnchorSection from '../components/AnchorSection';
import CucinaInclusiva from '../components/CucinaInclusiva';
import Gallery from '../components/Gallery';
import DiconoDiNoi from '../components/DiconoDiNoi';
import Contatti from '../components/Contatti';
import { SITE } from '../data/content';
import { asset } from '../utils/asset';
import './Home.css';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const targetId = location.state?.scrollTo;
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navigate('.', { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  return (
    <>
      <Hero />

      <CucinaInclusiva />

      <AnchorSection
        id="birrificio"
        photoSrc={asset('images/photo-brewery.jpg')}
        photoAlt="Tini in acciaio del birrificio interno di Fermenteria"
        heading="L'unico birrificio di Bassano del Grappa"
        subtitle="Creiamo le nostre birre come fossero dei piatti gourmet: Ingredienti, tecnica e amore"
        badgeSrc={asset('images/badge-brewery.png')}
        badgeAlt="Brewery"
        badgeHref={SITE.birraArticle}
      />

      <AnchorSection
        id="storia"
        photoSrc={asset('images/photo-chef-fiori.jpg')}
        photoAlt="Lo chef Nicola Scaramuzzi in un prato con fiori di tarassaco"
        heading="Ho raccontato la nostra storia in un libro"
        subtitle="Ma il vero intento di queste pagine è farti fiorire"
        badgeSrc={asset('images/badge-stai-dove-fiorisci.png')}
        badgeAlt="Stai dove fiorisci"
        badgeHref={SITE.amazonBook}
      />

      <Gallery />

      <DiconoDiNoi />

      <Contatti />
    </>
  );
}

export default Home;
