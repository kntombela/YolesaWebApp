import { Gender } from './genderEnum';
import { Title } from './titleEnum';

export class Member {
    id: number;
    title: Title;
    fullNames: string;
    surname: string;
    gender: Gender;
    dateOfBirth: Date;
    idNumber: string;
    passportNumber: string;
    isSACitizen: boolean;
    country: string;
    isEmployed: boolean;
    employer: string;
    employerContactNumber: string;
    contactNumber: string;
    telephoneHome: string;
    otherContactNumber: string;
    email: string;
    hasChronicIllness: boolean;
    chronicIllnessDetails: string;
    isUnderDebtReview: boolean;
    debtDetails: string;
    isActive: boolean;
    groupID: number;
    policyNumber: string;
    industry: string;
    dateModified: Date;
}