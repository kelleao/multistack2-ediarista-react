import { styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import { UserProfileAvatarProps } from './UserProfileAvatar';

export const UserAvatar = styled(Avatar)`
    border: 2px solid currentColor;
`;

export const AvatarIcon = styled('i')<UserProfileAvatarProps>`
    font-size: ${({ theme }) => theme.spacing(1)}
    vertical-align: middle;
    display: ${({ user }) => (user?.nome_completo ? 'initial' : 'none')};
`;
