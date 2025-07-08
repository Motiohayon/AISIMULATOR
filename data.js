// טעינה ראשונית של דמו
if (!localStorage.getItem('clients')) {
    localStorage.setItem('clients', JSON.stringify([
        {
            name: "יוסי כהן", email: "yossi@gmail.com", age: 34, status: "נשוי", income: 18500, debts: 2500, equity: 400000,
            amount: 1200000, years: 25, rate: 4.2, createdAt: "2025-01-01T10:00:00Z", payments: 140, cycles: 1, files: []
        }
    ]));
}