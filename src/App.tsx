import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Book } from './components/Book/Book';
import { Page } from './components/Book/Page';

const ClanGrimoire = ({ clanName }: { clanName: string }) => {
  // Get all png and mp3 files from the pages directory
  const allPages = import.meta.glob('/src/assets/pages/**/*.png', { eager: true });
  const allAudio = import.meta.glob('/src/assets/pages/**/*.mp3', { eager: true });

  // Filter pages for the current clan and sort them numerically
  const clanPages = Object.keys(allPages)
    .filter(path => path.includes(`/src/assets/pages/${clanName}/`))
    .sort((a, b) => {
      // Extract numbers from filenames "1.png", "2.png" etc.
      const numA = parseInt(a.split('/').pop()?.replace('.png', '') || '0');
      const numB = parseInt(b.split('/').pop()?.replace('.png', '') || '0');
      return numA - numB;
    })
    .map(path => (allPages[path] as { default: string }).default); // Get the resolved URL from the module

  // Find the audio file for this clan
  const audioPath = Object.keys(allAudio).find(path => path.includes(`/${clanName}.mp3`));
  const musicSrc = audioPath ? (allAudio[audioPath] as { default: string }).default : '';

  return (
    <Book musicSrc={musicSrc}>
      {clanPages.map((imgSrc, index) => (
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

const VillageTransition = ({ isActive, village, onComplete }: { isActive: boolean; village: string | null; onComplete: () => void }) => {
  if (!isActive || !village) return null;

  const getVillageLogo = (villageName: string) => {
    switch (villageName.toLowerCase()) {
      case 'konoha': return '/konoha.svg';
      case 'suna': return '/suna.svg';
      case 'ame': return '/ame.svg';
      case 'kiri': return '/kiri.svg';
      default: return '/konoha.svg';
    }
  };

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
        src={getVillageLogo(village)}
        alt={village}
        initial={{ scale: 0, opacity: 0, rotate: -180 }}
        animate={{ scale: [0, 1, 50], opacity: [0, 1, 1], rotate: [0, 0, 0] }}
        transition={{
          duration: 1.5,
          times: [0, 0.1, 1],
          ease: "easeInOut"
        }}
        onAnimationComplete={onComplete}
        className="w-96 h-96 object-contain drop-shadow-[0_0_30px_rgba(220,38,38,0.5)] z-10"
      />
    </div>
  );
};

const VillageButton = ({
  name,
  clans,
  isOpen,
  onToggle,
  onClanClick
}: {
  name: string,
  clans?: { name: string, path: string }[],
  isOpen: boolean,
  onToggle: () => void,
  onClanClick?: (path: string, village: string) => void
}) => {
  return (
    <div className="relative group">
      <button
        onClick={onToggle}
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
                onClick={() => onClanClick ? onClanClick(clan.path, name) : null}
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
  const [isTransitionActive, setIsTransitionActive] = useState(false);
  const [targetPath, setTargetPath] = useState<string | null>(null);
  const [activeVillage, setActiveVillage] = useState<string | null>(null);
  const [transitionVillage, setTransitionVillage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleClanClick = (path: string, village: string) => {
    setTargetPath(path);
    setTransitionVillage(village);
    setIsTransitionActive(true);
  };

  const handleTransitionComplete = () => {
    if (targetPath) {
      navigate(targetPath);
      setIsTransitionActive(false);
      setTransitionVillage(null);
    }
  };

  const handleVillageToggle = (villageName: string) => {
    setActiveVillage(current => current === villageName ? null : villageName);
  };

  return (
    <div className="h-screen w-full bg-stone-950 flex flex-col items-center justify-center space-y-12 relative overflow-hidden">

      <VillageTransition
        isActive={isTransitionActive}
        village={transitionVillage}
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
            { name: "SENJU", path: "/senju" },
            { name: "NARA", path: "/nara" },
          ]}
          isOpen={activeVillage === 'Konoha'}
          onToggle={() => handleVillageToggle('Konoha')}
          onClanClick={handleClanClick}
        />

        <VillageButton
          name="Suna"
          clans={[
            { name: "KYOUFUU", path: "/kyoufuu" },
            { name: "SABAKU", path: "/sabaku" },
            { name: "SUPAIDA", path: "/supaida" },
          ]}
          isOpen={activeVillage === 'Suna'}
          onToggle={() => handleVillageToggle('Suna')}
          onClanClick={handleClanClick}
        />

        <VillageButton
          name="Ame"
          clans={[
            { name: "KAMI", path: "/kami" },
            { name: "SALAMANDRE", path: "/salamandre" },
            { name: "FUMA", path: "/fuma" },
          ]}
          isOpen={activeVillage === 'Ame'}
          onToggle={() => handleVillageToggle('Ame')}
          onClanClick={handleClanClick}
        />

        <VillageButton
          name="Kiri"
          clans={[
            { name: "HOZUKI", path: "/hozuki" },
            { name: "TSUKI", path: "/tsuki" },
            { name: "KAGUYA", path: "/kaguya" },
          ]}
          isOpen={activeVillage === 'Kiri'}
          onToggle={() => handleVillageToggle('Kiri')}
          onClanClick={handleClanClick}
        />

      </div>

      <div className="absolute bottom-10 opacity-20 animate-pulse">
        <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain filter grayscale" />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/uchiha" element={<ClanGrimoire clanName="uchiha" />} />
        <Route path="/senju" element={<ClanGrimoire clanName="senju" />} />
        <Route path="/nara" element={<ClanGrimoire clanName="nara" />} />
        <Route path="/kyoufuu" element={<ClanGrimoire clanName="kyoufuu" />} />
        <Route path="/sabaku" element={<ClanGrimoire clanName="sabaku" />} />
        <Route path="/supaida" element={<ClanGrimoire clanName="supaida" />} />
        <Route path="/kami" element={<ClanGrimoire clanName="kami" />} />
        <Route path="/salamandre" element={<ClanGrimoire clanName="salamandre" />} />
        <Route path="/fuma" element={<ClanGrimoire clanName="fuma" />} />
        <Route path="/hozuki" element={<ClanGrimoire clanName="hozuki" />} />
        <Route path="/tsuki" element={<ClanGrimoire clanName="tsuki" />} />
        <Route path="/kaguya" element={<ClanGrimoire clanName="kaguya" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
