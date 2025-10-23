const CONFIG = {
  Canarias: {
    presentacion: {
      img: 'Img/LOGO_CANARIAS.JPG',
      caption: n => `Bienvenido a ${n} Club Condominio,  un proyecto de apartamentos NO VIS en Cúcuta, el primer proyecto residencial que se construirá en Ciudad Viva, una zona diseñada para el futuro. Aquí vivirás al estilo “Todo Incluido”, combinando confort, tecnología y entretenimiento en un entorno seguro y pensado para compartir con quienes más amas diseñado bajo el concepto de ciudad dentro de ciudad.`
    },
    ubicacionProy: { img: 'Img/planta_canarias.JPG', caption: 'Cra 1 # 2–34, Barrio Centro – Ciudad' },
    actividades: [
      { Zona: 'Zona BBQ', estado: 'Completado' },
      { Zona: 'Gimnasio', estado: 'En curso' },
      { Zona: 'Salón social', estado: 'Programado' }
    ],
    ubicacionApto: { img: 'Img/Tipo1canarias.PNG', caption: 'Torre A – Piso 5 – Apto 502' },
    cotizacionDet: {
      valorApartamento: 315000000,
      beneficioPrograma: '',
      valorHoy: 315000000,
      cuotaInicialPct: 30,
      separacion: 2000000,
      meses: 120,
      cuotaMensual: 1452000,
      lineaProducto: 'Leasing habitacional',
      vigenciaTexto: '30 días'
    },
    cotizacion: [
      { concepto: 'Apartamento 60 m²', valor: 280000000 },
      { concepto: 'Bodega', valor: 15000000 },
    ],
  },
  Nogales: {
    presentacion: { img: 'Img/LOGO_NOGALES.JPG', 
      caption: n => `Bienvenido a ${n} Club Condominio,  un proyecto de apartamentos NO VIS en Cúcuta, el primer proyecto residencial que se construirá en Ciudad Viva, una zona diseñada para el futuro. Aquí vivirás al estilo “Todo Incluido”, combinando confort, tecnología y entretenimiento en un entorno seguro y pensado para compartir con quienes más amas diseñado bajo el concepto de ciudad dentro de ciudad.`
    },
    ubicacionProy: { img: 'Img/planta_nogal.jpg', caption: 'Av. Nogales 123 – Sector Norte' },
    actividades: [{ Zona: 'Salón social', estado: 'Programado' }],
    ubicacionApto: { img: 'Img/Tipo1nogales.PNG', caption: 'Torre B – Piso 3 – Apto 304' },
    cotizacionDet: {
      valorApartamento: 315000000, beneficioPrograma: '', valorHoy: 315000000,
      cuotaInicialPct: 30, separacion: 2000000, meses: 120, cuotaMensual: 1452000,
      lineaProducto: 'Leasing habitacional', vigenciaTexto: '30 días'
    },
    cotizacion: [{ concepto: 'Apartamento 60 m²', valor: 280000000 }]
  },
  Dehesa: {
    presentacion: { img: 'Img/LOGO_DEHESA.JPG',
      caption: n => `Bienvenido a ${n} Club Condominio,  un proyecto de apartamentos NO VIS en Cúcuta, el primer proyecto residencial que se construirá en Ciudad Viva, una zona diseñada para el futuro. Aquí vivirás al estilo “Todo Incluido”, combinando confort, tecnología y entretenimiento en un entorno seguro y pensado para compartir con quienes más amas diseñado bajo el concepto de ciudad dentro de ciudad.`
      },
    ubicacionProy: { img: 'Img/planta_dehesa.JPG', caption: 'Calle 45 # 10–22, Dehesa' },
    actividades: [{ Zona: 'Zona BBQ', estado: 'Completado' }],
    ubicacionApto: { img: 'Img/Tipo1dehesa.PNG', caption: 'Torre C – Piso 7 – Apto 702' },
    cotizacionDet: {
      valorApartamento: 315000000, beneficioPrograma: '', valorHoy: 315000000,
      cuotaInicialPct: 30, separacion: 2000000, meses: 120, cuotaMensual: 1452000,
      lineaProducto: 'Leasing habitacional', vigenciaTexto: '30 días'
    },
    cotizacion: [{ concepto: 'Apartamento 60 m²', valor: 280000000 }]
  }
};
// ===============================================================

// UNIDADES y utilidades (sin cambios)
const UNIDADES = {
  Apartamento: ['Apto 301', 'Apto 502', 'Apto 702'],
  Penthouse: ['PH 1', 'PH 2']
};

const $ = s => document.querySelector(s);
const state = { proyecto: '', nombre: '', etapas: '', torres: '', tipo: '', unidad: '' };

// ---------- Helpers UI ----------
function h3(text) { const el = document.createElement('h3'); el.textContent = text; return el; }
function note(text) { const n = document.createElement('div'); n.style.color = 'var(--muted)'; n.textContent = text; return n; }


function pageNode(nombre) {
  const page = document.createElement('div'); page.className = 'pdf-page';
  const head = document.createElement('div'); head.className = 'brand row-between';
  head.innerHTML = `<span>Cotización</span><span>${nombre || ''}</span>`;
  page.appendChild(head); return page;
}

// version mejorada de sectionNode (usa innerHTML para caption)
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
  p.innerHTML = String(caption || '');   // permite <br>
  sec.appendChild(imgBox);
  sec.appendChild(p);
  return sec;
}

// ---------- NUEVAS PIEZAS: Presentación & Firma ----------
function presentationNode(conf, proyectoNombre, clienteNombre) {
  const sec = document.createElement('div');
  sec.className = 'section';

  // No mostramos el título "Presentación" si no se desea,
  // el cliente pidió que no sea necesario mostrar la palabra.
  // Pero mantenemos estructura con logo + texto.
  const wrapper = document.createElement('div');
  wrapper.style.display = 'flex';
  wrapper.style.gap = '18px';
  wrapper.style.alignItems = 'flex-start';

  // Logo circular pequeño
  const logoWrap = document.createElement('div');
  logoWrap.style.width = '120px';
  logoWrap.style.height = '120px';
  logoWrap.style.flex = '0 0 120px';
  logoWrap.style.display = 'flex';
  logoWrap.style.alignItems = 'center';
  logoWrap.style.justifyContent = 'center';
  logoWrap.style.borderRadius = '999px';
  logoWrap.style.overflow = 'hidden';
  logoWrap.style.boxShadow = '0 6px 18px rgba(15,23,42,0.08)';
  logoWrap.style.background = '#fff';

  if (conf.presentacion?.img) {
    const img = document.createElement('img');
    img.src = conf.presentacion.img;
    img.alt = proyectoNombre + ' logo';
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.onerror = () => { logoWrap.innerHTML = '<small style="color:#6b7280">[Sin imagen]</small>'; };
    logoWrap.appendChild(img);
  } else {
    logoWrap.innerHTML = '<small style="color:#6b7280">[Sin logo]</small>';
  }

  // Texto formateado
  const txt = document.createElement('div');
  txt.style.flex = '1 1 auto';
  txt.style.fontSize = '14px';
  txt.style.lineHeight = '1.45';
  txt.innerHTML = `
    <div style="font-weight:700; margin-bottom:8px;">Bienvenido Señor(a) ${escapeHtml(clienteNombre)}</div>
    <div style="font-weight:600; margin-bottom:6px;">Descubre ${escapeHtml(proyectoNombre)}, el primer proyecto de vivienda en Ciudad Viva</div>
    <div style="margin-bottom:10px;">Vive en un apartamento con club exclusivo y espacios premium</div>
    <div style="color:var(--muted);">${conf.presentacion?.caption && typeof conf.presentacion.caption === 'function' 
      ? conf.presentacion.caption(proyectoNombre)
      : (conf.presentacion?.caption || '')}</div>
  `;
  wrapper.appendChild(logoWrap);
  wrapper.appendChild(txt);

  sec.appendChild(wrapper);
  return sec;
}

function signatureNode(exec) {
  const sec = document.createElement('div');
  sec.className = 'section';
  sec.style.marginTop = '18px';

  // aquí no ponemos título grande, lo dejamos como elemento tipo firma visual
  const wrapOuter = document.createElement('div');
  wrapOuter.style.display = 'flex';
  wrapOuter.style.alignItems = 'center';
  wrapOuter.style.gap = '16px';
  wrapOuter.style.padding = '12px';
  wrapOuter.style.borderRadius = '12px';
  wrapOuter.style.background = '#fff'; // mantiene contraste con la section
  wrapOuter.style.boxShadow = '0 4px 14px rgba(2,6,23,0.04)';
  wrapOuter.style.border = '1px solid var(--stroke)';

  const photo = document.createElement('div');
  photo.style.width = '72px';
  photo.style.height = '72px';
  photo.style.borderRadius = '8px';
  photo.style.overflow = 'hidden';
  photo.style.display = 'flex';
  photo.style.alignItems = 'center';
  photo.style.justifyContent = 'center';
  photo.style.background = '#f3f4f6';

  if (exec.photoURL) {
    const img = document.createElement('img');
    img.src = exec.photoURL;
    img.alt = exec.name || 'Foto ejecutivo';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    photo.appendChild(img);
  } else {
    photo.innerHTML = `<div style="padding:6px;color:var(--muted);font-size:12px;text-align:center">No hay foto</div>`;
  }

  const info = document.createElement('div');
  info.style.display = 'flex';
  info.style.flexDirection = 'column';
  info.style.gap = '6px';
  info.style.fontSize = '14px';
  info.style.color = 'var(--text)';

  const nombreEl = document.createElement('div');
  nombreEl.style.fontWeight = '700';
  nombreEl.textContent = exec.name || '';

  const lineaContacto = document.createElement('div');
  lineaContacto.style.color = 'var(--muted)';
  lineaContacto.style.fontSize = '13px';
  // texto fijo + celular dinámico
  lineaContacto.innerHTML = `Para mayor información, por favor contacte al ejecutivo al número <strong>${escapeHtml(exec.cel || '')}</strong>`;

  const correoEl = document.createElement('div');
  correoEl.style.color = 'var(--muted)';
  correoEl.style.fontSize = '13px';
  correoEl.textContent = exec.email || '';

  info.appendChild(nombreEl);
  info.appendChild(lineaContacto);
  info.appendChild(correoEl);

  wrapOuter.appendChild(photo);
  wrapOuter.appendChild(info);

  sec.appendChild(wrapOuter);
  return sec;
}


// simple escape to avoid inyectar HTML desde inputs
function escapeHtml(s) {
  if (!s) return '';
  return String(s).replace(/[&<>"']/g, function (m) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]; });
}

// Espera a que las imgs dentro de selector estén cargadas
function waitForImages(containerSelector) {
  const imgs = Array.from(document.querySelectorAll(`${containerSelector} img`));
  if (!imgs.length) return Promise.resolve();
  return Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(res => { img.onload = img.onerror = res; })));
}

function onePerPageEnabled() {
  const newToggle = document.getElementById('opt-one-per-page');
  if (newToggle) return Boolean(newToggle.checked);
  const old = document.getElementById('chk-per-page');
  return old ? Boolean(old.checked) : false;
}
// ---------- Flujo escalonado (igual que antes, con los mismos IDs) ----------
// Paso 1: Buscar proyecto (limpia estado)
$('#btn-buscar').addEventListener('click', () => {
  // Limpiar estado global
  state.proyecto = ''; state.nombre = ''; state.etapas = ''; state.torres = ''; state.tipo = ''; state.unidad = '';

  // Limpiar selects y UI
  $('#sel-etapas').value = '';
  $('#sel-torres').value = '';
  $('#sel-tipo').value = '';
  $('#sel-unidad').innerHTML = '';
  $('#wrap-unidad').classList.add('hidden');
  ['#step-etapas', '#step-torres', '#step-tipo', '#step-contenido'].forEach(sel => {
    const el = $(sel);
    if (el) el.classList.add('hidden');
  });

  // Desmarcar checks (si los tienes)
  document.querySelectorAll('#step-contenido input[type="checkbox"]').forEach(chk => chk.checked = false);

  // Limpia preview
  const pdf = document.getElementById('pdf');
  pdf.innerHTML = `
    <div class="pdf-page">
      <div class="brand row-between">
        <span>Cotización</span><span id="pdf-nombre"></span>
      </div>
      <div class="section">
        <div style="color:var(--muted)">Sigue el flujo de la izquierda y pulsa <b>Generar cotización</b>.</div>
      </div>
    </div>
  `;

  const proyecto = $('#sel-proyecto').value;
  if (!proyecto) { alert('Selecciona un proyecto'); return; }

  state.proyecto = proyecto;
  state.nombre = proyecto;
  $('#pdf-nombre').textContent = proyecto;

  const s = $('#step-etapas');
  s.classList.remove('hidden'); s.classList.add('revealed');
  s.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Paso 2+: manejos de selects (igual que antes)
$('#sel-etapas').addEventListener('change', (e) => {
  state.etapas = e.target.value || '';
  if (!state.etapas) return;
  const s = $('#step-torres'); s.classList.remove('hidden'); s.classList.add('revealed'); s.scrollIntoView({ behavior:'smooth', block:'nearest' });
});
$('#sel-torres').addEventListener('change', (e) => {
  state.torres = e.target.value || '';
  if (!state.torres) return;
  const s = $('#step-tipo'); s.classList.remove('hidden'); s.classList.add('revealed'); s.scrollIntoView({ behavior:'smooth', block:'nearest' });
});
$('#sel-tipo').addEventListener('change', (e) => {
  state.tipo = e.target.value || '';
  const wrap = $('#wrap-unidad'); const selUnidad = $('#sel-unidad');
  if (!state.tipo) { wrap.classList.add('hidden'); return; }
  selUnidad.innerHTML = ''; const opts = UNIDADES[state.tipo] || [];
  selUnidad.append(new Option('— Seleccionar —', ''));
  const prefijos = (state.torres === '2') ? ['Torre A ', 'Torre B '] : [''];
  prefijos.forEach(pref => opts.forEach(u => selUnidad.append(new Option(pref + u, pref + u))));
  wrap.classList.remove('hidden');
});
$('#sel-unidad').addEventListener('change', (e) => {
  state.unidad = e.target.value || '';
  if (!state.unidad) return;
  const s = $('#step-contenido'); s.classList.remove('hidden'); s.classList.add('revealed'); s.scrollIntoView({ behavior:'smooth', block:'nearest' });
});

// ---------- Generar vista (sección 3) ----------
// Ahora: SE OBLIGA que cliente y ejecutivo estén completos.
$('#btn-generar').addEventListener('click', () => {
  // Validaciones: cliente + ejecutivo
  const nombreCliente = ($('#cliente-nombre') && $('#cliente-nombre').value.trim()) || '';
  const nombreEjecutivo = ($('#ejecutivo-nombre') && $('#ejecutivo-nombre').value.trim()) || '';
  const emailEjecutivo = ($('#ejecutivo-email') && $('#ejecutivo-email').value.trim()) || '';
  const celEjecutivo = ($('#ejecutivo-cel') && $('#ejecutivo-cel').value.trim()) || '';

  if (!nombreCliente) {
    alert('Por favor completa el nombre del cliente antes de generar la cotización.');
    $('#cliente-nombre').focus();
    return;
  }
  if (!nombreEjecutivo) {
    alert('Por favor completa el nombre del ejecutivo antes de generar la cotización.');
    $('#ejecutivo-nombre').focus();
    return;
  }
  if (!emailEjecutivo) {
    alert('Por favor completa el email del ejecutivo antes de generar la cotización.');
    $('#ejecutivo-email').focus();
    return;
  }
  if (!celEjecutivo) {
    alert('Por favor completa el celular del ejecutivo antes de generar la cotización.');
    $('#ejecutivo-cel').focus();
    return;
  }

  // Comprobamos selección de proyecto/etapas/...
  if (!state.proyecto || !state.etapas || !state.torres || !state.tipo || !state.unidad) {
    alert('Completa proyecto, etapas, torres, tipo y unidad antes de generar.');
    return;
  }

  const conf = CONFIG[state.proyecto] || {};
  const pdf = document.getElementById('pdf');
  pdf.innerHTML = ''; // reset
  const blocks = [];

  // 1) Presentación SIEMPRE (primero) - usa cliente y proyecto
  blocks.push(presentationNode(conf, state.nombre, nombreCliente));


  // 3) Ubicación del proyecto (si chequeado)
  if ($('#chk-ubi-proy') && $('#chk-ubi-proy').checked) {
    blocks.push(sectionNode('Ubicación del proyecto', conf.ubicacionProy?.img, conf.ubicacionProy?.caption || ''));
  }

  // 4) Actividades
  if ($('#chk-actividades') && $('#chk-actividades').checked) {
    const sec = document.createElement('div'); sec.className = 'section';
    sec.appendChild(h3('Actividades del proyecto'));
    const actividades = conf.actividades || [];
    if (actividades.length === 0) sec.appendChild(note('Sin actividades registradas.'));
    else {
      const table = document.createElement('table');
      table.innerHTML = '<thead><tr><th>Zona</th><th>Estado</th></tr></thead>';
      const tb = document.createElement('tbody');
      actividades.forEach(a => {
        const nombre = a.actividad ?? a.Zona ?? '';
        const estado = a.estado ?? '';
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${escapeHtml(nombre)}</td><td>${escapeHtml(estado)}</td>`;
        tb.appendChild(tr);
      });
      table.appendChild(tb); sec.appendChild(table);
    }
    blocks.push(sec);
  }

  // 5) Ubicación del apartamento
  if ($('#chk-ubi-apto') && $('#chk-ubi-apto').checked) {
    blocks.push(sectionNode('Ubicación del apartamento', conf.ubicacionApto?.img, conf.ubicacionApto?.caption || ''));
  }

  // 6) Cotización (tabla detallada) - si está chequeado
  if ($('#chk-cotizacion') && $('#chk-cotizacion').checked) {
    const sec = document.createElement('div'); sec.className = 'section';
    sec.appendChild(h3('Cotización Detallada'));

    // tratando de preferir los valores desde conf.cotizacionDet si existen
    const d = conf.cotizacionDet || {};
    const valorApartamento = d.valorApartamento ?? 0;
    const beneficioPrograma = d.beneficioPrograma ?? '';
    const valorHoy = d.valorHoy ?? valorApartamento;
    const cuotaInicialPct = d.cuotaInicialPct ?? 30;
    const separacion = d.separacion ?? 0;
    const meses = d.meses ?? 0;
    const cuotaMensual = d.cuotaMensual ?? 0;
    const lineaProducto = d.lineaProducto ?? '';

    // tabla principal (HTML string para mantener diseño)
    sec.innerHTML += `
      <table class="styled">
        <thead><tr><th>Concepto</th><th>Valor</th></tr></thead>
        <tbody>
          <tr><td>Valor del apartamento</td><td>$${Number(valorApartamento).toLocaleString('es-CO')}</td></tr>
          <tr><td>Beneficio programa</td><td>${beneficioPrograma || '-'}</td></tr>
          <tr><td>Valor al día de hoy</td><td>$${Number(valorHoy).toLocaleString('es-CO')}</td></tr>
          <tr><td>Valor cuota inicial (${cuotaInicialPct}%)</td><td>$${Math.round(valorApartamento * cuotaInicialPct/100).toLocaleString('es-CO')}</td></tr>
          <tr><td>Separación</td><td>$${Number(separacion).toLocaleString('es-CO')}</td></tr>
        </tbody>
      </table>
      <br>
      <table class="styled">
        <thead><tr><th>Valor cuota mensual (meses)</th><th>Detalle</th></tr></thead>
        <tbody>
          <tr><td>${meses || '-'}</td><td>$${Number(cuotaMensual).toLocaleString('es-CO')} (${escapeHtml(lineaProducto)})</td></tr>
        </tbody>
      </table>
      <p style="margin-top:10px;color:var(--muted)">Esta cotización tiene vigencia de ${d.vigenciaTexto || '—'}</p>
    `;
    // Moneda extranjera y financieros como en tu ejemplo
    sec.innerHTML += `
      <br>
      <h4>Cotización Moneda extranjera</h4>
      <table class="styled">
        <thead><tr><th>Moneda</th><th>Valor</th></tr></thead>
        <tbody>
          <tr><td>Valor de la inversión</td><td>$104.651</td></tr>
          <tr><td>Cuota de separación</td><td>$233</td></tr>
          <tr><td>Valor cuota inicial</td><td>$31.395</td></tr>
          <tr><td>Valor final</td><td>$73.256</td></tr>
          <tr><td><b>Valor cuota mensual</b></td><td><b>$452</b></td></tr>
        </tbody>
      </table>
      <br>
      <h4>Datos financieros</h4>
      <table class="styled">
        <thead><tr><th>Concepto</th><th>Valor</th></tr></thead>
        <tbody>
          <tr><td>Valor</td><td>$315.000.000</td></tr>
          <tr><td>Tasa de interés anual</td><td>10.5%</td></tr>
          <tr><td>Años de financiamiento</td><td>20</td></tr>
          <tr><td><b>Cuota bancaria estimada</b></td><td><b>$3.144.897</b></td></tr>
        </tbody>
      </table>
    `;
    blocks.push(sec);
  }

  // 7) Finalmente: firma del ejecutivo (SIEMPRE)
  // obtenemos los datos del formulario
  const execFileInput = $('#ejecutivo-foto');
  let photoURL = null;
  if (execFileInput && execFileInput.files && execFileInput.files[0]) {
    photoURL = URL.createObjectURL(execFileInput.files[0]);
  }
  const execData = {
    name: nombreEjecutivo,
    email: emailEjecutivo,
    cel: celEjecutivo,
    photoURL: photoURL
  };

  // montaje final: colocamos bloques en la página(s)
const onePerPage = onePerPageEnabled();
  if (onePerPage) {
    blocks.forEach(b => {
      const p = pageNode(state.nombre);
      p.appendChild(b);
      // si b es la última (firma) la añadimos al final; aquí ya está en orden
      pdf.appendChild(p);
    });
    // añadimos firma como página extra si no la incluyó en bloques (la incluimos ahora)
    const signSec = signatureNode(execData);
    // si quieres que la firma vaya en la misma página final en lugar de nueva página:
    // la insertamos en la última `pdf-page`:
    const lastPage = pdf.querySelector('.pdf-page:last-child');
    if (lastPage) lastPage.appendChild(signSec);
    else {
      const p2 = pageNode(state.nombre);
      p2.appendChild(signSec);
      pdf.appendChild(p2);
    }
  } else {
    const p = pageNode(state.nombre);
    blocks.forEach(b => p.appendChild(b));
    // firma al final en la misma página
    p.appendChild(signatureNode(execData));
    pdf.appendChild(p);
  }

  // Si creamos un objectURL para la foto, revocar después (evitar fuga)
  if (photoURL) {
    // revoke when image loads or after small timeout
    setTimeout(() => URL.revokeObjectURL(photoURL), 5000);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Exportar a PDF (igual que antes, con small tweaks) =====
// Reemplaza tu listener actual por este bloque.
// Genera el PDF a partir de un CLON offscreen para evitar mover la UI.
document.getElementById('btn-descargar').addEventListener('click', async () => {
  const pdfDoc = document.getElementById('pdf');
  if (!pdfDoc) return alert('No se encontró el contenedor de previsualización.');

  // crea un contenedor offscreen (fuera de pantalla)
  const off = document.createElement('div');
  off.setAttribute('aria-hidden','true');
  off.style.position = 'fixed';
  off.style.left = '-99999px';
  off.style.top = '0';
  off.style.width = '210mm';         // ancho A4 exacto para html2pdf
  off.style.height = 'auto';
  off.style.overflow = 'hidden';
  off.style.background = '#fff';
  document.body.appendChild(off);

  // clona el contenido del preview (deep clone)
  const clone = pdfDoc.cloneNode(true);
  // si quieres forzar la clase de export para el clone (opcional)
  clone.classList.add('__export');

  // método helper local para esperar imgs dentro del nodo clon
  function waitImagesInNode(node) {
    const imgs = Array.from(node.querySelectorAll('img'));
    if (!imgs.length) return Promise.resolve();
    return Promise.all(imgs.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(res => { img.onload = img.onerror = res; });
    }));
  }

  try {
    // inserta clon en el contenedor offscreen
    off.appendChild(clone);

    // espera que las imgs del clon se carguen
    await waitImagesInNode(clone);

    // opciones html2pdf (igual que usabas)
    const isFile = location.protocol === 'file:';
    const opt = {
      margin: [0, 0, 0, 0],
      filename: (state.nombre ? state.nombre + ' - cotizacion' : 'cotizacion') + '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 3,
        backgroundColor: '#ffffff',
        useCORS: !isFile,
        allowTaint: false,
        scrollX: 0,
        scrollY: 0
      },
      pagebreak: { mode: ['css', 'legacy'], avoid: '.section' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // generar y descargar PDF a partir del CLON
    await html2pdf().set(opt).from(clone).save();
  } catch (err) {
    console.error('Error exportando PDF (clon):', err);
    alert('No se pudo generar el PDF. Revisa la consola (F12).');
  } finally {
    // limpieza: revocar object URLs si existen imgs con objectURL
    // (no obligatorio aquí, pero seguro)
    const imgs = off.querySelectorAll('img');
    imgs.forEach(img => {
      if (img.src && img.src.startsWith('blob:')) {
        try { URL.revokeObjectURL(img.src); } catch(e) {}
      }
    });

    // quitar contenedor offscreen
    if (off && off.parentNode) off.parentNode.removeChild(off);
  }
});


