export const projectsList = [
  {
    name: 'LetsRaffle API',
    date: '2025',
    slug: 'letsraffle-api',
    tagline: 'Online yılbaşı çekilişi platformu',
    tagline_en: 'Online raffle & giveaway platform',
    url: 'https://letsraffle.co',
    stack: ['Node.js', 'PostgreSQL', 'REST API'],
    accent: '#5a9e6f',
    highlight: true,
    puzzle: {
      type: 'backend',
      title: 'Weighted Raffle Draw',
      description: `A raffle gives participants more chances based on how many tickets they hold.

Implement \`pickWinner(participants)\` — given an array of participants with ticket counts, return one winner's name at random, where each ticket has an equal chance of being drawn.`,
      starterCode: `function pickWinner(participants) {
  // participants: [{ name: 'Alice', tickets: 3 }, { name: 'Bob', tickets: 1 }]
  // Return the winner's name
}`,
      testCases: [
        {
          description: 'Returns a string',
          run: (fn) => {
            const result = fn([{ name: 'Alice', tickets: 3 }, { name: 'Bob', tickets: 1 }])
            if (typeof result !== 'string') throw new Error(`Expected string, got ${typeof result}`)
          },
        },
        {
          description: 'Winner must be one of the participants',
          run: (fn) => {
            const participants = [{ name: 'Alice', tickets: 1 }, { name: 'Bob', tickets: 1 }]
            const result = fn(participants)
            if (!['Alice', 'Bob'].includes(result)) throw new Error(`Unknown winner: ${result}`)
          },
        },
        {
          description: 'Works with a single participant',
          run: (fn) => {
            const result = fn([{ name: 'Solo', tickets: 5 }])
            if (result !== 'Solo') throw new Error(`Expected 'Solo', got '${result}'`)
          },
        },
        {
          description: 'Ticket weights are respected (statistical)',
          run: (fn) => {
            const counts = { Alice: 0, Bob: 0 }
            for (let i = 0; i < 1000; i++) {
              const w = fn([{ name: 'Alice', tickets: 9 }, { name: 'Bob', tickets: 1 }])
              counts[w] = (counts[w] || 0) + 1
            }
            if (counts.Alice < 700) throw new Error(`Alice should win ~90% — got ${counts.Alice}/1000`)
          },
        },
      ],
    },
  },
  {
    name: 'AWS Tools',
    date: '2025',
    slug: 'aws-tools',
    tagline: 'AWS görev otomasyonu, hata ayıklama ve bulut kaynak yönetimi için pratik scriptler',
    tagline_en: 'Practical scripts for AWS task automation, debugging and cloud resource management',
    stack: ['Python', 'AWS', 'CLI'],
    accent: '#c47b3a',
    highlight: true,
    puzzle: {
      type: 'backend',
      title: 'S3 URL Parser',
      description: `AWS S3 URLs come in two formats:
- Path-style: \`s3://my-bucket/path/to/file.txt\`
- Virtual-hosted: \`https://my-bucket.s3.amazonaws.com/path/to/file.txt\`

Implement \`parseS3Url(url)\` that returns \`{ bucket, key }\` for both formats.`,
      starterCode: `function parseS3Url(url) {
  // Return { bucket: string, key: string }
}`,
      testCases: [
        {
          description: 'Parses s3:// protocol URLs',
          run: (fn) => {
            const r = fn('s3://my-bucket/path/to/file.txt')
            if (r.bucket !== 'my-bucket') throw new Error(`bucket: expected 'my-bucket', got '${r.bucket}'`)
            if (r.key !== 'path/to/file.txt') throw new Error(`key: expected 'path/to/file.txt', got '${r.key}'`)
          },
        },
        {
          description: 'Parses virtual-hosted HTTPS URLs',
          run: (fn) => {
            const r = fn('https://my-bucket.s3.amazonaws.com/path/to/file.txt')
            if (r.bucket !== 'my-bucket') throw new Error(`bucket: expected 'my-bucket', got '${r.bucket}'`)
            if (r.key !== 'path/to/file.txt') throw new Error(`key: expected 'path/to/file.txt', got '${r.key}'`)
          },
        },
        {
          description: 'Handles root-level key (no folder)',
          run: (fn) => {
            const r = fn('s3://logs/access.log')
            if (r.bucket !== 'logs') throw new Error(`bucket: expected 'logs', got '${r.bucket}'`)
            if (r.key !== 'access.log') throw new Error(`key: expected 'access.log', got '${r.key}'`)
          },
        },
      ],
    },
  },
  {
    name: 'selamet.dev',
    date: '2025',
    slug: 'selamet.github.io',
    tagline: 'Kişisel web sitemin kaynak kodu',
    tagline_en: 'Source code of my personal website',
    url: 'https://selamet.dev',
    stack: ['Gatsby', 'React', 'PostCSS'],
    accent: '#5b8abf',
    highlight: true,
    puzzle: {
      type: 'frontend',
      title: 'CSS Toggle Switch',
      description: `Build a CSS-only toggle switch — no JavaScript allowed.

Requirements:
- Smooth slide animation on toggle
- Changes background color when checked
- Works using only HTML + CSS (checkbox trick)`,
      starterCode: `<!-- Write your HTML & CSS below -->
<style>
  /* your styles here */
</style>

<label class="toggle">
  <input type="checkbox" />
  <span class="slider"></span>
</label>`,
    },
  },
]
