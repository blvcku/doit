import Logo from '../../../images/logodark.svg';
import Smile from '../../../images/smile.svg';
import { Link } from 'react-router-dom';

import { Container, Wrapper } from "./FormSuccess.styles";

const FormSuccess = () => {
    return(
        <Wrapper>
            <Container>
                <img src={Logo} alt='doit' />
                <h1>Thank you for submitting your form!</h1>
                <img src={Smile} alt='thanks' />
                <Link to='/dashboard'>Go to dashboard</Link>
            </Container>
        </Wrapper>
    )
}

export default FormSuccess;