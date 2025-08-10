import { ImageSourcePropType, KeyboardTypeOptions } from 'react-native';

export type Modality = {
    id: string;
    name: string;
    image: ImageSourcePropType;
    active: boolean;
}

export type Survey = {
    id: string;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
}

export type Assessment = {
    id: string;
    user_id: string;
    worker_id: string;
    survey_id: string;
    worker_age: number;
    worker_weight_kg: number;
    worker_height_m: number;
    service_time_years: number;
    work_shift_hours: number;
    load_unitization_n: number;
    has_package_grip: boolean;
    load_weight_kg: number;
    distance_traveled_m: number;
    lifting_frequency_per_min: number;
    trunk_flexion_angle: number;
    trunk_rotation_angle: number;
    calculated_risk: number;
    assessment_date: string;
    worker_cpf: string;
    worker_name: string;
    worker_sex: string;
    recommendations?: Recommendation[];
}

export type AssessmentField = {
    name: keyof Omit<Assessment, 'id' | 'user_id' | 'worker_id' | 'survey_id' | 'worker_name' | 'assessment_date' | 'cpf' | 'sex' | 'modality'>;
    label: string;
    keyboard: KeyboardTypeOptions;
}

export type Recommendation = {
    recommendation_code: string;
    description: string;
}

export type RiskLevel = 'Baixo' | 'Moderado' | 'Alto';

export type RiskDistributionItem = {
    risk_level: RiskLevel;
    count: string;
}

