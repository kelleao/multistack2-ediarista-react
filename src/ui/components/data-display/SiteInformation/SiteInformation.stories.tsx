import { ComponentMeta, ComponentStory } from '@storybook/react';

import SiteInformation from './SiteInformation';

export default {
    title: 'data-display/SiteInformation',
    component: SiteInformation,
    argTypes: {},
} as ComponentMeta<typeof SiteInformation>;

const Template: ComponentStory<typeof SiteInformation> = (args) => (
    <SiteInformation {...args} />
);

export const Default = Template.bind({});
Default.args = {
    title: 'Detalhes',
    items: [
        {
            title: 'Tipo',
            description: ['Limpeza de rotina'],
            icon: 'twf-check-circle',
        },
        {
            title: 'Tamanho',
            description: ['3 cômodos', '2 banheiros'],
            icon: 'twf-check-circle',
        },
        {
            title: 'Data',
            description: ['14/12/2020'],
            icon: 'twf-check-circle',
        },
    ],
    footer: {
        text: 'R$185,00',
        icon: 'twf-credit-card',
    },
};

export const NoIconNoFooter = Template.bind({});
NoIconNoFooter.args = {
    title: 'Como funciona?',
    items: [
        {
            title: '1 - Cadastro',
            description: ['Você faz o cadastro e escolhe as cidades atendidas'],
        },
        {
            title: '2 - Receba Propostas',
            description: [
                'Você receberá avisos por E-mail sobre novos serviços nas cidades atendidas',
            ],
        },
        {
            title: '3 - Diária Agendada',
            description: [
                'Se o seu perfil for escolhido pelo cliente, você receberá a confirmação do agendamento',
            ],
        },
    ],
};
