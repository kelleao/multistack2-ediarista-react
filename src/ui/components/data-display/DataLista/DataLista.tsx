import React from 'react';
import {
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
} from '@mui/material';
import { AccordionStyled } from './DataLista.style';

export interface DataListaProps {
    header?: React.ReactNode;
    body?: React.ReactNode;
    actions?: React.ReactNode;
}

const DataLista: React.FC<DataListaProps> = ({ header, body, actions }) => {
    return (
        <AccordionStyled>
            <AccordionSummary expandIcon={<i className={'twf-caret-down'} />}>
                {header}
            </AccordionSummary>
            <AccordionDetails>{body}</AccordionDetails>
            {actions && <AccordionActions>{actions}</AccordionActions>}
        </AccordionStyled>
    );
};

export default DataLista;
