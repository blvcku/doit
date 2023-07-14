import Logo from '../../assets/icons/logo.svg';
import Smile from '../../assets/icons/smile.svg';
import useTitle from '../../hooks/useTitle';
import {
    FormSuccessContainer,
    FormSuccessBoxContainer,
    FormSuccessIconLogo,
    FormSuccessHeading,
    FormSuccessIcon,
    FormSuccessLink,
} from './FormSuccess.styles';

const FormSuccess = () => {
    useTitle('Success');

    return (
        <FormSuccessContainer>
            <FormSuccessBoxContainer>
                <FormSuccessIconLogo src={Logo} alt="doit" />
                <FormSuccessHeading>
                    Thank you for submitting your form!
                </FormSuccessHeading>
                <FormSuccessIcon src={Smile} alt="" />
                <FormSuccessLink to="/dashboard">
                    Go to dashboard
                </FormSuccessLink>
            </FormSuccessBoxContainer>
        </FormSuccessContainer>
    );
};

export default FormSuccess;
