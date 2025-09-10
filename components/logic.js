const buttons = document.querySelectorAll("nav button");
const views = document.querySelectorAll(".view");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        views.forEach(v => v.style.display = "none");
        document.getElementById(btn.id.replace("btn-", "")).style.display = "block";
    });
});

const customers = {
    A: {
    aktuelles: "Neue IT-Infrastruktur in Planung",
    deadlines: ["Projekt A1 – 01.09.2025", "Projekt A2 – 15.09.2025"],
    planung: ["Projekt A3 – Angebotsphase"],
    auftraege: [
        ["A-2025-001", "Website Redesign", "In Bearbeitung", "Webentwicklung", "€12.500", "01.08.2025", "01.12.2025", "Herr Schmidt"],
        ["A-2025-002", "SEO Optimierung", "Warten auf Kunde", "Marketing", "€3.500", "15.08.2025", "30.09.2025", "Frau Keller"],
        ["A-2025-003", "App-Entwicklung", "In Planung", "Softwareentwicklung", "€18.000", "10.08.2025", "20.12.2025", "Herr Müller"],
        ["A-2025-004", "Content-Strategie", "Genehmigung ausstehend", "Content", "€4.200", "20.08.2025", "15.11.2025", "Frau Braun"],
        ["A-2025-005", "Server-Upgrade", "In Bearbeitung", "IT-Services", "€9.000", "05.09.2025", "10.11.2025", "Herr Fischer"]
    ],
    inventar: [
        ["ART-001", "Laptop Dell XPS 13", "Hardware", "15 Stück", "Verfügbar", "€1.200", "€1.500", "Dell GmbH"],
        ["ART-002", "Monitor 24 Zoll", "Hardware", "3 Stück", "Niedrig", "€200", "€350", "Samsung"],
        ["ART-003", "Drucker Canon Pixma", "Hardware", "5 Stück", "Verfügbar", "€150", "€250", "Canon Europe"],
        ["ART-004", "Externes Festplatte 1TB", "Hardware", "10 Stück", "Verfügbar", "€90", "€130", "Seagate"],
        ["ART-005", "Netzwerkkabel 10m", "Hardware", "20 Stück", "Verfügbar", "€10", "€15", "CableTech"],
        ["ART-006", "UPS-System 1000VA", "Hardware", "2 Stück", "Niedrig", "€300", "€400", "APC by Schneider"]
    ],
    mitarbeiter: [
        ["Max Mustermann", "Projektleiter", "IT", "Aktiv", "max@firma.de", "+49 160 123456", "01.01.2020", "Frau Müller"],
        ["Lisa Schuster", "Entwicklerin", "Software", "Aktiv", "lisa@firma.de", "+49 160 234567", "15.05.2021", "Herr Schmidt"],
        ["Peter Weber", "Marketingmanager", "Marketing", "Aktiv", "peter@firma.de", "+49 160 345678", "10.03.2019", "Frau Keller"],
        ["Julia Hoffmann", "HR-Assistentin", "Personal", "Aktiv", "julia@firma.de", "+49 160 456789", "20.07.2022", "Herr Müller"],
        ["Thomas Becker", "Netzwerktechniker", "IT", "Aktiv", "thomas@firma.de", "+49 160 567890", "05.11.2020", "Frau Braun"]
    ],
    chart: [5, 12]
    },

    B: {
        aktuelles: "Umstellung auf Cloud-Systeme",
        deadlines: ["Projekt B1 – 05.09.2025", "Projekt B2 – 20.09.2025"],
        planung: ["Projekt B3 – Vertragsverhandlung"],
        auftraege: [
            ["B-2025-001", "App Entwicklung", "In Bearbeitung", "Softwareentwicklung", "€9.800", "10.08.2025", "15.11.2025", "Herr Wagner"],
            ["B-2025-002", "Social Media Kampagne", "Genehmigung ausstehend", "Marketing", "€2.300", "20.08.2025", "10.10.2025", "Frau Schneider"],
            ["B-2025-003", "Website Maintenance", "In Planung", "Webentwicklung", "€6.500", "12.08.2025", "30.11.2025", "Herr Krause"],
            ["B-2025-004", "Datenanalyse", "Warten auf Daten", "IT-Services", "€7.200", "25.08.2025", "20.12.2025", "Frau Meier"],
        ],
        inventar: [
            ["ART-007", "Laptop Lenovo ThinkPad", "Hardware", "10 Stück", "Verfügbar", "€1.000", "€1.300", "Lenovo GmbH"],
            ["ART-008", "Drucker HP LaserJet", "Hardware", "2 Stück", "Niedrig", "€150", "€250", "HP Deutschland"],
            ["ART-009", "Server Dell PowerEdge", "Hardware", "4 Stück", "Verfügbar", "€2.000", "€2.500", "Dell GmbH"],
            ["ART-010", "Kopiergerät Ricoh", "Hardware", "3 Stück", "Niedrig", "€400", "€550", "Ricoh Germany"],
            ["ART-011", "USB-Stick 64GB", "Hardware", "25 Stück", "Verfügbar", "€15", "€25", "SanDisk"],
            ["ART-012", "Router Cisco", "Hardware", "5 Stück", "Verfügbar", "€120", "€180", "Cisco Systems"]
        ],
        mitarbeiter: [
            ["Anna Schmidt", "Entwicklerin", "Software", "Aktiv", "anna@unternehmen.de", "+49 160 654321", "15.03.2021", "Herr Becker"],
            ["Markus Klein", "Systemadministrator", "IT", "Aktiv", "markus@unternehmen.de", "+49 160 765432", "01.09.2020", "Frau Schneider"],
            ["Klara Fischer", "Grafikdesignerin", "Marketing", "Aktiv", "klara@unternehmen.de", "+49 160 876543", "22.04.2022", "Herr Wagner"],
            ["Stefan Huber", "Supportmitarbeiter", "IT", "Aktiv", "stefan@unternehmen.de", "+49 160 987654", "10.12.2018", "Herr Krause"],
            ["Elena Richter", "Projektkoordinatorin", "Management", "Aktiv", "elena@unternehmen.de", "+49 160 123789", "15.06.2021", "Frau Meier"]
        ],
        chart: [4, 5]
    },

    C: {
        aktuelles: "Neuer Serverraum einrichten",
        deadlines: ["Projekt C1 – 10.09.2025", "Projekt C2 – 25.09.2025"],
        planung: ["Projekt C3 – Budgetplanung"],
        auftraege: [
            ["C-2025-001", "Datenbank Migration", "In Bearbeitung", "IT-Services", "€15.000", "05.08.2025", "01.12.2025", "Herr Fischer"],
            ["C-2025-002", "Content Erstellung", "Warten auf Freigabe", "Content", "€1.800", "18.08.2025", "05.10.2025", "Frau Weber"],
            ["C-2025-003", "Netzwerkausbau", "In Planung", "IT-Services", "€10.500", "08.08.2025", "25.11.2025", "Herr Petersen"],
        ],
        inventar: [
            ["ART-013", "Server Rack", "Hardware", "5 Stück", "Verfügbar", "€2.500", "€3.000", "Cisco Systems"],
            ["ART-014", "Netzwerk Switch", "Hardware", "1 Stück", "Niedrig", "€300", "€450", "Netgear"],
            ["ART-015", "Laptop Acer Aspire", "Hardware", "7 Stück", "Verfügbar", "€800", "€1.100", "Acer Germany"],
            ["ART-016", "Scanner Epson", "Hardware", "4 Stück", "Niedrig", "€200", "€300", "Epson Europe"],
            ["ART-017", "Headset Jabra", "Hardware", "15 Stück", "Verfügbar", "€50", "€80", "Jabra"],
            ["ART-018", "KVM-Switch", "Hardware", "3 Stück", "Verfügbar", "€150", "€200", "Aten"]
        ],
        mitarbeiter: [
            ["Thomas Krause", "Netzwerkadministrator", "IT", "Aktiv", "thomas@firmac.de", "+49 160 789012", "20.06.2019", "Frau Hoffmann"],
            ["Sabine Vogel", "Datenanalystin", "IT", "Aktiv", "sabine@firmac.de", "+49 160 890123", "12.08.2021", "Herr Fischer"],
            ["Robert Klein", "Content Manager", "Content", "Aktiv", "robert@firmac.de", "+49 160 901234", "05.10.2020", "Frau Weber"],
            ["Maria Schuster", "Trainingsleiterin", "Schulung", "Aktiv", "maria@firmac.de", "+49 160 012345", "25.03.2022", "Herr Petersen"],
            ["Daniel Weber", "Sicherheitsberater", "IT-Sicherheit", "Aktiv", "daniel@firmac.de", "+49 160 123450", "30.09.2019", "Frau Lehmann"]
        ],
        chart: [3, 8]
    },

    D: {
        aktuelles: "Digitalisierungsstrategie entwickeln",
        deadlines: ["Projekt D1 – 15.09.2025", "Projekt D2 – 30.09.2025"],
        planung: ["Projekt D3 – Pilotphase"],
        auftraege: [
            ["D-2025-001", "CRM Implementierung", "In Bearbeitung", "Business Software", "€20.000", "01.08.2025", "15.12.2025", "Herr Lehmann"],
            ["D-2025-002", "Trainingsdokumentation", "Warten auf Feedback", "Schulung", "€1.200", "25.08.2025", "20.10.2025", "Frau Richter"],
        ],
        inventar: [
            ["ART-019", "Laptop HP EliteBook", "Hardware", "8 Stück", "Verfügbar", "€1.300", "€1.700", "HP Deutschland"],
            ["ART-020", "Externes Festplatte", "Hardware", "4 Stück", "Niedrig", "€80", "€120", "Western Digital"],
            ["ART-021", "Projektor BenQ", "Hardware", "6 Stück", "Verfügbar", "€600", "€800", "BenQ Europe"],
            ["ART-022", "Webcam Logitech", "Hardware", "12 Stück", "Verfügbar", "€70", "€100", "Logitech"],
            ["ART-023", "Docking Station", "Hardware", "9 Stück", "Verfügbar", "€150", "€200", "Kensington"],
            ["ART-024", "Firewall Palo Alto", "Hardware", "2 Stück", "Niedrig", "€1.000", "€1.300", "Palo Alto Networks"]
        ],
        mitarbeiter: [
            ["Sophie Meier", "HR Managerin", "Personal", "Aktiv", "sophie@gesellschaft.de", "+49 160 345678", "10.09.2022", "Herr Schuster"],
            ["Paul Schuster", "Softwareentwickler", "Software", "Aktiv", "paul@gesellschaft.de", "+49 160 456789", "18.02.2021", "Herr Lehmann"],
            ["Karin Hofmann", "Marketingassistentin", "Marketing", "Aktiv", "karin@gesellschaft.de", "+49 160 567890", "05.07.2020", "Frau Richter"],
            ["Lukas König", "IT-Administrator", "IT", "Aktiv", "lukas@gesellschaft.de", "+49 160 678901", "22.11.2019", "Herr Schulz"],
            ["Nina Schulz", "Projektassistentin", "Management", "Aktiv", "nina@gesellschaft.de", "+49 160 789012", "14.04.2023", "Frau Hofmann"]
        ],
        chart: [2, 5]
    }
};

let currentChart;
function loadCustomer(key) {
    const c = customers[key];

    document.getElementById("aktuelles").textContent = c.aktuelles;
    document.getElementById("deadlines").innerHTML = c.deadlines.map(d => `<li>${d}</li>`).join("");
    document.getElementById("planung").innerHTML = c.planung.map(p => `<li>${p}</li>`).join("");

    renderTable('auftraege', c.auftraege);
    renderTable('inventar', c.inventar);
    renderTable('mitarbeiter', c.mitarbeiter);

    if (currentChart) currentChart.destroy();

    const ctx = document.getElementById('auftraegeChart');

    currentChart = new Chart(ctx, {
        type: 'pie',
        data: { labels: ['Offen', 'Beendet'], datasets: [{ data: c.chart, backgroundColor: ['#ff9800', '#4caf50'] }] },
        options: { responsive: false, maintainAspectRatio: false }
    });

    updateKPIs(c);
}

function renderTable(type, data) {
    const table = document.getElementById(`${type}Table`);
    let headers = [];
    let editable = false;

    if (type === 'auftraege') {
        headers = ["Auftragsnummer", "Titel", "Status", "Kategorie", "Betrag", "Startdatum", "Enddatum", "Verantwortlicher", "Dateien"];
        table.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>`;
        data.forEach(row => {
            table.innerHTML += `<tr>${row.map(v => `<td>${v}</td>`).join("")}<td><input type='file'></td><td><button class="remove-row" onclick="removeRow(this, 'auftraege')">X</button></td></tr>`;
        });
    } else if (type === 'inventar') {
        headers = ["Artikel-Nr.", "Name", "Kategorie", "Bestand", "Status", "Preis", "Verkaufspreis", "Lieferant"];
        table.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>`;
        data.forEach(row => {
            table.innerHTML += `<tr>${row.map(v => `<td>${v}</td>`).join("")}<td><button class="remove-row" onclick="removeRow(this, 'inventar')">X</button></td></tr>`;
        });
    } else if (type === 'mitarbeiter') {
        headers = ["Name", "Position", "Abteilung", "Status", "E-Mail", "Telefon", "Eintrittsdatum", "Vorgesetzter"];
        table.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>`;
        data.forEach(row => {
            table.innerHTML += `<tr>${row.map(v => `<td>${v}</td>`).join("")}<td><button class="remove-row" onclick="removeRow(this, 'mitarbeiter')">X</button></td></tr>`;
        });
    }
}

function addNewRow(type) {
    const table = document.getElementById(`${type}Table`);
    let headers = [];
    if (type === 'auftraege') {
        headers = ["Auftragsnummer", "Titel", "Status", "Kategorie", "Betrag", "Startdatum", "Enddatum", "Verantwortlicher"];
        const newRow = document.createElement('tr');
        newRow.className = 'editable-row';
        newRow.innerHTML = headers.map(h => `<td><input type="text" placeholder="${h}"></td>`).join("") + '<td><input type="file"></td><td><button class="remove-row" onclick="removeRow(this, \'auftraege\')">X</button></td>';
        table.appendChild(newRow);
        customers[Object.keys(customers)[0]][type].push([]);
    } else if (type === 'inventar') {
        headers = ["Artikel-Nr.", "Name", "Kategorie", "Bestand", "Status", "Preis", "Verkaufspreis", "Lieferant"];
        const newRow = document.createElement('tr');
        newRow.className = 'editable-row';
        newRow.innerHTML = headers.map(h => `<td><input type="text" placeholder="${h}"></td>`).join("") + '<td><button class="remove-row" onclick="removeRow(this, \'inventar\')">X</button></td>';
        table.appendChild(newRow);
        customers[Object.keys(customers)[0]][type].push([]);
    } else if (type === 'mitarbeiter') {
        headers = ["Name", "Position", "Abteilung", "Status", "E-Mail", "Telefon", "Eintrittsdatum", "Vorgesetzter"];
        const newRow = document.createElement('tr');
        newRow.className = 'editable-row';
        newRow.innerHTML = headers.map(h => `<td><input type="text" placeholder="${h}"></td>`).join("") + '<td><button class="remove-row" onclick="removeRow(this, \'mitarbeiter\')">X</button></td>';
        table.appendChild(newRow);
        customers[Object.keys(customers)[0]][type].push([]);
    }
    updateKPIs(customers[Object.keys(customers)[0]]);
}

function removeRow(button, type) {
    const row = button.parentElement.parentElement;
    row.parentElement.removeChild(row);
    customers[Object.keys(customers)[0]][type].splice(row.rowIndex - 1, 1);
    updateKPIs(customers[Object.keys(customers)[0]]);
}

function updateKPIs(c) {
    document.getElementById("auftraegeGesamt").textContent = c.auftraege.length;
    document.getElementById("auftraegeAktiv").textContent = c.auftraege.filter(a => a[2] !== "Beendet").length;
    document.getElementById("auftraegeWert").textContent = "€" + c.auftraege.filter(a => a[2] !== "Beendet").reduce((sum, a) => sum + parseFloat(a[4].replace(/[^0-9.-]+/g, "") || 0), 0).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    document.getElementById("inventarGesamt").textContent = c.inventar.length;
    document.getElementById("inventarNiedrig").textContent = c.inventar.filter(i => i[4] === "Niedrig").length;
    document.getElementById("inventarKategorien").textContent = new Set(c.inventar.map(i => i[2])).size;

    document.getElementById("mitarbeiterGesamt").textContent = c.mitarbeiter.length;
    document.getElementById("mitarbeiterAktiv").textContent = c.mitarbeiter.filter(m => m[3] === "Aktiv").length;
    document.getElementById("mitarbeiterAbteilungen").textContent = new Set(c.mitarbeiter.map(m => m[2])).size;
}

loadCustomer('A');