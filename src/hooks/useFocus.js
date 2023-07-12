import { useEffect } from 'react';

const useFocus = (ref, condition = true) => {
    useEffect(() => {
        if (ref.current && condition) ref.current.focus();
    }, [ref, condition]);
};

export default useFocus;
