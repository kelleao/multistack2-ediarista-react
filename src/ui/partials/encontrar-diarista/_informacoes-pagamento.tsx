import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { PaymentForm } from 'ui/components/inputs/UserForm/UserForm';

// import { Component } from './_informacoes-pagamento.styled';

const InformacoesPagamento: React.FC = () => {
    return (
        <div>
            <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                Informações de Pagamento
            </Typography>
            <PaymentForm />
            <Container sx={{ textAlign: 'center' }}>
                <Button variant="contained" color="secondary" type="submit">
                    Fazer Pagamento
                </Button>
            </Container>
        </div>
    );
};

export default InformacoesPagamento;
