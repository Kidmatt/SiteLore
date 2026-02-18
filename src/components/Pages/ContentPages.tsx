import { forwardRef } from 'react';
import { Page } from '../Book/Page';

export const BlankPage = forwardRef<HTMLDivElement, any>((_props, ref) => {
    return (
        <Page ref={ref}>
            <div className="h-full w-full"></div>
        </Page>
    );
});
BlankPage.displayName = 'BlankPage';
