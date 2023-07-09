import { useState, useRef, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Stage, Layer, Line } from 'react-konva';
import DeleteIcon from '../../../../../assets/icons/delete.svg';
import {
    CanvasRendererContainer,
    CanvasRendererToolsContainer,
    CanvasRendererWrapper,
    CanvasRendererDeleteButton,
    CanvasRendererToolButton,
    CanvasRendererSizeSelector,
    CanvasRendererSizeSelectorContainer,
} from './CanvasRenderer.styles';
import useElementSize from '../../../../../hooks/useElementSize';
import useWindowSize from '../../../../../hooks/useWindowSize';
import useError from '../../../../../contexts/error-context/useError';
import useConfirmBox from '../../../../../contexts/confirm-box-context/useConfirmBox';
import { db } from '../../../../../services/firebase';

const CanvasRenderer = ({ defaultLines }) => {
    const containerRef = useRef();
    const history = useHistory();
    const { id } = useParams();
    const { dispatchError } = useError();
    const { setConfirmInfo } = useConfirmBox();
    const { width, height } = useElementSize(containerRef);
    const { width: windowWidth } = useWindowSize();
    const [tool, setTool] = useState('pen');
    const [toolSize, setToolSize] = useState(10);
    const [lines, setLines] = useState(defaultLines);
    const [isDrawing, setIsDrawing] = useState(false);
    const [loading, setLoading] = useState(false);

    const sceneWidth = 1100;
    const sceneHeight = 600;
    const scaleX = width / sceneWidth;
    const scaleY = height / sceneHeight;

    useEffect(() => {
        if (!lines.length || lines === defaultLines) return;
        const updateLines = async () => {
            try {
                await db.collection('canvas').doc(id).update({
                    lines: lines,
                });
            } catch (error) {
                console.error(error);
            }
        };

        const delay = 500;
        const timeout = setTimeout(() => {
            updateLines();
        }, delay);

        return () => clearTimeout(timeout);
    }, [lines, id, defaultLines]);

    const handleDown = (e) => {
        setIsDrawing(true);
        const pos = e.target.getStage().getRelativePointerPosition();
        setLines([...lines, { tool, points: [pos.x, pos.y], size: toolSize }]);
    };

    const handleMove = (e) => {
        if (!isDrawing) return;
        const stage = e.target.getStage();
        const point = stage.getRelativePointerPosition();
        let lastLine = lines[lines.length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleUp = () => {
        setIsDrawing(false);
    };

    const handleChangeTool = (e, tool) => {
        e.preventDefault();
        setTool(tool);
    };

    const handleChangeToolSize = (e) => {
        e.preventDefault();
        setToolSize(e.target.value);
    };

    const handleDeleteCanvas = async (e) => {
        e.preventDefault();
        setConfirmInfo({ message: 'delete this canvas', action: deleteCanvas });
    };

    const deleteCanvas = async () => {
        dispatchError({ type: 'reset' });
        setLoading(true);
        try {
            await db.collection('canvas').doc(id).delete();
            return history.push('/dashboard/canvas');
        } catch (error) {
            dispatchError({ type: 'canvas/delete' });
        }
        setLoading(false);
    };

    return (
        <CanvasRendererContainer>
            <div>
                <CanvasRendererWrapper ref={containerRef}>
                    <Stage
                        width={sceneWidth * scaleX}
                        height={sceneHeight * scaleX}
                        scaleX={scaleX}
                        scaleY={scaleY}
                        onMouseDown={handleDown}
                        onMousemove={handleMove}
                        onMouseup={handleUp}
                        onTouchStart={handleDown}
                        onTouchMove={handleMove}
                        onTouchEnd={handleUp}
                    >
                        <Layer>
                            {lines.map((line, i) => (
                                <Line
                                    key={i}
                                    points={line.points}
                                    stroke="#707070"
                                    strokeWidth={line.size}
                                    tension={0.5}
                                    lineCap="round"
                                    lineJoin="round"
                                    globalCompositeOperation={
                                        line.tool === 'eraser'
                                            ? 'destination-out'
                                            : 'source-over'
                                    }
                                />
                            ))}
                        </Layer>
                    </Stage>
                </CanvasRendererWrapper>
            </div>
            <CanvasRendererToolsContainer>
                <CanvasRendererDeleteButton
                    onClick={handleDeleteCanvas}
                    disabled={loading}
                    type="button"
                >
                    <img src={DeleteIcon} alt="Delete canvas" />
                </CanvasRendererDeleteButton>
                <CanvasRendererToolButton
                    onClick={(e) => handleChangeTool(e, 'pen')}
                    active={tool === 'pen'}
                    type="button"
                >
                    <svg
                        aria-label="Pen"
                        fill="currentColor"
                        viewBox="0 0 512 512"
                    >
                        <path d="m455.1,137.9l-32.4,32.4-81-81.1 32.4-32.4c6.6-6.6 18.1-6.6 24.7,0l56.3,56.4c6.8,6.8 6.8,17.9 0,24.7zm-270.7,271l-81-81.1 209.4-209.7 81,81.1-209.4,209.7zm-99.7-42l60.6,60.7-84.4,23.8 23.8-84.5zm399.3-282.6l-56.3-56.4c-11-11-50.7-31.8-82.4,0l-285.3,285.5c-2.5,2.5-4.3,5.5-5.2,8.9l-43,153.1c-2,7.1 0.1,14.7 5.2,20 5.2,5.3 15.6,6.2 20,5.2l153-43.1c3.4-0.9 6.4-2.7 8.9-5.2l285.1-285.5c22.7-22.7 22.7-59.7 0-82.5z" />
                    </svg>
                </CanvasRendererToolButton>
                <CanvasRendererToolButton
                    onClick={(e) => handleChangeTool(e, 'eraser')}
                    active={tool === 'eraser'}
                    type="button"
                >
                    <svg aria-label="Eraser" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M17.9995 13L10.9995 6.00004M20.9995 21H7.99955M10.9368 20.0628L19.6054 11.3941C20.7935 10.2061 21.3875 9.61207 21.6101 8.92709C21.8058 8.32456 21.8058 7.67551 21.6101 7.07298C21.3875 6.388 20.7935 5.79397 19.6054 4.60592L19.3937 4.39415C18.2056 3.2061 17.6116 2.61207 16.9266 2.38951C16.3241 2.19373 15.675 2.19373 15.0725 2.38951C14.3875 2.61207 13.7935 3.2061 12.6054 4.39415L4.39366 12.6059C3.20561 13.794 2.61158 14.388 2.38902 15.073C2.19324 15.6755 2.19324 16.3246 2.38902 16.9271C2.61158 17.6121 3.20561 18.2061 4.39366 19.3941L5.06229 20.0628C5.40819 20.4087 5.58114 20.5816 5.78298 20.7053C5.96192 20.815 6.15701 20.8958 6.36108 20.9448C6.59126 21 6.83585 21 7.32503 21H8.67406C9.16324 21 9.40784 21 9.63801 20.9448C9.84208 20.8958 10.0372 20.815 10.2161 20.7053C10.418 20.5816 10.5909 20.4087 10.9368 20.0628Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </CanvasRendererToolButton>
                <CanvasRendererSizeSelectorContainer>
                    <p>50</p>
                    <CanvasRendererSizeSelector
                        min={1}
                        max={50}
                        value={toolSize}
                        onChange={handleChangeToolSize}
                        type="range"
                        orient={windowWidth > 1300 ? 'vertical' : 'horizontal'}
                    />
                    <p>1</p>
                </CanvasRendererSizeSelectorContainer>
            </CanvasRendererToolsContainer>
        </CanvasRendererContainer>
    );
};

export default CanvasRenderer;
