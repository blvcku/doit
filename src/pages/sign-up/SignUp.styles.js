import styled from 'styled-components';
import AuthPage from '../../components/auth-page/AuthPage';
import { AuthPageLabel } from '../../components/auth-page/AuthPage.styles';

export const SignUpAuthPage = styled(AuthPage)`
    ${AuthPageLabel} {
        margin-top: 30px;
    }
`;
