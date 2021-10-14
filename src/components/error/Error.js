import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons';

import useError from '../../hooks/useError';

import { Wrapper, Card } from './Error.styles';

const Error = (props) => {

    const { error, dispatchError } = useError();
    const [resetAnimation, setResetAnimation] = useState(false);

    const handleCloseError = e => {
        e.preventDefault();
        dispatchError({type: 'reset'});
    }

    useEffect(() => {
        if(error){
            setResetAnimation(true);
            const timer = setTimeout(() => {
                dispatchError({type: 'reset'});
            }, 10000);
            return () => {
                clearTimeout(timer);
            }
        }
    }, [error, dispatchError])

    useEffect(() => {
        if(resetAnimation){
            setResetAnimation(prev => !prev);
        }
    }, [resetAnimation])

    return(
        <>
            {error ? (!resetAnimation &&
                <Wrapper>
                    <Card>
                        <FontAwesomeIcon onClick={handleCloseError} size='2x' icon={faTimes} />
                        <FontAwesomeIcon size='2x' icon={faExclamationTriangle} />
                        <p>{error}</p>
                        <div className='error-bar'></div>
                    </Card>
                </Wrapper>
            ) : null}
        </>
    )
}

export default Error;