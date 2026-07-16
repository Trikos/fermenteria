import { useEffect } from 'react';

const DEFAULT_TITLE = 'Fermenteria | Ristorante Inclusivo con Birrificio a Bassano del Grappa';
const DEFAULT_DESCRIPTION =
  'Fermenteria: ristorante inclusivo con birrificio artigianale interno a Bassano del Grappa (VI). Cucina gluten free, vegetariana, ingredienti bio e birre prodotte in casa. Via Campo Marzio 43.';

export function useDocumentMeta(title, description) {
  useEffect(() => {
    document.title = title || DEFAULT_TITLE;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description || DEFAULT_DESCRIPTION);

    return () => {
      document.title = DEFAULT_TITLE;
      if (meta) meta.setAttribute('content', DEFAULT_DESCRIPTION);
    };
  }, [title, description]);
}
