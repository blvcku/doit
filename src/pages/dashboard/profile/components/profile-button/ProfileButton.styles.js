import styled from 'styled-components';

export const ProfileButtonContainer = styled.button`
    background: #0e8e8c;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 12px;
    font-size: 0.7rem;
    color: var(--color-white);
    border: none;
    padding: 9px 50px;
    margin-top: 35px;
    cursor: pointer;
    font-weight: 400;
    @media (min-width: 400px) {
        margin-top: 50px;
    }
    transition: transform 0.3s ease;
    &:active {
        transform: scale(0.95);
    }
`;
