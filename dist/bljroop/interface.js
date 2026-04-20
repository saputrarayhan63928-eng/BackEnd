// Class bisa implement multiple interfaces
export class User {
    id;
    name;
    email;
    password;
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    getFullInfo() {
        return `${this.name} (${this.email})`;
    }
    login(password) {
        return this.password === password;
    }
    logout() {
        console.log(`${this.name} telah logout`);
    }
}
//# sourceMappingURL=interface.js.map