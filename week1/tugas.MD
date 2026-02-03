===kalo http method get aja udh bisa buat manipulasi data (CREAT,UPDATE,READ),knp harus ada method yg lain seperti (POST,PUT,DELETE)===

karena walaupu secara http method GET dapat di gunakan untuk melakukan CRUD akan tetapi hal tersebut bukan tujuan di ciptakannya GET

Server memang boleh melakukan apa saja ketika menerima request GET, tetapi melakukan CRUD Saat Get itu melanggar semantik http. GET secara definisi safe, idempotent, dan cacheable, sehingga diasumsikan tidak mengubah state server

Karena asumsi ini, browser, proxy, CDN, dan crawler dapat:
- melakukan caching
- prefetch otomatis
- mengulang request tanpa konfirmasi pengguna

Jika GET digunakan untuk Create, Update, atau Delete, maka perubahan data dapat terjadi tanpa disengaja, yang berisiko menimbulkan bug, data corruption, dan celah keamanan.

Oleh karena itu, method POST, PUT, dan DELETE diciptakan bukan karena GET tidak mampu, tetapi untuk:
- menyatakan niat aksi secara eksplisit
- menjaga keamanan dan konsistensi data
- memastikan perilaku API dapat dipahami dan diprediksi oleh seluruh infrastruktur internet

Dengan kata lain, penggunaan method HTTP yang tepat bukan soal “bisa atau tidak”, tetapi soal kontrak, kejelasan, dan tanggung jawab desain API.

src:

MDN Web  Docs = https://developer.mozilla.org/en-US/docs/Glossary/Safe/HTTP?utm_source=chatgpt.com

