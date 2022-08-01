import styled from "styled-components";

export const Wrapper = styled.div`
    position:absolute;
    top:0;
    left:0;
    z-index:30;
    width:100%;
    height:100%;
    background: var(--color-white);
    display:flex;
    justify-content:center;
    align-items:center;
    svg{
        width:55px;
        height:55px;
        path{
            fill: var(--color-primary);
        }
    }
`;

