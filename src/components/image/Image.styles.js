import styled from 'styled-components'

export const Container = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    position:fixed;
    top:0;
    left:0;
    background: rgba(78, 82, 80, 0.6);
    z-index:500;
    padding:1rem;
`;

export const Wrapper = styled.div`
    max-width:1200px;
    img{
        display:block;
        width:max-content;
        max-width:100%;
        height:auto;
        max-height:calc(100vh - 2rem);
        object-fit:contain;
        object-position:center center;
    }
`;