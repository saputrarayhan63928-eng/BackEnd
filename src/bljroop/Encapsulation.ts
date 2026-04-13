class AkunBank{
    private saldo: number;
    public pemilik: string;
    protected nomorRekening: string;

    constructor(pemilik: string, nomorRekening: string, saldoAwal: number){
        this.pemilik= pemilik
        this.nomorRekening= nomorRekening
        this.saldo=saldoAwal
    }

    // Getter untuk mengakses private property
    cekSaldo(): number {
        return this.saldo
    }

    // Setter untuk memodifikasi dengan validasi
    deposit(jumlah: number): void {
        if (jumlah <= 0 ) {
            throw new Error('Jumlah deposit harus lebih dari 0')
        }
        this.saldo += jumlah
    }

  tarik(jumlah: number): void {
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
console.log(akun.cekSaldo())
akun.tarik(1500)
console.log(akun.cekSaldo())