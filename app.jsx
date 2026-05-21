/* === App ============================================================ */
const { useState: useStateApp, useEffect: useEffectApp, useRef: useRefApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "organic",
  "accent": "#a45a3e",
  "density": "airy",
  "dark": false,
  "showGrid": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [activeSae, setActiveSae] = useStateApp(null);
  const [activeSection, setActiveSection] = useStateApp('accueil');

  /* Apply direction / density / theme to root */
  useEffectApp(() => {
    const root = document.documentElement;
    // 'blend' = our default mix (no specific direction)
    root.setAttribute('data-direction', t.direction);
    root.setAttribute('data-density', t.density);
    root.setAttribute('data-theme', t.dark ? 'dark' : 'light');
    root.style.setProperty('--accent', t.accent);
    // Generate softer accent automatically
    root.style.setProperty('--accent-soft', shadeColor(t.accent, 20));
  }, [t.direction, t.density, t.dark, t.accent]);

  /* Hide grid rules via class */
  useEffectApp(() => {
    document.body.classList.toggle('no-grid', !t.showGrid);
  }, [t.showGrid]);

  /* Track active section via IntersectionObserver */
  useEffectApp(() => {
    const sections = document.querySelectorAll('.section');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio > 0.45) {
          setActiveSection(e.target.id);
        }
      });
    }, { threshold: [0.45, 0.6] });
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const handleNav = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header activeId={activeSection} onNavClick={handleNav} />
      <main>
        <Hero />
        <CV />
        <SAESection onOpen={setActiveSae} />
        <Company />
        <Footer />
      </main>
      <SAEModal sae={activeSae} onClose={() => setActiveSae(null)} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Direction visuelle" />
        <TweakSelect
          label="Style"
          value={t.direction}
          options={[
            { value: 'blend',         label: 'Mix éditorial + grille + grain' },
            { value: 'editorial',     label: 'Éditorial sobre' },
            { value: 'architectural', label: 'Architectural / technique' },
            { value: 'organic',       label: 'Organique & matière' },
          ]}
          onChange={(v) => setTweak('direction', v)}
        />

        <TweakSection label="Couleur d'accent" />
        <TweakColor
          label="Accent"
          value={t.accent}
          options={['#b87645', '#97a18b', '#c9a64a', '#7b8b6f', '#a45a3e']}
          onChange={(v) => setTweak('accent', v)}
        />

        <TweakSection label="Mise en page" />
        <TweakRadio
          label="Densité"
          value={t.density}
          options={[
            { value: 'compact', label: 'Compact' },
            { value: 'default', label: 'Standard' },
            { value: 'airy',    label: 'Aéré' },
          ]}
          onChange={(v) => setTweak('density', v)}
        />

        <TweakSection label="Affichage" />
        <TweakToggle label="Mode sombre" value={t.dark}
                     onChange={(v) => setTweak('dark', v)} />
        <TweakToggle label="Filets de grille" value={t.showGrid}
                     onChange={(v) => setTweak('showGrid', v)} />
      </TweaksPanel>
    </>
  );
}

/* — Helper : éclaircir une couleur hex */
function shadeColor(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, ((num >> 16) & 0xff) + percent);
  const g = Math.min(255, ((num >> 8) & 0xff) + percent);
  const b = Math.min(255, (num & 0xff) + percent);
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

/* Add a CSS rule for hiding grid (added once) */
const style = document.createElement('style');
style.textContent = `
  body.no-grid .grid-rules { display: none !important; }
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
