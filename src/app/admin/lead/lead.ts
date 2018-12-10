export class Lead {
    constructor(
        public name: string = '',
        public surname: string = '',
        public email: string = '',
        public phone: string = '',
        public status: number = 0,
        public id?: number,
    ) { }

}