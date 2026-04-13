class Kendaraan {
    protected merk: string
    protected tahun: number

    constructor(merk:string, tahun: number) {
        this.merk =merk
        this.tahun = tahun
    }

    info(): string {
        return `${this.merk} tahun ${this.tahun}`
    }

    jalan() : void {
        console.log(` ${this.merk} sedang berjalan`)
    }
}

//  Child class (Dericed class)
class Motor extends Kendaraan {
    private jenisMotor: string

    constructor (merk: string, tahun: number, jenisMotor: string){
        super(merk,tahun)
        this.jenisMotor = jenisMotor
    }

    // Override method dari parent
    info(): string {
        return ` ${super.info()} - jenis: ${this.jenisMotor}`
    }

    // Method khusus untuk motor
    wheelie(): void {
        console.log(`${this.merk} melakukan wheelie!`)
    }
}

const motor = new Motor('Yamaha', 2023, 'Sport');
console.log(motor.info()); 
motor.jalan();
motor.wheelie(); 