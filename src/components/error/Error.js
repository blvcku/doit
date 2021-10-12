import React, { useEffect, useState } from 'react';

import useError from '../../hooks/useError';

import { Wrapper, Card } from './Error.styles';

const Error = (props) => {

    const { error, dispatchError } = useError();
    const [resetAnimation, setResetAnimation] = useState(false);

    useEffect(() => {
        let timer;
        if(error){
            setResetAnimation(true);
            timer = setTimeout(() => {
                dispatchError({type: 'reset'});
            }, 10000);
        }
        return () => {
            clearTimeout(timer)
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
                        {error}
                    </Card>
                </Wrapper>
            ) : null}
        </>
    )
}

export default Error;