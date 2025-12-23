import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const academicExperiences = [
  {
    title: "Research Assistant at Multisensory Studio (MSS)",
    org: "University of Calgary",
    startDate: "Oct 2025",
    detail: "Marking an exciting transition in research journey, exploring new directions in multisensory computing.",
    type: "academic"
  },
  {
    title: "Research Assistant at Serious Games Research Group",
    org: "University of Calgary",
    startDate: "Sep 2023",
    detail: "AI for procedural content generation; AIIDE '25/'24, AVI '24; PCG repair pipeline with ~45% efficiency lift.",
    type: "academic"
  },
  {
    title: "Research Assistant at APA AI Lab",
    org: "University of Tabriz",
    startDate: "Feb 2022",
    detail: "Conducted research on and implemented models for Policy-Driven Active Learning combined with pseudo-labeling, utilizing Python and PyTorch.",
    type: "academic"
  }
];

const industryExperiences = [
  {
    title: "GIS R&D Intern at City of Calgary",
    org: "Calgary, Canada",
    startDate: "May 2024",
    detail: "Full-stack planning-data dashboard (JS, PostgreSQL, MongoDB) cutting runtime ~35%; Unity digital twin for city-scale viz.",
    type: "industry"
  },
  {
    title: "Game Developer at Unipoly Games",
    org: "Istanbul, Turkey",
    startDate: "Sep 2021",
    detail: "Shipped iOS/Android titles in Unity/C# within Agile teams.",
    type: "industry"
  },
  {
    title: "Game Developer at Moraba Games",
    org: "Tehran, Iran",
    startDate: "Feb 2021",
    detail: "Developed hyper-casual mobile games; created in-game video player plugin and integrated IAP & analytics services.",
    type: "industry"
  }
];

const allExperiences = [...academicExperiences, ...industryExperiences].sort((a, b) => {
  const dateA = new Date(a.startDate);
  const dateB = new Date(b.startDate);
  return dateB - dateA;
});

const projects = [
  {
    name: "Churn Prediction Pipeline",
    blurb:
      "End-to-end churn ML pipeline with preprocessing, training, and evaluation; tracked in MLflow; deployed via FastAPI + Docker with CI/CD.",
    description: "• Built a complete ML pipeline including preprocessing, training, and evaluation using Scikit-learn.\n• Deployed the system using FastAPI and Docker, tracked experiments with MLflow.\n• Integrated CI/CD with GitHub Actions for automated testing and deployment.",
    tags: ["FastAPI", "Docker", "MLflow", "CI/CD"],
    link: "https://github.com/mahdifarro/churn-prediction"
  },
  {
    name: "LLM Text Summarizer",
    blurb: "Llama + LangChain summarizer with prompt chaining for factuality; exposed as FastAPI service; containerized for deploys.",
    description: "• Built a text summarization tool using Llama models and LangChain.\n• Applied prompt engineering and chaining techniques to improve factual accuracy and coherence.\n• Deployed as a FastAPI REST service containerized with Docker.",
    tags: ["Llama", "LangChain", "FastAPI", "Docker"],
    link: "https://github.com/mahdifarro"
  },
  {
    name: "Stock Market Prediction",
    blurb: "Time-series + technical indicators with news sentiment (Selenium/BS4) to correlate signals; Python-based modeling.",
    description: "• Developed a model to predict stock market trends using historical data, technical indicators, and time-series analysis.\n• Scraped financial news from Investing.com using Selenium and BeautifulSoup.\n• Applied sentiment analysis and correlated results with market movements.",
    tags: ["Python", "Time-series", "Sentiment", "Selenium"],
    link: "https://github.com/mahdifarro/stock_market_prediction"
  },
  {
    name: "RL Agents: Humming Bird & Flappy Bird",
    blurb: "Reinforcement/imitation learning agents using Unity ML-Agents; focused on flight stability and control.",
    description: "• Developed reinforcement learning agents using imitation learning and Unity ML-Agents.\n• Focused on training agents for flight stability and control in challenging game environments.",
    tags: ["RL", "Unity", "ML-Agents", "C#"],
    link: "https://github.com/mahdifarro/Humming-Bird-AI"
  },
  {
    name: "Face Segmentation App",
    blurb: "Real-time mobile face segmentation in Unity with TensorFlow; optimized for on-device use.",
    description: "• Built a real-time face segmentation mobile application using Unity and TensorFlow.\n• Optimized for on-device inference to provide smooth, low-latency segmentation performance on mobile platforms.",
    tags: ["Unity", "TensorFlow", "Mobile"],
    link: "https://github.com/mahdifarro/image-segmentation-unity"
  }
];

const publications = [
  {
    title: "From Unstable to Playable: Stabilizing Angry Birds Levels via Object Segmentation",
    venue: "AIIDE 2025",
    link: "https://ojs.aaai.org/index.php/AIIDE/article/view/36826"
  },
  {
    title: "Procedural Content Generation in Games: A Survey with Insights on Emerging LLM Integration",
    venue: "AIIDE 2024",
    link: "https://ojs.aaai.org/index.php/AIIDE/article/view/31877"
  },
  {
    title: "Exploring the Potential of Generative AI in Prototyping XR Applications",
    venue: "AVI 2024 Workshop",
    link: "https://cspages.ucalgary.ca/~richard.zhao1/publications/2024realxr-ai-xr.pdf"
  }
];

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "publications", label: "Publications" },
  { id: "cv", label: "CV" },
  { id: "honors", label: "Honors" },
  { id: "contact", label: "Contact" }
];

const cvLink = "/Mahdi-Farrokhimaleki-Resume.pdf";

function App() {
  const heroRef = useRef(null);
  const heroHeadlineRef = useRef(null);
  const heroCtaRef = useRef(null);
  const [activeProject, setActiveProject] = useState(projects[0]);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(heroHeadlineRef.current, { y: 30, opacity: 0, duration: 0.8 })
        .from(heroCtaRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.4");

      gsap.from(heroRef.current, {
        opacity: 0.7,
        scale: 0.98,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const projectList = useMemo(() => projects, []);

  return (
    <div className="page">
      <header className="nav">
        <div className="logo">MF</div>
        <nav>
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section id="hero" className="hero" ref={heroRef}>
          <div className="hero__content">
            <p className="eyebrow" ref={heroHeadlineRef}>
              Research Assistant · ML Engineer · Software Developer
            </p>
            <h1>Mahdi Farrokhimaleki</h1>
            <p className="lede">
              Building applied AI and full-stack systems with a focus on reliability, performance, and clean delivery.
            </p>
            <div className="hero__meta">
              <span className="meta-chip">Calgary, Canada</span>
              <span className="meta-chip">+1 368 299 0732</span>
              <a className="meta-chip link" href="mailto:mahdifarro@gmail.com">mahdifarro@gmail.com</a>
              <a className="meta-chip link" href="https://www.linkedin.com/in/mahdifarrokhimaleki/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
            <div className="hero__cta" ref={heroCtaRef}>
              <a className="btn" href="#projects">View work</a>
              <a className="btn ghost" href="#contact">Get in touch</a>
            </div>
          </div>
          <div className="hero__badge">
            <span>Open to work</span>
            <span className="dot" />
            <span>Remote / Hybrid / In-person</span>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section__title">About</div>
          <div className="section__body">
            <p>
              Machine Learning and Software Engineer (M.Sc. Computer Science) building user-facing software across web,
              cloud, and applied AI. Hands-on with designing, testing, debugging, and deploying end-to-end systems using
              FastAPI, Docker, and cloud platforms, with a focus on quality, performance, and maintainability.
            </p>
            <div className="pillrow">
              <span className="pill">Python</span>
              <span className="pill">C++</span>
              <span className="pill">FastAPI</span>
              <span className="pill">React</span>
              <span className="pill">Docker</span>
              <span className="pill">CI/CD (GitHub Actions)</span>
              <span className="pill">PyTorch</span>
              <span className="pill">TensorFlow</span>
              <span className="pill">PostgreSQL</span>
              <span className="pill">MongoDB</span>
              <span className="pill">LangChain</span>
              <span className="pill">Unity</span>
            </div>
          </div>
        </section>

        <section id="projects" className="section projects">
          <div className="section__title">Projects</div>
          <div className="projects__grid">
            {projectList.map((project) => (
              <article
                key={project.name}
                className={`card ${activeProject?.name === project.name ? "card--active" : ""}`}
                onClick={() => setActiveProject(project)}
              >
                <div className="card__header">
                  <h3>{project.name}</h3>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <p>{project.blurb}</p>
              </article>
            ))}
          </div>
          <div className="projects__drawer" aria-live="polite">
            <div className="drawer__label">Project spotlight</div>
            <h4>{activeProject?.name}</h4>
            <p>{activeProject?.description}</p>
            <div className="tags">
              {activeProject?.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <a className="link" href={activeProject?.link} target="_blank" rel="noreferrer">
              View on GitHub →
            </a>
          </div>
        </section>

        <section id="publications" className="section">
          <div className="section__title">Publications</div>
          <div className="section__body">
            <ul className="list">
              {publications.map((pub) => (
                <li key={pub.title}>
                  <a className="link" href={pub.link} target="_blank" rel="noreferrer">
                    {pub.title}
                  </a> — {pub.venue}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="cv" className="section">
          <div className="section__title">CV</div>
          <div className="section__body">
            <a className="btn" href={cvLink} download aria-label="Download CV">
              Download CV
            </a>
            <div className="timeline-unified">
              <div className="timeline-present-marker">Present</div>
              {allExperiences.map((exp, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div key={exp.title + idx} className={`timeline-item ${isLeft ? 'timeline-item-left' : 'timeline-item-right'}`}>
                    {isLeft ? (
                      <>
                        <div className="timeline-item-content">
                          <div className="timeline__card">
                            <h4>{exp.title}</h4>
                            <div className="timeline__expandable">
                              <p>{exp.org}</p>
                              <p className="muted">{exp.detail}</p>
                            </div>
                          </div>
                        </div>
                        <div className="timeline-date-badge">{exp.startDate}</div>
                        <div className="timeline-center">
                          <div className="timeline-center-node" />
                        </div>
                        <div className="timeline-item-spacer" />
                      </>
                    ) : (
                      <>
                        <div className="timeline-item-spacer" />
                        <div className="timeline-center">
                          <div className="timeline-center-node" />
                        </div>
                        <div className="timeline-date-badge">{exp.startDate}</div>
                        <div className="timeline-item-content">
                          <div className="timeline__card">
                            <h4>{exp.title}</h4>
                            <div className="timeline__expandable">
                              <p>{exp.org}</p>
                              <p className="muted">{exp.detail}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="honors" className="section">
          <div className="section__title">Honors & Achievements</div>
          <div className="section__body">
            <ul className="list">
              <li>
                <strong>Faculty of Graduate Studies International Master's Scholarship</strong> — University of Calgary, Fall 2023
              </li>
              <li>
                <strong>Research Assistant</strong> — Multisensory Studio (MSS), University of Calgary, Fall 2023
              </li>
            </ul>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="section__title">Contact</div>
          <div className="section__body contact">
            <p>Reach out for collaboration, roles, or research conversations.</p>
            <div className="pillrow">
              <a className="pill link" href="mailto:mahdifarro@gmail.com">Email</a>
              <a className="pill link" href="https://github.com/mahdifarro" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="pill link" href="https://www.linkedin.com/in/mahdifarrokhimaleki/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>Built with React, Vite, and GSAP.</span>
        <span>© {new Date().getFullYear()} Mahdi Farro</span>
      </footer>
    </div>
  );
}

export default App;
