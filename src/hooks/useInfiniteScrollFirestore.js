import { useState, useRef, useCallback } from 'react';

const useInfiniteScrollFirestore = (action) => {

    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();
    const [lastVisible, setLastVisible] = useState(null);

    const last = useCallback(last => {
        if(loading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(async entries => {
            if(entries[0].isIntersecting && hasMore){
                setLoading(true);
                await action();
                setLoading(false);
            }
        }, { threshold: 1});
        if(last) observer.current.observe(last);
    }, [observer, action, hasMore, loading]);

    return { last, setHasMore, lastVisible, setLastVisible };
}

export default useInfiniteScrollFirestore;