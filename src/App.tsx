import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Book } from './components/Book/Book';
import { Page } from './components/Book/Page';

const UchihaGrimoire = () => {
  const pages = [
    '/src/assets/pages/uchiha/page1.jpg',
    '/src/assets/pages/uchiha/page2.jpg',
    '/src/assets/pages/uchiha/page3.jpg',
    '/src/assets/pages/uchiha/page4.jpg',
    '/src/assets/pages/uchiha/page5.jpg',
    '/src/assets/pages/uchiha/page6.jpg',
    '/src/assets/pages/uchiha/page7.jpg',
    '/src/assets/pages/uchiha/page8.jpg',
    '/src/assets/pages/uchiha/page9.jpg',
    '/src/assets/pages/uchiha/page10.jpg',
    '/src/assets/pages/uchiha/page11.jpg',
    '/src/assets/pages/uchiha/page12.jpg',
  ];

  return (
    <Book musicSrc="/src/assets/pages/uchiha/uchiha.mp3">
      {pages.map((imgSrc, index) => (
        <Page key={index} number={index + 1} noPadding={true}>
          <div className="w-full h-full relative">
            <img
              src={imgSrc}
              alt={`Page ${index + 1}`}
              className="w-full h-full object-fill"
            />
          </div>
        </Page>
      ))}
    </Book>
  );
};

const SenjuGrimoire = () => {
  const pages = [
    '/src/assets/pages/senju/page1.jpg',
    '/src/assets/pages/senju/page2.jpg',
    '/src/assets/pages/senju/page3.jpg',
    '/src/assets/pages/senju/page4.jpg',
    '/src/assets/pages/senju/page5.jpg',
    '/src/assets/pages/senju/page6.jpg',
    '/src/assets/pages/senju/page7.jpg',
    '/src/assets/pages/senju/page8.jpg',
    '/src/assets/pages/senju/page9.jpg',
    '/src/assets/pages/senju/page10.jpg',
    '/src/assets/pages/senju/page11.jpg',
    '/src/assets/pages/senju/page12.jpg',
  ];

  return (
    <Book>
      {pages.map((imgSrc, index) => (
        <Page key={index} number={index + 1} noPadding={true}>
          <div className="w-full h-full relative">
            <img
              src={imgSrc}
              alt={`Page ${index + 1}`}
              className="w-full h-full object-fill"
            />
          </div>
        </Page>
      ))}
    </Book>
  );
};

const KonohaTransition = ({ isActive, onComplete }: { isActive: boolean; onComplete: () => void }) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
      {/* Background filler that fades in to cover the screen as we zoom in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeIn", delay: 0.4 }}
        className="absolute inset-0 bg-stone-950"
      />

      <motion.img
        src="/src/assets/konoha_symbol.svg"
        alt="Konoha"
        initial={{ scale: 0, opacity: 0, rotate: -180 }}
        animate={{ scale: [0, 1, 50], opacity: [0, 1, 1], rotate: [0, 0, 0] }}
        transition={{
          duration: 2.5,
          times: [0, 0.4, 1],
          ease: "easeInOut"
        }}
        onAnimationComplete={onComplete}
        className="w-96 h-96 object-contain drop-shadow-[0_0_30px_rgba(220,38,38,0.5)] z-10"
      />
    </div>
  );
};

const VillageButton = ({ name, clans, onClanClick }: { name: string, clans?: { name: string, path: string }[], onClanClick?: (path: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-8 py-4 border transition-all duration-500 rounded-sm relative overflow-hidden min-w-[200px]
          ${isOpen ? 'bg-red-900/40 border-red-800 shadow-[0_0_20px_rgba(153,27,27,0.3)]' : 'bg-red-950/20 border-red-900/50 hover:bg-red-900/30'}
        `}
      >
        <span className="relative z-10 text-xl font-cinzel tracking-[0.2em] text-red-100 group-hover:text-white transition-colors uppercase">
          {name}
        </span>
        <div className={`absolute inset-0 bg-gradient-to-t from-red-900/20 to-transparent transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}></div>
      </button>

      {/* Dropdown Menu */}
      <div className={`absolute top-full left-0 w-full mt-2 transition-all duration-300 origin-top z-50
        ${isOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-0 -translate-y-4 pointer-events-none'}
      `}>
        <div className="bg-stone-950 border border-red-900/50 rounded-sm shadow-xl p-2 flex flex-col gap-1 backdrop-blur-md">
          {clans ? (
            clans.map(clan => (
              <button
                key={clan.name}
                onClick={() => onClanClick ? onClanClick(clan.path) : null}
                className="w-full text-left px-4 py-2 text-stone-300 hover:text-red-200 hover:bg-red-900/20 rounded-sm transition-colors text-center font-zen tracking-widest text-sm"
              >
                {clan.name}
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-stone-600 text-center font-zen italic text-xs">
              Aucun clan disponible
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [isKonohaTransitionActive, setIsKonohaTransitionActive] = useState(false);
  const [targetPath, setTargetPath] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleKonohaClanClick = (path: string) => {
    setTargetPath(path);
    setIsKonohaTransitionActive(true);
  };

  const handleTransitionComplete = () => {
    if (targetPath) {
      navigate(targetPath);
      setIsKonohaTransitionActive(false);
    }
  };

  return (
    <div className="h-screen w-full bg-stone-950 flex flex-col items-center justify-center space-y-12 relative overflow-hidden">

      <KonohaTransition
        isActive={isKonohaTransitionActive}
        onComplete={handleTransitionComplete}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-stone-950/80 to-black pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

      <div className="relative z-10 text-center space-y-4">
        <h1 className="text-6xl md:text-8xl font-cinzel text-transparent bg-clip-text bg-gradient-to-b from-red-100 to-red-900 drop-shadow-2xl tracking-widest uppercase filter brightness-125">
          Lore Clans
        </h1>
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-red-800 to-transparent mx-auto"></div>
        <p className="text-stone-400 font-zen tracking-[0.3em] text-sm md:text-base uppercase">
          Archives du Monde Ninja
        </p>
      </div>

      <div className="flex gap-8 relative z-10 items-start min-h-[200px]">

        <VillageButton
          name="Konoha"
          clans={[
            { name: "UCHIHA", path: "/uchiha" },
            { name: "SENJU", path: "/senju" }
          ]}
          onClanClick={handleKonohaClanClick}
        />

        <VillageButton name="Ame" />

        <VillageButton name="Suna" />

      </div>

      <div className="absolute bottom-10 opacity-20 animate-pulse">
        <span className="text-6xl text-red-900">❖</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/uchiha" element={<UchihaGrimoire />} />
        <Route path="/senju" element={<SenjuGrimoire />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
