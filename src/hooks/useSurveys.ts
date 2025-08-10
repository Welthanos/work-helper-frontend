import { Survey } from '@/src/types/types';
import { isAxiosError } from 'axios';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import api from '../services/api';
import { formatApiDateToMask, maskDate } from '../utils/dates';

export function useSurveys(surveyId?: string) {
    const router = useRouter();

    const [surveys, setSurveys] = useState<Survey[]>([]);
    const [listLoading, setListLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

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
            if (!surveyId) {
                setListLoading(true);
                fetchSurveysList();
            }
        }, [surveyId, fetchSurveysList])
    );

    useEffect(() => {
        if (surveyId) fetchSurveyById(surveyId);

    }, [surveyId, fetchSurveyById]);

    const handleRefresh = () => {
        setIsRefreshing(true);
        fetchSurveysList();
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
            if (surveyId) {
                await api.put(`/surveys/${surveyId}`, payload);
                Alert.alert('Sucesso!', 'A pesquisa foi atualizada.');
            } else {
                await api.post('/surveys', payload);
                Alert.alert('Sucesso!', 'A pesquisa foi criada.');
            }
            router.back();
        } catch (error) {
            let errorMessage = `Não foi possível ${surveyId ? 'atualizar' : 'criar'} a pesquisa.`;
            if (isAxiosError(error) && error.response) {
                errorMessage = error.response.data.message || errorMessage;
            }
            Alert.alert('Atenção!', errorMessage);
        } finally {
            setFormLoading(false);
        }
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
        Alert.alert('Confirmar exclusão?', 'Tem certeza que deseja excluir esta pesquisa?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir', style: 'destructive',
                    onPress: async () => {
                        try {
                            await api.delete(`/surveys/${id}`);
                            setSurveys(current => current.filter(s => s.id !== id));
                        } catch (error) {
                            let errorMessage = 'Não foi possível excluir a pesquisa.';
                            if (isAxiosError(error) && error.response) errorMessage = error.response.data.message || errorMessage;
                            Alert.alert('Erro', errorMessage);
                        }
                    },
                },
            ]
        );
    }

    return {
        surveys, listLoading, isRefreshing, openPopoverId,
        handleRefresh, handleToggleDates, handleNavigateToSurveyCreate, handleNavigateToAssessments,
        handleEdit, handleDelete, closePopover: () => setOpenPopoverId(null),
        title, setTitle, description, setDescription,
        startDate, setStartDate: (text: string) => setStartDate(maskDate(text)),
        endDate, setEndDate: (text: string) => setEndDate(maskDate(text)),
        formLoading, saveSurvey, isEditing: !!surveyId,
    }
}