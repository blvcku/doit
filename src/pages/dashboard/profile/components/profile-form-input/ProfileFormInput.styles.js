import styled from 'styled-components';

export const ProfileFormLabel = styled.label`
    font-weight: 500;
    color: var(--color-primary);
    font-size: 1.1rem;
    margin-top: 10px;
    @media (min-width: 400px) {
        margin-top: 0px;
    }
`;

export const ProfileFormInputElement = styled.input`
    font-size: 0.8rem;
    border: none;
    padding: 8px 15px;
    border-radius: 13px;
    background: #d1f8fd;
    font-weight: 500;
    outline: none;
    color: #676767;
`;
