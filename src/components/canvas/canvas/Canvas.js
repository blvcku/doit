import { useState, useEffect, useRef } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { db } from '../../../firebase';
import useTitle from '../../../hooks/useTitle';
import { Banner, Container, Wrapper } from './Canvas.styles';
import CanvasRenderer from '../canvas-renderer/CanvasRenderer';

const Canvas = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [canvasData, setCanvasData] = useState({});
    const [canvasTitle, setCanvasTitle] = useState(null);
    const { setTitle } = useTitle();
    const titleRef = useRef();

    const handleTitleChange = (e) => {
        e.preventDefault();
        setCanvasTitle(e.target.value);
    };

    useEffect(() => {
        if (!canvasTitle) return;
        const updateTitle = async () => {
            try {
                await db.collection('canvas').doc(id).update({
                    title: canvasTitle,
                });
            } catch (error) {
                console.error(error);
            }
        };

        const delay = 2000;
        const timeout = setTimeout(() => {
            updateTitle();
        }, delay);

        return () => clearTimeout(timeout);
    }, [canvasTitle, id]);

    useEffect(() => {
        if (!loading) {
            titleRef.current.focus();
        }
    }, [loading]);

    useEffect(() => {
        const unsubscribe = db
            .collection('canvas')
            .doc(id)
            .onSnapshot(
                (canvas) => {
                    setCanvasData({ ...canvas.data(), id: canvas.id });
                    setLoading(false);
                },
                (error) => setLoading(false),
            );

        return unsubscribe;
    }, [id]);

    useEffect(() => {
        setTitle(canvasData.title || 'DOIT');
    }, [canvasData.title, setTitle]);

    return (
        <>
            {!loading ? (
                canvasData.title ? (
                    <Container>
                        <Wrapper>
                            <Banner>
                                <input
                                    ref={titleRef}
                                    value={canvasTitle ?? canvasData.title}
                                    onChange={handleTitleChange}
                                    spellCheck="false"
                                />
                            </Banner>
                            <CanvasRenderer defaultLines={canvasData.lines} />
                        </Wrapper>
                    </Container>
                ) : (
                    <Redirect to="/dashboard/projects" />
                )
            ) : null}
        </>
    );
};

export default Canvas;
