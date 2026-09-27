import { useParams, Link, Navigate } from 'react-router-dom';
import { PEOPLE } from './people';
import { useCardPhysics } from './useCardPhysics';
import {
  ShieldIcon, NfcIcon, LinkedInIcon, InstagramIcon,
  WhatsAppIcon, EmailIcon, PhoneIcon, SaveIcon, ArrowIcon
} from './Icons';

function saveContact(person) {
  const vcf = [
    'BEGIN:VCARD', 'VERSION:3.0',
    'FN:' + person.name, 'ORG:MES College Committee', 'TITLE:' + person.role,
    'TEL;TYPE=CELL:' + person.phone, 'EMAIL:' + person.email, 'END:VCARD'
  ].join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([vcf], { type: 'text/vcard' }));
  a.download = person.name.replace(/\s+/g, '_') + '.vcf';
  a.click();
  URL.revokeObjectURL(a.href);
}

export default function Badge() {
  const { slug } = useParams();
  const person = PEOPLE.find(p => p.slug === slug);

  // hooks must run unconditionally, so call it even if person is missing
  const { stageRef, swingRef, flipRef, descRef } = useCardPhysics(person?.description ?? '');

  if (!person) return <Navigate to="/404" replace />;

  return (
    <>
      <main className="stage" ref={stageRef}>
        <div className="hook" aria-hidden="true"></div>

        <div className="swing" ref={swingRef} role="button" tabIndex={0} aria-pressed="false"
             aria-label="ID badge. Double tap or press Enter to flip it. Arrow keys make it swing or drop.">
          <div className="strap" aria-hidden="true"></div>
          <div className="clip" aria-hidden="true"></div>

          <div className="scene">
            <div className="flip" ref={flipRef}>

              <div className="face front"><div className="inner">
                <div className="top">
                  <div className="chip" aria-hidden="true"></div>
                  <div className="pass"><i></i>Active pass</div>
                  <NfcIcon />
                </div>
                <div className="photo" style={person.photo ? { backgroundImage: `url(${person.photo})` } : undefined}>
                  {!person.photo && <span>{person.initials}</span>}
                  <span className="scan" aria-hidden="true"></span>
                  <span className="auth"><ShieldIcon size={13} />TPC AUTH</span>
                </div>
                <h1 className="name">{person.name}</h1>
                <span className="role">{person.role}</span>
                <div className="org">{person.org}</div>
              </div></div>

              <div className="face back"><div className="inner">
                <div className="back-head"><span>About</span><span>{person.year}</span></div>
                <p className="desc" ref={descRef}></p>
                <div className="tiny">Double tap to flip back</div>
              </div></div>

            </div>
          </div>
        </div>
      </main>

      <p className="hint">Drag to swing it, pull down to stretch it. Double tap to read about me.</p>
      <div className="tag"><span>Train potential &bull; Promote skills</span></div>

      <nav className="links" aria-label="Contact">
        <a className="row" href={person.links.LinkedIn} target="_blank" rel="noopener noreferrer">
          <span className="ico"><LinkedInIcon /></span>
          <span className="txt"><span className="lbl">LinkedIn</span></span>
          <span className="go"><ArrowIcon /></span>
        </a>
        <a className="row" href={person.links.Instagram} target="_blank" rel="noopener noreferrer">
          <span className="ico"><InstagramIcon /></span>
          <span className="txt"><span className="lbl">Instagram</span></span>
          <span className="go"><ArrowIcon /></span>
        </a>
        <a className="row" href={person.links.WhatsApp} target="_blank" rel="noopener noreferrer">
          <span className="ico"><WhatsAppIcon /></span>
          <span className="txt"><span className="lbl">WhatsApp</span></span>
          <span className="go"><ArrowIcon /></span>
        </a>
        <a className="row" href={`mailto:${person.email}`}>
          <span className="ico"><EmailIcon /></span>
          <span className="txt"><span className="lbl">Email</span></span>
          <span className="go"><ArrowIcon /></span>
        </a>
        <a className="row" href={`tel:${person.phone}`}>
          <span className="ico"><PhoneIcon /></span>
          <span className="txt"><span className="lbl">Phone</span></span>
          <span className="go"><ArrowIcon /></span>
        </a>
        <button className="row" onClick={() => saveContact(person)}>
          <span className="ico"><SaveIcon /></span>
          <span className="txt">
            <span className="lbl">Save to contacts</span>
            <span className="sub">MES College Committee</span>
          </span>
          <span className="go"><ArrowIcon /></span>
        </button>
      </nav>

      <p className="hint"><Link to="/" style={{ color: 'inherit' }}>&larr; Back to all members</Link></p>
    </>
  );
}