import { styled } from '@mui/material/styles';
import { Button, Paper } from '@mui/material';

export const LoginContainer = styled(Paper)`
    display: grid;
    grid-template-columns: minmax(20px, 650px);
    justify-content: center;
    padding: ${({ theme }) => theme.spacing(6, 2)};
    margin-botton: ${({ theme }) => theme.spacing(4)};
`;

export const LoginButton = styled(Button)`
    width: 226px;
    justify-self: center;
    margin-top: ${({ theme }) => theme.spacing(4)};
`;
