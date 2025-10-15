document.addEventListener('DOMContentLoaded', () => {
    // --- ICONS ---
    const icons = {
        dashboard: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>`,
        users: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-3-5.197m0 0A5.995 5.995 0 009 2.25a5.995 5.995 0 00-3 5.197M15 21a6 6 0 00-9-5.197"></path></svg>`,
        farm: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 4h5m-5 4h5M9 3v2m6-2v2"></path></svg>`,
        dollar: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 16v-1m0 1v.01M12 16c-1.11 0-2.08-.402-2.599-1M12 16H9.401M12 8h2.599M12 8c-3.313 0-6-1.79-6-4s2.687-4 6-4 6 1.79 6 4-2.687 4-6 4zm0 12c-3.313 0-6-1.79-6-4s2.687-4 6-4 6 1.79 6 4-2.687 4-6 4z"></path></svg>`,
        clipboard: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>`,
        document: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2-2z"></path></svg>`,
        report: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2-2z"></path></svg>`,
        upload: `<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>`,
        download: `<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>`,
    };

    // --- STATE MANAGEMENT ---
    const emptyState = {
        customers: [],
        farms: [],
        sales: [],
        receivables: [],
        vouchers: [],
        nextCustomerId: 1,
        nextFarmId: 1,
        nextSaleId: 1,
        nextReceivableId: 1,
        nextVoucherId: 1,
        activeView: 'dashboard',
        selectedItem: null,
    };

    let state = {};

    function loadState() {
        try {
            const serializedState = localStorage.getItem('poultryAppState');
            if (serializedState === null) {
                state = JSON.parse(JSON.stringify(emptyState)); // Deep copy
            } else {
                state = JSON.parse(serializedState);
            }
        } catch (e) {
            console.error("Could not load state", e);
            state = JSON.parse(JSON.stringify(emptyState));
        }
    }

    function saveState() {
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem('poultryAppState', serializedState);
        } catch (e) {
            console.error("Could not save state", e);
        }
    }


    // --- UTILITY FUNCTIONS ---
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-CA'); // YYYY-MM-DD
    const formatCurrency = (amount) => amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    let chartInstances = {};

    function destroyCharts() {
        Object.values(chartInstances).forEach(chart => chart.destroy());
        chartInstances = {};
    }

    // --- RENDER FUNCTIONS ---
    function render() {
        destroyCharts();
        document.getElementById('side-panel').innerHTML = renderSidePanel();
        document.getElementById('app-content').innerHTML = renderMainContent();

        // Re-initialize charts if on dashboard
        if (state.activeView === 'dashboard') {
            renderDashboardCharts();
        }
        
        // Add active class to nav link
        document.querySelectorAll('[data-view]').forEach(link => {
            if (link.dataset.view === state.activeView) {
                link.classList.add('bg-gray-700');
            } else {
                link.classList.remove('bg-gray-700');
            }
        });
    }

    function renderSidePanel() {
        const navItems = [
            { view: 'dashboard', label: 'Dashboard', icon: icons.dashboard },
            { view: 'customers', label: 'Customers', icon: icons.users },
            { view: 'farms', label: 'Farms', icon: icons.farm },
            { view: 'sales', label: 'Sales', icon: icons.dollar },
            { view: 'receivables', label: 'Receivables', icon: icons.clipboard },
            { view: 'vouchers', label: 'Vouchers', icon: icons.document },
            { view: 'reports', label: 'Reports', icon: icons.report },
        ];

        return `
            <h1 class="text-2xl font-bold text-center">Poultry ERP</h1>
            <nav class="flex-1 space-y-2">
                ${navItems.map(item => `
                    <a href="#" data-view="${item.view}" class="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-700">
                        ${item.icon}
                        <span>${item.label}</span>
                    </a>
                `).join('')}
            </nav>
            <div id="action-menu" class="space-y-2 pt-4 border-t border-gray-700">
                <h3 class="font-semibold text-lg px-4">Action Menu</h3>
                ${renderActionMenu()}
            </div>
            <div id="data-management" class="space-y-2 pt-4 border-t border-gray-700">
                <h3 class="font-semibold text-lg px-4">Data Management</h3>
                <div class="px-4 space-y-2">
                     <button data-action="import-data" class="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        ${icons.upload} Import Data
                    </button>
                    <button data-action="export-data" class="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                       ${icons.download} Export Data
                    </button>
                     <button data-action="clear-data" class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Clear All Data</button>
                </div>
            </div>
        `;
    }
    
    function renderActionMenu() {
        const { selectedItem } = state;
        const disabled = !selectedItem;
        const itemInfo = selectedItem 
            ? `<div class="bg-gray-700 p-2 rounded text-sm">
                 <p><b>Type:</b> ${selectedItem.type}</p>
                 <p><b>ID:</b> ${selectedItem.id}</p>
               </div>` 
            : '<p class="text-gray-400 text-center text-sm">No item selected</p>';

        return `
            <div class="px-4 space-y-2">
                ${itemInfo}
                <button data-action="edit-item" class="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded ${disabled ? 'opacity-50 cursor-not-allowed' : ''}" ${disabled ? 'disabled' : ''}>Edit Selected</button>
                <button data-action="delete-item" class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ${disabled ? 'opacity-50 cursor-not-allowed' : ''}" ${disabled ? 'disabled' : ''}>Delete Selected</button>
            </div>
        `;
    }

    function renderMainContent() {
        switch (state.activeView) {
            case 'dashboard': return renderDashboard();
            case 'customers': return renderCustomers();
            case 'farms': return renderFarms();
            case 'sales': return renderSales();
            case 'receivables': return renderReceivables();
            case 'vouchers': return renderVouchers();
            case 'reports': return renderReports();
            default: return `<h2>Page not found</h2>`;
        }
    }
    
    // --- Specific View Renderers ---
    function renderDashboard() {
        const totalSales = state.sales.reduce((sum, s) => sum + s.total, 0);
        const totalReceived = state.receivables.reduce((sum, r) => sum + r.amount, 0);
        const totalFarms = state.farms.length;
        const totalCustomers = state.customers.length;
        const totalChickens = state.farms.reduce((sum, f) => sum + f.initialStock, 0);
        const totalChickensSold = state.sales.reduce((sum, s) => sum + s.chickens, 0);

        const cards = [
            { label: 'Total Sales', value: formatCurrency(totalSales) },
            { label: 'Total Receivable', value: formatCurrency(totalSales - totalReceived) },
            { label: 'Total Received', value: formatCurrency(totalReceived) },
            { label: 'Total Farms', value: totalFarms },
            { label: 'Total Customers', value: totalCustomers },
            { label: 'Chickens Left (All Farms)', value: totalChickens - totalChickensSold },
        ];

        return `
            <h2 class="text-3xl font-bold mb-6">Dashboard</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                ${cards.map(card => `
                    <div class="bg-white p-6 rounded-lg shadow">
                        <h3 class="text-gray-500 text-lg">${card.label}</h3>
                        <p class="text-3xl font-bold">${card.value}</p>
                    </div>
                `).join('')}
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-xl font-bold mb-4">Sales vs Receivables</h3>
                    <canvas id="sales-chart"></canvas>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-xl font-bold mb-4">Farm Stock Overview</h3>
                    <canvas id="farm-chart"></canvas>
                </div>
            </div>
        `;
    }
    
    function renderDashboardCharts() {
        // Sales Chart
        const salesData = {};
        state.sales.forEach(s => {
            const date = formatDate(s.date).slice(0, 7); // Group by month
            if (!salesData[date]) salesData[date] = { sales: 0, received: 0 };
            salesData[date].sales += s.total;
        });
        state.receivables.forEach(r => {
            const date = formatDate(r.date).slice(0, 7);
            if (!salesData[date]) salesData[date] = { sales: 0, received: 0 };
            salesData[date].received += r.amount;
        });
        
        const sortedDates = Object.keys(salesData).sort();
        const salesCtx = document.getElementById('sales-chart')?.getContext('2d');
        if (salesCtx) {
            chartInstances.sales = new Chart(salesCtx, {
                type: 'bar',
                data: {
                    labels: sortedDates,
                    datasets: [
                        { label: 'Sales', data: sortedDates.map(d => salesData[d].sales), backgroundColor: 'rgba(54, 162, 235, 0.6)' },
                        { label: 'Received', data: sortedDates.map(d => salesData[d].received), backgroundColor: 'rgba(75, 192, 192, 0.6)' }
                    ]
                }
            });
        }

        // Farm Chart
        const farmLabels = state.farms.map(f => f.name);
        const farmStockLeft = state.farms.map(f => {
            const sold = state.sales.filter(s => s.farmId === f.id).reduce((sum, s) => sum + s.chickens, 0);
            return f.initialStock - sold;
        });
        const farmCtx = document.getElementById('farm-chart')?.getContext('2d');
        if (farmCtx) {
            chartInstances.farms = new Chart(farmCtx, {
                type: 'pie',
                data: {
                    labels: farmLabels,
                    datasets: [{ data: farmStockLeft, backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'] }]
                }
            });
        }
    }
    
    function renderCustomers() {
        const customerBalances = {};
        state.customers.forEach(c => customerBalances[c.id] = 0);
        state.sales.forEach(s => customerBalances[s.customerId] += s.total);
        state.receivables.forEach(r => customerBalances[r.customerId] -= r.amount);

        return `
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-bold">Customers</h2>
                <button data-action="add-customer" class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">Add Customer</button>
            </div>
            <div class="bg-white p-6 rounded-lg shadow overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="border-b">
                            <th class="text-left p-3">ID</th>
                            <th class="text-left p-3">Name</th>
                            <th class="text-left p-3">Phone</th>
                            <th class="text-left p-3">Address</th>
                            <th class="text-left p-3">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${state.customers.map(c => `
                            <tr data-select-type="customer" data-select-id="${c.id}" class="hover:bg-gray-100 cursor-pointer border-b ${state.selectedItem?.type === 'customer' && state.selectedItem?.id === c.id ? 'selected-row' : ''}">
                                <td class="p-3">${c.id}</td>
                                <td class="p-3">${c.name}</td>
                                <td class="p-3">${c.phone}</td>
                                <td class="p-3">${c.address}</td>
                                <td class="p-3">${formatCurrency(customerBalances[c.id])}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
    
    function renderFarms() {
        return `
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-bold">Farms</h2>
                <button data-action="add-farm" class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">Add Farm</button>
            </div>
            <div class="bg-white p-6 rounded-lg shadow overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="border-b">
                            <th class="text-left p-3">ID</th>
                            <th class="text-left p-3">Name</th>
                            <th class="text-left p-3">Initial Stock</th>
                            <th class="text-left p-3">Sold</th>
                            <th class="text-left p-3">Left</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${state.farms.map(f => {
                            const sold = state.sales.filter(s => s.farmId === f.id).reduce((sum, s) => sum + s.chickens, 0);
                            return `
                                <tr data-select-type="farm" data-select-id="${f.id}" class="hover:bg-gray-100 cursor-pointer border-b ${state.selectedItem?.type === 'farm' && state.selectedItem?.id === f.id ? 'selected-row' : ''}">
                                    <td class="p-3">${f.id}</td>
                                    <td class="p-3">${f.name}</td>
                                    <td class="p-3">${f.initialStock}</td>
                                    <td class="p-3">${sold}</td>
                                    <td class="p-3">${f.initialStock - sold}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    function renderSales() {
        return `
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-bold">Sales</h2>
                <button data-action="add-sale" class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">Add Sale</button>
            </div>
            <div class="bg-white p-6 rounded-lg shadow overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="border-b">
                            <th class="text-left p-3">Invoice #</th>
                            <th class="text-left p-3">Date</th>
                            <th class="text-left p-3">Customer</th>
                            <th class="text-left p-3">Farm</th>
                            <th class="text-left p-3">Chickens</th>
                            <th class="text-left p-3">Weight</th>
                            <th class="text-left p-3">Rate</th>
                            <th class="text-left p-3">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${state.sales.slice().sort((a,b) => new Date(b.date) - new Date(a.date)).map(s => {
                             const customer = state.customers.find(c => c.id === s.customerId)?.name || 'N/A';
                             const farm = state.farms.find(f => f.id === s.farmId)?.name || 'N/A';
                             return `
                                <tr data-select-type="sale" data-select-id="${s.id}" class="hover:bg-gray-100 cursor-pointer border-b ${state.selectedItem?.type === 'sale' && state.selectedItem?.id === s.id ? 'selected-row' : ''}">
                                    <td class="p-3">${s.id}</td>
                                    <td class="p-3">${formatDate(s.date)}</td>
                                    <td class="p-3">${customer}</td>
                                    <td class="p-3">${farm}</td>
                                    <td class="p-3">${s.chickens}</td>
                                    <td class="p-3">${s.weight}</td>
                                    <td class="p-3">${formatCurrency(s.rate)}</td>
                                    <td class="p-3">${formatCurrency(s.total)}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
    
    function renderReceivables() {
        const customerBalances = {};
        state.customers.forEach(c => {
            const totalSales = state.sales.filter(s => s.customerId === c.id).reduce((sum, s) => sum + s.total, 0);
            const totalReceived = state.receivables.filter(r => r.customerId === c.id).reduce((sum, r) => sum + r.amount, 0);
            customerBalances[c.id] = { name: c.name, balance: totalSales - totalReceived };
        });

        return `
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-bold">Receivables</h2>
                <button data-action="add-receivable" class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">Add Receipt</button>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-xl font-bold mb-4">Customer Balances</h3>
                    <!-- Customer Balances Table -->
                    <table class="w-full">
                         <thead><tr class="border-b"><th class="text-left p-3">Customer</th><th class="text-left p-3">Balance</th></tr></thead>
                         <tbody>
                            ${Object.values(customerBalances).map(c => `
                                <tr class="border-b"><td class="p-3">${c.name}</td><td class="p-3">${formatCurrency(c.balance)}</td></tr>
                            `).join('')}
                         </tbody>
                    </table>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-xl font-bold mb-4">Recent Receipts</h3>
                    <!-- Receipts Table -->
                    <table class="w-full">
                        <thead><tr class="border-b"><th class="text-left p-3">ID</th><th class="text-left p-3">Date</th><th class="text-left p-3">Customer</th><th class="text-left p-3">Amount</th></tr></thead>
                        <tbody>
                            ${state.receivables.slice().sort((a,b) => new Date(b.date) - new Date(a.date)).map(r => `
                                <tr data-select-type="receivable" data-select-id="${r.id}" class="hover:bg-gray-100 cursor-pointer border-b ${state.selectedItem?.type === 'receivable' && state.selectedItem?.id === r.id ? 'selected-row' : ''}">
                                    <td class="p-3">${r.id}</td>
                                    <td class="p-3">${formatDate(r.date)}</td>
                                    <td class="p-3">${state.customers.find(c => c.id === r.customerId)?.name || 'N/A'}</td>
                                    <td class="p-3">${formatCurrency(r.amount)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    function renderVouchers() {
        return `
             <h2 class="text-3xl font-bold mb-6">Vouchers</h2>
             <div class="bg-white p-6 rounded-lg shadow overflow-x-auto">
                <table class="w-full">
                    <thead><tr class="border-b"><th class="text-left p-3">ID</th><th class="text-left p-3">Date</th><th class="text-left p-3">Description</th><th class="text-left p-3">Debit Acc</th><th class="text-left p-3">Credit Acc</th><th class="text-left p-3">Amount</th></tr></thead>
                    <tbody>
                        ${state.vouchers.slice().sort((a,b) => new Date(b.date) - new Date(a.date)).map(v => `
                            <tr class="border-b">
                                <td class="p-3">${v.id}</td>
                                <td class="p-3">${formatDate(v.date)}</td>
                                <td class="p-3">${v.description}</td>
                                <td class="p-3">${v.debitAccount}</td>
                                <td class="p-3">${v.creditAccount}</td>
                                <td class="p-3">${formatCurrency(v.amount)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
             </div>
        `;
    }
    
    function renderReports() {
        // This is a placeholder for the full report generation UI
        return `<h2 class="text-3xl font-bold mb-6">Reports</h2><div class="bg-white p-6 rounded-lg shadow"><p>Report generation section. UI for selecting report type, date ranges, customers, etc. would go here.</p></div>`;
    }

    // --- MODAL RENDERER ---
    function renderModal({ title, content, show = true }) {
        const modalContainer = document.getElementById('modal-container');
        if (show) {
            modalContainer.innerHTML = `
                <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-2xl font-bold">${title}</h3>
                            <button data-action="close-modal" class="text-gray-500 hover:text-gray-800">&times;</button>
                        </div>
                        <div>${content}</div>
                    </div>
                </div>
            `;
            modalContainer.classList.remove('hidden');
        } else {
            modalContainer.innerHTML = '';
            modalContainer.classList.add('hidden');
        }
    }
    
    function getCustomerForm(customer = {}) {
        const isEdit = !!customer.id;
        return `
            <form data-form="customer" data-id="${customer.id || ''}">
                <div class="space-y-4">
                    <input class="w-full p-2 border rounded" type="text" name="name" placeholder="Customer Name" value="${customer.name || ''}" required>
                    <input class="w-full p-2 border rounded" type="tel" name="phone" placeholder="Phone Number" value="${customer.phone || ''}" required>
                    <input class="w-full p-2 border rounded" type="text" name="address" placeholder="Address" value="${customer.address || ''}" required>
                    <button type="submit" class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">${isEdit ? 'Update' : 'Save'} Customer</button>
                </div>
            </form>
        `;
    }
    
    function getFarmForm(farm = {}) {
        const isEdit = !!farm.id;
        return `
            <form data-form="farm" data-id="${farm.id || ''}">
                 <div class="space-y-4">
                    <input class="w-full p-2 border rounded" type="text" name="name" placeholder="Farm Name" value="${farm.name || ''}" required>
                    <input class="w-full p-2 border rounded" type="number" name="initialStock" placeholder="Initial Chickens" value="${farm.initialStock || ''}" required min="0">
                    <button type="submit" class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">${isEdit ? 'Update' : 'Save'} Farm</button>
                </div>
            </form>
        `;
    }
    
    function getSaleForm(sale = {}) {
        const isEdit = !!sale.id;
        return `
             <form data-form="sale" data-id="${sale.id || ''}">
                <div class="space-y-4">
                    <input class="w-full p-2 border rounded" type="date" name="date" value="${sale.date ? formatDate(sale.date) : formatDate(new Date())}" required>
                    <select class="w-full p-2 border rounded" name="customerId" required>
                        <option value="">Select Customer</option>
                        ${state.customers.map(c => `<option value="${c.id}" ${sale.customerId === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
                    </select>
                    <select class="w-full p-2 border rounded" name="farmId" required>
                        <option value="">Select Farm</option>
                         ${state.farms.map(f => `<option value="${f.id}" ${sale.farmId === f.id ? 'selected' : ''}>${f.name}</option>`).join('')}
                    </select>
                    <input class="w-full p-2 border rounded" type="number" name="chickens" placeholder="Number of Chickens" value="${sale.chickens || ''}" required min="1">
                    <input class="w-full p-2 border rounded" type="number" step="0.01" name="weight" placeholder="Total Weight" value="${sale.weight || ''}" required min="0">
                    <input class="w-full p-2 border rounded" type="number" step="0.01" name="rate" placeholder="Rate" value="${sale.rate || ''}" required min="0">
                    <button type="submit" class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">${isEdit ? 'Update' : 'Save'} Sale</button>
                </div>
             </form>
        `;
    }

    function getReceivableForm(receivable = {}) {
        const isEdit = !!receivable.id;
        return `
            <form data-form="receivable" data-id="${receivable.id || ''}">
                <div class="space-y-4">
                    <input class="w-full p-2 border rounded" type="date" name="date" value="${receivable.date ? formatDate(receivable.date) : formatDate(new Date())}" required>
                    <select class="w-full p-2 border rounded" name="customerId" required>
                        <option value="">Select Customer</option>
                        ${state.customers.map(c => `<option value="${c.id}" ${receivable.customerId === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
                    </select>
                    <input class="w-full p-2 border rounded" type="number" step="0.01" name="amount" placeholder="Amount Received" value="${receivable.amount || ''}" required min="0.01">
                    <button type="submit" class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">${isEdit ? 'Update' : 'Save'} Receipt</button>
                </div>
            </form>
        `;
    }


    // --- EVENT HANDLERS & ACTIONS ---
    document.body.addEventListener('click', (e) => {
        const actionTarget = e.target.closest('[data-action]');
        const viewTarget = e.target.closest('[data-view]');
        const selectTarget = e.target.closest('[data-select-type]');

        if (viewTarget) {
            e.preventDefault();
            state.activeView = viewTarget.dataset.view;
            state.selectedItem = null;
            render();
        }

        if (selectTarget) {
            state.selectedItem = {
                type: selectTarget.dataset.selectType,
                id: parseInt(selectTarget.dataset.selectId)
            };
            render();
        }
        
        if (actionTarget) {
            e.preventDefault();
            const action = actionTarget.dataset.action;
            switch(action) {
                // Modals
                case 'close-modal': renderModal({ show: false }); break;
                case 'add-customer': renderModal({ title: 'Add Customer', content: getCustomerForm() }); break;
                case 'add-farm': renderModal({ title: 'Add Farm', content: getFarmForm() }); break;
                case 'add-sale': renderModal({ title: 'Add Sale', content: getSaleForm() }); break;
                case 'add-receivable': renderModal({ title: 'Add Receipt', content: getReceivableForm() }); break;
                
                // Action Menu
                case 'edit-item': handleEditItem(); break;
                case 'delete-item': handleDeleteItem(); break;

                // Data Management
                case 'import-data': handleImportData(); break;
                case 'export-data': handleExportData(); break;
                case 'clear-data': handleClearData(); break;
            }
        }
    });
    
    document.body.addEventListener('submit', (e) => {
        const formTarget = e.target.closest('[data-form]');
        if (formTarget) {
            e.preventDefault();
            const formType = formTarget.dataset.form;
            const id = formTarget.dataset.id ? parseInt(formTarget.dataset.id) : null;
            const formData = new FormData(formTarget);
            const data = Object.fromEntries(formData.entries());
            
            // --- Form Handlers ---
            if (formType === 'customer') {
                const customerData = { id, ...data };
                id ? updateCustomer(customerData) : addCustomer(customerData);
            }
            if (formType === 'farm') {
                const farmData = { id, ...data, initialStock: parseInt(data.initialStock) };
                id ? updateFarm(farmData) : addFarm(farmData);
            }
            if (formType === 'sale') {
                const saleData = { 
                    id, ...data, 
                    customerId: parseInt(data.customerId), 
                    farmId: parseInt(data.farmId),
                    chickens: parseInt(data.chickens),
                    weight: parseFloat(data.weight),
                    rate: parseFloat(data.rate),
                    total: parseFloat(data.weight) * parseFloat(data.rate)
                };
                id ? updateSale(saleData) : addSale(saleData);
            }
             if (formType === 'receivable') {
                const receivableData = { 
                    id, ...data, 
                    customerId: parseInt(data.customerId), 
                    amount: parseFloat(data.amount)
                };
                id ? updateReceivable(receivableData) : addReceivable(receivableData);
            }

            renderModal({ show: false });
            saveState();
            render();
        }
    });

    function handleEditItem() {
        const { selectedItem } = state;
        if (!selectedItem) return;

        switch (selectedItem.type) {
            case 'customer':
                const customer = state.customers.find(c => c.id === selectedItem.id);
                renderModal({ title: 'Edit Customer', content: getCustomerForm(customer) });
                break;
            case 'farm':
                 const farm = state.farms.find(f => f.id === selectedItem.id);
                 renderModal({ title: 'Edit Farm', content: getFarmForm(farm) });
                break;
            case 'sale':
                 const sale = state.sales.find(s => s.id === selectedItem.id);
                 renderModal({ title: 'Edit Sale', content: getSaleForm(sale) });
                break;
            case 'receivable':
                 const receivable = state.receivables.find(r => r.id === selectedItem.id);
                 renderModal({ title: 'Edit Receipt', content: getReceivableForm(receivable) });
                break;
        }
    }
    
    function handleDeleteItem() {
        const { selectedItem } = state;
        if (!selectedItem) return;

        const password = prompt('To confirm deletion, please enter the password (123):');
        if (password !== '123') {
            alert('Incorrect password. Deletion cancelled.');
            return;
        }

        switch (selectedItem.type) {
            case 'customer':
                 // Cascade delete: remove customer and all their sales, receivables, and vouchers
                 state.sales = state.sales.filter(s => s.customerId !== selectedItem.id);
                 state.receivables = state.receivables.filter(r => r.customerId !== selectedItem.id);
                 state.vouchers = state.vouchers.filter(v => !v.description.includes(`CUST-${selectedItem.id}`));
                 state.customers = state.customers.filter(c => c.id !== selectedItem.id);
                break;
            case 'farm':
                 // Cascade delete: remove farm and all its sales and vouchers
                 state.sales = state.sales.filter(s => s.farmId !== selectedItem.id);
                 state.vouchers = state.vouchers.filter(v => !v.description.includes(`FARM-${selectedItem.id}`));
                 state.farms = state.farms.filter(f => f.id !== selectedItem.id);
                break;
            case 'sale':
                 state.vouchers = state.vouchers.filter(v => v.description !== `Sale #${selectedItem.id}`);
                 state.sales = state.sales.filter(s => s.id !== selectedItem.id);
                break;
            case 'receivable':
                 state.vouchers = state.vouchers.filter(v => v.description !== `Receipt #${selectedItem.id}`);
                 state.receivables = state.receivables.filter(r => r.id !== selectedItem.id);
                break;
        }

        state.selectedItem = null;
        saveState();
        render();
    }
    
    function handleImportData() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const fileContents = event.target.result;
                    const importedData = JSON.parse(fileContents);
                    // Basic validation
                    if (importedData.customers && importedData.farms && importedData.sales) {
                        state = importedData;
                        saveState();
                        render();
                        alert('Data imported successfully!');
                    } else {
                        alert('Invalid JSON file structure.');
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    alert('Could not import data. The file may be corrupt.');
                }
            };
            reader.readAsText(file);
        };
        fileInput.click();
    }
    
    function handleExportData() {
        const dataStr = JSON.stringify(state, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = 'poultry-erp-backup.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
    
    function handleClearData() {
        if (confirm('Are you sure you want to delete ALL data? This cannot be undone.')) {
            state = JSON.parse(JSON.stringify(emptyState));
            saveState();
            render();
            alert('All data has been cleared.');
        }
    }

    // --- Data Mutation Functions ---
    function addCustomer(data) {
        state.customers.push({ ...data, id: state.nextCustomerId++ });
    }
    function updateCustomer(data) {
        const index = state.customers.findIndex(c => c.id === data.id);
        if (index > -1) state.customers[index] = { ...state.customers[index], ...data };
    }
    function addFarm(data) {
        state.farms.push({ ...data, id: state.nextFarmId++ });
    }
    function updateFarm(data) {
         const index = state.farms.findIndex(f => f.id === data.id);
         if (index > -1) state.farms[index] = { ...state.farms[index], ...data };
    }
    function addSale(data) {
        const newSale = { ...data, id: state.nextSaleId++ };
        state.sales.push(newSale);
        // Add voucher
        const customer = state.customers.find(c => c.id === newSale.customerId);
        const farm = state.farms.find(f => f.id === newSale.farmId);
        state.vouchers.push({
            id: state.nextVoucherId++,
            date: newSale.date,
            description: `Sale #${newSale.id} (CUST-${customer.id} / FARM-${farm.id})`,
            debitAccount: `Customer - ${customer.name}`,
            creditAccount: `Sales - ${farm.name}`,
            amount: newSale.total,
        });
    }
    function updateSale(data) {
        const index = state.sales.findIndex(s => s.id === data.id);
        if (index > -1) {
            state.sales[index] = { ...state.sales[index], ...data };
            // Update voucher
            const vIndex = state.vouchers.findIndex(v => v.description.startsWith(`Sale #${data.id}`));
            if (vIndex > -1) {
                const customer = state.customers.find(c => c.id === data.customerId);
                const farm = state.farms.find(f => f.id === data.farmId);
                state.vouchers[vIndex].amount = data.total;
                state.vouchers[vIndex].debitAccount = `Customer - ${customer.name}`;
                state.vouchers[vIndex].creditAccount = `Sales - ${farm.name}`;
            }
        }
    }
    function addReceivable(data) {
        const newReceivable = { ...data, id: state.nextReceivableId++ };
        state.receivables.push(newReceivable);
        // Add voucher
        const customer = state.customers.find(c => c.id === newReceivable.customerId);
        state.vouchers.push({
            id: state.nextVoucherId++,
            date: newReceivable.date,
            description: `Receipt #${newReceivable.id} (CUST-${customer.id})`,
            debitAccount: 'Cash/Bank',
            creditAccount: `Customer - ${customer.name}`,
            amount: newReceivable.amount,
        });
    }
    function updateReceivable(data) {
        const index = state.receivables.findIndex(r => r.id === data.id);
        if (index > -1) {
             state.receivables[index] = { ...state.receivables[index], ...data };
             // Update voucher
            const vIndex = state.vouchers.findIndex(v => v.description.startsWith(`Receipt #${data.id}`));
            if (vIndex > -1) {
                const customer = state.customers.find(c => c.id === data.customerId);
                state.vouchers[vIndex].amount = data.amount;
                state.vouchers[vIndex].creditAccount = `Customer - ${customer.name}`;
            }
        }
    }


    // --- INITIALIZATION ---
    loadState();
    render();
});
