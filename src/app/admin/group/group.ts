import { GroupType } from './groupTypeEnum';
export class Group {
    constructor(
        public name: string = '',
        public type: GroupType = 0,
        public policyNumber: string = '',
        public industry: string = '',
        public dateModified: Date = new Date(),
        public id?: number 
    ) { }
}