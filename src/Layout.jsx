import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ShieldIcon } from './Icons';

export default function Layout({ year = '2026-2027' }) {
  const location = useLocation();

  /* Rows and the footer card fade/rise into view as they're scrolled to
     (or immediately, if they're already on screen). Re-runs every time
     the route changes, since Directory/Badge swap in new .row elements. */
  useEffect(() => {
    document.documentElement.classList.add('js');
    const targets = [...document.querySelectorAll('.row'), document.querySelector('.foot-card')]
      .filter(Boolean);

    if (!('IntersectionObserver' in window)) {
      targets.forEach(t => t.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.filter(e => e.isIntersecting).forEach((e, k) => {
        e.target.style.setProperty('--i', k);
        e.target.classList.add('in');
        obs.unobserve(e.target);
      });
    }, { threshold: 0.15 });
    targets.forEach(t => io.observe(t));
    return () => io.disconnect();
  }, [location.pathname]);

  return (
    <>
      <header>
        <a href="https://tpc.pce.ac.in" target="_blank" rel="noopener noreferrer" aria-label="Visit the TPC-PCE website">
          <img className="logo" src="/logo.png" alt="TPC-PCE. Train potential, promote skills." />
        </a>
        <span className="year"><i></i><span>{year}</span></span>
      </header>

      <Outlet />

      <footer>
        <div className="foot-card">
          <h2><ShieldIcon />MES College Committee</h2>
          <span className="pill">TPC-PCE 2025-26</span>
          <p>&copy; 2026 &ndash; 2027 Training &amp; Placement Committee</p>
        </div>
      </footer>
    </>
  );
}