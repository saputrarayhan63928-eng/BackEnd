class Kendaraan {
    merk;
    tahun;
    constructor(merk, tahun) {
        this.merk = merk;
        this.tahun = tahun;
    }
    info() {
        return `${this.merk} tahun ${this.tahun}`;
    }
    jalan() {
        console.log(` ${this.merk} sedang berjalan`);
    }
}
//  Child class (Dericed class)
class Motor extends Kendaraan {
    jenisMotor;
    constructor(merk, tahun, jenisMotor) {
        super(merk, tahun);
        this.jenisMotor = jenisMotor;
    }
    // Override method dari parent
    info() {
        return ` ${super.info()} - jenis: ${this.jenisMotor}`;
    }
    // Method khusus untuk motor
    wheelie() {
        console.log(`${this.merk} melakukan wheelie!`);
    }
}
const motor = new Motor('Yamaha', 2023, 'Sport');
console.log(motor.info());
motor.jalan();
motor.wheelie();
export {};
//# sourceMappingURL=inheritance.js.map