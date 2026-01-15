/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import styles from "./page.module.css";

// 1. IMPORT FONT DARI GOOGLE
import { Press_Start_2P } from "next/font/google";

// 2. KONFIGURASI FONT
const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

// --- KONFIGURASI ---
const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 10 };
const GAME_SPEED = 150;

// GANTI DENGAN URL DEPLOYMENT ANDA NANTI
const GAME_URL = "https://based-snake.vercel.app/"; 

// Daftar Skin
const SKINS = [
  { id: 'brian', src: '/brian.png', name: 'Brian' },
  { id: 'kersa', src: '/kersa.jpg', name: 'Kersa' },
  { id: 'base', src: '/baseposting.jpg', name: 'Base' },
  { id: 'jesse', src: '/jesse.jpg', name: 'Jesse' },
  { id: 'coinbase', src: '/coinbase.jpg', name: 'Coinbase' },
];

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export default function Home() {
  const { isFrameReady, setFrameReady } = useMiniKit();
  
  // --- Game State ---
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  
  // PERBAIKAN 1: 'direction' tidak dipakai, ganti jadi '_' atau hapus destructuringnya
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setDirection] = useState<Direction>("RIGHT");
  
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSkin, setSelectedSkin] = useState<string>(SKINS[0].src);
  
  const directionRef = useRef<Direction>("RIGHT");

  // --- Minikit Setup ---
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  // --- Game Logic: Generate Food ---
  const generateFood = useCallback(() => {
    // PERBAIKAN 2: Ganti 'any' dengan 'number'
    let newFood: { x: number; y: number; };
    let isOnSnake;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // PERBAIKAN 3: Hapus komentar eslint-disable yang tidak perlu
      isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    } while (isOnSnake);
    return newFood;
  }, [snake]);

  // --- Game Logic: Movement ---
  const moveSnake = useCallback(() => {
    if (gameOver || !isPlaying) return;

    const newHead = { ...snake[0] };

    switch (directionRef.current) {
      case "UP": newHead.y -= 1; break;
      case "DOWN": newHead.y += 1; break;
      case "LEFT": newHead.x -= 1; break;
      case "RIGHT": newHead.x += 1; break;
    }

    newHead.x = (newHead.x + GRID_SIZE) % GRID_SIZE;
    newHead.y = (newHead.y + GRID_SIZE) % GRID_SIZE;

    if (snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
      setGameOver(true);
      setIsPlaying(false);
      return;
    }

    if (newHead.x === food.x && newHead.y === food.y) {
      setScore((s) => s + 1);
      setFood(generateFood());
      setSnake([newHead, ...snake]);
    } else {
      const newSnake = [newHead, ...snake];
      newSnake.pop(); 
      setSnake(newSnake);
    }

  }, [snake, food, gameOver, isPlaying, generateFood]);

  // --- Game Loop ---
  useEffect(() => {
    const gameInterval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  // --- Keyboard Controls ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      switch (e.key) {
        case "ArrowUp": if (directionRef.current !== "DOWN") directionRef.current = "UP"; break;
        case "ArrowDown": if (directionRef.current !== "UP") directionRef.current = "DOWN"; break;
        case "ArrowLeft": if (directionRef.current !== "RIGHT") directionRef.current = "LEFT"; break;
        case "ArrowRight": if (directionRef.current !== "LEFT") directionRef.current = "RIGHT"; break;
      }
      setDirection(directionRef.current);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  // --- Helper Functions ---
  const handleStart = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true); 
    directionRef.current = "RIGHT";
    setDirection("RIGHT");
  };

  const handleBackToMenu = () => {
    setGameOver(false);
    setIsPlaying(false); 
    setScore(0);
    setSnake(INITIAL_SNAKE); 
  };

  const handleMobileControl = (dir: Direction) => {
    if (!isPlaying) return;
    if (dir === "UP" && directionRef.current === "DOWN") return;
    if (dir === "DOWN" && directionRef.current === "UP") return;
    if (dir === "LEFT" && directionRef.current === "RIGHT") return;
    if (dir === "RIGHT" && directionRef.current === "LEFT") return;
    directionRef.current = dir;
    setDirection(dir);
  };

  // --- SHARE FUNCTIONS ---
  const getShareText = () => `I scored ${score} in Base Snake! 🐍 Can you beat me?`;

  const handleShareX = () => {
    const text = encodeURIComponent(getShareText());
    const url = encodeURIComponent(GAME_URL);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleShareWarpcast = () => {
    const text = encodeURIComponent(getShareText());
    const url = encodeURIComponent(GAME_URL); 
    window.open(`https://warpcast.com/~/compose?text=${text}&embeds[]=${url}`, '_blank');
  };

  const handleShareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Base Snake Game',
          text: getShareText(),
          url: GAME_URL,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(`${getShareText()} ${GAME_URL}`);
      alert("Link copied to clipboard!");
    }
  };

  // --- Rendering Board ---
  const board = Array.from({ length: GRID_SIZE * GRID_SIZE });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={`${styles.h1Snake} ${pixelFont.className}`}>Snakeeee Gameeee</h1>
        <div className={styles.scoreBoard}>Score: {score}</div>
      </div>

      <div className={styles.gameBoard}>
        
        {/* LAYAR GAME OVER */}
        {gameOver && (
          <div className={styles.gameOverOverlay}>
            <h2 className={styles.title}>Game Over!</h2>
            <p>Final Score: {score}</p>
            
            <button className={styles.startButton} onClick={handleBackToMenu}>
              Play Again
            </button>

            {/* --- TOMBOL SHARE SOSIAL MEDIA --- */}
            <div className={styles.shareContainer}>
              <button className={`${styles.shareBtn} ${styles.xBtn}`} onClick={handleShareX}>
                X
              </button>
              <button className={`${styles.shareBtn} ${styles.warpBtn}`} onClick={handleShareWarpcast}>
                Warp
              </button>
              <button className={`${styles.shareBtn} ${styles.baseBtn}`} onClick={handleShareNative}>
                Share
              </button>
            </div>

          </div>
        )}

        {/* LAYAR UTAMA / PILIH SKIN */}
        {!isPlaying && !gameOver && (
           <div className={styles.gameOverOverlay}>
             <h2 className={styles.title}>Choose Your Skin</h2>
             
             <div className={styles.skinSelector}>
                {SKINS.map((skin) => (
                  <img 
                    key={skin.id}
                    src={skin.src}
                    alt={skin.name}
                    className={selectedSkin === skin.src ? `${styles.skinOption} ${styles.selectedSkin}` : styles.skinOption}
                    onClick={() => setSelectedSkin(skin.src)}
                  />
                ))}
             </div>

             <button className={styles.startButton} onClick={handleStart}>
               Start
             </button>
           </div>
        )}

        {/* LOGIKA RENDER PAPAN */}
        {board.map((_, index) => {
          const x = index % GRID_SIZE;
          const y = Math.floor(index / GRID_SIZE);
          
          const isSnake = snake.some(s => s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;

          let content = null;
          // PERBAIKAN 4: Gunakan 'const' karena variabel ini tidak direassign lagi
          const cellStyle = styles.cell; 

          if (isSnake) {
            content = <img src={selectedSkin} alt="snake" className={styles.snakeImage} />;
          } 
          else if (isFood) {
            content = <img src="/base.jpg" alt="food" className={styles.foodImage} />;
          }

          return (
            <div key={`${x}-${y}`} className={cellStyle}>
              {content}
            </div>
          );
        })}
      </div>

      <div>
        <p className={styles.copyRight}>
          Build on <img src="/base.jpg" alt="Base" className={styles.inlineBaseLogo} /> - kersa.base.eth
        </p>
      </div>

      <div className={styles.controls}>
        <div></div> 
        <button className={styles.controlBtn} onClick={() => handleMobileControl("UP")}>⬆️</button>
        <div></div>

        <button className={styles.controlBtn} onClick={() => handleMobileControl("LEFT")}>⬅️</button>
        <button className={styles.controlBtn} onClick={() => handleMobileControl("DOWN")}>⬇️</button>
        <button className={styles.controlBtn} onClick={() => handleMobileControl("RIGHT")}>➡️</button>
      </div>
    </div>
  );
}