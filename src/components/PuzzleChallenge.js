import React, { useState, useRef } from 'react'
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
  // Try as a class first, then as a function
  let fn
  let isClass = false
  try {
    // eslint-disable-next-line no-new-func
    const result = new Function('createStore', `${code};\nif (typeof EventEmitter !== 'undefined') return EventEmitter;\nif (typeof todosReducer !== 'undefined') return todosReducer;\nreturn undefined;`)(createStore)
    if (result === undefined) throw new Error('Could not find a class or function to test. Make sure your class/function name matches.')
    fn = result
    isClass = typeof fn === 'function' && /^class\s/.test(fn.toString())
  } catch (e) {
    return { parseError: e.message }
  }

  return testCases.map((tc) => {
    try {
      if (isClass) {
        tc.run(fn)
      } else {
        tc.run(fn, createStore)
      }
      return { description: tc.description, passed: true }
    } catch (e) {
      return { description: tc.description, passed: false, error: e.message }
    }
  })
}

export function PuzzleChallenge({ project, onClose }) {
  const { puzzle } = project
  const [code, setCode] = useState(puzzle.starterCode)
  const [results, setResults] = useState(null)
  const [allPassed, setAllPassed] = useState(false)
  const [parseError, setParseError] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [idea, setIdea] = useState('')
  const [submitState, setSubmitState] = useState('idle') // idle | sending | done | error
  const iframeRef = useRef(null)

  function handleRun() {
    setParseError(null)
    if (puzzle.type === 'backend') {
      const res = runBackendTests(code, puzzle.testCases)
      if (res.parseError) {
        setParseError(res.parseError)
        setResults(null)
        setAllPassed(false)
        return
      }
      setResults(res)
      setAllPassed(res.every((r) => r.passed))
    } else {
      // frontend: render in iframe
      if (iframeRef.current) {
        iframeRef.current.srcdoc = code
      }
      setAllPassed(true)
    }
  }

  function handleReset() {
    setCode(puzzle.starterCode)
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
          solution_code: code,
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
            {puzzle.description.split('\n').map((line, i) =>
              line.startsWith('- ') ? (
                <li key={i}>{line.slice(2)}</li>
              ) : line.trim() === '' ? (
                <br key={i} />
              ) : (
                <p key={i}>{line}</p>
              )
            )}
          </div>

          <div className="puzzle-editor-section">
            <div className="puzzle-editor-toolbar">
              <span className="puzzle-editor-label">
                {puzzle.type === 'frontend' ? 'HTML / CSS' : 'JavaScript'}
              </span>
              <button className="button secondary small" onClick={handleReset}>
                <RotateCcw size={12} /> Reset
              </button>
            </div>
            <textarea
              className="puzzle-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>

          {puzzle.type === 'frontend' && (
            <div className="puzzle-preview-section">
              <span className="puzzle-editor-label">Preview</span>
              <iframe
                ref={iframeRef}
                className="puzzle-preview-frame"
                title="preview"
                sandbox="allow-scripts"
              />
            </div>
          )}

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
              <Play size={14} />
              {puzzle.type === 'frontend' ? 'Preview' : 'Run Tests'}
            </button>
          </div>

          {allPassed && submitState !== 'done' && (
            <div className="puzzle-success-form">
              <div className="puzzle-success-header">
                <CheckCircle size={18} />
                {puzzle.type === 'frontend'
                  ? 'Looks great! Send your solution to collaborate.'
                  : 'All tests passed! Send your solution to collaborate.'}
              </div>
              <form onSubmit={handleSubmit} className="puzzle-form">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <textarea
                  placeholder="What do you want to build? Briefly describe your idea..."
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  rows={3}
                  required
                />
                <button
                  type="submit"
                  className="button primary"
                  disabled={submitState === 'sending'}
                >
                  <Send size={14} />
                  {submitState === 'sending' ? 'Sending...' : 'Send Solution'}
                </button>
                {submitState === 'error' && (
                  <p className="puzzle-submit-error">Something went wrong. Try again.</p>
                )}
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
        </div>
      </div>
    </div>
  )
}
