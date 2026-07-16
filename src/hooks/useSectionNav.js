import { useLocation, useNavigate } from 'react-router-dom';

// HashRouter uses the URL hash for routing, so plain `#id` anchors would be
// misread as route changes. This intercepts the click and scrolls instead,
// navigating home first when the section isn't on the current page.
export function useSectionNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return function goToSection(hash) {
    const id = hash.replace('#', '');
    return (e) => {
      e.preventDefault();
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        navigate('/', { state: { scrollTo: id } });
      }
    };
  };
}
