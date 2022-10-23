import { ComponentMeta, ComponentStory } from '@storybook/react';
import { UserType } from 'data/@types/UserInterface';

import UserProfileAvatar from './UserProfileAvatar';

export default {
    title: 'data-display/UserProfileAvatar',
    component: UserProfileAvatar,
    argTypes: {},
} as ComponentMeta<typeof UserProfileAvatar>;

const Template: ComponentStory<typeof UserProfileAvatar> = (args) => (
    <UserProfileAvatar {...args} />
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
};
