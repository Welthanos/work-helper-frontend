import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { Survey } from '@/src/types/types';
import api from '../services/api';
import { isAxiosError } from 'axios';
import { maskDate, formatApiDateToMask } from '../utils/dates';

export function useSurveys(id?: string) {
    const router = useRouter();

    // Estados para a tela de Listagem
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const [listLoading, setListLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

    // Estados para as telas de formulário
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [formLoading, setFormLoading] = useState(false);

    const fetchSurveysList = useCallback(async () => {
        try {
            const response = await api.get('/surveys');
            setSurveys(response.data);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar as pesquisas.');
        } finally {
            setListLoading(false);
            setIsRefreshing(false);
        }
    }, []);

    const fetchSurveyById = useCallback(async (id: string) => {
        setFormLoading(true);
        try {
            const response = await api.get(`/surveys/${id}`);
            const survey = response.data;
            setTitle(survey.title);
            setDescription(survey.description);
            setStartDate(formatApiDateToMask(survey.start_date));
            setEndDate(formatApiDateToMask(survey.end_date));
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os dados da pesquisa.');
            router.back();
        } finally {
            setFormLoading(false);
        }
    }, [router]);

    useFocusEffect(
        useCallback(() => {
            if (!id) {
                setListLoading(true);
                fetchSurveysList();
            }
        }, [id, fetchSurveysList])
    );

    useEffect(() => {
        if (id) fetchSurveyById(id);

    }, [id, fetchSurveyById]);

    const handleRefresh = () => {
        setIsRefreshing(true);
        fetchSurveysList();
    }

    const handleToggleDates = (id: string) => setOpenPopoverId(prevId => (prevId === id ? null : id));

    const handleNavigateToSurveyCreate = () => {
        setOpenPopoverId(null);
        router.push('/survey/create');
    }

    const handleNavigateToAssessments = (id: string) => {
        setOpenPopoverId(null);
        router.push({ pathname: '/assessment/[id]', params: { id } });
    }

    const handleEdit = (id: string) => {
        setOpenPopoverId(null);
        router.push(`/survey/edit/${id}`);
    }

    const handleDelete = (id: string) => {
        setOpenPopoverId(null);
        Alert.alert('Confirmar exclusão?', 'Tem certeza que deseja deletar esta pesquisa?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Deletar', style: 'destructive',
                    onPress: async () => {
                        try {
                            await api.delete(`/surveys/${id}`);
                            setSurveys(current => current.filter(s => s.id !== id));
                        } catch (error) {
                            Alert.alert('Erro', 'Não foi possível deletar a pesquisa.');
                        }
                    },
                },
            ]
        );
    }

    const saveSurvey = async () => {
        if (formLoading) return;
        if (!title.trim() || !description.trim() || !startDate || !endDate) {
            Alert.alert('Atenção!', 'Por favor, preencha todos os campos.');
            return;
        }
        setFormLoading(true);

        try {
            const payload = { title, description, start_date: startDate, end_date: endDate };
            if (id) {
                await api.put(`/surveys/${id}`, payload);
                Alert.alert('Sucesso!', 'A pesquisa foi atualizada.');
            } else {
                await api.post('/surveys', payload);
                Alert.alert('Sucesso!', 'A nova pesquisa foi criada.');
            }
            router.back();
        } catch (error) {
            let errorMessage = `Não foi possível ${id ? 'atualizar' : 'criar'} a pesquisa.`;
            if (isAxiosError(error) && error.response) {
                errorMessage = error.response.data.message || errorMessage;
            }
            Alert.alert('Erro', errorMessage);
        } finally {
            setFormLoading(false);
        }
    };

    return {
        surveys, listLoading, isRefreshing, openPopoverId,
        handleRefresh, handleToggleDates, handleNavigateToSurveyCreate, handleNavigateToAssessments,
        handleEdit, handleDelete, closePopover: () => setOpenPopoverId(null),
        title, setTitle, description, setDescription,
        startDate, setStartDate: (text: string) => setStartDate(maskDate(text)),
        endDate, setEndDate: (text: string) => setEndDate(maskDate(text)),
        formLoading, saveSurvey, isEditing: !!id,
    };
}