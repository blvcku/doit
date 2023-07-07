import { useState, useEffect } from 'react';

const useTitle = () => {
    const [title, setTitle] = useState('DOIT');

    useEffect(() => {
        document.title = title;
    }, [title]);

    return { setTitle };
};

export default useTitle;
