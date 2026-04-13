class Mobil {
    merk;
    warna;
    tahun;
    constructor(merk, warna, tahun) {
        this.merk = merk;
        this.warna = warna;
        this.tahun = tahun;
    }
    jalan() {
        console.log(`${this.merk} berwarna ${this.warna} sedang berjalan...`);
    }
    deskripsi() {
        return `${this.merk} ${this.warna} tahun ${this.tahun}`;
    }
}
const avanza = new Mobil('Toyota Avanza', 'Hitam', 2023);
const brio = new Mobil('Honda Btio', 'Putih', 2024);
avanza.jalan();
console.log(brio.deskripsi());
export {};
//# sourceMappingURL=class.js.map