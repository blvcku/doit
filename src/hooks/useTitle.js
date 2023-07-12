import { useEffect } from 'react';

const useTitle = (title = 'DOIT') => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};

export default useTitle;
