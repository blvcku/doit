import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Header = styled.header`
    width:100%;
    height:max-content;
    background-color: var(--colorMain);
    color: var(--colorWhite);
    position:sticky;
    top:0;
    z-index:100;
    display:flex;
    flex-direction:column;
    align-items:center;
    box-shadow: 1px 3px 6px #0057549E;
    border-radius: 0 0 25px 25px;

    @media (min-width:900px){
        border-radius: 0 0 25px 0;
    }

    div{
        position:relative;
        z-index:101;
        margin:30px 0;
        display:flex;
        gap:5px;
        align-items:center;
        justify-content:center;
        @media(min-width:900px){
            margin: 110px 0;
        }
    }

    h2{
        font-size: 50px;
        @media (min-width:900px){
            display:block;
        }
    }
`;

export const Nav = styled.nav`

    display:${({expanded}) => expanded ? 'block' : 'none'};

    animation: nav-animation .8s forwards cubic-bezier(.73,.36,.53,1.31);

    @keyframes nav-animation{
        from{transform:translateX(-80vw)}
        to{transform:translateX(0)}
    }

    @media(min-width:900px){
        display:block;
        animation: none;
    }

    ul{
        list-style:none;
        margin-bottom:40px;

        @media(min-width:900px){
            margin-bottom:150px;
            display:block;
        }
    }
`;

export const CustomNavLink = styled(NavLink)`
    text-decoration:none;
    color: var(--colorWhite);
    font-size:1.1rem;
    display:flex;
    align-items:center;
    gap:13px;
    padding: 8px 40px;
    border-radius:15px;
    margin: 4px 0;

    img{
        width:27px;
        height:30px;
    }
`;

export const Button = styled.button`
    cursor:pointer;
    background:none;
    border:none;
    padding: 10px;

    transform: rotateX(${({expanded}) => expanded ? '0' : '180deg'});

    @media (min-width:900px){
        display:none;
    }
    img{
        display:block;
    }
`;