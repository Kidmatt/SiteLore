import React, { useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Link } from 'react-router-dom';

import { MusicPlayer } from '../Audio/MusicPlayer';

interface BookProps {
    children: React.ReactNode;
    musicSrc?: string;
}



// ... (imports)

export const Book: React.FC<BookProps> = ({ children, musicSrc }) => {
    const bookRef = useRef<any>(null);
    const [bookState, setBookState] = useState<'closed-start' | 'open' | 'closed-end'>('closed-start');

    const onFlip = (e: any) => {
        const pageIndex = e.data;
        const totalPages = bookRef.current?.pageFlip()?.getPageCount();

        if (pageIndex === 0) {
            setBookState('closed-start');
        } else if (totalPages && pageIndex >= totalPages - 1) {
            setBookState('closed-end');
        } else {
            setBookState('open');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-stone-950 overflow-hidden relative transition-all duration-1000 ease-in-out">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/20 via-stone-950 to-black pointer-events-none"></div>

            <Link
                to="/"
                className="absolute top-8 left-8 z-50 px-6 py-2 border border-red-900/50 text-red-100/60 font-zen hover:bg-red-900/20 hover:text-white transition-all duration-300 rounded-sm"
            >
                ← Retour
            </Link>

            <div
                className={`relative transition-transform duration-700 ease-in-out ${bookState === 'closed-start' ? '-translate-x-[25%]' :
                    bookState === 'closed-end' ? 'translate-x-[25%]' :
                        'translate-x-0'
                    }`}
            >
                <HTMLFlipBook
                    width={450}
                    height={640}
                    size="fixed"
                    minWidth={300}
                    maxWidth={800}
                    minHeight={400}
                    maxHeight={1000}
                    maxShadowOpacity={0.8}
                    showCover={true}
                    mobileScrollSupport={false}
                    className="shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                    style={{}}
                    startPage={0}
                    drawShadow={true}
                    flippingTime={1500}
                    usePortrait={false}
                    startZIndex={0}
                    autoSize={true}
                    clickEventForward={true}
                    useMouseEvents={true}
                    swipeDistance={30}
                    showPageCorners={false}
                    disableFlipByClick={false}
                    onFlip={onFlip}
                    ref={bookRef}
                >
                    {children}
                </HTMLFlipBook>
            </div>

            {musicSrc && <MusicPlayer src={musicSrc} />}
        </div>
    );
};
