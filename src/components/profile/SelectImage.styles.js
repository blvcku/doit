import styled from "styled-components";

export const DropZone = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    text-align:center;
    width:100%;
    height:100%;
    cursor:pointer;
    border:3px ${({dragOver}) => dragOver ? 'solid' : 'dashed'} var(--colorMuted);
    padding:20px;
    border-radius:5px;
    position:relative;
    
    p{
        color: var(--colorMuted);
    }

    input{
        display:none;
    }
`;

export const ImagePlaceholder = styled.div`
    position:absolute;
    width:100%;
    height:100%;
    background-size:cover;
    background-image: url(${({image: {url}}) => url});
    
    &::before{
        content: '${({image: {file}}) => file ? file.name : null}';
        position:absolute;
        left:0;
        bottom:0;
        width:100%;
        background-color: black;
        opacity:0.7;
        color: var(--colorWhite);
        font-size: var(--fontSmall);
    }
`