import styled from "styled-components";

export const TasksListContainer = styled.ul`
    list-style:none;
    position:relative;
    min-height:200px;
    &:empty{
        font-size:1rem;
        border-radius:13px;
        &::before{
            content: 'There are no tasks in this project yet';
            position:absolute;
            left:50%;
            top:50%;
            transform:translate(-50%,-50%);
            width:100%;
            text-align:center;
        }
        color:#676767;
        @media(min-width:1300px){
            height:500px;
        }
    }
`;

export const CreateTask = styled.li`
    margin-bottom:1rem;
`;

export const CreateTaskButton = styled.button`
    box-shadow: 0px 3px 6px #00000029;
    display:block;
    width:100%;
    border:none;
    padding: 30px 0px;
    background:var(--colorWhite);
    border-radius:13px;
    box-shadow: 0px 3px 6px #00000029;
    border:1px solid var(--darkerSecondary);
    cursor:pointer;
    img{
        width:40px;
        height:40px;
    }
    p{
        font-size:.8rem;
        color:var(--colorSecondary);
        font-weight:700;
        margin-top:7px;
    }
`;

export const TaskContainer = styled.li`
    overflow:hidden;
    padding: 33px 20px 0px 20px;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 13px;
    background:var(--colorWhite);
    margin-bottom:1rem;
    position:relative;
    hr{
        opacity:0;
    }
    @media(min-width:560px){
        padding: 33px 41px 0px 41px;
    }
`;

export const TaskHead = styled.div`
    display:grid;
    grid-template-columns:1fr;
    border-bottom: 1px solid #707070;
    margin-bottom:33px;
    gap:10px;
    align-items:center;
    h3{
        color: #676767;
        font-size:.9rem;
        font-weight:400;
        word-break:break-word;
        max-width:max-content;
    }
    @media(min-width:500px){
        grid-template-columns:minmax(min-content, auto) 1fr;
    }
`;

export const TaskHeadFirst = styled.div`
    gap:15px;
    justify-content:start;
    display:flex;
    align-items:center;
    @media(min-width:500px){
        justify-content:auto;
        margin-bottom:20px;
    }
`;

export const TaskHeadSecond = styled.div`
    margin-bottom:20px;
    display:flex;
    align-items:center;
    gap:10px;
    justify-content:space-between;
    div{
        display:flex;
        gap:10px;
    }
`;

export const TaskEditHead = styled(TaskHead)`
    h3{
        overflow:visible;
        position:relative;
        &::before{
            position:absolute;
            content:'Performer:';
            font-size:.7rem;
            font-weight:500;
            color:var(--darkerSecondary);
            top:-.75rem;
            left:0;
        }
    }
`;

export const ImageContainer = styled.figure`
    min-width:2.5rem;
    height:2.5rem;
    position:relative;
    img{
        width:100%;
        height:100%;
        aspect-ratio: 1/1;
        object-fit:cover;
        border-radius:50%;
        outline:1px solid var(--darkerSecondary);
    }
    figcaption{
        display:none;
        position:absolute;
        bottom:-1.6rem;
        border-radius:8px;
        left:50%;
        transform:translateX(-50%);
        z-index:50;
        background: #333331;
        opacity: .8;
        font-size:.7rem;
        color:var(--colorWhite);
        padding: 5px 10px;
        @media(min-width:560px){
            left:0;
            transform:none;
        }
        white-space:nowrap;
    }

    &:hover{
        figcaption{
            display:block;
        }
    }
`;

export const StatusButton = styled.button`
    padding:7px 8px;
    border-radius:13px;
    box-shadow: 0px 3px 6px #00000029;
    background: ${({color}) => color};
    border:none;
    font-size: .5rem;
    color: var(--colorWhite);
    cursor:${({isOwner, isPerformer}) => isOwner || isPerformer ? 'pointer' : 'default'};
    display:flex;
    align-items:center;
    gap:5px;
    text-transform:uppercase;
    img{
        width:14px;
        height:14px;
    }
`;

export const SaveButton = styled.button`
    padding:7px 17px;
    border-radius:13px;
    box-shadow: 0px 3px 6px #00000029;
    background: var(--darkerSecondary);
    border:none;
    font-size:12px;
    color: var(--colorWhite);
    cursor:pointer;
    display:flex;
    align-items:center;
    gap:5px;
    img{
        width:14px;
        height:14px;
    }
`;

export const SmallButton = styled.button`
    box-shadow: 0px 3px 6px #00000029;
    background:${({color}) => color ? color : 'var(--darkerSecondary)'};
    border:none;
    border-radius:12px;
    padding:4px 10px;
    cursor:pointer;
    img{
        width:17px;
        height:17px;
    }
`;

export const Button = styled.button`
    background:none;
    border:none;
    padding:4px;
    cursor:pointer;
    margin-top:4px;
    transform:rotate(${({expanded}) => expanded ? '180deg' : '0deg'});
`;

export const Step = styled.li`
    display:flex;
    align-items:center;
    gap:7px;
    margin-top:10px;
    label{
        font-size: .8rem;
        color: #676767;
        font-weight:400;
        word-break:break-word;
        overflow-wrap:break-word;
        pointer-events:none;
    }
    input{
        min-width:1.1rem;
        height:1.1rem;
        appearance:none;
        border: 2px solid var(--colorThird);
        border-radius:2px;
        cursor:pointer;
        display:inline-block;
        position:relative;
        overflow:hidden;
        &::before{
            box-shadow: inset 1em 1em var(--colorThird);
            content:'';
            position:absolute;
            width:80%;
            height:80%;
            left:.1rem;
            top:.1rem;
            clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        }
        &::after{
            width:100%;
            height:100%;
            content:'';
            position:absolute;
            left:0;
            top:0;
            background:var(--colorWhite);
            transition:transform .2s ease;
        }
        &:checked::after{
            transform:translateX(100%);
        }
        &:disabled{
            opacity:.7;
            cursor: not-allowed;
        }
    }

    @keyframes checkedAnimation{
        from{transform:translateX(0)}
        to{transform:translateX(100%)}
    }
`;

export const TaskBody = styled.div`
    margin:auto;
    inset:0;
    max-width:650px;
    padding: 0px 0px 30px;
    display:grid;
    column-gap:10px;
    grid-template-columns:1fr;
    h4, h5, h6{
        color: #676767;
        font-weight:700;
        margin-bottom:15px;
        font-size:1rem;
    }
    p{
        font-size: .8rem;
        color: #676767;
        font-weight:400;
    }
    div:nth-child(1){
        @media(min-width:520px){
            grid-column:span 2;
        }
    }
    div:nth-child(2){
        margin-top:20px;
    }
    div:nth-child(3){
        margin-top:20px;
        @media(min-width:520px){
            justify-self:end;
        }
    }
    ul{
        list-style:none;
    }
    @media(min-width:350px){
        padding: 0px 20px 40px;
    }
    @media(min-width:520px){
        grid-template-columns:2fr 1.1fr;
    }
`;

export const TaskEditBodyContainer = styled.div`
    margin:auto;
    inset:0;
    max-width:650px;
    padding: 0px 0px 20px;
    display:grid;
    grid-template-columns:1fr;
    @media(min-width:350px){
        padding: 0px 20px 20px;
    }
    @media(min-width:480px){
        grid-template-columns:1fr 1fr;
    }
`;

export const Label = styled.label`
    font-weight:700;
    color:#676767;
    display:block;
    margin-bottom:7px;
    textarea{
        resize:none;
        width:100%;
        border-radius:10px;
        border: 1px solid #707070;
        min-height:90px;
        font-size:.9rem;
        padding: 4px 11px;
        outline:none;
        margin-top: 12px;
        color:#676767;
    }
    input{
        width:100%;
        border-radius:10px;
        border: 1px solid #707070;
        font-size:.9rem;
        padding: 4px 11px;
        outline:none;
        margin-top:12px;
        color:#676767;
    }
    @media(min-width:480px){
        grid-column: span 2;
    }
`;

export const AddStepButton = styled.button`
    background: var(--colorThird);
    display:flex;
    align-items:center;
    justify-content:center;
    gap: 13px;
    font-size:.9rem;
    font-weight:500;
    color:var(--colorWhite);
    padding: 9px 20px;
    box-shadow: 0px 3px 6px #0000004F;
    border-radius: 13px;
    border:none;
    cursor:pointer;
    transition: transform .3s ease;
    justify-self:center;
    margin-top:5px;
    max-width:160px;
    width:100%;
    img{
        width:1.2rem;
        height:1.2rem;
    }
    &:active{
        transform:scale(0.97);
    }
    @media(min-width:480px){
        justify-self:start;
        margin-top:25px;
        width:auto;
    }
`;

export const AddFileLabel = styled.label`
    display:flex;
    align-items:center;
    justify-content:center;
    gap: 13px;
    font-size:.9rem;
    font-weight:500;
    padding: 9px 20px;
    border-radius:13px;
    box-shadow: 0px 3px 6px #0000004F;
    cursor:pointer;
    transition: transform .3s ease;
    max-width:160px;
    width:100%;
    justify-self:center;
    grid-row: 5/6;
    margin-top:10px;
    ${({file}) => file ? `
        background:var(--colorSecondary);
        color:var(--colorWhite);
    ` : `
        background:var(--colorWhite);
        color:var(--colorSecondary);
        outline: 2px solid var(--colorSecondary);
        outline-offset: -2px;
    `}

    p{
        font-weight:500;
        text-overflow:ellipsis;
        max-width:100px;
        overflow:hidden;
        white-space:nowrap;
    }
    input{
        display:none;
    }
    img{
        width:1.2rem;
        height:1.2rem;
    }
    &:active{
        transform:scale(0.97);
    }
    @media(min-width:480px){
        justify-self:end;
        margin-top:25px;
        grid-row:auto;
        max-width:210px;
    }
`;

export const DownloadFile = styled.a`
    display:flex;
    align-items:center;
    justify-content:center;
    gap: 13px;
    font-size:.9rem;
    font-weight:500;
    padding: 9px 20px;
    border-radius:13px;
    box-shadow: 0px 3px 6px #0000004F;
    cursor:pointer;
    transition: transform .3s ease;
    min-width:170px;
    max-width:170px;
    width:100%;
    background:var(--colorSecondary);
    p{
        font-weight:500;
        text-overflow:ellipsis;
        max-width:100px;
        overflow:hidden;
        white-space:nowrap;
        color:var(--colorWhite);
    }
    @media(min-width:480px){
        min-width:170px;
        max-width:170px;
    }
    @media(min-width:1200px){
        min-width:210px;
        max-width:210px;
    }
`;

export const StepsContainer = styled.ul`
    margin-top:15px;
    max-height:135px;
    overflow:auto;
    max-width:450px;
    width:100%;
    @media(min-width:480px){
        grid-column:span 2;
        margin-top:20px;
    }
    li:nth-last-child(1){
        margin-bottom:5px;
    }
    &:empty{
        margin-top:5px;
    }
`;

export const StepEdit = styled.li`
    margin-bottom:15px;
    position:relative;
    display:flex;
    align-items:center;
    gap:5px;
    input{
        border-radius:10px;
        border: 1px solid #707070;
        font-size:.9rem;
        padding: 4px 35px 4px 11px;
        outline:none;
        color:#676767;
        width:100%;
    }
    button{
        position:absolute;
        right:10px;
        top:50%;
        transform:translateY(-50%);
        background:none;
        border:none;
        cursor:pointer;
        img{
            display:block;
            width:1rem;
            height:1rem;
        }
    }
    div{
        color:var(--colorWhite);
        background:var(--colorThird);
        max-width:1.3rem;
        width:100%;
        height:1.3rem;
        box-sizing:content-box;
        border-radius:50%;
        font-size:.6rem;
        display:grid;
        place-items:center;
    }
`;