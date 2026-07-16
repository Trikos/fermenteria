import { Link } from 'react-router-dom';
import './LegalPage.css';

function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((chunk, i) =>
    chunk.startsWith('**') && chunk.endsWith('**') ? <strong key={i}>{chunk.slice(2, -2)}</strong> : chunk
  );
}

function renderBody(text) {
  const blocks = text.split(/\n\n+/);
  const nodes = [];
  let listBuffer = [];

  const flushList = (key) => {
    if (listBuffer.length) {
      nodes.push(<ul key={`ul-${key}`}>{listBuffer.map((item, i) => <li key={i}>{renderInline(item)}</li>)}</ul>);
      listBuffer = [];
    }
  };

  blocks.forEach((block, idx) => {
    const lines = block.split('\n');
    if (lines.every((l) => l.trim().startsWith('- '))) {
      lines.forEach((l) => listBuffer.push(l.replace(/^- /, '')));
      return;
    }
    flushList(idx);

    if (block.startsWith('### ')) {
      nodes.push(<h3 key={idx}>{block.replace('### ', '')}</h3>);
    } else if (block.startsWith('## ')) {
      nodes.push(<h2 key={idx}>{block.replace('## ', '')}</h2>);
    } else {
      nodes.push(
        <p key={idx}>
          {lines.map((l, i) => (
            <span key={i}>
              {renderInline(l)}
              {i < lines.length - 1 && <br />}
            </span>
          ))}
        </p>
      );
    }
  });
  flushList('end');

  return nodes;
}

function LegalPage({ title, updated, text }) {
  return (
    <div className="legal-page">
      <div className="container legal-page__inner">
        <Link to="/" className="legal-page__back">
          ← Torna al sito
        </Link>
        <h1>{title}</h1>
        {updated && <p className="legal-page__updated">{updated}</p>}
        <div className="legal-page__body">{renderBody(text)}</div>
      </div>
    </div>
  );
}

export default LegalPage;
