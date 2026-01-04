import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SelectableBox from '../../components/SelectableBox';

const HomePage = () => {
  const [videoReady, setVideoReady] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const totalBoxes = 7; // or fetch dynamically
  const BOX_WIDTH = 184; // box size + gap
  const ANCHOR_X = -130; // visual anchor position for selected box
  const [openFile, setOpenFile] = useState(null);
  const boxes = [
    { id: 0, title: "Resume", image: "/boxes/Resume.png", file: "/resume.pdf" },
    { id: 1, title: "Secure Data Wiping", image: "/boxes/Project3.png", url: "https://sih-toz2.vercel.app/" },
    { id: 2, title: "MediFlow", image: "/boxes/Project2.png" },
    { id: 3, title: "PragatiAI", image: "/boxes/Project1.png" },
    { id: 4, title: "Movie Reviews", image: "/boxes/Movies.png" },
    { id: 5, title: "Game Reviews", image: "/boxes/Games.png" },
    { id: 6, title: "Currently what I'm listening to", image: "/boxes/Music.png" },
  ];



  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!animationDone) return;
      setSelectedBox((prev) => {
        let newIndex = prev ?? 0; // fallback to first box
        if (e.key === 'ArrowRight') newIndex = Math.min(newIndex + 1, totalBoxes - 1);
        if (e.key === 'ArrowLeft') newIndex = Math.max(newIndex - 1, 0);
        return newIndex;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [animationDone, totalBoxes]);

  // Set time
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const timeStr = now
        .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
        .replace(/am|pm/, (match) => match.toUpperCase());
      setCurrentTime(timeStr);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle video readiness
  useEffect(() => {
    if (videoReady) {
      setStartAnimation(false);
      const timer = setTimeout(() => {
        setStartAnimation(true);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [videoReady]);

  // Auto-select first box after animation
  useEffect(() => {
    if (startAnimation) {
      const timer = setTimeout(() => {
        setAnimationDone(true);
        setSelectedBox(0); // Select first box after animation
      }, 1500); // match animation duration
      return () => clearTimeout(timer);
    }
  }, [startAnimation]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <video
        autoPlay muted loop playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        onCanPlay={() => setVideoReady(true)}
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Gradient Line */}
      <motion.div
        initial={{ scale: 0.5, x: 35, y: 250, opacity: 0.5, scaleY: 1 }}
        animate={
          videoReady
            ? startAnimation
              ? { scale: 0.8, x: -215, y: 90, opacity: 1, scaleY: 0.4 }
              : { scale: 0.5, x: 35, y: 250, opacity: 0.5, scaleY: 0.4 }
            : { opacity: 0 }
        }
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute left-64 w-[90vw] max-w-6xl h-1 z-30 origin-left"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,0.8) 70%, rgba(255,255,255,0) 100%)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Top Row (Icons + Name + Trophy + Time) */}
      <div
        className="absolute left-[0px] w-[90vw] max-w-6xl z-40 flex justify-center items-center"
        style={{ top: '38px' }}
      >
        {/* Store Icon */}
        <div className="w-16 h-16 flex justify-center items-center">
          <motion.img
            src="/store.webp"
            alt="store"
            initial={{ scale: 0.6, x: 35, y: 165, opacity: 1 }}
            animate={
              videoReady && startAnimation
                ? { scale: 1.2, x: -170, y: -10, opacity: 1 }
                : { scale: 0.6, x: 35, y: 165, opacity: 1 }
            }
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-10 h-10 object-contain"
          />
        </div>

        {/* Info Icon */}
        <div className="w-16 h-16 flex justify-center items-center">
          <motion.img
            src="/information.png"
            alt="information"
            initial={{ scale: 0.6, x: 30, y: 165, opacity: 1 }}
            animate={
              videoReady && startAnimation
                ? { scale: 0.9, x: -145, y: -10, opacity: 1 }
                : { scale: 0.6, x: 30, y: 165, opacity: 1 }
            }
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-10 h-10 object-contain"
          />
        </div>

        {/* Friends Icon (Stays Visible) */}
        <div className="w-16 h-16 flex justify-center items-center">
          <motion.img
            src="/friends.png"
            alt="friends"
            initial={{ scale: 0.6, x: 30, y: 165, opacity: 1 }}
            animate={
              videoReady && startAnimation
                ? { scale: 1.1, x: 250, y: -10, opacity: 1 }
                : { scale: 0.6, x: 30, y: 165, opacity: 1 }
            }
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-14 h-14 object-contain"
          />
        </div>

        {/* Message Icon (Fade Out) */}
        <div className="w-16 h-16 flex justify-center items-center">
          <motion.img
            src="/message.png"
            alt="message"
            initial={{ scale: 1.4, x: 20, y: 172, opacity: 1 }}
            animate={
              videoReady && startAnimation
                ? { scale: 0.9, x: 200, y: 0, opacity: 0 }
                : { scale: 1.4, x: 20, y: 172, opacity: 1 }
            }
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-14 h-14 object-contain"
          />
        </div>

        {/* Headphone Icon (Fade Out) */}
        <div className="w-16 h-16 flex justify-center items-center">
          <motion.img
            src="/headphone.png"
            alt="headphone"
            initial={{ scale: 1.1, x: 10, y: 164, opacity: 1 }}
            animate={
              videoReady && startAnimation
                ? { scale: 0.9, x: 150, y: 0, opacity: 0 }
                : { scale: 1.1, x: 10, y: 164, opacity: 1 }
            }
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-14 h-14 object-contain"
          />
        </div>


        {/* Profile Image */}
        <div className="w-16 h-16 flex justify-center items-center">
          <motion.img
            src="/aakash.jpg"
            alt="Aakash"
            initial={{ scale: 0.6, x: 5, y: 165, opacity: 1 }}
            animate={
              videoReady && startAnimation
                ? { scale: 0.9, x: 160, y: -10, opacity: 1 }
                : { scale: 0.6, x: 5, y: 165, opacity: 1 }
            }
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-12 h-12 object-cover mb-1"
            style={{ borderRadius: 0 }}
          />
        </div>

        {/* Name */}
        <motion.div
          initial={{ scale: 0.6, x: 70, y: 165, opacity: 0 }}
          animate={
            videoReady && startAnimation
              ? { scale: 0.9, x: 285, y: -10, opacity: 1 }
              : { scale: 0.6, x: 70, y: 165, opacity: 0 }
          }
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute top-3/2 -translate-y-1/2 text-white font-semibold text-sm md:text-lg whitespace-nowrap"
        >
          Aakash Raj Jindal
        </motion.div>

        {/* Trophy Icon (Stays Visible) */}
        <div className="w-16 h-16 flex justify-center items-center">
          <motion.img
            src="/trophy.png"
            alt="trophies"
            initial={{ scale: 0.8, x: 0, y: 165, opacity: 1 }}
            animate={
              videoReady && startAnimation
                ? { scale: 1.2, x: 575, y: -10, opacity: 1 }
                : { scale: 0.8, x: 0, y: 165, opacity: 1 }
            }
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-10 h-10 object-contain"
          />
        </div>

        {/* Suitcase Icon (Fade Out) */}
        <div className="w-16 h-16 flex justify-center items-center">
          <motion.img
            src="/suitcase.png"
            alt="suitcase"
            initial={{ scale: 0.8, x: -10, y: 165, opacity: 1 }}
            animate={
              videoReady && startAnimation
                ? { scale: 0.6, x: 580, y: 0, opacity: 0 }
                : { scale: 0.8, x: -10, y: 165, opacity: 1 }
            }
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-10 h-10 object-contain"
          />
        </div>

        {/* ON Icon (Fade Out + White Inverted) */}
        <div className="w-16 h-16 flex justify-center items-center">
          <motion.img
            src="/on.png"
            alt="on"
            initial={{ scale: 0.7, x: -20, y: 165, opacity: 1 }}
            animate={
              videoReady && startAnimation
                ? { scale: 0.6, x: 590, y: 0, opacity: 0 }
                : { scale: 0.7, x: -20, y: 165, opacity: 1 }
            }
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-8 h-8 object-contain filter invert brightness-200"
          />
        </div>
        {/* Time (appears after trophy animation) */}
        <motion.div
          initial={{ opacity: 0, x: 480, y: -10 }}
          animate={
            videoReady && startAnimation
              ? { opacity: 1, x: 480, y: -10 }
              : { opacity: 0, x: 480, y: -10 }
          }
          transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
          className="text-white text-xl md:text-1xl ml-2"
        >
          {currentTime}
        </motion.div>
      </div>
      <motion.div
        initial={{ scale: 0.5, x: -600, y: -280 }}
        animate={
          videoReady && startAnimation
            ? {
              scale: 1.5,
              x: ANCHOR_X - (selectedBox ?? 0) * BOX_WIDTH,
              y: -315
            }
            : { scale: 0.5, x: -600, y: -280 }
        }
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div
          className="flex gap-4"
          animate={{
            x: 0 // no extra x shift, already handled by outer container
          }}
          transition={{ duration: 0.6 }}
        >
          {boxes.map((box, index) => (
            <SelectableBox
              key={index}
              title={box.title}       // <-- this uses your custom title
              image={box.image}       // <-- this uses your custom image
              isSelected={animationDone && selectedBox === index}
              animationDone={animationDone}
              onClick={() => {
                setSelectedBox(index); // keep selection effect
                if (box.url) window.open(box.url, "_blank");
                if (box.file) setOpenFile(box.file); // opens the site in a new tab
              }}
            />
          ))}
        </motion.div>
      </motion.div>
      {openFile && (
  <div
    className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
    onClick={() => setOpenFile(null)} // close modal on background click
  >
    <div
      className="bg-white w-11/12 md:w-3/4 h-3/4 p-4 relative"
      onClick={(e) => e.stopPropagation()} // prevent modal from closing when clicking inside
    >
      <iframe
        src={openFile}
        className="w-full h-full"
        title="Document Viewer"
      />
      <button
        className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
        onClick={() => setOpenFile(null)}
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default HomePage;