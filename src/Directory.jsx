import { Link } from 'react-router-dom';
import { PEOPLE } from './people';
import { ArrowIcon } from './Icons';

export default function Directory() {
  return (
    <main>
      <p className="hint" style={{ marginTop: 26 }}>Tap a name to open their ID</p>

      <nav className="links" aria-label="Committee members">
        {PEOPLE.map(p => (
          <Link key={p.slug} className="row" to={`/id/${p.slug}`}>
            {p.photo
              ? <span className="ico" style={{ background: `url(${p.photo}) center/cover` }} />
              : <span className="ico" style={{ font: "700 13px 'Barlow Condensed'", color: 'var(--neon)' }}>
                  {p.initials}
                </span>}
            <span className="txt">
              <span className="lbl">{p.name}</span>
              <span className="sub" style={{ textTransform: 'none' }}>{p.role}</span>
            </span>
            <span className="go"><ArrowIcon /></span>
          </Link>
        ))}
      </nav>
    </main>
  );
}