import { useState, useEffect, useRef, lazy, Suspense } from "react"
let DinoGame = lazy(() => import("./dinoGame.tsx"))

interface HistoryItem {
  type: "input" | "output" | "prompt"
  content: string
}

interface Command {
  description: string
  action: () => string[]
}

const CV = "/cv.pdf"
const DEFAULT_PROMPT: HistoryItem = { type: "prompt", content: "" }

const CONTACT = [
  "Name: Haris Raharjo Putro",
  "Role: Software Engineer",
  "Email: haris.workspace@gmail.com",
  "Whatsapp: +62-82122001254",
  "Location: Kampung Tengah, East Jakarta, Indonesia",
]

const commands: Record<string, Command> = {
  help: {
    description: "Show available commands",
    action: () => [
      "Available commands:",
      "help          - Show this help message",
      "dino - Play dino game",
      // 'projects      - Navigate to projects page',
      "resume        - View my resume",
      "clear         - Clear terminal",
      "contact        - Show user info",
      "",
    ],
  },
  // projects: {
  //   description: 'Navigate to projects page',
  //   action: () => {
  //     setTimeout(() => {
  //       window.location.href = '/projects'
  //     }, 500)
  //     return ['Navigating to projects page...']
  //   },
  // },
  dino: {
    description: "Play dino game",
    action: () => {
      setTimeout(() => {
        // window.location.href = ''
      }, 500)
      return ["Opening dino game..."]
    },
  },
  resume: {
    description: "Viewing resume",
    action: () => {
      setTimeout(() => {
        window.location.href = CV
      }, 500)
      return ["Viewing resume..."]
    },
  },
  clear: {
    description: "Clear terminal",
    action: () => {
      return []
    },
  },
  contact: {
    description: "Show user info",
    action: () => CONTACT,
  },
}

export const Canvas = () => {
  const [input, setInput] = useState<string>("")
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: "output", content: 'Type "help" to see available commands' },
    { type: "input", content: "whoami" },
    { type: "output", content: "Haris Raharjo Putro" },
    DEFAULT_PROMPT,
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [gameMode, setGameMode] = useState(false)

  const toggleGame = () => {
    setGameMode((prev) => !prev)
  }

  const executeCommand = (cmd: string): string[] => {
    const trimmedInput = cmd.trim().toLowerCase()

    if (trimmedInput === "") return []

    if (commands[trimmedInput]) {
      return commands[trimmedInput].action()
    } else {
      return [
        `bash: ${trimmedInput}: command not found`,
        'Type "help" for available commands',
        "",
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
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
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
    <div
      ref={terminalRef}
      className="scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-gray-800 h-96 cursor-text overflow-y-auto"
      onClick={handleTerminalClick}
    >
      {gameMode && (
        <Suspense fallback={<div>Loading...</div>}>
          <DinoGame quitGame={toggleGame} />
        </Suspense>
      )}
      {!gameMode && (
        <>
          {history.map((item, index) => (
            <div key={index}>
              {item.type === "input" && (
                <div className="mt-4 flex items-start gap-2">
                  <span className="text-green">➜</span>
                  <span className="text-blue">~</span>
                  <div className="text-fg">{item.content}</div>
                </div>
              )}
              {item.type === "output" && (
                <div className="text-aqua pl-6">{item.content}</div>
              )}
              {/* {item.type === 'prompt' && index === history.length - 1 && ()} */}
            </div>
          ))}
          <div className={`flex items-center pt-4`}>
            <span className="text-green mr-2">➜</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  if (input.trim() !== "") {
                    const newCommandHistory = [...commandHistory, input]
                    setCommandHistory(newCommandHistory)
                    setHistoryIndex(-1)

                    const commandOutput = executeCommand(input)
                    let newHistory: HistoryItem[] = [DEFAULT_PROMPT]
                    if (commandOutput.length) {
                      newHistory = [
                        ...history.slice(0, -1),
                        { type: "input", content: `${input}` },
                        ...commandOutput.map((line) => ({
                          type: "output",
                          content: line,
                        })),
                        DEFAULT_PROMPT,
                      ]
                    }

                    setHistory(newHistory)
                    if (input === "dino") {
                      toggleGame()
                    }

                    setInput("")
                  }
                  handleTerminalClick()
                } else {
                  handleKeyDown(e)
                }
              }}
              className="flex-1 border-none bg-transparent font-mono outline-none"
              placeholder="Enter command..."
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </>
      )}
    </div>
  )
}
