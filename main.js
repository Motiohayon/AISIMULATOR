// שמירת נתונים ב-LocalStorage
function getClients() {
    return JSON.parse(localStorage.getItem('clients') || '[]');
}
function saveClients(clients) {
    localStorage.setItem('clients', JSON.stringify(clients));
}

// טיפול בסימולטור והוספת לקוח
if (document.getElementById('mortgageForm')) {
    document.getElementById('mortgageForm').onsubmit = function(e) {
        e.preventDefault();
        // ... חישוב משכנתא (ראה קוד קודם) ...
        // שמירת לקוח
        let client = {
            name: this.name.value, email: this.email.value, age: +this.age.value, status: this.status.value,
            income: +this.income.value, debts: +this.debts.value, equity: +this.equity.value,
            amount: +this.amount.value, years: +this.years.value, rate: +this.rate.value,
            createdAt: new Date().toISOString(),
            payments: 0, cycles: 0, files: []
        };
        let clients = getClients();
        clients.push(client);
        saveClients(clients);
        // הצגת תוצאות (ראה קוד קודם)
    }
}

// דשבורד (admin.html)
if (document.getElementById('clientsTable')) {
    function renderTable() {
        let clients = getClients();
        let html = clients.map((c, i) =>
            `<tr>
                <td>${c.name}</td>
                <td>${c.email||""}</td>
                <td>${c.age}</td>
                <td>${c.status}</td>
                <td>${c.income}</td>
                <td>${c.debts}</td>
                <td>${c.equity}</td>
                <td>${c.amount}</td>
                <td>${c.years}</td>
                <td>${c.rate}%</td>
                <td>
                  <button onclick="location='client.html?i=${i}'">פרטים</button>
                  <button onclick="editClient(${i})">ערוך</button>
                  <button onclick="deleteClient(${i})">מחק</button>
                </td>
            </tr>`
        ).join('');
        document.querySelector('#clientsTable tbody').innerHTML = html;
    }
    window.deleteClient = function(i) {
        let clients = getClients();
        if (confirm('למחוק לקוח?')) {
            clients.splice(i, 1); saveClients(clients); renderTable();
        }
    };
    window.editClient = function(i) {
        // טופס עריכה (פופאפ או inline, אפשר להוסיף)
        alert("פונקציית עריכה לדמו בלבד");
    };
    window.addClient = function() {
        alert("הוספת לקוח ידנית – לביצוע.");
    };
    renderTable();
}

// דף פרטי לקוח
if (location.pathname.endsWith('client.html')) {
    let i = +new URLSearchParams(location.search).get('i');
    let client = getClients()[i];
    if (client) {
        document.getElementById('clientDetail').innerHTML = `
            <strong>שם:</strong> ${client.name} <br>
            <strong>אימייל:</strong> ${client.email || ""} <br>
            <strong>גיל:</strong> ${client.age} <br>
            <strong>החזר חודשי:</strong> ... <br>
            <button onclick="alert('פונקציית העלאת קבצים לדמו');">העלה קובץ</button>
        `;
    }
}

// Login & הרשאות (דמו)
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').onsubmit = function(e) {
        e.preventDefault();
        let user = this.user.value, pass = this.pass.value;
        if ((user === 'admin@shermanbit.co.il' && pass === '1234') || (user && pass)) {
            sessionStorage.setItem('user', user);
            location = 'admin.html';
        } else {
            document.getElementById('loginError').innerText = "אימייל או סיסמה שגויים";
        }
    }
    window.resetPassword = function() {
        alert("שליחת קישור איפוס לדוא\"ל (פיצ'ר דמו)");
    }
}
window.logout = function() {
    sessionStorage.removeItem('user');
    location = 'login.html';
}