import React, { useState, useEffect, useCallback, useRef } from "react"

interface GameObject {
  id: number
  x: number
}

const GROUND_Y = 0
const JUMP_HEIGHT = 200
const DINO_X = 50
const OBSTACLE_SPEED = 4
const GAME_WIDTH = 600
const GAME_HEIGHT = 200
const OBSTACLE_WIDTH = 20
const DINO_WIDTH = 40
const DINO_HEIGHT = 40
const JUMP_DURATION = 600
const MAX_OBSTACLE_SPAWN_INTERVAL = 700
const MIN_OBSTACLE_SPAWN_INTERVAL = 1000

interface Props {
  quitGame: () => void
}

const DinoGame = ({ quitGame }: Props) => {
  const [dinoY, setDinoY] = useState(0)
  const [obstacles, setObstacles] = useState<GameObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isJumping, setIsJumping] = useState(false)
  const animationFrameRef = useRef<number | null>(null)
  const jumpStartTimeRef = useRef<number | null>(null)
  const lastObstacleSpawnRef = useRef<number>(Date.now())

  const getRandomSpawnInterval = () =>
    Math.floor(
      Math.random() *
        (MAX_OBSTACLE_SPAWN_INTERVAL - MIN_OBSTACLE_SPAWN_INTERVAL + 1),
    ) + MIN_OBSTACLE_SPAWN_INTERVAL
  const nextObstacleSpawnRef = useRef<number>(getRandomSpawnInterval())

  const handleJump = useCallback(() => {
    if (!isJumping && !gameOver) {
      setIsJumping(true)
      jumpStartTimeRef.current = Date.now()
    }
  }, [isJumping, gameOver])

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" && !timeout) {
        e.preventDefault()
        handleJump()
        timeout = setTimeout(() => {
          timeout = null
        }, 100) // Debounce for 100ms
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      if (timeout) clearTimeout(timeout)
    }
  }, [handleJump])

  useEffect(() => {
    if (gameOver) return

    const gameLoop = () => {
      const now = Date.now()

      setScore((prev) => prev + 1)

      if (isJumping && jumpStartTimeRef.current) {
        const elapsed = now - jumpStartTimeRef.current
        const progress = Math.min(elapsed / JUMP_DURATION, 1)
        const ease =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2
        setDinoY(JUMP_HEIGHT * (progress < 0.5 ? ease : 1 - ease))
        if (progress >= 1) {
          setDinoY(GROUND_Y)
          setIsJumping(false)
          jumpStartTimeRef.current = null
        }
      }

      setObstacles((prev) => {
        const newObstacles = prev
          .map((obs) => ({ ...obs, x: obs.x - OBSTACLE_SPEED }))
          .filter((obs) => obs.x > -OBSTACLE_WIDTH)

        // Check collisions
        newObstacles.forEach((obs) => {
          if (
            obs.x < DINO_X + DINO_WIDTH &&
            obs.x + OBSTACLE_WIDTH > DINO_X &&
            dinoY < 10
          ) {
            setGameOver(true)
          }
        })

        // Spawn new obstacles
        if (
          now - lastObstacleSpawnRef.current >=
          nextObstacleSpawnRef.current
        ) {
          newObstacles.push({ id: now, x: GAME_WIDTH })
          lastObstacleSpawnRef.current = now
          nextObstacleSpawnRef.current = getRandomSpawnInterval()
        }

        return newObstacles
      })

      animationFrameRef.current = requestAnimationFrame(gameLoop)
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [gameOver, isJumping, dinoY])

  const restartGame = () => {
    setDinoY(GROUND_Y)
    setObstacles([])
    setScore(0)
    setGameOver(false)
    setIsJumping(false)
    jumpStartTimeRef.current = null
    lastObstacleSpawnRef.current = Date.now()
    nextObstacleSpawnRef.current = getRandomSpawnInterval()
  }

  return (
    <div className="relative h-full w-full overflow-hidden border-4 border-green-500 bg-black font-mono text-green-500">
      <div className="absolute top-2 left-2 text-sm">Score: {score}</div>

      {gameOver && (
        <div className="bg-opacity-75 absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-center">
            <p className="text-lg">Game Over!</p>
            <p>Score: {score}</p>
            <button
              className="mt-2 bg-green-500 px-4 py-2 text-black hover:text-white"
              onClick={restartGame}
            >
              Restart
            </button>
            <button
              className="mt-2 bg-green-500 px-4 py-2 text-black hover:text-white"
              onClick={quitGame}
            >
              Quit
            </button>
          </div>
        </div>
      )}

      <div
        className="absolute bottom-0 h-2 w-full bg-green-500"
        style={{ zIndex: 0 }}
      ></div>

      <div
        className="absolute bottom-0 h-10 w-10 bg-green-500 transition-transform duration-100"
        style={{
          left: `${DINO_X}px`,
          transform: `translateY(${-dinoY}px)`,
          zIndex: 10,
        }}
      ></div>

      {obstacles.map((obs) => (
        <div
          key={obs.id}
          className="absolute bottom-0 h-10 w-5 bg-green-500"
          style={{ left: `${obs.x}px`, zIndex: 5 }}
        ></div>
      ))}
    </div>
  )
}

export default DinoGame
