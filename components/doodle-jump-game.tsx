"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

interface DoodleJumpGameProps {
  onGameOver: (score: number) => void
}

export default function DoodleJumpGame({ onGameOver }: DoodleJumpGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameStateRef = useRef<any>(null)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = 800
    const height = 552
    canvas.width = width
    canvas.height = height

    // Game variables
    let platforms: any[] = []
    let player: any
    let base: any
    let spring: any
    let platformBrokenSubstitute: any
    let position = 0
    const gravity = 0.2
    let animloop: any
    let flag = 0
    let broken = 0
    let dir = "left"
    let currentScore = 0
    let firstRun = true
    const platformCount = 10

    // Create a simple sprite replacement (colored rectangles)
    const drawSprite = (x: number, y: number, width: number, height: number, color: string) => {
      ctx.fillStyle = color
      ctx.fillRect(x, y, width, height)
    }

    // Base object
    class Base {
      height = 5
      width = width
      x = 0
      y = height - this.height

      draw() {
        drawSprite(this.x, this.y, this.width, this.height, "#8B4513")
      }
    }

    // Player object
    class Player {
      vy = 11
      vx = 0
      isMovingLeft = false
      isMovingRight = false
      isDead = false
      width = 55
      height = 40
      dir = "left"
      x = width / 2 - this.width / 2
      y = height

      draw() {
        const color = this.dir.includes("left") ? "#4CAF50" : "#2196F3"
        drawSprite(this.x, this.y, this.width, this.height, color)

        // Draw simple face
        if (ctx) {
          ctx.fillStyle = "#000"
          ctx.fillRect(this.x + 10, this.y + 10, 5, 5) // Left eye
          ctx.fillRect(this.x + 30, this.y + 10, 5, 5) // Right eye
          ctx.fillRect(this.x + 15, this.y + 20, 15, 3) // Mouth
        }
      }

      jump() {
        this.vy = -8
      }

      jumpHigh() {
        this.vy = -16
      }
    }

    // Platform class
    class Platform {
      width = 70
      height = 17
      x = Math.random() * (width - this.width)
      y = position
      flag = 0
      state = 0
      type = 1
      types: number[] = []
      moved = 0
      vx = 1

      constructor() {
        position += height / platformCount

        // Platform types based on score
        if (currentScore >= 5000) this.types = [2, 3, 3, 3, 4, 4, 4, 4]
        else if (currentScore >= 2000 && currentScore < 5000) this.types = [2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4]
        else if (currentScore >= 1000 && currentScore < 2000) this.types = [2, 2, 2, 3, 3, 3, 3, 3]
        else if (currentScore >= 500 && currentScore < 1000) this.types = [1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3]
        else if (currentScore >= 100 && currentScore < 500) this.types = [1, 1, 1, 1, 2, 2]
        else this.types = [1]

        this.type = this.types[Math.floor(Math.random() * this.types.length)]

        if (this.type == 3 && broken < 1) {
          broken++
        } else if (this.type == 3 && broken >= 1) {
          this.type = 1
          broken = 0
        }
      }

      draw() {
        let color = "#8BC34A" // Normal platform
        if (this.type == 2)
          color = "#FF9800" // Moving platform
        else if (this.type == 3 && this.flag === 0)
          color = "#F44336" // Breakable platform
        else if (this.type == 3 && this.flag == 1)
          return // Broken platform (invisible)
        else if (this.type == 4 && this.state === 0)
          color = "#9C27B0" // Vanishable platform
        else if (this.type == 4 && this.state == 1) return // Vanished platform

        drawSprite(this.x, this.y, this.width, this.height, color)
      }
    }

    // Spring class
    class Spring {
      x = 0
      y = 0
      width = 26
      height = 30
      state = 0

      draw() {
        const color = this.state === 0 ? "#FF5722" : "#FF8A65"
        drawSprite(this.x, this.y, this.width, this.height, color)
      }
    }

    // Platform broken substitute
    class PlatformBrokenSubstitute {
      height = 30
      width = 70
      x = 0
      y = 0
      appearance = false

      draw() {
        if (this.appearance) {
          drawSprite(this.x, this.y, this.width, this.height, "#795548")
        }
      }
    }

    const init = () => {
      // Reset game state
      platforms = []
      position = 0
      currentScore = 0
      flag = 0
      broken = 0
      firstRun = false

      // Initialize game objects
      base = new Base()
      player = new Player()
      spring = new Spring()
      platformBrokenSubstitute = new PlatformBrokenSubstitute()

      // Create platforms
      for (let i = 0; i < platformCount; i++) {
        platforms.push(new Platform())
      }

      setGameStarted(true)
      setGameEnded(false)
      setScore(0)

      const gameLoop = () => {
        if (player.isDead) {
          setGameEnded(true)
          setGameStarted(false)
          onGameOver(currentScore)
          return
        }

        // Clear canvas
        ctx.clearRect(0, 0, width, height)

        // Update player
        updatePlayer()

        // Update platforms
        updatePlatforms()

        // Update spring
        updateSpring()

        // Draw everything
        base.draw()
        platforms.forEach((p) => p.draw())
        spring.draw()
        platformBrokenSubstitute.draw()
        player.draw()

        // Update score display
        setScore(currentScore)

        animloop = requestAnimationFrame(gameLoop)
      }

      gameLoop()
    }

    const updatePlayer = () => {
      // Handle keyboard input
      const handleKeyDown = (e: KeyboardEvent) => {
        const key = e.keyCode
        if (key == 37 || key == 65) {
          // Left arrow or A
          dir = "left"
          player.isMovingLeft = true
        } else if (key == 39 || key == 68) {
          // Right arrow or D
          dir = "right"
          player.isMovingRight = true
        }
      }

      const handleKeyUp = (e: KeyboardEvent) => {
        const key = e.keyCode
        if (key == 37 || key == 65) {
          player.isMovingLeft = false
        } else if (key == 39 || key == 68) {
          player.isMovingRight = false
        }
      }

      document.addEventListener("keydown", handleKeyDown)
      document.addEventListener("keyup", handleKeyUp)

      // Player movement
      if (player.isMovingLeft) {
        player.x += player.vx
        player.vx -= 0.15
      } else {
        player.x += player.vx
        if (player.vx < 0) player.vx += 0.1
      }

      if (player.isMovingRight) {
        player.x += player.vx
        player.vx += 0.15
      } else {
        player.x += player.vx
        if (player.vx > 0) player.vx -= 0.1
      }

      // Speed limits
      if (player.vx > 8) player.vx = 8
      else if (player.vx < -8) player.vx = -8

      // Update direction for sprite
      if (dir == "left") {
        player.dir = "left"
        if (player.vy < -7 && player.vy > -15) player.dir = "left_land"
      } else if (dir == "right") {
        player.dir = "right"
        if (player.vy < -7 && player.vy > -15) player.dir = "right_land"
      }

      // Jump when hitting base
      if (player.y + player.height > base.y && base.y < height) player.jump()

      // Game over if hitting bottom
      if (base.y > height && player.y + player.height > height && player.isDead != true) {
        player.isDead = true
      }

      // Wrap around screen
      if (player.x > width) player.x = 0 - player.width
      else if (player.x < 0 - player.width) player.x = width

      // Apply gravity and movement
      if (player.y >= height / 2 - player.height / 2) {
        player.y += player.vy
        player.vy += gravity
      } else {
        // Scroll platforms when player reaches middle
        platforms.forEach((p, i) => {
          if (player.vy < 0) {
            p.y -= player.vy
          }
          if (p.y > height) {
            platforms[i] = new Platform()
            platforms[i].y = p.y - height
          }
        })
        base.y -= player.vy
        player.vy += gravity
        if (player.vy >= 0) {
          player.y += player.vy
          player.vy += gravity
        }
        currentScore++
      }

      // Check collisions
      checkCollisions()
    }

    const updatePlatforms = () => {
      platforms.forEach((p, i) => {
        if (p.type == 2) {
          // Moving platform
          if (p.x < 0 || p.x + p.width > width) p.vx *= -1
          p.x += p.vx
        }
      })

      if (platformBrokenSubstitute.appearance) {
        platformBrokenSubstitute.y += 8
        if (platformBrokenSubstitute.y > height) {
          platformBrokenSubstitute.appearance = false
        }
      }
    }

    const updateSpring = () => {
      const p = platforms[0]
      if (p && (p.type == 1 || p.type == 2)) {
        spring.x = p.x + p.width / 2 - spring.width / 2
        spring.y = p.y - p.height - 10
        if (spring.y > height / 1.1) spring.state = 0
      } else {
        spring.x = 0 - spring.width
        spring.y = 0 - spring.height
      }
    }

    const checkCollisions = () => {
      // Platform collisions
      platforms.forEach((p, i) => {
        if (
          player.vy > 0 &&
          p.state === 0 &&
          player.x + 15 < p.x + p.width &&
          player.x + player.width - 15 > p.x &&
          player.y + player.height > p.y &&
          player.y + player.height < p.y + p.height
        ) {
          if (p.type == 3 && p.flag === 0) {
            // Breakable platform
            p.flag = 1
            platformBrokenSubstitute.x = p.x
            platformBrokenSubstitute.y = p.y
            platformBrokenSubstitute.appearance = true
            return
          } else if (p.type == 4 && p.state === 0) {
            // Vanishable platform
            player.jump()
            p.state = 1
          } else if (p.flag == 1) {
            return
          } else {
            player.jump()
          }
        }
      })

      // Spring collision
      if (
        player.vy > 0 &&
        spring.state === 0 &&
        player.x + 15 < spring.x + spring.width &&
        player.x + player.width - 15 > spring.x &&
        player.y + player.height > spring.y &&
        player.y + player.height < spring.y + spring.height
      ) {
        spring.state = 1
        player.jumpHigh()
      }
    }

    const reset = () => {
      if (animloop) {
        cancelAnimationFrame(animloop)
      }
      init()
    }

    // Store game state for cleanup
    gameStateRef.current = { reset, init }

    return () => {
      if (animloop) {
        cancelAnimationFrame(animloop)
      }
      document.removeEventListener("keydown", () => { })
      document.removeEventListener("keyup", () => { })
    }
  }, [onGameOver])

  const startGame = () => {
    if (gameStateRef.current) {
      gameStateRef.current.init()
    }
  }

  const resetGame = () => {
    if (gameStateRef.current) {
      gameStateRef.current.reset()
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      <div className="relative w-full max-w-5xl">
        <canvas
          ref={canvasRef}
          className="border-4 border-gradient-to-r from-blue-500 to-purple-600 rounded-2xl bg-gradient-to-b from-sky-200 via-blue-100 to-sky-200 dark:from-sky-900 dark:via-blue-900 dark:to-sky-900 shadow-2xl"
          style={{
            width: "100%",
            maxWidth: "1000px",
            height: "auto",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1)"
          }}
        />

        {!gameStarted && !gameEnded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-2xl backdrop-blur-sm">
            <div className="text-center text-white p-8 bg-white/10 rounded-2xl border border-white/20">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Doodle Jump
              </h3>
              <p className="mb-6 text-lg">Use arrow keys or A/D to move</p>
              <Button
                onClick={startGame}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold"
              >
                Start Game
              </Button>
            </div>
          </div>
        )}

        {gameEnded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-2xl backdrop-blur-sm">
            <div className="text-center text-white p-8 bg-white/10 rounded-2xl border border-white/20">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                Game Over!
              </h3>
              <div className="mb-6 space-y-2">
                <p className="text-2xl font-bold text-blue-400">Score: {score}</p>
                <p className="text-xl text-green-400">Tokens earned: {Math.floor(score / 10)}</p>
              </div>
              <Button
                onClick={resetGame}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 text-lg font-semibold"
              >
                Play Again
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Score: {score}
        </div>
        <div className="text-lg text-green-400 font-semibold">
          Tokens to earn: {Math.floor(score / 10)}
        </div>
      </div>

      <div className="text-sm text-gray-300 max-w-md text-center bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
        <p className="font-semibold text-white mb-2">
          🎮 Controls: Arrow keys or A/D to move left/right
        </p>
        <p className="text-gray-300">
          🎯 Goal: Jump on platforms to go higher and score points!
        </p>
      </div>
    </div>
  )
}
