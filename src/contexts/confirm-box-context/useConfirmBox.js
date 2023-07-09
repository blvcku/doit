import { useContext } from 'react';
import { ConfirmBoxContext } from './ConfirmBoxContext';

const useConfirmBox = () => useContext(ConfirmBoxContext);

export default useConfirmBox;
