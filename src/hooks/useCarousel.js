import { useState, useEffect } from 'react';

const useCarousel = () => {
    
    const [currentSlide, setCurrentSlide] = useState(0);
    const [hidePrev, setHidePrev] = useState(true);
    const [hideNext, setHideNext] = useState(true);
    const [slides, setSlides] = useState(0);

    const handleNextSlide = e => {
        e.preventDefault();
        setCurrentSlide(prev => prev + 1);
    }
    
    const handlePrevSlide = e => {
        e.preventDefault();
        setCurrentSlide(prev => prev - 1);
    }

    useEffect(() => {
        if(slides){
            if(currentSlide > (slides - 1)) setCurrentSlide((slides - 1));
            if(currentSlide < 0) setCurrentSlide(0);
            if(currentSlide === 0) setHidePrev(true);
            else setHidePrev(false);
            if(currentSlide === (slides - 1)) setHideNext(true);
            else setHideNext(false);
        }
    }, [currentSlide, slides]);

    return { handleNextSlide, handlePrevSlide, setSlides, hidePrev, hideNext, currentSlide };

}

export default useCarousel;