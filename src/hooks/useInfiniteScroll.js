import { useState, useRef, useCallback } from 'react';

const useInfiniteScroll = (action) => {

    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();
    const [data, setData] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);

    const last = useCallback(last => {
        let isMounted = true;
        if(!isMounted) return;
        if(loading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(async entries => {
            if(entries[0].isIntersecting && hasMore && isMounted){
                setLoading(true);
                await action();
                setLoading(false);
            }
        });
        if(last && isMounted) observer.current.observe(last);
        return () => { isMounted = false }
    }, [observer, action, hasMore, loading]);

    return { last, data, setData, setHasMore, lastVisible, setLastVisible };
}

export default useInfiniteScroll;