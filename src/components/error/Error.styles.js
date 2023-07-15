import styled from 'styled-components';

export const ErrorWrapper = styled.div`
    position: fixed;
    top: 0;
    right: 50%;
    transform: translateX(50%);
    padding: 5px;
    width: 100%;
    max-width: 340px;
    max-height: 170px;
    height: 100%;
    color: var(--color-white);
    z-index: 500;
    @media (min-width: 768px) {
        right: 0;
        transform: none;
    }
`;

export const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 15px 14px;
    background-color: var(--color-white);
    opacity: 0.9;
    border-radius: 13px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    animation: error-appear-animation 0.5s ease forwards;
    @keyframes error-appear-animation {
        from {
            transform: translateY(-200%);
        }
        to {
            transform: translateY(0);
        }
    }
`;

export const ErrorButton = styled.button`
    align-self: start;
    background: none;
    border: none;
    cursor: pointer;
`;

export const ErrorButtonIcon = styled.img`
    width: 22px;
    height: 22px;
`;

export const ErrorIcon = styled.img``;

export const ErrorContentContainer = styled.p`
    color: var(--color-primary);
    font-weight: 700;
    margin: 9px 0px;
    max-height: 50px;
    height: 100%;
    font-size: clamp(0.7rem, 4vw, 0.8rem);
    max-width: 80%;
`;

export const ErrorProgressBar = styled.div`
    background-color: var(--color-primary);
    position: relative;
    width: 90%;
    height: 7px;
    border-radius: 10px;
    overflow: hidden;
    border: 2px solid var(--color-primary);
    &:before {
        border-radius: 10px;
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--color-white);
        animation: error-progress-bar-animation
            ${({ errorDurationMs }) => errorDurationMs}ms linear;
    }
    @keyframes error-progress-bar-animation {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(0%);
        }
    }
`;
