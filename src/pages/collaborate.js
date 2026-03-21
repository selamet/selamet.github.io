import React, { useState } from 'react'
import Helmet from 'react-helmet'
import { Code2, Layers, Container, Lightbulb } from 'lucide-react'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Hero } from '../components/Hero'
import { PageLayout } from '../components/PageLayout'
import { PuzzleChallenge } from '../components/PuzzleChallenge'
import config from '../utils/config'
import { useLanguage } from '../context/LanguageContext'

const challenges = [
  {
    id: 'backend',
    type: 'backend',
    accent: '#5a9e6f',
    icon: Code2,
    title: { tr: 'Backend Challenge', en: 'Backend Challenge' },
    desc: {
      tr: 'Bir sınıfın eksik metodlarını tamamla.',
      en: 'Complete the missing methods of a class.',
    },
    puzzle: {
      type: 'backend',
      title: 'Complete the EventEmitter Class',
      description: {
        en: `Implement a simple EventEmitter class with the following methods:

- \`on(event, listener)\` — register a listener for an event
- \`off(event, listener)\` — remove a specific listener
- \`emit(event, ...args)\` — call all listeners for an event with given args
- \`once(event, listener)\` — listener fires only once, then auto-removes`,
        tr: `Aşağıdaki metodlara sahip basit bir EventEmitter sınıfı yaz:

- \`on(event, listener)\` — bir event için listener kaydet
- \`off(event, listener)\` — belirli bir listener'ı kaldır
- \`emit(event, ...args)\` — event için tüm listener'ları verilen argümanlarla çağır
- \`once(event, listener)\` — listener yalnızca bir kez çalışır, sonra otomatik kaldırılır`,
      },
      starterCode: `class EventEmitter {
  constructor() {
    this._events = {}
  }

  on(event, listener) {
    // Register listener for event
  }

  off(event, listener) {
    // Remove a specific listener
  }

  emit(event, ...args) {
    // Call all listeners for event with args
  }

  once(event, listener) {
    // Fires only once, then removes itself
  }
}`,
      testCases: [
        {
          description: 'on() + emit() — listener is called',
          run: (Cls) => {
            const ee = new Cls()
            let called = false
            ee.on('ping', () => { called = true })
            ee.emit('ping')
            if (!called) throw new Error('Listener was not called after emit')
          },
        },
        {
          description: 'emit() passes arguments to listener',
          run: (Cls) => {
            const ee = new Cls()
            let received
            ee.on('data', (val) => { received = val })
            ee.emit('data', 42)
            if (received !== 42) throw new Error(`Expected 42, got ${received}`)
          },
        },
        {
          description: 'off() removes a specific listener',
          run: (Cls) => {
            const ee = new Cls()
            let count = 0
            const inc = () => { count++ }
            ee.on('tick', inc)
            ee.emit('tick')
            ee.off('tick', inc)
            ee.emit('tick')
            if (count !== 1) throw new Error(`Expected 1 call after off(), got ${count}`)
          },
        },
        {
          description: 'Multiple listeners on same event all fire',
          run: (Cls) => {
            const ee = new Cls()
            let sum = 0
            ee.on('add', () => { sum += 1 })
            ee.on('add', () => { sum += 2 })
            ee.emit('add')
            if (sum !== 3) throw new Error(`Expected sum 3, got ${sum}`)
          },
        },
        {
          description: 'once() fires exactly once',
          run: (Cls) => {
            const ee = new Cls()
            let count = 0
            ee.once('ping', () => { count++ })
            ee.emit('ping')
            ee.emit('ping')
            if (count !== 1) throw new Error(`Expected 1 call, got ${count}`)
          },
        },
        {
          description: 'emit() on unknown event does not throw',
          run: (Cls) => {
            const ee = new Cls()
            ee.emit('nonexistent')
          },
        },
      ],
    },
  },
  {
    id: 'frontend',
    type: 'backend',
    accent: '#5b8abf',
    icon: Layers,
    title: { tr: 'Redux Challenge', en: 'Redux Challenge' },
    desc: {
      tr: 'Reducer ve action\'ları yapılandır, store\'u çalıştır.',
      en: 'Configure the reducer and actions, make the store work.',
    },
    puzzle: {
      type: 'backend',
      title: 'Configure a Redux-style Store',
      description: {
        en: `A minimal \`createStore(reducer)\` is already provided — you don't need to import anything.

Complete the \`todosReducer\` and \`initialState\` to handle these actions:
- \`ADD_TODO\` — payload: \`{ id, text }\`, adds to todos array
- \`TOGGLE_TODO\` — payload: \`id\`, flips the \`done\` field
- \`SET_FILTER\` — payload: \`'all' | 'active' | 'completed'\`, sets filter`,
        tr: `Minimal bir \`createStore(reducer)\` zaten sağlanıyor — herhangi bir şey import etmene gerek yok.

Şu action'ları işleyecek \`todosReducer\` ve \`initialState\`'i tamamla:
- \`ADD_TODO\` — payload: \`{ id, text }\`, todos dizisine ekler
- \`TOGGLE_TODO\` — payload: \`id\`, \`done\` alanını tersine çevirir
- \`SET_FILTER\` — payload: \`'all' | 'active' | 'completed'\`, filter'ı günceller`,
      },
      starterCode: `// createStore is provided — do not redefine it
// Usage: const store = createStore(reducer)
// store.getState() → current state
// store.dispatch({ type, payload }) → triggers reducer

const initialState = {
  // YOUR CODE HERE
}

function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      // YOUR CODE HERE

    case 'TOGGLE_TODO':
      // YOUR CODE HERE

    case 'SET_FILTER':
      // YOUR CODE HERE

    default:
      return state
  }
}`,
      testCases: [
        {
          description: 'Initial state has todos array and filter field',
          run: (fn, createStore) => {
            const store = createStore(fn)
            const state = store.getState()
            if (!Array.isArray(state.todos)) throw new Error('state.todos should be an array')
            if (!('filter' in state)) throw new Error('state.filter is missing')
          },
        },
        {
          description: 'ADD_TODO adds a todo to the list',
          run: (fn, createStore) => {
            const store = createStore(fn)
            store.dispatch({ type: 'ADD_TODO', payload: { id: 1, text: 'Buy milk' } })
            const todos = store.getState().todos
            if (todos.length !== 1) throw new Error(`Expected 1 todo, got ${todos.length}`)
            if (todos[0].text !== 'Buy milk') throw new Error(`Expected "Buy milk", got "${todos[0].text}"`)
          },
        },
        {
          description: 'TOGGLE_TODO flips the done field',
          run: (fn, createStore) => {
            const store = createStore(fn)
            store.dispatch({ type: 'ADD_TODO', payload: { id: 1, text: 'Test' } })
            store.dispatch({ type: 'TOGGLE_TODO', payload: 1 })
            const todo = store.getState().todos[0]
            if (!todo.done) throw new Error('Expected done to be true after toggle')
            store.dispatch({ type: 'TOGGLE_TODO', payload: 1 })
            if (store.getState().todos[0].done) throw new Error('Expected done to be false after second toggle')
          },
        },
        {
          description: 'SET_FILTER updates the filter field',
          run: (fn, createStore) => {
            const store = createStore(fn)
            store.dispatch({ type: 'SET_FILTER', payload: 'active' })
            if (store.getState().filter !== 'active') throw new Error(`Expected filter "active", got "${store.getState().filter}"`)
          },
        },
        {
          description: 'Reducer is pure — original state is not mutated',
          run: (fn, createStore) => {
            const store = createStore(fn)
            store.dispatch({ type: 'ADD_TODO', payload: { id: 1, text: 'A' } })
            const before = store.getState().todos
            store.dispatch({ type: 'ADD_TODO', payload: { id: 2, text: 'B' } })
            if (store.getState().todos === before) throw new Error('Reducer mutated state instead of returning new array')
          },
        },
      ],
    },
  },
  {
    id: 'devops',
    type: 'backend',
    accent: '#c47b3a',
    icon: Container,
    title: { tr: 'DevOps Challenge', en: 'DevOps Challenge' },
    desc: {
      tr: 'AWS ECS task definition\'ını yapılandır.',
      en: 'Configure an AWS ECS task definition.',
    },
    puzzle: {
      type: 'backend',
      title: 'AWS ECS Task Definition',
      description: {
        en: `Complete the ECS task definition object for a Node.js web service running on Fargate.

Requirements:
- Container named \`api\`, image \`my-org/api:latest\`, port \`3000\`
- Fargate compatible, Linux, \`awsvpc\` network mode
- Task memory: \`512\` MiB, CPU: \`256\` units
- Log driver: \`awslogs\` with group \`/ecs/api\``,
        tr: `Fargate üzerinde çalışan bir Node.js web servisi için ECS task definition nesnesini tamamla.

Gereksinimler:
- Container adı \`api\`, image \`my-org/api:latest\`, port \`3000\`
- Fargate uyumlu, Linux, \`awsvpc\` network mode
- Task bellek: \`512\` MiB, CPU: \`256\` birim
- Log driver: \`awslogs\`, group \`/ecs/api\``,
      },
      starterCode: `// Complete the ECS task definition object.
// Return it from the function — do not rename the function.

function getTaskDefinition() {
  return {
    family: 'api-task',
    networkMode: '', // YOUR CODE HERE
    requiresCompatibilities: [], // YOUR CODE HERE
    cpu: '', // YOUR CODE HERE — as string
    memory: '', // YOUR CODE HERE — as string
    runtimePlatform: {
      operatingSystemFamily: '', // YOUR CODE HERE
    },
    containerDefinitions: [
      {
        name: '', // YOUR CODE HERE
        image: '', // YOUR CODE HERE
        portMappings: [
          {
            containerPort: 0, // YOUR CODE HERE
            protocol: 'tcp',
          },
        ],
        logConfiguration: {
          logDriver: '', // YOUR CODE HERE
          options: {
            'awslogs-group': '', // YOUR CODE HERE
            'awslogs-region': 'us-east-1',
            'awslogs-stream-prefix': 'ecs',
          },
        },
      },
    ],
  }
}`,
      testCases: [
        {
          description: 'networkMode is "awsvpc"',
          run: (fn) => {
            const d = fn()
            if (d.networkMode !== 'awsvpc') throw new Error(`Expected "awsvpc", got "${d.networkMode}"`)
          },
        },
        {
          description: 'requiresCompatibilities includes "FARGATE"',
          run: (fn) => {
            const d = fn()
            if (!Array.isArray(d.requiresCompatibilities) || !d.requiresCompatibilities.includes('FARGATE'))
              throw new Error(`Expected ["FARGATE"], got ${JSON.stringify(d.requiresCompatibilities)}`)
          },
        },
        {
          description: 'cpu is "256" and memory is "512"',
          run: (fn) => {
            const d = fn()
            if (d.cpu !== '256') throw new Error(`cpu: expected "256", got "${d.cpu}"`)
            if (d.memory !== '512') throw new Error(`memory: expected "512", got "${d.memory}"`)
          },
        },
        {
          description: 'operatingSystemFamily is "LINUX"',
          run: (fn) => {
            const d = fn()
            if (d.runtimePlatform?.operatingSystemFamily !== 'LINUX')
              throw new Error(`Expected "LINUX", got "${d.runtimePlatform?.operatingSystemFamily}"`)
          },
        },
        {
          description: 'Container name is "api" and image is "my-org/api:latest"',
          run: (fn) => {
            const c = fn().containerDefinitions[0]
            if (c.name !== 'api') throw new Error(`container name: expected "api", got "${c.name}"`)
            if (c.image !== 'my-org/api:latest') throw new Error(`image: expected "my-org/api:latest", got "${c.image}"`)
          },
        },
        {
          description: 'containerPort is 3000',
          run: (fn) => {
            const port = fn().containerDefinitions[0].portMappings[0].containerPort
            if (port !== 3000) throw new Error(`Expected 3000, got ${port}`)
          },
        },
        {
          description: 'logDriver is "awslogs" and group is "/ecs/api"',
          run: (fn) => {
            const log = fn().containerDefinitions[0].logConfiguration
            if (log.logDriver !== 'awslogs') throw new Error(`logDriver: expected "awslogs", got "${log.logDriver}"`)
            if (log.options['awslogs-group'] !== '/ecs/api') throw new Error(`awslogs-group: expected "/ecs/api", got "${log.options['awslogs-group']}"`)
          },
        },
      ],
    },
  },
  {
    id: 'idea',
    type: 'idea',
    accent: '#9370b8',
    icon: Lightbulb,
    title: { tr: 'Sadece Bir Fikrim Var', en: 'I Just Have an Idea' },
    desc: {
      tr: 'Teknik bilgin olmak zorunda değil. Fikrin varsa yazalım.',
      en: "You don't need to be technical. If you have an idea, let's talk.",
    },
    puzzle: {
      type: 'idea',
      title: 'Tell Me Your Idea',
      description: {
        en: 'No code required. Just describe what you want to build, who it is for, and what problem it solves.',
        tr: 'Kod gerekmez. Ne yapmak istediğini, kimin için olduğunu ve hangi sorunu çözdüğünü anlat.',
      },
    },
  },
]

export default function Collaborate() {
  const { lang } = useLanguage()
  const [activeChallenge, setActiveChallenge] = useState(null)

  return (
    <>
      <Helmet title={`Collaborate | ${config.siteTitle}`} />
      <SEO pagePath="/collaborate" />

      <PageLayout>
        <Hero
          title={lang === 'tr' ? 'Birlikte Geliştirelim' : "Let's Build Together"}
          description={
            lang === 'tr'
              ? 'Birlikte açık kaynak bir şey geliştirmek ister misin? Alanına göre bir bulmaca çöz, ne yapmak istediğini yaz — seninle iletişime geçeyim.'
              : "Want to build something open source together? Solve a quick challenge in your area, tell me what you have in mind, and I'll get back to you."
          }
        />

        <div className="collaborate-grid">
          {challenges.map((ch) => {
            const Icon = ch.icon
            return (
              <div
                className="collaborate-card"
                key={ch.id}
                style={{ '--project-accent': ch.accent }}
              >
                <div className="collaborate-card-top">
                  <div className="collaborate-card-badge">
                    <Icon size={13} />
                    {ch.title[lang] || ch.title.en}
                  </div>
                  <p className="collaborate-card-tagline">{ch.desc[lang] || ch.desc.en}</p>
                </div>

                <div className="collaborate-card-puzzle">
                  <p className="collaborate-puzzle-desc">
                    {(ch.puzzle.description[lang] || ch.puzzle.description.en).split('\n')[0]}
                  </p>
                </div>

                <button
                  className="button primary collaborate-start-btn"
                  onClick={() => setActiveChallenge(ch)}
                >
                  {ch.type === 'idea'
                    ? (lang === 'tr' ? 'Fikri Anlat' : 'Share Your Idea')
                    : (lang === 'tr' ? 'Başla' : 'Start Challenge')}
                </button>
              </div>
            )
          })}
        </div>
      </PageLayout>

      {activeChallenge && (
        <PuzzleChallenge
          project={{ name: activeChallenge.title[lang], slug: activeChallenge.id, puzzle: activeChallenge.puzzle }}
          onClose={() => setActiveChallenge(null)}
          lang={lang}
        />
      )}
    </>
  )
}

Collaborate.Layout = Layout
