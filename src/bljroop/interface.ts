interface IUser {
     id:number;
     name:string;
     email: string;
     getFullInfo(): string
}

interface IAuthenticateble {
    login(password: string) : boolean
    logout(): void
}

// Class bisa implement multiple interfaces
export class User implements IUser, IAuthenticateble {
    constructor(
        public id:number,
        public name: string,
        public email: string,
        private password: string
    ) {}

    getFullInfo(): string {
        return `${this.name} (${this.email})`
    }

    login(password: string): boolean {
        return this.password === password
    }

    logout(): void {
        console.log(`${this.name} telah logout`);
        
    }
}

