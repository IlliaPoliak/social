import React from 'react';
import Preloader from '../common/Preloader/Preloader';

export const withSuspense  = Component => {
    const SuspenseComponent = props => <Component {...props} />

    return <React.Suspense fallback={<Preloader />}> <SuspenseComponent/> </React.Suspense>
}