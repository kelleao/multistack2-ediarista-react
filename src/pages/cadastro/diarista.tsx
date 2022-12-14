import React, { PropsWithChildren, useEffect } from 'react';
import { GetStaticProps } from 'next';
import SafeEnvironment from 'ui/components/feedback/SafeEnvironment/SafeEnvironment';
import Breadcrumb from 'ui/components/navigation/Breadcrumb/Breadcrumb';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import Link from 'ui/components/navigation/Link/Link';
import useCadastroDiarista from 'data/hooks/pages/cadastro/useCadastroDiarista.page';
import {
    AddressForm,
    CitiesForm,
    FinancialForm,
    NewContactForm,
    PictureForm,
    UserDataForm,
    UserFormContainer,
} from 'ui/components/inputs/UserForm/UserForm';
import { PageFormContainer } from 'ui/components/inputs/UserForm/UserForm.style';
import useIsMobile from 'data/hooks/uselsMobile';
import SideInformation from 'ui/components/data-display/SiteInformation/SiteInformation';
import { FormProvider } from 'react-hook-form';
import { Button, Container, Divider, Paper, Typography } from '@mui/material';
import Dialog from 'ui/components/feedback/Dialog/Dialog';
import { BrowserService } from 'data/services/BrowserService';
// import { Component } from '@styles/pages/cadastro/diarista.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Diarista',
        },
    };
};

const Diarista: React.FC<PropsWithChildren> = () => {
    const isMobile = useIsMobile(),
        {
            step,
            isWaitingResponse,
            breadcrumbItems,
            userForm,
            onUserSubmit,
            addressListForm,
            onAddressSubmit,
            newAddress,
            sucessoCadastro,
            enderecosAtendidos,
        } = useCadastroDiarista();

    useEffect(() => {
        BrowserService.scrollToTop();
    }, [step]);

    return (
        <>
            <SafeEnvironment />
            <Breadcrumb
                items={breadcrumbItems}
                selected={breadcrumbItems[step - 1]}
            />
            {step === 1 && (
                <PageTitle
                    title={'Precisamos conhecer um pouco sobre voc??!'}
                    subtitle={
                        <span>
                            Caso j?? tenha cadastro,{' '}
                            <Link href={'/login'}>cliquei aqui.</Link>
                        </span>
                    }
                />
            )}
            {step === 2 && (
                <PageTitle
                    title={'Quais cidades voc?? atender???'}
                    subtitle={
                        <span>
                            Voc?? pode escolher se aceita ou n??o um servi??o.
                            Ent??o, n??o se preocupe se mora em uma grande cidade
                        </span>
                    }
                />
            )}
            <UserFormContainer>
                <PageFormContainer>
                    {step === 1 && (
                        <FormProvider {...userForm}>
                            <Paper
                                sx={{ p: 4 }}
                                component={'form'}
                                onSubmit={userForm.handleSubmit(onUserSubmit)}
                            >
                                <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                                    Dados pessoais
                                </Typography>
                                <UserDataForm cadastro={true} />
                                <Divider sx={{ mb: 5 }} />
                                <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                                    Financeiro
                                </Typography>
                                <FinancialForm />
                                <Divider sx={{ mb: 5 }} />
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    Hora da self! Envie uma self segurando o
                                    documento
                                </Typography>
                                <Typography sx={{ pb: 2 }}>
                                    Para sua seguran??a, todos os profissionais e
                                    clientes precisam enviar
                                </Typography>
                                <PictureForm />
                                <Typography
                                    sx={{ pt: 1, pb: 5 }}
                                    variant={'body2'}
                                >
                                    Essa foto n??o ser?? vista por ningu??m
                                </Typography>
                                <Divider sx={{ mb: 5 }} />
                                <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                                    Endere??o
                                </Typography>
                                <AddressForm />

                                <Divider sx={{ mb: 5 }} />

                                <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                                    Dados de acesso
                                </Typography>
                                <NewContactForm />

                                <Container sx={{ textAlign: 'center' }}>
                                    <Button
                                        variant={'contained'}
                                        color={'secondary'}
                                        disabled={isWaitingResponse}
                                        type={'submit'}
                                    >
                                        Cadastrar e escolher cidades
                                    </Button>
                                </Container>
                            </Paper>
                        </FormProvider>
                    )}

                    {step === 2 && (
                        <FormProvider {...addressListForm}>
                            <Paper
                                sx={{ p: 4 }}
                                component={'form'}
                                onSubmit={addressListForm.handleSubmit(
                                    onAddressSubmit
                                )}
                            >
                                <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                                    Selecione a cidade
                                </Typography>
                                {newAddress && (
                                    <CitiesForm estado={newAddress.estado} />
                                )}
                                <Container sx={{ textAlign: 'center' }}>
                                    <Button
                                        variant={'contained'}
                                        color={'secondary'}
                                        disabled={
                                            isWaitingResponse ||
                                            enderecosAtendidos?.length === 0
                                        }
                                        type={'submit'}
                                    >
                                        Finalizar o cadastro
                                    </Button>
                                </Container>
                            </Paper>
                        </FormProvider>
                    )}

                    {!isMobile && (
                        <SideInformation
                            title={'Como funciona?'}
                            items={[
                                {
                                    title: '1 - Cadastro',
                                    description: [
                                        'Voc?? faz o cadastro e escolhe as cidades atendidas',
                                    ],
                                },
                                {
                                    title: '2 - Receba Propostas',
                                    description: [
                                        'Voc?? receber?? avisos por E-mail sobre novos servi??os nas cidades atendidas',
                                    ],
                                },
                                {
                                    title: '3 - Di??ria Agendada',
                                    description: [
                                        'Se o seu perfil for escolhido pelo cliente, voc?? receber?? a confirma????o do agendamento',
                                    ],
                                },
                            ]}
                        />
                    )}
                </PageFormContainer>
            </UserFormContainer>

            <Dialog
                isOpen={sucessoCadastro}
                title={'Cadastro realizado com sucesso!'}
                noCancel
                confirmLabel={'Ver oportunidades'}
                onConfirm={() => window.location.reload()}
                onClose={() => {}}
            >
                Agora voc?? pode visualizar as oportunidades dispon??veis na sua
                regi??o.
            </Dialog>
        </>
    );
};

export default Diarista;
