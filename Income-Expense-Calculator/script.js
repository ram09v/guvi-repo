// --- DOM Elements ---
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');

const balanceEl = document.getElementById('net-balance');
const incomeEl = document.getElementById('total-income');
const expenseEl = document.getElementById('total-expense');

const listEl = document.getElementById('transaction-list');
const emptyStateEl = document.getElementById('empty-state');
const filterRadios = document.getElementsByName('filter');

// --- State Management ---
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let editId = null;

// --- Helper Functions ---
function formatCurrency(amount) {
    return amount.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// --- Functions ---

function init() {
    renderList();
    updateValues();
}

function generateID() {
    return Math.floor(Math.random() * 100000000);
}

function updateValues() {
    const amounts = transactions.map(t => t.type === 'income' ? t.amount : -t.amount);
    
    const total = amounts.reduce((acc, item) => acc + item, 0);
    
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);

    const expense = (
        transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0) * -1
    );

    balanceEl.innerText = `₹${formatCurrency(total)}`;
    incomeEl.innerText = `+₹${formatCurrency(income)}`;
    expenseEl.innerText = `₹${formatCurrency(Math.abs(expense))}`;
}

function renderList() {
    listEl.innerHTML = '';
    
    let filterValue = 'all';
    for (const radio of filterRadios) {
        if (radio.checked) {
            filterValue = radio.value;
            break;
        }
    }

    const filteredTransactions = transactions.filter(t => {
        if (filterValue === 'all') return true;
        return t.type === filterValue;
    });

    if (filteredTransactions.length === 0) {
        emptyStateEl.classList.remove('hidden');
    } else {
        emptyStateEl.classList.add('hidden');
    }

    filteredTransactions.forEach(transaction => {
        const sign = transaction.type === 'income' ? '+' : '-';
        const colorClass = transaction.type === 'income' ? 'border-r-4 border-green-400' : 'border-r-4 border-red-400';
        const amountColor = transaction.type === 'income' ? 'text-green-600' : 'text-red-600';

        const item = document.createElement('li');
        item.className = `bg-white border border-gray-200 shadow-sm rounded-lg p-3 flex justify-between items-center ${colorClass} hover:shadow-md transition`;

        item.innerHTML = `
            <div class="flex flex-col">
                <span class="font-semibold text-gray-800">${transaction.description}</span>
                <span class="text-xs text-gray-500 uppercase">${transaction.type}</span>
            </div>
            <div class="flex items-center gap-4">
                <span class="font-bold ${amountColor}">${sign}₹${formatCurrency(Math.abs(transaction.amount))}</span>
                <div class="flex gap-2">
                    <button class="text-blue-500 hover:text-blue-700" onclick="loadEdit(${transaction.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </button>
                    <button class="text-red-500 hover:text-red-700" onclick="removeTransaction(${transaction.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>
        `;

        listEl.appendChild(item);
    });
}

function handleFormSubmit(e) {
    e.preventDefault();

    const text = descriptionInput.value.trim();
    const amount = +amountInput.value;
    const type = typeInput.value;

    if (text === '' || amount === 0) return;

    if (editId) {
        const transactionIndex = transactions.findIndex(t => t.id === editId);
        transactions[transactionIndex] = { id: editId, description: text, amount: amount, type: type };
        editId = null;
        submitBtn.innerText = 'Add Entry';
        submitBtn.classList.replace('bg-green-600', 'bg-slate-800');
        submitBtn.classList.replace('hover:bg-green-700', 'hover:bg-slate-900');
    } else {
        const transaction = {
            id: generateID(),
            description: text,
            amount: amount,
            type: type
        };
        transactions.push(transaction);
    }

    updateLocalStorage();
    init();
    resetForm();
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
    if (editId === id) {
        resetForm();
    }
}

function loadEdit(id) {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;

    descriptionInput.value = transaction.description;
    amountInput.value = transaction.amount;
    typeInput.value = transaction.type;
    editId = id;

    submitBtn.innerText = 'Update Entry';
    submitBtn.classList.replace('bg-slate-800', 'bg-green-600');
    submitBtn.classList.replace('hover:bg-slate-900', 'hover:bg-green-700');
}

function resetForm() {
    descriptionInput.value = '';
    amountInput.value = '';
    typeInput.value = 'income';
    editId = null;
    submitBtn.innerText = 'Add Entry';
    submitBtn.classList.replace('bg-green-600', 'bg-slate-800');
    submitBtn.classList.replace('hover:bg-green-700', 'hover:bg-slate-900');
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// --- Event Listeners ---
form.addEventListener('submit', handleFormSubmit);
resetBtn.addEventListener('click', resetForm);
filterRadios.forEach(radio => {
    radio.addEventListener('change', renderList);
});

init();