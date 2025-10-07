/**
 * Workshop page related interfaces and types
 */

import {
    ActivityHeroSection,
    BaseDetail,
    ButtonDetail,
    SectionButton,
    SectionIntro,
    StrapiImage,
    StrapiListText,
} from "@/utils/interfaces";

export interface WorkshopCategoryItem extends BaseDetail {
    image: string | StrapiImage;
    icon: string;
    duration: string;
    topics: StrapiListText[];
}

export interface WorkshopCategoriesSection {
    sectionIntro: SectionIntro;
    items: WorkshopCategoryItem[];
}

export interface UpcomingWorkshopItem extends BaseDetail {
    image: string | StrapiImage;
    date: string;
    time: string;
    participants: string;
    location: string;
    button?: ButtonDetail;
}

export interface UpcomingWorkshopsSection {
    sectionIntro: SectionIntro;
    items: UpcomingWorkshopItem[];
}

export interface TrainingMethodItem extends BaseDetail {
    icon: string;
}

export interface TrainingMethodsSection {
    sectionIntro: SectionIntro;
    items: TrainingMethodItem[];
    image: string | StrapiImage;
}

export interface ExpertTrainerItem extends BaseDetail {
    icon: string;
}

export interface ExpertTrainersSection {
    sectionIntro: SectionIntro;
    items: ExpertTrainerItem[];
}

export interface CertificationBenefitItem extends BaseDetail {
    icon: string;
}

export interface CertificationSection {
    title: string;
    description: string;
    benefits: CertificationBenefitItem[];
}

export interface WorkshopContent {
    pageIntro?: SectionIntro;
    heroSection?: ActivityHeroSection;
    workshopCategoriesSection?: WorkshopCategoriesSection;
    upcomingWorkshopsSection?: UpcomingWorkshopsSection;
    trainingMethodsSection?: TrainingMethodsSection;
    expertTrainersSection?: ExpertTrainersSection;
    certificationSection?: CertificationSection;
    joinSection?: SectionButton;
}
