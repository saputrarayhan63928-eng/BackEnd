class Shape {
    // Concrete method (boleh ada di abstract class)
    deskripsi() {
        return ` luas ${this.hitungLuas()}, Keliling ${this.hitungKeliling()}`;
    }
}
class Lingkaran extends Shape {
    radius;
    constructor(radius) {
        super();
        this.radius = radius;
    }
    hitungLuas() {
        return Math.PI * this.radius ** 2;
    }
    hitungKeliling() {
        return 2 * Math.PI * this.radius;
    }
}
class persegiPanjang extends Shape {
    panjang;
    lebar;
    constructor(panjang, lebar) {
        super();
        this.panjang = panjang;
        this.lebar = lebar;
    }
    hitungLuas() {
        return this.panjang * this.lebar;
    }
    hitungKeliling() {
        return 2 * (this.panjang + this.lebar);
    }
}
const lingkaran = new Lingkaran(7);
const persegi = new persegiPanjang(5, 10);
console.log(lingkaran.deskripsi());
console.log(persegi.deskripsi());
export {};
//# sourceMappingURL=abstract.js.map