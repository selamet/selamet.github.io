import React, { useState, useRef, useCallback } from 'react'
import emailjs from '@emailjs/browser'
import { Play, CheckCircle, XCircle, Send, RotateCcw } from 'lucide-react'

const EMAILJS_SERVICE_ID = process.env.GATSBY_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = process.env.GATSBY_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = process.env.GATSBY_EMAILJS_PUBLIC_KEY

function createStore(reducer) {
  let state = reducer(undefined, { type: '@@INIT' })
  return {
    getState: () => state,
    dispatch: (action) => { state = reducer(state, action) },
  }
}

function runBackendTests(code, testCases) {
  let fn
  let isClass = false
  try {
    // eslint-disable-next-line no-new-func
    const result = new Function('createStore', `
      ${code};
      if (typeof EventEmitter !== 'undefined') return EventEmitter;
      if (typeof todosReducer !== 'undefined') return todosReducer;
      if (typeof getTaskDefinition !== 'undefined') return getTaskDefinition;
      return undefined;
    `)(createStore)
    if (result === undefined) throw new Error('Could not find a class or function to test.')
    fn = result
    isClass = typeof fn === 'function' && /^class\s/.test(fn.toString())
  } catch (e) {
    return { parseError: e.message }
  }

  return testCases.map((tc) => {
    try {
      isClass ? tc.run(fn) : tc.run(fn, createStore)
      return { description: tc.description, passed: true }
    } catch (e) {
      return { description: tc.description, passed: false, error: e.message }
    }
  })
}

export function PuzzleChallenge({ project, onClose, lang = 'en' }) {
  const { puzzle } = project
  const description = typeof puzzle.description === 'object'
    ? (puzzle.description[lang] || puzzle.description.en)
    : puzzle.description
  const isIdea = puzzle.type === 'idea'

  const [code, setCode] = useState(puzzle.starterCode || '')
  const [results, setResults] = useState(null)
  const [allPassed, setAllPassed] = useState(false)
  const [parseError, setParseError] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [idea, setIdea] = useState('')
  const [submitState, setSubmitState] = useState('idle')

  const iframeRef = useRef(null)
  const textareaRef = useRef(null)
  const lineNumbersRef = useRef(null)
  const lineCount = code.split('\n').length

  const syncScroll = useCallback(() => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }, [])

  function handleRun() {
    setParseError(null)
    const res = runBackendTests(code, puzzle.testCases)
    if (res.parseError) {
      setParseError(res.parseError)
      setResults(null)
      setAllPassed(false)
      return
    }
    setResults(res)
    setAllPassed(res.every((r) => r.passed))
  }

  function handleReset() {
    setCode(puzzle.starterCode || '')
    setResults(null)
    setAllPassed(false)
    setParseError(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitState('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          project_idea: idea,
          puzzle_title: puzzle.title,
          puzzle_type: puzzle.type,
          solution_code: isIdea ? '(no code — idea submission)' : code,
          to_email: 'selametsamli@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      )
      setSubmitState('done')
    } catch {
      setSubmitState('error')
    }
  }

  const passedCount = results ? results.filter((r) => r.passed).length : 0

  return (
    <div className="puzzle-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="puzzle-modal">
        <div className="puzzle-modal-header">
          <div>
            <span className="puzzle-type-badge">{puzzle.type}</span>
            <h2>{puzzle.title}</h2>
            <p className="puzzle-project-name">{project.name}</p>
          </div>
          <button className="puzzle-close" onClick={onClose}>✕</button>
        </div>

        <div className="puzzle-modal-body">
          <div className="puzzle-description">
            {description.split('\n').map((line, i) =>
              line.startsWith('- ') ? (
                <li key={i}>{line.slice(2)}</li>
              ) : line.trim() === '' ? (
                <br key={i} />
              ) : (
                <p key={i}>{line}</p>
              )
            )}
          </div>

          {/* Idea type: just a form, no code editor */}
          {isIdea && submitState !== 'done' && (
            <div className="puzzle-success-form" style={{ marginTop: 0 }}>
              <form onSubmit={handleSubmit} className="puzzle-form">
                <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <textarea
                  placeholder="Describe your idea — what do you want to build? Who is it for? What problem does it solve?"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  rows={5}
                  required
                />
                <button type="submit" className="button primary" disabled={submitState === 'sending'}>
                  <Send size={14} />
                  {submitState === 'sending' ? 'Sending...' : 'Send Idea'}
                </button>
                {submitState === 'error' && <p className="puzzle-submit-error">Something went wrong. Try again.</p>}
              </form>
            </div>
          )}

          {isIdea && submitState === 'done' && (
            <div className="puzzle-submitted">
              <CheckCircle size={20} />
              <div>
                <strong>Idea received!</strong>
                <p>I'll get back to you at {email} soon.</p>
              </div>
            </div>
          )}

          {/* Code challenges: editor + tests */}
          {!isIdea && (
            <>
              <div className="puzzle-editor-section">
                <div className="code-editor-frame">
                  <div className="code-editor-titlebar">
                    <div className="code-editor-dots">
                      <span /><span /><span />
                    </div>
                    <span className="code-editor-filename">solution.js</span>
                    <button className="code-editor-reset" onClick={handleReset}>
                      <RotateCcw size={11} /> Reset
                    </button>
                  </div>
                  <div className="code-editor-body">
                    <div className="code-editor-lines" ref={lineNumbersRef}>
                      {Array.from({ length: lineCount }, (_, i) => (
                        <span key={i}>{i + 1}</span>
                      ))}
                    </div>
                    <textarea
                      ref={textareaRef}
                      className="puzzle-editor"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      onScroll={syncScroll}
                      spellCheck={false}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                    />
                  </div>
                </div>
              </div>

              {parseError && (
                <div className="puzzle-parse-error">
                  <XCircle size={14} /> {parseError}
                </div>
              )}

              {results && (
                <div className="puzzle-results">
                  <div className="puzzle-results-header">
                    {passedCount}/{results.length} tests passed
                  </div>
                  {results.map((r, i) => (
                    <div key={i} className={`puzzle-test ${r.passed ? 'passed' : 'failed'}`}>
                      {r.passed ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      <div>
                        <span>{r.description}</span>
                        {!r.passed && r.error && <code>{r.error}</code>}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="puzzle-actions">
                <button className="button primary" onClick={handleRun}>
                  <Play size={14} /> Run Tests
                </button>
              </div>

              {allPassed && submitState !== 'done' && (
                <div className="puzzle-success-form">
                  <div className="puzzle-success-header">
                    <CheckCircle size={18} />
                    All tests passed! Send your solution to collaborate.
                  </div>
                  <form onSubmit={handleSubmit} className="puzzle-form">
                    <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <textarea
                      placeholder="What do you want to build? Briefly describe your idea..."
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      rows={3}
                      required
                    />
                    <button type="submit" className="button primary" disabled={submitState === 'sending'}>
                      <Send size={14} />
                      {submitState === 'sending' ? 'Sending...' : 'Send Solution'}
                    </button>
                    {submitState === 'error' && <p className="puzzle-submit-error">Something went wrong. Try again.</p>}
                  </form>
                </div>
              )}

              {submitState === 'done' && (
                <div className="puzzle-submitted">
                  <CheckCircle size={20} />
                  <div>
                    <strong>Solution sent!</strong>
                    <p>I'll get back to you at {email} soon.</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
