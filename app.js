// ==================== CONFIGURATION ====================
const CONFIG = {
  Canarias: {
    presentacion: {
      img: 'Img/LOGO_CANARIAS.JPG',
      caption: n => `Bienvenido a ${n} Club Condominio, un proyecto de apartamentos NO VIS en Cúcuta, el primer proyecto residencial que se construirá en Ciudad Viva, una zona diseñada para el futuro. Aquí vivirás al estilo "Todo Incluido", combinando confort, tecnología y entretenimiento en un entorno seguro y pensado para compartir con quienes más amas diseñado bajo el concepto de ciudad dentro de ciudad.`
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
    presentacion: { 
      img: 'Img/LOGO_NOGALES.JPG', 
      caption: n => `Bienvenido a ${n} Club Condominio, un proyecto de apartamentos NO VIS en Cúcuta, el primer proyecto residencial que se construirá en Ciudad Viva, una zona diseñada para el futuro. Aquí vivirás al estilo "Todo Incluido", combinando confort, tecnología y entretenimiento en un entorno seguro y pensado para compartir con quienes más amas diseñado bajo el concepto de ciudad dentro de ciudad.`
    },
    ubicacionProy: { img: 'Img/planta_nogal.jpg', caption: 'Av. Nogales 123 – Sector Norte' },
    actividades: [{ Zona: 'Salón social', estado: 'Programado' }],
    ubicacionApto: { img: 'Img/Tipo1nogales.PNG', caption: 'Torre B – Piso 3 – Apto 304' },
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
    cotizacion: [{ concepto: 'Apartamento 60 m²', valor: 280000000 }]
  },
  Dehesa: {
    presentacion: { 
      img: 'Img/LOGO_DEHESA.JPG',
      caption: n => `Bienvenido a ${n} Club Condominio, un proyecto de apartamentos NO VIS en Cúcuta, el primer proyecto residencial que se construirá en Ciudad Viva, una zona diseñada para el futuro. Aquí vivirás al estilo "Todo Incluido", combinando confort, tecnología y entretenimiento en un entorno seguro y pensado para compartir con quienes más amas diseñado bajo el concepto de ciudad dentro de ciudad.`
    },
    ubicacionProy: { img: 'Img/planta_dehesa.JPG', caption: 'Calle 45 # 10–22, Dehesa' },
    actividades: [{ Zona: 'Zona BBQ', estado: 'Completado' }],
    ubicacionApto: { img: 'Img/Tipo1dehesa.PNG', caption: 'Torre C – Piso 7 – Apto 702' },
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
    cotizacion: [{ concepto: 'Apartamento 60 m²', valor: 280000000 }]
  }
};

const UNIDADES = {
  Apartamento: ['Apto 301', 'Apto 502', 'Apto 702'],
  Penthouse: ['PH 1', 'PH 2']
};

const VALIDATION_RULES = {
  name: {
    maxLength: 100,
    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    message: 'Solo se permiten letras, espacios, ñ y acentos'
  },
  email: {
    maxLength: 100,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Ingrese un correo electrónico válido (ejemplo@dominio.com)'
  },
  phone: {
    length: 10,
    pattern: /^[0-9]{10}$/,
    message: 'Ingrese un número de celular válido (10 dígitos)'
  }
};

// ==================== UTILITIES ====================
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const state = {
  proyecto: '',
  nombre: '',
  etapas: '',
  torres: '',
  tipo: '',
  unidad: ''
};

// HTML escaping utility
const escapeHtml = str => {
  if (!str) return '';
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(str).replace(/[&<>"']/g, m => map[m]);
};

// Format currency
const formatCurrency = value => `$${Number(value).toLocaleString('es-CO')}`;

// Wait for images to load
const waitForImages = container => {
  const imgs = typeof container === 'string' 
    ? Array.from($(container + ' img'))
    : Array.from(container.querySelectorAll('img'));
  
  if (!imgs.length) return Promise.resolve();
  
  return Promise.all(
    imgs.map(img => 
      img.complete 
        ? Promise.resolve() 
        : new Promise(res => { img.onload = img.onerror = res; })
    )
  );
};

// Check if one-per-page option is enabled
const isOnePerPageEnabled = () => {
  const toggle = $('#opt-one-per-page');
  return toggle ? Boolean(toggle.checked) : false;
};

// ==================== VALIDATION FUNCTIONS ====================
// Sanitize input (remove invalid characters)
const sanitizeInput = (value, type) => {
  switch(type) {
    case 'name':
      return value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    case 'phone':
      return value.replace(/\D/g, '').slice(0, 10);
    case 'email':
      return value.replace(/\s/g, '');
    default:
      return value;
  }
};
['name', 'email', 'phone'].forEach(type => {
  const selectorMap = {
    name: ['#cliente-nombre', '#ejecutivo-nombre'],
    email: ['#ejecutivo-email'],
    phone: ['#ejecutivo-cel']
  };

  selectorMap[type].forEach(sel => {
    const input = document.querySelector(sel);
    if (input) {
      input.addEventListener('input', e => {
        e.target.value = sanitizeInput(e.target.value, type);
        validateField(e.target, type);
      });
      input.addEventListener('blur', e => validateField(e.target, type));
      
    }
  });
});
// Validate field in real-time
const validateField = (input, type) => {
  const value = input.value.trim();
  const rules = VALIDATION_RULES[type];
  let errorMsg = '';

  switch(type) {
    case 'name':
      if (value && !rules.pattern.test(value)) {
        errorMsg = rules.message;
      } else if (value.length > rules.maxLength) {
        errorMsg = `Máximo ${rules.maxLength} caracteres`;
      }
      break;
    
    case 'email':
      if (value && !rules.pattern.test(value)) {
        errorMsg = rules.message;
      } else if (value.length > rules.maxLength) {
        errorMsg = `Máximo ${rules.maxLength} caracteres`;
      }
      break;
    
    case 'phone':
      if (value && !rules.pattern.test(value)) {
        errorMsg = rules.message;
      }
      break;
  }

  // Show/hide error message
  let errorEl = input.parentElement.querySelector('.input-error');
  if (errorMsg) {
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'input-error';
      errorEl.style.color = '#ef4444';
      errorEl.style.fontSize = '12px';
      errorEl.style.marginTop = '4px';
      errorEl.style.marginBottom = '8px';
      errorEl.textContent = errorMsg;
      input.parentElement.appendChild(errorEl);
    } else {
      errorEl.textContent = errorMsg;
    }
    input.style.borderColor = '#ef4444';
    input.style.background = '#fef2f2';
    return false;
  } else {
    if (errorEl) {
      errorEl.remove();
    }
    input.style.borderColor = '';
    input.style.background = '';
    return true;
  }

  
};

// ==================== DOM BUILDERS ====================
const createElement = (tag, props = {}, children = []) => {
  const el = document.createElement(tag);
  
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'style' && typeof value === 'object') {
      Object.assign(el.style, value);
    } else if (key === 'className') {
      el.className = value;
    } else if (key === 'innerHTML') {
      el.innerHTML = value;
    } else {
      el[key] = value;
    }
  });
  
  children.forEach(child => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else if (child) {
      el.appendChild(child);
    }
  });
  
  return el;
};

const createHeading = text => createElement('h3', { textContent: text });

const createNote = text => createElement('div', {
  style: { color: 'var(--muted)' },
  textContent: text
});

const createPageNode = nombre => {
  const page = createElement('div', { className: 'pdf-page' });
  const head = createElement('div', {
    className: 'brand row-between',
    innerHTML: `<span>Cotización</span><span>${nombre || ''}</span>`
  });
  page.appendChild(head);
  return page;
};

const createImageBox = (imageUrl, title) => {
  const imgBox = createElement('div', { className: 'imgbox' });
  
  if (imageUrl) {
    const img = createElement('img', { src: imageUrl, alt: title });
    img.onerror = () => {
      imgBox.innerHTML = '<small style="color:#6b7280">[Sin imagen]</small>';
    };
    imgBox.appendChild(img);
  } else {
    imgBox.innerHTML = '<small style="color:#6b7280">[Sin imagen]</small>';
  }
  
  return imgBox;
};

const createSectionNode = (title, imageUrl, caption) => {
  const section = createElement('div', { className: 'section' });
  section.appendChild(createHeading(title));
  section.appendChild(createImageBox(imageUrl, title));
  
  const captionEl = createElement('div', {
    className: 'caption',
    style: { marginTop: '8px' },
    innerHTML: String(caption || '')
  });
  
  section.appendChild(captionEl);
  return section;
};

// ==================== PRESENTATION & SIGNATURE ====================
const createPresentationNode = (conf, proyectoNombre, clienteNombre) => {
  const logoWrap = createElement('div', {
    style: {
      width: '120px',
      height: '120px',
      flex: '0 0 120px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '999px',
      overflow: 'hidden',
      boxShadow: '0 6px 18px rgba(15,23,42,0.08)',
      background: '#fff'
    }
  });

  if (conf.presentacion?.img) {
    const img = createElement('img', {
      src: conf.presentacion.img,
      alt: `${proyectoNombre} logo`,
      style: { maxWidth: '90%', maxHeight: '90%' }
    });
    img.onerror = () => {
      logoWrap.innerHTML = '<small style="color:#6b7280">[Sin logo]</small>';
    };
    logoWrap.appendChild(img);
  } else {
    logoWrap.innerHTML = '<small style="color:#6b7280">[Sin logo]</small>';
  }

  const captionText = conf.presentacion?.caption && typeof conf.presentacion.caption === 'function'
    ? conf.presentacion.caption(proyectoNombre)
    : (conf.presentacion?.caption || '');

  const txt = createElement('div', {
    style: { flex: '1 1 auto', fontSize: '14px', lineHeight: '1.45' },
    innerHTML: `
      <div style="font-weight:700; margin-bottom:8px;">Bienvenido Señor(a) ${escapeHtml(clienteNombre)}</div>
      <div style="font-weight:600; margin-bottom:6px;">Descubre ${escapeHtml(proyectoNombre)}, el primer proyecto de vivienda en Ciudad Viva</div>
      <div style="margin-bottom:10px;">Vive en un apartamento con club exclusivo y espacios premium</div>
      <div style="color:var(--muted);">${captionText}</div>
    `
  });

  const wrapper = createElement('div', {
    style: { display: 'flex', gap: '18px', alignItems: 'flex-start' }
  }, [logoWrap, txt]);

  return createElement('div', { className: 'section' }, [wrapper]);
};

const createSignatureNode = exec => {
  const photo = createElement('div', {
    style: {
      width: '72px',
      height: '72px',
      borderRadius: '8px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f3f4f6'
    }
  });

  if (exec.photoURL) {
    const img = createElement('img', {
      src: exec.photoURL,
      alt: exec.name || 'Foto ejecutivo',
      style: { width: '100%', height: '100%', objectFit: 'cover' }
    });
    photo.appendChild(img);
  } else {
    photo.innerHTML = '<div style="padding:6px;color:var(--muted);font-size:12px;text-align:center">No hay foto</div>';
  }

  const info = createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      fontSize: '14px',
      color: 'var(--text)'
    },
    innerHTML: `
      <div style="font-weight:700">${escapeHtml(exec.name || '')}</div>
      <div style="color:var(--muted);font-size:13px">
        Para mayor información, por favor contacte al ejecutivo al número <strong>${escapeHtml(exec.cel || '')}</strong>
      </div>
      <div style="color:var(--muted);font-size:13px">${escapeHtml(exec.email || '')}</div>
    `
  });

  const wrapper = createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '12px',
      borderRadius: '12px',
      background: '#fff',
      boxShadow: '0 4px 14px rgba(2,6,23,0.04)',
      border: '1px solid var(--stroke)'
    }
  }, [photo, info]);

  return createElement('div', {
    className: 'section',
    style: { marginTop: '18px' }
  }, [wrapper]);
};

// ==================== SECTION BUILDERS ====================
const createActivitiesSection = actividades => {
  const section = createElement('div', { className: 'section' });
  section.appendChild(createHeading('Actividades del proyecto'));

  if (!actividades.length) {
    section.appendChild(createNote('Sin actividades registradas.'));
    return section;
  }

  const table = createElement('table');
  table.innerHTML = '<thead><tr><th>Zona</th><th>Estado</th></tr></thead>';
  
  const tbody = createElement('tbody');
  actividades.forEach(a => {
    const nombre = a.actividad ?? a.Zona ?? '';
    const estado = a.estado ?? '';
    const tr = createElement('tr', {
      innerHTML: `<td>${escapeHtml(nombre)}</td><td>${escapeHtml(estado)}</td>`
    });
    tbody.appendChild(tr);
  });
  
  table.appendChild(tbody);
  section.appendChild(table);
  return section;
};

const createCotizacionSection = conf => {
  const section = createElement('div', { className: 'section' });
  section.appendChild(createHeading('Cotización Detallada'));

  const d = conf.cotizacionDet || {};
  const {
    valorApartamento = 0,
    beneficioPrograma = '',
    valorHoy = valorApartamento,
    cuotaInicialPct = 30,
    separacion = 0,
    meses = 0,
    cuotaMensual = 0,
    lineaProducto = '',
    vigenciaTexto = '—'
  } = d;

  const cuotaInicial = Math.round(valorApartamento * cuotaInicialPct / 100);

  section.innerHTML += `
    <table class="styled">
      <thead><tr><th>Concepto</th><th>Valor</th></tr></thead>
      <tbody>
        <tr><td>Valor del apartamento</td><td>${formatCurrency(valorApartamento)}</td></tr>
        <tr><td>Beneficio programa</td><td>${beneficioPrograma || '-'}</td></tr>
        <tr><td>Valor al día de hoy</td><td>${formatCurrency(valorHoy)}</td></tr>
        <tr><td>Valor cuota inicial (${cuotaInicialPct}%)</td><td>${formatCurrency(cuotaInicial)}</td></tr>
        <tr><td>Separación</td><td>${formatCurrency(separacion)}</td></tr>
      </tbody>
    </table>
    <br>
    <table class="styled">
      <thead><tr><th>Valor cuota mensual (meses)</th><th>Detalle</th></tr></thead>
      <tbody>
        <tr><td>${meses || '-'}</td><td>${formatCurrency(cuotaMensual)} (${escapeHtml(lineaProducto)})</td></tr>
      </tbody>
    </table>
    <p style="margin-top:10px;color:var(--muted)">Esta cotización tiene vigencia de ${vigenciaTexto}</p>
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

  return section;
};

// ==================== FORM VALIDATION ====================
const validateForm = () => {
  const fields = {
    nombreCliente: $('#cliente-nombre')?.value.trim() || '',
    nombreEjecutivo: $('#ejecutivo-nombre')?.value.trim() || '',
    emailEjecutivo: $('#ejecutivo-email')?.value.trim() || '',
    celEjecutivo: $('#ejecutivo-cel')?.value.trim() || ''
  };

  const validations = [
    { field: 'nombreCliente', message: 'Por favor completa el nombre del cliente antes de generar la cotización.', element: '#cliente-nombre' },
    { field: 'nombreEjecutivo', message: 'Por favor completa el nombre del ejecutivo antes de generar la cotización.', element: '#ejecutivo-nombre' },
    { field: 'emailEjecutivo', message: 'Por favor completa el email del ejecutivo antes de generar la cotización.', element: '#ejecutivo-email' },
    { field: 'celEjecutivo', message: 'Por favor completa el celular del ejecutivo antes de generar la cotización.', element: '#ejecutivo-cel' }
  ];

  for (const validation of validations) {
    if (!fields[validation.field]) {
      alert(validation.message);
      $(validation.element)?.focus();
      return null;
    }
  }

  return fields;
};

// ==================== UI HELPERS ====================
const resetState = () => {
  Object.keys(state).forEach(key => state[key] = '');
  
  $('#sel-etapas').value = '';
  $('#sel-torres').value = '';
  $('#sel-tipo').value = '';
  $('#sel-unidad').innerHTML = '';
  $('#wrap-unidad').classList.add('hidden');
  
  ['#step-etapas', '#step-torres', '#step-tipo', '#step-contenido'].forEach(sel => {
    $(sel)?.classList.add('hidden');
  });
  
  $$('#step-contenido input[type="checkbox"]').forEach(chk => chk.checked = false);
};

const resetPreview = () => {
  const pdf = $('#pdf');
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
};

const showStep = stepId => {
  const step = $(stepId);
  if (step) {
    step.classList.remove('hidden');
    step.classList.add('revealed');
    step.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
};

const populateUnidades = () => {
  const wrap = $('#wrap-unidad');
  const selUnidad = $('#sel-unidad');
  
  if (!state.tipo) {
    wrap.classList.add('hidden');
    return;
  }
  
  selUnidad.innerHTML = '';
  const opts = UNIDADES[state.tipo] || [];
  selUnidad.appendChild(new Option('— Seleccionar —', ''));
  
  const prefijos = state.torres === '2' ? ['Torre A ', 'Torre B '] : [''];
  prefijos.forEach(pref => {
    opts.forEach(u => selUnidad.appendChild(new Option(pref + u, pref + u)));
  });
  
  wrap.classList.remove('hidden');
};

// ==================== CONTENT GENERATION ====================
const getExecutiveData = () => {
  const execFileInput = $('#ejecutivo-foto');
  let photoURL = null;
  
  if (execFileInput?.files?.[0]) {
    photoURL = URL.createObjectURL(execFileInput.files[0]);
  }
  
  return {
    name: $('#ejecutivo-nombre').value.trim(),
    email: $('#ejecutivo-email').value.trim(),
    cel: $('#ejecutivo-cel').value.trim(),
    photoURL
  };
};

const generateBlocks = (conf, nombreCliente) => {
  const blocks = [];
  
  // 1. Presentación (always first)
  blocks.push(createPresentationNode(conf, state.nombre, nombreCliente));
  
  // 2. Ubicación del proyecto
  if ($('#chk-ubi-proy')?.checked) {
    blocks.push(createSectionNode(
      'Ubicación del proyecto',
      conf.ubicacionProy?.img,
      conf.ubicacionProy?.caption || ''
    ));
  }
  
  // 3. Actividades
  if ($('#chk-actividades')?.checked) {
    blocks.push(createActivitiesSection(conf.actividades || []));
  }
  
  // 4. Ubicación del apartamento
  if ($('#chk-ubi-apto')?.checked) {
    blocks.push(createSectionNode(
      'Ubicación del apartamento',
      conf.ubicacionApto?.img,
      conf.ubicacionApto?.caption || ''
    ));
  }
  
  // 5. Cotización
  if ($('#chk-cotizacion')?.checked) {
    blocks.push(createCotizacionSection(conf));
  }
  
  return blocks;
};

const renderPDF = (blocks, execData) => {
  const pdf = $('#pdf');
  pdf.innerHTML = '';
  
  const signSec = createSignatureNode(execData);
  
  if (isOnePerPageEnabled()) {
    // Each block on separate page
    blocks.forEach(block => {
      const page = createPageNode(state.nombre);
      page.appendChild(block);
      pdf.appendChild(page);
    });
    
    // Signature on last page
    const lastPage = pdf.querySelector('.pdf-page:last-child');
    if (lastPage) {
      lastPage.appendChild(signSec);
    } else {
      const page = createPageNode(state.nombre);
      page.appendChild(signSec);
      pdf.appendChild(page);
    }
  } else {
    // All blocks on one page
    const page = createPageNode(state.nombre);
    blocks.forEach(block => page.appendChild(block));
    page.appendChild(signSec);
    pdf.appendChild(page);
  }
  
  // Store photoURL in state for later cleanup (don't revoke immediately)
  state.currentPhotoURL = execData.photoURL;
};

// ==================== PDF EXPORT ====================
const exportToPDF = async () => {
  const pdfDoc = $('#pdf');
  if (!pdfDoc) {
    alert('No se encontró el contenedor de previsualización.');
    return;
  }

  // Create offscreen container
  const offscreen = createElement('div', {
    style: {
      position: 'fixed',
      left: '-99999px',
      top: '0',
      width: '210mm',
      height: 'auto',
      overflow: 'hidden',
      background: '#fff'
    }
  });
  offscreen.setAttribute('aria-hidden', 'true');
  document.body.appendChild(offscreen);

  const clone = pdfDoc.cloneNode(true);
  clone.classList.add('__export');

  try {
    offscreen.appendChild(clone);
    await waitForImages(offscreen);

    const isFile = location.protocol === 'file:';
    const options = {
      margin: [0, 0, 0, 0],
      filename: `${state.nombre || 'cotizacion'} - cotizacion.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 3,
        backgroundColor: '#ffffff',
        useCORS: !isFile,
        allowTaint: false,
        scrollX: 0,
        scrollY: 0,
        logging: true
      },
      pagebreak: { mode: ['css', 'legacy'], avoid: '.section' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    await html2pdf().set(options).from(clone).save();
  } catch (err) {
    console.error('Error exportando PDF:', err);
    console.error('Stack:', err.stack);
    alert('No se pudo generar el PDF. Error: ' + err.message + '\nRevisa la consola (F12) para más detalles.');
  } finally {
    // Cleanup
    offscreen.querySelectorAll('img').forEach(img => {
      if (img.src?.startsWith('blob:')) {
        try { URL.revokeObjectURL(img.src); } catch(e) {}
      }
    });
    
    offscreen.parentNode?.removeChild(offscreen);
  }
};

// ==================== EVENT HANDLERS ====================
const handleBuscar = () => {
  resetState();
  resetPreview();

  const proyecto = $('#sel-proyecto').value;
  if (!proyecto) {
    alert('Selecciona un proyecto');
    return;
  }

  state.proyecto = proyecto;
  state.nombre = proyecto;
  $('#pdf-nombre').textContent = proyecto;
  
  showStep('#step-etapas');
};

const handleEtapasChange = e => {
  state.etapas = e.target.value || '';
  if (state.etapas) showStep('#step-torres');
};

const handleTorresChange = e => {
  state.torres = e.target.value || '';
  if (state.torres) showStep('#step-tipo');
};

const handleTipoChange = e => {
  state.tipo = e.target.value || '';
  populateUnidades();
};

const handleUnidadChange = e => {
  state.unidad = e.target.value || '';
  if (state.unidad) showStep('#step-contenido');
};

const handleGenerar = () => {
  // Validate form
  const formData = validateForm();
  if (!formData) return;

  // Validate project selection
  if (!state.proyecto || !state.etapas || !state.torres || !state.tipo || !state.unidad) {
    alert('Completa proyecto, etapas, torres, tipo y unidad antes de generar.');
    return;
  }

  const conf = CONFIG[state.proyecto] || {};
  const blocks = generateBlocks(conf, formData.nombreCliente);
  const execData = getExecutiveData();
  
  renderPDF(blocks, execData);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ==================== INITIALIZATION ====================
const init = () => {
  $('#btn-buscar').addEventListener('click', handleBuscar);
  $('#sel-etapas').addEventListener('change', handleEtapasChange);
  $('#sel-torres').addEventListener('change', handleTorresChange);
  $('#sel-tipo').addEventListener('change', handleTipoChange);
  $('#sel-unidad').addEventListener('change', handleUnidadChange);
  $('#btn-generar').addEventListener('click', handleGenerar);
  $('#btn-descargar').addEventListener('click', exportToPDF);
};


// Start the application
init();

