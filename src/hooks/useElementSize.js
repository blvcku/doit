import { useState, useEffect, useCallback } from "react";

const useElementSize = (elementRef) => {
    const [elementSize, setElementSize] = useState({
        width: 0,
        height: 0,
    });
    const listener = useCallback(
        () =>
            elementRef?.current &&
            setElementSize({
                width: elementRef.current.offsetWidth,
                height: elementRef.current.offsetHeight,
            }),
        [elementRef]
    );
    useEffect(() => {
        listener();
        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize", listener);
    }, [listener]);
    return elementSize;
};

export default useElementSize;
