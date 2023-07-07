import { useContext } from 'react';
import { ImageContext } from '../contexts/ImageContext';

const useImage = () => useContext(ImageContext);

export default useImage;
