/* === STASH — Section "Projet personnel" ============================
   Section mise de côté en attendant la finalisation d'un vrai projet.
   Pour la réactiver :
   1. Réintroduire la fonction Project() dans sections.jsx
      (et l'exporter via Object.assign(window, { ..., Project }))
   2. Ajouter <Project /> dans app.jsx entre <Company /> et <Footer />
   3. Dans data.jsx, remettre la ligne projet dans NAV_SECTIONS :
        { id: 'projet', num: '05', label: 'Projet' },
      et repasser Contact à num: '06'.
   4. Dans components.jsx Footer(), repasser SectionMeta num="06".
   5. Dans sections.jsx Company(), repasser ScrollNext à
        targetId="projet" label="Mon projet"
   ==================================================================== */

function Project() {
  return (
    <section className="section project" id="projet">
      <GridRules />
      <SectionMeta num="05" label="Projet personnel — Maîtrise d'œuvre" />

      <div className="project-head">
        <h2>
          La Grange<br />
          <em>de Mauves</em>
        </h2>
        <p className="lead">
          Projet personnel de maîtrise d'œuvre : réhabilitation d'une dépendance agricole
          en logement passif. Étude complète — relevé, structure, enveloppe, ACV. Une
          synthèse de tout ce que j'apprends, appliqué à un site que je connais.
        </p>
      </div>

      <div className="project-grid">
        <div className="project-main">
          <image-slot
            id="project-main"
            placeholder="Visuel 3D principal — projet Grange de Mauves"
            shape="rounded"
            radius="18"
          />
          <div className="overlay">
            <div className="badge">Maîtrise d'œuvre · 2026</div>
            <h3>Réhabilitation passive d'une grange en pierre</h3>
            <div className="sub">130 m² · structure bois insérée · enveloppe biosourcée</div>
          </div>
        </div>

        <div className="project-side">
          <a className="asset-card" href="#" onClick={(e) => e.preventDefault()}>
            <div className="left">
              <div className="ico">3D</div>
              <div className="meta">
                <div className="title">Visuels 3D</div>
                <div className="sub">6 vues · Blender · PDF</div>
              </div>
            </div>
            <span className="dl-icon">↓</span>
          </a>
          <a className="asset-card" href="#" onClick={(e) => e.preventDefault()}>
            <div className="left">
              <div className="ico">DWG</div>
              <div className="meta">
                <div className="title">Plans techniques</div>
                <div className="sub">Plan · Coupe · Détails</div>
              </div>
            </div>
            <span className="dl-icon">↓</span>
          </a>
          <a className="asset-card" href="#" onClick={(e) => e.preventDefault()}>
            <div className="left">
              <div className="ico">PDF</div>
              <div className="meta">
                <div className="title">Notes de calcul</div>
                <div className="sub">Structure · Thermique · ACV</div>
              </div>
            </div>
            <span className="dl-icon">↓</span>
          </a>
        </div>
      </div>

      <ScrollNext targetId="contact" label="Me contacter" />
    </section>
  );
}
