
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BrainCircuit,
  Code2,
  ShieldCheck,
  BarChart3,
  Palette,
  BriefcaseBusiness,
  Sparkles,
  Menu,
  X,
  CheckCircle2,
  GraduationCap,
  Target,
} from 'lucide-react'
import { submitCareerAssessment } from './api'
import './App.css'

const careers = [
  { name: 'AI / ML Engineer', icon: BrainCircuit, color: '#67e8f9', skills: 'Python, AI, Mathematics' },
  { name: 'Software Developer', icon: Code2, color: '#93c5fd', skills: 'Programming, Algorithms, Development' },
  { name: 'Cybersecurity Analyst', icon: ShieldCheck, color: '#c4b5fd', skills: 'Networks, Security, Problem Solving' },
  { name: 'Data Scientist', icon: BarChart3, color: '#6ee7b7', skills: 'Statistics, Data Analysis, Python' },
  { name: 'UI/UX Designer', icon: Palette, color: '#f0abfc', skills: 'Design, Creativity, User Research' },
  { name: 'Business / Data Analyst', icon: BriefcaseBusiness, color: '#fcd34d', skills: 'Analysis, Communication, Business' },
]

const questions = [
  {
    title: 'Which activity interests you most?',
    options: [
      'Building software and applications',
      'Working with AI and intelligent systems',
      'Analyzing data and patterns',
      'Protecting systems and information',
      'Designing user experiences',
      'Solving business problems',
    ],
  },
  {
    title: 'What is your strongest skill?',
    options: [
      'Programming and logic',
      'Mathematics and analytical thinking',
      'Research and investigation',
      'Creativity and visual design',
      'Communication and planning',
    ],
  },
  {
    title: 'What would you enjoy learning?',
    options: [
      'Web and application development',
      'Machine learning and AI',
      'Data science and statistics',
      'Cybersecurity and networking',
      'Product and interface design',
    ],
  },
]

type Recommendation = {
  career: string
  match_percentage: number
  matched_keywords: string[]
  skills: string[]
  description: string
}

type AssessmentResponse = {
  message: string
  interests: string[]
  skills: string[]
  recommendations: Recommendation[]
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [results, setResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [apiResponse, setApiResponse] = useState<AssessmentResponse | null>(null)

  function startAssessment() {
    setStarted(true)
    setResults(false)
    setStep(0)
    setAnswers([])
    setApiError('')
    setApiResponse(null)
    setMenuOpen(false)

    setTimeout(() => {
      document.getElementById('assessment')?.scrollIntoView({
        behavior: 'smooth',
      })
    }, 100)
  }

  function choose(option: string) {
    setAnswers(previous => {
      const next = [...previous]
      next[step] = option
      return next
    })
  }

  async function finishAssessment() {
    setLoading(true)
    setApiError('')
    setApiResponse(null)

    try {
      // Submit the user's selected answers to Flask.
      const response = await submitCareerAssessment(answers, [])
      setApiResponse(response)
      setResults(true)
      setStarted(false)

      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }, 150)
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : 'Could not connect to CareerGuide. Make sure Flask is running.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <nav className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon"><BrainCircuit size={22} /></span>
          <span>
            Career<span className="accent">Guide</span>
            <small>CAREER INTELLIGENCE</small>
          </span>
        </a>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#careers" onClick={() => setMenuOpen(false)}>Explore Careers</a>
          <a href="#how" onClick={() => setMenuOpen(false)}>How It Works</a>
          <button className="nav-cta" onClick={startAssessment}>
            Start Assessment <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-grid" />
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />

        <div className="hero-content">
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles size={15} /> YOUR FUTURE, MORE FOCUSED
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Discover your<br />next <span>career move.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Find a direction that aligns with your interests, skills, and ambitions.
            Make your next career decision with greater clarity.
          </motion.p>

          <div className="hero-actions">
            <button className="primary-btn" onClick={startAssessment}>
              Discover Your Path <ArrowRight size={18} />
            </button>
            <a className="secondary-btn" href="#careers">Explore career paths</a>
          </div>

          <div className="hero-proof">
            <div className="proof-icon"><Target size={19} /></div>
            <div>
              <strong>Rule-based career guidance</strong>
              <span>Recommendations guided by your answers</span>
            </div>
          </div>
        </div>

        <motion.div
          className="orbit-scene"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="orbit orbit-a" />
          <div className="orbit orbit-b" />
          <div className="orbit orbit-c" />
          <div className="orb-core"><BrainCircuit size={76} strokeWidth={1.1} /></div>
          <div className="float-card float-ai"><BrainCircuit size={19} /><span>Artificial Intelligence</span></div>
          <div className="float-card float-data"><BarChart3 size={19} /><span>Data & Insights</span></div>
          <div className="float-card float-code"><Code2 size={19} /><span>Software Development</span></div>
          <div className="scene-caption">EXPLORE YOUR POTENTIAL <span>✳</span></div>
        </motion.div>

        <a className="scroll-cue" href="#careers"><span /> Scroll to explore</a>
      </section>

      <section className="section careers-section" id="careers">
        <div className="section-heading">
          <span className="section-label">CAREER POSSIBILITIES</span>
          <h2>Explore paths that <span>fit your ambition.</span></h2>
          <p>Explore different fields and discover the kind of work you might enjoy.</p>
        </div>

        <div className="career-grid">
          {careers.map((career, index) => {
            const Icon = career.icon

            return (
              <motion.article
                className="career-card"
                key={career.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
              >
                <div
                  className="career-icon"
                  style={{
                    color: career.color,
                    background: `${career.color}12`,
                    borderColor: `${career.color}30`,
                  }}
                >
                  <Icon size={25} />
                </div>
                <span className="career-number">0{index + 1}</span>
                <h3>{career.name}</h3>
                <p>{career.skills}</p>
                <button className="card-link" onClick={startAssessment}>
                  Explore this path <ArrowRight size={15} />
                </button>
              </motion.article>
            )
          })}
        </div>
      </section>

      <section className="assessment-section" id="assessment">
        <div className="assessment-wrap">
          <div className="assessment-intro">
            <span className="section-label">YOUR NEXT CHAPTER</span>
            <h2>A little clarity can change <span>your direction.</span></h2>
            <p>
              Answer a few questions about your interests and strengths
              to begin exploring career possibilities.
            </p>
            <div className="assessment-point"><CheckCircle2 /> Reflect on your interests</div>
            <div className="assessment-point"><CheckCircle2 /> Identify areas worth exploring</div>
            <div className="assessment-point"><CheckCircle2 /> Get a clearer starting point</div>
          </div>

          <div className="assessment-panel">
            {!started && !results && (
              <div className="assessment-start">
                <div className="panel-symbol"><GraduationCap size={30} /></div>
                <span className="section-label">CAREER DISCOVERY</span>
                <h3>Ready to find your direction?</h3>
                <p>
                  Take a short, three-step self-assessment to explore
                  which career areas may suit your interests.
                </p>
                <button
                  className="primary-btn full-btn"
                  onClick={() => {
                    setStarted(true)
                    setStep(0)
                    setAnswers([])
                    setApiError('')
                    setApiResponse(null)
                  }}
                >
                  Begin assessment <ArrowRight size={17} />
                </button>
                <small>3 questions · About 2 minutes</small>
              </div>
            )}

            {started && (
              <div className="question-box">
                <div className="question-top">
                  <span>QUESTION {step + 1} OF {questions.length}</span>
                  <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                  />
                </div>

                <h3>{questions[step].title}</h3>

                <div className="answer-options">
                  {questions[step].options.map(option => (
                    <button
                      key={option}
                      className={`answer-option ${answers[step] === option ? 'selected' : ''}`}
                      onClick={() => choose(option)}
                      disabled={loading}
                    >
                      <span>{option}</span>
                      <span className="option-radio">
                        {answers[step] === option ? '✓' : ''}
                      </span>
                    </button>
                  ))}
                </div>

                {apiError && (
                  <p role="alert" style={{ color: '#f87171' }}>{apiError}</p>
                )}

                <div className="question-controls">
                  <button
                    className="back-btn"
                    disabled={step === 0 || loading}
                    onClick={() => setStep(previous => previous - 1)}
                  >
                    Back
                  </button>

                  <button
                    className="primary-btn"
                    disabled={!answers[step] || loading}
                    onClick={() => {
                      if (step < questions.length - 1) {
                        setStep(previous => previous + 1)
                      } else {
                        finishAssessment()
                      }
                    }}
                  >
                    {loading
                      ? 'Generating guidance...'
                      : step === questions.length - 1
                        ? 'View guidance'
                        : 'Continue'}
                    {!loading && <ArrowRight size={16} />}
                  </button>
                </div>
              </div>
            )}

            {results && (
              <div className="assessment-start result-start" id="results">
                <div className="panel-symbol"><Sparkles size={28} /></div>
                <span className="section-label">YOUR CAREER GUIDANCE</span>
                <h3>Your potential career matches</h3>
                <p>{apiResponse?.message}</p>

                {apiResponse?.recommendations?.length ? (
                  <div className="recommendation-list">
                    {apiResponse.recommendations.map((item, index) => (
                      <article
                        key={item.career}
                        className="career-card recommendation-card"
                      >
                        <span className="career-number">MATCH {index + 1}</span>
                        <h3>{item.career}</h3>

                        <p>
                          <strong>{item.match_percentage}% keyword match</strong>
                        </p>

                        <div
                          className="progress-track"
                          aria-label={`${item.match_percentage}% keyword match`}
                        >
                          <div
                            className="progress-fill"
                            style={{
                              width: `${Math.min(100, Math.max(0, item.match_percentage))}%`,
                            }}
                          />
                        </div>

                        <p>{item.description}</p>

                        <p>
                          <strong>Skills to explore:</strong>{' '}
                          {item.skills.join(', ')}
                        </p>

                        {item.matched_keywords.length > 0 && (
                          <p>
                            <strong>Matched keywords:</strong>{' '}
                            {item.matched_keywords.join(', ')}
                          </p>
                        )}
                      </article>
                    ))}
                  </div>
                ) : (
                  <p>No recommendations were returned. Please try again.</p>
                )}

                <p>
                  Match percentages represent keyword overlap in this
                  prototype. They are not validated measures of career aptitude.
                </p>

                <button className="primary-btn full-btn" onClick={startAssessment}>
                  Retake assessment <ArrowRight size={17} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section process-section" id="how">
        <div className="section-heading">
          <span className="section-label">A CLEARER PROCESS</span>
          <h2>From questions to <span>possibilities.</span></h2>
          <p>A simple starting framework for your career exploration.</p>
        </div>

        <div className="process-grid">
          {[
            { n: '01', title: 'Reflect', desc: 'Think about the tasks, subjects, and problems that interest you.' },
            { n: '02', title: 'Explore', desc: 'Review different career fields and the skills they commonly involve.' },
            { n: '03', title: 'Plan', desc: 'Choose an area to investigate and identify a practical next learning step.' },
          ].map(item => (
            <article className="process-card" key={item.n}>
              <span>{item.n}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="closing-cta">
        <div className="closing-glow" />
        <div className="closing-content">
          <span className="section-label">
            <Sparkles size={14} /> YOUR FUTURE STARTS WITH A QUESTION
          </span>
          <h2>Make your next move <span>with intention.</span></h2>
          <p>Start exploring your strengths and the opportunities ahead.</p>
          <button className="primary-btn" onClick={startAssessment}>
            Start your assessment <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#home">
          <span className="brand-icon"><BrainCircuit size={20} /></span>
          <span>
            Career<span className="accent">Guide</span>
            <small>CAREER INTELLIGENCE</small>
          </span>
        </a>
        <span>Explore your options. Make informed decisions.</span>
        <a href="#home" className="back-top">Back to top ↑</a>
      </footer>
    </main>
  )
}

export default App
