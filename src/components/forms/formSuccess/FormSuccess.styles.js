import styled from 'styled-components';

export const Wrapper = styled.div`
    padding:1rem;
`;

export const Container = styled.main`
    max-width:900px;
    margin:auto;
    margin-top: 6.5rem;
    margin-bottom:6.5rem;
    text-align:center;
    background:var(--colorWhite);
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 13px;
    padding:4rem 1rem;
    img:nth-child(1){
        width:4rem;
        height:4rem;
        margin:auto;
    }
    img{
        width:3rem;
        height:3rem;
        margin-top:1rem;
    }
    h1{
        text-transform:capitalize;
        color:var(--darkerSecondary);
        font-weight:800;
        font-size:2.3rem;
        max-width:600px;
        margin:auto;
        margin-top:3.5rem;
    }
    a{
        color:var(--darkerSecondary);
        text-decoration: underline;
        text-transform:uppercase;
        font-size:1.15rem;
        font-weight:500;
        margin-top:5rem;
        display:block;
    }
`;