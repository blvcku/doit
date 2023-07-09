import { useContext } from 'react';
import { ErrorContext } from './ErrorContext';

const useError = () => useContext(ErrorContext);

export default useError;
