import React, { useEffect, useState } from 'react';
import TriangleIcon from '../../assets/icons/triangle.svg';
import CloseIcon from '../../assets/icons/close-grey.svg';
import useError from '../../contexts/error-context/useError';
import {
    ErrorWrapper,
    ErrorContainer,
    ErrorButton,
    ErrorButtonIcon,
    ErrorIcon,
    ErrorContentContainer,
    ErrorProgressBar,
} from './Error.styles';
import { errorDurationMs } from './Error.config';

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
            }, errorDurationMs);
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
                      <ErrorWrapper>
                          <ErrorContainer>
                              <ErrorButton
                                  onClick={handleCloseError}
                                  type="button"
                              >
                                  <ErrorButtonIcon
                                      src={CloseIcon}
                                      alt="Close error box"
                                  />
                              </ErrorButton>
                              <ErrorIcon src={TriangleIcon} alt="Error" />
                              <ErrorContentContainer role="alert">
                                  {error.error}
                              </ErrorContentContainer>
                              <ErrorProgressBar
                                  errorDurationMs={errorDurationMs}
                              />
                          </ErrorContainer>
                      </ErrorWrapper>
                  )
                : null}
        </>
    );
};

export default Error;
