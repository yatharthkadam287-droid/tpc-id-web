export const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7" /><path d="M8 7h9v9" />
  </svg>
);

export const ShieldIcon = ({ size = 22 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2.5 20 5.5v6c0 5-3.4 8.7-8 10.5-4.6-1.8-8-5.5-8-10.5v-6z" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </svg>
);

export const NfcIcon = () => (
  <svg className="nfc" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
       strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
    <path d="M8 9.5a3.5 3.5 0 0 1 0 5" />
    <path d="M11.5 7a7 7 0 0 1 0 10" />
    <path d="M15 4.5a10.5 10.5 0 0 1 0 15" />
  </svg>
);

export const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <rect width="24" height="24" rx="4" fill="#0A66C2" />
    <circle cx="6.6" cy="6.9" r="1.7" fill="#fff" />
    <rect x="5.1" y="9.6" width="3" height="8.7" fill="#fff" />
    <path fill="#fff" d="M10.4 9.6h2.9v1.2c.5-.9 1.5-1.4 2.8-1.4 2.6 0 3.3 1.7 3.3 3.9v5h-3v-4.4c0-1.1-.2-1.9-1.3-1.9s-1.7.8-1.7 1.9v4.4h-3z" />
  </svg>
);

export const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="ig" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#f9a13a" />
        <stop offset=".5" stopColor="#ee2a7b" />
        <stop offset="1" stopColor="#c13584" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="url(#ig)" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" stroke="url(#ig)" strokeWidth="2" />
    <circle cx="17.2" cy="6.8" r="1.2" fill="#ee2a7b" />
  </svg>
);

export const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#22c55e"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z" />
    <path fill="#22c55e" stroke="none" d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z" />
  </svg>
);

export const EmailIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#e5e7eb"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#e5e7eb"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

export const SaveIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#22c55e"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v12m0 0-4-4m4 4 4-4" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
  </svg>
);