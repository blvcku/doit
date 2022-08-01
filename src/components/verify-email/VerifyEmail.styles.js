import styled from 'styled-components';

export const Container = styled.div`
    position:fixed;
    bottom:0;
    width:100%;
    background:var(--color-primary-dark);
    text-align:center;
    color:var(--color-white);
    font-size:.8rem;
    padding:1rem;
    z-index:100;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    gap:.5rem;
    button{
        text-transform:capitalize;
        border-radius:13px;
        border:none;
        padding:.3rem 1rem;
        font-size:.7rem;
        color:var(--color-primary-dark);
        background:var(--color-white);
        cursor:pointer;
        transition:transform .2s ease;
        font-weight:500;
        &:active{
            transform:scale(0.96);
        }
        &:disabled{
            opacity:.8;
        }
    }
    @media(min-width:460px){
        flex-direction:row;
    }
`;
