import { Button } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import DataLista from './DataLista';

export default {
    title: 'data-display/DataLista',
    component: DataLista,
    argTypes: {},
} as ComponentMeta<typeof DataLista>;

const Template: ComponentStory<typeof DataLista> = () => (
    <DataLista
        header={
            <div>
                Data: 05/05/2020
                <br />
                Limpeza simples
            </div>
        }
        body={
            <div>
                Cidade: São Paulo <br />
                Número de cômodos
            </div>
        }
        actions={
            <>
                <Button variant={'contained'} color={'secondary'}>
                    Se candidatar
                </Button>
            </>
        }
    />
);

export const Default = Template.bind({});
Default.args = {};
