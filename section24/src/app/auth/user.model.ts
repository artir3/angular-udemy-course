export class User {
    constructor(
        public email: string,
        public id: string,
        private idToken: string,
        private expirationDate: Date
    ) { }

    get token() {

        const a = !this.expirationDate
        const b = new Date() > this.expirationDate
        if (a || b) {
            this.idToken = undefined;
        }
        return this.idToken;

    }
}