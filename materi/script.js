/* ═══════════════════════════════════════════
   NAFISA BOOTCAMP — Application Logic
   ═══════════════════════════════════════════ */

// ── MODULES DATA ──
const MODULES = [
  {id:'m1',label:'Module 1',color:'var(--m1)',colorBg:'var(--m1-light)',badgeColor:'#2563EB',badge:'Backend Intro',sections:[
    {id:'m1-plan',label:'Lesson Plan'},
    {id:'m1-a',label:'A. ERP Overview'},
    {id:'m1-b',label:'B. Node.js Core'},
    {id:'m1-c',label:'C. Guided Lab'},
    {id:'m1-d',label:'D. Take-Home'},
  ]},
  {id:'m2',label:'Module 2',color:'var(--m2)',colorBg:'var(--m2-light)',badgeColor:'#059669',badge:'NPM & File System',sections:[
    {id:'m2-plan',label:'Lesson Plan'},
    {id:'m2-a',label:'A. NPM'},
    {id:'m2-b',label:'B. Path & FS'},
    {id:'m2-c',label:'C. Guided Lab'},
    {id:'m2-d',label:'D. Take-Home'},
  ]},
  {id:'m3',label:'Module 3',color:'var(--m3)',colorBg:'var(--m3-light)',badgeColor:'#7C3AED',badge:'Async JavaScript',sections:[
    {id:'m3-plan',label:'Lesson Plan'},
    {id:'m3-a',label:'A. HTTP & Callback'},
    {id:'m3-b',label:'B. Callback Hell'},
    {id:'m3-c',label:'C. Promises'},
    {id:'m3-d',label:'D. Guided Lab'},
    {id:'m3-e',label:'Take-Home'},
  ]},
  {id:'m4',label:'Module 4',color:'var(--m4)',colorBg:'var(--m4-light)',badgeColor:'#EC4899',badge:'Backend Async & Express',sections:[
    {id:'m4-plan',label:'Lesson Plan'},
    {id:'m4-a',label:'A. Async/Await'},
    {id:'m4-b',label:'B. Event Emitter'},
    {id:'m4-c',label:'C. Intro Express.js'},
    {id:'m4-d',label:'D. Guided Lab'},
    {id:'m4-e',label:'Take-Home'},
  ]},
  {id:'m5',label:'Module 5',color:'var(--m5)',colorBg:'var(--m5-light)',badgeColor:'#F59E0B',badge:'Express & REST API',sections:[
    {id:'m5-plan',label:'Lesson Plan'},
    {id:'m5-a',label:'A. Express Routing'},
    {id:'m5-b',label:'B. Middleware'},
    {id:'m5-c',label:'C. Konsep REST API'},
    {id:'m5-d',label:'D. Guided Lab'},
    {id:'m5-e',label:'Take-Home'},
  ]},
  {id:'m6',label:'Module 6',color:'var(--m6)',colorBg:'var(--m6-light)',badgeColor:'#14B8A6',badge:'Praktik REST API CRUD',sections:[
    {id:'m6-plan',label:'Lesson Plan'},
    {id:'m6-a',label:'A. Struktur Proyek'},
    {id:'m6-b',label:'B. Read & Create'},
    {id:'m6-c',label:'C. Update & Delete'},
    {id:'m6-d',label:'D. Guided Lab'},
    {id:'m6-e',label:'Take-Home'},
  ]},
  {id:'m7',label:'Module 7',color:'var(--m7)',colorBg:'var(--m7-light)',badgeColor:'#F43F5E',badge:'MongoDB & Mongoose CRUD',sections:[
    {id:'m7-plan',label:'Lesson Plan'},
    {id:'m7-a',label:'A. Intro MongoDB & Mongoose'},
    {id:'m7-b',label:'B. Koneksi ke Database'},
    {id:'m7-c',label:'C. Schema & Model'},
    {id:'m7-d',label:'D. Praktik CRUD'},
    {id:'m7-e',label:'Take-Home'},
  ]}
];
const ALL_IDS = MODULES.flatMap(m=>m.sections.map(s=>s.id));

// ── UTILITY HELPERS ──
function esc(s){return String(s).replace(/[&<>"']/g,c=>escapeMap[c])}
const escapeMap={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}

// ── CONTENT BUILDERS ──
function codeBlock(lang,code,output,label){
  const escaped = esc(code);
  const outLabel = label||'Terminal Output';
  const hasOutput = output!==null&&output!==undefined;
  const dataCode = esc(code).replace(/"/g,'&quot;');
  return `<div class="code-wrap">
    <div class="code-header">
      <span class="code-lang">${esc(lang)}</span>
      <span class="code-actions">
        <button onclick="copyCode(this)" data-code="${dataCode}">Copy</button>
        ${hasOutput?'<button onclick="toggleOutput(this,event)">Output</button>':''}
      </span>
    </div>
    <pre><code class="language-${esc(lang)}">${escaped}</code></pre>
    ${hasOutput?`<div class="code-output-label" onclick="toggleOutput(this,event)"><span class="icon">&#9654;</span> ${esc(outLabel)}</div><div class="code-output">${esc(output)}</div>`:''}
  </div>`;
}

function callout(type,title,text){
  const icons={info:'ℹ️',warning:'⚠️',danger:'⚡',instructor:'👨‍🏫'};
  const icon = icons[type]||'📌';
  const titleHtml = title?`<div class="callout-title">${title}</div>`:'';
  return `<div class="callout callout-${type}"><span class="callout-icon">${icon}</span>${titleHtml}${text}</div>`;
}

function stepCard(num,label,content,active){
  return `<div class="step-card${active?' active-card':''}" data-step="${num}">
    <span class="step-number">${num}</span><span class="step-label">${esc(label)}</span>
    <div style="margin-top:10px">${content}</div>
  </div>`;
}

function quiz(id,question,options,correctIdx,explanation){
  const opts = options.map((o,i)=>`<label class="quiz-option"><input type="radio" name="${id}" value="${i}"> ${esc(o)}</label>`).join('');
  return `<div class="quiz-card" id="${id}">
    <div class="quiz-question">📝 ${question}</div>
    <div class="quiz-options">${opts}</div>
    <button class="quiz-btn" onclick="checkQuiz('${id}',${correctIdx},${JSON.stringify(explanation)})">Cek Jawaban</button>
    <div class="quiz-feedback" id="${id}-fb"></div>
  </div>`;
}

function diagramSvg(svgContent,caption){
  const cap = caption?`<div class="diagram-caption">${caption}</div>`:'';
  return `<div class="diagram-wrap"><svg viewBox="0 0 700 350" xmlns="http://www.w3.org/2000/svg">${svgContent}</svg>${cap}</div>`;
}

function sideBySide(title1,code1,title2,code2){
  return `<div class="sbs-wrap">
    <div class="sbs-col"><div class="sbs-label callback">${esc(title1)}</div><pre><code class="language-javascript">${esc(code1)}</code></pre></div>
    <div class="sbs-col"><div class="sbs-label promise">${esc(title2)}</div><pre><code class="language-javascript">${esc(code2)}</code></pre></div>
  </div>`;
}

// ── SVG DIAGRAMS ──
const DIAGRAMS = {
  modularMonolith: `
    <defs>
      <marker id="arrow1" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#94A3B8"/></marker>
    </defs>
    <rect x="40" y="30" width="620" height="280" rx="12" fill="#F8FAFC" stroke="#2563EB" stroke-width="2.5" stroke-dasharray="6,3"/>
    <text x="350" y="55" font-family="sans-serif" font-size="14" font-weight="700" fill="#2563EB" text-anchor="middle">Modular Monolith — Manufacturing ERP</text>
    <rect x="70" y="75" width="170" height="80" rx="8" fill="#fff" stroke="#2563EB" stroke-width="2"/>
    <text x="155" y="108" font-family="sans-serif" font-size="13" font-weight="600" fill="#1E293B" text-anchor="middle">📦 Inventory</text>
    <text x="155" y="126" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">Manajemen Stok</text>
    <text x="155" y="142" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">Barang Masuk/Keluar</text>
    <rect x="265" y="75" width="170" height="80" rx="8" fill="#fff" stroke="#2563EB" stroke-width="2"/>
    <text x="350" y="108" font-family="sans-serif" font-size="13" font-weight="600" fill="#1E293B" text-anchor="middle">📋 Production</text>
    <text x="350" y="126" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">Work Order</text>
    <text x="350" y="142" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">Bill of Materials</text>
    <rect x="460" y="75" width="170" height="80" rx="8" fill="#fff" stroke="#2563EB" stroke-width="2"/>
    <text x="545" y="108" font-family="sans-serif" font-size="13" font-weight="600" fill="#1E293B" text-anchor="middle">👥 HR &amp; Auth</text>
    <text x="545" y="126" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">Karyawan</text>
    <text x="545" y="142" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">Autentikasi</text>
    <rect x="70" y="185" width="170" height="80" rx="8" fill="#fff" stroke="#2563EB" stroke-width="2"/>
    <text x="155" y="218" font-family="sans-serif" font-size="13" font-weight="600" fill="#1E293B" text-anchor="middle">💰 Finance</text>
    <text x="155" y="236" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">Akuntansi</text>
    <text x="155" y="252" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">Invoice</text>
    <rect x="265" y="185" width="170" height="80" rx="8" fill="#fff" stroke="#2563EB" stroke-width="2"/>
    <text x="350" y="218" font-family="sans-serif" font-size="13" font-weight="600" fill="#1E293B" text-anchor="middle">📊 Reporting</text>
    <text x="350" y="236" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">Laporan &amp; Grafik</text>
    <text x="350" y="252" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">Dashboard</text>
    <rect x="460" y="185" width="170" height="80" rx="8" fill="#DBEAFE" stroke="#1D4ED8" stroke-width="2.5"/>
    <text x="545" y="215" font-family="sans-serif" font-size="13" font-weight="700" fill="#1D4ED8" text-anchor="middle">🛠️ Shared</text>
    <text x="545" y="233" font-family="sans-serif" font-size="11" fill="#1D4ED8" text-anchor="middle">Database Connection</text>
    <text x="545" y="249" font-family="sans-serif" font-size="11" fill="#1D4ED8" text-anchor="middle">Logger, Config</text>
    <line x1="240" y1="115" x2="260" y2="115" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrow1)"/>
    <line x1="435" y1="115" x2="455" y2="115" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrow1)"/>
    <line x1="155" y1="155" x2="155" y2="180" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrow1)"/>
    <line x1="350" y1="155" x2="350" y2="180" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrow1)"/>
    <line x1="545" y1="155" x2="545" y2="180" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrow1)"/>
  `,
  v8libuv: `
    <defs>
      <marker id="arrow2" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#94A3B8"/></marker>
    </defs>
    <rect x="150" y="20" width="400" height="50" rx="10" fill="#F0FDF4" stroke="#059669" stroke-width="2"/>
    <text x="350" y="48" font-family="sans-serif" font-size="13" font-weight="600" fill="#059669" text-anchor="middle">🟢 Aplikasi JavaScript Anda (Modul ERP)</text>
    <line x1="250" y1="70" x2="250" y2="95" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrow2)"/>
    <line x1="450" y1="70" x2="450" y2="95" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrow2)"/>
    <rect x="150" y="95" width="400" height="50" rx="10" fill="#fff" stroke="#2563EB" stroke-width="2"/>
    <text x="350" y="123" font-family="sans-serif" font-size="13" font-weight="600" fill="#1E293B" text-anchor="middle">Node.js Standard Library / Bindings</text>
    <line x1="250" y1="145" x2="250" y2="170" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrow2)"/>
    <line x1="450" y1="145" x2="450" y2="170" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrow2)"/>
    <rect x="80" y="170" width="200" height="60" rx="10" fill="#EFF6FF" stroke="#1D4ED8" stroke-width="2"/>
    <text x="180" y="198" font-family="sans-serif" font-size="13" font-weight="600" fill="#1D4ED8" text-anchor="middle">⚙️ V8 Engine</text>
    <text x="180" y="215" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">Compile &amp; Execute JS</text>
    <rect x="340" y="170" width="240" height="60" rx="10" fill="#FFFBEB" stroke="#D97706" stroke-width="2"/>
    <text x="460" y="198" font-family="sans-serif" font-size="13" font-weight="600" fill="#92400E" text-anchor="middle">📌 libuv</text>
    <text x="460" y="215" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">Event Loop · Thread Pool · I/O</text>
    <line x1="180" y1="230" x2="180" y2="255" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrow2)"/>
    <line x1="460" y1="230" x2="460" y2="255" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrow2)"/>
    <rect x="130" y="255" width="400" height="40" rx="6" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1.5"/>
    <text x="330" y="280" font-family="sans-serif" font-size="11" fill="#475569" font-weight="600" text-anchor="middle">🐧 Sistem Operasi (Linux / macOS / Windows)</text>
  `,
  restApi: `
    <defs>
      <marker id="arrowRest" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#94A3B8"/></marker>
    </defs>
    <rect x="50" y="30" width="120" height="220" rx="8" fill="#F8FAFC" stroke="#64748B" stroke-width="2"/>
    <text x="110" y="60" font-family="sans-serif" font-size="14" font-weight="600" fill="#1E293B" text-anchor="middle">Client</text>
    <text x="110" y="80" font-family="sans-serif" font-size="12" fill="#475569" text-anchor="middle">(Web / Mobile)</text>
    <rect x="290" y="30" width="140" height="220" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="2"/>
    <text x="360" y="60" font-family="sans-serif" font-size="14" font-weight="600" fill="#1D4ED8" text-anchor="middle">Server (API)</text>
    <text x="360" y="80" font-family="sans-serif" font-size="12" fill="#3B82F6" text-anchor="middle">Node.js + Express</text>
    <rect x="550" y="30" width="100" height="220" rx="8" fill="#F0FDF4" stroke="#10B981" stroke-width="2"/>
    <text x="600" y="60" font-family="sans-serif" font-size="14" font-weight="600" fill="#047857" text-anchor="middle">Database</text>
    <text x="600" y="80" font-family="sans-serif" font-size="12" fill="#10B981" text-anchor="middle">(JSON / SQL)</text>
    
    <line x1="170" y1="110" x2="280" y2="110" stroke="#94A3B8" stroke-width="2" marker-end="url(#arrowRest)"/>
    <text x="225" y="100" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">GET /api/items</text>
    
    <line x1="280" y1="140" x2="170" y2="140" stroke="#94A3B8" stroke-width="2" marker-end="url(#arrowRest)"/>
    <text x="225" y="135" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">200 OK + JSON</text>
    
    <line x1="170" y1="180" x2="280" y2="180" stroke="#94A3B8" stroke-width="2" marker-end="url(#arrowRest)"/>
    <text x="225" y="170" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">POST /api/items</text>
    
    <line x1="280" y1="210" x2="170" y2="210" stroke="#94A3B8" stroke-width="2" marker-end="url(#arrowRest)"/>
    <text x="225" y="205" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">201 Created</text>
    
    <line x1="430" y1="125" x2="540" y2="125" stroke="#94A3B8" stroke-width="2" marker-end="url(#arrowRest)"/>
    <text x="485" y="115" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">Query Data</text>
    
    <line x1="540" y1="165" x2="430" y2="165" stroke="#94A3B8" stroke-width="2" marker-end="url(#arrowRest)"/>
    <text x="485" y="155" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">Return Data</text>
  `,
  middlewareFlow: `
    <defs>
      <marker id="arrowMw" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#94A3B8"/></marker>
    </defs>
    <rect x="50" y="80" width="90" height="50" rx="8" fill="#F8FAFC" stroke="#64748B" stroke-width="2"/>
    <text x="95" y="110" font-family="sans-serif" font-size="13" font-weight="600" fill="#1E293B" text-anchor="middle">Request</text>
    
    <rect x="190" y="60" width="110" height="90" rx="8" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
    <text x="245" y="85" font-family="sans-serif" font-size="12" font-weight="600" fill="#92400E" text-anchor="middle">Middleware 1</text>
    <text x="245" y="105" font-family="sans-serif" font-size="11" fill="#B45309" text-anchor="middle">(Logger)</text>
    <rect x="215" y="120" width="60" height="20" rx="4" fill="#FDE68A" stroke="#D97706" stroke-width="1"/>
    <text x="245" y="134" font-family="sans-serif" font-size="10" font-weight="600" fill="#92400E" text-anchor="middle">next()</text>
    
    <rect x="350" y="60" width="110" height="90" rx="8" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
    <text x="405" y="85" font-family="sans-serif" font-size="12" font-weight="600" fill="#92400E" text-anchor="middle">Middleware 2</text>
    <text x="405" y="105" font-family="sans-serif" font-size="11" fill="#B45309" text-anchor="middle">(Auth)</text>
    <rect x="375" y="120" width="60" height="20" rx="4" fill="#FDE68A" stroke="#D97706" stroke-width="1"/>
    <text x="405" y="134" font-family="sans-serif" font-size="10" font-weight="600" fill="#92400E" text-anchor="middle">next()</text>
    
    <rect x="510" y="60" width="110" height="90" rx="8" fill="#ECFDF5" stroke="#059669" stroke-width="2"/>
    <text x="565" y="85" font-family="sans-serif" font-size="12" font-weight="600" fill="#065F46" text-anchor="middle">Route Handler</text>
    <text x="565" y="105" font-family="sans-serif" font-size="11" fill="#047857" text-anchor="middle">app.get(...)</text>
    <rect x="535" y="120" width="60" height="20" rx="4" fill="#A7F3D0" stroke="#059669" stroke-width="1"/>
    <text x="565" y="134" font-family="sans-serif" font-size="10" font-weight="600" fill="#065F46" text-anchor="middle">res.send()</text>
    
    <line x1="140" y1="105" x2="180" y2="105" stroke="#94A3B8" stroke-width="2" marker-end="url(#arrowMw)"/>
    <line x1="300" y1="105" x2="340" y2="105" stroke="#94A3B8" stroke-width="2" marker-end="url(#arrowMw)"/>
    <line x1="460" y1="105" x2="500" y2="105" stroke="#94A3B8" stroke-width="2" marker-end="url(#arrowMw)"/>
    
    <path d="M 565 150 L 565 200 L 95 200 L 95 130" fill="none" stroke="#3B82F6" stroke-width="2" marker-end="url(#arrowMw)"/>
    <text x="330" y="190" font-family="sans-serif" font-size="12" font-weight="600" fill="#2563EB" text-anchor="middle">Response (res)</text>
  `
};

// ── MODULE 1 CONTENT ──
const CONTENT = {};

CONTENT['m1-plan'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#2563EB">Module 1</span>
  <h1 class="section-title">Lesson Plan — Backend Intro &amp; Node.js Fundamentals</h1>
  <p class="section-subtitle">Pertemuan 1 dari Bootcamp Full Stack Web Developer</p>
</div>
<div class="content">
  <h2>Tujuan Pembelajaran</h2>
  <p>Setelah menyelesaikan modul ini, peserta mampu:</p>
  <ul>
    <li>Memahami konsep dasar backend dan arsitektur Modular Monolith pada ERP</li>
    <li>Menginstal dan menjalankan Node.js di lingkungan lokal</li>
    <li>Membedakan sistem module CommonJS dan ESM</li>
    <li>Membuat modul JavaScript sederhana menggunakan <code>require</code> dan <code>module.exports</code></li>
    <li>Membangun CLI sederhana untuk validasi stok gudang</li>
    <li>Menganalisis output kalkulasi stok dengan studi kasus manufaktur</li>
  </ul>
  <h2>Alokasi Waktu (120 menit)</h2>
  <table>
    <tr><th>Durasi</th><th>Kegiatan</th></tr>
    <tr><td>15 menit</td><td>ERP Course Overview &amp; Arsitektur Modular Monolith</td></tr>
    <tr><td>25 menit</td><td>Node.js Core: Setup, V8+libuv, Module System</td></tr>
    <tr><td>30 menit</td><td>Live Coding: Modul Kalkulasi Stok Gudang</td></tr>
    <tr><td>30 menit</td><td>Guided Lab: CLI Stock Validation</td></tr>
    <tr><td>20 menit</td><td>Diskusi, Q&amp;A, dan Pengantar Take-Home</td></tr>
  </table>
  <h2>Studi Kasus: Sistem ERP Manufaktur</h2>
  <p>Sepanjang bootcamp ini, kita akan membangun sebuah <strong>Manufacturing ERP MVP</strong> menggunakan arsitektur <strong>Modular Monolith</strong>. Bayangkan Anda adalah seorang <em>software engineer</em> di PT. Nafisa Manufacturing — perusahaan manufaktur yang memproduksi komponen elektronik. Sistem yang akan kita bangun menangani:</p>
  <ul>
    <li><strong>Manajemen Gudang &amp; Stok</strong> — mencatat barang masuk/keluar, validasi stok minimum</li>
    <li><strong>Work Order</strong> — persetujuan berurutan untuk proses produksi</li>
    <li><strong>Kalkulasi Material</strong> — perhitungan kebutuhan bahan baku</li>
  </ul>
  <p>Setiap modul backend akan langsung dipraktikkan ke studi kasus ini, sehingga di akhir bootcamp Anda memiliki aplikasi ERP fungsional yang benar-benar bisa dijalankan.</p>
  ${callout('info','Mengapa ERP?','Sistem ERP (Enterprise Resource Planning) adalah tulang punggung operasional perusahaan manufaktur. Dengan mempelajari ERP, Anda tidak hanya belajar coding — Anda belajar bagaimana sistem informasi mengintegrasikan seluruh aspek bisnis.')}
</div>`;

CONTENT['m1-a'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#2563EB">Module 1 · Section A</span>
  <h1 class="section-title">ERP &amp; Arsitektur Modular Monolith</h1>
  <p class="section-subtitle">Memahami blueprint sistem yang akan kita bangun</p>
</div>
<div class="content">
  <h2>Apa itu ERP?</h2>
  <p><strong>ERP (Enterprise Resource Planning)</strong> adalah sistem perangkat lunak terintegrasi yang digunakan perusahaan untuk mengelola dan mengotomatisasi proses bisnis sehari-hari. ERP menghubungkan berbagai departemen — gudang, produksi, keuangan, SDM — dalam satu sistem terpadu.</p>
  <p>Dalam bootcamp ini, kita fokus pada <strong>Manufacturing ERP</strong>, yaitu sistem yang menangani:</p>
  <ul>
    <li>Manajemen inventaris &amp; stok gudang</li>
    <li>Work order &amp; routing produksi</li>
    <li>Bill of Materials (BOM)</li>
    <li>Pembelian &amp; penerimaan barang</li>
  </ul>
  <h2>Modular Monolith Architecture</h2>
  <p>Kita menggunakan arsitektur <strong>Modular Monolith</strong> — sebuah pendekatan di mana aplikasi dikemas sebagai satu kesatuan (monolith), tetapi kode diorganisir ke dalam modul-modul yang terpisah secara logis dan memiliki batasan (boundary) yang jelas.</p>
  ${diagramSvg(DIAGRAMS.modularMonolith,'Gambar 1: Arsitektur Modular Monolith ERP Manufaktur. Setiap modul terpisah secara logis namun berjalan dalam satu proses aplikasi.')}
  <h2>Mengapa Modular Monolith?</h2>
  <ul>
    <li><strong>Sederhana di awal</strong> — deploy satu aplikasi, tidak perlu infrastruktur microservices</li>
    <li><strong>Batas modul yang jelas</strong> — kode setiap domain terisolasi, memudahkan refactoring ke microservices nanti</li>
    <li><strong>Konsistensi data</strong> — satu database, transaksi ACID lintas modul lebih mudah</li>
    <li><strong>Performa</strong> — tidak ada network latency antar-modul</li>
  </ul>
  ${callout('warning','Perhatian','Monolith bukan berarti kode berantakan! Modular Monolith tetap membutuhkan disiplin tinggi dalam memisahkan concern. Kita akan gunakan pola folder-by-feature dan dependency injection sederhana.')}
  ${quiz('q1a','Apa keuntungan utama arsitektur Modular Monolith dibandingkan Microservices untuk proyek ERP tahap awal?',['Lebih mudah di-deploy dan dikelola di awal','Dapat menggunakan bahasa pemrograman berbeda tiap modul','Skalabilitas horizontal yang lebih baik','Setiap modul punya database sendiri'],0,'Modular Monolith sederhana di awal karena cukup deploy satu aplikasi. Microservices unggul di skalabilitas dan kemandirian bahasa, tapi kompleksitasnya tinggi untuk tahap awal.')}
</div>`;

CONTENT['m1-b'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#2563EB">Module 1 · Section B</span>
  <h1 class="section-title">Node.js: V8, libuv &amp; Module System</h1>
  <p class="section-subtitle">Memahami fondasi runtime JavaScript untuk backend</p>
</div>
<div class="content">
  <h2>Instalasi Node.js</h2>
  <p>Pastikan Node.js versi 18+ sudah terinstal di komputer Anda:</p>
  ${codeBlock('bash','node --version\nnpm --version','v22.12.0\n10.9.2','Cek versi Node.js dan npm')}
  <p>Gunakan Node Version Manager (nvm) jika perlu beberapa versi:</p>
  ${codeBlock('bash','nvm install 22\nnvm use 22','Now using node v22.12.0 (npm v10.9.2)','Instal Node.js versi 22')}
  
  <h2>V8 Engine + libuv</h2>
  <p>Node.js bukan bahasa pemrograman — ia adalah <strong>runtime environment</strong> yang menggabungkan:</p>
  <ul>
    <li><strong>V8 Engine</strong> — mengompilasi dan mengeksekusi JavaScript (dikembangkan Google untuk Chrome)</li>
    <li><strong>libuv</strong> — library C untuk asynchronous I/O, event loop, dan thread pool</li>
    <li><strong>Node.js Bindings</strong> — lapisan yang menghubungkan JS ke sistem operasi</li>
  </ul>
  ${diagramSvg(DIAGRAMS.v8libuv,'Gambar 2: Arsitektur Node.js — Aplikasi JS → Bindings → V8 + libuv → OS')}

  <h2>Module System: CommonJS</h2>
  <p>Node.js menggunakan sistem module untuk mengorganisir kode. Secara default, Node.js menggunakan <strong>CommonJS</strong> dengan fungsi <code>require()</code> dan objek <code>module.exports</code>.</p>

  <h3>Membuat Module Pertama: Kalkulasi Stok Gudang</h3>
  <p>Buat file <code>stockCalculator.js</code>:</p>
  ${codeBlock('javascript',`// stockCalculator.js - Modul kalkulasi stok gudang

/**
 * Menghitung stok akhir setelah transaksi masuk/keluar
 * @param {number} stokAwal - Stok yang tersedia
 * @param {number} barangMasuk - Jumlah barang masuk
 * @param {number} barangKeluar - Jumlah barang keluar
 * @returns {number} Stok akhir
 */
function hitungStokAkhir(stokAwal, barangMasuk, barangKeluar) {
  return stokAwal + barangMasuk - barangKeluar;
}

/**
 * Cek apakah stok di bawah batas minimum
 * @param {number} stokSaatIni
 * @param {number} batasMinimum
 * @returns {boolean}
 */
function cekStokMinimum(stokSaatIni, batasMinimum) {
  if (batasMinimum === undefined) batasMinimum = 10;
  return stokSaatIni < batasMinimum;
}

/**
 * Format stok sebagai string laporan
 * @param {string} namaBarang
 * @param {number} stok
 * @returns {string}
 */
function buatLaporanStok(namaBarang, stok) {
  const status = cekStokMinimum(stok)
    ? "!!! PERHATIAN: Stok menipis!"
    : ">> Stok aman";
  return "[LAPORAN] " + namaBarang + ": " + stok + " unit - " + status;
}

module.exports = {
  hitungStokAkhir,
  cekStokMinimum,
  buatLaporanStok
};`)}

  <h3>Menggunakan Module dengan require()</h3>
  <p>Buat file <code>app.js</code> untuk menggunakan modul di atas:</p>
  ${codeBlock('javascript','// app.js - Menggunakan modul stockCalculator\nconst stockCalc = require(\'./stockCalculator\');\nconst stokAwal = 50;\nconst barangMasuk = 30;\nconst barangKeluar = 15;\nconst stokAkhir = stockCalc.hitungStokAkhir(stokAwal, barangMasuk, barangKeluar);\nconsole.log("Stok awal: " + stokAwal);\nconsole.log("Barang masuk: " + barangMasuk);\nconsole.log("Barang keluar: " + barangKeluar);\nconsole.log("Stok akhir: " + stokAkhir);\nconsole.log(stockCalc.buatLaporanStok("Mur M8", stokAkhir));\nconsole.log(stockCalc.buatLaporanStok("Baut M6", 5));')}

  ${codeBlock('bash','node app.js','Stok awal: 50\nBarang masuk: 30\nBarang keluar: 15\nStok akhir: 65\n[LAPORAN] Mur M8: 65 unit - >> Stok aman\n[LAPORAN] Baut M6: 5 unit - !!! PERHATIAN: Stok menipis!','Hasil menjalankan node app.js')}

  <h3>require vs module.exports</h3>
  <table>
    <tr><th>Konsep</th><th>Penjelasan</th></tr>
    <tr><td><code>require(\'./path\')</code></td><td>Fungsi untuk memuat module lain. Path relatif mulai dengan <code>./</code> atau <code>../</code>. Untuk package npm (seperti <code>require(\'lodash\')</code>) tidak perlu path.</td></tr>
    <tr><td><code>module.exports</code></td><td>Objek khusus yang menentukan apa yang akan dikembalikan oleh <code>require()</code>. Anda bisa export objek, fungsi, atau nilai apa pun.</td></tr>
    <tr><td>Destructuring require</td><td><code>const { hitungStokAkhir } = require(\'./stockCalculator\')</code> — mengambil fungsi tertentu saja.</td></tr>
  </table>

  ${callout('instructor','Catatan Instruktur','Penting untuk ditekankan ke murid: require() itu synchronous — ia membaca dan mengeksekusi seluruh file module sebelum mengembalikan exports. Ini berbeda nanti dengan import ESM yang asynchronous. Perhatikan juga bahwa module dieksekusi hanya sekali dan hasilnya di-cache oleh Node.js.')}

  <h3>CommonJS vs ESM</h3>
  <table>
    <tr><th>CommonJS</th><th>ES Modules (ESM)</th></tr>
    <tr><td><code>require()</code> / <code>module.exports</code></td><td><code>import</code> / <code>export</code></td></tr>
    <tr><td>Synchronous</td><td>Asynchronous</td></tr>
    <tr><td>Default di Node.js (file .js)</td><td>Butuh <code>"type": "module"</code> di package.json atau ekstensi .mjs</td></tr>
    <tr><td>Di-cache setelah load pertama</td><td>Juga di-cache</td></tr>
    <tr><td>Tidak bisa tree-shaking</td><td>Mendukung tree-shaking</td></tr>
  </table>
  <p>Selama bootcamp ini, kita akan gunakan <strong>CommonJS</strong> sebagai default karena lebih sederhana dan masih paling banyak dipakai di ekosistem Node.js untuk aplikasi backend produksi.</p>

  ${callout('warning','Kesalahan Umum','Lupa menambahkan ./ saat require file lokal: const calc = require("stockCalculator") — ini akan mencari package di node_modules, bukan file lokal Anda. Selalu gunakan ./ untuk file lokal!')}

  ${quiz('q1b','Apa output dari kode berikut: hitungStokAkhir(20, 10, 5)',['5','25','15','35'],1,'Rumus: stokAwal + barangMasuk - barangKeluar = 20 + 10 - 5 = 25')}
</div>`;

CONTENT['m1-c'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#2563EB">Module 1 · Section C</span>
  <h1 class="section-title">Guided Lab: CLI Stock Validation</h1>
  <p class="section-subtitle">Praktik langsung membuat CLI validasi stok gudang</p>
</div>
<div class="content">
  <p>Pada lab ini, Anda akan membangun <strong>Command-Line Interface (CLI)</strong> sederhana untuk validasi stok barang di gudang menggunakan Node.js dan modul yang sudah kita buat sebelumnya.</p>

  <div class="step-tracker" id="st-m1-c"></div>

  ${stepCard(1,'Buat Folder Proyek',`
    <p>Buat folder baru untuk proyek lab ini:</p>
    ${codeBlock('bash','mkdir stock-validation-lab\ncd stock-validation-lab','','Buat direktori proyek')}
    <p>Buat file <code>stockCalculator.js</code> dan salin kode dari Section B sebelumnya.</p>
  `,true)}

  ${stepCard(2,'Buat File Data Gudang','<p>Buat file <code>warehouseData.js</code> yang berisi data stok 3 gudang:</p>'+codeBlock('javascript','// warehouseData.js - Data stok gudang\nconst gudangA = {\n  nama: "Gudang Utama",\n  lokasi: "Plant 1 - Blok A",\n  barang: [\n    { id: "BRG-001", nama: "Mur M8", kuantitas: 120, minStok: 20 },\n    { id: "BRG-002", nama: "Baut M6", kuantitas: 8, minStok: 15 },\n    { id: "BRG-003", nama: "Ring Pengunci", kuantitas: 45, minStok: 10 }\n  ]\n};\nconst gudangB = {\n  nama: "Gudang Penyangga",\n  lokasi: "Plant 1 - Blok B",\n  barang: [\n    { id: "BRG-004", nama: "Plat Besi 2mm", kuantitas: 30, minStok: 10 },\n    { id: "BRG-005", nama: "Kawat Tembaga", kuantitas: 5, minStok: 20 }\n  ]\n};\nmodule.exports = { gudangA, gudangB };'))}

  ${stepCard(3,'Buat CLI Validasi Stok','<p>Buat file <code>validateStock.js</code> — program utama CLI kita:</p>'+codeBlock('javascript','// validateStock.js - CLI Validasi Stok Gudang\nconst { cekStokMinimum, buatLaporanStok } = require(\'./stockCalculator\');\nconst { gudangA, gudangB } = require(\'./warehouseData\');\nconsole.log("===================================");\nconsole.log("  VALIDASI STOK GUDANG - PT. NAFISA");\nconsole.log("===================================\\n");\nfunction validasiGudang(gudang) {\n  console.log(" Lokasi: " + gudang.nama + " (" + gudang.lokasi + ")");\n  console.log("-----------------------------------");\n  gudang.barang.forEach(function(item) {\n    var laporan = buatLaporanStok(item.nama, item.kuantitas);\n    console.log(laporan);\n    if (cekStokMinimum(item.kuantitas, item.minStok)) {\n      console.log("   Butuh restock! Minimum: " + item.minStok + ", saat ini: " + item.kuantitas);\n    }\n  });\n  console.log("");\n}\nvalidasiGudang(gudangA);\nvalidasiGudang(gudangB);\nconsole.log("Validasi selesai.");'))}

  ${stepCard(4,'Jalankan CLI','<p>Jalankan program validasi:</p>'+codeBlock('bash','node validateStock.js','===================================\n  VALIDASI STOK GUDANG - PT. NAFISA\n===================================\n\n Lokasi: Gudang Utama (Plant 1 - Blok A)\n-----------------------------------\n[LAPORAN] Mur M8: 120 unit - >> Stok aman\n[LAPORAN] Baut M6: 8 unit - !!! PERHATIAN: Stok menipis!\n   Butuh restock! Minimum: 15, saat ini: 8\n[LAPORAN] Ring Pengunci: 45 unit - >> Stok aman\n\n Lokasi: Gudang Penyangga (Plant 1 - Blok B)\n-----------------------------------\n[LAPORAN] Plat Besi 2mm: 30 unit - >> Stok aman\n[LAPORAN] Kawat Tembaga: 5 unit - !!! PERHATIAN: Stok menipis!\n   Butuh restock! Minimum: 20, saat ini: 5\n\nValidasi selesai.','Hasil menjalankan CLI validasi stok'))}

  <div style="margin-top:24px">
    ${callout('info','Diskusi','Perhatikan bagaimana modul stockCalculator dipakai ulang (re-use) di file yang berbeda. Ini adalah prinsip DRY (Don\'t Repeat Yourself). Fungsi buatLaporanStok dan cekStokMinimum ditulis sekali, dipakai berkali-kali.')}
  </div>

  ${quiz('q1c','Apa status laporan untuk Baut M6 berdasarkan data gudangA?',['Stok aman','PERHATIAN: Stok menipis!','ERROR: Data tidak ditemukan','Butuh konfigurasi manual'],1,'Baut M6 memiliki kuantitas 8, di bawah minStok 15, sehingga statusnya "PERHATIAN: Stok menipis!".')}
</div>`;

CONTENT['m1-d'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#2563EB">Module 1 · Section D</span>
  <h1 class="section-title">Take-Home: Warehouse Unit Converter</h1>
  <p class="section-subtitle">Tugas mandiri — konversi satuan gudang</p>
</div>
<div class="content">
  <h2>Latar Belakang</h2>
  <p>PT. Nafisa Manufacturing menerima bahan baku dari pemasok internasional dengan berbagai satuan. Beberapa pemasok menggunakan <strong>kilogram (kg)</strong>, lainnya menggunakan <strong>pon (lbs)</strong>, dan beberapa menggunakan <strong>ons (oz)</strong>. Tim gudang perlu alat konversi cepat untuk menyamakan satuan sebelum dicatat ke sistem.</p>

  <h2>Tugas</h2>
  <p>Buat modul Node.js bernama <code>unitConverter.js</code> yang menyediakan fungsi-fungsi konversi berikut:</p>
  <table>
    <tr><th>Fungsi</th><th>Konversi</th></tr>
    <tr><td><code>kgToLbs(kg)</code></td><td>Kilogram ke Pon (1 kg = 2.20462 lbs)</td></tr>
    <tr><td><code>lbsToKg(lbs)</code></td><td>Pon ke Kilogram</td></tr>
    <tr><td><code>kgToOz(kg)</code></td><td>Kilogram ke Ons (1 kg = 35.274 oz)</td></tr>
    <tr><td><code>ozToKg(oz)</code></td><td>Ons ke Kilogram</td></tr>
  </table>

  <h3>Struktur File yang Diharapkan</h3>
  ${codeBlock('javascript','// unitConverter.js - Konversi satuan gudang\nfunction kgToLbs(kg) {\n  return kg * 2.20462;\n}\nfunction lbsToKg(lbs) {\n  return lbs / 2.20462;\n}\nfunction kgToOz(kg) {\n  return kg * 35.274;\n}\nfunction ozToKg(oz) {\n  return oz / 35.274;\n}\nfunction kgToLbsRounded(kg) {\n  return Math.round(kgToLbs(kg) * 100) / 100;\n}\nmodule.exports = { kgToLbs, lbsToKg, kgToOz, ozToKg, kgToLbsRounded };')}

  <h3>Program Uji Coba</h3>
  <p>Buat file <code>testConverter.js</code> untuk menguji modul Anda:</p>
  ${codeBlock('javascript','// testConverter.js - Uji coba konverter\nconst converter = require(\'./unitConverter\');\nvar beratKg = 25;\nconsole.log(beratKg + " kg = " + converter.kgToLbsRounded(beratKg) + " lbs");\nconsole.log(beratKg + " kg = " + converter.kgToOz(beratKg).toFixed(2) + " oz");\nvar penerimaan = [\n  { barang: "Semen", berat: 500, satuan: "kg" },\n  { barang: "Cat Epoxy", berat: 40, satuan: "lbs" },\n  { barang: "Resin", berat: 120, satuan: "oz" }\n];\npenerimaan.forEach(function(item) {\n  var beratKg;\n  if (item.satuan === "kg") beratKg = item.berat;\n  else if (item.satuan === "lbs") beratKg = converter.lbsToKg(item.berat);\n  else if (item.satuan === "oz") beratKg = converter.ozToKg(item.berat);\n  console.log(item.barang + ": " + item.berat + " " + item.satuan + " = " + beratKg.toFixed(2) + " kg");\n});')}

  ${codeBlock('bash','node testConverter.js','25 kg = 55.12 lbs\n25 kg = 881.85 oz\nSemen: 500 kg = 500.00 kg\nCat Epoxy: 40 lbs = 18.14 kg\nResin: 120 oz = 3.40 kg','Output yang diharapkan')}

  <h2>Kriteria Penilaian</h2>
  <ul>
    <li>Semua fungsi konversi berfungsi dengan benar</li>
    <li>Menggunakan <code>module.exports</code> dengan rapi</li>
    <li>Program uji coba berjalan tanpa error</li>
    <li>Angka desimal ditangani dengan tepat</li>
    <li>Bonus: tambahkan fungsi <code>konversiMassal(array)</code> yang menerima array objek</li>
  </ul>

  <h2>Cara Pengumpulan</h2>
  <p>Simpan semua file dalam folder <code>unit-converter-tugas/</code>, kompres menjadi ZIP, dan upload ke LMS. Sertakan screenshot hasil menjalankan <code>node testConverter.js</code>.</p>

  ${callout('instructor','Catatan Instruktur','Ingatkan murid untuk memperhatikan akurasi floating-point. Misalnya 0.1 + 0.2 !== 0.3 di JavaScript. Untuk aplikasi keuangan/gudang yang butuh presisi tinggi, gunakan library seperti decimal.js atau simpan dalam satuan terkecil (gram).')}

  ${callout('danger','Kesalahan Umum: Floating Point','Contoh: kgToLbs(0.1) mungkin menghasilkan 0.22046200000000002. Gunakan Math.round() atau .toFixed(2) untuk membulatkan hasil ke desimal yang masuk akal untuk laporan gudang.')}
</div>`;

// ── MODULE 2 CONTENT ──
CONTENT['m2-plan'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#059669">Module 2</span>
  <h1 class="section-title">Lesson Plan — NPM, Path Module &amp; File System</h1>
  <p class="section-subtitle">Pertemuan 2 — Mengelola package dan berkas di Node.js</p>
</div>
<div class="content">
  <h2>Tujuan Pembelajaran</h2>
  <p>Setelah menyelesaikan modul ini, peserta mampu:</p>
  <ul>
    <li>Menginstal dan mengelola package menggunakan NPM</li>
    <li>Memahami struktur <code>package.json</code> dan semantic versioning</li>
    <li>Menggunakan Path module untuk manipulasi path file</li>
    <li>Membaca dan menulis file teks dan JSON dengan File System module</li>
    <li>Membangun sistem pencatatan barang masuk gudang berbasis file</li>
  </ul>
  <h2>Alokasi Waktu (120 menit)</h2>
  <table>
    <tr><th>Durasi</th><th>Kegiatan</th></tr>
    <tr><td>25 menit</td><td>NPM &amp; Package Management — instalasi, package.json, semantic versioning</td></tr>
    <tr><td>30 menit</td><td>Path Module — path.join, path.resolve, path.basename</td></tr>
    <tr><td>30 menit</td><td>File System Module — baca/tulis file JSON &amp; teks</td></tr>
    <tr><td>25 menit</td><td>Guided Lab: Sistem Pencatat Barang Masuk Gudang</td></tr>
    <tr><td>10 menit</td><td>Diskusi &amp; Pengantar Take-Home</td></tr>
  </table>

  <h2>Kaitan dengan Studi Kasus</h2>
  <p>Di Module 1 kita membuat modul kalkulasi stok dan CLI validasi. Sekarang kita akan belajar <strong>membaca dan menulis data ke file</strong> — skill yang esensial untuk menyimpan data transaksi gudang secara persisten. Tanpa File System module, data stok akan hilang setiap kali program dimatikan!</p>

  ${callout('info','Mengapa NPM?','NPM adalah ekosistem package terbesar di dunia. Dengan NPM, Anda tidak perlu menulis semuanya dari nol — cukup install package yang sudah jadi. Di proyek ERP kita nanti, kita akan menggunakan puluhan package untuk mempercepat pengembangan.')}
</div>`;

CONTENT['m2-a'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#059669">Module 2 · Section A</span>
  <h1 class="section-title">NPM Package Management</h1>
  <p class="section-subtitle">Mengelola dependensi dan package di Node.js</p>
</div>
<div class="content">
  <h2>Apa itu NPM?</h2>
  <p><strong>NPM (Node Package Manager)</strong> adalah package manager bawaan Node.js. Fungsinya:</p>
  <ul>
    <li>Menginstal package/library dari registry npmjs.com</li>
    <li>Mengelola dependensi proyek di <code>package.json</code></li>
    <li>Menjalankan script (test, build, start) melalui <code>npm run</code></li>
    <li>Mempublikasikan package Anda sendiri</li>
  </ul>

  <h2>Memulai Proyek dengan NPM</h2>
  <p>Setiap proyek Node.js bisa memiliki file <code>package.json</code> — ini adalah "KTP" proyek Anda. Untuk membuatnya:</p>
  ${codeBlock('bash','mkdir proyek-erp\ncd proyek-erp\nnpm init -y','Wrote to /proyek-erp/package.json:\n{\n  "name": "proyek-erp",\n  "version": "1.0.0",\n  "description": "",\n  "main": "index.js",\n  "scripts": {\n    "test": "echo \\\\"Error: no test specified\\\\" && exit 1"\n  },\n  "keywords": [],\n  "author": "",\n  "license": "ISC"\n}','Inisialisasi proyek baru dengan npm init -y')}

  <p>Flag <code>-y</code> membuat <code>package.json</code> dengan nilai default. Jika ingin interaktif, jalankan <code>npm init</code> tanpa flag.</p>

  <h2>Menginstal Package</h2>
  <p>Mari instal package yang berguna untuk proyek ERP kita — <strong>chalk</strong> untuk mewarnai output terminal:</p>
  ${codeBlock('bash','npm install chalk','added 1 package in 2s\n\n+ chalk@5.4.1\nadded 15 packages from 12 contributors','Instal package chalk')}

  <p>Setelah instalasi, NPM melakukan tiga hal:</p>
  <ol>
    <li><strong>Membuat folder <code>node_modules/</code></strong> — tempat semua package disimpan</li>
    <li><strong>Membuat <code>package-lock.json</code></strong> — mengunci versi persis dependensi</li>
    <li><strong>Menambahkan entry ke <code>package.json</code></strong> — mencatat dependensi</li>
  </ol>

  ${codeBlock('javascript','// Cek package.json setelah instalasi\nconst pkg = require(\'./package.json\');\nconsole.log("Dependencies:", pkg.dependencies);\n// Output: { "chalk": "^5.4.1" }')}

  <h2>package.json — Struktur Penting</h2>
  <table>
    <tr><th>Field</th><th>Fungsi</th></tr>
    <tr><td><code>name</code></td><td>Nama proyek (harus unik jika dipublikasikan)</td></tr>
    <tr><td><code>version</code></td><td>Versi proyek, mengikuti semantic versioning</td></tr>
    <tr><td><code>dependencies</code></td><td>Package yang dibutuhkan saat produksi</td></tr>
    <tr><td><code>devDependencies</code></td><td>Package hanya untuk pengembangan (testing, build)</td></tr>
    <tr><td><code>scripts</code></td><td>Perintah yang bisa dijalankan dengan <code>npm run</code></td></tr>
  </table>

  <h2>Semantic Versioning (SemVer)</h2>
  <p>Versi package ditulis dalam format <strong>MAJOR.MINOR.PATCH</strong>:</p>
  <ul>
    <li><strong>MAJOR</strong> — perubahan besar yang tidak kompatibel (breaking changes)</li>
    <li><strong>MINOR</strong> — penambahan fitur baru (kompatibel mundur)</li>
    <li><strong>PATCH</strong> — perbaikan bug (kompatibel mundur)</li>
  </ul>
  <p>Di <code>package.json</code>, kamu mungkin melihat tanda seperti <code>^5.4.1</code>:</p>
  <table>
    <tr><th>Notasi</th><th>Arti</th><th>Contoh</th></tr>
    <tr><td><code>^5.4.1</code></td><td>Update minor dan patch (compatible)</td><td>5.4.1 ke 5.9.0</td></tr>
    <tr><td><code>~5.4.1</code></td><td>Hanya update patch</td><td>5.4.1 ke 5.4.9</td></tr>
    <tr><td><code>5.4.1</code></td><td>Versi persis, tidak berubah</td><td>5.4.1 terus</td></tr>
    <tr><td><code>*</code></td><td>Versi berapa pun (tidak disarankan)</td><td>bisa 6.0.0</td></tr>
  </table>

  ${callout('warning','Perhatian: node_modules','Folder node_modules bisa sangat besar (ratusan MB). Jangan pernah commit folder ini ke Git! Tambahkan ke .gitignore. Selalu install ulang dengan <code>npm install</code> berdasarkan package.json.')}

  <h2>Menggunakan Package yang Sudah Diinstal</h2>
  ${codeBlock('javascript','// app.js — Menggunakan chalk\nconst chalk = require(\'chalk\');\n\nconsole.log(chalk.green("Stok aman!"));\nconsole.log(chalk.red.bold("Stok menipis!"));\nconsole.log(chalk.blue("Informasi:") + " Gudang utama terisi 75%");')}

  ${codeBlock('bash','node app.js','[teks hijau] Stok aman!\n[teks merah tebal] Stok menipis!\n[teks biru] Informasi: Gudang utama terisi 75%','Hasil menjalankan app.js dengan chalk')}

  <h2>npm scripts</h2>
  <p>Kita bisa mendefinisikan script di <code>package.json</code> untuk memudahkan tugas berulang:</p>
  ${codeBlock('javascript','// package.json — bagian scripts\n"scripts": {\n  "start": "node app.js",\n  "dev": "node --watch app.js",\n  "validate": "node validateStock.js"\n}')}
  <p>Jalankan dengan:</p>
  ${codeBlock('bash','npm run start\nnpm run validate','> proyek-erp@1.0.0 start\n> node app.js\n\n[teks hijau] Stok aman!\n...','Menjalankan script NPM')}

  ${callout('instructor','Catatan Instruktur','Tekankan ke murid perbedaan dependencies vs devDependencies. Di proyek ERP nanti, package seperti express, pg (PostgreSQL), dotenv adalah dependencies. Sedangkan jest, eslint, nodemon adalah devDependencies. Install devDependencies dengan npm install --save-dev.')}

  ${quiz('q2a','Apa fungsi dari ^ (caret) dalam "chalk": "^5.4.1"?',['Hanya boleh update patch version','Boleh update minor dan patch version','Versi harus persis 5.4.1','Boleh update ke major version berikutnya'],1,'Tanda caret (^) memperbolehkan update minor dan patch, tetapi tidak major. Jadi dari 5.4.1 bisa naik ke 5.9.9 tapi tidak ke 6.0.0.')}
</div>`;

CONTENT['m2-b'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#059669">Module 2 · Section B</span>
  <h1 class="section-title">Path Module &amp; File System Module</h1>
  <p class="section-subtitle">Navigasi path file dan baca/tulis berkas di Node.js</p>
</div>
<div class="content">
  <h2>Path Module</h2>
  <p>Path module menyediakan fungsi untuk bekerja dengan path file dan direktori. Modul ini <strong>built-in</strong> — tidak perlu diinstal, langsung <code>require(\'path\')</code>.</p>

  <h3>path.join() — Menggabung Segmen Path</h3>
  <p>Fungsi paling sering digunakan. Menggabung segmen path dengan separator yang benar sesuai OS ( / di Linux/Mac, \\\ di Windows).</p>
  ${codeBlock('javascript','const path = require(\'path\');\n\nconst fullPath = path.join(\'data\', \'gudang\', \'stok.json\');\nconsole.log(fullPath);\n// Linux/Mac: data/gudang/stok.json\n// Windows: data\\\\gudang\\\\stok.json\n\nconst pathAbs = path.join(__dirname, \'data\', \'gudang\');\nconsole.log(pathAbs);\n// /home/proyek/data/gudang')}

  ${callout('info','__dirname','<code>__dirname</code> adalah variabel global di Node.js yang berisi path absolut dari direktori tempat file saat ini berada. Sangat berguna untuk membuat path absolut yang andal.')}

  <h3>path.resolve() — Path Absolut</h3>
  <p>Mengubah path relatif menjadi absolut:</p>
  ${codeBlock('javascript','const path = require(\'path\');\n\nconsole.log(path.resolve(\'data/stok.json\'));\n// /home/user/proyek/data/stok.json\n\nconsole.log(path.resolve(\'..\', \'backup\', \'stok.json\'));\n// /home/user/backup/stok.json')}

  <h3>path.basename(), path.dirname(), path.extname()</h3>
  ${codeBlock('javascript','const path = require(\'path\');\n\nconst filePath = \'/data/gudang/stok.json\';\n\nconsole.log(path.basename(filePath));      // stok.json\nconsole.log(path.basename(filePath, \'.json\')); // stok\nconsole.log(path.dirname(filePath));       // /data/gudang\nconsole.log(path.extname(filePath));       // .json\nconsole.log(path.parse(filePath));\n// { root: \'/\', dir: \'/data/gudang\', base: \'stok.json\',\n//   ext: \'.json\', name: \'stok\' }')}

  <h2>File System Module (fs)</h2>
  <p>File System module (<code>fs</code>) adalah built-in module untuk berinteraksi dengan sistem file — membaca, menulis, mengupdate, menghapus file.</p>

  <h3>Membaca File — fs.readFileSync()</h3>
  ${codeBlock('javascript','const fs = require(\'fs\');\nconst path = require(\'path\');\n\nconst filePath = path.join(__dirname, \'stok.json\');\n\n// Baca file teks biasa\ntry {\n  const data = fs.readFileSync(filePath, \'utf-8\');\n  console.log("Isi file:");\n  console.log(data);\n} catch (err) {\n  console.error("Gagal membaca file:", err.message);\n}')}

  <h3>Menulis File — fs.writeFileSync()</h3>
  ${codeBlock('javascript','const fs = require(\'fs\');\nconst path = require(\'path\');\n\nconst filePath = path.join(__dirname, \'stok.json\');\n\nconst dataBarang = {\n  nama: "Mur M8",\n  kuantitas: 120,\n  gudang: "Utama"\n};\n\ntry {\n  fs.writeFileSync(filePath, JSON.stringify(dataBarang, null, 2), \'utf-8\');\n  console.log("File berhasil ditulis!");\n} catch (err) {\n  console.error("Gagal menulis file:", err.message);\n}')}

  ${codeBlock('bash','node writeStok.js','File berhasil ditulis!','Output menulis file JSON')}

  <p>Hasil file <code>stok.json</code>:</p>
  ${codeBlock('json','{\n  "nama": "Mur M8",\n  "kuantitas": 120,\n  "gudang": "Utama"\n}')}

  <h3>Membaca File JSON dan Parse Otomatis</h3>
  <p>Karena file JSON adalah teks, kita perlu <code>JSON.parse()</code> untuk mengubahnya jadi objek JavaScript:</p>
  ${codeBlock('javascript','const fs = require(\'fs\');\nconst path = require(\'path\');\n\nfunction bacaStok(namaFile) {\n  const filePath = path.join(__dirname, \'data\', namaFile);\n  \n  // Cek apakah file ada\n  if (!fs.existsSync(filePath)) {\n    console.log("File belum ada, buat default...");\n    return []; // kembalikan array kosong\n  }\n  \n  const data = fs.readFileSync(filePath, \'utf-8\');\n  return JSON.parse(data); // ubah string JSON ke array/objek\n}\n\n// Fungsi untuk menyimpan data\nfunction simpanStok(namaFile, data) {\n  const filePath = path.join(__dirname, \'data\', namaFile);\n  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), \'utf-8\');\n  console.log("Data tersimpan di:", filePath);\n}\n\n// Contoh pemakaian\nconst stok = bacaStok(\'stok.json\');\nconsole.log("Data stok:", stok);\n\n// Tambah data baru\nstok.push({ id: "BRG-006", nama: "Mur M10", kuantitas: 50 });\nsimpanStok(\'stok.json\', stok);')}

  <h3>Membaca File Teks (Baris per Baris)</h3>
  <p>Untuk file laporan teks, kita bisa membaca seluruh isi dan memprosesnya:</p>
  ${codeBlock('javascript','const fs = require(\'fs\');\nconst path = require(\'path\');\n\nconst filePath = path.join(__dirname, \'laporan.txt\');\n\n// Baca seluruh file\nconst isi = fs.readFileSync(filePath, \'utf-8\');\n\n// Pisah per baris\nconst baris = isi.split(\'\\n\');\nconsole.log("Jumlah baris:", baris.length);\n\n// Filter baris yang mengandung kata tertentu\nconst barangMasuk = baris.filter(b => b.includes(\"MASUK\"));\nconsole.log("Barang masuk:", barangMasuk);')}

  <h2>Pola Dasar: Read → Process → Write</h2>
  <p>Ini adalah pola yang paling umum dalam aplikasi backend — baca data dari file, proses, lalu simpan kembali:</p>
  ${codeBlock('javascript','const fs = require(\'fs\');\nconst path = require(\'path\');\n\nconst FILE = path.join(__dirname, \'data.json\');\n\n// 1. BACA — ambil data dari file\nconst raw = fs.readFileSync(FILE, \'utf-8\');\nconst data = JSON.parse(raw);\n\n// 2. PROSES — lakukan operasi\nconst totalStok = data.reduce((sum, item) => sum + item.kuantitas, 0);\nconsole.log("Total stok:", totalStok);\n\n// 3. TULIS — simpan perubahan\nfs.writeFileSync(FILE, JSON.stringify(data, null, 2), \'utf-8\');')}

  ${callout('instructor','Catatan Instruktur','Penting: fs.writeFileSync akan menimpa file yang sudah ada. Jika ingin menambah (append) ke file teks, gunakan fs.appendFileSync. Untuk file JSON, pola yang benar adalah baca → parse → modifikasi array → stringify → tulis ulang.')}

  ${callout('danger','Kesalahan Umum: Lupa Parse JSON','File JSON adalah teks biasa. <code>fs.readFileSync</code> mengembalikan string, BUKAN objek. Jika Anda langsung mengakses <code>data.nama</code> tanpa <code>JSON.parse()</code>, hasilnya akan <code>undefined</code>. Selalu ingat: <strong>baca → parse → baru akses</strong>.')}

  ${quiz('q2b','Apa yang terjadi jika kita lupa memanggil JSON.parse() setelah membaca file JSON dengan fs.readFileSync?',['Program akan error karena file tidak ditemukan','Data akan tetap berupa string, bukan objek, sehingga properti tidak bisa diakses','Tidak ada masalah, JSON otomatis terparse','File akan otomatis terhapus'],1,'fs.readFileSync mengembalikan string. Tanpa JSON.parse(), data.nama akan bernilai undefined karena string tidak punya properti nama.')}
</div>`;

CONTENT['m2-c'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#059669">Module 2 · Section C</span>
  <h1 class="section-title">Guided Lab: Sistem Pencatat Barang Masuk Gudang</h1>
  <p class="section-subtitle">Membangun aplikasi CLI untuk mencatat penerimaan barang</p>
</div>
<div class="content">
  <p>Pada lab ini, kita akan membangun sistem pencatat barang masuk gudang menggunakan File System module. Sistem ini membaca data stok dari file JSON, menambahkan barang baru, dan menyimpannya kembali.</p>

  <div class="step-tracker" id="st-m2-c"></div>

  ${stepCard(1,'Buat Folder dan Inisialisasi Proyek',`
    <p>Buat folder untuk proyek lab ini dan inisialisasi NPM:</p>
    ${codeBlock('bash','mkdir sistem-catatan-gudang\ncd sistem-catatan-gudang\nnpm init -y','Wrote to /package.json\n{ "name": "sistem-catatan-gudang", ... }','Inisialisasi proyek')}
    <p>Buat folder <code>data/</code> untuk menyimpan file JSON:</p>
    ${codeBlock('bash','mkdir data')}
  `,true)}

  ${stepCard(2,'Buat Data Awal Gudang',`
    <p>Buat file <code>data/barang.json</code> — data awal barang yang sudah ada di gudang:</p>
    ${codeBlock('json','[\n  {\n    "id": "BRG-001",\n    "nama": "Mur M8",\n    "kategori": "Hardware",\n    "kuantitas": 120,\n    "hargaSatuan": 500\n  },\n  {\n    "id": "BRG-002",\n    "nama": "Baut M6",\n    "kategori": "Hardware",\n    "kuantitas": 45,\n    "hargaSatuan": 350\n  },\n  {\n    "id": "BRG-003",\n    "nama": "Ring Pengunci",\n    "kategori": "Hardware",\n    "kuantitas": 80,\n    "hargaSatuan": 200\n  }\n]')}
  `)}

  ${stepCard(3,'Buat Modul Catat Barang Masuk',`
    <p>Buat file <code>catatMasuk.js</code> — modul untuk mencatat barang yang diterima dari pemasok:</p>
    ${codeBlock('javascript','// catatMasuk.js — Modul pencatatan barang masuk\n\nconst fs = require(\'fs\');\nconst path = require(\'path\');\n\n// Lokasi file data\nconst FILE_BARANG = path.join(__dirname, \'data\', \'barang.json\');\n\n/**\n * Membaca semua data barang dari file JSON\n */\nfunction bacaBarang() {\n  try {\n    const data = fs.readFileSync(FILE_BARANG, \'utf-8\');\n    return JSON.parse(data);\n  } catch (err) {\n    console.log("File belum ada, mulai dengan data kosong.");\n    return [];\n  }\n}\n\n/**\n * Menyimpan data barang ke file JSON\n */\nfunction simpanBarang(daftarBarang) {\n  const dir = path.dirname(FILE_BARANG);\n  if (!fs.existsSync(dir)) {\n    fs.mkdirSync(dir, { recursive: true });\n  }\n  fs.writeFileSync(FILE_BARANG, JSON.stringify(daftarBarang, null, 2), \'utf-8\');\n  console.log("Data tersimpan! Total barang:", daftarBarang.length);\n}\n\n/**\n * Mencatat barang masuk — menambah stok atau membuat entry baru\n * @param {string} id - ID barang\n * @param {string} nama - Nama barang\n * @param {string} kategori - Kategori barang\n * @param {number} jumlah - Jumlah yang diterima\n * @param {number} harga - Harga satuan\n */\nfunction catatBarangMasuk(id, nama, kategori, jumlah, harga) {\n  var daftarBarang = bacaBarang();\n  \n  // Cari apakah barang sudah ada\n  var barangDitemukan = false;\n  for (var i = 0; i < daftarBarang.length; i++) {\n    if (daftarBarang[i].id === id) {\n      // Barang sudah ada, tambah stok\n      daftarBarang[i].kuantitas += jumlah;\n      daftarBarang[i].hargaSatuan = harga; // update harga\n      barangDitemukan = true;\n      console.log("Stok diperbarui: " + nama + " (+" + jumlah + ")");\n      break;\n    }\n  }\n  \n  if (!barangDitemukan) {\n    // Barang baru, tambah ke daftar\n    daftarBarang.push({\n      id: id,\n      nama: nama,\n      kategori: kategori,\n      kuantitas: jumlah,\n      hargaSatuan: harga\n    });\n    console.log("Barang baru ditambahkan: " + nama);\n  }\n  \n  simpanBarang(daftarBarang);\n  return daftarBarang;\n}\n\n// Export fungsi untuk dipakai di CLI\nmodule.exports = { bacaBarang, simpanBarang, catatBarangMasuk };')}
  `)}

  ${stepCard(4,'Buat CLI Interaktif',`
    <p>Buat file <code>cli.js</code> — program utama yang bisa menerima perintah dari terminal:</p>
    ${codeBlock('javascript','// cli.js — Command Line Interface untuk sistem catat barang\n\nconst { catatBarangMasuk, bacaBarang } = require(\'./catatMasuk\');\n\n// Ambil argumen dari command line\n// process.argv = [node, cli.js, perintah, ...argumen]\nvar args = process.argv.slice(2);\nvar perintah = args[0];\n\nif (perintah === "tambah") {\n  // node cli.js tambah BRG-004 "Plat Besi" Hardware 50 15000\n  var id = args[1];\n  var nama = args[2];\n  var kategori = args[3];\n  var jumlah = parseInt(args[4]);\n  var harga = parseInt(args[5]);\n  \n  if (!id || !nama || !jumlah) {\n    console.log("Penggunaan: node cli.js tambah <id> <nama> <kategori> <jumlah> <harga>");\n    process.exit(1);\n  }\n  \n  catatBarangMasuk(id, nama, kategori, jumlah, harga || 0);\n  \n} else if (perintah === "lihat") {\n  // node cli.js lihat\n  var daftar = bacaBarang();\n  console.log("=== DAFTAR BARANG GUDANG ===\\n");\n  console.log("ID\\t\\tNama\\t\\tStok\\tHarga");\n  console.log("----------------------------------------");\n  daftar.forEach(function(b) {\n    console.log(b.id + "\\t" + b.nama + "\\t" + b.kuantitas + "\\tRp" + b.hargaSatuan);\n  });\n  console.log("\\nTotal: " + daftar.length + " jenis barang");\n  \n} else if (perintah === "cari") {\n  // node cli.js cari Mur\n  var kataKunci = args[1];\n  var daftar = bacaBarang();\n  var hasil = daftar.filter(function(b) {\n    return b.nama.toLowerCase().includes(kataKunci.toLowerCase());\n  });\n  \n  if (hasil.length === 0) {\n    console.log("Barang tidak ditemukan:", kataKunci);\n  } else {\n    console.log("Ditemukan " + hasil.length + " barang:");\n    hasil.forEach(function(b) {\n      console.log("- " + b.id + " " + b.nama + " (stok: " + b.kuantitas + ")");\n    });\n  }\n  \n} else {\n  console.log("Perintah yang tersedia: tambah, lihat, cari");\n  console.log("Contoh: node cli.js tambah BRG-004 \\"Plat Besi\\" Hardware 50 15000");\n}')}
  `)}

  ${stepCard(5,'Uji Coba Sistem',`
    <p>Jalankan CLI dengan berbagai perintah:</p>
    ${codeBlock('bash','node cli.js lihat','=== DAFTAR BARANG GUDANG ===\n\nID           Nama          Stok   Harga\n----------------------------------------\nBRG-001      Mur M8        120    Rp500\nBRG-002      Baut M6       45     Rp350\nBRG-003      Ring Pengunci 80     Rp200\n\nTotal: 3 jenis barang','Melihat daftar barang')}
    ${codeBlock('bash','node cli.js tambah BRG-004 "Plat Besi 2mm" Hardware 50 15000','Barang baru ditambahkan: Plat Besi 2mm\nData tersimpan! Total barang: 4','Menambah barang baru')}
    ${codeBlock('bash','node cli.js tambah BRG-001 "Mur M8" Hardware 30 550','Stok diperbarui: Mur M8 (+30)\nData tersimpan! Total barang: 4','Menambah stok barang yang sudah ada')}
    ${codeBlock('bash','node cli.js cari mur','Ditemukan 1 barang:\n- BRG-001 Mur M8 (stok: 150)','Mencari barang')}
  `)}

  <div style="margin-top:24px">
    ${callout('info','Yang Baru Dipelajari','1. <strong>fs.readFileSync</strong> — membaca file JSON\n2. <strong>fs.writeFileSync</strong> — menyimpan file JSON\n3. <strong>fs.existsSync</strong> — cek apakah file/folder ada\n4. <strong>fs.mkdirSync</strong> — membuat folder\n5. <strong>path.join</strong> — menggabung path dengan aman\n6. <strong>process.argv</strong> — membaca argumen dari command line\n7. <strong>JSON.parse & JSON.stringify</strong> — konversi data')}
  </div>

  ${quiz('q2c','Apa fungsi dari JSON.stringify(data, null, 2) pada kode simpanBarang?',['Menghapus data dari file','Mengubah objek JavaScript menjadi string JSON dengan format rapi (2 spasi indentasi)','Menambahkan 2 baris baru di akhir file','Menggabungkan dua file JSON'],1,'Parameter ketiga (2) adalah jumlah spasi untuk indentasi, membuat file JSON mudah dibaca manusia. Tanpa parameter ini, JSON akan ditulis dalam satu baris.')}
</div>`;

CONTENT['m2-d'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#059669">Module 2 · Section D</span>
  <h1 class="section-title">Take-Home: Catat Barang Keluar &amp; Laporan Teks</h1>
  <p class="section-subtitle">Tugas mandiri — mencatat pengeluaran stok dan generate laporan</p>
</div>
<div class="content">
  <h2>Latar Belakang</h2>
  <p>Setelah sistem pencatatan barang masuk berfungsi, PT. Nafisa Manufacturing membutuhkan fitur <strong>pencatatan barang keluar</strong> (untuk proses produksi dan penjualan) serta <strong>generasi laporan teks</strong> yang bisa dibaca oleh tim manajemen.</p>

  <h2>Tugas</h2>
  <p>Kembangkan sistem catatan gudang dari Guided Lab dengan menambahkan fitur berikut:</p>

  <h3>1. Catat Barang Keluar (catatKeluar.js)</h3>
  <p>Buat modul <code>catatKeluar.js</code> yang berfungsi untuk mengurangi stok barang ketika barang dikeluarkan dari gudang:</p>
  ${codeBlock('javascript','// catatKeluar.js — Pencatatan barang keluar\n\nconst fs = require(\'fs\');\nconst path = require(\'path\');\n\nconst FILE_BARANG = path.join(__dirname, \'data\', \'barang.json\');\n\n/**\n * Mencatat barang keluar — mengurangi stok\n * @param {string} id - ID barang\n * @param {number} jumlah - Jumlah yang dikeluarkan\n * @returns {boolean} - true jika berhasil, false jika stok tidak cukup\n */\nfunction catatBarangKeluar(id, jumlah) {\n  var daftarBarang = JSON.parse(fs.readFileSync(FILE_BARANG, \'utf-8\'));\n  \n  for (var i = 0; i < daftarBarang.length; i++) {\n    if (daftarBarang[i].id === id) {\n      if (daftarBarang[i].kuantitas >= jumlah) {\n        daftarBarang[i].kuantitas -= jumlah;\n        fs.writeFileSync(FILE_BARANG, JSON.stringify(daftarBarang, null, 2), \'utf-8\');\n        console.log("Barang keluar: " + daftarBarang[i].nama + " (-" + jumlah + ")");\n        console.log("Sisa stok: " + daftarBarang[i].kuantitas);\n        return true;\n      } else {\n        console.log("Stok tidak mencukupi! Stok saat ini: " + daftarBarang[i].kuantitas);\n        return false;\n      }\n    }\n  }\n  \n  console.log("Barang dengan ID " + id + " tidak ditemukan.");\n  return false;\n}\n\nmodule.exports = { catatBarangKeluar };')}

  <h3>2. Generate Laporan Teks (buatLaporan.js)</h3>
  <p>Buat modul <code>buatLaporan.js</code> yang membaca data barang dan membuat file laporan teks:</p>
  ${codeBlock('javascript','// buatLaporan.js — Generate laporan teks dari data barang\n\nconst fs = require(\'fs\');\nconst path = require(\'path\');\n\nconst FILE_BARANG = path.join(__dirname, \'data\', \'barang.json\');\n\nfunction generateLaporan() {\n  var daftarBarang = JSON.parse(fs.readFileSync(FILE_BARANG, \'utf-8\'));\n  var tanggal = new Date().toLocaleDateString(\'id-ID\');\n  \n  var laporan = "";\n  laporan += "=========================================\\n";\n  laporan += "  LAPORAN STOK GUDANG - PT. NAFISA\\n";\n  laporan += "  Tanggal: " + tanggal + "\\n";\n  laporan += "=========================================\\n\\n";\n  \n  var totalStok = 0;\n  var totalNilai = 0;\n  \n  daftarBarang.forEach(function(b) {\n    laporan += b.id + " | " + b.nama + "\\n";\n    laporan += "  Stok: " + b.kuantitas + " unit\\n";\n    laporan += "  Harga: Rp" + b.hargaSatuan + " per unit\\n";\n    laporan += "  Nilai: Rp" + (b.kuantitas * b.hargaSatuan) + "\\n";\n    laporan += "  Status: " + (b.kuantitas < 20 ? "PERHATIAN: Stok minim!\\n" : "Aman\\n");\n    laporan += "\\n";\n    \n    totalStok += b.kuantitas;\n    totalNilai += b.kuantitas * b.hargaSatuan;\n  });\n  \n  laporan += "-----------------------------------------\\n";\n  laporan += "TOTAL ITEM: " + daftarBarang.length + " jenis\\n";\n  laporan += "TOTAL STOK: " + totalStok + " unit\\n";\n  laporan += "TOTAL NILAI: Rp" + totalNilai + "\\n";\n  laporan += "=========================================\\n";\n  \n  // Simpan laporan ke file\n  var fileLaporan = path.join(__dirname, \'laporan-stok-\' + Date.now() + \'.txt\');\n  fs.writeFileSync(fileLaporan, laporan, \'utf-8\');\n  \n  console.log("Laporan tersimpan: " + fileLaporan);\n  return laporan;\n}\n\nmodule.exports = { generateLaporan };')}

  <h3>3. Perintah CLI Baru</h3>
  <p>Tambahkan perintah baru di <code>cli.js</code>:</p>
  ${codeBlock('bash','node cli.js keluar BRG-001 25\nnode cli.js laporan','Barang keluar: Mur M8 (-25)\nSisa stok: 125\n\nLaporan tersimpan: /data/laporan-stok-1700000000000.txt','Perintah baru untuk barang keluar dan laporan')}

  <h2>Kriteria Penilaian</h2>
  <ul>
    <li>Modul <code>catatKeluar.js</code> berfungsi — validasi stok cukup sebelum mengurangi</li>
    <li>Modul <code>buatLaporan.js</code> menghasilkan file teks dengan format rapi</li>
    <li>CLI mendukung perintah <code>keluar</code> dan <code>laporan</code></li>
    <li>Data persist — stok benar-benar berkurang di file JSON</li>
    <li>Error handling — pesan jelas jika stok tidak cukup atau barang tidak ditemukan</li>
    <li style="list-style:none"><br><strong>⭐ Bonus:</strong> Tambahkan timestamp di setiap transaksi dan simpan log transaksi ke file terpisah (<code>transactions.log</code>)</li>
  </ul>

  <h2>Cara Pengumpulan</h2>
  <p>Kumpulkan folder proyek <code>sistem-catatan-gudang/</code> yang berisi:</p>
  <ul>
    <li><code>package.json</code></li>
    <li><code>cli.js</code> (lama + tambahan perintah baru)</li>
    <li><code>catatMasuk.js</code></li>
    <li><code>catatKeluar.js</code></li>
    <li><code>buatLaporan.js</code></li>
    <li><code>data/barang.json</code></li>
    <li>Hasil laporan teks (.txt)</li>
  </ul>
  <p>Kompres folder menjadi ZIP dan upload ke LMS. Sertakan screenshot hasil menjalankan semua perintah.</p>

  ${callout('instructor','Catatan Instruktur','Pastikan murid memahami konsep "baca data → modifikasi → simpan kembali". Ini adalah pola fundamental yang akan terus dipakai di aplikasi backend. Juga ingatkan bahwa untuk produksi, kita akan pakai database (PostgreSQL), tapi untuk belajar, file system sudah cukup untuk memahami konsep CRUD.')}

  ${callout('danger','Kesalahan Umum: Path Relatif','Saat menjalankan script dari folder berbeda, path relatif (seperti <code>./data/barang.json</code>) bisa salah. Selalu gunakan <code>path.join(__dirname, \'data\', \'barang.json\')</code> agar path selalu benar dari mana pun script dijalankan.')}
</div>`;

// ── MODULE 3 CONTENT ──
const DIAGRAM_EVENTLOOP = `
  <defs>
    <marker id="arrow3" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#94A3B8"/></marker>
  </defs>
  <rect x="50" y="20" width="600" height="310" rx="10" fill="#F5F3FF" stroke="#7C3AED" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="350" y="48" font-family="sans-serif" font-size="14" font-weight="700" fill="#7C3AED" text-anchor="middle">Event Loop Timeline — Eksekusi Async</text>
  <!-- Call Stack -->
  <rect x="70" y="65" width="250" height="110" rx="8" fill="#fff" stroke="#2563EB" stroke-width="1.5"/>
  <text x="195" y="85" font-family="sans-serif" font-size="12" font-weight="600" fill="#1E293B" text-anchor="middle">Call Stack</text>
  <rect x="90" y="95" width="210" height="28" rx="4" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="1"/>
  <text x="195" y="113" font-family="sans-serif" font-size="11" fill="#1E293B" text-anchor="middle">console.log("A")</text>
  <rect x="90" y="125" width="210" height="28" rx="4" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="1"/>
  <text x="195" y="143" font-family="sans-serif" font-size="11" fill="#1E293B" text-anchor="middle">setTimeout(cb, 1000)</text>
  <rect x="90" y="125" width="210" height="28" rx="4" fill="#FEF2F2" stroke="#FECACA" stroke-width="1"/>
  <!-- Web APIs -->
  <rect x="380" y="65" width="250" height="110" rx="8" fill="#fff" stroke="#059669" stroke-width="1.5"/>
  <text x="505" y="85" font-family="sans-serif" font-size="12" font-weight="600" fill="#1E293B" text-anchor="middle">Web APIs / libuv</text>
  <rect x="400" y="100" width="210" height="28" rx="4" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1"/>
  <text x="505" y="118" font-family="sans-serif" font-size="11" fill="#1E293B" text-anchor="middle">Timer: setTimeout(...)</text>
  <text x="505" y="140" font-family="sans-serif" font-size="10" fill="#059669" text-anchor="middle">(counting 1000ms...)</text>
  <!-- Arrows -->
  <line x1="320" y1="110" x2="375" y2="110" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrow3)"/>
  <line x1="400" y1="150" x2="350" y2="150" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrow3)" stroke-dasharray="4,2"/>
  <!-- Callback Queue -->
  <rect x="380" y="200" width="250" height="50" rx="8" fill="#fff" stroke="#D97706" stroke-width="1.5"/>
  <text x="505" y="220" font-family="sans-serif" font-size="12" font-weight="600" fill="#1E293B" text-anchor="middle">Callback Queue</text>
  <rect x="400" y="230" width="210" height="28" rx="4" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1"/>
  <text x="505" y="248" font-family="sans-serif" font-size="11" fill="#92400E" text-anchor="middle">[cb] "Waktu habis!"</text>
  <line x1="505" y1="175" x2="505" y2="197" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrow3)"/>
  <!-- Event Loop -->
  <ellipse cx="195" cy="235" rx="140" ry="35" fill="none" stroke="#7C3AED" stroke-width="2.5"/>
  <text x="195" y="232" font-family="sans-serif" font-size="13" font-weight="700" fill="#7C3AED" text-anchor="middle">🔄 Event Loop</text>
  <text x="195" y="248" font-family="sans-serif" font-size="10" fill="#7C3AED" text-anchor="middle">tunggu Call Stack kosong</text>
  <line x1="350" y1="245" x2="377" y2="245" stroke="#7C3AED" stroke-width="2" marker-end="url(#arrow3)"/>
  <!-- output area -->
  <rect x="70" y="280" width="560" height="35" rx="6" fill="#1E293B" stroke="none"/>
  <text x="350" y="302" font-family="sans-serif" font-size="11" fill="#E2E8F0" text-anchor="middle">Output: A → (1 detik) → Waktu habis!</text>
`;

CONTENT['m3-plan'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#7C3AED">Module 3</span>
  <h1 class="section-title">Lesson Plan — HTTP &amp; Async JavaScript</h1>
  <p class="section-subtitle">Pertemuan 3 — HTTP server, callback, callback hell, dan Promises</p>
</div>
<div class="content">
  <h2>Tujuan Pembelajaran</h2>
  <p>Setelah menyelesaikan modul ini, peserta mampu:</p>
  <ul>
    <li>Membuat HTTP server dasar menggunakan <code>http</code> module</li>
    <li>Memahami pola callback dan callback hell (pyramid of doom)</li>
    <li>Menulis ulang callback hell menjadi Promise chain yang rapi</li>
    <li>Menggunakan <code>Promise.all()</code> untuk eksekusi paralel</li>
    <li>Memahami Event Loop dan urutan eksekusi async</li>
  </ul>
  <h2>Alokasi Waktu (120 menit)</h2>
  <table>
    <tr><th>Durasi</th><th>Kegiatan</th></tr>
    <tr><td>20 menit</td><td>HTTP Module — server dasar, routing sederhana</td></tr>
    <tr><td>20 menit</td><td>Callback Pattern — simulasi 3 gudang</td></tr>
    <tr><td>25 menit</td><td>Callback Hell vs Promise Chain — side-by-side</td></tr>
    <tr><td>15 menit</td><td>Event Loop Timeline &amp; Promise.all</td></tr>
    <tr><td>30 menit</td><td>Guided Lab: Simulasi Pengecekan Stok Multi-Gudang</td></tr>
    <tr><td>10 menit</td><td>Diskusi, Q&A, Take-Home</td></tr>
  </table>

  <h2>Studi Kasus: Multi-Gudang</h2>
  <p>PT. Nafisa Manufacturing memiliki <strong>3 gudang</strong> di lokasi berbeda. Untuk memenuhi order, kita perlu mengecek stok di semua gudang dan menggabungkan hasilnya. Module ini mengajarkan 3 pendekatan untuk menyelesaikan masalah ini: <strong>callback</strong>, <strong>Promise chain</strong>, dan <strong>Promise.all</strong>.</p>
</div>`;

CONTENT['m3-a'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#7C3AED">Module 3 · Section A</span>
  <h1 class="section-title">HTTP Module &amp; Callback Pattern</h1>
  <p class="section-subtitle">Membuat server HTTP dan memahami callback asynchronous</p>
</div>
<div class="content">
  <h2>HTTP Module — Server Dasar</h2>
  <p>Node.js memiliki <strong>http</strong> module built-in untuk membuat server HTTP. Ini adalah fondasi semua framework web Express, Fastify, dll.</p>
  ${codeBlock('javascript','const http = require(\'http\');\n\n// Buat server\nconst server = http.createServer(function(req, res) {\n  // req: permintaan dari client\n  // res: respons yang akan dikirim\n  res.statusCode = 200;\n  res.setHeader(\'Content-Type\', \'text/plain\');\n  res.end(\'Hello dari Server ERP!\\n\');\n});\n\n// Jalankan server di port 3000\nserver.listen(3000, function() {\n  console.log(\'Server berjalan di http://localhost:3000\');\n});')}
  ${codeBlock('bash','node server.js','Server berjalan di http://localhost:3000','Menjalankan server')}

  <h3>Routing Sederhana</h3>
  <p>Kita bisa mengecek URL yang diminta untuk membuat routing sederhana:</p>
  ${codeBlock('javascript','const http = require(\'http\');\nconst server = http.createServer(function(req, res) {\n  const url = req.url;\n  \n  if (url === \'/\') {\n    res.end(\'Selamat datang di ERP Nafisa\\n\');\n  } else if (url === \'/stok\') {\n    res.end(\'Data stok gudang\\n\');\n  } else if (url === \'/laporan\') {\n    res.end(\'Laporan inventaris\\n\');\n  } else {\n    res.statusCode = 404;\n    res.end(\'Halaman tidak ditemukan\\n\');\n  }\n});\nserver.listen(3000);')}

  <h2>Apa itu Callback?</h2>
  <p><strong>Callback</strong> adalah fungsi yang dikirim sebagai argumen ke fungsi lain, dan akan dipanggil setelah operasi selesai.</p>
  ${codeBlock('javascript','// Contoh callback sederhana\nfunction cekStok(idBarang, callback) {\n  console.log("Mengecek stok untuk:", idBarang);\n  \n  // Simulasi operasi async (butuh waktu)\n  setTimeout(function() {\n    var hasil = { id: idBarang, stok: 50 };\n    callback(null, hasil); // null = tidak ada error\n  }, 1000);\n}\n\n// Panggil fungsi dengan callback\ncekStok("BRG-001", function(err, data) {\n  if (err) {\n    console.log("Error:", err);\n    return;\n  }\n  console.log("Hasil:", data);\n});')}
  ${codeBlock('bash','node cekStok.js','Mengecek stok untuk: BRG-001\nHasil: { id: \'BRG-001\', stok: 50 }','Output simulasi async callback')}

  <h3>Pola Error-First Callback</h3>
  <p>Di Node.js, callback biasanya mengikuti pola <strong>error-first</strong>: parameter pertama adalah error (null jika sukses), parameter kedua adalah data hasil.</p>
  ${codeBlock('javascript','// Error-first callback pattern\nfunction bacaDataGudang(idGudang, callback) {\n  // Simulasi: gudang 3 error\n  if (idGudang === 3) {\n    callback(new Error("Gudang 3 sedang offline!"), null);\n    return;\n  }\n  \n  setTimeout(function() {\n    callback(null, { id: idGudang, nama: "Gudang " + idGudang });\n  }, 500);\n}\n\n// Pemakaian\nbacaDataGudang(2, function(err, data) {\n  if (err) {\n    console.log("Gagal:", err.message);\n    return;\n  }\n  console.log("Berhasil:", data);\n});')}
  ${codeBlock('bash','node errorFirst.js','Berhasil: { id: 2, nama: \'Gudang 2\' }','Output error-first callback')}

  ${callout('instructor','Catatan Instruktur','Pola error-first callback adalah standar di Node.js. Semua fungsi async bawaan Node.js (fs.readFile, dll.) menggunakan pola ini. Jika kalian bingung: callback(err, data) — err artinya "ada masalah?", kalau null berarti "aman".')}

  ${quiz('q3a','Apa yang dimaksud dengan error-first callback di Node.js?',['Callback dipanggil sebelum fungsi selesai','Parameter pertama callback selalu error (null jika sukses), parameter kedua adalah data','Callback hanya dipanggil jika ada error','Callback menggunakan Promise'],1,'Error-first callback berarti parameter pertama dari callback function adalah error (null jika tidak ada error), dan parameter kedua adalah data hasil.')}
</div>`;

CONTENT['m3-b'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#7C3AED">Module 3 · Section B</span>
  <h1 class="section-title">Callback Hell — Pyramid of Doom</h1>
  <p class="section-subtitle">Visualisasi masalah callback bersarang dan solusinya</p>
</div>
<div class="content">
  <h2>Masalah: 3 Gudang, 3 Callback</h2>
  <p>Bayangkan kita harus mengecek stok di <strong>3 gudang</strong> secara berurutan. Dengan callback pattern, kodenya akan menjadi seperti ini:</p>

  <h3>Callback Hell — 3 Tingkat</h3>
  ${codeBlock('javascript','// callbackHell.js — Cek stok 3 gudang dengan callback bersarang\n\nfunction cekStokGudang(idGudang, callback) {\n  console.log("Cek stok gudang " + idGudang + "...");\n  setTimeout(function() {\n    var data = { gudang: idGudang, stok: Math.floor(Math.random() * 100) };\n    callback(null, data);\n  }, 1000);\n}\n\nconsole.log("Mulai pengecekan...");\n\n// Callback Hell dimulai!\ncekStokGudang(1, function(err, gudang1) {\n  if (err) { console.log("Error:", err); return; }\n  console.log("Gudang 1:", gudang1.stok, "unit");\n  \n  // Bersarang level 2\n  cekStokGudang(2, function(err, gudang2) {\n    if (err) { console.log("Error:", err); return; }\n    console.log("Gudang 2:", gudang2.stok, "unit");\n    \n    // Bersarang level 3 — mulai terlihat mengerikan\n    cekStokGudang(3, function(err, gudang3) {\n      if (err) { console.log("Error:", err); return; }\n      console.log("Gudang 3:", gudang3.stok, "unit");\n      \n      var total = gudang1.stok + gudang2.stok + gudang3.stok;\n      console.log("Total stok:", total, "unit");\n    });\n  });\n});')}

  ${codeBlock('bash','node callbackHell.js','Mulai pengecekan...\nCek stok gudang 1...\nGudang 1: 45 unit\nCek stok gudang 2...\nGudang 2: 72 unit\nCek stok gudang 3...\nGudang 3: 31 unit\nTotal stok: 148 unit','Output callback hell')}

  <h3>Masalah dengan Callback Hell</h3>
  <ul>
    <li><strong>Menyulitkan pembacaan</strong> — kode membentuk piramida ke kanan (pyramid of doom)</li>
    <li><strong>Error handling berulang</strong> — harus cek error di setiap level</li>
    <li><strong>Sulit diubah</strong> — mengubah urutan operasi membutuhkan perubahan besar</li>
    <li><strong>Debugging sulit</strong> — stack trace tidak jelas asalnya</li>
  </ul>

  <h3>Side-by-Side: Callback Hell vs Promise Chain</h3>
  <p>Perhatikan perbedaan struktur kode di bawah — kiri callback yang bersarang, kanan Promise yang rata:</p>

  ${sideBySide(
    'Callback Hell (Piramida)',
    'cekStok(1, function(err, a) {\n  if (err) return;\n  console.log(a);\n\n  cekStok(2, function(err, b) {\n    if (err) return;\n    console.log(b);\n\n    cekStok(3, function(err, c) {\n      if (err) return;\n      console.log(c);\n\n      console.log("Selesai");\n    });\n  });\n});',
    'Promise Chain (Rata)',
    'cekStok(1)\n  .then(function(a) {\n    console.log(a);\n    return cekStok(2);\n  })\n  .then(function(b) {\n    console.log(b);\n    return cekStok(3);\n  })\n  .then(function(c) {\n    console.log(c);\n    console.log("Selesai");\n  })\n  .catch(function(err) {\n    console.log(err);\n  });'
  )}

  <p>Di sebelah kiri, kode menjorok ke dalam setiap kali ada callback baru — membentuk piramida. Di sebelah kanan, Promise chain menjaga kode tetap rata dan mudah dibaca.</p>

  ${callout('warning','Pyramid of Doom','Callback hell juga disebut "Pyramid of Doom" karena bentuk indentasi yang terus melebar ke kanan. Semakin banyak callback bersarang, semakin sulit kode dibaca. Jika ada 5-6 level callback, kode menjadi hampir tidak terpelihara.')}

  ${quiz('q3b','Apa masalah utama dari callback hell?',['Kode berjalan terlalu lambat','Kode sulit dibaca karena indentasi bersarang (pyramid of doom)','Callback tidak bisa menerima parameter','Memory leak'],1,'Callback hell membuat kode sulit dibaca karena setiap callback baru menambah level indentasi, membentuk piramida ke kanan yang sulit dipelihara.')}
</div>`;

CONTENT['m3-c'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#7C3AED">Module 3 · Section C</span>
  <h1 class="section-title">Promises — Solusi untuk Async</h1>
  <p class="section-subtitle">Menulis kode asynchronous yang bersih dengan Promise</p>
</div>
<div class="content">
  <h2>Apa itu Promise?</h2>
  <p><strong>Promise</strong> adalah objek yang merepresentasikan hasil dari operasi asynchronous yang belum selesai — "janji" bahwa akan ada hasil di masa depan.</p>
  <p>Promise memiliki 3 status:</p>
  <ul>
    <li><strong>Pending</strong> — operasi masih berjalan</li>
    <li><strong>Fulfilled</strong> — operasi berhasil (resolve)</li>
    <li><strong>Rejected</strong> — operasi gagal (reject)</li>
  </ul>

  <h3>Membuat Promise</h3>
  ${codeBlock('javascript','// Membuat Promise manual\nfunction cekStokPromise(idGudang) {\n  return new Promise(function(resolve, reject) {\n    console.log("Cek stok gudang " + idGudang + "...");\n    \n    setTimeout(function() {\n      var stok = Math.floor(Math.random() * 100);\n      \n      if (stok > 0) {\n        // Berhasil — panggil resolve\n        resolve({ gudang: idGudang, stok: stok });\n      } else {\n        // Gagal — panggil reject\n        reject("Gudang " + idGudang + " kosong!");\n      }\n    }, 1000);\n  });\n}')}

  <h3>Menggunakan Promise dengan .then() dan .catch()</h3>
  ${codeBlock('javascript','// Menggunakan Promise\ncekStokPromise(1)\n  .then(function(hasil) {\n    console.log("Gudang 1:", hasil.stok, "unit");\n    return cekStokPromise(2); // chain ke Promise berikutnya\n  })\n  .then(function(hasil) {\n    console.log("Gudang 2:", hasil.stok, "unit");\n    return cekStokPromise(3);\n  })\n  .then(function(hasil) {\n    console.log("Gudang 3:", hasil.stok, "unit");\n    console.log("Semua gudang terverifikasi!");\n  })\n  .catch(function(error) {\n    // SATU catch untuk SEMUA error\n    console.log("Terjadi error:", error);\n  });')}

  ${codeBlock('bash','node promiseChain.js','Cek stok gudang 1...\nGudang 1: 45 unit\nCek stok gudang 2...\nGudang 2: 72 unit\nCek stok gudang 3...\nGudang 3: 31 unit\nSemua gudang terverifikasi!','Output Promise chain')}

  <h3>Promise.all() — Eksekusi Paralel</h3>
  <p>Jika ketiga gudang tidak tergantung satu sama lain, kita bisa mengeceknya <strong>bersamaan</strong> dengan <code>Promise.all()</code>:</p>
  ${codeBlock('javascript','// Promise.all — eksekusi paralel\nvar janji1 = cekStokPromise(1);\nvar janji2 = cekStokPromise(2);\nvar janji3 = cekStokPromise(3);\n\nPromise.all([janji1, janji2, janji3])\n  .then(function(hasilArray) {\n    // hasilArray = [hasil1, hasil2, hasil3]\n    var total = 0;\n    hasilArray.forEach(function(h) {\n      console.log("Gudang " + h.gudang + ": " + h.stok + " unit");\n      total += h.stok;\n    });\n    console.log("Total stok (parallel):", total, "unit");\n  })\n  .catch(function(err) {\n    console.log("Salah satu gudang error:", err);\n  });')}

  ${codeBlock('bash','node promiseAll.js','Cek stok gudang 1...\nCek stok gudang 2...\nCek stok gudang 3...\n(ketiga cek berjalan paralel, selesai ~1 detik)\nGudang 1: 45 unit\nGudang 2: 72 unit\nGudang 3: 31 unit\nTotal stok (parallel): 148 unit','Output Promise.all — paralel')}

  ${callout('info','Seri vs Paralel','Dengan Promise chain (serial), total waktu = jumlah semua delay (3 detik). Dengan Promise.all (paralel), total waktu = delay terlama (~1 detik). Untuk pengecekan gudang yang independen, Promise.all jauh lebih efisien!')}

  <h3>Event Loop Timeline</h3>
  <p>Diagram di bawah menunjukkan bagaimana Event Loop bekerja saat mengeksekusi kode asynchronous:</p>
  ${diagramSvg(DIAGRAM_EVENTLOOP,'Gambar 3: Event Loop — Call Stack mengeksekusi kode, setTimeout dikirim ke Web APIs, callback masuk ke Callback Queue, Event Loop memindahkannya ke Call Stack saat kosong.')}

  ${callout('instructor','Catatan Instruktur','Visualisasi Event Loop sangat penting. Analogikan: Call Stack adalah >meja kerja< Anda (hanya bisa kerjakan 1 tugas), Web APIs adalah >asisten< yang membantu tugas async, Callback Queue adalah >antrian< hasil tugas, dan Event Loop adalah >manager< yang memindahkan dari antrian ke meja kerja saat meja kosong.')}

  ${quiz('q3c','Apa perbedaan utama Promise chain (serial) dengan Promise.all()?',['Tidak ada perbedaan — hasilnya sama','Promise chain menjalankan satu per satu (serial), Promise.all menjalankan semua bersamaan (paralel)','Promise.all lebih lambat dari Promise chain','Promise chain hanya bisa untuk 2 Promise'],1,'Promise chain menjalankan Promise secara berurutan (tunggu satu selesai, baru mulai berikutnya). Promise.all menjalankan semua Promise secara paralel — selesai ketika semua selesai.')}
</div>`;

CONTENT['m3-d'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#7C3AED">Module 3 · Section D</span>
  <h1 class="section-title">Guided Lab: Simulasi Pengecekan Stok Multi-Gudang</h1>
  <p class="section-subtitle">Membangun sistem pengecekan stok 3 gudang dengan Promise</p>
</div>
<div class="content">
  <p>Pada lab ini, kita akan membangun sistem simulasi yang mengecek stok di 3 gudang berbeda, menggabungkan hasilnya, dan menampilkan laporan.</p>

  <div class="step-tracker" id="st-m3-d"></div>

  ${stepCard(1,'Buat Struktur Proyek',`
    ${codeBlock('bash','mkdir multi-gudang-check\ncd multi-gudang-check\nnpm init -y','','Inisialisasi proyek')}
  `,true)}

  ${stepCard(2,'Buat Modul Gudang',`
    <p>Buat file <code>gudang.js</code> — berisi data dan fungsi simulasi untuk setiap gudang:</p>
    ${codeBlock('javascript','// gudang.js — Data dan fungsi simulasi 3 gudang\n\n// Data stok awal tiap gudang\nvar dataGudang = {\n  1: { nama: "Gudang Jakarta", lokasi: "Jakarta Utara", stok: 120 },\n  2: { nama: "Gudang Surabaya", lokasi: "Surabaya Timur", stok: 85 },\n  3: { nama: "Gudang Medan", lokasi: "Medan Barat", stok: 200 }\n};\n\n/**\n * Simulasi cek stok gudang dengan delay random\n * Mengembalikan Promise\n */\nfunction cekGudang(idGudang) {\n  return new Promise(function(resolve, reject) {\n    var gudang = dataGudang[idGudang];\n    \n    if (!gudang) {\n      reject("Gudang " + idGudang + " tidak ditemukan!");\n      return;\n    }\n    \n    // Simulasi delay jaringan (500-1500ms)\n    var delay = 500 + Math.floor(Math.random() * 1000);\n    \n    console.log("[" + new Date().toLocaleTimeString() + "] Menghubungi " + gudang.nama + "...");\n    \n    setTimeout(function() {\n      // 10% kemungkinan timeout\n      if (Math.random() < 0.1) {\n        reject("TIMEOUT: " + gudang.nama + " tidak merespons!");\n        return;\n      }\n      \n      resolve({\n        id: idGudang,\n        nama: gudang.nama,\n        lokasi: gudang.lokasi,\n        stok: gudang.stok,\n        delay: delay\n      });\n    }, delay);\n  });\n}\n\nmodule.exports = { cekGudang, dataGudang };')}
  `)}

  ${stepCard(3,'Buat Program Serial',`
    <p>Buat file <code>cekSerial.js</code> — mengecek gudang satu per satu dengan Promise chain:</p>
    ${codeBlock('javascript','// cekSerial.js — Cek gudang berurutan (serial)\n\nconst { cekGudang } = require(\'./gudang\');\n\nconsole.log("=== SERIAL CHECK: MULAI ===\\\\n");\nvar waktuMulai = Date.now();\n\ncekGudang(1)\n  .then(function(hasil) {\n    console.log("  -> " + hasil.nama + ": " + hasil.stok + " unit (" + hasil.delay + "ms)");\n    return cekGudang(2);\n  })\n  .then(function(hasil) {\n    console.log("  -> " + hasil.nama + ": " + hasil.stok + " unit (" + hasil.delay + "ms)");\n    return cekGudang(3);\n  })\n  .then(function(hasil) {\n    console.log("  -> " + hasil.nama + ": " + hasil.stok + " unit (" + hasil.delay + "ms)");\n    var durasi = Date.now() - waktuMulai;\n    console.log("\\\\n=== SELESAI (serial) dalam " + durasi + "ms ===");\n  })\n  .catch(function(err) {\n    console.log("ERROR:", err);\n  });')}
  `)}

  ${stepCard(4,'Buat Program Paralel',`
    <p>Buat file <code>cekParalel.js</code> — mengecek semua gudang bersamaan dengan Promise.all:</p>
    ${codeBlock('javascript','// cekParalel.js — Cek gudang bersamaan (paralel)\n\nconst { cekGudang } = require(\'./gudang\');\n\nconsole.log("=== PARALEL CHECK: MULAI ===\\\\n");\nvar waktuMulai = Date.now();\n\n// Jalankan semua Promise bersamaan\nPromise.all([\n  cekGudang(1),\n  cekGudang(2),\n  cekGudang(3)\n])\n  .then(function(hasilArray) {\n    hasilArray.forEach(function(hasil) {\n      console.log("  -> " + hasil.nama + ": " + hasil.stok + " unit (" + hasil.delay + "ms)");\n    });\n    \n    var totalStok = 0;\n    hasilArray.forEach(function(h) { totalStok += h.stok; });\n    \n    var durasi = Date.now() - waktuMulai;\n    console.log("\\\\nTotal stok: " + totalStok + " unit");\n    console.log("=== SELESAI (paralel) dalam " + durasi + "ms ===");\n  })\n  .catch(function(err) {\n    console.log("Salah satu gudang gagal:", err);\n  });')}
  `)}

  ${stepCard(5,'Bandingkan Hasil',`
    <p>Jalankan kedua program dan bandingkan waktunya:</p>
    ${codeBlock('bash','node cekSerial.js','=== SERIAL CHECK: MULAI ===\n\n[10:00:01] Menghubungi Gudang Jakarta...\n  -> Gudang Jakarta: 120 unit (800ms)\n[10:00:02] Menghubungi Gudang Surabaya...\n  -> Gudang Surabaya: 85 unit (600ms)\n[10:00:03] Menghubungi Gudang Medan...\n  -> Gudang Medan: 200 unit (900ms)\n\n=== SELESAI (serial) dalam 2300ms ===','Output serial — 3 langkah bertahap')}
    ${codeBlock('bash','node cekParalel.js','=== PARALEL CHECK: MULAI ===\n\n[10:00:01] Menghubungi Gudang Jakarta...\n[10:00:01] Menghubungi Gudang Surabaya...\n[10:00:01] Menghubungi Gudang Medan...\n  -> Gudang Surabaya: 85 unit (600ms)\n  -> Gudang Jakarta: 120 unit (800ms)\n  -> Gudang Medan: 200 unit (900ms)\n\nTotal stok: 405 unit\n=== SELESAI (paralel) dalam 920ms ===','Output paralel — semua berjalan bersamaan')}
    <p>Perhatikan perbedaan waktu! Serial membutuhkan jumlah total delay (~2300ms), sementara paralel hanya membutuhkan delay terlama (~900ms).</p>
  `)}

  <div style="margin-top:24px">
    ${callout('info','Insight Penting','Serial vs Paralel bukan soal "mana lebih baik". Keduanya punya tempat masing-masing:\n• <strong>Serial</strong> — ketika langkah berikutnya membutuhkan data dari langkah sebelumnya\n• <strong>Paralel</strong> — ketika operasi independen dan kita hanya butuh semua hasil')}
  </div>

  ${quiz('q3d','Jika cekGudang(1) butuh 200ms, cekGudang(2) butuh 300ms, cekGudang(3) butuh 100ms, berapa total waktu minimal untuk Promise.all?',['600ms','300ms','200ms','100ms'],1,'Promise.all menunggu Promise terlama. Jadi total waktu = max(200, 300, 100) = 300ms.')}
</div>`;

CONTENT['m3-e'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#7C3AED">Module 3 · Section E</span>
  <h1 class="section-title">Take-Home: Persetujuan Work Order Berurutan</h1>
  <p class="section-subtitle">Tugas mandiri — sistem persetujuan work order production</p>
</div>
<div class="content">
  <h2>Latar Belakang</h2>
  <p>Di PT. Nafisa Manufacturing, setiap <strong>Work Order (WO)</strong> untuk memulai produksi harus mendapatkan persetujuan dari <strong>3 level manajemen</strong> secara berurutan:</p>
  <ol>
    <li><strong>Supervisor Produksi</strong> — memeriksa ketersediaan bahan baku</li>
    <li><strong>Manajer Gudang</strong> — memeriksa stok dan mengalokasikan barang</li>
    <li><strong>Direktur Operasional</strong> — persetujuan final untuk produksi</li>
  </ol>
  <p>Setiap level membutuhkan waktu simulasi (1-2 detik) dan bisa menyetujui atau menolak WO.</p>

  <h2>Tugas</h2>
  <p>Buat sistem persetujuan Work Order menggunakan <strong>Promise chain</strong> dengan ketentuan:</p>

  <h3>Struktur File</h3>
  <ul>
    <li><code>workflow.js</code> — modul yang berisi fungsi-fungsi persetujuan tiap level</li>
    <li><code>approval.js</code> — program utama yang menjalankan alur persetujuan</li>
  </ul>

  <h3>Modul workflow.js</h3>
  ${codeBlock('javascript','// workflow.js — Alur persetujuan work order\n\n/**\n * Simulasi persetujuan Supervisor\n * Mengecek ketersediaan bahan baku\n */\nfunction persetujuanSupervisor(wo) {\n  return new Promise(function(resolve, reject) {\n    console.log("[Supervisor] Memeriksa WO: " + wo.id);\n    \n    setTimeout(function() {\n      if (!wo.bahanBaku || wo.bahanBaku.length === 0) {\n        reject("[Supervisor] WO ditolak: Tidak ada daftar bahan baku!");\n        return;\n      }\n      \n      wo.status = "disetujui-supervisor";\n      wo.catatan = wo.catatan || [];\n      wo.catatan.push("Disetujui Supervisor: Bahan baku tersedia");\n      console.log("[Supervisor] WO " + wo.id + " disetujui.");\n      resolve(wo);\n    }, 1000);\n  });\n}\n\n/**\n * Simulasi persetujuan Manajer Gudang\n * Mengalokasikan stok untuk produksi\n */\nfunction persetujuanManajerGudang(wo) {\n  return new Promise(function(resolve, reject) {\n    console.log("[Manajer Gudang] Mengalokasikan stok untuk WO: " + wo.id);\n    \n    setTimeout(function() {\n      // 20% kemungkinan stok tidak cukup\n      if (Math.random() < 0.2) {\n        reject("[Manajer Gudang] WO ditolak: Stok tidak mencukupi untuk WO " + wo.id);\n        return;\n      }\n      \n      wo.status = "disetujui-manajer";\n      wo.catatan.push("Disetujui Manajer Gudang: Stok dialokasikan");\n      console.log("[Manajer Gudang] WO " + wo.id + " disetujui.");\n      resolve(wo);\n    }, 1500);\n  });\n}\n\n/**\n * Simulasi persetujuan Direktur\n * Persetujuan final\n */\nfunction persetujuanDirektur(wo) {\n  return new Promise(function(resolve, reject) {\n    console.log("[Direktur] Meninjau WO: " + wo.id);\n    \n    setTimeout(function() {\n      wo.status = "DISETUJUI";\n      wo.catatan.push("Disetujui Direktur: Produksi dapat dimulai");\n      wo.tanggalDisetujui = new Date().toISOString();\n      console.log("[Direktur] WO " + wo.id + " DISETUJUI!");\n      resolve(wo);\n    }, 800);\n  });\n}\n\nmodule.exports = {\n  persetujuanSupervisor,\n  persetujuanManajerGudang,\n  persetujuanDirektur\n};')}

  <h3>Program approval.js</h3>
  ${codeBlock('javascript','// approval.js — Menjalankan alur persetujuan\n\nconst {\n  persetujuanSupervisor,\n  persetujuanManajerGudang,\n  persetujuanDirektur\n} = require(\'./workflow\');\n\n// Data Work Order\nvar wo = {\n  id: "WO-2026-001",\n  produk: "Panel Kontrol Elektrik",\n  jumlah: 100,\n  bahanBaku: ["Mur M8 x400", "Baut M6 x400", "Ring Pengunci x200", "PCB Unit x100"],\n  status: "baru",\n  catatan: []\n};\n\nconsole.log("=========================================");\nconsole.log("  SISTEM PERSETUJUAN WORK ORDER");\nconsole.log("  PT. NAFISA MANUFACTURING");\nconsole.log("=========================================\\\\n");\nconsole.log("WO: " + wo.id + " — " + wo.produk);\nconsole.log("Jumlah: " + wo.jumlah + " unit");\nconsole.log("Bahan: " + wo.bahanBaku.join(", "));\nconsole.log("");\n\nvar waktuMulai = Date.now();\n\n// Promise chain — 3 level persetujuan berurutan\npersetujuanSupervisor(wo)\n  .then(function(woUpdated) {\n    return persetujuanManajerGudang(woUpdated);\n  })\n  .then(function(woUpdated) {\n    return persetujuanDirektur(woUpdated);\n  })\n  .then(function(woFinal) {\n    var durasi = Date.now() - waktuMulai;\n    console.log("");\n    console.log("=========================================");\n    console.log("  HASIL: WORK ORDER DISETUJUI");\n    console.log("=========================================");\n    console.log("Status akhir: " + woFinal.status.toUpperCase());\n    console.log("Waktu proses: " + durasi + "ms");\n    console.log("Riwayat persetujuan:");\n    woFinal.catatan.forEach(function(c, i) {\n      console.log("  " + (i+1) + ". " + c);\n    });\n  })\n  .catch(function(error) {\n    console.log("");\n    console.log("=========================================");\n    console.log("  HASIL: WORK ORDER DITOLAK");\n    console.log("=========================================");\n    console.log("Alasan: " + error);\n  });')}

  ${codeBlock('bash','node approval.js','=========================================\n  SISTEM PERSETUJUAN WORK ORDER\n  PT. NAFISA MANUFACTURING\n=========================================\n\nWO: WO-2026-001 - Panel Kontrol Elektrik\nJumlah: 100 unit\nBahan: Mur M8 x400, Baut M6 x400, Ring Pengunci x200, PCB Unit x100\n\n[Supervisor] Memeriksa WO: WO-2026-001\n[Supervisor] WO WO-2026-001 disetujui.\n[Manajer Gudang] Mengalokasikan stok untuk WO: WO-2026-001\n[Manajer Gudang] WO WO-2026-001 disetujui.\n[Direktur] Meninjau WO: WO-2026-001\n[Direktur] WO WO-2026-001 DISETUJUI!\n\n=========================================\n  HASIL: WORK ORDER DISETUJUI\n=========================================\nStatus akhir: DISETUJUI\nWaktu proses: 3300ms\nRiwayat persetujuan:\n  1. Disetujui Supervisor: Bahan baku tersedia\n  2. Disetujui Manajer Gudang: Stok dialokasikan\n  3. Disetujui Direktur: Produksi dapat dimulai','Output sistem persetujuan work order')}

  <h2>Kriteria Penilaian</h2>
  <ul>
    <li>✅ Semua fungsi mengembalikan Promise</li>
    <li>✅ Promise chain berjalan berurutan: Supervisor → Manajer → Direktur</li>
    <li>✅ Setiap level punya logika validasi (bisa reject)</li>
    <li>✅ Error dari satu level menghentikan seluruh alur (catch)</li>
    <li>✅ Output laporan final rapi (disetujui/ditolak + alasan)</li>
    <li style="list-style:none"><br><strong>⭐ Bonus:</strong> Gunakan Promise.all() untuk memproses MULTIPLE work order secara paralel, lalu Promise chain untuk approval masing-masing WO secara serial. Contoh: 3 WO berjalan paralel, tiap WO melalui 3 level approval serial.</li>
  </ul>

  <h2>Cara Pengumpulan</h2>
  <p>Kumpulkan folder <code>multi-gudang-check/</code> (dari Guided Lab) dan folder <code>work-order-approval/</code> (tugas ini) dalam satu ZIP. Sertakan screenshot hasil menjalankan <code>node approval.js</code> baik yang sukses maupun yang ditolak.</p>

  ${callout('instructor','Catatan Instruktur','Tugas ini mensimulasikan workflow approval dunia nyata. Di aplikasi ERP sesungguhnya, tiap level persetujuan akan melibatkan user berbeda, log di database, dan notifikasi email. Konsep Promise chain yang dipelajari di sini adalah fondasi untuk memahami async/await di pertemuan berikutnya.')}

  ${callout('danger','Kesalahan Umum: Lupa Return Promise','Saat melakukan Promise chain, setiap .then() HARUS mengembalikan Promise baru (return cekGudang(2)). Jika lupa return, .then() berikutnya akan menerima undefined, bukan hasil Promise. Ini adalah bug paling umum saat belajar Promise — selalu periksa apakah Anda sudah return Promise di setiap .then()!')}
`;

/* ═══════════════════════════════════════════
   NAFISA BOOTCAMP — Module 4 Content
   ═══════════════════════════════════════════ */

// ── MODULE 4 CONTENT ──
/* ═══════════════════════════════════════════
   NAFISA BOOTCAMP — Module 4 Content
   ═══════════════════════════════════════════ */

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

// ── MODULE 5 CONTENT ──
CONTENT['m5-plan'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#F59E0B">Module 5</span>
  <h1 class="section-title">Lesson Plan — Express Routing, Middleware &amp; REST API</h1>
  <p class="section-subtitle">Pertemuan 5 — Arsitektur REST API dengan Express.js</p>
</div>
<div class="content">
  <h2>Tujuan Pembelajaran</h2>
  <p>Setelah menyelesaikan modul ini, peserta mampu:</p>
  <ul>
    <li>Memahami konsep dasar arsitektur REST API</li>
    <li>Menggunakan HTTP Methods (GET, POST, PUT, DELETE) dengan benar</li>
    <li>Membuat routing dinamis dengan route parameters dan query strings di Express.js</li>
    <li>Memahami dan membuat custom Middleware untuk manipulasi request dan response</li>
    <li>Membangun REST API CRUD komprehensif untuk sistem manajemen barang</li>
  </ul>
  <h2>Alokasi Waktu (120 menit)</h2>
  <table>
    <tr><th>Durasi</th><th>Kegiatan</th></tr>
    <tr><td>20 menit</td><td>Konsep REST API — resource, verbs, status codes</td></tr>
    <tr><td>25 menit</td><td>Express Routing — params, query, response formatting</td></tr>
    <tr><td>25 menit</td><td>Express Middleware — next(), request logging, error handling</td></tr>
    <tr><td>40 menit</td><td>Guided Lab: Membangun REST API Gudang dengan Middleware</td></tr>
    <tr><td>10 menit</td><td>Diskusi &amp; Take-Home Assignment</td></tr>
  </table>
  <h2>Studi Kasus ERP</h2>
  <p>Di modul sebelumnya kita telah membuat event-driven warehouse sederhana. Sekarang, kita akan merombaknya menjadi sistem yang mengikuti standar <strong>RESTful API</strong>. Kita juga akan mengamankan API kita menggunakan middleware untuk simulasi autentikasi sederhana, sebuah langkah penting untuk keamanan sistem informasi manajemen seperti ERP.</p>
</div>`;

CONTENT['m5-a'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#F59E0B">Module 5 · Section A</span>
  <h1 class="section-title">Express Routing: Route Parameters & Query Strings</h1>
  <p class="section-subtitle">Mengekstrak data dari URL</p>
</div>
<div class="content">
  <h2>Routing Dinamis di Express</h2>
  <p>Sebelum menggunakan Express, routing di Node.js murni sangat rumit karena kita harus membedah URL (seperti <code>/api/items/BRG-001</code>) secara manual. Express menyederhanakan ini:</p>
  ${sideBySide('Vanilla Node.js HTTP','const http = require("http");\\nhttp.createServer((req, res) => {\\n  if (req.url.startsWith("/api/items/")) {\\n    const id = req.url.split("/")[3];\\n    res.end("Item: " + id);\\n  }\\n});','Express.js','const express = require("express");\\nconst app = express();\\n\\napp.get("/api/items/:id", (req, res) => {\\n  const id = req.params.id;\\n  res.send("Item: " + id);\\n});')}
  
  <h3>Route Parameters (req.params)</h3>
  <p>Route params digunakan untuk menangkap nilai langsung dari segmen URL, biasanya untuk mengidentifikasi <em>resource</em> spesifik. Parameter diawali dengan titik dua (<code>:</code>).</p>
  ${codeBlock('javascript','app.get(\'/api/items/:id\', (req, res) => {\n  // URL: /api/items/BRG-001\n  const itemId = req.params.id; // "BRG-001"\n  res.json({ message: "Mencari barang " + itemId });\n});\n\n// Multiple parameters\napp.get(\'/api/warehouses/:warehouseId/items/:itemId\', (req, res) => {\n  // URL: /api/warehouses/WH-A/items/BRG-001\n  const { warehouseId, itemId } = req.params;\n  res.json({ warehouseId, itemId });\n});')}

  <h3>Query Strings (req.query)</h3>
  <p>Query strings dikirim setelah tanda tanya <code>?</code> pada URL. Biasanya digunakan untuk <em>filtering</em>, <em>sorting</em>, atau <em>pagination</em>.</p>
  ${codeBlock('javascript','app.get(\'/api/items\', (req, res) => {\n  // URL: /api/items?category=hardware&sort=price_asc\n  const category = req.query.category; // "hardware"\n  const sortBy = req.query.sort; // "price_asc"\n  res.json({ filtering: category, sorting: sortBy });\n});')}

  ${callout('info','Best Practice','Gunakan <strong>params</strong> untuk mengidentifikasi "apa" yang sedang diakses (misal ID barang). Gunakan <strong>query</strong> untuk memodifikasi "bagaimana" resource itu ditampilkan (misal cari, filter, urutkan).')}

  ${quiz('q5a','Jika client mengakses endpoint dengan URL /api/users/88?role=admin, bagaimana kita mendapatkan angka 88 dan string admin di Express?',['req.body.id dan req.body.role','req.query.id dan req.params.role','req.params.id dan req.query.role','req.url.id dan req.url.role'],2,'88 berada di path sehingga dapat diakses via req.params (asumsi rutenya /api/users/:id), sementara role=admin ada setelah tanda tanya sehingga diakses via req.query.')}
</div>`;

CONTENT['m5-b'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#F59E0B">Module 5 · Section B</span>
  <h1 class="section-title">Express Middleware</h1>
  <p class="section-subtitle">Siklus hidup Request-Response</p>
</div>
<div class="content">
  <h2>Apa itu Middleware?</h2>
  <p>Middleware adalah fungsi yang memiliki akses ke objek request (<code>req</code>), objek response (<code>res</code>), dan fungsi middleware selanjutnya dalam siklus request-response (biasanya disebut <code>next</code>).</p>
  
  ${diagramSvg(DIAGRAMS.middlewareFlow, 'Gambar 1: Alur eksekusi Middleware di Express.js — request melewati rantai middleware sebelum mencapai route handler.')}

  <p>Middleware dapat digunakan untuk:</p>
  <ul>
    <li>Mengeksekusi kode apa pun (misal logging).</li>
    <li>Memodifikasi request dan response object.</li>
    <li>Mengakhiri siklus request-response (seperti block request yang tidak sah).</li>
    <li>Memanggil fungsi middleware selanjutnya dalam stack (dengan <code>next()</code>).</li>
  </ul>

  <h3>Membuat Custom Middleware</h3>
  ${codeBlock('javascript','const express = require(\'express\');\nconst app = express();\n\n// 1. Logger Middleware (Global)\nconst requestLogger = (req, res, next) => {\n  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);\n  next(); // Wajib dipanggil! Jika tidak, request akan hang\n};\napp.use(requestLogger);\n\n// 2. Auth Middleware (Spesifik Route)\nconst checkAuth = (req, res, next) => {\n  const token = req.headers.authorization;\n  if (token === \'secret-token\') {\n    next(); // Lolos, lanjut ke route handler\n  } else {\n    res.status(401).json({ error: \'Unauthorized\' }); // Akhiri siklus, jangan panggil next()\n  }\n};\n\napp.get(\'/api/secure-data\', checkAuth, (req, res) => {\n  res.json({ data: \'Informasi Rahasia ERP\' });\n});')}

  <h3>Built-in Middleware</h3>
  <p>Express memiliki beberapa middleware bawaan. Yang paling krusial untuk membuat REST API adalah body parser:</p>
  ${codeBlock('javascript','// Untuk mem-parsing application/json dari body request\napp.use(express.json());\n\n// Untuk mem-parsing application/x-www-form-urlencoded\napp.use(express.urlencoded({ extended: true }));')}

  ${callout('danger','Penting tentang next()','Jika sebuah middleware tidak mengakhiri request dengan mengirim respons (misal <code>res.send()</code> atau <code>res.json()</code>), ia <strong>harus</strong> memanggil <code>next()</code>. Jika lupa, aplikasi tidak akan pernah memberikan respons ke client (client akan loading terus sampai time out).')}

  ${quiz('q5b','Apa fungsi utama dari pemanggilan fungsi next() dalam sebuah middleware?',['Mengirim respons sukses (HTTP 200) secara otomatis','Menghentikan proses agar server tidak kepanasan','Memanggil dan meneruskan proses ke middleware atau route handler berikutnya','Me-refresh halaman web client'],2,'next() digunakan untuk memberi tahu Express bahwa middleware saat ini telah selesai dan eksekusi harus dilanjutkan ke middleware/route handler berikutnya.')}
</div>`;

CONTENT['m5-c'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#F59E0B">Module 5 · Section C</span>
  <h1 class="section-title">Konsep REST API</h1>
  <p class="section-subtitle">Mendesain API yang standar dan profesional</p>
</div>
<div class="content">
  <h2>Apa itu REST?</h2>
  <p><strong>REST (Representational State Transfer)</strong> adalah gaya arsitektur standar dalam pembuatan API. API yang mematuhi prinsip REST disebut sebagai <strong>RESTful API</strong>. REST bertindak sebagai jembatan yang menghubungkan client (browser/mobile) dengan server database secara terstandarisasi.</p>
  
  ${diagramSvg(DIAGRAMS.restApi, 'Gambar 2: Arsitektur REST API — memisahkan antarmuka (Client) dengan penyimpan data (Database) melalui lapisan Server HTTP.')}

  <h3>Prinsip Utama REST</h3>
  <ol>
    <li><strong>Client-Server:</strong> Frontend dan backend terpisah dan tidak bergantung pada implementasi satu sama lain.</li>
    <li><strong>Stateless:</strong> Setiap request dari client harus menyertakan semua informasi yang dibutuhkan. Server tidak menyimpan "sesi" dari client.</li>
    <li><strong>Resource-Based:</strong> Segala hal dipandang sebagai "sumber daya" (Resource) yang diidentifikasi oleh URI (misal <code>/items</code>).</li>
  </ol>

  <h3>HTTP Methods (Verbs)</h3>
  <p>REST API menggunakan HTTP verbs untuk menentukan aksi (CRUD) pada sebuah resource:</p>
  <table>
    <tr><th>Method</th><th>Operasi CRUD</th><th>Contoh URL</th><th>Deskripsi</th></tr>
    <tr><td><code>GET</code></td><td>Read</td><td><code>/api/items</code></td><td>Mendapatkan semua daftar barang</td></tr>
    <tr><td><code>GET</code></td><td>Read</td><td><code>/api/items/1</code></td><td>Mendapatkan detail barang dengan ID 1</td></tr>
    <tr><td><code>POST</code></td><td>Create</td><td><code>/api/items</code></td><td>Menambahkan barang baru</td></tr>
    <tr><td><code>PUT / PATCH</code></td><td>Update</td><td><code>/api/items/1</code></td><td>Memperbarui data barang dengan ID 1</td></tr>
    <tr><td><code>DELETE</code></td><td>Delete</td><td><code>/api/items/1</code></td><td>Menghapus barang dengan ID 1</td></tr>
  </table>

  <h3>HTTP Status Codes</h3>
  <p>Server juga harus mengembalikan kode status yang sesuai untuk mengindikasi hasil request:</p>
  <ul>
    <li><strong>2xx (Sukses):</strong> 200 OK (GET sukses), 201 Created (POST sukses), 204 No Content (DELETE sukses).</li>
    <li><strong>4xx (Kesalahan Client):</strong> 400 Bad Request (Data input salah), 401 Unauthorized (Belum login), 403 Forbidden, 404 Not Found (Resource tidak ada).</li>
    <li><strong>5xx (Kesalahan Server):</strong> 500 Internal Server Error, 503 Service Unavailable.</li>
  </ul>

  ${callout('warning','Penamaan URL yang Baik','Gunakan kata benda (noun) jamak, BUKAN kata kerja (verb). <br>✅ BENAR: <code>GET /api/items</code> <br>❌ SALAH: <code>GET /api/getItems</code>')}
</div>`;

CONTENT['m5-d'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#F59E0B">Module 5 · Section D</span>
  <h1 class="section-title">Guided Lab: Membangun REST API Gudang</h1>
  <p class="section-subtitle">Praktik membuat CRUD RESTful API dengan Middleware</p>
</div>
<div class="content">
  <p>Pada lab ini, kita akan membangun REST API lengkap untuk mengelola daftar barang (item) menggunakan memori array sementara. Kita juga mengimplementasikan Middleware autentikasi.</p>

  <div class="step-tracker" id="st-m5-d"></div>

  ${stepCard(1,'Setup Project',`
    <p>Buat folder baru dan install express:</p>
    ${codeBlock('bash','mkdir erp-rest-api\ncd erp-rest-api\nnpm init -y\nnpm install express')}
  `,true)}

  ${stepCard(2,'Buat Basic Server & Middleware',`
    <p>Buat file <code>app.js</code>:</p>
    ${codeBlock('javascript','const express = require(\'express\');\nconst app = express();\n\n// Built-in middleware untuk parsing JSON\napp.use(express.json());\n\n// Custom Logger Middleware\napp.use((req, res, next) => {\n  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);\n  next();\n});\n\n// Custom Auth Middleware\nconst authenticate = (req, res, next) => {\n  const token = req.header(\'X-API-Key\');\n  if (token === \'erp123\') {\n    next();\n  } else {\n    res.status(401).json({ error: \'Akses Ditolak. API Key tidak valid.\' });\n  }\n};\n\napp.listen(3000, () => console.log(\'REST API berjalan di port 3000\'));')}
  `)}

  ${stepCard(3,'Implementasi GET dan POST (Create & Read)',`
    <p>Tambahkan array sementara dan routing berikut di <code>app.js</code> (sebelum app.listen):</p>
    ${codeBlock('javascript','// Data sementara\nlet inventory = [\n  { id: \'BRG-001\', name: \'Mur M8\', stock: 100 },\n  { id: \'BRG-002\', name: \'Baut M6\', stock: 50 }\n];\n\n// GET - Ambil semua data (bisa filter via query)\napp.get(\'/api/items\', authenticate, (req, res) => {\n  const { search } = req.query;\n  let results = inventory;\n  \n  if (search) {\n    results = inventory.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));\n  }\n  res.status(200).json(results);\n});\n\n// GET - Ambil satu data berdasarkan ID (Route Params)\napp.get(\'/api/items/:id\', authenticate, (req, res) => {\n  const item = inventory.find(i => i.id === req.params.id);\n  if (!item) {\n    return res.status(404).json({ error: \'Barang tidak ditemukan\' });\n  }\n  res.status(200).json(item);\n});\n\n// POST - Tambah data baru\napp.post(\'/api/items\', authenticate, (req, res) => {\n  const { id, name, stock } = req.body;\n  if (!id || !name || typeof stock !== \'number\') {\n    return res.status(400).json({ error: \'Data tidak valid\' });\n  }\n  \n  const newItem = { id, name, stock };\n  inventory.push(newItem);\n  res.status(201).json({ message: \'Barang ditambahkan\', item: newItem });\n});')}
  `)}

  ${stepCard(4,'Uji Coba dengan Client (cURL / Postman)',`
    <p>Jalankan server (<code>node app.js</code>) dan uji API tersebut. Pastikan menyertakan Header <code>X-API-Key: erp123</code>!</p>
    ${codeBlock('bash','// Test Auth (Akan Gagal)\ncurl http://localhost:3000/api/items\n\n// Test GET Semua Items (Sukses)\ncurl -H "X-API-Key: erp123" http://localhost:3000/api/items\n\n// Test GET dengan Query\ncurl -H "X-API-Key: erp123" "http://localhost:3000/api/items?search=Baut"\n\n// Test POST Data\ncurl -X POST -H "Content-Type: application/json" -H "X-API-Key: erp123" -d \'{"id":"BRG-003", "name":"Plat Besi", "stock":30}\' http://localhost:3000/api/items')}
  `)}

  ${callout('info','Catatan Praktik','Perhatikan bagaimana setiap endpoint memiliki tanggung jawab dan URL yang seragam (<code>/api/items</code>). Ini membuat API sangat mudah digunakan oleh Frontend developer (seperti React / Vue).')}
</div>`;

CONTENT['m5-e'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#F59E0B">Module 5 · Section E</span>
  <h1 class="section-title">Take-Home: Lengkapi CRUD REST API Gudang</h1>
  <p class="section-subtitle">Mengimplementasikan UPDATE dan DELETE</p>
</div>
<div class="content">
  <h2>Tugas</h2>
  <p>Lanjutkan kode dari Guided Lab sebelumnya. Sistem saat ini baru memiliki fitur Create (POST) dan Read (GET). Tugas Anda adalah menyempurnakan API dengan fitur Update dan Delete.</p>
  
  <h3>1. Implementasi PUT (Update Data)</h3>
  <p>Buat route handler untuk <code>PUT /api/items/:id</code> yang melakukan hal berikut:</p>
  <ul>
    <li>Mencari barang di array <code>inventory</code> berdasarkan <code>req.params.id</code>.</li>
    <li>Jika tidak ada, kembalikan status 404.</li>
    <li>Jika ada, update <code>name</code> dan <code>stock</code> berdasarkan <code>req.body</code>.</li>
    <li>Kembalikan objek yang sudah di-update dengan status 200.</li>
  </ul>

  <h3>2. Implementasi DELETE (Hapus Data)</h3>
  <p>Buat route handler untuk <code>DELETE /api/items/:id</code> yang melakukan hal berikut:</p>
  <ul>
    <li>Mencari index barang di array.</li>
    <li>Jika tidak ditemukan, kembalikan 404.</li>
    <li>Jika ditemukan, hapus dari array menggunakan <code>Array.splice()</code> atau <code>Array.filter()</code>.</li>
    <li>Kembalikan message sukses dengan status 200.</li>
  </ul>

  <h3>Contoh Interaksi</h3>
  ${codeBlock('bash','// Update Data\ncurl -X PUT -H "Content-Type: application/json" -H "X-API-Key: erp123" -d \'{"name":"Mur M8 Baru", "stock":250}\' http://localhost:3000/api/items/BRG-001\n\n// Delete Data\ncurl -X DELETE -H "X-API-Key: erp123" http://localhost:3000/api/items/BRG-002')}

  <h2>Kriteria Penilaian</h2>
  <ul>
    <li>PUT endpoint dapat mengupdate objek dengan benar</li>
    <li>DELETE endpoint menghapus data dari array dengan sukses</li>
    <li>Endpoint menangani kasus di mana ID tidak ditemukan (404)</li>
    <li>API Key Middleware tetap berfungsi pada endpoint baru</li>
  </ul>

  <h2>Cara Pengumpulan</h2>
  <p>Simpan kode lengkap Anda di file <code>app.js</code>, kompres, dan upload. Sertakan screenshot atau text output hasil curl / postman Anda.</p>
</div>`;

// ── MODULE 6 CONTENT ──
CONTENT['m6-plan'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#14B8A6">Module 6</span>
  <h1 class="section-title">Lesson Plan — Praktik Bangun REST API CRUD</h1>
  <p class="section-subtitle">Pertemuan 6 — Refactoring ke Model-Controller Pattern</p>
</div>
<div class="content">
  <h2>Tujuan Pembelajaran</h2>
  <p>Setelah menyelesaikan modul ini, peserta mampu:</p>
  <ul>
    <li>Memisahkan logika bisnis (Controller) dari definisi rute (Routes).</li>
    <li>Menstrukturkan folder proyek backend yang skalabel (Folder-by-Feature atau Layered).</li>
    <li>Mengimplementasikan pola CRUD lengkap (Create, Read, Update, Delete) dengan data in-memory / file.</li>
    <li>Menerapkan error handling terpusat sederhana.</li>
  </ul>
  <h2>Alokasi Waktu (120 menit)</h2>
  <table>
    <tr><th>Durasi</th><th>Kegiatan</th></tr>
    <tr><td>20 menit</td><td>Desain Struktur Folder & Konsep Controller</td></tr>
    <tr><td>30 menit</td><td>Implementasi Rute & Controller: GET & POST (Read & Create)</td></tr>
    <tr><td>30 menit</td><td>Implementasi Rute & Controller: PUT & DELETE (Update & Delete)</td></tr>
    <tr><td>30 menit</td><td>Guided Lab: Membangun API Modul "Barang"</td></tr>
    <tr><td>10 menit</td><td>Diskusi & Take-Home Assignment</td></tr>
  </table>
  
  <h2>Studi Kasus ERP</h2>
  <p>Di modul sebelumnya, seluruh kode route dan logika kita berada di file <code>app.js</code>. Untuk proyek skala Enterprise (ERP), kode yang terpusat di satu file akan menjadi mimpi buruk. Di modul ini, kita akan melakukan <strong>refactoring</strong> — memecah <code>app.js</code> menjadi struktur folder profesional (Routes, Controllers, Models) agar aplikasi ERP kita mudah dipelihara oleh tim.</p>
</div>`;

CONTENT['m6-a'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#14B8A6">Module 6 · Section A</span>
  <h1 class="section-title">Struktur Proyek: Routes & Controllers</h1>
  <p class="section-subtitle">Meninggalkan app.js monolitik</p>
</div>
<div class="content">
  <h2>Kenapa Memecah Kode?</h2>
  <p>Ketika endpoint bertambah, <code>app.js</code> Anda akan menjadi ratusan hingga ribuan baris kode. Konsep <strong>Separation of Concerns (SoC)</strong> mengharuskan kita memisahkan definisi URL (Routes) dari logika cara menanganinya (Controllers).</p>
  
  <h3>Struktur Folder Layered Architecture</h3>
  <p>Ini adalah standar industri untuk backend Node.js non-framework (Express):</p>
  ${codeBlock('bash','erp-backend/\n├── src/\n│   ├── controllers/\n│   │   └── itemController.js   # Logika bisnis\n│   ├── routes/\n│   │   └── itemRoutes.js       # Definisi endpoint (GET, POST)\n│   ├── models/\n│   │   └── itemModel.js        # Akses ke database (atau file)\n│   └── app.js                  # Setup Express server\n├── package.json\n└── server.js                   # Entry point aplikasi')}

  <h2>Refactoring: app.js vs Express Router</h2>
  ${sideBySide('Cara Lama (app.js)','// Semuanya tercampur\napp.get("/api/items", (req, res) => {\n  const data = [...]; // cari data\n  res.json(data);     // kembalikan\n});\n\napp.post("/api/items", (req, res) => {\n  const newItem = req.body;\n  // validasi, simpan...\n  res.json(newItem);\n});','Cara Baru (Express Router)','// routes/itemRoutes.js\nconst express = require("express");\nconst router = express.Router();\nconst itemController = require("../controllers/itemController");\n\nrouter.get("/", itemController.getAllItems);\nrouter.post("/", itemController.createItem);\n\nmodule.exports = router;')}

  <p>Di file <code>app.js</code>, kita tinggal mengaitkan <em>router</em> tersebut ke base URL:</p>
  ${codeBlock('javascript','// src/app.js\nconst express = require("express");\nconst itemRoutes = require("./routes/itemRoutes");\n\nconst app = express();\napp.use(express.json());\n\n// Semua rute di itemRoutes akan diawali dengan /api/items\napp.use("/api/items", itemRoutes);\n\nmodule.exports = app;')}

  ${callout('instructor','Catatan Instruktur','Penting: Jelaskan bahwa <code>router.get("/", ...)</code> di dalam <code>itemRoutes.js</code> sebenarnya mewakili <code>/api/items/</code> karena kita menggunakan <code>app.use("/api/items", router)</code> di <code>app.js</code>. Ini adalah konsep sub-routing yang sangat kuat di Express.')}
</div>`;

CONTENT['m6-b'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#14B8A6">Module 6 · Section B</span>
  <h1 class="section-title">Controller & Model: Read & Create</h1>
  <p class="section-subtitle">Mengimplementasikan GET dan POST di Layer Terpisah</p>
</div>
<div class="content">
  <h2>Membuat Model (Data Access Layer)</h2>
  <p>Model bertanggung jawab murni untuk berurusan dengan data. Di sini, kita akan menggunakan in-memory array sebagai simulasi database.</p>
  ${codeBlock('javascript','// src/models/itemModel.js\n\nlet inventory = [\n  { id: "BRG-001", name: "Mur M8", stock: 100 }\n];\n\n// Berikan fungsi-fungsi untuk memanipulasi data\nexports.findAll = () => {\n  return inventory;\n};\n\nexports.create = (itemData) => {\n  const newItem = { \n    id: itemData.id, \n    name: itemData.name, \n    stock: itemData.stock \n  };\n  inventory.push(newItem);\n  return newItem;\n};')}

  <h2>Membuat Controller (Business Logic Layer)</h2>
  <p>Controller menerima request dari user, memanggil Model, lalu merakit response.</p>
  ${codeBlock('javascript','// src/controllers/itemController.js\nconst ItemModel = require("../models/itemModel");\n\nexports.getAllItems = (req, res) => {\n  try {\n    // 1. Ambil data dari model\n    const items = ItemModel.findAll();\n    \n    // 2. Kirim response\n    res.status(200).json({\n      success: true,\n      count: items.length,\n      data: items\n    });\n  } catch (err) {\n    res.status(500).json({ success: false, error: "Server Error" });\n  }\n};\n\nexports.createItem = (req, res) => {\n  try {\n    // 1. Validasi input\n    const { id, name, stock } = req.body;\n    if (!id || !name) {\n      return res.status(400).json({ success: false, error: "Tolong lengkapi data!" });\n    }\n    \n    // 2. Simpan via model\n    const newItem = ItemModel.create({ id, name, stock: stock || 0 });\n    \n    // 3. Kirim response sukses\n    res.status(201).json({ success: true, data: newItem });\n  } catch (err) {\n    res.status(500).json({ success: false, error: "Server Error" });\n  }\n};')}

  ${quiz('q6b','Di mana seharusnya logika query database (contoh: INSERT INTO...) diletakkan dalam arsitektur MVC?',['Di dalam Routes (itemRoutes.js)','Di dalam App (app.js)','Di dalam Controllers (itemController.js)','Di dalam Models (itemModel.js)'],3,'Model adalah representasi data. Semua akses ke database harus diabstraksikan di dalam file Model. Controller memanggil method yang disediakan oleh Model.')}
</div>`;

CONTENT['m6-c'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#14B8A6">Module 6 · Section C</span>
  <h1 class="section-title">Controller & Model: Update & Delete</h1>
  <p class="section-subtitle">Mengimplementasikan PUT dan DELETE</p>
</div>
<div class="content">
  <h2>Menambahkan Fungsi ke Model</h2>
  <p>Kita tambahkan kemampuan mencari berdasar ID, mengupdate, dan menghapus di <code>itemModel.js</code>.</p>
  ${codeBlock('javascript','// Tambahkan di src/models/itemModel.js\n\nexports.findById = (id) => {\n  return inventory.find(item => item.id === id);\n};\n\nexports.update = (id, updateData) => {\n  const index = inventory.findIndex(item => item.id === id);\n  if (index === -1) return null;\n  \n  inventory[index] = { ...inventory[index], ...updateData };\n  return inventory[index];\n};\n\nexports.delete = (id) => {\n  const index = inventory.findIndex(item => item.id === id);\n  if (index === -1) return false;\n  \n  inventory.splice(index, 1);\n  return true;\n};')}

  <h2>Menambahkan Handler ke Controller</h2>
  ${codeBlock('javascript','// Tambahkan di src/controllers/itemController.js\n\nexports.updateItem = (req, res) => {\n  const id = req.params.id;\n  \n  // Cek apakah ada\n  const item = ItemModel.findById(id);\n  if (!item) {\n    return res.status(404).json({ success: false, error: "Barang tidak ditemukan" });\n  }\n  \n  // Lakukan update\n  const updatedItem = ItemModel.update(id, req.body);\n  res.status(200).json({ success: true, data: updatedItem });\n};\n\nexports.deleteItem = (req, res) => {\n  const id = req.params.id;\n  \n  const isDeleted = ItemModel.delete(id);\n  if (!isDeleted) {\n    return res.status(404).json({ success: false, error: "Barang tidak ditemukan" });\n  }\n  \n  res.status(200).json({ success: true, data: {} });\n};')}

  <h2>Mendaftarkan ke Router</h2>
  ${codeBlock('javascript','// Di src/routes/itemRoutes.js\n\nrouter.put("/:id", itemController.updateItem);\nrouter.delete("/:id", itemController.deleteItem);')}
  
  ${callout('info','Response Format','Perhatikan bahwa kita selalu merespons dengan struktur JSON yang konsisten: <code>{ success: true/false, data: {...}, error: "..." }</code>. Ini membuat frontend (seperti React) sangat mudah mem-parsing API kita.')}
</div>`;

CONTENT['m6-d'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#14B8A6">Module 6 · Section D</span>
  <h1 class="section-title">Guided Lab: Membangun Modul Karyawan</h1>
  <p class="section-subtitle">Praktik arsitektur layered (Routes & Controllers)</p>
</div>
<div class="content">
  <p>Anda telah melihat teori pemisahan modul "Barang" di bagian sebelumnya. Sekarang giliran Anda membangun modul "Karyawan" (Employees) untuk ERP Anda menggunakan pola yang sama.</p>

  <div class="step-tracker" id="st-m6-d"></div>

  ${stepCard(1,'Setup Struktur Folder',`
    <p>Di terminal Anda, buat folder dan siapkan <code>package.json</code>:</p>
    ${codeBlock('bash','mkdir erp-employees\ncd erp-employees\nnpm init -y\nnpm install express\nmkdir src src/controllers src/routes src/models')}
  `,true)}

  ${stepCard(2,'Buat Employee Model',`
    <p>Buat <code>src/models/employeeModel.js</code>:</p>
    ${codeBlock('javascript','let employees = [\n  { id: "EMP-01", name: "Budi", role: "Manager" }\n];\n\nexports.getAll = () => employees;\n\nexports.create = (emp) => {\n  employees.push(emp);\n  return emp;\n};')}
  `)}

  ${stepCard(3,'Buat Employee Controller',`
    <p>Buat <code>src/controllers/employeeController.js</code>:</p>
    ${codeBlock('javascript','const Employee = require("../models/employeeModel");\n\nexports.getEmployees = (req, res) => {\n  res.status(200).json({ success: true, data: Employee.getAll() });\n};\n\nexports.createEmployee = (req, res) => {\n  const newEmp = Employee.create(req.body);\n  res.status(201).json({ success: true, data: newEmp });\n};')}
  `)}

  ${stepCard(4,'Buat Router & Sambungkan ke App',`
    <p>Buat <code>src/routes/employeeRoutes.js</code>:</p>
    ${codeBlock('javascript','const express = require("express");\nconst router = express.Router();\nconst empController = require("../controllers/employeeController");\n\nrouter.get("/", empController.getEmployees);\nrouter.post("/", empController.createEmployee);\n\nmodule.exports = router;')}
    
    <p>Buat <code>server.js</code> di root folder:</p>
    ${codeBlock('javascript','const express = require("express");\nconst empRoutes = require("./src/routes/employeeRoutes");\n\nconst app = express();\napp.use(express.json());\n\napp.use("/api/employees", empRoutes);\n\napp.listen(3000, () => {\n  console.log("Server ERP Karyawan jalan di port 3000");\n});')}
  `)}

  ${stepCard(5,'Jalankan dan Test',`
    <p>Jalankan server dan coba akses API:</p>
    ${codeBlock('bash','node server.js\n\n# Terminal lain\ncurl http://localhost:3000/api/employees')}
  `)}
</div>`;

CONTENT['m6-e'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#14B8A6">Module 6 · Section E</span>
  <h1 class="section-title">Take-Home: Lengkapi Modul Karyawan</h1>
  <p class="section-subtitle">Tugas mandiri Update & Delete</p>
</div>
<div class="content">
  <h2>Tugas</h2>
  <p>Modul "Karyawan" yang dibuat di Guided Lab belum selesai. Tugas Anda adalah melengkapinya!</p>
  
  <h3>1. Model (employeeModel.js)</h3>
  <p>Tambahkan method berikut:</p>
  <ul>
    <li><code>findById(id)</code> — mencari satu karyawan berdasar ID.</li>
    <li><code>update(id, data)</code> — memperbarui data karyawan.</li>
    <li><code>delete(id)</code> — menghapus karyawan dari array.</li>
  </ul>

  <h3>2. Controller (employeeController.js)</h3>
  <p>Buat fungsi-fungsi handler berikut:</p>
  <ul>
    <li><code>getEmployeeById(req, res)</code> — gunakan parameter URL.</li>
    <li><code>updateEmployee(req, res)</code> — gabungkan param ID dan Body.</li>
    <li><code>deleteEmployee(req, res)</code> — tangani respons sukses dan gagal.</li>
  </ul>

  <h3>3. Routes (employeeRoutes.js)</h3>
  <p>Daftarkan rute-rute baru (<code>/:id</code>) dengan HTTP Verbs yang benar (GET, PUT, DELETE).</p>

  <h2>Format Output</h2>
  <p>Pastikan API Anda merespons dengan format standar:</p>
  ${codeBlock('json','{\n  "success": true,\n  "data": { ... }\n}')}

  <h2>Cara Pengumpulan</h2>
  <p>Kumpulkan folder <code>erp-employees/</code> (tanpa <code>node_modules</code>), jadikan ZIP dan upload ke LMS.</p>
</div>`;

// ── MODULE 7 CONTENT ──
CONTENT['m7-plan'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#F43F5E">Module 7</span>
  <h1 class="section-title">Lesson Plan — Integrasi Express dengan MongoDB</h1>
  <p class="section-subtitle">Pertemuan 7 — Beralih dari penyimpanan array lokal ke database NoSQL</p>
</div>
<div class="content">
  <h2>Tujuan Pembelajaran</h2>
  <p>Setelah menyelesaikan modul ini, peserta mampu:</p>
  <ul>
    <li>Memahami konsep dasar database NoSQL dan MongoDB</li>
    <li>Mengenal ODM (Object Data Modeling) menggunakan Mongoose</li>
    <li>Menghubungkan aplikasi Express.js ke database MongoDB</li>
    <li>Membuat Schema dan Model untuk entitas data ERP</li>
    <li>Mengganti implementasi CRUD lokal (array/file) dengan operasi database MongoDB</li>
  </ul>
  <h2>Alokasi Waktu (120 menit)</h2>
  <table>
    <tr><th>Durasi</th><th>Kegiatan</th></tr>
    <tr><td>20 menit</td><td>Pengenalan MongoDB &amp; Mongoose</td></tr>
    <tr><td>20 menit</td><td>Koneksi ke Database &amp; Variabel Lingkungan (.env)</td></tr>
    <tr><td>20 menit</td><td>Mendefinisikan Schema &amp; Model (Data Barang ERP)</td></tr>
    <tr><td>40 menit</td><td>Guided Lab: Merombak API menjadi MongoDB CRUD</td></tr>
    <tr><td>20 menit</td><td>Diskusi, Q&amp;A, dan Take-Home</td></tr>
  </table>
  <h2>Kaitan dengan Studi Kasus ERP</h2>
  <p>Hingga saat ini, data yang kita olah di aplikasi Express masih menggunakan array (in-memory) atau file lokal. Untuk sistem ERP nyata, pendekatan tersebut tidak skalabel dan rentan kehilangan data. Oleh karena itu, kita akan memigrasikan penyimpanan data produk manufaktur kita ke <strong>MongoDB</strong> — sebuah database yang populer karena skemanya yang fleksibel (NoSQL).</p>
</div>`;

CONTENT['m7-a'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#F43F5E">Module 7 · Section A</span>
  <h1 class="section-title">Intro MongoDB &amp; Mongoose</h1>
  <p class="section-subtitle">Mengenal NoSQL, MongoDB, dan mengapa kita memakai Mongoose</p>
</div>
<div class="content">
  <h2>Apa itu MongoDB?</h2>
  <p>MongoDB adalah sistem database NoSQL yang menyimpan data dalam format dokumen mirip JSON (BSON). Jika Anda terbiasa dengan SQL (seperti MySQL atau PostgreSQL), berikut adalah perbandingannya:</p>
  <table>
    <tr><th>Konsep RDBMS (SQL)</th><th>Konsep MongoDB (NoSQL)</th></tr>
    <tr><td>Database</td><td>Database</td></tr>
    <tr><td>Table (Tabel)</td><td>Collection (Koleksi)</td></tr>
    <tr><td>Row (Baris)</td><td>Document (Dokumen)</td></tr>
    <tr><td>Column (Kolom)</td><td>Field</td></tr>
  </table>
  <p>Fleksibilitas NoSQL membuat pengembangan aplikasi JavaScript menjadi lebih cepat karena format dokumen MongoDB sangat identik dengan objek JSON.</p>
  
  <h2>Apa itu Mongoose?</h2>
  <p><strong>Mongoose</strong> adalah library Node.js (Object Data Modeling / ODM) yang menyediakan solusi berbasis skema yang ketat (schema-based) untuk memodelkan data aplikasi Anda ke MongoDB.</p>
  <p>Mengapa kita butuh Mongoose jika MongoDB bersifat schema-less (bebas)?</p>
  <ul>
    <li><strong>Validasi:</strong> Memastikan data produk selalu memiliki properti tertentu (misal: "nama" wajib ada dan "harga" harus angka).</li>
    <li><strong>Pemodelan:</strong> Memberikan struktur yang jelas, auto-casting tipe data, dan middleware.</li>
    <li><strong>Produktivitas:</strong> Membantu menulis query database dalam bentuk JavaScript yang lebih elegan.</li>
  </ul>
  
  ${callout('info','Persiapan Lingkungan','Sebelum melanjutkan, pastikan Anda telah membuat akun di <strong>MongoDB Atlas</strong> (layanan cloud MongoDB gratis) atau telah menginstal MongoDB secara lokal di komputer Anda.')}
</div>`;

CONTENT['m7-b'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#F43F5E">Module 7 · Section B</span>
  <h1 class="section-title">Koneksi ke Database MongoDB</h1>
  <p class="section-subtitle">Menyambungkan aplikasi Express ke MongoDB menggunakan Mongoose</p>
</div>
<div class="content">
  <h2>Langkah 1: Instalasi Paket</h2>
  <p>Pada proyek Anda, kita perlu menginstal <code>mongoose</code> dan <code>dotenv</code> (untuk menyimpan kredensial database agar aman).</p>
  ${codeBlock('bash','npm install mongoose dotenv')}
  
  <h2>Langkah 2: Konfigurasi .env</h2>
  <p>Buat file <code>.env</code> di root folder proyek Anda. File ini tidak boleh diunggah ke GitHub (tambahkan di .gitignore).</p>
  ${codeBlock('bash','PORT=3000\nMONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/erp_db?retryWrites=true&w=majority')}
  
  <h2>Langkah 3: File Koneksi (config/db.js)</h2>
  <p>Sangat disarankan untuk memisahkan kode koneksi database ke dalam file tersendiri agar kode kita tetap <em>modular</em>.</p>
  ${codeBlock('javascript','// config/db.js\nconst mongoose = require(\'mongoose\');\n\nconst connectDB = async () => {\n  try {\n    // Menyambungkan Mongoose ke MongoDB menggunakan URL dari file .env\n    const conn = await mongoose.connect(process.env.MONGO_URI);\n    console.log(`MongoDB Connected: ${conn.connection.host}`);\n  } catch (error) {\n    console.error(`Error connecting to MongoDB: ${error.message}`);\n    process.exit(1); // Keluar dari proses jika koneksi gagal\n  }\n};\n\nmodule.exports = connectDB;')}
  
  <h2>Langkah 4: Panggil di app.js</h2>
  <p>Sekarang, impor fungsi <code>connectDB</code> ke file utama Anda dan panggil sebelum menjalankan server.</p>
  ${codeBlock('javascript','// app.js\nrequire(\'dotenv\').config(); // Load variabel lingkungan\nconst express = require(\'express\');\nconst connectDB = require(\'./config/db\');\n\n// Panggil fungsi koneksi database\nconnectDB();\n\nconst app = express();\napp.use(express.json());\n\n// Route sederhana\napp.get(\'/api/status\', (req, res) => {\n  res.json({ message: "Server & Database berjalan lancar" });\n});\n\nconst PORT = process.env.PORT || 3000;\napp.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));')}
</div>`;

CONTENT['m7-c'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#F43F5E">Module 7 · Section C</span>
  <h1 class="section-title">Schema &amp; Model Mongoose</h1>
  <p class="section-subtitle">Mendefinisikan struktur data produk manufaktur di MongoDB</p>
</div>
<div class="content">
  <h2>Mendefinisikan Schema</h2>
  <p>Dalam Mongoose, <strong>Schema</strong> adalah blueprint yang menentukan properti dan tipe data dokumen di dalam koleksi. Sedangkan <strong>Model</strong> adalah <em>wrapper</em> dari Schema yang menyediakan fungsi untuk berinteraksi dengan database (CRUD).</p>
  <p>Buat folder <code>models</code> dan buat file <code>Product.js</code> untuk menyimpan Schema produk gudang (ERP).</p>
  ${codeBlock('javascript','// models/Product.js\nconst mongoose = require(\'mongoose\');\n\nconst productSchema = new mongoose.Schema({\n  nama: {\n    type: String,\n    required: [true, \'Nama produk harus diisi\'],\n    trim: true\n  },\n  kategori: {\n    type: String,\n    enum: [\'Raw Material\', \'Work in Progress\', \'Finished Goods\'],\n    default: \'Raw Material\'\n  },\n  stok: {\n    type: Number,\n    required: true,\n    min: [0, \'Stok tidak boleh negatif\']\n  },\n  harga: {\n    type: Number,\n    required: true\n  }\n}, {\n  timestamps: true // Otomatis menambahkan field createdAt dan updatedAt\n});\n\n// Membuat model dari schema\nconst Product = mongoose.model(\'Product\', productSchema);\nmodule.exports = Product;')}
  
  <h2>Penjelasan Properti Schema:</h2>
  <ul>
    <li><strong>type:</strong> Tipe data (String, Number, Date, Boolean, dll).</li>
    <li><strong>required:</strong> Validasi; akan melempar error jika field ini kosong.</li>
    <li><strong>trim:</strong> Menghapus spasi di awal/akhir string.</li>
    <li><strong>enum:</strong> Membatasi nilai yang diperbolehkan hanya yang ada dalam array.</li>
    <li><strong>min:</strong> Validasi angka minimum (cocok untuk stok).</li>
    <li><strong>timestamps:</strong> Mongoose akan mengelola waktu pembuatan dan update dokumen.</li>
  </ul>
  
  ${callout('warning','Perhatian Penamaan Model','Secara konvensi, nama Model Mongoose adalah kata tunggal berawalan huruf kapital (misal: <code>Product</code>). Mongoose secara otomatis akan mencari koleksi MongoDB dalam bentuk jamak (plural) dan huruf kecil (menjadi <code>products</code>).')}
</div>`;

CONTENT['m7-d'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#F43F5E">Module 7 · Section D</span>
  <h1 class="section-title">Praktik CRUD dengan Mongoose</h1>
  <p class="section-subtitle">Mengganti array statis dengan operasi database nyata</p>
</div>
<div class="content">
  <p>Dengan Model <code>Product</code> yang telah dibuat, mari kita rombak controller kita (misal: <code>controllers/productController.js</code>) yang sebelumnya menggunakan array, menjadi menggunakan query Mongoose.</p>
  
  <h2>1. Create (POST) - Menyimpan Data Baru</h2>
  <p>Untuk menyimpan dokumen, kita bisa menggunakan <code>Model.create()</code>.</p>
  ${codeBlock('javascript','const Product = require(\'../models/Product\');\n\nexports.createProduct = async (req, res) => {\n  try {\n    const product = await Product.create(req.body);\n    res.status(201).json({\n      success: true,\n      data: product\n    });\n  } catch (error) {\n    res.status(400).json({ success: false, message: error.message });\n  }\n};')}
  
  <h2>2. Read (GET) - Mengambil Data</h2>
  <p>Untuk membaca semua data gunakan <code>Model.find()</code>. Untuk membaca berdasarkan ID gunakan <code>Model.findById()</code>.</p>
  ${codeBlock('javascript','// Ambil semua produk\nexports.getAllProducts = async (req, res) => {\n  try {\n    const products = await Product.find();\n    res.status(200).json({ success: true, count: products.length, data: products });\n  } catch (error) {\n    res.status(500).json({ success: false, message: "Terjadi kesalahan server" });\n  }\n};\n\n// Ambil 1 produk by ID\nexports.getProductById = async (req, res) => {\n  try {\n    const product = await Product.findById(req.params.id);\n    if (!product) {\n      return res.status(404).json({ success: false, message: "Produk tidak ditemukan" });\n    }\n    res.status(200).json({ success: true, data: product });\n  } catch (error) {\n    res.status(400).json({ success: false, message: "ID tidak valid" });\n  }\n};')}
  
  <h2>3. Update (PUT) - Memperbarui Data</h2>
  <p>Gunakan <code>Model.findByIdAndUpdate()</code>.</p>
  ${codeBlock('javascript','exports.updateProduct = async (req, res) => {\n  try {\n    // Opsi new: true akan mengembalikan dokumen hasil update, bukan dokumen sebelum update\n    // Opsi runValidators: true akan menjalankan validasi mongoose pada field yang diupdate\n    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {\n      new: true,\n      runValidators: true\n    });\n\n    if (!product) {\n      return res.status(404).json({ success: false, message: "Produk tidak ditemukan" });\n    }\n\n    res.status(200).json({ success: true, data: product });\n  } catch (error) {\n    res.status(400).json({ success: false, message: error.message });\n  }\n};')}
  
  <h2>4. Delete (DELETE) - Menghapus Data</h2>
  <p>Gunakan <code>Model.findByIdAndDelete()</code>.</p>
  ${codeBlock('javascript','exports.deleteProduct = async (req, res) => {\n  try {\n    const product = await Product.findByIdAndDelete(req.params.id);\n    if (!product) {\n      return res.status(404).json({ success: false, message: "Produk tidak ditemukan" });\n    }\n    res.status(200).json({ success: true, data: {} });\n  } catch (error) {\n    res.status(400).json({ success: false, message: "ID tidak valid" });\n  }\n};')}
  
  ${callout('info','Catatan Asynchronous','Ingat, operasi database (I/O) selalu bersifat <em>asynchronous</em> (membutuhkan waktu tunggu). Karena itulah kita selalu menggunakan <code>async/await</code> dalam fungsi controller ini.')}
</div>`;

CONTENT['m7-e'] = `
<div class="section-header">
  <span class="section-module-badge" style="background:#F43F5E">Module 7 · Section E</span>
  <h1 class="section-title">Take-Home: Migrasi API Karyawan ke MongoDB</h1>
  <p class="section-subtitle">Tugas mandiri — menerapkan MongoDB ke modul Employee ERP</p>
</div>
<div class="content">
  <h2>Latar Belakang</h2>
  <p>Pada tugas sebelumnya (Module 6), Anda telah membuat API CRUD untuk entitas Karyawan (Employee) menggunakan array lokal (in-memory). Sekarang, tim infrastruktur PT. Nafisa meminta Anda untuk memigrasikan penyimpanan data karyawan tersebut menggunakan <strong>MongoDB</strong> agar data tidak hilang ketika server restart.</p>

  <h2>Tugas</h2>
  <p>Ubah modul Employee yang sudah Anda buat sebelumnya dengan menambahkan Mongoose.</p>
  
  <h3>1. Konfigurasi Database</h3>
  <ul>
    <li>Buat database MongoDB Atlas, dapatkan connection string Anda.</li>
    <li>Buat file <code>.env</code> untuk menyimpan URL database dan port.</li>
    <li>Implementasikan koneksi Mongoose di <code>app.js</code> atau <code>config/db.js</code>.</li>
  </ul>

  <h3>2. Buat Schema dan Model (Employee)</h3>
  <p>Buat file <code>models/Employee.js</code>. Skema Karyawan harus memiliki kriteria berikut:</p>
  <ul>
    <li><code>nama</code> (String) - wajib diisi.</li>
    <li><code>email</code> (String) - wajib diisi, pastikan tipe datanya string.</li>
    <li><code>posisi</code> (String) - wajib diisi.</li>
    <li><code>gaji</code> (Number) - wajib diisi, tidak boleh di bawah 0.</li>
  </ul>
  <p>Jangan lupa tambahkan <code>timestamps: true</code> pada konfigurasi Schema.</p>

  <h3>3. Rombak Controllers</h3>
  <p>Ubah seluruh controller di <code>employeeController.js</code> agar menggunakan Mongoose Model (<code>Employee.find</code>, <code>Employee.create</code>, dll), alih-alih array push/splice.</p>
  
  <h3>4. Uji Coba dengan Postman / Insomnia</h3>
  <p>Pastikan API endpoint berikut berjalan 100% menggunakan database MongoDB:</p>
  <ul>
    <li><strong>GET</strong> /api/employees</li>
    <li><strong>POST</strong> /api/employees</li>
    <li><strong>GET</strong> /api/employees/:id</li>
    <li><strong>PUT</strong> /api/employees/:id</li>
    <li><strong>DELETE</strong> /api/employees/:id</li>
  </ul>

  <h2>Kriteria Penilaian</h2>
  <ul>
    <li>File <code>.env</code> digunakan untuk variabel environment.</li>
    <li>Koneksi MongoDB berhasil dan error handling ditangani dengan benar.</li>
    <li>Schema Mongoose mendefinisikan tipe data dan validasi yang sesuai.</li>
    <li>Semua fungsi CRUD berjalan asinkronus (async/await) dan tersimpan permanen di database.</li>
  </ul>

  <h2>Cara Pengumpulan</h2>
  <p>Kumpulkan folder <code>erp-employees-mongo/</code>. Pastikan Anda <strong>TIDAK MENGIRIM</strong> folder <code>node_modules</code>. Sertakan file <code>.env.example</code> (tanpa password asli Anda) di dalam ZIP.</p>
</div>`;

function placeholder(mod,badge){
  var desc = arguments.length>2 ? arguments[2] : 'Konten akan segera dilengkapi.';
  return '<div class="section-header"><span class="section-module-badge" style="background:'+(mod==='Module 2'?'#059669':'#7C3AED')+'">'+mod+'</span><h1 class="section-title">'+badge+'</h1><p class="section-subtitle">Konten akan segera dilengkapi</p></div><div class="content">'+callout('info',mod+': '+badge,desc)+'<p style="margin-top:20px;color:var(--text-muted)">Konten lengkap akan ditambahkan setelah konfirmasi.</p></div>';
}

// ═══════════════════════════════════════════
// RENDER
// ═══════════════════════════════════════════
function renderSidebar(){
  var nav = document.getElementById('sidebarNav');
  var html = '';
  MODULES.forEach(function(mod,mi){
    var isOpen = mi === 0;
    html += '<div class="nav-module">'+
      '<button class="nav-module-header" onclick="toggleModule('+mi+')">'+
        '<span class="arrow '+(isOpen?'open':'')+'">&#9654;</span> '+
        '<span>'+mod.label+'</span>'+
        '<span class="badge" style="background:'+mod.badgeColor+'">'+mod.badge+'</span>'+
      '</button>'+
      '<div class="nav-sub '+(isOpen?'open':'')+'" id="navSub'+mi+'">';
    mod.sections.forEach(function(sec){
      html += '<a class="nav-section" data-section="'+sec.id+'" onclick="navigateTo(\''+sec.id+'\')">'+sec.label+'</a>';
    });
    html += '</div></div>';
  });
  nav.innerHTML = html;
}

function renderContent(){
  var main = document.getElementById('mainContent');
  var html = '';
  ALL_IDS.forEach(function(id){
    html += '<section class="section" id="'+id+'">'+
      (CONTENT[id]||'<div class="content"><p>Konten tidak ditemukan.</p></div>')+
      '<div class="nav-buttons" id="navBtns-'+id+'"></div>'+
    '</section>';
  });
  main.innerHTML = html;
}

function renderNavButtons(id){
  var idx = ALL_IDS.indexOf(id);
  if (idx===-1) return;
  var container = document.querySelector('#navBtns-'+id);
  if (!container) return;
  var prevId = idx>0 ? ALL_IDS[idx-1] : null;
  var nextId = idx<ALL_IDS.length-1 ? ALL_IDS[idx+1] : null;
  var done = storeGet('done_'+id);
  container.innerHTML =
    '<button class="btn-prev" onclick="navigateTo(\''+prevId+'\')" '+(prevId?'':'disabled')+'>&larr; Sebelumnya</button>'+
    '<button class="btn-complete'+(done?' done':'')+'" onclick="toggleComplete(\''+id+'\')">'+(done?'Selesai':'Tandai Selesai')+'</button>'+
    '<button class="btn-next" onclick="navigateTo(\''+nextId+'\')" '+(nextId?'':'disabled')+'>Selanjutnya &rarr;</button>';

  // step tracker
  var tracker = document.querySelector('#'+id+' .step-tracker');
  if (tracker) renderStepTracker(tracker, id);
}

function renderStepTracker(container, sid){
  var cards = document.querySelectorAll('#'+sid+' .step-card');
  if (!cards.length) return;
  var html = '';
  cards.forEach(function(card,i){
    var num = i+1;
    var label = (card.querySelector('.step-label')||{}).textContent||'Langkah '+num;
    html += '<button class="step-dot" onclick="goToStep(\''+sid+'\','+num+')"><span class="num">'+num+'</span> '+label+'</button>';
  });
  container.innerHTML = html;
  var dots = container.querySelectorAll('.step-dot');
  if (dots.length) dots[0].classList.add('active');
}

// ═══════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════
var currentSection = 'm1-plan';

function navigateTo(id){
  if (!id || !document.getElementById(id)) return;
  document.querySelectorAll('.section').forEach(function(s){s.classList.remove('active')});
  document.getElementById(id).classList.add('active');
  currentSection = id;

  // sidebar active
  document.querySelectorAll('.nav-section').forEach(function(n){n.classList.remove('active')});
  var navItem = document.querySelector('.nav-section[data-section="'+id+'"]');
  if (navItem){
    navItem.classList.add('active');
    navItem.scrollIntoView({block:'nearest',behavior:'smooth'});
  }

  // mobile header
  var mod = null, sec = null;
  for (var mi = 0; mi < MODULES.length; mi++) {
    var m = MODULES[mi];
    m.sections.forEach(function(s) { if (s.id === id) { mod = m; sec = s; } });
  }
  document.getElementById('mobileTitle').textContent = sec ? mod.label+': '+sec.label : 'Nafisa Bootcamp';
  if (mod) {
    document.getElementById('mobileBadge').textContent = mod.label;
    document.getElementById('mobileBadge').style.background = mod.badgeColor;
  }

  renderNavButtons(id);
  closeSidebar();
  updateProgress();
}

function toggleModule(idx){
  var sub = document.getElementById('navSub'+idx);
  var arrow = sub&&sub.previousElementSibling ? sub.previousElementSibling.querySelector('.arrow') : null;
  if (sub) sub.classList.toggle('open');
  if (arrow) arrow.classList.toggle('open');
}

function goToStep(sid,num){
  document.querySelectorAll('#'+sid+' .step-card').forEach(function(c,i){c.classList.toggle('active-card',i+1===num)});
  document.querySelectorAll('#'+sid+' .step-dot').forEach(function(d,i){d.classList.toggle('active',i+1===num)});
}

// ═══════════════════════════════════════════
// SIDEBAR TOGGLE
// ═══════════════════════════════════════════
function openSidebar(){
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('overlay').classList.add('open');
}
function closeSidebar(){
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
}
document.getElementById('hamburger').addEventListener('click',openSidebar);
document.getElementById('sidebarClose').addEventListener('click',closeSidebar);
document.getElementById('overlay').addEventListener('click',closeSidebar);

// ═══════════════════════════════════════════
// STORAGE (progress tracking)
// ═══════════════════════════════════════════
var store = (function(){
  var mem = {};
  var pfx = 'nf_';
  return {
    get: function(k){
      if (typeof window.storeGet === 'function') return window.storeGet(k);
      try { var v = localStorage.getItem(pfx+k); return v ? JSON.parse(v) : null; } catch(e) { return mem[k]||null; }
    },
    set: function(k,v){
      if (typeof window.storeSet === 'function') return window.storeSet(k,v);
      try { localStorage.setItem(pfx+k, JSON.stringify(v)); } catch(e) { mem[k]=v; }
    },
    del: function(k){
      if (typeof window.storeDelete === 'function') return window.storeDelete(k);
      try { localStorage.removeItem(pfx+k); } catch(e) { delete mem[k]; }
    },
    list: function(){
      if (typeof window.storeList === 'function') return window.storeList();
      var r = [];
      try { for (var i=0; i<localStorage.length; i++){ var key=localStorage.key(i); if (key&&key.indexOf(pfx)===0) r.push(key.slice(pfx.length)); } } catch(e) {}
      return r;
    }
  };
})();

function storeGet(k){ return store.get(k); }
function storeSet(k,v){ store.set(k,v); }

function toggleComplete(id){
  var key = 'done_'+id;
  if (storeGet(key)) { store.del(key); } else { storeSet(key,true); }
  var navItem = document.querySelector('.nav-section[data-section="'+id+'"]');
  if (navItem) navItem.classList.toggle('done');
  renderNavButtons(id);
  updateProgress();
}

function updateProgress(){
  var count = 0;
  ALL_IDS.forEach(function(id){if(storeGet('done_'+id))count++});
  var pct = Math.round((count/ALL_IDS.length)*100);
  document.getElementById('progressStats').textContent = pct+'% selesai ('+count+'/'+ALL_IDS.length+')';

  // progress bar per module
  var active = document.querySelector('.section.active');
  if (active){
    var mi = -1;
    MODULES.forEach(function(m,i){m.sections.forEach(function(s){if(s.id===currentSection)mi=i})});
    if (mi>-1){
      var ms = MODULES[mi].sections;
      var mc = 0;
      ms.forEach(function(s){if(storeGet('done_'+s.id))mc++});
      var bar = active.querySelector('.progress-bar-fill');
      if (bar){
        bar.style.width = Math.round((mc/ms.length)*100)+'%';
        bar.style.background = MODULES[mi].badgeColor;
      }
    }
  }
  // sidebar markers
  ALL_IDS.forEach(function(id){
    var n = document.querySelector('.nav-section[data-section="'+id+'"]');
    if (n) n.classList.toggle('done',!!storeGet('done_'+id));
  });
}

function resetProgress(){
  if (!confirm('Reset semua progres belajar?')) return;
  store.list().forEach(function(k){
    if (k.indexOf('done_')===0||k.indexOf('quiz_')===0) store.del(k);
  });
  document.querySelectorAll('.nav-section').forEach(function(n){n.classList.remove('done')});
  document.querySelectorAll('.btn-complete').forEach(function(b){b.textContent='Tandai Selesai';b.classList.remove('done')});
  updateProgress();
  renderNavButtons(currentSection);
}

// ═══════════════════════════════════════════
// QUIZ
// ═══════════════════════════════════════════
function checkQuiz(id,correctIdx,explanation){
  var card = document.getElementById(id);
  if (!card) return;
  var selected = card.querySelector('input[type="radio"]:checked');
  var btn = card.querySelector('.quiz-btn');
  var fb = document.getElementById(id+'-fb');
  if (!selected){
    fb.className = 'quiz-feedback show wrong';
    fb.innerHTML = '<span class="fb-label">Pilih jawaban terlebih dahulu!</span>';
    return;
  }
  var val = parseInt(selected.value);
  var isCorrect = val === correctIdx;
  card.querySelectorAll('.quiz-option').forEach(function(opt,i){
    opt.classList.remove('correct-answer','wrong-answer');
    if (i===correctIdx) opt.classList.add('correct-answer');
    if (i===val && !isCorrect) opt.classList.add('wrong-answer');
  });
  card.className = 'quiz-card '+(isCorrect?'correct':'wrong');
  fb.className = 'quiz-feedback show '+(isCorrect?'correct':'wrong');
  fb.innerHTML = isCorrect
    ? '<span class="fb-label">Benar!</span> '+explanation
    : '<span class="fb-label">Belum tepat.</span> '+explanation;
  btn.disabled = true;
  storeSet('quiz_'+id, isCorrect?'correct':'wrong');
}

// ═══════════════════════════════════════════
// CODE BLOCK ACTIONS
// ═══════════════════════════════════════════
function copyCode(btn){
  var code = btn.getAttribute('data-code');
  if (!code) return;
  if (navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(code).then(function(){
      btn.textContent = 'Copied!';
      setTimeout(function(){btn.textContent='Copy'},2000);
    }).catch(function(){fallbackCopy(code,btn)});
  } else {
    fallbackCopy(code,btn);
  }
}

function fallbackCopy(text,btn){
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    btn.textContent = 'Copied!';
    setTimeout(function(){btn.textContent='Copy'},2000);
  } catch(e){}
  document.body.removeChild(ta);
}

function toggleOutput(el,evt){
  if (evt) evt.stopPropagation();
  var output;
  if (el.tagName==='BUTTON'){
    var wrap = el.closest('.code-wrap');
    if (!wrap) return;
    output = wrap.querySelector('.code-output');
  } else {
    output = el.nextElementSibling;
  }
  if (!output || !output.classList.contains('code-output')) return;
  output.classList.toggle('show');
  var label = output.previousElementSibling;
  if (label && label.classList.contains('code-output-label')){
    var icon = label.querySelector('.icon');
    if (icon) icon.style.transform = output.classList.contains('show') ? 'rotate(90deg)' : 'rotate(0deg)';
  }
}

// ═══════════════════════════════════════════
// KEYBOARD NAV
// ═══════════════════════════════════════════
document.addEventListener('keydown',function(e){
  if (e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA') return;
  if (e.key==='ArrowRight'||e.key==='ArrowDown'){
    e.preventDefault();
    var idx = ALL_IDS.indexOf(currentSection);
    if (idx < ALL_IDS.length-1) navigateTo(ALL_IDS[idx+1]);
  }
  if (e.key==='ArrowLeft'||e.key==='ArrowUp'){
    e.preventDefault();
    var idx = ALL_IDS.indexOf(currentSection);
    if (idx > 0) navigateTo(ALL_IDS[idx-1]);
  }
});

// ═══════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════
document.addEventListener('DOMContentLoaded',function(){
  renderSidebar();
  renderContent();

  // reset button
  document.getElementById('resetBtn').addEventListener('click',resetProgress);

  // restore last section or start at plan
  var saved = storeGet('lastSection');
  navigateTo(saved && document.getElementById(saved) ? saved : 'm1-plan');

  // re-highlight code
  if (typeof hljs !== 'undefined'){
    document.querySelectorAll('pre code').forEach(function(b){hljs.highlightElement(b)});
  }

  // wrap navigate to persist
  var origNav = navigateTo;
  navigateTo = function(id){
    origNav(id);
    storeSet('lastSection',id);
  };
  navigateTo(currentSection);
});
