interface IUser {
    id: number;
    name: string;
    email: string;
    getFullInfo(): string;
}
interface IAuthenticateble {
    login(password: string): boolean;
    logout(): void;
}
export declare class User implements IUser, IAuthenticateble {
    id: number;
    name: string;
    email: string;
    private password;
    constructor(id: number, name: string, email: string, password: string);
    getFullInfo(): string;
    login(password: string): boolean;
    logout(): void;
}
export {};
//# sourceMappingURL=interface.d.ts.map