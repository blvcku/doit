import { useEffect } from 'react';
import Logo from '../../assets/icons/logo.svg';
import Smile from '../../assets/icons/smile.svg';
import { Link } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import { Container, Wrapper } from './FormSuccess.styles';

const FormSuccess = () => {
    const { setTitle } = useTitle();

    useEffect(() => {
        setTitle('Success');
    }, [setTitle]);

    return (
        <Wrapper>
            <Container>
                <img src={Logo} alt="doit" />
                <h1>Thank you for submitting your form!</h1>
                <img src={Smile} alt="" />
                <Link to="/dashboard">Go to dashboard</Link>
            </Container>
        </Wrapper>
    );
};

export default FormSuccess;
