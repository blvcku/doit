import { useState, useRef, useCallback } from 'react';

const useInfiniteScroll = () => {
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();
    const [currentPage, setCurrentPage] = useState(0);

    const last = useCallback(
        (last) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver(async (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setCurrentPage((prev) => prev + 1);
                }
            });
            if (last) observer.current.observe(last);
        },
        [hasMore, loading],
    );

    return { last, setHasMore, currentPage, setCurrentPage, setLoading };
};

export default useInfiniteScroll;
