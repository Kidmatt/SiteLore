import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MusicPlayerProps {
    src: string;
}

export const MusicPlayer = ({ src }: MusicPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.1);
    const [showModal, setShowModal] = useState(true);

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play().catch(e => console.error("Audio play failed:", e));
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying]);

    const handleAccept = () => {
        setIsPlaying(true);
        setShowModal(false);
    };

    const handleDecline = () => {
        setIsPlaying(false);
        setShowModal(false);
    };

    return (
        <>
            <audio ref={audioRef} src={src} loop />

            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-stone-900 border-2 border-red-900/50 p-8 rounded-sm max-w-sm text-center shadow-[0_0_30px_rgba(153,27,27,0.3)]"
                        >
                            <h3 className="text-2xl font-cinzel text-red-100 mb-4 tracking-widest uppercase">Ambiance Sonore</h3>
                            <p className="text-stone-400 font-zen mb-8">Souhaitez-vous activer la musique d'ambiance pour une meilleure immersion ?</p>
                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={handleDecline}
                                    className="px-6 py-2 border border-stone-700 text-stone-400 hover:text-stone-200 hover:border-stone-500 font-zen transition-colors"
                                >
                                    NON
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="px-6 py-2 bg-red-900/40 border border-red-800 text-red-100 hover:bg-red-800/60 font-cinzel tracking-widest transition-all shadow-[0_0_15px_rgba(153,27,27,0.2)] hover:shadow-[0_0_20px_rgba(153,27,27,0.4)]"
                                >
                                    OUI
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!showModal && (
                <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-stone-900/80 backdrop-blur-md border border-red-900/30 p-3 rounded-full flex items-center gap-3 shadow-xl"
                    >
                        {/* Play/Pause Button */}
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-10 h-10 flex items-center justify-center text-red-200 hover:text-white transition-colors"
                        >
                            {isPlaying ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            )}
                        </button>

                        {/* Volume Slider */}
                        <div className="flex items-center w-24">
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="w-full h-1 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-red-700"
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
};
