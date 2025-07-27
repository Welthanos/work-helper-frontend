import { isAxiosError } from 'axios';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import api from '../services/api';
import { Assessment } from '../types/types';
import { unmaskCpf } from '../utils/cpf';
import { formatApiDateToMask, unmaskDate } from '../utils/date';

const initialFormState = {
    worker_name: '',
    worker_cpf: '',
    worker_sex: 'M',
    assessment_date: '',
    worker_age: '',
    worker_weight_kg: '',
    worker_height_m: '',
    service_time_years: '',
    work_shift_hours: '',
    load_unitization_n: '',
    has_package_grip: false,
    load_weight_kg: '',
    distance_traveled_m: '',
    lifting_frequency_per_min: '',
    trunk_flexion_angle: '',
    trunk_rotation_angle: '',
}

export function useAssessments(surveyId: string, assessmentId?: string) {
    const router = useRouter();

    const [assessments, setAssessments] = useState<Assessment[]>([]);
    const [listLoading, setListLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

    const [formState, setFormState] = useState(initialFormState);
    const [formLoading, setFormLoading] = useState(false);

    const fetchAssessmentsList = useCallback(async () => {
        if (!surveyId) return;

        try {
            const response = await api.get(`/assessments?surveyId=${surveyId}`);
            setAssessments(response.data);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar as avaliações.');
        } finally {
            setListLoading(false);
            setIsRefreshing(false);
        }
    }, [surveyId]);

    const fetchAssessmentById = useCallback(async (id: string) => {
        setFormLoading(true);
        try {
            const response = await api.get(`/assessments/${id}`);
            const assessmentData = response.data;

            setFormState({
                ...assessmentData,
                assessment_date: formatApiDateToMask(assessmentData.assessment_date),
            });

        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os dados da avaliação.');
            router.back();
        } finally {
            setFormLoading(false);
        }
    }, [router]);

    useFocusEffect(
        useCallback(() => {
            if (!assessmentId) {
                setListLoading(true);
                fetchAssessmentsList();
            }
        }, [assessmentId, fetchAssessmentsList])
    );

    useEffect(() => {
        if (assessmentId) {
            fetchAssessmentById(assessmentId);
        } else {
            setFormState(initialFormState);
        }
    }, [assessmentId, fetchAssessmentById]);

    const saveAssessment = async () => {
        if (formLoading) return;
        if (!formState.worker_name?.trim() || !formState.worker_cpf || !formState.assessment_date) {
            Alert.alert('Atenção!', 'Preencha os dados do trabalhador e a data da avaliação.');
            return;
        }
        setFormLoading(true);

        const payload = {
            survey_id: surveyId,
            assessment_date: unmaskDate(formState.assessment_date),
            worker_details: {
                cpf: unmaskCpf(formState.worker_cpf),
                name: formState.worker_name,
                sex: formState.worker_sex,
            },
            assessment_details: {
                worker_age: Number(formState.worker_age),
                worker_weight_kg: Number(formState.worker_weight_kg),
                worker_height_m: Number(formState.worker_height_m),
                service_time_years: Number(formState.service_time_years),
                work_shift_hours: Number(formState.work_shift_hours),
                load_unitization_n: Number(formState.load_unitization_n),
                has_package_grip: formState.has_package_grip,
                load_weight_kg: Number(formState.load_weight_kg),
                distance_traveled_m: Number(formState.distance_traveled_m),
                lifting_frequency_per_min: Number(formState.lifting_frequency_per_min),
                trunk_flexion_angle: Number(formState.trunk_flexion_angle),
                trunk_rotation_angle: Number(formState.trunk_rotation_angle),
            }
        }

        try {
            if (assessmentId) {
                await api.put(`/assessments/${assessmentId}`, payload);
                Alert.alert('Sucesso!', 'A avaliação foi atualizada.');
            } else {
                await api.post('/assessments', payload);
                Alert.alert('Sucesso!', 'A nova avaliação foi criada.');
            }
            router.back();
        } catch (error) {
            let errorMessage = `Não foi possível ${assessmentId ? 'atualizar' : 'criar'} a avaliação.`;
            if (isAxiosError(error) && error.response) {
                errorMessage = error.response.data.message || errorMessage;
            }
            Alert.alert('Erro', errorMessage);
        } finally {
            setFormLoading(false);
        }
    }

    const handleRefresh = useCallback(() => {
        setIsRefreshing(true);
        fetchAssessmentsList();
    }, [fetchAssessmentsList]);

    const handleNavigateToAssessmentCreate = () => {
        setOpenPopoverId(null);
        router.push({
            pathname: '/assessment/create',
            params: { surveyId },
        });
    }

    const handleNavigateToRecommendations = (id: string) => {
        setOpenPopoverId(null);
        router.push('/');
    }

    const handleEdit = (id: string) => {
        setOpenPopoverId(null);
        router.push(`/assessment/edit/${id}`);
    }

    const handleDelete = (id: string) => {
        setOpenPopoverId(null);
        Alert.alert('Confirmar exclusão?', 'Tem certeza que deseja excluir esta pesquisa?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Deletar', style: 'destructive',
                    onPress: async () => {
                        try {
                            await api.delete(`/assessments/${id}`);
                            setAssessments(current => current.filter(a => a.id !== id));
                        } catch (error) {
                            Alert.alert('Erro', 'Não foi possível excluir a avaliação.');
                        }
                    },
                },
            ]
        );
    }

    const handleToggleDate = (id: string) => {
        setOpenPopoverId(prevId => (prevId === id ? null : id));
    }

    return {
        assessments, listLoading, isRefreshing, openPopoverId,
        handleRefresh, handleToggleDate, handleNavigateToAssessmentCreate,
        handleNavigateToRecommendations, handleEdit, handleDelete,
        closePopover: () => setOpenPopoverId(null),
        formState, setFormState, formLoading,
        saveAssessment, isEditing: !!assessmentId,
    }
}