import styled from "styled-components";

export const Container = styled.div`

    position:relative;

    @media (min-width:900px){
        grid-template-columns: 300px 1fr;
        display:grid;
        gap: 5rem;
    }
`