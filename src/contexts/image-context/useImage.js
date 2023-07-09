import { useContext } from 'react';
import { ImageContext } from './ImageContext';

const useImage = () => useContext(ImageContext);

export default useImage;
