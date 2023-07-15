import styled from 'styled-components';

export const FormButtonContentContainer = styled.span`
    display: block;
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--color-white);
`;

export const FormButtonLoadingIcon = styled.svg`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    fill: var(--color-white);
    display: none;
`;

export const FormButtonContainer = styled.button`
    border: none;
    background: var(--color-primary-dark);
    padding: 0.7rem 1.75rem;
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 13px;
    margin-top: 3.5rem;
    cursor: pointer;
    position: relative;
    &:disabled {
        ${FormButtonContentContainer} {
            visibility: hidden;
        }
        ${FormButtonLoadingIcon} {
            display: block;
        }
    }
`;
