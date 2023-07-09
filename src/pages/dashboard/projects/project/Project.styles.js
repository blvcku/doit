import styled from 'styled-components';

export const ProjectWrapper = styled.section`
    margin: 20px;
    @media (min-width: 900px) {
        margin: 80px 30px 20px 0;
    }
`;

export const ProjectContainer = styled.div`
    max-width: 1250px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1rem;
    column-gap: 2rem;
    grid-template-areas:
        'banner'
        'aside'
        'main';
    @media (min-width: 1300px) {
        grid-template-columns: 1fr 3fr;
        grid-template-areas:
            'banner banner'
            'aside main';
        row-gap: 1.25rem;
        column-gap: 2.5rem;
    }
`;

export const ProjectForm = styled.form`
    grid-area: banner;
`;

export const ProjectContentContainer = styled.section`
    grid-area: main;
`;
