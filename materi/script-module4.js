/* ═══════════════════════════════════════════
   NAFISA BOOTCAMP — Module 4 Content (Detailed)
   ═══════════════════════════════════════════ */

CONTENT['m4-plan'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#EC4899">Module 4</span>
  <h1 class="section-title">Lesson Plan — Backend Async/Await, Event Emitter & Intro Express.js</h1>
  <p class="section-subtitle">Pertemuan 4 — Dasar pengembangan backend dengan Node.js</p>
</div>
<div class="content">
  <h2>Tujuan Pembelajaran</h2>
  <p>Setelah menyelesaikan modul ini, peserta mampu:</p>
  <ul>
    <li>Memahami dan menggunakan Async/Await untuk penanganan asynchronous</li>
    <li>Mengimplementasikan Event Emitter untuk pattern pub/sub</li>
    <li>Membuat REST API sederhana menggunakan Express.js</li>
    <li>Menggunakan middleware dan routing di Express</li>
    <li>Membangun API CRUD untuk manajemen data gudang</li>
  </ul>
  <h2>Alokasi Waktu (150 menit)</h2>
  <table>
    <tr><th>Durasi</th><th>Kegiatan</th></tr>
    <tr><td>30 menit</td><td>Async/Await — konsep, syntax, dan best practices</td></tr>
    <tr><td>25 menit</td><td>Event Emitter — pattern pub/sub dan use case</td></tr>
    <tr><td>30 menit</td><td>Intro Express.js — routing, middleware, REST API</td></tr>
    <tr><td>40 menit</td><td>Guided Lab: REST API untuk Manajemen Gudang</td></tr>
    <tr><td>25 menit</td><td>Diskusi & Take-Home</td></tr>
  </table>
</div>`;

CONTENT['m4-a'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#EC4899">Module 4 · Section A</span>
  <h1 class="section-title">Async/Await — Modern JavaScript Asynchronous Programming</h1>
  <p class="section-subtitle">Menulis kode asynchronous semudah synchronous</p>
</div>
<div class="content">
  <h2>Apa itu Async/Await?</h2>
  <p>Async/Await adalah fitur JavaScript modern yang diperkenalkan di ES2017 (ES8). Fungsinya untuk menangani operasi asynchronous dengan cara yang lebih bersih dan mudah dibaca dibandingkan Promise chain.</p>
  
  <p>Bayangkan Anda sedang memasak di dapur. Anda ingin merebus air, memotong sayur, dan menggoreng telur. Tanpa async/await, Anda harus menunggu air mendidih dulu baru bisa memotong sayur. Dengan async/await, Anda bisa "mengintip" task-task ini tanpa harus meninggalkan dapur — kode Anda tetap jalan sambil menunggu task selesai.</p>
  
  <h3>Mengapa Perlu Async/Await?</h3>
  <p>JavaScript adalah <strong>single-threaded</strong> — artinya hanya bisa menjalankan satu task dalam satu waktu. Tanpa asynchronous programming, operasi lambat seperti request ke server akan <strong>memblokir</strong> seluruh aplikasi. Coba bayangkan website yang tidak bisa diklik selama 5 detik karena sedang mengambil data dari database — itulah yang terjadi tanpa async!</p>
  
  <p>Async/Await adalah solusi untuk masalah ini. Kode terlihat seperti synchronous (berurutan dari atas ke bawah), tapi sebenarnya asynchronous — tidak memblokir thread utama.</p>
  
  <h3>Async Function</h3>
  <p>Kata kunci <code>async</code> mengubah function biasa menjadi function asynchronous. Ciri utamanya: <strong>selalu mengembalikan Promise</strong>. Jika Anda mengembalikan nilai biasa, JavaScript otomatis membungkusnya dalam Promise.</p>
  ${codeBlock('javascript','// Contoh 1: async function dengan return nilai biasa\nasync function getData() {\n  return "Hello World";\n}\n\ngetData().then(console.log);\n// Output: "Hello World"\n\n// Contoh 2: async function dengan return Promise\nasync function getNumber() {\n  return Promise.resolve(42);\n}\n\ngetNumber().then(console.log);\n// Output: 42')}
  
  <p>Perhatikan bahwa meskipun <code>getData()</code> hanya mengembalikan string biasa, karena function-nya <code>async</code>, nilai return-nya otomatis dibungkus Promise. Itu sebabnya kita menggunakan <code>.then()</code> untuk mengakses nilainya.</p>

  <h3>Await Keyword</h3>
  <p><code>await</code> adalah pasangan <code>async</code>. Fungsinya untuk <strong>menunggu Promise selesai</strong> sebelum melanjutkan ke baris berikutnya. Namun penting: <code>await</code> <strong>hanya bisa digunakan di dalam</strong> function yang di-declare dengan <code>async</code>.</p>
  
  <p>Tanpa await, kita harus menggunakan <code>.then()</code> yang membuat kode bersarang (nesting) dan sulit dibaca — apalagi kalau ada banyak operasi berurutan. Inilah yang disebut <strong>Callback Hell</strong> atau <strong>Promise Chain yang panjang</strong>.</p>
  
  ${codeBlock('javascript','// ❌ TANPA async/await — Promise Chain yang berantakan\nfetch(\'https://api.example.com/user/1\')\n  .then(response => response.json())\n  .then(user => {\n    return fetch(\'https://api.example.com/user/1/posts\')\n      .then(response => response.json())\n      .then(posts => {\n        console.log(user, posts);\n      });\n  })\n  .catch(error => console.error(error));\n\n// ✅ DENGAN async/await — rapi seperti synchronous code\nasync function getUserData() {\n  try {\n    const response = await fetch(\'https://api.example.com/user/1\');\n    const user = await response.json();\n    const postsResponse = await fetch(\'https://api.example.com/user/1/posts\');\n    const posts = await postsResponse.json();\n    console.log(user, posts);\n  } catch (error) {\n    console.error(error);\n  }\n}\n\ngetUserData();')}

  <div class="callout callout-info">
    <span class="callout-icon">ℹ️</span>
    <div><span class="callout-title">Poin Penting</span>
    <p><code>await</code> membuat JavaScript seolah "berhenti" di baris itu, tapi sebenarnya tidak memblokir thread utama. Selama menunggu Promise selesai, JavaScript bisa menjalankan task lain (seperti merespon klik tombol atau menerima data dari server lain).</p></div>
  </div>

  <h3>Error Handling dengan Try-Catch</h3>
  <p>Salah satu kelebihan terbesar async/await adalah Anda bisa menggunakan <strong>try-catch</strong> seperti kode synchronous biasa. Ini jauh lebih bersih dibandingkan chaining <code>.catch()</code> yang terpisah.</p>
  
  <p>Bayangkan Anda memesan barang online. Beberapa hal bisa salah: nomor rekening salah (error dari fungsi transfer), stok tidak tersedia (error dari fungsi cek stok), alamat pengiriman tidak lengkap (error dari validasi). Dengan try-catch, semua error ini ditangani di satu tempat.</p>
  
  ${codeBlock('javascript','async function processOrder(orderId) {\n  try {\n    // Step 1: Cek apakah order valid\n    const order = await checkOrder(orderId);\n    \n    // Step 2: Proses pembayaran\n    const payment = await processPayment(order.total);\n    \n    // Step 3: Update stok\n    const stock = await updateStock(order.items);\n    \n    // Step 4: Kirim email konfirmasi\n    await sendEmail(order.email);\n    \n    return { success: true, message: \'Order processed\' };\n    \n  } catch (error) {\n    // Semua error dari step 1-4 ditangani di sini\n    console.error(\'Order failed:\', error.message);\n    return { success: false, error: error.message };\n  }\n}')}
  
  <h3>Parallel Execution dengan Promise.all</h3>
  <p>Kadang kita perlu menjalankan beberapa operasi async yang <strong>tidak saling bergantung</strong>. Dalam kasus ini, menjalankannya secara serial (satu per satu) hanya akan membuang waktu. Gunakan <code>Promise.all()</code> untuk menjalankan secara paralel.</p>
  
  <p>Analogi: Bayangkan Anda perlu (1) mengambil baju dari laundry, (2) membeli sayur di pasar, (3) mengirim paket di kantor pos. Ketiga task ini tidak saling terkait — Anda bisa meminta teman membantu menjalankannya bersama-sama, daripada melakukannya satu per satu.</p>
  
  ${codeBlock('javascript','// ❌ SERIAL — lambat (total = jumlah semua waktu)\nasync function getDashboardSerial(userId) {\n  const start = Date.now();\n  \n  const profile = await fetch(\'/api/users/\' + userId);\n  const posts = await fetch(\'/api/users/\' + userId + \'/posts\');\n  const comments = await fetch(\'/api/users/\' + userId + \'/comments\');\n  \n  console.log(\'Serial:\', Date.now() - start, \'ms\');\n  // Mungkin 1500ms (3 request x 500ms)\n}\n\n// ✅ PARALLEL — cepat (total = waktu terlama)\nasync function getDashboardParallel(userId) {\n  const start = Date.now();\n  \n  const [profile, posts, comments] = await Promise.all([\n    fetch(\'/api/users/\' + userId).then(r => r.json()),\n    fetch(\'/api/users/\' + userId + \'/posts\').then(r => r.json()),\n    fetch(\'/api/users/\' + userId + \'/comments\').then(r => r.json())\n  ]);\n  \n  console.log(\'Parallel:\', Date.now() - start, \'ms\');\n  // Mungkin 500ms (waktu request terlama)\n}')}
  
  <div class="callout callout-warning">
    <span class="callout-icon">⚠️</span>
    <div><span class="callout-title">Kapan Pakai Serial vs Parallel?</span>
    <p>Gunakan <strong>serial</strong> jika output dari satu operasi diperlukan oleh operasi berikutnya (contoh: ambil user ID dulu, baru ambil post-nya). Gunakan <strong>parallel</strong> jika operasi-operasi tersebut independen (contoh: ambil data cuaca, berita, dan jadwal sekaligus).</p></div>
  </div>

  <h3>Promise.allSettled — Handle Partial Failure</h3>
  <p><code>Promise.all()</code> memiliki kelemahan: jika SATU Promise gagal, SEMUA gagal. Kadang kita ingin tetap mendapatkan hasil dari Promise yang sukses meski ada yang gagal. Di sinilah <code>Promise.allSettled()</code> berguna.</p>
  
  ${codeBlock('javascript','async function fetchMultipleUrls(urls) {\n  const results = await Promise.allSettled(\n    urls.map(url => fetch(url).then(r => r.json()))\n  );\n  \n  results.forEach((result, i) => {\n    if (result.status === \'fulfilled\') {\n      console.log(\'URL\' + i + \' sukses:\', result.value);\n    } else {\n      console.log(\'URL\' + i + \' gagal:\', result.reason.message);\n    }\n  });\n}')}

  <h3>Contoh Penerapan: Database Operations</h3>
  <p>Berikut simulasi operasi database menggunakan async/await dengan delay tiruan:</p>
  
  ${codeBlock('javascript','// Simulasi database dengan delay\nconst delay = ms => new Promise(resolve => setTimeout(resolve, ms));\n\nconst database = {\n  users: [\n    { id: 1, name: \'Alice\', email: \'alice@company.com\', role: \'admin\' },\n    { id: 2, name: \'Bob\', email: \'bob@company.com\', role: \'staff\' },\n    { id: 3, name: \'Charlie\', email: \'charlie@company.com\', role: \'staff\' }\n  ],\n  \n  async findUser(id) {\n    await delay(500); // Simulasi query database\n    const user = this.users.find(u => u.id === id);\n    if (!user) throw new Error(\'User \' + id + \' tidak ditemukan\');\n    return user;\n  },\n  \n  async getAllUsers() {\n    await delay(300);\n    return this.users;\n  },\n  \n  async countByRole(role) {\n    const users = await this.getAllUsers();\n    return users.filter(u => u.role === role).length;\n  }\n};\n\nasync function main() {\n  try {\n    const user = await database.findUser(2);\n    console.log(\'User ditemukan:\', user.name, \'(\' + user.role + \')\');\n    \n    const count = await database.countByRole(\'staff\');\n    console.log(\'Jumlah staff:\', count);\n    \n  } catch (error) {\n    console.error(\'Database error:\', error.message);\n  }\n}\n\nmain();')}
  
  ${callout('instructor','Catatan Instruktur','Async/Await adalah syntactic sugar di atas Promise. Pahami Promise dulu baru async/await agar benar-benar paham apa yang terjadi di balik layar. Ingat: async function selalu mengembalikan Promise, dan await hanya bisa digunakan di dalam async function.')}
  
  <h3>Ringkasan Async/Await</h3>
  <ul>
    <li><code>async</code> mengubah function menjadi asynchronous — return value otomatis dibungkus Promise</li>
    <li><code>await</code> menunggu Promise selesai — hanya bisa di dalam <code>async</code> function</li>
    <li>Gunakan <code>try-catch</code> untuk menangkap error — jauh lebih bersih daripada <code>.catch()</code></li>
    <li>Gunakan <code>Promise.all()</code> untuk menjalankan operasi independen secara paralel</li>
    <li>Gunakan <code>Promise.allSettled()</code> jika ingin partial success</li>
  </ul>
</div>`;

CONTENT['m4-b'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#EC4899">Module 4 · Section B</span>
  <h1 class="section-title">Event Emitter — Pub/Sub Pattern di Node.js</h1>
  <p class="section-subtitle">Membangun arsitektur event-driven yang scalable</p>
</div>
<div class="content">
  <h2>Apa itu Event Emitter?</h2>
  <p>Event Emitter adalah implementasi dari pola desain <strong>Publisher-Subscriber (Pub/Sub)</strong>. Dalam pola ini, ada dua peran:</p>
  <ul>
    <li><strong>Publisher (Emitter)</strong> — objek yang "mempublikasikan" atau mengirimkan event</li>
    <li><strong>Subscriber (Listener)</strong> — fungsi yang "mendengarkan" event tertentu dan merespon saat event terjadi</li>
  </ul>
  
  <p>Analogi: Bayangkan sebuah stasiun radio. Stasiun radio (Event Emitter) menyiarkan program (event) di frekuensi tertentu. Pendengar (listener) yang menyetel radio ke frekuensi itu akan mendengar siarannya. Pendengar lain yang menyetel frekuensi berbeda tidak akan mendengar apa-apa. Satu siaran bisa didengar oleh banyak pendengar sekaligus.</p>
  
  <p>Event Emitter adalah fondasi dari banyak modul Node.js, seperti HTTP server, stream, dan file system. Tanpa Event Emitter, arsitektur event-driven di Node.js tidak akan mungkin terwujud.</p>

  <h3>Event Emitter vs Callback Biasa</h3>
  <p>Apa bedanya dengan callback biasa? Callback biasa hanya bisa dipanggil SATU KALI (passing function sebagai parameter). Event Emitter bisa memiliki BANYAK listener untuk event yang sama, dan listener bisa ditambah/dihapus kapan saja secara dinamis.</p>
  
  ${codeBlock('javascript','const EventEmitter = require(\'events\');\n\n// Membuat class yang mewarisi EventEmitter\nclass MyEmitter extends EventEmitter {}\n\nconst myEmitter = new MyEmitter();\n\n// Mendaftarkan MULTIPLE listener untuk event yang sama\nmyEmitter.on(\'greeting\', (name) => {\n  console.log(\'Listener 1: Hello, \' + name + \'!\');\n});\n\nmyEmitter.on(\'greeting\', (name) => {\n  console.log(\'Listener 2: How are you, \' + name + \'?\');\n});\n\n// Memicu event — kedua listener akan dipanggil\nmyEmitter.emit(\'greeting\', \'Alice\');\n// Output:\n// Listener 1: Hello, Alice!\n// Listener 2: How are you, Alice?')}

  <h3>Method Utama Event Emitter</h3>
  
  <h4>1. on(eventName, listener) — Mendaftarkan Listener</h4>
  <p>Method ini mendaftarkan fungsi listener yang akan dipanggil SETIAP KALI event dengan nama tertentu di-trigger. Listener akan terus aktif sampai dihapus dengan <code>off()</code>.</p>
  
  ${codeBlock('javascript','const EventEmitter = require(\'events\');\nconst emitter = new EventEmitter();\n\n// Listener akan dipanggil setiap kali event \'data\' di-trigger\nemitter.on(\'data\', (message) => {\n  console.log(\'Data diterima:\', message);\n});\n\nemitter.emit(\'data\', \'Pesan pertama\'); // Listener dipanggil\nemitter.emit(\'data\', \'Pesan kedua\');   // Listener dipanggil lagi\nemitter.emit(\'data\', \'Pesan ketiga\');  // Listener dipanggil lagi')}

  <h4>2. once(eventName, listener) — Listener Sekali Pakai</h4>
  <p>Sama seperti <code>on()</code>, tapi listener hanya dipanggil SATU KALI. Setelah itu otomatis dihapus. Cocok untuk event yang hanya perlu ditangani satu kali, seperti koneksi pertama atau inisialisasi.</p>
  
  ${codeBlock('javascript','const EventEmitter = require(\'events\');\nconst emitter = new EventEmitter();\n\nemitter.once(\'init\', () => {\n  console.log(\'Inisialisasi hanya sekali!\');\n});\n\nemitter.emit(\'init\'); // Output: Inisialisasi hanya sekali!\nemitter.emit(\'init\'); // Tidak ada output (listener sudah dihapus)\nemitter.emit(\'init\'); // Tidak ada output')}

  <h4>3. off(eventName, listener) — Menghapus Listener</h4>
  <p>Untuk menghapus listener yang sudah tidak diperlukan. Penting untuk <strong>mencegah memory leak</strong>. Bayangkan Anda mendaftarkan ribuan listener tanpa pernah menghapusnya — memori akan terus membengkak!</p>
  
  ${codeBlock('javascript','const EventEmitter = require(\'events\');\nconst emitter = new EventEmitter();\n\nfunction myHandler(data) {\n  console.log(\'Handler:\', data);\n}\n\nemitter.on(\'update\', myHandler);    // Daftarkan\nemitter.emit(\'update\', \'test\');     // Bekerja\nemitter.off(\'update\', myHandler);   // Hapus\nemitter.emit(\'update\', \'test2\');    // Tidak ada reaksi')}

  <h4>4. emit(eventName, ...args) — Memicu Event</h4>
  <p>Method untuk men-trigger event. Semua listener yang terdaftar untuk event tersebut akan dipanggil secara synchronous (berurutan). Argumen setelah eventName akan diteruskan ke listener.</p>

  <h3>Contoh Praktis 1: File Upload dengan Progress</h3>
  <p>Event Emitter sangat cocok untuk memonitor progress operasi yang memakan waktu. Contoh: upload file. Kita ingin memberi tahu pengguna tentang: (1) upload dimulai, (2) progress upload, (3) upload selesai atau gagal.</p>
  
  ${codeBlock('javascript','const EventEmitter = require(\'events\');\n\nclass FileUploader extends EventEmitter {\n  upload(file) {\n    console.log(\'[Uploader] Memulai upload...\');\n    this.emit(\'start\', file.name);\n    \n    let progress = 0;\n    const interval = setInterval(() => {\n      progress += 20;\n      this.emit(\'progress\', progress);\n      \n      if (progress >= 100) {\n        clearInterval(interval);\n        this.emit(\'complete\', file.name);\n      }\n    }, 500);\n  }\n}\n\nconst uploader = new FileUploader();\n\n// Daftarkan listener\nuploader.on(\'start\', (fileName) => {\n  console.log(\'[UI] Upload \' + fileName + \' dimulai...\');\n});\n\nuploader.on(\'progress\', (percent) => {\n  console.log(\'[UI] Progress: \' + percent + \'%\');\n});\n\nuploader.on(\'complete\', (fileName) => {\n  console.log(\'[UI] Upload \' + fileName + \' selesai!\');\n});\n\nuploader.upload({ name: \'document.pdf\' });')}

  <h3>Contoh Praktis 2: Chat Server Sederhana</h3>
  <p>Event Emitter ideal untuk sistem chat — ada banyak event seperti user join, user leave, pesan baru, notifikasi, dll.</p>
  
  ${codeBlock('javascript','const EventEmitter = require(\'events\');\n\nclass ChatRoom extends EventEmitter {\n  constructor() {\n    super();\n    this.users = [];\n    this.messages = [];\n  }\n\n  join(username) {\n    this.users.push(username);\n    console.log(\'[Server] \' + username + \' bergabung\');\n    this.emit(\'userJoined\', username, this.users.length);\n  }\n\n  leave(username) {\n    this.users = this.users.filter(u => u !== username);\n    this.emit(\'userLeft\', username, this.users.length);\n  }\n\n  send(username, message) {\n    const msg = {\n      from: username,\n      text: message,\n      time: new Date().toLocaleTimeString()\n    };\n    this.messages.push(msg);\n    this.emit(\'message\', msg);\n  }\n}\n\nconst chat = new ChatRoom();\n\nchat.on(\'userJoined\', (user, count) => {\n  console.log(\'[Notification] Selamat datang \' + user + \'! (Online: \' + count + \')\');\n});\n\nchat.on(\'message\', (msg) => {\n  console.log(\'[\' + msg.time + \'] \' + msg.from + \': \' + msg.text);\n});\n\nchat.on(\'userLeft\', (user, count) => {\n  console.log(\'[Notification] \' + user + \' keluar. (Online: \' + count + \')\');\n});\n\nchat.join(\'Alice\');\nchat.join(\'Bob\');\nchat.send(\'Alice\', \'Halo semua!\');\nchat.send(\'Bob\', \'Hai Alice!\');\nchat.leave(\'Bob\');')}

  <h3>Error Handling di Event Emitter</h3>
  <p>PENTING: Jika Event Emitter mengeluarkan event \'error\' dan tidak ada listener yang mendaftarkannya, maka <strong>aplikasi akan crash</strong>! Selalu daftarkan listener untuk event \'error\'.</p>
  
  ${codeBlock('javascript','const EventEmitter = require(\'events\');\nconst emitter = new EventEmitter();\n\n// ❌ Jika tidak ada listener \'error\', aplikasi crash:\nemitter.emit(\'error\', new Error(\'Something broke\'));\n// Thrown...\n\n// ✅ Selalu daftarkan error listener:\nemitter.on(\'error\', (err) => {\n  console.error(\'Terjadi error:\', err.message);\n});\nemitter.emit(\'error\', new Error(\'Database connection failed\'));\n// Output: Terjadi error: Database connection failed')}

  <h3>Memory Management: Cleanup Listener</h3>
  <p>Setiap <code>on()</code> menambahkan listener ke dalam array internal. Jika tidak dihapus, listener akan terus berada di memori meskipun objek aslinya sudah tidak digunakan. Ini menyebabkan <strong>memory leak</strong>. Selalu cleanup saat objek dihancurkan.</p>
  
  ${codeBlock('javascript','const EventEmitter = require(\'events\');\n\nclass Component extends EventEmitter {\n  constructor() {\n    super();\n    this.data = [];\n  }\n\n  addData(item) {\n    this.data.push(item);\n    this.emit(\'dataAdded\', item);\n  }\n\n  destroy() {\n    this.removeAllListeners(); // ← Penting!\n    this.data = null;\n    console.log(\'Component dibersihkan\');\n  }\n}\n\nconst comp = new Component();\ncomp.on(\'dataAdded\', (item) => console.log(\'Added:\', item));\ncomp.addData(\'test\');\ncomp.destroy(); // Listeners dihapus dari memori')}

  ${callout('info','Best Practices','1. Selalu daftarkan listener untuk event \\\'error\\\' \\n2. Gunakan once() untuk event satu kali\\n3. Hapus listener dengan off() atau removeAllListeners() saat cleanup\\n4. Jangan tambah listener dalam loop tanpa batas — bisa bocor memori!')}
  
  <h3>Kapan Menggunakan Event Emitter?</h3>
  <ul>
    <li><strong>Progress tracking</strong> — upload file, download, instalasi</li>
    <li><strong>Real-time updates</strong> — chat, notifikasi, streaming data</li>
    <li><strong>State changes</strong> — koneksi database, status server</li>
    <li><strong>Logging & monitoring</strong> — log events, metrics</li>
    <li><strong>Decoupled architecture</strong> — memisahkan komponen yang tidak perlu tahu satu sama lain</li>
  </ul>
</div>`;

CONTENT['m4-c'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#EC4899">Module 4 · Section C</span>
  <h1 class="section-title">Intro Express.js — Web Framework untuk Node.js</h1>
  <p class="section-subtitle">Membangun REST API secara cepat dan terstruktur</p>
</div>
<div class="content">
  <h2>Apa itu Express.js?</h2>
  <p>Express.js adalah <strong>web application framework</strong> minimal dan fleksibel untuk Node.js. Diciptakan oleh TJ Holowaychuk pada tahun 2010, Express adalah framework Node.js paling populer sepanjang masa — menjadi fondasi dari ribuan aplikasi web dan API di seluruh dunia.</p>
  
  <p>Express menyediakan fitur-fitur esensial untuk membangun web server:</p>
  <ul>
    <li><strong>Routing</strong> — mendefinisikan endpoint berdasarkan HTTP method dan URL path</li>
    <li><strong>Middleware</strong> — fungsi yang berjalan di antara request dan response</li>
    <li><strong>Request handling</strong> — akses ke body, params, query, headers request</li>
    <li><strong>Response handling</strong> — mengirim JSON, HTML, file, status code</li>
    <li><strong>Error handling</strong> — menangani error secara terpusat</li>
  </ul>

  <p>Tanpa Express, membuat server di Node.js memerlukan modul <code>http</code> bawaan yang sangat low-level dan bertele-tele. Express memberikan <strong>abstraksi</strong> yang membuat pengembangan web menjadi cepat dan menyenangkan.</p>

  ${codeBlock('javascript','// Tanpa Express — modul http bawaan Node.js\nconst http = require(\'http\');\nhttp.createServer((req, res) => {\n  if (req.url === \'/\' && req.method === \'GET\') {\n    res.writeHead(200, { \'Content-Type\': \'text/plain\' });\n    res.end(\'Hello World\');\n  } else if (req.url === \'/api/users\' && req.method === \'GET\') {\n    res.writeHead(200, { \'Content-Type\': \'application/json\' });\n    res.end(JSON.stringify([{ id: 1, name: \'Alice\' }]));\n  } else {\n    res.writeHead(404);\n    res.end(\'Not Found\');\n  }\n}).listen(3000);\n\n// Dengan Express — lebih bersih dan terstruktur\nconst express = require(\'express\');\nconst app = express();\n\napp.get(\'/\', (req, res) => res.send(\'Hello World\'));\napp.get(\'/api/users\', (req, res) => res.json([{ id: 1, name: \'Alice\' }]));\napp.use((req, res) => res.status(404).send(\'Not Found\'));\n\napp.listen(3000);')}

  <h3>Instalasi dan Setup</h3>
  <p>Untuk memulai project Express, kita perlu menginisialisasi Node.js project dan menginstall package express:</p>
  
  ${codeBlock('bash','# 1. Buat folder project\nmkdir my-first-api\ncd my-first-api\n\n# 2. Inisialisasi package.json\nnpm init -y\n\n# 3. Install Express\nnpm install express\n\n# 4. (Opsional) Install nodemon untuk auto-restart saat development\nnpm install --save-dev nodemon')}
  
  <p>Struktur folder setelah instalasi:</p>
  <ul>
    <li><code>my-first-api/</code></li>
    <li style="list-style:none;margin-left:20px;">
      ├── <code>node_modules/</code> — folder tempat semua package tersimpan<br>
      ├── <code>package.json</code> — konfigurasi project<br>
      ├── <code>package-lock.json</code> — lock file untuk versi dependency<br>
      └── <code>index.js</code> — file utama (kita buat sendiri)
    </li>
  </ul>
  
  <p>Tambahkan script ke <code>package.json</code>:</p>
  ${codeBlock('json','"scripts": {\n  "start": "node index.js",\n  "dev": "nodemon index.js"\n}')}

  <h3>Anatomi Server Express</h3>
  <p>Setiap server Express memiliki struktur dasar yang sama. Mari kita bedah bagian-bagiannya:</p>
  
  ${codeBlock('javascript','// 1. IMPORT — ambil library express\nconst express = require(\'express\');\n\n// 2. INISIALISASI — buat instance aplikasi express\nconst app = express();\n\n// 3. PORT — tentukan port server\nconst PORT = process.env.PORT || 3000;\n\n// 4. MIDDLEWARE — fungsi yang dijalankan untuk setiap request\napp.use(express.json());\n\n// 5. ROUTES — definisikan endpoint\napp.get(\'/\', (req, res) => {\n  res.send(\'Hello World!\');\n});\n\n// 6. START SERVER — jalankan server\napp.listen(PORT, () => {\n  console.log(\'Server running on http://localhost:\' + PORT);\n});')}
  
  <p>Penjelasan setiap bagian:</p>
  <ul>
    <li><strong>require(\'express\')</strong> — mengimpor library Express</li>
    <li><strong>express()</strong> — membuat instance aplikasi. Variabel <code>app</code> adalah objek utama yang akan kita gunakan untuk mendefinisikan route, middleware, dan konfigurasi</li>
    <li><strong>PORT</strong> — port tempat server akan mendengarkan request. <code>process.env.PORT</code> membaca dari environment variable (berguna saat deploy ke cloud). Jika tidak ada, fallback ke 3000</li>
    <li><strong>app.use(express.json())</strong> — middleware untuk meng-parse body request JSON. Tanpa ini, <code>req.body</code> akan undefined</li>
    <li><strong>app.get(\'/\', handler)</strong> — mendefinisikan route GET untuk path \'/\'</li>
    <li><strong>app.listen(PORT, callback)</strong> — memulai server dan mendengarkan request di port tertentu</li>
  </ul>

  <h3>HTTP Methods — Verbs dalam REST API</h3>
  <p>Dalam REST API, HTTP methods menentukan jenis operasi yang dilakukan:</p>
  
  <table>
    <tr><th>Method</th><th>Operasi</th><th>Contoh Route</th><th>Fungsi</th></tr>
    <tr><td><code>GET</code></td><td>READ</td><td><code>/api/users</code></td><td>Mengambil data</td></tr>
    <tr><td><code>POST</code></td><td>CREATE</td><td><code>/api/users</code></td><td>Membuat data baru</td></tr>
    <tr><td><code>PUT</code></td><td>UPDATE</td><td><code>/api/users/:id</code></td><td>Mengganti seluruh data</td></tr>
    <tr><td><code>PATCH</code></td><td>UPDATE</td><td><code>/api/users/:id</code></td><td>Mengubah sebagian data</td></tr>
    <tr><td><code>DELETE</code></td><td>DELETE</td><td><code>/api/users/:id</code></td><td>Menghapus data</td></tr>
  </table>

  <p>Analogi: Bayangkan aplikasi perpustakaan.</p>
  <ul>
    <li><strong>GET /books</strong> — lihat daftar semua buku (READ)</li>
    <li><strong>GET /books/1</strong> — lihat detail buku ID 1 (READ satu)</li>
    <li><strong>POST /books</strong> — tambah buku baru ke database (CREATE)</li>
    <li><strong>PUT /books/1</strong> — ganti semua data buku ID 1 (UPDATE full)</li>
    <li><strong>PATCH /books/1</strong> — ganti hanya judul buku ID 1 (UPDATE partial)</li>
    <li><strong>DELETE /books/1</strong> — hapus buku ID 1 dari database (DELETE)</li>
  </ul>

  <h3>Route Parameters — Menangkap Data dari URL</h3>
  <p>Express memungkinkan kita menangkap bagian dari URL sebagai parameter. Ini sangat berguna untuk mengidentifikasi resource spesifik.</p>
  
  ${codeBlock('javascript','// Route parameter dengan :\napp.get(\'/users/:id\', (req, res) => {\n  // req.params.id akan berisi nilai dari URL\n  // Contoh: GET /users/123 → req.params.id = "123"\n  const userId = req.params.id;\n  res.json({ message: \'Mencari user:\', id: userId });\n});\n\n// Multiple parameters\napp.get(\'/users/:userId/posts/:postId\', (req, res) => {\n  // GET /users/5/posts/10\n  res.json({\n    userId: req.params.userId,  // "5"\n    postId: req.params.postId   // "10"\n  });\n});')}

  <h3>Query Parameters — Filter dan Pencarian</h3>
  <p>Query parameters digunakan untuk: filtering, pagination, sorting, pencarian. Letaknya setelah tanda <code>?</code> di URL.</p>
  
  ${codeBlock('javascript','// Query parameters ada di req.query\n// URL: /search?q=express&page=2&limit=10\napp.get(\'/search\', (req, res) => {\n  const query = req.query.q;         // "express"\n  const page = req.query.page || 1;  // "2"\n  const limit = req.query.limit || 10;\n  \n  res.json({\n    query: query,\n    page: parseInt(page),\n    limit: parseInt(limit),\n    results: []\n  });\n});\n\n// Contoh penggunaan:\n// GET /api/products?category=elektronik&sort=harga&page=1')}

  <h3>Request Body — Menerima Data dari Client</h3>
  <p>Untuk method POST, PUT, PATCH, data biasanya dikirim melalui <strong>request body</strong>. Express butuh middleware <code>express.json()</code> untuk meng-parse JSON body.</p>
  
  ${codeBlock('javascript','// PENTING: tanpa middleware ini, req.body = undefined\napp.use(express.json());\n\napp.post(\'/users\', (req, res) => {\n  // Data dari request body (JSON)\n  const name = req.body.name;\n  const email = req.body.email;\n  \n  console.log(\'Data diterima:\', name, email);\n  \n  // Selalu validasi input!\n  if (!name || !email) {\n    return res.status(400).json({ error: \'name dan email wajib diisi\' });\n  }\n  \n  res.status(201).json({ message: \'User dibuat\', name, email });\n});')}

  <h3>Middleware — "Pipa" di Antara Request dan Response</h3>
  <p>Middleware adalah <strong>fungsi yang berjalan di antara request masuk dan response keluar</strong>. Bayangkan middleware seperti pipeline atau ban berjalan di pabrik — setiap stasiun melakukan satu tugas spesifik sebelum meneruskan ke stasiun berikutnya.</p>
  
  <p>Setiap middleware memiliki akses ke:</p>
  <ul>
    <li><code>req</code> — object request (bisa ditambahi properti baru)</li>
    <li><code>res</code> — object response (untuk mengirim response)</li>
    <li><code>next</code> — function untuk melanjutkan ke middleware berikutnya</li>
  </ul>
  
  <p><strong>Urutan middleware SANGAT PENTING</strong>. Middleware dijalankan sesuai urutan pendaftarannya (dari atas ke bawah).</p>
  
  ${codeBlock('javascript','// MIDDLEWARE 1: Logger — mencatat setiap request\napp.use((req, res, next) => {\n  console.log(\'[\' + new Date().toISOString() + \'] \' + req.method + \' \' + req.url);\n  next(); // Lanjut ke middleware berikutnya\n});\n\n// MIDDLEWARE 2: JSON Parser — parse body request\napp.use(express.json());\n\n// MIDDLEWARE 3: Custom — tambah timestamp ke request\napp.use((req, res, next) => {\n  req.requestTime = Date.now();\n  next();\n});\n\n// ROUTE HANDLER\napp.get(\'/\', (req, res) => {\n  res.json({\n    message: \'Hello\',\n    timestamp: req.requestTime  // dari middleware 3\n  });\n});\n\n// MIDDLEWARE ERROR HANDLING — harus 4 parameter\napp.use((err, req, res, next) => {\n  console.error(\'ERROR:\', err.message);\n  res.status(500).json({ error: \'Internal Server Error\' });\n});')}
  
  <div class="callout callout-info">
    <span class="callout-icon">ℹ️</span>
    <div><span class="callout-title">Urutan Middleware Itu Penting!</span>
    <p>Middleware error handling (4 parameter) HARUS ditempatkan di PALING AKHIR, setelah semua route. Jika diletakkan di awal, error handler akan dipanggil sebelum route sempat menangani request.</p></div>
  </div>

  <h3>Response Methods — Cara Mengirim Response</h3>
  <p>Express menyediakan berbagai method untuk mengirim response:</p>
  
  ${codeBlock('javascript','// res.send() — kirim string\nres.send(\'Hello World\');\n\n// res.json() — kirim JSON (otomatis set Content-Type: application/json)\nres.json({ name: \'Alice\', age: 25 });\n\n// res.status() — set status code\nres.status(404).json({ error: \'Not found\' });\n\n// Chaining: status + json\nres.status(201).json({ message: \'Created\' });\n\n// res.redirect() — redirect ke URL lain\nres.redirect(\'/login\');\n\n// res.sendFile() — kirim file\nres.sendFile(__dirname + \'/public/index.html\');')}

  <h3>Complete Example: REST API Sederhana</h3>
  <p>Mari gabungkan semua konsep di atas dalam satu aplikasi CRUD sederhana untuk Todo list:</p>
  
  ${codeBlock('javascript','const express = require(\'express\');\nconst app = express();\napp.use(express.json());\n\n// In-memory database (akan hilang jika server restart)\nlet todos = [\n  { id: 1, title: \'Belajar Express\', completed: false },\n  { id: 2, title: \'Buat REST API\', completed: true }\n];\n\n// GET /todos — ambil semua todos\napp.get(\'/todos\', (req, res) => {\n  res.json(todos);\n});\n\n// GET /todos/:id — ambil satu todo\napp.get(\'/todos/:id\', (req, res) => {\n  const todo = todos.find(t => t.id === parseInt(req.params.id));\n  if (!todo) return res.status(404).json({ error: \'Todo tidak ditemukan\' });\n  res.json(todo);\n});\n\n// POST /todos — buat todo baru\napp.post(\'/todos\', (req, res) => {\n  if (!req.body.title) {\n    return res.status(400).json({ error: \'Title wajib diisi\' });\n  }\n  const newTodo = {\n    id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,\n    title: req.body.title,\n    completed: false\n  };\n  todos.push(newTodo);\n  res.status(201).json(newTodo);\n});\n\n// PUT /todos/:id — update todo\napp.put(\'/todos/:id\', (req, res) => {\n  const todo = todos.find(t => t.id === parseInt(req.params.id));\n  if (!todo) return res.status(404).json({ error: \'Todo tidak ditemukan\' });\n  todo.title = req.body.title || todo.title;\n  todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;\n  res.json(todo);\n});\n\n// DELETE /todos/:id — hapus todo\napp.delete(\'/todos/:id\', (req, res) => {\n  const index = todos.findIndex(t => t.id === parseInt(req.params.id));\n  if (index === -1) return res.status(404).json({ error: \'Todo tidak ditemukan\' });\n  todos.splice(index, 1);\n  res.status(204).send(); // No content\n});\n\n// Error handler\napp.use((err, req, res, next) => {\n  res.status(500).json({ error: err.message });\n});\n\napp.listen(3000, () => console.log(\'Server berjalan di port 3000\'));')}

  <h3>Best Practices Express.js</h3>
  <ul>
    <li><strong>Pisahkan route</strong> — untuk project besar, gunakan <code>express.Router()</code> dan pisahkan ke file terpisah</li>
    <li><strong>Validasi input</strong> — selalu validasi data dari client sebelum diproses</li>
    <li><strong>Gunakan environment variables</strong> — port, database URL, API keys jangan di-hardcode</li>
    <li><strong>Error handling terpusat</strong> — satu middleware error handler di akhir aplikasi</li>
    <li><strong>Jangan expose error detail ke client</strong> — kirim pesan error yang aman, log detail error di server</li>
  </ul>
</div>`;

CONTENT['m4-d'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#EC4899">Module 4 · Section D</span>
  <h1 class="section-title">Guided Lab: REST API untuk Manajemen Gudang</h1>
  <p class="section-subtitle">Praktik langsung membangun CRUD API dengan Express</p>
</div>
<div class="content">
  <p>Pada lab ini, kita akan membangun REST API untuk <strong>manajemen produk gudang</strong>. Sistem ini memungkinkan kita untuk menambah, melihat, mengupdate, dan menghapus data produk — skill fundamental dalam pengembangan backend.</p>
  
  <div class="step-tracker" id="st-m4-d"></div>
  
  ${stepCard(1,'Setup Project',`
    <p>Buat folder project dan install Express:</p>
    ${codeBlock('bash','mkdir gudang-api\ncd gudang-api\nnpm init -y\nnpm install express\nnpm install --save-dev nodemon')}
    <p>Buat file <code>index.js</code> sebagai entry point server.</p>
    <p>Update <code>package.json</code> dengan script:</p>
    ${codeBlock('json','"scripts": {\n  "start": "node index.js",\n  "dev": "nodemon index.js"\n}')}
  `,true)}
  
  ${stepCard(2,'Buat Server Dasar',`
    <p>Buka <code>index.js</code> dan buat struktur dasar Express:</p>
    ${codeBlock('javascript','const express = require(\'express\');\nconst app = express();\nconst PORT = process.env.PORT || 3000;\n\napp.use(express.json());\n\napp.get(\'/\', (req, res) => {\n  res.json({\n    message: \'Gudang API v1.0\',\n    endpoints: [\n      \'GET /api/products\',\n      \'GET /api/products/:id\',\n      \'POST /api/products\',\n      \'PUT /api/products/:id\',\n      \'DELETE /api/products/:id\'\n    ]\n  });\n});\n\napp.listen(PORT, () => {\n  console.log(\'Server berjalan di http://localhost:\' + PORT);\n});')}
  `,true)}
  
  ${stepCard(3,'Buat Mock Database',`
    <p>Di dalam <code>index.js</code>, tambahkan data awal (in-memory database):</p>
    ${codeBlock('javascript','// Data produk — array of objects\nlet products = [\n  {\n    id: 1,\n    name: \'Mur M8\',\n    category: \'Hardware\',\n    stock: 120,\n    price: 500,\n    supplier: \'PT Baja Jaya\'\n  },\n  {\n    id: 2,\n    name: \'Baut M6\',\n    category: \'Hardware\',\n    stock: 45,\n    price: 350,\n    supplier: \'PT Baja Jaya\'\n  },\n  {\n    id: 3,\n    name: \'Plat Besi 2mm\',\n    category: \'Material\',\n    stock: 30,\n    price: 25000,\n    supplier: \'PT Logam Utama\'\n  }\n];')}
  `,true)}
  
  ${stepCard(4,'Implementasi GET — Melihat Produk',`
    <p>GET /api/products — ambil semua produk:</p>
    ${codeBlock('javascript','app.get(\'/api/products\', (req, res) => {\n  res.json({\n    count: products.length,\n    data: products\n  });\n});')}
    <p>GET /api/products/:id — ambil satu produk berdasarkan ID:</p>
    ${codeBlock('javascript','app.get(\'/api/products/:id\', (req, res) => {\n  const id = parseInt(req.params.id);\n  const product = products.find(p => p.id === id);\n  \n  if (!product) {\n    return res.status(404).json({ error: \'Produk dengan ID \' + id + \' tidak ditemukan\' });\n  }\n  \n  res.json(product);\n});')}
  `,true)}
  
  ${stepCard(5,'Implementasi POST — Menambah Produk',`
    <p>POST /api/products — tambah produk baru:</p>
    ${codeBlock('javascript','app.post(\'/api/products\', (req, res) => {\n  const { name, category, stock, price, supplier } = req.body;\n  \n  // Validasi: name, stock, dan price wajib diisi\n  if (!name || stock === undefined || !price) {\n    return res.status(400).json({ \n      error: \'Field name, stock, dan price wajib diisi\' \n    });\n  }\n  \n  // Validasi: stock dan price harus angka positif\n  if (typeof stock !== \'number\' || stock < 0) {\n    return res.status(400).json({ error: \'Stock harus angka positif\' });\n  }\n  \n  if (typeof price !== \'number\' || price < 0) {\n    return res.status(400).json({ error: \'Price harus angka positif\' });\n  }\n  \n  // Generate ID baru\n  const newId = products.length > 0 \n    ? Math.max(...products.map(p => p.id)) + 1 \n    : 1;\n  \n  const newProduct = {\n    id: newId,\n    name,\n    category: category || \'Umum\',\n    stock,\n    price,\n    supplier: supplier || \'-\',\n    createdAt: new Date().toISOString()\n  };\n  \n  products.push(newProduct);\n  res.status(201).json(newProduct);\n});')}
  `,true)}
  
  ${stepCard(6,'Implementasi PUT dan DELETE',`
    <p>PUT /api/products/:id — update produk:</p>
    ${codeBlock('javascript','app.put(\'/api/products/:id\', (req, res) => {\n  const id = parseInt(req.params.id);\n  const index = products.findIndex(p => p.id === id);\n  \n  if (index === -1) {\n    return res.status(404).json({ error: \'Produk tidak ditemukan\' });\n  }\n  \n  const { name, category, stock, price, supplier } = req.body;\n  \n  // Update hanya field yang dikirim (partial update)\n  if (name) products[index].name = name;\n  if (category) products[index].category = category;\n  if (stock !== undefined) products[index].stock = stock;\n  if (price) products[index].price = price;\n  if (supplier) products[index].supplier = supplier;\n  \n  products[index].updatedAt = new Date().toISOString();\n  \n  res.json(products[index]);\n});')}
    <p>DELETE /api/products/:id — hapus produk:</p>
    ${codeBlock('javascript','app.delete(\'/api/products/:id\', (req, res) => {\n  const id = parseInt(req.params.id);\n  const index = products.findIndex(p => p.id === id);\n  \n  if (index === -1) {\n    return res.status(404).json({ error: \'Produk tidak ditemukan\' });\n  }\n  \n  const deleted = products.splice(index, 1)[0];\n  res.json({ \n    message: \'Produk \' + deleted.name + \' berhasil dihapus\',\n    deletedProduct: deleted\n  });\n});')}
  `,true)}
  
  ${stepCard(7,'Test API dengan cURL',`
    <p>Jalankan server:</p>
    ${codeBlock('bash','npm run dev')}
    <p>Buka terminal baru dan test:</p>
    ${codeBlock('bash','# 1. GET semua produk\ncurl http://localhost:3000/api/products\n\n# 2. GET satu produk\ncurl http://localhost:3000/api/products/1\n\n# 3. POST produk baru\ncurl -X POST http://localhost:3000/api/products \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name":"Kawat Tembaga","category":"Material","stock":100,"price":15000,"supplier":"PT Tembaga Murni"}\'\n\n# 4. PUT update produk\ncurl -X PUT http://localhost:3000/api/products/1 \\\n  -H "Content-Type: application/json" \\\n  -d \'{"stock":150,"price":550}\'\n\n# 5. DELETE produk\ncurl -X DELETE http://localhost:3000/api/products/3')}
  `,true)}
  
  ${stepCard(8,'Buat Error Handler',`
    <p>Tambahkan middleware error handling di akhir file <code>index.js</code>:</p>
    ${codeBlock('javascript','// 404 handler — route tidak dikenal\napp.use((req, res) => {\n  res.status(404).json({ error: \'Endpoint tidak ditemukan\' });\n});\n\n// Global error handler\napp.use((err, req, res, next) => {\n  console.error(\'[ERROR]\', err.stack);\n  res.status(500).json({ \n    error: \'Terjadi kesalahan pada server\',\n    message: err.message \n  });\n});')}
  `,true)}
  
  <div class="callout callout-info">
    <span class="callout-icon">ℹ️</span>
    <div><span class="callout-title">Yang Sudah Kita Pelajari</span>
    <p>Di lab ini, kita telah berhasil membangun REST API lengkap dengan CRUD operations, validasi input, dan error handling. Ini adalah fondasi dari semua aplikasi backend. Data masih disimpan di memory (akan hilang saat server restart) — di modul selanjutnya kita akan menghubungkan dengan database.</p></div>
  </div>
</div>`;

CONTENT['m4-e'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#EC4899">Module 4 · Section E</span>
  <h1 class="section-title">Take-Home: Event-Driven Warehouse System</h1>
  <p class="section-subtitle">Menggabungkan Event Emitter dan Express.js</p>
</div>
<div class="content">
  <h2>Latar Belakang</h2>
  <p>Di dunia nyata, sistem gudang tidak hanya sekedar CRUD sederhana. Ketika barang masuk atau keluar, banyak hal yang perlu terjadi secara otomatis:</p>
  <ul>
    <li>Update stok barang di database</li>
    <li>Catat transaksi ke log</li>
    <li>Kirim notifikasi ke bagian pembelian (jika stok menipis)</li>
    <li>Update dashboard real-time</li>
  </ul>
  
  <p>Dengan <strong>Event Emitter</strong>, kita bisa memisahkan semua concern ini — setiap tugas punya listener sendiri, tanpa mengubah kode utama. Inilah yang disebut <strong>Separation of Concerns</strong>.</p>

  <h2>Tugas</h2>
  <p>Buat sistem warehouse event-driven yang terdiri dari:</p>
  
  <h3>1. warehouse.js — Modul dengan Event Emitter</h3>
  <p>Buat class <code>Warehouse</code> yang mewarisi EventEmitter. Class ini memiliki method:</p>
  <ul>
    <li><code>receiveGoods(itemId, quantity, supplier)</code> — mencatat barang masuk, emit event 'goodsReceived'</li>
    <li><code>dispatchGoods(itemId, quantity, destination)</code> — mencatat barang keluar, emit event 'goodsDispatched'. Jika stok tidak cukup, emit 'dispatchFailed'</li>
  </ul>

  <h3>2. logger.js — Modul Logging</h3>
  <p>Modul yang mendengarkan event-event dari Warehouse dan menulis log ke console dengan format rapi.</p>

  <h3>3. index.js — Express Server</h3>
  <p>REST API dengan endpoint:</p>
  <ul>
    <li><code>POST /api/receive</code> — barang masuk (body: itemId, quantity, supplier)</li>
    <li><code>POST /api/dispatch</code> — barang keluar (body: itemId, quantity, destination)</li>
    <li><code>GET /api/stock</code> — lihat semua stok</li>
  </ul>

  <h3>Struktur File</h3>
  <pre><code>warehouse-system/
├── warehouse.js     # Class Warehouse dengan Event Emitter
├── logger.js        # Modul logging
├── index.js         # Express server + setup listener
└── package.json     # dependencies (express)</code></pre>

  <h3>Contoh Implementasi</h3>
  
  <p><strong>warehouse.js:</strong></p>
  ${codeBlock('javascript','const EventEmitter = require(\'events\');\n\nclass Warehouse extends EventEmitter {\n  constructor() {\n    super();\n    this.stock = {}; // Format: { itemId: quantity }\n  }\n\n  receiveGoods(itemId, quantity, supplier) {\n    const prev = this.stock[itemId] || 0;\n    this.stock[itemId] = prev + quantity;\n    \n    this.emit(\'goodsReceived\', {\n      itemId,\n      quantity,\n      supplier,\n      stockBefore: prev,\n      stockAfter: this.stock[itemId],\n      timestamp: new Date().toISOString()\n    });\n    \n    return { success: true, stock: this.stock[itemId] };\n  }\n\n  dispatchGoods(itemId, quantity, destination) {\n    const current = this.stock[itemId] || 0;\n    \n    if (current < quantity) {\n      this.emit(\'dispatchFailed\', {\n        itemId,\n        quantity,\n        destination,\n        stockAvailable: current,\n        reason: \'Insufficient stock\',\n        timestamp: new Date().toISOString()\n      });\n      return { success: false, error: \'Stok tidak cukup. Tersedia: \' + current };\n    }\n    \n    this.stock[itemId] = current - quantity;\n    \n    this.emit(\'goodsDispatched\', {\n      itemId,\n      quantity,\n      destination,\n      stockBefore: current,\n      stockAfter: this.stock[itemId],\n      timestamp: new Date().toISOString()\n    });\n    \n    return { success: true, stock: this.stock[itemId] };\n  }\n\n  getStock(itemId) {\n    return { itemId, quantity: this.stock[itemId] || 0 };\n  }\n\n  getAllStock() {\n    return { ...this.stock };\n  }\n}\n\nmodule.exports = Warehouse;')}
  
  <p><strong>logger.js:</strong></p>
  ${codeBlock('javascript','// logger.js — Mendengarkan event dari Warehouse\n\nfunction setupLogger(warehouse) {\n  warehouse.on(\'goodsReceived\', (data) => {\n    console.log(\'═══════════════════════════════════════\');\n    console.log(\'  TRANSAKSI: BARANG MASUK\');\n    console.log(\'═══════════════════════════════════════\');\n    console.log(\'  Item ID:     \' + data.itemId);\n    console.log(\'  Jumlah:      \' + data.quantity);\n    console.log(\'  Pemasok:     \' + data.supplier);\n    console.log(\'  Stok awal:   \' + data.stockBefore);\n    console.log(\'  Stok akhir:  \' + data.stockAfter);\n    console.log(\'  Waktu:       \' + data.timestamp);\n    console.log(\'───────────────────────────────────────\\n\');\n  });\n\n  warehouse.on(\'goodsDispatched\', (data) => {\n    console.log(\'═══════════════════════════════════════\');\n    console.log(\'  TRANSAKSI: BARANG KELUAR\');\n    console.log(\'═══════════════════════════════════════\');\n    console.log(\'  Item ID:     \' + data.itemId);\n    console.log(\'  Jumlah:      \' + data.quantity);\n    console.log(\'  Tujuan:      \' + data.destination);\n    console.log(\'  Stok awal:   \' + data.stockBefore);\n    console.log(\'  Stok akhir:  \' + data.stockAfter);\n    console.log(\'  Waktu:       \' + data.timestamp);\n    console.log(\'───────────────────────────────────────\\n\');\n  });\n\n  warehouse.on(\'dispatchFailed\', (data) => {\n    console.log(\'███████████████████████████████████████\');\n    console.log(\'  ERROR: PENGIRIMAN GAGAL\');\n    console.log(\'███████████████████████████████████████\');\n    console.log(\'  Item ID:         \' + data.itemId);\n    console.log(\'  Jumlah diminta:  \' + data.quantity);\n    console.log(\'  Stok tersedia:   \' + data.stockAvailable);\n    console.log(\'  Alasan:          \' + data.reason);\n    console.log(\'  Waktu:           \' + data.timestamp);\n    console.log(\'███████████████████████████████████████\\n\');\n  });\n}\n\nmodule.exports = { setupLogger };')}
  
  <p><strong>index.js:</strong></p>
  ${codeBlock('javascript','const express = require(\'express\');\nconst Warehouse = require(\'./warehouse\');\nconst { setupLogger } = require(\'./logger\');\n\nconst app = express();\napp.use(express.json());\n\nconst warehouse = new Warehouse();\n\n// Setup logger\nsetupLogger(warehouse);\n\n// API Endpoints\napp.post(\'/api/receive\', (req, res) => {\n  const { itemId, quantity, supplier } = req.body;\n  \n  if (!itemId || !quantity || !supplier) {\n    return res.status(400).json({ error: \'itemId, quantity, supplier wajib diisi\' });\n  }\n  \n  const result = warehouse.receiveGoods(itemId, quantity, supplier);\n  res.json(result);\n});\n\napp.post(\'/api/dispatch\', (req, res) => {\n  const { itemId, quantity, destination } = req.body;\n  \n  if (!itemId || !quantity || !destination) {\n    return res.status(400).json({ error: \'itemId, quantity, destination wajib diisi\' });\n  }\n  \n  const result = warehouse.dispatchGoods(itemId, quantity, destination);\n  res.json(result);\n});\n\napp.get(\'/api/stock\', (req, res) => {\n  res.json(warehouse.getAllStock());\n});\n\napp.get(\'/api/stock/:itemId\', (req, res) => {\n  const result = warehouse.getStock(req.params.itemId);\n  res.json(result);\n});\n\napp.listen(3000, () => {\n  console.log(\'Warehouse API berjalan di port 3000\');\n});')}

  <h2>Kriteria Penilaian</h2>
  <ul>
    <li>Class Warehouse menggunakan Event Emitter dengan benar</li>
    <li>Logger terpisah dari logika bisnis (separation of concerns)</li>
    <li>API Express menangani request dengan validasi input</li>
    <li>Error handling untuk stok tidak cukup</li>
    <li>Semua event tercetak dengan format rapi di console</li>
  </ul>
  
  <h2>Cara Menjalankan</h2>
  ${codeBlock('bash','npm install express\nnode index.js\n\n# Test dengan curl:\ncurl -X POST http://localhost:3000/api/receive \\\n  -H "Content-Type: application/json" \\\n  -d \'{"itemId":"BRG-001","quantity":100,"supplier":"PT Supplier"}\'\n\ncurl -X POST http://localhost:3000/api/dispatch \\\n  -H "Content-Type: application/json" \\\n  -d \'{"itemId":"BRG-001","quantity":20,"destination":"Plant 2"}\'\n\ncurl http://localhost:3000/api/stock')}
  
  ${callout('instructor','Catatan Instruktur','Tugas ini menguji pemahaman tentang Event Emitter (pub/sub pattern), Express.js (REST API), dan kemampuan memisahkan concern (separation of concerns). Solusi ideal akan memiliki 3 file terpisah yang masing-masing punya tanggung jawab spesifik.')}
</div>`;
