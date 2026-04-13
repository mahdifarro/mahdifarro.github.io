import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const academicExperiences = [
  {
    title: "Research Assistant at Multisensory Studio (MSS)",
    org: "University of Calgary",
    startDate: "Oct 2025",
    endDate: "Present",
    bullets: [
      "Developed and deployed full-stack web applications.",
      "Designed and implemented backend APIs to support application functionality and data flow.",
      "Built and managed user databases, enabling secure storage and efficient data retrieval.",
      "Leveraged AWS services and large language models (LLMs) to automate document processing workflows, increasing the speed of legal case handling."
    ],
    type: "academic"
  },
  {
    title: "Research Assistant at Serious Games Research Group",
    org: "Calgary, Canada",
    startDate: "Sep 2023",
    endDate: "Apr 2026",
    bullets: [
      "Designed and implemented an automated PCG repair pipeline using Python, C#, and machine learning models.",
      "Developed ML-based techniques to detect and correct structural instabilities in generated game content, improving generation efficiency by 45%.",
      "Publications: AIIDE 2025, AIIDE 2024, AVI 2024 Workshop."
    ],
    type: "academic"
  },
  {
    title: "Research Assistant at APA AI Lab",
    org: "University of Tabriz",
    startDate: "Feb 2022",
    endDate: "Aug 2023",
    bullets: [
      "Conducted research on policy-driven active learning combined with pseudo-labeling using Python and PyTorch."
    ],
    type: "academic"
  }
];

const industryExperiences = [
  {
    title: "GIS R&D Intern at City of Calgary",
    org: "Calgary, Canada",
    startDate: "May 2024",
    endDate: "Sep 2025",
    bullets: [
      "Worked as part of an R&D and technical team on Digital Twin systems and their real-world applications.",
      "Developed simulation and analysis tools using ArcGIS to support urban data insights.",
      "Generated 3D models from aerial imagery and integrated them into ArcGIS and Unity for visualization.",
      "Worked with city-scale databases to process and manage geospatial data."
    ],
    type: "industry"
  },
  {
    title: "Game Developer at Unipoly Games",
    org: "Istanbul, Turkey",
    startDate: "Sep 2021",
    endDate: "Jan 2022",
    bullets: [
      "Developed mobile games for iOS and Android using C# and Unity in an Agile environment."
    ],
    type: "industry"
  },
  {
    title: "Game Developer at Moraba Games",
    org: "Tehran, Iran",
    startDate: "Feb 2021",
    endDate: "Aug 2021",
    bullets: [
      "Developed hyper-casual mobile games with a focus on rapid prototyping and iteration.",
      "Optimized ad placement and user experience, increasing ad revenue by ~40%."
    ],
    type: "industry"
  }
];

const allExperiences = [...academicExperiences, ...industryExperiences].sort((a, b) => {
  const dateA = new Date(a.startDate);
  const dateB = new Date(b.startDate);
  return dateB - dateA;
});

// Ensure public asset paths respect Vite base (e.g., GitHub Pages)
const base = import.meta.env.BASE_URL || "/";

const projects = [
  {
    name: "Churn Prediction Pipeline",
    blurb:
      "End-to-end churn ML pipeline with preprocessing, training, and evaluation; tracked in MLflow; deployed via FastAPI + Docker with CI/CD.",
    description: "• Built a complete ML pipeline including preprocessing, training, and evaluation using Scikit-learn.\n• Deployed the system using FastAPI and Docker, tracked experiments with MLflow.\n• Integrated CI/CD with GitHub Actions for automated testing and deployment.",
    tags: ["FastAPI", "Docker", "MLflow", "CI/CD"],
    link: "https://github.com/mahdifarro/churn-prediction",
    image: `${base}churn_prediction_architecture_whitebg.svg`
  },
  {
    name: "Personal Portfolio",
    blurb: "Responsive portfolio website showcasing projects, experiences, and publications; built with React, Vite, and GSAP animations.",
    description: "• Built a modern, responsive portfolio website using React and Vite with smooth animations powered by GSAP.\n• Implemented dark/light theme toggle with smooth transitions and accent colors.\n• Deployed on GitHub Pages with smooth scrolling, project spotlight drawer, and comprehensive experience timeline.",
    tags: ["React", "Vite", "GSAP", "CSS", "GitHub Pages"],
    link: "https://github.com/mahdifarro/mahdifarro.github.io",
    image: `${base}website.png`
  },
  {
    name: "LLM Text Summarizer",
    blurb: "Llama + LangChain summarizer with prompt chaining for factuality; exposed as FastAPI service; containerized for deploys.",
    description: "• Built a text summarization tool using Llama models and LangChain.\n• Applied prompt engineering and chaining techniques to improve factual accuracy and coherence.\n• Deployed as a FastAPI REST service containerized with Docker.",
    tags: ["Llama", "LangChain", "FastAPI", "Docker"],
    link: "https://github.com/mahdifarro",
    image: `${base}llm_text.png`
  },
  {
    name: "Stock Market Prediction",
    blurb: "Time-series + technical indicators with news sentiment (Selenium/BS4) to correlate signals; Python-based modeling.",
    description: "• Developed a model to predict stock market trends using historical data, technical indicators, and time-series analysis.\n• Scraped financial news from Investing.com using Selenium and BeautifulSoup.\n• Applied sentiment analysis and correlated results with market movements.",
    tags: ["Python", "Time-series", "Sentiment", "Selenium"],
    link: "https://github.com/mahdifarro/stock_market_prediction",
    image: `${base}time_series_analysis.png`
  },
  {
    name: "Legal Document Extraction Platform",
    blurb: "Full-stack platform for extracting structured legal data from court awards using AWS Textract, Bedrock, and LLMs.",
    description:
      "• Built a full-stack legal document extraction platform to process court awards and populate structured legal templates automatically.\n" +
      "• Integrated OCR and LLM pipelines using AWS Textract and Bedrock to extract structured legal information from unstructured documents.\n" +
      "• Implemented secure user authentication and database-backed storage for accounts, uploaded files, and generated legal records.",
    tags: ["Python", "AWS Textract", "AWS Bedrock", "LangChain", "Gradio", "PostgreSQL"],
    link: "https://mahdifarro.github.io/#projects",
    image: `${base}legal_website.png`
  },
  {
    name: "RL Agents: Humming Bird & Flappy Bird",
    blurb: "Reinforcement/imitation learning agents using Unity ML-Agents; focused on flight stability and control.",
    description: "• Developed reinforcement learning agents using imitation learning and Unity ML-Agents.\n• Focused on training agents for flight stability and control in challenging game environments.",
    tags: ["RL", "Unity", "ML-Agents", "C#"],
    link: "https://github.com/mahdifarro/Humming-Bird-AI",
    image: `${base}humming_bird.png`
  },
  {
    name: "Face Segmentation App",
    blurb: "Real-time mobile face segmentation in Unity with TensorFlow; optimized for on-device use.",
    description: "• Built a real-time face segmentation mobile application using Unity and TensorFlow.\n• Optimized for on-device inference to provide smooth, low-latency segmentation performance on mobile platforms.",
    tags: ["Unity", "TensorFlow", "Mobile"],
    link: "https://github.com/mahdifarro/image-segmentation-unity",
    image: `${base}face_segmen.png`
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
  { id: "honors", label: "Honors" },
  { id: "contact", label: "Contact" }
];

const cvLink = `${base}Mahdi_Farrokhimaleki resume.pdf`;

function App() {
  const heroRef = useRef(null);
  const heroHeadlineRef = useRef(null);
  const heroCtaRef = useRef(null);
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [theme, setTheme] = useState("dark");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync theme classes to body; default is dark, user can toggle
  useEffect(() => {
    document.body.classList.toggle("theme-light", theme === "light");
    document.body.classList.toggle("theme-dark", theme === "dark");
  }, [theme]);

  // Show scroll-to-top button when scrolled past about section
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <button
          className={`theme-toggle ${theme === "light" ? "theme-toggle--light" : "theme-toggle--dark"}`}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          onClick={() => {
            const next = theme === "dark" ? "light" : "dark";
            setTheme(next);
            document.body.classList.toggle("theme-light", next === "light");
            document.body.classList.toggle("theme-dark", next === "dark");
          }}
        >
          <span className="theme-toggle__emoji theme-toggle__emoji-light" aria-hidden="true">🌞</span>
          <span className="theme-toggle__emoji theme-toggle__emoji-dark" aria-hidden="true">🌙</span>
          <span className="sr-only">{theme === "dark" ? "Light mode" : "Dark mode"}</span>
        </button>
      </header>

      <main>
        <section id="hero" className="hero" ref={heroRef}>
          <div className="hero__content">
            <p className="eyebrow" ref={heroHeadlineRef}>
              ML Engineer · Software Developer
            </p>
            <h1>Mahdi Farrokhimaleki</h1>
            <p className="lede">
              Exploring, building, and learning new things.
            </p>
            <div className="hero__meta">
              <a className="meta-chip link" href="mailto:mahdifarro@gmail.com">mahdifarro@gmail.com</a>
            </div>
            <div className="hero__cta" ref={heroCtaRef}>
              <a className="btn ghost" href="#projects">View work</a>
              <a className="btn ghost" href="#contact">Get in touch</a>
              <a className="btn btn--cv" href={cvLink} download aria-label="Download CV">Download CV</a>
            </div>
          </div>
          <div className="hero__badge">
            <span className="dot" />
            <span>Open to work</span>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section__title">About</div>
          <div className="section__body">
            <p>
              Machine Learning and Software Engineer with an M.Sc. in Computer Science,
              focused on data-driven systems and applied AI. Experienced in building end-to-end machine learning pipelines
              and user-facing applications across web and cloud platforms, with strong emphasis on scalability, performance, and maintainability.
            </p>
            <div className="skills-section">
              <div className="skill-category">
                <h4>Programming Languages</h4>
                <div className="pillrow">
                  <span className="pill">Python</span>
                  <span className="pill">C++</span>
                  <span className="pill">C#</span>
                  <span className="pill">Java</span>
                  <span className="pill">JavaScript</span>
                  <span className="pill">HTML</span>
                  <span className="pill">SQL</span>
                </div>
              </div>
              <div className="skill-category">
                <h4>ML & Applied AI</h4>
                <div className="pillrow">
                  <span className="pill">PyTorch</span>
                  <span className="pill">TensorFlow</span>
                  <span className="pill">Scikit-learn</span>
                  <span className="pill">Computer Vision</span>
                  <span className="pill">Natural Language Processing</span>
                  <span className="pill">Reinforcement Learning</span>
                  <span className="pill">LLMs</span>
                  <span className="pill">Signal Processing</span>
                  <span className="pill">LangChain</span>
                  <span className="pill">Gradio</span>
                </div>
              </div>
              <div className="skill-category">
                <h4>Web Development</h4>
                <div className="pillrow">
                  <span className="pill">React</span>
                  <span className="pill">FastAPI</span>
                  <span className="pill">REST APIs</span>
                  <span className="pill">Full-Stack Development</span>
                </div>
              </div>
              <div className="skill-category">
                <h4>Data & Libraries</h4>
                <div className="pillrow">
                  <span className="pill">NumPy</span>
                  <span className="pill">Pandas</span>
                  <span className="pill">OpenCV</span>
                  <span className="pill">Matplotlib</span>
                  <span className="pill">Tableau</span>
                </div>
              </div>
              <div className="skill-category">
                <h4>Databases</h4>
                <div className="pillrow">
                  <span className="pill">PostgreSQL</span>
                  <span className="pill">MongoDB</span>
                  <span className="pill">MySQL</span>
                  <span className="pill">PostGIS</span>
                </div>
              </div>
              <div className="skill-category">
                <h4>Cloud & DevOps</h4>
                <div className="pillrow">
                  <span className="pill">Docker</span>
                  <span className="pill">CI/CD (GitHub Actions)</span>
                  <span className="pill">AWS</span>
                  <span className="pill">Azure</span>
                  <span className="pill">MLflow</span>
                  <span className="pill">Kubernetes</span>
                  <span className="pill">AWS S3</span>
                  <span className="pill">AWS EC2</span>
                  <span className="pill">AWS Textract</span>
                  <span className="pill">AWS Bedrock</span>
                </div>
              </div>
              <div className="skill-category">
                <h4>Software Engineering</h4>
                <div className="pillrow">
                  <span className="pill">Object-Oriented Design</span>
                  <span className="pill">Testing</span>
                  <span className="pill">Debugging</span>
                  <span className="pill">Performance Optimization</span>
                  <span className="pill">Agile Development</span>
                  <span className="pill">Git</span>
                </div>
              </div>
              <div className="skill-category">
                <h4>Game Development & Tools</h4>
                <div className="pillrow">
                  <span className="pill">Unity</span>
                  <span className="pill">Unreal Engine</span>
                  <span className="pill">Unity ML-Agents</span>
                  <span className="pill">Blender</span>
                  <span className="pill">ArcGIS</span>
                  <span className="pill">Linux</span>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section id="projects" className="section">
          <div className="section__title">Projects</div>
          <div className="projects">
            <div className="projects__drawer" aria-live="polite">
              {activeProject?.image && (
                <img src={activeProject.image} alt={activeProject.name} className="project-image" />
              )}
              <h4>{activeProject?.name}</h4>
              <a className="link" href={activeProject?.link} target="_blank" rel="noreferrer">
                View on GitHub →
              </a>
              <p>{activeProject?.description}</p>
              <div className="tags">
                {activeProject?.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div>
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
                    {project.image && <img src={project.image} alt={project.name} className="card-image" />}
                    <a className="card-github-link" href={project.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                      View on GitHub →
                    </a>
                    <div className="card-description">{project.description}</div>
                    <p className="card-blurb">{project.blurb}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="work-experiences" className="section">
          <div className="section__title">Work Experiences</div>
          <div className="section__body">
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
                              <p className="timeline-card-date">{exp.startDate} – {exp.endDate}</p>
                              <p>{exp.org}</p>
                              <ul className="experience-bullets">
                                {exp.bullets.map((bullet, i) => (
                                  <li key={i} className="muted">{bullet}</li>
                                ))}
                              </ul>
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
                              <p className="timeline-card-date">{exp.startDate} – {exp.endDate}</p>
                              <p>{exp.org}</p>
                              <ul className="experience-bullets">
                                {exp.bullets.map((bullet, i) => (
                                  <li key={i} className="muted">{bullet}</li>
                                ))}
                              </ul>
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

        <section id="publications" className="section">
          <div className="section__title">Publications</div>
          <div className="section__body">
            <div className="list">
              {publications.map((pub, idx) => (
                <div key={idx}>
                  <a className="link" href={pub.link} target="_blank" rel="noreferrer">
                    {pub.title}
                  </a>
                  <p style={{ color: "var(--muted)", fontSize: "14px", margin: "4px 0 0 0" }}>
                    {pub.venue}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="honors" className="section">
          <div className="section__title">Honors</div>
          <div className="section__body">
            <div className="list">
              <div>Faculty of Graduate Studies International Master's Scholarship</div>
              <div>International Graduate Tuition Award</div>
              <div>Mitacs Business Strategy Internship</div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="section__title">Contact</div>
          <div className="section__body contact">
            <p>Reach out for collaboration, roles, or research conversations.</p>
            <div className="pillrow">
              <a className="pill link" href="mailto:mahdifarro@gmail.com">Email</a>
              <a className="pill link" href="https://www.linkedin.com/in/mahdi-farrokhimaleki/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="pill link" href="https://github.com/mahdifarro" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="pill link" href="tel:+13682990732">Phone</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>Built with React, Vite, and GSAP.</span>
        <span>© {new Date().getFullYear()} Mahdi Farro</span>
      </footer>

      {showScrollTop && (
        <button
          className="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;
