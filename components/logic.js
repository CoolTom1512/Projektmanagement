// =================== Demo-Daten =========================================
const customers = {
  A: {
    name: "Alpha GmbH",
    aktuelles: ["Q4-Angebot in Vorbereitung", "Neues Ticket-System angefragt"],
    deadlines: ["20.09 – Angebot Finalisierung", "28.09 – Review mit Sales"],
    planung: ["Pilot-Workshop Oktober", "Datenmigration Test"],
    contacts: [
      { name: "Max Mustermann", rolle: "Geschäftsführer", mail: "max@alpha.de", tel: "+49 611 123456" }
    ],
    calendar: [
      { date: "2025-09-15", title: "Sprint Review" }
    ],
    auftraege: [
      ["A-101","CRM Einführung", "25.000 €", "Offen", []],
      ["A-102","Datenmigration", "8.500 €", "In Arbeit", []],
      ["A-103","Schulung Team", "2.000 €", "Beendet", []],
    ],
    inventar: [
      ["I-1","Server Rack","2","Wiesbaden"],
      ["I-2","Laptops","25","Mainz"]
    ],
    mitarbeiter: [
      ["M-1","Lena König","Projektleitung","l.koenig@alpha.de"],
      ["M-2","Tariq Aziz","Entwicklung","t.aziz@alpha.de"]
    ],
    chart: [0,0]
  },
  B: {
    name: "Beta AG",
    aktuelles: ["Servicevertrag verlängern"],
    deadlines: ["18.09 – Service-Review"],
    planung: [],
    contacts: [{ name: "Julia Neumann", rolle: "COO", mail: "j.neumann@beta.com", tel: "+49 30 998877" }],
    calendar: [],
    auftraege: [
      ["B-201","Ticket-Portal", "12.000 €", "Beendet", []],
      ["B-202","Dashboard KPIs", "6.750 €", "Offen", []],
    ],
    inventar: [["I-4","Switches","8","Berlin"]],
    mitarbeiter: [["M-5","O. Schuster","Service","os@beta.com"]],
    chart: [0,0]
  },
  C: { name:"Cappa Solutions", aktuelles:[], deadlines:[], planung:["Workshop Planung"], contacts:[], calendar:[], auftraege:[], inventar:[], mitarbeiter:[], chart:[0,0] },
  D: { name:"Delta KG", aktuelles:["Roadmap-Abstimmung"], deadlines:["25.09 – Angebotspräsentation"], planung:[], contacts:[{name:"H. Berger",rolle:"GF",mail:"hb@delta.de",tel:"+49 89 111222"}], calendar:[], auftraege:[["D-301","Integration ERP","18.000 €","In Arbeit",[]]], inventar:[], mitarbeiter:[], chart:[0,0] }
};

// =================== State & Navigation =================================
let currentKey = null;
let currentCustomer = null;
let ordersChart = null;

document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.target).classList.add('active');
  });
});

function renderCustomerList() {
  const ul = document.getElementById('customerList');
  ul.innerHTML = '';
  Object.keys(customers).forEach(key=>{
    const li = document.createElement('li');

    // Name
    const span = document.createElement('span');
    span.textContent = `${key} · ${customers[key].name || 'Kunde'}`;
    span.style.cursor = "pointer";
    span.addEventListener('click', ()=> loadCustomer(key));
    li.appendChild(span);

    // Löschen-Button
    const rm = document.createElement('button');
    rm.className = 'btn btn-ghost btn-sm';
    rm.textContent = '✕';
    rm.style.marginLeft = '6px';
    rm.addEventListener('click', (e)=>{
      e.stopPropagation(); // nicht loadCustomer triggern
      if (confirm(`Kunde "${customers[key].name}" wirklich löschen?`)) {
        delete customers[key];
        // neuen aktuellen Kunden laden, falls der aktive gelöscht wurde
        const restKeys = Object.keys(customers);
        if (restKeys.length > 0) {
          loadCustomer(restKeys[0]);
        } else {
          currentKey = null;
          currentCustomer = null;
          ul.innerHTML = '<li><em>Keine Kunden mehr</em></li>';
        }
      }
    });
    li.appendChild(rm);

    if (key === currentKey) li.classList.add('active');
    ul.appendChild(li);
  });
}


document.getElementById('btnAddCustomer').addEventListener('click', ()=>{
  const name = prompt("Name des neuen Kunden?");
  if (!name) return;
  const base = name.replace(/[^A-Za-z0-9]/g,'').toUpperCase().slice(0,2) || 'NE';
  let idx=1, key=base;
  while(customers[key]) { idx++; key = base + idx; }
  customers[key] = {
    name,
    aktuelles: [], deadlines: [], planung: [],
    contacts: [], calendar: [],
    auftraege: [], inventar: [], mitarbeiter: [],
    chart:[0,0]
  };
  renderCustomerList();
  loadCustomer(key);
});

// =================== Dashboard ==========================================
function renderSimpleList(ulId, arr){
  const ul = document.getElementById(ulId);
  ul.innerHTML = '';
  (arr || []).forEach((text, i)=>{
    const li = document.createElement('li');
    li.textContent = text;
    const rm = document.createElement('button');
    rm.className = 'btn btn-ghost btn-sm';
    rm.textContent = '✕';
    rm.style.marginLeft = '6px';
    rm.addEventListener('click', ()=>{
      arr.splice(i,1);
      renderSimpleList(ulId, arr);
      updateKPIs(currentCustomer);
      renderChart(currentCustomer);
    });
    li.appendChild(rm);
    ul.appendChild(li);
  });
}

function renderContactsList(contacts){
  const ul = document.getElementById('contactsList');
  ul.innerHTML = '';
  (contacts || []).forEach((c, i)=>{
    const li = document.createElement('li');
    li.innerHTML = `<strong>${c.name}</strong> – ${c.rolle} · 
      <a href="mailto:${c.mail}">${c.mail}</a> · <a href="tel:${c.tel}">${c.tel}</a>`;
    const rm = document.createElement('button');
    rm.className = 'btn btn-ghost btn-sm';
    rm.textContent = '✕';
    rm.style.marginLeft = '6px';
    rm.addEventListener('click', ()=>{
      contacts.splice(i,1);
      renderContactsList(contacts);
      updateKPIs(currentCustomer);
    });
    li.appendChild(rm);
    ul.appendChild(li);
  });
}

// Edit-Buttons
document.getElementById('btnEditAktuelles').addEventListener('click', ()=>{
  const txt = prompt("Neuen Eintrag für 'Aktuelles' hinzufügen:");
  if (txt){ currentCustomer.aktuelles.push(txt); renderSimpleList('aktuellesList', currentCustomer.aktuelles); }
});
document.getElementById('btnEditDeadlines').addEventListener('click', ()=>{
  const txt = prompt("Neuen 'Deadline'-Eintrag (z.B. 20.09 – Angebot) hinzufügen:");
  if (txt){ currentCustomer.deadlines.push(txt); renderSimpleList('deadlinesList', currentCustomer.deadlines); updateKPIs(currentCustomer); }
});
document.getElementById('btnEditPlanung').addEventListener('click', ()=>{
  const txt = prompt("Neuen Eintrag für 'In Planung' hinzufügen:");
  if (txt){ currentCustomer.planung.push(txt); renderSimpleList('planungList', currentCustomer.planung); }
});
document.getElementById('btnEditKontakte').addEventListener('click', ()=>{
  const name = prompt("Kontaktname?");
  if (!name) return;
  const rolle = prompt("Rolle (z.B. Geschäftsführer)?") || "";
  const mail  = prompt("E-Mail?") || "";
  const tel   = prompt("Telefon?") || "";
  currentCustomer.contacts.push({ name, rolle, mail, tel });
  renderContactsList(currentCustomer.contacts);
  updateKPIs(currentCustomer);
});

// Kalender
document.getElementById('calendarForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const date = document.getElementById('calDate').value;
  const title = document.getElementById('calTitle').value.trim();
  if (!date || !title) return;
  currentCustomer.calendar.push({ date, title });
  renderCalendarList();
  e.target.reset();
});
function renderCalendarList(){
  const ul = document.getElementById('calendarList');
  ul.innerHTML = '';
  const items = [...(currentCustomer.calendar||[])].sort((a,b)=> a.date.localeCompare(b.date));
  items.forEach(ev=>{
    const li = document.createElement('li');
    li.textContent = `${ev.date}: ${ev.title}`;
    const rm = document.createElement('button');
    rm.className = 'btn btn-ghost btn-sm';
    rm.textContent = '✕';
    rm.style.marginLeft = '6px';
    rm.addEventListener('click', ()=>{
      const idx = currentCustomer.calendar.findIndex(e=> e.date===ev.date && e.title===ev.title);
      if (idx>-1) currentCustomer.calendar.splice(idx,1);
      renderCalendarList();
      updateKPIs(currentCustomer);
    });
    li.appendChild(rm);
    ul.appendChild(li);
  });
}

// =================== Chart + KPIs =======================================
function renderChart(cust){
  const canvas = document.getElementById('ordersChart');
  if (!canvas) return;

  // Chart an Elternhöhe anpassen
  const parent = canvas.parentElement;
  canvas.width = parent.clientWidth;
  canvas.height = parent.clientHeight;

  const ctx = canvas.getContext('2d');
  const data = cust.chart || [0,0];
  if (ordersChart) ordersChart.destroy();
  ordersChart = new Chart(ctx, {
    type:'doughnut',
    data:{ labels:['Offen','Beendet'],
      datasets:[{ data }] },
    options:{
      responsive:true,
      maintainAspectRatio:false, /* -> nutzt chart-wrap Höhe */
      cutout:'55%',
      plugins:{
        tooltip:{ enabled:false },
        legend:{
          position:'bottom',
          labels:{
            color:'#f7f9ff' // or use generateLabels to match slice colors
          }
        },
        datalabels:{
          color:(ctx)=> ctx.dataIndex === 0 ? '#6aa6ff' : '#4ade80',
  formatter:(value,ctx)=>{
    const label = ctx.chart.data.labels[ctx.dataIndex];
    const sum = ctx.chart.data.datasets[0].data.reduce((a,b)=>a+b,0) || 1;
    const pct = Math.round((value*100)/sum);
    return `${label}\n${pct}%`;
  },
  anchor:'center',
  align:'center',
  textAlign:'center',
  color:'#f8faff',                // hellere Schrift
  font:{ weight:'bold', size:12 }, // größer, fetter
  textStrokeColor:'#000',
  textStrokeWidth:1.5,              // sorgt für Kontrast
  shadowBlur:4,                   // weicher Shadow
  shadowColor:'rgba(0,0,0,.8)'    // dunkler Schatten für besseren Kontrast
}

      }
    },
    plugins:[ChartDataLabels]
  });
}

function updateKPIs(cust){
  const auf = cust.auftraege || [];
  const offen = auf.filter(r => (r[3]||'').toLowerCase() !== 'beendet').length;
  const beendet = auf.length - offen;

  const upcomingDeadlines = (cust.deadlines || []).filter(d=>{
    const m = d.match(/(\d{1,2})\.(\d{1,2})/);
    if (!m) return false;
    const year = new Date().getFullYear();
    const dt = new Date(year, parseInt(m[2])-1, parseInt(m[1]));
    const diff = (dt - new Date()) / 86400000;
    return diff >= 0 && diff <= 7;
  }).length + (cust.calendar || []).filter(ev=>{
    const diff = (new Date(ev.date) - new Date()) / 86400000;
    return diff >= 0 && diff <= 7;
  }).length;

  const elOpen   = document.getElementById('kpi-open-orders');
  const elWeek   = document.getElementById('kpi-deadlines-week');
  const elCont   = document.getElementById('kpi-contacts');
  if (elOpen) elOpen.textContent = offen;
  if (elWeek) elWeek.textContent = upcomingDeadlines;
  if (elCont) elCont.textContent = (cust.contacts || []).length;

  cust.chart = [offen, beendet];
}

// =================== Tabellen: Sortierung ================================
function makeTablesSortable(){
  document.querySelectorAll('table.sortable thead th[data-col]').forEach((th, idx)=>{
    th.classList.add('sortable');
    th.addEventListener('click', ()=>{
      const table = th.closest('table');
      const tbody = table.querySelector('tbody');
      const headers = table.querySelectorAll('thead th');
      headers.forEach(h=>h.classList.remove('sort-asc','sort-desc'));
      const asc = !th.classList.contains('sort-asc');
      th.classList.toggle('sort-asc', asc);
      th.classList.toggle('sort-desc', !asc);

      const rows = Array.from(tbody.querySelectorAll('tr'));
      rows.sort((a,b)=>{
        const A = a.children[idx].innerText.trim();
        const B = b.children[idx].innerText.trim();
        const nA = parseFloat(A.replace(/[^\d.,-]/g,'').replace(',','.'));
        const nB = parseFloat(B.replace(/[^\d.,-]/g,'').replace(',','.'));
        const bothNum = !isNaN(nA) && !isNaN(nB);
        if (bothNum) return asc ? nA - nB : nB - nA;
        return asc ? A.localeCompare(B, 'de', {numeric:true}) : B.localeCompare(A, 'de', {numeric:true});
      });
      rows.forEach(r=>tbody.appendChild(r));
    });
  });
}

// =================== Aufträge ===========================================
function fileToDataURL(file){
  return new Promise(res=>{
    const fr = new FileReader();
    fr.onload = ()=>res(fr.result);
    fr.readAsDataURL(file);
  });
}

function renderOrdersTable(data){
  const tbody = document.getElementById('ordersTbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  data.forEach((row)=>{
    if (!Array.isArray(row)) row = [];
    if (!row[4]) row[4] = []; // attachments
    const tr = document.createElement('tr');

    // ID
    const tdId = document.createElement('td'); tdId.textContent = row[0] ?? ''; tr.appendChild(tdId);
    // Titel
    const tdTitle = document.createElement('td'); tdTitle.textContent = row[1] ?? ''; tr.appendChild(tdTitle);
    // Wert
    const tdWert = document.createElement('td'); tdWert.textContent = row[2] ?? ''; tr.appendChild(tdWert);
    // Status
    const tdStatus = document.createElement('td');
    const sel = document.createElement('select');
    ['Offen','In Arbeit','Beendet'].forEach(s=>{
      const opt = document.createElement('option'); opt.value=s; opt.textContent=s;
      if ((row[3]||'').toLowerCase() === s.toLowerCase()) opt.selected = true;
      sel.appendChild(opt);
    });
    sel.addEventListener('change', ()=>{
      row[3] = sel.value;
      updateKPIs(currentCustomer);
      renderChart(currentCustomer);
    });
    tdStatus.appendChild(sel); tr.appendChild(tdStatus);

    // Anhänge
    const tdFiles = document.createElement('td');
    const list = document.createElement('div'); list.className = 'file-list';
    const renderFiles = ()=>{
      list.innerHTML = '';
      row[4].forEach((f, idx)=>{
        const a = document.createElement('a'); a.href = f.url; a.download = f.name; a.textContent = f.name;
        a.style.marginRight = '6px';
        const rm = document.createElement('button'); rm.className='btn btn-ghost btn-sm'; rm.textContent='✕';
        rm.addEventListener('click', ()=>{ row[4].splice(idx,1); renderFiles(); });
        const wrap = document.createElement('span'); wrap.appendChild(a); wrap.appendChild(rm);
        list.appendChild(wrap);
      });
    };
    renderFiles();

    const inp = document.createElement('input'); inp.type='file';
    inp.addEventListener('change', async (e)=>{
      const file = e.target.files?.[0]; if (!file) return;
      const url = await fileToDataURL(file);
      row[4].push({ name:file.name, url });
      renderFiles(); inp.value='';
    });

    tdFiles.appendChild(list); tdFiles.appendChild(inp);
    tr.appendChild(tdFiles);

    // Aktion
    const tdAct = document.createElement('td');
    const btnEdit = document.createElement('button'); btnEdit.className='btn btn-ghost btn-sm'; btnEdit.textContent='Bearbeiten';
    let editing = false;
    btnEdit.addEventListener('click', ()=>{
      editing = !editing;
      btnEdit.textContent = editing ? 'Speichern' : 'Bearbeiten';
      tdTitle.contentEditable = editing ? 'true' : 'false';
      tdWert.contentEditable  = editing ? 'true' : 'false';
      if (!editing){
        row[1] = tdTitle.textContent.trim();
        row[2] = tdWert.textContent.trim();
      }
    });
    tdAct.appendChild(btnEdit);
    tr.appendChild(tdAct);

    tbody.appendChild(tr);
  });
}

const btnAddOrder = document.getElementById('btnAddOrder');
if (btnAddOrder){
  btnAddOrder.addEventListener('click', ()=>{
    const id = prompt("Auftrags-ID?");
    if (!id) return;
    const titel = prompt("Titel?") || "";
    const wert = prompt("Wert (€)?") || "";
    const status = "Offen";
    currentCustomer.auftraege.push([id, titel, wert, status, []]);
    renderOrdersTable(currentCustomer.auftraege);
    updateKPIs(currentCustomer);
    renderChart(currentCustomer);
  });
}

// =================== Inventar & Mitarbeiter ==============================
function renderSimpleMatrix(tbodyId, arr, editableColsIdx){
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  tbody.innerHTML = '';
  (arr||[]).forEach((row, rIdx)=>{
    const tr = document.createElement('tr');
    row.forEach((cell)=>{
      const td = document.createElement('td'); td.textContent = cell ?? '';
      tr.appendChild(td);
    });
    const tdAct = document.createElement('td');
    const btnEdit = document.createElement('button'); btnEdit.className='btn btn-ghost btn-sm'; btnEdit.textContent='Bearbeiten';
    let editing = false;
    btnEdit.addEventListener('click', ()=>{
      editing = !editing;
      btnEdit.textContent = editing ? 'Speichern' : 'Bearbeiten';
      editableColsIdx.forEach(idx=>{
        const td = tr.children[idx];
        td.contentEditable = editing ? 'true' : 'false';
        if (!editing){
          row[idx] = td.textContent.trim();
        }
      });
    });
    const btnDel = document.createElement('button'); btnDel.className='btn btn-ghost btn-sm'; btnDel.textContent='✕';
    btnDel.style.marginLeft='6px';
    btnDel.addEventListener('click', ()=>{
      arr.splice(rIdx,1);
      renderSimpleMatrix(tbodyId, arr, editableColsIdx);
    });
    tdAct.appendChild(btnEdit); tdAct.appendChild(btnDel); tr.appendChild(tdAct);
    tbody.appendChild(tr);
  });
}

const btnAddInventar = document.getElementById('btnAddInventar');
if (btnAddInventar){
  btnAddInventar.addEventListener('click', ()=>{
    const id = prompt("Inventar-ID?"); if (!id) return;
    const artikel = prompt("Artikel?") || "";
    const menge = prompt("Menge?") || "1";
    const standort = prompt("Standort?") || "";
    currentCustomer.inventar.push([id, artikel, menge, standort]);
    renderSimpleMatrix('inventarTbody', currentCustomer.inventar, [1,2,3]);
  });
}
const btnAddStaff = document.getElementById('btnAddStaff');
if (btnAddStaff){
  btnAddStaff.addEventListener('click', ()=>{
    const id = prompt("Mitarbeiter-ID?"); if (!id) return;
    const name = prompt("Name?") || "";
    const rolle = prompt("Rolle?") || "";
    const mail = prompt("E-Mail?") || "";
    currentCustomer.mitarbeiter.push([id, name, rolle, mail]);
    renderSimpleMatrix('staffTbody', currentCustomer.mitarbeiter, [1,2,3]);
  });
}

// =================== Laden & Init =======================================
function loadCustomer(key){
  currentKey = key;
  currentCustomer = customers[key];

  renderCustomerList();

  renderSimpleList('aktuellesList', currentCustomer.aktuelles || []);
  renderSimpleList('deadlinesList', currentCustomer.deadlines || []);
  renderSimpleList('planungList',  currentCustomer.planung  || []);
  renderContactsList(currentCustomer.contacts || []);
  renderCalendarList();

  updateKPIs(currentCustomer);
  renderChart(currentCustomer);

  renderOrdersTable(currentCustomer.auftraege || []);
  renderSimpleMatrix('inventarTbody', currentCustomer.inventar || [], [1,2,3]);
  renderSimpleMatrix('staffTbody', currentCustomer.mitarbeiter || [], [1,2,3]);

  makeTablesSortable();
}

(function init(){
  const firstKey = Object.keys(customers)[0];
  loadCustomer(firstKey);
})();
