import styled from 'styled-components';

export const Nav = styled.nav`
    display:flex;
    width:100%;
    height:70px;
    background-color: var(--colorBlue);
    justify-content: space-between;
    color: var(--colorWhite);
    padding: 0 20px;
`;

export const NavGroup = styled.div`
    display:flex;
    height:100%;
    align-items:center;
    gap:7px;

    button{
        background:transparent;
        border:none;
        color: var(--colorWhite);
        cursor:pointer;
        font-size: 16px;
    }
    a{
        width:55px;
        height:55px;
    }

    h1{
        display:none;
    }

    @media (min-width:500px){
        gap:20px;
        h1{
            display:block;
        }
    }
`;

export const NavImage = styled.img`
    width:100%;
    height:100%;
    border-radius:50%;
`