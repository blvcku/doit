import styled from "styled-components";

export const MainContainer = styled.section`
    grid-area: main;
    @media(min-width:1375px){
        margin-left:30px;
    }
`;

export const TasksListContainer = styled.ul`
    list-style:none;
    position:relative;
    min-height:250px;
    &:empty{
        font-size:1.5rem;
        font-weight:500;
        background: var(--colorWhite);
        border-radius:13px;
        box-shadow: 0px 3px 6px #00000029;
        &::before{
            content: 'No tasks';
            position:absolute;
            left:50%;
            top:50%;
            transform:translate(-50%,-50%);
        }
        color:var(--colorSecondary);
    }
`;

export const CreateTask = styled.li`
    margin-bottom:30px;
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
    padding: 33px 20px 0px 20px;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 13px;
    background:var(--colorWhite);
    margin-bottom:30px;
    hr{
        opacity:0;
    }
    @media(min-width:560px){
        padding: 33px 41px 0px 41px;
    }
`;

export const FirstGroup = styled.div`
    display:flex;
    border-bottom: 1px solid #707070;
    margin-bottom:33px;
    flex-direction:column;
    div{
        display:flex;
        align-items:center;
        margin-bottom:20px;
        justify-content:space-between;
        width:max-content;
    }
    div:nth-child(1){
        gap:15px;
        @media(max-width:500px){
            justify-content:start;
        }
    }
    div:nth-child(2){
        flex:1;
        gap:30px;
        @media(max-width:500px){
            width:100%;
            gap:0px;
        }
    }
    h2{
        color: #676767;
        font-size:.7rem;
        font-weight:400;
        overflow-wrap:break-word;
        overflow:hidden;
        @media(min-width:290px){
            font-size:.8rem;
        }
        @media(min-width:330px){
            font-size:1rem;
        }
    }
    @media(min-width:500px){
        flex-direction:row;
        gap:15px;
    }
`;

export const SecondGroup = styled.div`
    margin:auto;
    inset:0;
    max-width:650px;
    padding: 0px 20px 30px;
    h3{
        color: #676767;
        font-weight:700;
        margin-bottom:15px;
    }
    p{
        font-size: .8rem;
        color: #676767;
        font-weight:400;
    }
    label{
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
    }
    label:nth-child(2){
        margin-bottom:15px;
    }
`;

export const Group = styled(FirstGroup)`
    flex-direction:column;
    gap:10px;
    @media(min-width:450px){
        flex-direction:row;
        gap:13px;
    }
    div:nth-child(1){
        @media(max-width:450px){
            margin-bottom:0px;
        }
    }
    div:nth-child(2){
        width:100%;
        @media(max-width:450px){
            justify-content:start;
            gap:15px;
        }
    }
`

export const ImageContainer = styled.figure`
    width:50px;
    height:50px;
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
    img{
        width:14px;
        height:14px;
    }
`;

export const SaveButton = styled.button`
    padding:6px 17px;
    border-radius:13px;
    box-shadow: 0px 3px 6px #00000029;
    background: var(--darkerSecondary);
    border:none;
    font-size:.6rem;
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

export const FlexContainer = styled.div`
    margin-bottom:0!important;
    gap:8px!important;
    flex: 0 1 auto!important;
    justify-content:end!important;
    width:max-content!important;
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

export const SelectMenu = styled.div`
    position:relative;
    text-align:center;
    padding-bottom:10px;
    h2{
        font-size:1rem;
        color:var(--colorSecondary);
        font-weight:700px;
        margin-bottom:15px;
    }
`;

export const GridList = styled.ul`
    list-style:none;
    display:grid;
    grid-template-columns: 1fr;
    max-width:500px;
    width:100%;
    margin:auto;
    inset:0;
    column-gap: 80px;
    padding:0px 5px 10px;
    max-height:300px;
    min-height:100px;
    overflow:auto;
    @media(min-width:340px){
        padding:0px 20px 10px;
    }
    @media(min-width:750px){
        grid-template-columns: 1fr 1fr;
        max-width:700px;
    }
    @media(min-width:900px){
        grid-template-columns: 1fr;
        max-width:500px;
    }
    @media(min-width:1470px){
        grid-template-columns: 1fr 1fr;
        max-width:700px;
    }
`;

export const Member = styled.li`
    border-bottom: 1px solid #707070;
    display:flex;
    align-items:center;
    padding-bottom:16px;
    justify-content:space-between;
    margin-bottom:25px;
    margin-top:5px;
    gap:10px;
    height:max-content;
    img{
        width:20px;
        height:20px;
        object-fit:cover;
        aspect-ratio:1/1;
        outline:1px solid var(--darkerSecondary);
        border-radius:50%;
        @media(min-width:300px){
            width:30px;
            height:30px;
        }
        @media(min-width:320px){
            width:40px;
            height:40px;
        }
    }
    p{
        font-size:.8rem;
        color:#676767;
        font-weight:400;
        max-width:100%;
        text-overflow: ellipsis;
    }
    div{
        display:flex;
        align-items:center;
        gap:7px;
    }
`;

export const AssignButton = styled.button`
    border:none;
    background:none;
    cursor:pointer;
    padding:7px;
    img{
        display:block;
        width:25px;
        height:25px;
        outline:none;
    }
`;

export const CloseButton = styled.button`
    background:none;
    border:none;
    position:absolute;
    left:-10px;
    top:-20px;
    cursor:pointer;
    padding:5px;
    img{
        width:25px;
        height:25px;
    }
    @media(min-width:670px){
        left:-20px;
    }
`;

export const GridContainer = styled.div`
    width:max-content;
    grid-template-columns: 1fr 1fr 1fr;
    display:grid;
    gap:10px;
    margin:auto;
    inset:0;
    padding-bottom:20px;
    padding-top:20px;
    button{
        display:block;
        cursor:pointer;
        padding:4px;
        aspect-ratio:1/1;
        background:none;
        box-shadow: 0px 3px 6px #00000029;
        border: 1px solid #707070;
        border-radius: 13px;
        color: #676767;
        font-size: .4rem;
        font-weight:bold;
        text-align:center;
        @media(min-width:310px){
            font-size:.5rem;
        }
        @media(min-width:360px){
            padding:10px;
        }
        @media(min-width:470px){
            padding:20px;
        }
        img{
            margin:auto;
            inset:0;
            display:block;
            margin-bottom:6px;
            aspect-ratio:1/1;
            max-width:20px;
            height:auto;
            width:100%;
            @media(min-width:375px){
                max-width:25px;
            }
            @media(min-width:410px){
                max-width:35px;
            }
            @media(min-width:470px){
                max-width:45px;
            }
        }
    }
    @media(min-width:275px){
        gap:20px;
    }
    @media(min-width:450px){
        gap:40px;
        padding-bottom:40px;
    }
`;