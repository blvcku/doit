import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { db, fb } from '../../../firebase';
import SearchIcon from '../../../assets/icons/search-white.svg';
import PlusIcon from '../../../assets/icons/plus-white.svg';
import CanvasImage from '../../../assets/images/canvas-background.jpg';
import useAuth from '../../../hooks/useAuth';
import useError from '../../../hooks/useError';
import useFilter from '../../../hooks/useFilter';
import useTitle from '../../../hooks/useTitle';
import {
    Container,
    SearchBar,
    CanvasListContainer,
    CreateCanvas,
    Canvas,
} from './CanvasList.styles';

const CanvasList = () => {
    const {
        currentUser: { uid },
    } = useAuth();
    const { dispatchError } = useError();
    const { setTitle } = useTitle();
    const history = useHistory();
    const { setData, filter, setFilter, filteredData } = useFilter();

    const createCanvas = async (e) => {
        e.preventDefault();
        dispatchError({ type: 'reset' });
        try {
            const { id } = await db.collection('canvas').add({
                title: 'Canvas Title',
                authorID: uid,
                lines: [],
                createdAt: fb.firestore.FieldValue.serverTimestamp(),
            });
            return history.push(`/dashboard/canvas/${id}`);
        } catch (error) {
            dispatchError({ type: 'canvas/create' });
        }
    };

    const handleFilterChange = (e) => {
        e.preventDefault();
        setFilter(e.target.value);
    };

    useEffect(() => {
        const unsubscribe = db
            .collection('canvas')
            .where('authorID', '==', uid)
            .orderBy('createdAt')
            .onSnapshot((snapshot) => {
                const canvasList = [];
                snapshot.forEach((canvas) =>
                    canvasList.unshift({ ...canvas.data(), id: canvas.id }),
                );
                setData(canvasList);
            });
        return unsubscribe;
    }, [uid, setData]);

    useEffect(() => {
        setTitle('Canvas');
    }, [setTitle]);

    return (
        <Container>
            <div>
                <nav>
                    <SearchBar onSubmit={(e) => e.preventDefault()} noValidate>
                        <input
                            placeholder="Search"
                            type="text"
                            name="search"
                            id="search"
                            value={filter}
                            onChange={handleFilterChange}
                        />
                        <img src={SearchIcon} alt="" />
                    </SearchBar>
                </nav>
                <CanvasListContainer>
                    <CreateCanvas>
                        <button type="button" onClick={createCanvas}>
                            <img src={PlusIcon} alt="" />
                            <span>Create Canvas</span>
                        </button>
                    </CreateCanvas>
                    {filteredData.map(({ title, id }) => (
                        <Canvas background={CanvasImage} key={id}>
                            <Link to={`/dashboard/canvas/${id}`}>
                                <p>{title}</p>
                            </Link>
                        </Canvas>
                    ))}
                </CanvasListContainer>
            </div>
        </Container>
    );
};

export default CanvasList;
