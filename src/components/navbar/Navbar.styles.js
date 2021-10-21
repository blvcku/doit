import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Nav = styled.nav`
    display:flex;
    width:100%;
    height:90px;
    background-color: var(--colorBlue);
    justify-content: space-between;
    color: var(--colorWhite);
    padding: 0 30px;
    position:sticky;
    top:0;
    z-index:100;
`;

export const NavGroup = styled.div`
    display:flex;
    height:100%;
    align-items:center;
    gap:7px;

    @media (min-width:500px){
        gap:20px;
`;

export const Button = styled.button`
    background:transparent;
    border:none;
    color: var(--colorWhite);
    cursor:pointer;
    font-size: 16px;
`;

export const ImageWrapper = styled(NavLink)`
    width:55px;
    height:55px;
`;

export const NavImage = styled.img`
    width:100%;
    height:100%;
    border-radius:50%;
    outline:3px solid white;
    outline-offset: -1px;
`

export const LogoWrapper = styled(NavLink)`
    color: var(--colorWhite);
    text-decoration: none;
    @media (min-width:500px){
        margin-left:40px;
    }
`;