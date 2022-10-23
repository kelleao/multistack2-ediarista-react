import { ComponentMeta, ComponentStory } from '@storybook/react';
import { UserType } from 'data/@types/UserInterface';

import UserHeaderMenu from './UserHeaderMenu';

export default {
    title: 'navigation/UserHeaderMenu',
    component: UserHeaderMenu,
    argTypes: {},
} as ComponentMeta<typeof UserHeaderMenu>;

const Template: ComponentStory<typeof UserHeaderMenu> = (args) => (
    <UserHeaderMenu {...args} />
);

export const Default = Template.bind({});
Default.args = {
    user: {
        nome_completo: 'Raquel Leão',
        nascimento: '1979-04-29',
        cpf: '05003931689',
        email: 'raquel@gmail.com',
        foto_usuario: 'https://github.com/kelleao.png',
        telefone: '(31)9999-9999',
        tipo_usuario: UserType.Cliente,
        reputacao: 0,
        password: '',
        chave_pix: '',
    },
    isMenuOpen: false,
};
