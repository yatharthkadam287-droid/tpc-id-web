import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main>
      <p className="hint" style={{ marginTop: 26 }}>No ID found for that link.</p>
      <p className="hint"><Link to="/" style={{ color: 'var(--neon)' }}>&larr; See all members</Link></p>
    </main>
  );
}