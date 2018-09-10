import { GroupType } from './groupTypeEnum';
export class Group {
    id: number;
    name: string;
    type: GroupType;
    policyNumber: string;
    industry: string;
    dateModified: Date;
}