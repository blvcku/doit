import { useState, Fragment } from 'react';
import {
    AuthPageContainer,
    AuthPageBox,
    AuthPageTitle,
    AuthPageForm,
    AuthPageLabel,
    AuthPageInput,
    AuthPageParagraph,
    AuthPageButton,
    AuthPageSuccessMessage,
} from './AuthPage.styles';

const AuthPage = ({
    children,
    title,
    inputs,
    submitHandler,
    successMessage,
    ...containerProps
}) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        await submitHandler(e);
        setLoading(false);
    };

    return (
        <AuthPageContainer {...containerProps}>
            <AuthPageBox>
                <AuthPageTitle>{title}</AuthPageTitle>
                <AuthPageForm noValidate onSubmit={handleSubmit}>
                    {inputs.map(({ name, label, ...inputProps }) => (
                        <Fragment key={name}>
                            <AuthPageLabel htmlFor={name}>
                                {label}
                            </AuthPageLabel>
                            <AuthPageInput
                                name={name}
                                id={name}
                                {...inputProps}
                            />
                        </Fragment>
                    ))}
                    <AuthPageParagraph>{children}</AuthPageParagraph>
                    <AuthPageButton type="submit" disabled={loading}>
                        Submit
                    </AuthPageButton>
                    {successMessage ? (
                        <AuthPageSuccessMessage>
                            {successMessage}
                        </AuthPageSuccessMessage>
                    ) : null}
                </AuthPageForm>
            </AuthPageBox>
        </AuthPageContainer>
    );
};

export default AuthPage;
