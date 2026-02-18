import { forwardRef, type ReactNode } from 'react';

interface PageProps {
    children: ReactNode;
    number?: number;
    className?: string;
    noPadding?: boolean;
}

export const Page = forwardRef<HTMLDivElement, PageProps>((props, ref) => {
    const { noPadding, className, children, number } = props;

    return (
        <div className={`demoPage bg-parchment h-full w-full shadow-inner overflow-hidden relative ${className || ''}`} ref={ref} data-density="soft">
            {!noPadding && (
                <div className="absolute inset-0 bg-[url('/src/assets/parchment_page_texture.jpg')] bg-cover opacity-50 mix-blend-multiply pointer-events-none"></div>
            )}

            <div className={`relative z-10 h-full flex flex-col ${noPadding ? 'p-0' : 'p-8 md:p-12'}`}>
                {children}
                {number && !noPadding && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-parchment-dark/60 text-sm font-serif">
                        - {number} -
                    </div>
                )}
            </div>
        </div>
    );
});

Page.displayName = 'Page';
