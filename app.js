// ===================== CONFIG por proyecto =====================
// Cambia las rutas por tus imágenes reales. Si no existen, verás [Sin imagen].
const CONFIG = {
  Canarias: {
    presentacion: {
      img: 'LOGO_CANARIAS.JPG',
      caption: n => `Presentamos el proyecto ${n}.<br>
Durante nuestra última conversación, usted señaló la importancia de contar con espacios funcionales y una ubicación estratégica, aspectos que este proyecto cumple de manera destacada.`
    },

    ubicacionProy: { img: 'planta_canarias.JPG', caption: 'Cra 1 # 2–34, Barrio Centro – Ciudad' },
    actividades: [
      { Zona: 'Zona BBQ', estado: 'Completado' },
      { Zona: 'Gimnasio', estado: 'En curso' },
      { Zona: 'Salón social', estado: 'Programado' },
      { Zona: 'Bar', estado: 'Completado' },
      { Zona: 'Parqueadero público', estado: 'En curso' },
      { Zona: 'Terraza', estado: 'Programado' },
      { Zona: 'Salón de juegos', estado: 'En curso' },
    ],
    ubicacionApto: { img: 'Tipo1canarias.PNG', caption: 'Torre A – Piso 5 – Apto 502' },
    cotizacionDet: {
    // Tabla 1
    valorApartamento: 315000000,
    beneficioPrograma: '',                  // o un texto si aplica
    valorHoy: 315000000,                    // si difiere de valorApartamento
    cuotaInicialPct: 30,                    // %
    separacion: 2000000,

    // Tabla 2 (cuota mensual)
    meses: 120,
    cuotaMensual: 1452000,                  // valor en pesos
    lineaProducto: 'Leasing habitacional',  // texto libre

    // Textos/extra
    vigenciaTexto: '30 días',

  },

  // (opcional) sigue existiendo tu array “cotizacion” como antes
  cotizacion: [
    { concepto: 'Apartamento 60 m²', valor: 280000000 },
    { concepto: 'Bodega', valor: 15000000 },
  ],
  },
  Nogales: {
    presentacion: {
      img: 'LOGO_NOGALES.JPG', caption: n => `Un gusto presentarle ${n}.
Recuerdo que cuando conversamos, usted mencionó que le interesaba conocer más detalles sobre las zonas comunes y las opciones de financiación disponibles.`
    },
    ubicacionProy: { img: 'planta_nogal.jpg', caption: 'Av. Nogales 123 – Sector Norte' },
    actividades: [
      { Zona: 'Salón social', estado: 'Programado' },
      { Zona: 'Bar', estado: 'Completado' },
      { Zona: 'Parqueadero público', estado: 'En curso' },
      { Zona: 'Terraza', estado: 'Programado' },
      { Zona: 'Salón de juegos', estado: 'En curso' },
    ],
    ubicacionApto: { img: 'Tipo1nogales.PNG', caption: 'Torre B – Piso 3 – Apto 304' },
    cotizacionDet: {
    // Tabla 1
    valorApartamento: 315000000,
    beneficioPrograma: '',                  // o un texto si aplica
    valorHoy: 315000000,                    // si difiere de valorApartamento
    cuotaInicialPct: 30,                    // %
    separacion: 2000000,

    // Tabla 2 (cuota mensual)
    meses: 120,
    cuotaMensual: 1452000,                  // valor en pesos
    lineaProducto: 'Leasing habitacional',  // texto libre

    // Textos/extra
    vigenciaTexto: '30 días',

  },

  // (opcional) sigue existiendo tu array “cotizacion” como antes
  cotizacion: [
    { concepto: 'Apartamento 60 m²', valor: 280000000 },
    { concepto: 'Bodega', valor: 15000000 },
  ],
  },
  Dehesa: {
    presentacion: {
      img: 'LOGO_DEHESA.JPG', caption: n => `Es un placer presentarle el proyecto ${n}.
Durante nuestra conversación, usted manifestó interés en las áreas sociales y el diseño de las viviendas, por lo que quisimos resaltarlas en esta presentación.`
    },
    ubicacionProy: { img: 'planta_dehesa.JPG', caption: 'Calle 45 # 10–22, Dehesa' },
    actividades: [
      { Zona: 'Zona BBQ', estado: 'Completado' },
      { Zona: 'Gimnasio', estado: 'En curso' },
      { Zona: 'Salón social', estado: 'Programado' },
      { Zona: 'Bar', estado: 'Completado' },
      { Zona: 'Parqueadero público', estado: 'En curso' },
    ],
    ubicacionApto: { img: 'Tipo1dehesa.PNG', caption: 'Torre C – Piso 7 – Apto 702' },
    cotizacionDet: {
    // Tabla 1
    valorApartamento: 315000000,
    beneficioPrograma: '',                  // o un texto si aplica
    valorHoy: 315000000,                    // si difiere de valorApartamento
    cuotaInicialPct: 30,                    // %
    separacion: 2000000,

    // Tabla 2 (cuota mensual)
    meses: 120,
    cuotaMensual: 1452000,                  // valor en pesos
    lineaProducto: 'Leasing habitacional',  // texto libre

    // Textos/extra
    vigenciaTexto: '30 días',

  },

  // (opcional) sigue existiendo tu array “cotizacion” como antes
  cotizacion: [
    { concepto: 'Apartamento 60 m²', valor: 280000000 },
    { concepto: 'Bodega', valor: 15000000 },
  ],
  }
};
// ===============================================================

// Opciones de unidades por tipo + torres (ejemplo simple)
const UNIDADES = {
  Apartamento: ['Apto 301', 'Apto 502', 'Apto 702'],
  Penthouse: ['PH 1', 'PH 2']
};

const $ = s => document.querySelector(s);
const state = {
  proyecto: '', nombre: '',
  etapas: '', torres: '', tipo: '', unidad: ''
};

// ---------- Flujo escalonado ----------
/// Paso 1: Proyecto
$('#btn-buscar').addEventListener('click', () => {
  // === 🔹 LIMPIAR TODO EL FORMULARIO ===
  // Limpiar estado global
  state.proyecto = '';
  state.nombre = '';
  state.etapas = '';
  state.torres = '';
  state.tipo = '';
  state.unidad = '';

  // Limpiar selects
  $('#sel-etapas').value = '';
  $('#sel-torres').value = '';
  $('#sel-tipo').value = '';
  $('#sel-unidad').innerHTML = '';
  $('#wrap-unidad').classList.add('hidden');

  // Ocultar secciones posteriores
  ['#step-etapas', '#step-torres', '#step-tipo', '#step-contenido']
    .forEach(sel => $(sel).classList.add('hidden'));

  // Desmarcar todos los checks
  document.querySelectorAll('#step-contenido input[type="checkbox"]').forEach(chk => chk.checked = false);

  // Limpiar vista previa PDF
  const pdf = document.getElementById('pdf');
  pdf.innerHTML = `
    <div class="pdf-page">
      <div class="brand row-between">
        <span>Ficha del proyecto</span><span id="pdf-nombre"></span>
      </div>
      <div class="section">
        <div style="color:var(--muted)">
          Sigue el flujo de la izquierda y pulsa <b>Generar cotización</b>.
        </div>
      </div>
    </div>
  `;

  // === 🔹 AHORA CARGAR EL NUEVO PROYECTO ===
  const proyecto = $('#sel-proyecto').value;
  if (!proyecto) {
    alert('Selecciona un proyecto');
    return;
  }

  state.proyecto = proyecto;
  state.nombre = proyecto;
  $('#pdf-nombre').textContent = proyecto;

  // Mostrar siguiente sección (etapas)
  const s = $('#step-etapas');
  s.classList.remove('hidden');
  s.classList.add('revealed');
  s.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});


// Paso 2A: Etapas → muestra Torres
$('#sel-etapas').addEventListener('change', (e) => {
  state.etapas = e.target.value || '';
  if (!state.etapas) return;
  const s = $('#step-torres');
  s.classList.remove('hidden'); s.classList.add('revealed');
  s.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Paso 2B: Torres → muestra Tipo
$('#sel-torres').addEventListener('change', (e) => {
  state.torres = e.target.value || '';
  if (!state.torres) return;
  const s = $('#step-tipo');
  s.classList.remove('hidden'); s.classList.add('revealed');
  s.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Paso 2C: Tipo → muestra campo Unidad (en la MISMA sección)
$('#sel-tipo').addEventListener('change', (e) => {
  state.tipo = e.target.value || '';
  const wrap = $('#wrap-unidad');
  const selUnidad = $('#sel-unidad');

  if (!state.tipo) { wrap.classList.add('hidden'); return; }

  // poblar opciones de unidad (puedes personalizar por proyecto/torres)
  selUnidad.innerHTML = '';
  const opts = UNIDADES[state.tipo] || [];
  selUnidad.append(new Option('— Seleccionar —', ''));
  // ejemplo: si hay 2 torres, prefijamos Torre A/B a las opciones
  const prefijos = (state.torres === '2') ? ['Torre A ', 'Torre B '] : [''];
  prefijos.forEach(pref => {
    opts.forEach(u => selUnidad.append(new Option(pref + u, pref + u)));
  });

  wrap.classList.remove('hidden');
});

// Al seleccionar unidad → habilita la sección “Generación de la cotización”
$('#sel-unidad').addEventListener('change', (e) => {
  state.unidad = e.target.value || '';
  if (!state.unidad) return;
  const s = $('#step-contenido');
  s.classList.remove('hidden'); s.classList.add('revealed');
  s.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// ---------- Generar vista (sección 3) ----------
$('#btn-generar').addEventListener('click', () => {
  if (!state.proyecto || !state.etapas || !state.torres || !state.tipo || !state.unidad) {
    alert('Completa proyecto, etapas, torres, tipo y unidad antes de generar.');
    return;
  }

  const conf = CONFIG[state.proyecto] || {};
  const pdf = document.getElementById('pdf');
  pdf.innerHTML = ''; // reset
  const blocks = [];

  // RESUMEN DE SELECCIÓN (siempre arriba)
  blocks.push(resumenSeleccion());

  // Presentación
  if ($('#chk-presentacion').checked) {
    blocks.push(sectionNode(
      'Presentación',
      conf.presentacion?.img,
      (conf.presentacion?.caption && typeof conf.presentacion.caption === 'function')
        ? conf.presentacion.caption(state.nombre)
        : (conf.presentacion?.caption || '')
    ));
  }

  // Ubicación del proyecto
  if ($('#chk-ubi-proy').checked) {
    blocks.push(sectionNode('Ubicación del proyecto', conf.ubicacionProy?.img, conf.ubicacionProy?.caption || ''));
  }

  // Actividades del proyecto (tabla)
  if ($('#chk-actividades').checked) {
  const sec = document.createElement('div'); sec.className = 'section';
  sec.appendChild(h3('Actividades del proyecto'));

  const actividades = conf.actividades || [];
  if (actividades.length === 0) {
    sec.appendChild(note('Sin actividades registradas.'));
  } else {
    const table = document.createElement('table');
    // Si quieres que diga “Zona” en la cabecera:
    table.innerHTML = '<thead><tr><th>Zona</th><th>Estado</th></tr></thead>';

    const tb = document.createElement('tbody');
    actividades.forEach(a => {
      const nombre = a.actividad ?? a.Zona ?? '';  // <--- acepta ambas
      const estado = a.estado ?? '';
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${nombre}</td><td>${estado}</td>`;
      tb.appendChild(tr);
    });
    table.appendChild(tb);
    sec.appendChild(table);
  }
  blocks.push(sec);
}

  // Ubicación del apartamento
  if ($('#chk-ubi-apto').checked) {
    blocks.push(sectionNode('Ubicación del apartamento', conf.ubicacionApto?.img, conf.ubicacionApto?.caption || ''));
  }

  // Cotización (tabla + total)
  // Cotización (nuevo layout tipo tabla + fallback)
if ($('#chk-cotizacion').checked) {
  const sec = document.createElement('div');
  sec.className = 'section';
  sec.appendChild(h3('Cotización Detallada'));

  sec.innerHTML += `
    <table class="styled">
      <thead>
        <tr><th colspan="2">Cotización</th></tr>
      </thead>
      <tbody>
        <tr><td>Valor del apartamento</td><td>$415.000.0000</td></tr>
        <tr><td>Beneficio programa</td><td>$315.000.000</td></tr>
        <tr><td>Valor al día de hoy</td><td>$315.000.000</td></tr>
        <tr><td>Valor cuota inicial (30%)</td><td>$94.500.000</td></tr>
        <tr><td>Separación</td><td>$5.000.000</td></tr>
        <tr><td>Valor cuota mensual (Meses)</td><td>$2.500.000</td></tr>
        <tr><td>Valor cuota linea de producto</td><td>$1.660.000</td></tr>
      </tbody>
    </table>

    <br>
    <h4>Cotización Moneda extranjera</h4>
    <table class="styled">
      <thead><tr><th>Moneda Extranjera</th><th>Dólar</th></tr></thead>
      <tbody>
        <tr><td>Valor de la inversión</td><td>$104.651</td></tr>
        <tr><td>Cuota de separación</td><td>$233</td></tr>
        <tr><td>Valor cuota inicial</td><td>$31.395</td></tr>
        <tr><td>Valor final</td><td>$73.256</td></tr>
        <tr><td><b>Valor cuota mensual</b></td><td><b>$452</b></td></tr>
      </tbody>
    </table>

    <br>
    <h4>Datos Financieros</h4>
    <table class="styled">
      <thead><tr><th colspan="2">Financiación Bancaria</th></tr></thead>
      <tbody>
        <tr><td>Valor</td><td>$315.000.000</td></tr>
        <tr><td>Tasa de interés anual</td><td>10.5%</td></tr>
        <tr><td>Años de financiamiento</td><td>20</td></tr>
        <tr><td><b>Cuota bancaria estimada</b></td><td><b>$3.144.897</b></td></tr>
      </tbody>
    </table>

    <br>
    <table class="styled">
      <thead><tr><th colspan="2">Valorización y Rentabilidad</th></tr></thead>
      <tbody>
        <tr><td>Valorización m²</td><td>$8.196.721</td></tr>
        <tr><td>Valorización a entrega (14%)</td><td>$636.567.603</td></tr>
        <tr><td>TIR (%)</td><td>53.5%</td></tr>
        <tr><td><b>Retorno</b></td><td><b>$206.902.603</b></td></tr>
      </tbody>
    </table>
  `;

  blocks.push(sec);
}


  // Colocación en PDF preview
  const onePerPage = $('#chk-per-page').checked;
  if (onePerPage) {
    blocks.forEach(b => { const p = pageNode(state.nombre); p.appendChild(b); pdf.appendChild(p); });
  } else {
    const p = pageNode(state.nombre);
    blocks.forEach(b => p.appendChild(b));
    pdf.appendChild(p);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ----------- Helpers UI -----------
function h3(text) { const el = document.createElement('h3'); el.textContent = text; return el; }
function note(text) { const n = document.createElement('div'); n.style.color = 'var(--muted)'; n.textContent = text; return n; }

function resumenSeleccion() {
  const sec = document.createElement('div'); sec.className = 'section';
  sec.appendChild(h3('Resumen de selección'));
  const div = document.createElement('div'); div.className = 'small';
  div.innerHTML = `
      <b>Proyecto:</b> ${state.proyecto} &nbsp; | &nbsp;
      <b>Etapas:</b> ${state.etapas} &nbsp; | &nbsp;
      <b>Torres:</b> ${state.torres} &nbsp; | &nbsp;
      <b>Tipo:</b> ${state.tipo} &nbsp; | &nbsp;
      <b>Unidad:</b> ${state.unidad}
    `;
  sec.appendChild(div);
  return sec;
}

function pageNode(nombre) {
  const page = document.createElement('div'); page.className = 'pdf-page';
  const head = document.createElement('div'); head.className = 'brand row-between';
  head.innerHTML = `<span>Ficha del proyecto</span><span>${nombre || ''}</span>`;
  page.appendChild(head); return page;
}

function sectionNode(title, imageUrl, caption) {
  const sec = document.createElement('div'); sec.className = 'section';
  sec.appendChild(h3(title));

  const imgBox = document.createElement('div'); imgBox.className = 'imgbox';
  if (imageUrl) {
    const img = document.createElement('img');
    img.src = imageUrl; img.alt = title;
    img.onerror = () => { imgBox.innerHTML = '<small style="color:#6b7280">[Sin imagen]</small>'; };
    imgBox.appendChild(img);
  } else {
    imgBox.innerHTML = '<small style="color:#6b7280">[Sin imagen]</small>';
  }

  const p = document.createElement('div');
  p.className = 'caption';
  p.style.marginTop = '8px';
  p.innerHTML = String(caption || '');   // <--- importante

  sec.appendChild(imgBox);
  sec.appendChild(p);
  return sec;
}

function waitForImagesIn(doc, selector) {
  const scope = doc.querySelector(selector);
  if (!scope) return Promise.resolve();
  const imgs = Array.from(scope.querySelectorAll('img'));
  if (!imgs.length) return Promise.resolve();
  return Promise.all(imgs.map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise(res => { img.onload = img.onerror = res; });
  }));
}

// --- crea un iframe offscreen
function createOffscreenIframe() {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.left = '-99999px';
  iframe.style.top = '0';
  iframe.style.width = '1px';
  iframe.style.height = '1px';
  iframe.setAttribute('aria-hidden', 'true');
  document.body.appendChild(iframe);
  return iframe;
}
// ===== Exportar a PDF con html2pdf (protegido) =====
function waitForImages(containerSelector) {
  const imgs = Array.from(document.querySelectorAll(`${containerSelector} img`));
  if (!imgs.length) return Promise.resolve();
  return Promise.all(imgs.map(img => img.complete ? Promise.resolve()
    : new Promise(res => { img.onload = img.onerror = res; })));
}

// Sustituye TODO tu listener actual del botón por este
document.getElementById('btn-descargar').addEventListener('click', async () => {
  try {
    const pdfDoc = document.getElementById('pdf');

    // 1) Asegura imágenes cargadas en la PREVIEW
    await waitForImages('#pdf');

    // 2) Activa overrides SOLO durante exportación
    pdfDoc.classList.add('__export');

    // 3) Opciones seguras (sin windowWidth/Height ni transforms)
    const isFile = location.protocol === 'file:';
    const opt = {
      margin: [0, 0, 0, 0],                                        // sin márgenes
      filename: (state.nombre ? state.nombre + ' - cotizacion' : 'cotizacion') + '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 3,
        backgroundColor: '#ffffff',
        useCORS: !isFile,   // en servidor local http(s): true
        allowTaint: false,
        scrollX: 0,         // evita capturar desplazamiento
        scrollY: 0
      },
      pagebreak: { mode: ['css', 'legacy'], avoid: '.section' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    await html2pdf().set(opt).from(pdfDoc).save();
  } catch (e) {
    console.error('Error al exportar:', e);
    alert('No se pudo generar el PDF. Revisa la consola (F12).');
  } finally {
    // 4) Quita los overrides para volver a la vista normal
    document.getElementById('pdf').classList.remove('__export');
  }
});


