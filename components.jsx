/* === Composants partagés ============================================ */
const { useState, useEffect, useRef, useCallback } = React;

/* ——— Filets de grille architecturale ————————————————————————————— */
function GridRules({ cols = 12 }) {
  return (
    <div className="grid-rules" aria-hidden>
      {Array.from({ length: cols }).map((_, i) => <span key={i} />)}
    </div>);

}

/* ——— Section meta (numéro + label monospace) ——————————————————————— */
function SectionMeta({ num, label }) {
  return (
    <div className="section-meta">
      <span className="dot" />
      <span>{num} — {label}</span>
    </div>);

}

/* ——— Header ————————————————————————————————————————————————————— */
function Header({ activeId, onNavClick }) {
  return (
    <header className="header">
      <a href="#accueil" className="header-logo" onClick={(e) => {e.preventDefault();onNavClick('accueil');}}>
        <img src="assets/logo.png" alt="Jules Le Gars" />
        <div>
          <div className="name">Jules Le Gars</div>
          <div className="role">Génie Civil · Construction Durable</div>
        </div>
      </a>
      <nav className="nav">
        {NAV_SECTIONS.map((s) =>
        <a key={s.id}
        href={`#${s.id}`}
        className={activeId === s.id ? 'active' : ''}
        onClick={(e) => {e.preventDefault();onNavClick(s.id);}}>
            <span className="num">{s.num}</span>{s.label}
          </a>
        )}
      </nav>
    </header>);

}

/* ——— Scroll-next button ————————————————————————————————————————— */
function ScrollNext({ targetId, label = 'Section suivante' }) {
  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <button className="scroll-next" onClick={handleClick}>
      <span className="circle">↓</span>
      {label}
    </button>);

}

/* ——— Carousel ————————————————————————————————————————————————— */
function Carousel({ photos }) {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((i) => (i + 1) % photos.length);
  const prev = () => setIdx((i) => (i - 1 + photos.length) % photos.length);

  return (
    <div className="carousel">
      <div className="carousel-stage">
        {photos.map((p, i) =>
        <div key={i} className={`carousel-slide ${i === idx ? 'active' : ''}`}>
            <img src={p.src} alt={p.caption} loading={i === 0 ? 'eager' : 'lazy'} />
            <div className="caption">{String(i + 1).padStart(2, '0')} — {p.caption}</div>
          </div>
        )}
      </div>
      <div className="carousel-controls">
        <span>{String(idx + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span>
        <div className="carousel-dots">
          {photos.map((_, i) =>
          <span key={i}
          className={`dot ${i === idx ? 'active' : ''}`}
          onClick={() => setIdx(i)} />
          )}
        </div>
        <div className="arrows">
          <button className="arrow-btn" onClick={prev} aria-label="Précédent">←</button>
          <button className="arrow-btn" onClick={next} aria-label="Suivant">→</button>
        </div>
      </div>
    </div>);

}

/* ——— SAÉ Card (réduit) ————————————————————————————————————————— */
function SAECard({ sae, onOpen }) {
  return (
    <article className="sae-card" onClick={() => onOpen(sae)}>
      <div className="num">
        <span className="sem">S{sae.sem}</span>SAÉ {sae.num}
      </div>
      <h3>{sae.title}</h3>
      <p className="blurb">{sae.short}</p>
      <div className="preview">
        <span className="label">Aperçu — {sae.previewLabels[0]}</span>
      </div>
      <div className="more">Voir plus</div>
    </article>);

}

/* ——— SAÉ Modal (développé) ——————————————————————————————————————— */
function SAEModal({ sae, onClose }) {
  // Esc to close
  useEffect(() => {
    if (!sae) return;
    const onKey = (e) => {if (e.key === 'Escape') onClose();};
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [sae, onClose]);

  return (
    <>
      <div className={`modal-backdrop ${sae ? 'open' : ''}`} onClick={onClose} />
      <div className={`modal ${sae ? 'open' : ''}`} aria-hidden={!sae}>
        {sae &&
        <>
            <button className="modal-close" onClick={onClose} aria-label="Fermer">×</button>
            <div className="modal-body">
              <div className="modal-num">
                <span className="sem">Semestre {sae.sem}</span>
                <span className="sep" />
                <span>SAÉ {sae.num}</span>
              </div>
              <h2>{sae.title}</h2>
              <p className="modal-intro">{sae.intro}</p>

              {/* Compétences */}
              <div className="modal-section">
                <h3>Compétences travaillées</h3>
                <div className="skills-table">
                  <div className="row head">
                    <span>Code</span>
                    <span>Compétence</span>
                    <span style={{ textAlign: 'right' }}>Auto-évaluation</span>
                  </div>
                  {sae.competences.map((c) =>
                <div className="row" key={c.code}>
                      <span className="code">{c.code}</span>
                      <span className="name">{COMPETENCES_LIB[c.code]}</span>
                      <span className="level">
                        {[1, 2, 3].map((n) =>
                    <span key={n} className={`pip ${n <= c.level ? 'on' : ''}`} />
                    )}
                      </span>
                    </div>
                )}
                </div>
              </div>

              {/* Livrables */}
              <div className="modal-section">
                <h3>Livrables · téléchargeables</h3>
                <div className="deliverables">
                  {sae.livrables.map((l, i) =>
                <a key={i}
                   className={`deliverable${l.path ? '' : ' deliverable-na'}`}
                   href={l.path || '#'}
                   target={l.path ? '_blank' : undefined}
                   rel={l.path ? 'noopener noreferrer' : undefined}
                   onClick={!l.path ? (e) => e.preventDefault() : undefined}>
                      <div className="meta">
                        <span className="name">{l.name}</span>
                        <span className="ext">{l.ext}</span>
                      </div>
                      <span className="dl">↓</span>
                    </a>
                )}
                </div>
              </div>

              {/* Aperçus */}
              <div className="modal-section">
                <h3>Aperçus des livrables</h3>
                <div className="previews">
                  {sae.previewLabels.map((p, i) =>
                <div key={i} className="preview-tile">
                      <span className="label">{p}</span>
                    </div>
                )}
                </div>
              </div>

              {/* Bilan */}
              <div className="modal-section">
                <h3>Bilan de la SAÉ</h3>
                <div className="bilan">
                  <h4>« {sae.bilan.split('.')[0]}. »</h4>
                  <div className="quote">
                    <p>{sae.bilan}</p>
                    <p>Mise en lien avec les matières du BUT Génie Civil : étude technique, matériaux, mécanique des structures, organisation de chantier.</p>
                  </div>
                </div>
              </div>

              <button className="btn" onClick={onClose} style={{ marginTop: 24 }}>
                <span>← Voir moins</span>
              </button>
            </div>
          </>
        }
      </div>
    </>);

}

/* ——— Footer / Contact ———————————————————————————————————————————— */
const CONTACT_EMAIL = 'jules.le-gars.contact@pm.me';

function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch (e) {
      // fallback : selection-based
      const ta = document.createElement('textarea');
      ta.value = CONTACT_EMAIL;
      document.body.appendChild(ta);
      ta.select();
      try {document.execCommand('copy');} catch (_) {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <footer className="footer section" id="contact">
      <GridRules />
      <SectionMeta num="05" label="Contact — discutons" />
      <div className="footer-mark" aria-hidden="true">JLG</div>

      <div className="footer-body">
        <div className="footer-eyebrow">
          <span className="rule" />
          <span>Disponible pour</span>
        </div>
        <div className="availability-tags">
          <span>Alternance</span>
          <span>Bureau d'études structure</span>
          <span>Conception bois</span>
        </div>

        <h2 className="footer-cta">
          Bâtissons<br />
          quelque chose<br />
          <em>ensemble.</em>
        </h2>

        <button
          type="button"
          className={`email-card ${copied ? 'is-copied' : ''}`}
          onClick={copyEmail}
          aria-label={`Copier l'adresse email ${CONTACT_EMAIL}`}>
          
          <div className="email-card-top">
            <span className="lbl">Écrivez-moi</span>
            <span className="hint">
              <span className="hint-dot" />
              {copied ? 'Copié dans le presse-papier' : 'Cliquez pour copier'}
            </span>
          </div>
          <div className="email-card-value">{CONTACT_EMAIL}</div>
          <div className="email-card-bottom">
            <span className="sub">…ou ouvrir directement votre client mail</span>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Portfolio%20%E2%80%94%20`}
              className="mail-btn"
              onClick={(e) => e.stopPropagation()}>
              
              <span>Envoyer un mail</span>
              <span className="arr">↗</span>
            </a>
          </div>
        </button>

        <div className="contact-chips">
          <div className="chip">
            <span className="k">Basé à</span>
            <span className="v">Saint-Nazaire · Vertou</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="left">
          <img src="assets/logo.png" alt="" />
          <span>© 2026 Jules Le Gars · Portfolio</span>
        </div>
        <div>BUT GCCD → Cycle Ingénieur ESB · Conception Bois</div>
      </div>
    </footer>);

}

Object.assign(window, {
  GridRules, SectionMeta, Header, ScrollNext, Carousel, SAECard, SAEModal, Footer
});