import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FormSuccessContainer = styled.div`
    padding: 1rem;
`;

export const FormSuccessBoxContainer = styled.main`
    max-width: 900px;
    margin: auto;
    margin-top: 6.5rem;
    margin-bottom: 6.5rem;
    text-align: center;
    background: var(--color-white);
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 13px;
    padding: 4rem 1rem;
`;

export const FormSuccessHeading = styled.h1`
    text-transform: capitalize;
    color: var(--color-primary-dark);
    font-weight: 700;
    font-size: 2.3rem;
    max-width: 600px;
    margin: auto;
    margin-top: 3.5rem;
`;

export const FormSuccessIconLogo = styled.img`
    width: 4rem;
    height: 4rem;
    margin: auto;
`;

export const FormSuccessIcon = styled.img`
    width: 3rem;
    height: 3rem;
    margin-top: 1rem;
`;

export const FormSuccessLink = styled(Link)`
    color: var(--color-primary-dark);
    text-decoration: underline;
    text-transform: uppercase;
    font-size: 1.15rem;
    font-weight: 500;
    margin-top: 5rem;
    display: block;
`;
