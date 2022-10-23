import React from 'react';
import { GetStaticProps } from 'next';
import SafeEnvironment from 'ui/components/feedback/SafeEnvironment/SafeEnvironment';
import { Container, Typography } from '@mui/material';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import { FormProvider } from 'react-hook-form';
import { LoginContainer, LoginButton } from '@styles/pages/login.styled';
import { LoginForm } from 'ui/components/inputs/UserForm/forms/LoginForm';
import useLogin from 'data/hooks/pages/useLogin.page';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'login',
        },
    };
};

const login: React.FC = () => {
    const { formMethods, onSubmit, externalServicesState, errorMessage } =
        useLogin();
    return (
        <FormProvider {...formMethods}>
            <SafeEnvironment />
            <Container>
                <PageTitle title={'Informe seu e-mail e senha'} />
                <LoginContainer
                    as={'form'}
                    onSubmit={formMethods.handleSubmit(onSubmit)}
                >
                    <LoginForm />
                    {errorMessage && (
                        <Typography color={'error'} align={'center'}>
                            {errorMessage}
                        </Typography>
                    )}
                    <LoginButton
                        size={'large'}
                        variant={'contained'}
                        color={'secondary'}
                        type={'submit'}
                        disabled={
                            externalServicesState?.externalServices?.length ===
                            0
                        }
                    >
                        Entrar
                    </LoginButton>
                </LoginContainer>
            </Container>
        </FormProvider>
    );
};

export default login;
