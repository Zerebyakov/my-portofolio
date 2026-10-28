import { useEffect, useState } from 'react'
import './App.css'

const projects = [
  {
    id: 'bimbinganos', number: '01', kind: 'Featured project', title: 'Online Thesis Supervision System',
    subtitle: 'A more structured thesis supervision workflow.',
    description: 'A web application for students, supervisors, and administrators to manage thesis proposals, documents, progress, and communication in one place.',
    role: 'Designed and developed independently across the React frontend, Express API, data layer, and a separate semantic-similarity service.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Flask', 'PostgreSQL'],
    image: '/images/bimbinganos.png', alt: 'Original BimbinganOS landing page screenshot',
    repo: 'https://github.com/Zerebyakov/Bimbingan-Skripsi-Online',
    sections: [
      ['The problem', 'Thesis supervision can scatter proposals, revision history, progress updates, and conversations across separate channels.'],
      ['The approach', 'A role-based workflow brings submissions, documents, progress, and communication into one application.'],
      ['Semantic similarity', 'A Python FastAPI service uses a fine-tuned Sentence Transformers model based on paraphrase-multilingual-MiniLM-L12-v2 to compare the meaning of proposed thesis titles. Similarity results support human review; they are not an automated plagiarism verdict.'],
      ['Architecture', 'React frontend → Node.js/Express API → MySQL. The backend communicates with a separate FastAPI inference service for semantic similarity.']
    ]
  },
  {
    id: 'zenin-news', number: '02', kind: 'Independent project', title: 'Zenin News',
    subtitle: 'A focused way to explore articles from The New York Times.',
    description: 'An API-driven news interface for browsing topic feeds, searching articles, and keeping a session-based list of saved stories.',
    role: 'Built as an independent frontend project, connecting the interface to the New York Times Article Search API.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Redux Toolkit', 'Axios'],
    image: '/images/zenin-news.png', alt: 'Original Zenin News home page screenshot',
    repo: 'https://github.com/Zerebyakov/capstone-project',
    sections: [
      ['The problem', 'Readers need a straightforward way to discover stories by topic and find articles through search.'],
      ['The approach', 'Topic feeds, keyword search, and a saved-articles view share a consistent responsive interface.'],
      ['Technical focus', 'Axios handles requests to the New York Times Article Search API, while Redux Toolkit manages saved articles in application state. Saved items are not persisted after a reload.']
    ]
  },
  {
    id: 'kasirkita', number: '03', kind: 'Team project', title: 'KasirKita',
    subtitle: 'A point-of-sale experience for everyday transactions.',
    description: 'A cashier application built as a team project. This case study focuses on my frontend contribution, not ownership of the whole system.',
    role: 'Contributed to the frontend using React and Vite while collaborating within a wider team. Backend work is not claimed as my individual contribution.',
    stack: ['React', 'Vite', 'Frontend UI'],
    image: '/images/kasirkita.png', alt: 'Original KasirKita landing page screenshot',
    repo: 'https://github.com/Ndaru7/kasirAsik',
    sections: [
      ['Project context', 'KasirKita is the display name used in this portfolio for the team project stored in the KasirAsik repository.'],
      ['My contribution', 'Frontend implementation with React and Vite, completed as part of a collaborative project.'],
      ['Scope and reflection', 'This case study highlights the work I contributed to and avoids claiming authorship of the backend or the full product.']
    ]
  }
]

const skillGroups = [
  ['Core frontend', ['JavaScript', 'React', 'HTML & CSS', 'Responsive UI']],
  ['Application work', ['REST API integration', 'Redux Toolkit', 'Vite', 'Git & GitHub']],
  ['Supporting technologies', ['Node.js', 'Express', 'MySQL', 'Python · FastAPI']]
]

function Arrow({ diagonal = false }) {
  return <span className="arrow" aria-hidden="true">{diagonal ? '↗' : '→'}</span>
}

function Header({ menuOpen, onToggleMenu }) {
  return <header className="site-header page-wrap">
    <a className="wordmark" href="#top" aria-label="Portfolio home">ZA<span>.</span></a>
    <nav className={menuOpen ? 'nav-open' : ''} aria-label="Main navigation"><a href="#work" onClick={onToggleMenu}>Work</a><a href="#about" onClick={onToggleMenu}>About</a><a href="#contact" onClick={onToggleMenu}>Contact</a><a className="mobile-talk-link" href="#contact" onClick={onToggleMenu}>Let’s Talk <Arrow /></a></nav>
    <a className="availability" href="#contact"><span /> Open to opportunities</a>
    <button className="mobile-menu-button" onClick={onToggleMenu} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen}>{menuOpen ? '×' : '☰'}</button>
  </header>
}

function ProjectCard({ project, onOpen }) {
  return <article className={'project-card project-' + project.id + ' motion-reveal'}>
    <button className="project-image" onClick={() => onOpen(project.id)} aria-label={`Open ${project.title} case study`}>
      <img src={project.image} alt={project.alt} loading="lazy" />
      <span className="image-open">View case study <Arrow diagonal /></span>
    </button>
    <div className="project-copy">
      <div className="project-meta"><span>{project.number} / {project.kind}</span></div>
      <button className="project-title" onClick={() => onOpen(project.id)}><h3>{project.title}<Arrow diagonal /></h3></button>
      <p className="project-subtitle">{project.subtitle}</p>
      <p className="project-description">{project.description}</p>
      <div className="tag-list">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
      <button className="case-link" onClick={() => onOpen(project.id)}>Read case study <Arrow /></button>
    </div>
  </article>
}

function Home({ onOpen, menuOpen, onToggleMenu }) {
  useEffect(() => {
    const elements = document.querySelectorAll('.motion-reveal')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14 })
    elements.forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])
  return <>
    <Header menuOpen={menuOpen} onToggleMenu={onToggleMenu} />
    <main id="top">
      <section className="hero page-wrap">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> FRONTEND DEVELOPER · INDONESIA</p>
          <h1>Building<br /><em>useful</em> things<br />for real people<span className="accent">.</span></h1>
          <p className="hero-description">I’m a front-end developer who enjoys turning ideas into clean, functional, and user-friendly web applications using React, Vite, and Tailwind CSS.</p>
          <div className="hero-actions"><a className="button button-dark" href="#work">View My Work <Arrow /></a><a className="button button-outline" href="#contact">Download CV</a></div>
        </div>
        <aside className="hero-aside" aria-label="Portfolio overview">
          <div className="hero-index">PORTFOLIO<br />2026 — 2027</div>
          <div className="hero-photo"><img src="/images/20220919_184107_296.jpg" alt="Developer looking over a misty landscape" /><span className="blue-orb" /><span className="hero-scribble">Problem<br />Solve<br />Build<br />Improve</span><span className="origin-note">Based in<br />Indonesia</span></div>
          <p>Building at the intersection of useful products and clear interfaces.</p>
        </aside>
        <div className="hero-bottom"><span>SELECTED WORK / 2024—2026</span><a href="#work">SCROLL TO EXPLORE ↓</a></div>
      </section>

      <section id="work" className="work-section section-wrap">
        <div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Projects with a purpose<span className="accent">.</span></h2></div><p>A selection of independent builds and collaborative work, with the focus on the decisions and contribution behind each one.</p></div>
        <div className="project-list">{projects.map(project => <ProjectCard key={project.id} project={project} onOpen={onOpen} />)}</div>
      </section>

      <section className="notes-section">
        <div className="section-wrap">
          <div className="section-heading"><div><p className="eyebrow">02 / ENGINEERING NOTES</p><h2>What I like solving<span className="accent">.</span></h2></div><p>Beyond the interface, I’m interested in how data, application logic, and product workflows fit together.</p></div>
          <div className="notes-grid">
          <article className="motion-reveal"><span className="note-number">01</span><div><p className="eyebrow">SEMANTIC SEARCH</p><h3>Comparing meaning, not just words.</h3><p>For BimbinganOS, a fine-tuned Sentence Transformers model helps surface thesis titles with similar meaning, even when their wording differs.</p><span className="note-foot">Python · FastAPI · MiniLM</span></div></article>
          <article className="motion-reveal"><span className="note-number">02</span><div><p className="eyebrow">API-DRIVEN UI</p><h3>Making external data feel at home.</h3><p>Zenin News connects article search data to topic feeds, search results, and saved-article interactions in a coherent frontend.</p><span className="note-foot">React · Axios · Redux Toolkit</span></div></article>
          </div>
        </div>
      </section>

      <section id="about" className="about-section section-wrap motion-reveal">
        <div className="about-label"><p className="eyebrow">03 / A LITTLE ABOUT ME</p><span className="about-mark">Z<span>.</span></span></div>
        <div className="about-copy"><h2>Curious about technology, focused on real impact<span className="accent">.</span></h2><p>I’m a front-end developer with a strong interest in building clean, accessible, and user-friendly web applications. I enjoy learning new things, solving problems, and turning ideas into real products.</p><p>I value clear communication, practical problem-solving, and continuous learning. I’m looking for opportunities to contribute to a development team while continuing to strengthen my front-end skills.</p><a className="text-link" href="https://github.com/Zerebyakov" target="_blank" rel="noreferrer">More on GitHub <Arrow diagonal /></a></div>
        <div className="about-photo"><img src="/images/20220919_184107_296.jpg" alt="" /><span>A good product<br />starts with a clear<br />understanding of<br />the problem.</span></div>
      </section>

      <section className="toolkit-section section-wrap motion-reveal">
        <div className="section-heading"><div><p className="eyebrow">04 / TOOLKIT & BACKGROUND</p><h2>Tools I work with<span className="accent">.</span></h2></div><p>A practical toolkit shaped by projects. No arbitrary skill bars—just technologies I’ve used and the areas I’m continuing to develop.</p></div>
        <div className="skill-groups">{skillGroups.map(([label, items]) => <div className="skill-row" key={label}><h3>{label}</h3><div className="skill-items">{items.map(item => <span key={item}>{item}</span>)}</div></div>)}</div>
      </section>

      <section id="contact" className="contact-section">
        <div className="section-wrap"><p className="eyebrow">05 / LET’S CONNECT</p><div className="contact-main"><h2>Open to opportunities<br />and interesting projects<span className="accent">.</span></h2><p>Feel free to reach out if you have a question, a project idea, or just want to say hi.</p><a className="button button-light" href="mailto:YOUR_EMAIL@example.com">Email me <Arrow diagonal /></a></div><div className="contact-links"><a href="https://github.com/Zerebyakov" target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a><span>Resume link to be added</span></div></div>
      </section>
    </main>
    <footer className="site-footer page-wrap"><a className="wordmark" href="#top">Z<span>.</span></a><p>Designed with intent. Built with React.</p><span>© 2026</span></footer>
  </>
}

function CaseStudy({ project, onBack }) {
  useEffect(() => { document.title = `${project.title} — Selected Work`; window.scrollTo(0, 0); return () => { document.title = 'Portfolio — Frontend Developer' } }, [project])
  return <main className="case-study page-wrap">
    <button className="back-link" onClick={onBack}><Arrow /> All selected work</button>
    <div className="case-intro"><p className="eyebrow">{project.number} / {project.kind}</p><h1>{project.title}<span className="accent">.</span></h1><p className="case-lede">{project.subtitle}</p><p className="case-description">{project.description}</p></div>
    <figure className="case-image"><img src={project.image} alt={project.alt} /><figcaption>Original project screenshot</figcaption></figure>
    <div className="case-meta-grid"><div><p className="eyebrow">MY CONTRIBUTION</p><p>{project.role}</p></div><div><p className="eyebrow">TECHNOLOGIES</p><div className="tag-list">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div></div></div>
    <section className="case-details">{project.sections.map(([heading, body], i) => <article className="case-detail" key={heading}><p className="eyebrow">0{i + 1}</p><div><h2>{heading}</h2><p>{body}</p></div></article>)}</section>
    <a className="text-link" href={project.repo} target="_blank" rel="noreferrer">Explore repository <Arrow diagonal /></a>
    <div className="next-project"><p className="eyebrow">KEEP EXPLORING</p><button onClick={onBack}>Back to the full portfolio <Arrow /></button></div>
  </main>
}

export default function App() {
  const [activeProject, setActiveProject] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const openProject = id => { setActiveProject(projects.find(project => project.id === id) ?? null); window.history.pushState({ project: id }, '', `#work/${id}`) }
  const goHome = () => { setActiveProject(null); window.history.pushState({}, '', window.location.pathname); document.title = 'Portfolio — Frontend Developer'; window.scrollTo(0, 0) }
  useEffect(() => {
    const syncRoute = () => { const id = window.location.hash.startsWith('#work/') ? window.location.hash.slice(6) : null; setActiveProject(projects.find(project => project.id === id) ?? null) }
    window.addEventListener('popstate', syncRoute); window.addEventListener('hashchange', syncRoute); syncRoute()
    return () => { window.removeEventListener('popstate', syncRoute); window.removeEventListener('hashchange', syncRoute) }
  }, [])
  return activeProject ? <CaseStudy project={activeProject} onBack={goHome} /> : <Home onOpen={openProject} menuOpen={menuOpen} onToggleMenu={() => setMenuOpen(open => !open)} />
}
