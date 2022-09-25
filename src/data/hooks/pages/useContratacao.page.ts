import { useState, useMemo, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ServicoInterface } from 'data/@types/ServicoInterface';
import { FormSchemaService } from 'data/services/FormSchemaService';
import {
    CadastroClienteFormDataInterface,
    CredenciaisInterface,
    LoginFormDataInterface,
    NovaDiariaFormDataInterface,
    PagamentoFormDataInterface,
} from 'data/@types/FormInterface';
import useApi from '../useApi.hook';
import { DiariaInterface } from 'data/@types/DiariaInterface';
import { ValidationService } from 'data/services/ValidationService';
import { DateService } from 'data/services/DateService';
import { houseParts } from '@partials/encontrar-diarista/_detalhes-servico';
import { ExternalServiceContex } from 'data/contexts/ExternalServiceContext';
import { ApiService, linksResolver } from 'data/services/ApiService';

export default function useContratacao() {
    const [step, setStep] = useState(1),
        [hasLogin, setHasLogin] = useState(false),
        [loginError, setLoginError] = useState(''),
        breadcrumbItems = ['Detalhes da diária', 'Identificação', 'Pagamento'],
        serviceForm = useForm<NovaDiariaFormDataInterface>({
            resolver: yupResolver(
                FormSchemaService.address().concat(
                    FormSchemaService.detalhesServico()
                )
            ),
        }),
        clientForm = useForm<CadastroClienteFormDataInterface>({
            resolver: yupResolver(
                FormSchemaService.userData().concat(
                    FormSchemaService.newContact()
                )
            ),
        }),
        loginForm = useForm<LoginFormDataInterface<CredenciaisInterface>>({
            resolver: yupResolver(FormSchemaService.login()),
        }),
        paymentForm = useForm<PagamentoFormDataInterface>({
            resolver: yupResolver(FormSchemaService.payment()),
        }),
        { externalServicesState } = useContext(ExternalServiceContex),
        servicos = useApi<ServicoInterface[]>('/api/servico').data,
        dadosFaxina = serviceForm.watch('faxina'),
        cepFaxina = serviceForm.watch('endereco.cep'),
        [podemosAtender, setPodemosAtender] = useState(true),
        tipoLimpeza = useMemo<ServicoInterface>(() => {
            if (servicos && dadosFaxina?.servico) {
                const selectedService = servicos.find(
                    (servico) => servico.id === dadosFaxina?.servico
                );
                if (selectedService) {
                    return selectedService;
                }
            }
            return {} as ServicoInterface;
        }, [servicos, dadosFaxina?.servico]),
        { tamanhoCasa, totalPrice, totalTime } = useMemo<{
            tamanhoCasa: string[];
            totalPrice: number;
            totalTime: number;
        }>(
            () => ({
                tamanhoCasa: listarComodos(dadosFaxina),
                totalPrice: calcularPreco(dadosFaxina, tipoLimpeza),
                totalTime: calcularTempoServico(dadosFaxina, tipoLimpeza),
            }),
            /* eslint-disable react-hooks/exhaustive-deps */
            [
                tipoLimpeza,
                dadosFaxina,
                dadosFaxina?.quantidade_banheiros,
                dadosFaxina?.quantidade_cozinhas,
                dadosFaxina?.quantidade_outros,
                dadosFaxina?.quantidade_quartos,
                dadosFaxina?.quantidade_quintais,
                dadosFaxina?.quantidade_salas,
            ]
        );

    useEffect(() => {
        if (
            dadosFaxina &&
            ValidationService.hora(dadosFaxina.hora_inicio) &&
            totalTime >= 0
        ) {
            serviceForm.setValue(
                'faxina.hora_termino',
                DateService.addHours(
                    dadosFaxina?.hora_inicio as string,
                    totalTime
                ),
                { shouldValidate: true }
            );
        } else {
            serviceForm.setValue('faxina.hora_termino', '');
        }
    }, [dadosFaxina?.hora_inicio, totalTime]);

    useEffect(() => {
        const cep = ((cepFaxina as string) || '').replace(/\D/g, '');
        if (ValidationService.cep(cep)) {
            const linkDisponibilidade = linksResolver(
                externalServicesState.externalService,
                'verificar_disponibilidade_atendimento'
            );
            if (linkDisponibilidade) {
                ApiService.request<{ disponibilidade: boolean }>({
                    url: linkDisponibilidade.uri + '?cep=' + cep,
                    method: linkDisponibilidade.type,
                })
                    .then((response) => {
                        setPodemosAtender(response.data.disponibilidade);
                    })
                    .catch((_error) => setPodemosAtender(false));
            }
        } else {
            setPodemosAtender(true);
        }
    }, [cepFaxina]);

    function onServiceFormSubmit(data: NovaDiariaFormDataInterface) {
        console.log(data);
    }

    function onClientFormSubmit(data: CadastroClienteFormDataInterface) {
        console.log(data);
    }

    function onLoginFormSubmit(
        data: LoginFormDataInterface<CredenciaisInterface>
    ) {
        console.log(data);
    }

    function onPaymentFormSubmit(data: PagamentoFormDataInterface) {
        console.log(data);
    }

    function listarComodos(dadosFaxina: DiariaInterface): string[] {
        const comodos: string[] = [];
        if (dadosFaxina) {
            houseParts.forEach((houseParts) => {
                const total = dadosFaxina[
                    houseParts.name as keyof DiariaInterface
                ] as number;

                if (total > 0) {
                    const nome =
                        total > 1 ? houseParts.plural : houseParts.singular;
                    comodos.push(`${total} ${nome}`);
                }
            });
        }

        return comodos;
    }

    function calcularTempoServico(
        dadosFaxina: DiariaInterface,
        tipoLimpeza: ServicoInterface
    ) {
        let total = 0;
        if (dadosFaxina && tipoLimpeza) {
            total +=
                tipoLimpeza.horas_banheiro * dadosFaxina.quantidade_banheiros;
            total +=
                tipoLimpeza.horas_cozinha * dadosFaxina.quantidade_cozinhas;
            total += tipoLimpeza.horas_outros * dadosFaxina.quantidade_outros;
            total += tipoLimpeza.horas_quarto * dadosFaxina.quantidade_quartos;
            total +=
                tipoLimpeza.horas_quintal * dadosFaxina.quantidade_quintais;
            total += tipoLimpeza.horas_sala * dadosFaxina.quantidade_salas;
        }

        return total;
    }

    function calcularPreco(
        dadosFaxina: DiariaInterface,
        tipoLimpeza: ServicoInterface
    ) {
        let total = 0;
        if (dadosFaxina && tipoLimpeza) {
            total +=
                tipoLimpeza.valor_banheiro * dadosFaxina.quantidade_banheiros;
            total +=
                tipoLimpeza.valor_cozinha * dadosFaxina.quantidade_cozinhas;
            total += tipoLimpeza.valor_outros * dadosFaxina.quantidade_outros;
            total += tipoLimpeza.valor_quarto * dadosFaxina.quantidade_quartos;
            total +=
                tipoLimpeza.valor_quintal * dadosFaxina.quantidade_quintais;
            total += tipoLimpeza.valor_sala * dadosFaxina.quantidade_salas;
        }

        return Math.max(total, tipoLimpeza.valor_minimo);
    }

    return {
        step,
        setStep,
        breadcrumbItems,
        loginForm,
        onLoginFormSubmit,
        serviceForm,
        onServiceFormSubmit,
        servicos,
        podemosAtender,
        hasLogin,
        setHasLogin,
        clientForm,
        onClientFormSubmit,
        loginError,
        setLoginError,
        paymentForm,
        onPaymentFormSubmit,
        tipoLimpeza,
        totalPrice,
        tamanhoCasa,
    };
}
