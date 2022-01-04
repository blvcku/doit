import React, { useEffect, useState } from 'react';
import Triangle from '../../images/error/triangle.svg';
import XIcon from '../../images/x.svg';

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
                        <button onClick={handleCloseError} type='button'>
                            <img src={XIcon} alt='Close' />
                        </button>
                        <img src={Triangle} alt='Error triangle' />
                        <p role='alert'>{error}</p>
                        <div className='error-bar'></div>
                    </Card>
                </Wrapper>
            ) : null}
        </>
    )
}

export default Error;