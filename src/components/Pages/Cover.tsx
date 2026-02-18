import { forwardRef } from 'react';
import { motion } from 'framer-motion';

export const Cover = forwardRef<HTMLDivElement, any>((_props, ref) => {
    return (
        <div className="page page-cover bg-uchiha-dark text-parchment h-full w-full shadow-2xl overflow-hidden relative border-4 border-yellow-900/50" ref={ref} data-density="hard">
            <div className="absolute inset-0 bg-[url('/src/assets/leather_texture.jpg')] opacity-30 mix-blend-overlay"></div>
            <div className="h-full flex flex-col items-center justify-center p-10 border-double border-8 border-yellow-600/30 m-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="w-48 h-48 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.6)] mb-12 relative overflow-hidden"
                >
                    <div className="w-full h-1/2 bg-white absolute bottom-0"></div>
                    <div className="w-full h-1/2 bg-red-700 absolute top-0 rounded-t-full"></div>
                    <div className="w-8 h-24 bg-gray-800 absolute bottom-0 translate-y-1/2 rounded-full"></div>
                </motion.div>

                <h1 className="text-6xl font-crimson font-bold tracking-widest text-center text-yellow-500 drop-shadow-md mb-4 uppercase">
                    Uchiha
                </h1>
                <p className="text-xl font-serif text-yellow-500/80 tracking-widest uppercase">
                    Lore clans - EDO RP
                </p>

                <div className="absolute bottom-10 opacity-50">
                    <span className="text-4xl text-yellow-700">❖</span>
                </div>
            </div>
        </div>
    );
});

Cover.displayName = 'Cover';
