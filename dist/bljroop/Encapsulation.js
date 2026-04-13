class AkunBank {
    saldo;
    pemilik;
    nomorRekening;
    constructor(pemilik, nomorRekening, saldoAwal) {
        this.pemilik = pemilik;
        this.nomorRekening = nomorRekening;
        this.saldo = saldoAwal;
    }
    // Getter untuk mengakses private property
    cekSaldo() {
        return this.saldo;
    }
    // Setter untuk memodifikasi dengan validasi
    deposit(jumlah) {
        if (jumlah <= 0) {
            throw new Error('Jumlah deposit harus lebih dari 0');
        }
        this.saldo += jumlah;
    }
    tarik(jumlah) {
        if (jumlah > this.saldo) {
            throw new Error('Saldo tidak cukup');
        }
        this.saldo -= jumlah;
    }
}
const akun = new AkunBank('John Doe', '1234567890', 1000);
console.log(akun.pemilik); // OK: public
console.log(akun.cekSaldo()); // OK: menggunakan method
// console.log(akun.saldo); // ERROR: private
// console.log(akun.nomorRekening); // ERROR: protected
akun.deposit(500);
console.log(akun.cekSaldo());
akun.tarik(1500);
console.log(akun.cekSaldo());
export {};
//# sourceMappingURL=Encapsulation.js.map