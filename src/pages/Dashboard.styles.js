import styled from "styled-components";

export const Container = styled.div`
    position:relative;
    max-width:1920px;
    margin-inline:auto;
    @media (min-width:900px){
        grid-template-columns: 300px 1fr;
        display:grid;
        gap: 3rem;
    }
    @media (min-width:1200px){
        gap: 5rem;
    }
    @media (min-width:1500px){
        gap: 7rem;
    }
`;