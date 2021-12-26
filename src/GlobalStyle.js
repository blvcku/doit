import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root{
        --colorWhite: #F3FEFF;
        --colorDarkerWhite: #E4F3F5;
        --colorMain: #23ACA8;
        --colorSecondary: #09728C;
        --darkerSecondary: #155883;
        --colorThird: #0e8e8c;
    }
    *{
        box-sizing: border-box;
        font-family: 'Rubik', sans-serif;
        font-weight: 400;
        margin: 0;
        padding: 0;
    }
    body{
        max-width:1920px;
        margin:auto;
        inset:0;
        background-color: var(--colorDarkerWhite);
        h1{
            font-size: var(--fontSuperBig);
            font-weight: 700;
            margin:0;
        }
        h2{
            font-size: var(--fontBig);
            font-weight: 700;
            margin: 0;
        }
        h3{
            font-size: var(--fontMed);
            margin:0;
        }
        b{
            font-weight:700;
        }
    }
    html{
        font-size:16px;
    }
    
    @media (min-width: 600px){
        html{
            font-size:17px
        }
    }
    @media (min-width: 768px){
        html{
            font-size:18px
        }
    }
    @media (min-width: 992px){
        html{
            font-size:19px
        }
    }
    @media (min-width: 1200px){
        html{
            font-size:20px
        }
    }
`;

export default GlobalStyle;