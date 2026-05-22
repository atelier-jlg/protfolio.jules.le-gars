/* === Sections ======================================================= */
const { useState: useStateS, useMemo } = React;

/* ——— 01 Accueil ———————————————————————————————————————————————— */
function Hero() {
  return (
    <section className="section" id="accueil">
      <GridRules />
      <SectionMeta num="01" label="Accueil — bonjour" />

      <div className="hero">
        <div className="hero-text">
          <div>
            <div className="hero-eyebrow">
              <span className="rule" />
              <span>Portfolio · Édition 2026</span>
            </div>

            <h1 className="hero-name">
              <span className="first">Jules</span>
              <span className="last">Le&nbsp;Gars</span>
            </h1>

            <p className="hero-bio">
              Étudiant en <strong>BUT Génie Civil &amp; Construction Durable</strong>, en alternance chez <strong>SIXENSE Engineering</strong>. Je crois qu'on peut construire et réhabiliter de manière plus responsable — sans sacrifier le confort ni la qualité d'usage. Un bâtiment, avant d'être une structure, est un espace vécu : c'est cet équilibre entre sobriété carbone, ancrage et habitabilité que je cherche à mettre au cœur de ma pratique.
            </p>
          </div>

          <div className="hero-bottom">
            <div className="hero-stats">
              <div>
                Année
                <span className="v">2 / 3</span>
              </div>
              <div>
                Statut
                <span className="v">Alternant</span>
              </div>
              <div>
                Boîte
                <span className="v">SIXENSE</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-photo">
          <div className="hero-photo-frame">
            <img src="assets/portrait.png" alt="Jules Le Gars" />
          </div>
          <div className="caption">
            <span>JLG · Portrait</span>
            <span>↳ 2026</span>
          </div>
        </div>
      </div>

      <ScrollNext targetId="cv" label="Mon parcours" />
    </section>
  );
}

/* ——— 02 CV ——————————————————————————————————————————————————— */
function CV() {
  return (
    <section className="section cv" id="cv">
      <GridRules />
      <SectionMeta num="02" label="Parcours académique & expériences" />

      <div className="cv-head">
        <h2 className="cv-title">
          Un parcours <em>concret,</em><br />pensé pour bâtir.
        </h2>
        <p className="cv-intro">
          Du bac au chantier, j'ai construit un cheminement qui mêle exigence académique
          et terrain. Chaque étape m'a rapproché du métier que je veux exercer :
          ingénieur génie civil, attentif au matériau, à l'usage et au carbone.
        </p>
      </div>

      <div className="cv-grid">
        <div className="cv-col">
          <h3>Études & diplômes</h3>
          <div className="timeline">
            {ETUDES.map((e, i) => (
              <div className="timeline-item" key={i}>
                <div className="year">{e.year}</div>
                <div className="title">{e.title}</div>
                <div className="place">{e.place}</div>
                <p className="desc">{e.desc}</p>
                <div className="tags">
                  {e.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cv-col">
          <h3>Expériences professionnelles</h3>
          <div className="timeline">
            {EXPERIENCES.map((e, i) => (
              <div className="timeline-item" key={i}>
                <div className="year">{e.year}</div>
                <div className="title">{e.title}</div>
                <div className="place">{e.place}</div>
                <p className="desc">{e.desc}</p>
                <div className="tags">
                  {e.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ScrollNext targetId="sae" label="Mes SAÉ" />
    </section>
  );
}

/* ——— 03 SAÉ ——————————————————————————————————————————————————— */
function SAESection({ onOpen }) {
  const [sem, setSem] = useStateS(1);
  const filtered = useMemo(() => SAE.filter((s) => s.sem === sem), [sem]);

  return (
    <section className="section sae" id="sae">
      <GridRules />
      <SectionMeta num="03" label="Fiches SAÉ — Situations d'apprentissage" />

      <div className="sae-head">
        <div className="title-row">
          <h2>Mes SAÉ, <em>exercices pratiques.</em></h2>
          <p className="lead">
            Les SAÉ structurent la formation en BUT Génie Civil. Six par semestre,
            chacune un projet réel — calcul, conception, chantier, matériau, diagnostic.
            Cliquez sur une carte pour voir le détail, les livrables et le bilan.
          </p>
        </div>

        <div className="semester-tabs" role="tablist">
          {[1, 2, 3, 4].map((n) => (
            <button key={n} onClick={() => setSem(n)} className={sem === n ? 'active' : ''}>
              Semestre {n}
            </button>
          ))}
        </div>
      </div>

      <div className="sae-grid">
        {filtered.map((s) => (
          <SAECard key={s.num} sae={s} onOpen={onOpen} />
        ))}
      </div>

      <ScrollNext targetId="entreprise" label="Mon entreprise" />
    </section>
  );
}

/* ——— 04 Entreprise ———————————————————————————————————————————— */
function Company() {
  return (
    <section className="section company" id="entreprise">
      <GridRules />
      <SectionMeta num="04" label="Présentation entreprise — SIXENSE" />

      <div className="company-grid">
        <div className="company-text">
          <h2><em>SIXENSE</em><br />Engineering.</h2>
          <p className="lead">
            Filiale du groupe VINCI, SIXENSE est spécialiste de la maîtrise des risques
            sur les infrastructures et les ouvrages d'art. L'entreprise intervient sur tout
            le cycle de vie d'un ouvrage : étude, instrumentation, surveillance et
            réhabilitation.
          </p>
          <p className="body">
            J'y travaille en alternance depuis la rentrée 2024. Je participe à des missions
            d'auscultation, de suivi de chantier et d'études techniques sur des ouvrages
            existants : ponts, bâtiments patrimoniaux, parkings. C'est un environnement
            exigeant, formateur, où la mesure de terrain rencontre le calcul.
          </p>

          <div className="company-meta">
            <div className="item">
              <div className="k">Mon rôle</div>
              <div className="v">Alternant Génie Civil</div>
            </div>
            <div className="item">
              <div className="k">Depuis</div>
              <div className="v">Septembre 2024</div>
            </div>
            <div className="item">
              <div className="k">Site</div>
              <div className="v">Agence Nantes</div>
            </div>
            <div className="item">
              <div className="k">Domaine</div>
              <div className="v">Ouvrages d'art · Bâti existant</div>
            </div>
          </div>
        </div>

        <Carousel photos={COMPANY_PHOTOS} />
      </div>

      <ScrollNext targetId="contact" label="Me contacter" />
    </section>
  );
}

/* ——— 05 Projet personnel — stashé dans _stash/project-section.jsx ——— */
/* eslint-disable-next-line */
Object.assign(window, { Hero, CV, SAESection, Company });
