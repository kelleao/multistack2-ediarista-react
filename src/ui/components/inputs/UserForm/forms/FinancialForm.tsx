import { FinancialData } from '../UserForm.style';
import TextField from '../../TextField/TextField';
import { useFormContext } from 'react-hook-form';
import { useContext } from 'react';
import { UserContext } from 'data/contexts/UserContext';

export const FinancialForm = () => {
    const { register } = useFormContext();
    return (
        <FinancialData>
            <TextField
                label={'Chave Pix'}
                defaultValue={''}
                {...register('usuario.chave_pix', { minLength: 5 })}
            />
        </FinancialData>
    );
};
