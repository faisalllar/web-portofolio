import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { 
  CodeIcon, 
  GithubIcon, 
  LinkedinIcon, 
  DownloadIcon, 
  BrainIcon, 
  GlobeIcon, 
  SmartphoneIcon,
  ChevronDownIcon,
  GamepadIcon
} from "lucide-react";

// Mini game particle type
interface GameParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  clicked: boolean;
  points: number;
}

const Home = () => {
  const [typedText, setTypedText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  const toType = "Web Developer | UI Designer | Mobile Developer";
  const typingSpeed = 100; // ms per character
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Mini game states
  const [showGameModal, setShowGameModal] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [gameParticles, setGameParticles] = useState<GameParticle[]>([]);
  const [gameScore, setGameScore] = useState(0);
  const [gameTime, setGameTime] = useState(30);
  const gameCanvasRef = useRef<HTMLDivElement | null>(null);
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);
  const gameFrameRef = useRef<number | null>(null);
  const [gameHighScore, setGameHighScore] = useState(0);
  
  // Matrix-style background effect
  const DigitalRain = () => {
    return (
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-5 overflow-hidden">
        <div className="matrix-rain">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="matrix-column" style={{ 
              left: `${i * 5}%`, 
              animationDuration: `${Math.random() * 5 + 10}s`,
              animationDelay: `${Math.random() * 2}s` 
            }}>
              {Array.from({ length: 15 }).map((_, j) => (
                <div key={j} className="matrix-character" style={{ 
                  animationDuration: `${Math.random() * 2 + 1}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}>
                  {String.fromCharCode(Math.floor(Math.random() * 26) + 97)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Mini game - initialize
  const initializeGame = useCallback(() => {
    setGameScore(0);
    setGameTime(30);
    setGameActive(true);
    
    // Generate initial particles
    const newParticles: GameParticle[] = [];
    for (let i = 0; i < 15; i++) {
      const radius = Math.random() * 15 + 10;
      newParticles.push({
        id: i,
        x: Math.random() * (window.innerWidth * 0.8 - radius * 2) + radius,
        y: Math.random() * (window.innerHeight * 0.7 - radius * 2) + radius,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        radius,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
        clicked: false,
        points: Math.floor(30 / radius) + 1, // Smaller particles give more points
      });
    }
    setGameParticles(newParticles);
    
    // Set timer
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
    }
    
    gameTimerRef.current = setInterval(() => {
      setGameTime(prevTime => {
        if (prevTime <= 1) {
          endGame();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    // Start animation frame
    if (gameFrameRef.current) {
      cancelAnimationFrame(gameFrameRef.current);
    }
    
    const updateParticles = () => {
      setGameParticles(prevParticles => {
        return prevParticles.map(particle => {
          // If already clicked, make it disappear
          if (particle.clicked) {
            return {
              ...particle,
              radius: particle.radius * 0.9, // Shrink
              opacity: 0.7
            };
          }
          
          // Update position
          let newX = particle.x + particle.vx;
          let newY = particle.y + particle.vy;
          
          // Bounce off walls
          if (newX < particle.radius || newX > window.innerWidth * 0.8 - particle.radius) {
            particle.vx *= -1;
            newX = particle.x + particle.vx;
          }
          
          if (newY < particle.radius || newY > window.innerHeight * 0.7 - particle.radius) {
            particle.vy *= -1;
            newY = particle.y + particle.vy;
          }
          
          return {
            ...particle,
            x: newX,
            y: newY
          };
        }).filter(particle => !particle.clicked || particle.radius > 1); // Remove clicked particles that are too small
      });
      
      // Add new particles occasionally if there are fewer than 10
      if (Math.random() < 0.05 && gameParticles.length < 10) {
        setGameParticles(prev => {
          const radius = Math.random() * 15 + 10;
          return [...prev, {
            id: Date.now(),
            x: Math.random() * (window.innerWidth * 0.8 - radius * 2) + radius,
            y: Math.random() * (window.innerHeight * 0.7 - radius * 2) + radius,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            radius,
            color: `hsl(${Math.random() * 360}, 70%, 50%)`,
            clicked: false,
            points: Math.floor(30 / radius) + 1,
          }];
        });
      }
      
      gameFrameRef.current = requestAnimationFrame(updateParticles);
    };
    
    gameFrameRef.current = requestAnimationFrame(updateParticles);
  }, []);
  
  // Mini game - handle click on a particle
  const handleParticleClick = (id: number) => {
    if (!gameActive) return;
    
    setGameParticles(prevParticles => 
      prevParticles.map(particle => {
        if (particle.id === id && !particle.clicked) {
          setGameScore(prevScore => prevScore + particle.points);
          return { ...particle, clicked: true };
        }
        return particle;
      })
    );
  };
  
  // Mini game - end game
  const endGame = () => {
    setGameActive(false);
    
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
    }
    
    if (gameFrameRef.current) {
      cancelAnimationFrame(gameFrameRef.current);
    }
    
    if (gameScore > gameHighScore) {
      setGameHighScore(gameScore);
    }
  };
  
  // Cleanup game on unmount
  useEffect(() => {
    return () => {
      if (gameTimerRef.current) {
        clearInterval(gameTimerRef.current);
      }
      
      if (gameFrameRef.current) {
        cancelAnimationFrame(gameFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typedText.length < toType.length) {
      const timeout = setTimeout(() => {
        setTypedText(toType.substring(0, typedText.length + 1));
      }, typingSpeed);
      
      return () => clearTimeout(timeout);
    } else {
      setTypingComplete(true);
    }
  }, [typedText]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 100);
    y.set(yPct * 100);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.8,
      },
    },
  };

  // Wave animation for particles
  const waveVariants = {
    start: {
      y: 0,
      transition: {
        yoyo: Infinity,
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  // Create 5 random particles with different positions and sizes
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 2,
    delay: Math.random() * 2
  }));

  const services = [
    {
      icon: <GlobeIcon className="h-6 w-6" />,
      title: "Web Development",
      description:
        "Membuat website modern dan responsif dengan berbagai teknologi terbaru seperti React, Next.js, dan Tailwind CSS.",
      bgClass: "bg-gray-100 dark:bg-gray-800",
      textClass: "text-black dark:text-white",
    },
    {
      icon: <SmartphoneIcon className="h-6 w-6" />,
      title: "Mobile Development",
      description:
        "Mengembangkan aplikasi mobile untuk Android dan iOS menggunakan React Native dan Flutter.",
      bgClass: "bg-gray-100 dark:bg-gray-800",
      textClass: "text-black dark:text-white",
    },
    {
      icon: <BrainIcon className="h-6 w-6" />,
      title: "UI/UX Design",
      description:
        "Merancang antarmuka yang intuitif dan menarik dengan fokus pada pengalaman pengguna yang baik.",
      bgClass: "bg-gray-100 dark:bg-gray-800",
      textClass: "text-black dark:text-white",
    },
  ];

  return (
    <motion.section
      id="home"
      className="pt-16 pb-24 px-4 overflow-hidden relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Matrix-style background effect */}
      <DigitalRain />

      {/* Parallax background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-40 h-40 rounded-full bg-gray-200 dark:bg-gray-800 opacity-30 blur-3xl"
          animate={{ 
            y: [0, -15, 0],
            x: [0, 10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "center center" }}
        />
        <motion.div 
          className="absolute bottom-40 right-20 w-60 h-60 rounded-full bg-gray-200 dark:bg-gray-800 opacity-30 blur-3xl"
          animate={{ 
            y: [0, 20, 0],
            x: [0, -15, 0],
            scale: [1, 1.08, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ transformOrigin: "center center" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-800 opacity-20 blur-3xl"
          animate={{ 
            y: [0, 25, 0],
            x: [0, 25, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ transformOrigin: "center center" }}
        />
        
        {/* Floating particles with parallax effect */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-black dark:bg-white opacity-20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              zIndex: Math.floor(particle.size)
            }}
            initial={{ y: 0 }}
            animate={{
              y: [0, particle.size * -1.5, 0],
              x: [0, particle.size * (particle.id % 2 === 0 ? 1 : -1), 0],
            }}
            transition={{ 
              duration: 5 + particle.size / 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: particle.delay
            }}
          />
        ))}
      </div>
      
      {/* Mini game modal */}
      {showGameModal && (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <GamepadIcon className="h-5 w-5 text-black dark:text-white" />
                  <h3 className="text-lg font-semibold text-black dark:text-white">Mini Game: Pop the Bubbles!</h3>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Time:</span>
                    <span className={`font-mono text-sm font-semibold ${gameTime < 10 ? 'text-red-600 dark:text-red-400' : 'text-black dark:text-white'}`}>
                      {gameTime}s
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Score:</span>
                    <span className="font-mono text-sm font-semibold text-black dark:text-white">{gameScore}</span>
                  </div>
                  
                  <button
                    onClick={() => setShowGameModal(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div 
                  ref={gameCanvasRef}
                  className="relative w-full h-[60vh] bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  {gameActive ? (
                    <>
                      {gameParticles.map(particle => (
                        <motion.div
                          key={particle.id}
                          className="absolute rounded-full cursor-pointer"
                          style={{
                            left: particle.x,
                            top: particle.y,
                            width: particle.radius * 2,
                            height: particle.radius * 2,
                            backgroundColor: particle.color,
                            opacity: particle.clicked ? 0.5 : 1
                          }}
                          animate={particle.clicked ? { scale: 0 } : { scale: 1 }}
                          onClick={() => handleParticleClick(particle.id)}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        />
                      ))}
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
                        {gameTime === 0 ? 'Game Over!' : 'Ready to Play?'}
                      </h3>
                      
                      {gameTime === 0 && (
                        <div className="text-center mb-6">
                          <p className="text-gray-600 dark:text-gray-300 mb-2">Your Score: <span className="font-bold text-black dark:text-white">{gameScore}</span></p>
                          <p className="text-gray-600 dark:text-gray-300">High Score: <span className="font-bold text-black dark:text-white">{gameHighScore}</span></p>
                        </div>
                      )}
                      
                      <p className="text-gray-600 dark:text-gray-300 text-center max-w-md mb-6">
                        Click on the bubbles as fast as you can to earn points. Smaller bubbles are worth more points!
                      </p>
                      
                      <Button
                        onClick={initializeGame}
                        className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black"
                      >
                        {gameTime === 0 ? 'Play Again' : 'Start Game'}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
          <motion.div
            className="w-full md:w-1/2 space-y-6"
            variants={itemVariants}
          >
            <motion.div 
              className="mb-3 text-gray-700 dark:text-gray-300 font-medium inline-block"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              Halo, Saya adalah
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-black dark:text-white font-['Poppins']"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              Muhammad Faisal A.{" "}
              <span className="text-black dark:text-white block mt-2">
                <span className="text-black dark:text-white mr-1">{typedText}</span>
                <motion.span
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity, 
                    times: [0, 0.2, 0.8, 1] 
                  }}
                  className="inline-block w-[2px] h-8 bg-black dark:bg-white align-middle"
                >
                  &nbsp;
                </motion.span>
              </span>
            </motion.h1>

            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              Seorang mahasiswa Informatika dan pengembang web yang bersemangat tentang
              menciptakan pengalaman digital yang menarik dan intuitif untuk pengguna.
            </motion.p>

            <motion.div 
              className="flex space-x-4 pt-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <motion.a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
                aria-label="GitHub"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <GithubIcon className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
                aria-label="LinkedIn"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <LinkedinIcon className="h-5 w-5" />
              </motion.a>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <Link href="/contact">
                <Button 
                  className="w-full sm:w-auto text-center bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black" 
                  size="lg"
                >
                  <motion.span
                    initial={{ opacity: 1 }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    Hubungi Saya
                  </motion.span>
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full sm:w-auto text-center border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
                size="lg"
              >
                <motion.span
                  initial={{ opacity: 1 }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="flex items-center"
                >
                  <DownloadIcon className="mr-2 h-4 w-4" /> Download CV
                </motion.span>
              </Button>
            </motion.div>
            
            {/* Play mini game button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="mt-4"
            >
              <Button
                onClick={() => setShowGameModal(true)}
                variant="ghost"
                className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                <GamepadIcon className="h-5 w-5 group-hover:animate-pulse" />
                <span className="relative font-medium dark:group-hover:text-white group-hover:text-black transition-colors duration-300">
                  Main Game Pop Bubbles
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-black dark:bg-white"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
                <motion.span
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                  className="ml-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded-md"
                >
                  New
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2"
            style={{ 
              perspective: 1000,
              scale,
              opacity
            }}
            variants={itemVariants}
          >
            <motion.div
              className="relative"
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleMouse}
              onMouseLeave={handleMouseLeave}
            >
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-600 rounded-full blur-3xl opacity-10 -z-10 transform -rotate-12"></div>
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300"
                initial={{ rotate: 2 }}
                whileHover={{ 
                  rotate: 0,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <motion.div 
                  className="relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Muhammad Faisal"
                    className="w-full h-auto object-cover transition-all duration-700"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' })}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll Down</span>
            <ChevronDownIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </motion.div>
        </motion.div>

        <motion.div
          ref={scrollRef}
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
            >
              <motion.div 
                className="absolute top-0 right-0 w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-bl-full -z-10"
                whileHover={{
                  scale: 2,
                  transition: { duration: 0.5 }
                }}
              />
              
              <motion.div
                className={`w-12 h-12 ${service.bgClass} ${service.textClass} rounded-full flex items-center justify-center mb-4 border border-gray-300 dark:border-gray-700`}
                whileHover={{ 
                  rotate: 360,
                  scale: 1.1,
                  transition: { duration: 0.5 }
                }}
              >
                {service.icon}
              </motion.div>
              
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">{service.title}</h3>
              
              <p className="text-gray-600 dark:text-gray-300">
                {service.description}
              </p>
              
              <motion.div 
                className="w-full h-1 bg-gray-200 dark:bg-gray-700 mt-4 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="h-full bg-black dark:bg-white rounded-full"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "60%" }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial section */}
        <motion.div 
          className="mt-24"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-center mb-10 text-black dark:text-white"
            variants={itemVariants}
          >
            Testimonials
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Budi Santoso",
                title: "Project Manager at XYZ Company",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                text: "Muhammad Faisal sangat profesional dan terampil. Project website kami selesai tepat waktu dan hasil akhirnya melampaui ekspektasi kami. Komunikasinya juga lancar selama proses pengerjaan."
              },
              {
                name: "Siti Rahma",
                title: "Founder of StartUp Indonesia",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
                text: "Saya sangat puas dengan hasil pekerjaan Faisal. Desain UI/UX yang dihasilkan intuitif, modern, dan sangat sesuai dengan branding kami. Akan bekerjasama lagi di project berikutnya."
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-bl-full -z-10 opacity-50" />
                
                <div className="flex items-center mb-4">
                  <div className="mr-4 rounded-full overflow-hidden w-14 h-14 border-2 border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-black dark:text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 relative">
                  <span className="absolute -top-2 -left-1 text-4xl text-gray-200 dark:text-gray-700">"</span>
                  <span className="relative z-10">{testimonial.text}</span>
                  <span className="absolute -bottom-5 -right-1 text-4xl text-gray-200 dark:text-gray-700">"</span>
                </p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <Link href="/projects">
              <Button 
                size="lg" 
                className="px-8 bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black overflow-hidden group relative"
              >
                <motion.span
                  initial={{ opacity: 1 }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="relative z-10"
                >
                  Lihat Portofolio Saya
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gray-600 to-black dark:from-gray-400 dark:to-white -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom CSS for the Matrix effect */}
      <style dangerouslySetInnerHTML={{ 
        __html: `
        .matrix-rain {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.2;
        }
        
        .matrix-column {
          position: absolute;
          top: -20%;
          width: 1px;
          height: 120%;
          background: linear-gradient(to bottom, 
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.5) 75%,
            rgba(0, 0, 0, 0) 100%);
          animation: fall linear infinite;
        }
        
        .matrix-character {
          position: relative;
          color: rgba(0, 0, 0, 0.8);
          font-family: monospace;
          font-size: 1.2rem;
          text-align: center;
          animation: glow ease-in-out infinite;
        }
        
        @keyframes fall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        .dark .matrix-character {
          color: rgba(255, 255, 255, 0.8);
        }
      `}} />
    </motion.section>
  );
};

export default Home;
