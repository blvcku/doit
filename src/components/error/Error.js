import React, { useEffect, useState } from 'react';
import Triangle from '../../assets/icons/triangle.svg';
import CloseIcon from '../../assets/icons/close-grey.svg';
import useError from '../../contexts/error-context/useError';
import { Wrapper, Card } from './Error.styles';

const Error = () => {
    const { error, dispatchError } = useError();
    const [resetAnimation, setResetAnimation] = useState(false);

    const handleCloseError = (e) => {
        e.preventDefault();
        dispatchError({ type: 'reset' });
    };

    useEffect(() => {
        if (error.error) {
            setResetAnimation(true);
            const timer = setTimeout(() => {
                dispatchError({ type: 'reset' });
            }, 10000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [error, dispatchError]);

    useEffect(() => {
        if (resetAnimation) {
            setResetAnimation((prev) => !prev);
        }
    }, [resetAnimation]);

    return (
        <>
            {error && error.error
                ? !resetAnimation && (
                      <Wrapper>
                          <Card>
                              <button onClick={handleCloseError} type="button">
                                  <img src={CloseIcon} alt="Close error box" />
                              </button>
                              <img src={Triangle} alt="Error" />
                              <p role="alert">{error.error}</p>
                              <div className="error-bar"></div>
                          </Card>
                      </Wrapper>
                  )
                : null}
        </>
    );
};

export default Error;
