import { useState, useEffect, useRef } from 'react'

interface HistoryItem {
  type: 'input' | 'output' | 'prompt'
  content: string
}

interface Command {
  description: string
  action: () => string[]
}

const CV = '/cv.pdf'
const DEFAULT_PROMPT: HistoryItem = { type: 'prompt', content: '' }

const WHOAMI = [
  'haris',
  'Name: Haris Raharjo Putro',
  'Role: Software Engineer | Fullstack Developer',
  'Email: haris.workspace@gmail.com',
  'Whatsapp: +62-82122001254',
  'Location: Kampung Tengah, East Jakarta, Indonesia',
]

export const Terminal = () => {
  const [input, setInput] = useState<string>('')
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'output', content: 'Welcome to Haris Raharjo Portofolio!' },
    { type: 'output', content: 'Type "help" to see available commands' },
    DEFAULT_PROMPT,
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const commands: Record<string, Command> = {
    help: {
      description: 'Show available commands',
      action: () => [
        'Available commands:',
        'help          - Show this help message',
        'projects      - Navigate to projects page',
        'experience    - Navigate to experience page',
        'tech        - Navigate to tech page',
        'resume        - View my resume',
        'clear         - Clear terminal',
        'ls            - List available pages',
        'whoami        - Show user info',
        '',
      ],
    },
    projects: {
      description: 'Navigate to projects page',
      action: () => {
        setTimeout(() => {
          window.location.href = '/projects'
        }, 500)
        return ['Navigating to projects page...']
      },
    },
    experience: {
      description: 'Navigate to experience page',
      action: () => {
        setTimeout(() => {
          window.location.href = '/experience'
        }, 500)
        return ['Navigating to experience page...']
      },
    },
    resume: {
      description: 'Viewing resume',
      action: () => {
        setTimeout(() => {
          window.location.href = CV
        }, 500)
        return ['Viewing resume...']
      },
    },
    tech: {
      description: 'Navigate to tech page',
      action: () => {
        setTimeout(() => {
          window.location.href = '/tech'
        }, 500)
        return ['Navigating to tech page...']
      },
    },
    clear: {
      description: 'Clear terminal',
      action: () => {
        return []
      },
    },
    ls: {
      description: 'List available pages',
      action: () => [
        'Available pages:',
        '  projects/',
        '  experience/',
        '  tech/',
        '',
      ],
    },
    whoami: {
      description: 'Show user info',
      action: () => WHOAMI,
    },
  }

  const executeCommand = (cmd: string): string[] => {
    const trimmedInput = cmd.trim().toLowerCase()

    if (trimmedInput === '') return []

    if (commands[trimmedInput]) {
      return commands[trimmedInput].action()
    } else {
      return [
        `bash: ${trimmedInput}: command not found`,
        'Type "help" for available commands',
        '',
      ]
    }
  }

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault()
  //     if (input.trim() === '') return

  //     const newCommandHistory = [...commandHistory, input]
  //     setCommandHistory(newCommandHistory)
  //     setHistoryIndex(-1)

  //     const commandOutput = executeCommand(input)
  //     const newHistory: HistoryItem[] = [
  //       ...history.slice(0, -1),
  //       { type: 'input', content: `$ ${input}` },
  //       ...commandOutput.map((line) => ({ type: 'output', content: line })),
  //       DEFAULT_PROMPT,
  //     ]

  //     setHistory(newHistory)
  //     setInput('')
  //   }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleTerminalClick = () => {
    inputRef.current?.focus()
  }

  useEffect(handleTerminalClick, [])

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-gray-600 bg-black font-mono text-sm text-green-400">
      <div className="fixed flex w-full items-center rounded-t-lg bg-gray-800 px-4 py-2">
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-xs text-gray-300">haris@portfolio:~</div>
      </div>

      <div
        ref={terminalRef}
        className="scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-gray-800 mt-4 h-96 cursor-text overflow-y-auto p-6"
        onClick={handleTerminalClick}
      >
        {history.map((item, index) => (
          <div key={index}>
            {item.type === 'input' && (
              <div className="text-green-400">{item.content}</div>
            )}
            {item.type === 'output' && (
              <div className="text-gray-300">{item.content}</div>
            )}
            {/* {item.type === 'prompt' && index === history.length - 1 && (
              
            )} */}
          </div>
        ))}
        <div className={`flex items-center`}>
          <span className="mr-2 text-green-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                if (input.trim() !== '') {
                  const newCommandHistory = [...commandHistory, input]
                  setCommandHistory(newCommandHistory)
                  setHistoryIndex(-1)

                  const commandOutput = executeCommand(input)
                  let newHistory: HistoryItem[] = [DEFAULT_PROMPT]
                  if (commandOutput.length) {
                    newHistory = [
                      ...history.slice(0, -1),
                      { type: 'input', content: `$ ${input}` },
                      ...commandOutput.map((line) => ({
                        type: 'output',
                        content: line,
                      })),
                      DEFAULT_PROMPT,
                    ]
                  }

                  setHistory(newHistory)
                  console.log(history)
                  setInput('')
                }
                handleTerminalClick()
              } else {
                handleKeyDown(e)
              }
            }}
            className="flex-1 border-none bg-transparent font-mono text-green-400 outline-none"
            placeholder="Enter command..."
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  )
}
