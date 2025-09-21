// Employee dashboard component
import { getCurrentUser } from '../services/auth.js';
import { getEmployeeOperations, calculateEmployeeStats } from '../services/operations.js';
import { updateElement, cleanValue, safePercentage, safeAverage } from '../utils/helpers.js';

export function initializeEmployeeDashboard() {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'employee') return;

    updateEmployeeData();
    initializeEmployeeProfile();
    initializeDailyOperations();
    initializeDailyPerformanceDetails();
    initializeLoanRequest();
}

function updateEmployeeData() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    // Update profile information
    updateElement('employee-name', currentUser.name);
    updateElement('employee-department', currentUser.department);
    updateElement('employee-branch', currentUser.branch);
    updateElement('employee-salary', currentUser.baseSalary);
    updateElement('employee-target', currentUser.targetValue);
    updateElement('employee-points', currentUser.currentPoints);
    updateElement('employee-required-points', currentUser.requiredPoints);
    
    // Calculate and display target percentage
    const targetPercentage = safePercentage(currentUser.currentPoints, currentUser.requiredPoints);
    updateElement('employee-target-percentage', targetPercentage + '%');
    
    // Update progress bar
    const progressBar = document.getElementById('target-progress-bar');
    if (progressBar) {
        progressBar.style.width = Math.min(targetPercentage, 100) + '%';
    }
}

function initializeEmployeeProfile() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const profileForm = document.getElementById('employee-profile-form');
    if (!profileForm) return;

    // Pre-fill form with current data
    const nameInput = document.getElementById('profile-name');
    const departmentInput = document.getElementById('profile-department');
    const branchInput = document.getElementById('profile-branch');
    const salaryInput = document.getElementById('profile-salary');

    if (nameInput) nameInput.value = currentUser.name || '';
    if (departmentInput) departmentInput.value = currentUser.department || '';
    if (branchInput) branchInput.value = currentUser.branch || '';
    if (salaryInput) salaryInput.value = currentUser.baseSalary || '';

    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        updateEmployeeProfile();
    });
}

function updateEmployeeProfile() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const name = document.getElementById('profile-name').value.trim();
    const department = document.getElementById('profile-department').value.trim();
    const branch = document.getElementById('profile-branch').value.trim();
    const salary = document.getElementById('profile-salary').value.trim();

    if (!name || !department || !branch || !salary) {
        showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }

    // Update current user data
    currentUser.name = name;
    currentUser.department = department;
    currentUser.branch = branch;
    currentUser.baseSalary = parseFloat(salary);

    // Update display
    updateEmployeeData();
    showNotification('تم تحديث البيانات بنجاح', 'success');
}

function initializeDailyOperations() {
    const operationsForm = document.getElementById('daily-operations-form');
    if (!operationsForm) return;

    operationsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        recordDailyOperation();
    });
}

function recordDailyOperation() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const system = document.getElementById('operation-system').value.trim();
    const operations = parseInt(document.getElementById('operation-count').value) || 0;
    const notes = document.getElementById('operation-notes').value.trim();

    if (!system || operations <= 0) {
        showNotification('يرجى إدخال النظام وعدد العمليات', 'error');
        return;
    }

    const points = operations * 3; // Assuming 3 points per operation
    const now = new Date();
    const operation = {
        id: Date.now(),
        employeeId: currentUser.id,
        employeeName: currentUser.name,
        system: system,
        operations: operations,
        points: points,
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        timestamp: now.toISOString(),
        notes: notes
    };

    // Save operation
    const existingOperations = getEmployeeOperations(currentUser.id);
    existingOperations.push(operation);
    localStorage.setItem(`employeeOperations_${currentUser.id}`, JSON.stringify(existingOperations));

    // Update current user points
    currentUser.currentPoints += points;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Update display
    updateEmployeeData();
    updateDailyPerformanceDetails();
    loadRecentOperations();

    // Clear form
    document.getElementById('operation-system').value = '';
    document.getElementById('operation-count').value = '';
    document.getElementById('operation-notes').value = '';

    showNotification('تم تسجيل العملية بنجاح', 'success');
}

function initializeDailyPerformanceDetails() {
    updateDailyPerformanceDetails();
}

function updateDailyPerformanceDetails() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const operations = getEmployeeOperations(currentUser.id);
    const today = new Date().toISOString().split('T')[0];
    const todayOperations = operations.filter(op => op.date === today);

    // Calculate today's stats
    const todayTotalOps = todayOperations.reduce((sum, op) => sum + cleanValue(op.operations), 0);
    const todayTotalPoints = todayOperations.reduce((sum, op) => sum + cleanValue(op.points), 0);
    const todaySystems = new Set(todayOperations.map(op => op.system)).size;

    // Update summary cards
    updateElement('today-operations', todayTotalOps);
    updateElement('today-points', todayTotalPoints);
    updateElement('today-systems', todaySystems);

    // Calculate efficiency
    const efficiency = safeAverage(todayTotalPoints, todayTotalOps);
    updateElement('today-efficiency', efficiency);

    // Update system breakdown
    updateSystemBreakdown(todayOperations);
    
    // Update time breakdown
    updateTimeBreakdown(todayOperations);
    
    // Update hourly chart
    updateHourlyChart(todayOperations);
    
    // Update recent operations
    loadRecentOperations();
}

function updateSystemBreakdown(operations) {
    const systemBreakdown = document.getElementById('system-breakdown');
    if (!systemBreakdown) return;

    const systems = {};
    operations.forEach(op => {
        if (!systems[op.system]) {
            systems[op.system] = { operations: 0, points: 0 };
        }
        systems[op.system].operations += cleanValue(op.operations);
        systems[op.system].points += cleanValue(op.points);
    });

    const systemList = Object.entries(systems).map(([system, data]) => `
        <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span class="font-medium">${system}</span>
            <div class="text-sm text-gray-600">
                ${data.operations} عملية - ${data.points} نقطة
            </div>
        </div>
    `).join('');

    systemBreakdown.innerHTML = systemList || '<p class="text-gray-500 text-center">لا توجد عمليات اليوم</p>';
}

function updateTimeBreakdown(operations) {
    const timeBreakdown = document.getElementById('time-breakdown');
    if (!timeBreakdown) return;

    const timeSlots = {
        'صباحي': { start: 6, end: 12, operations: 0, points: 0 },
        'مسائي': { start: 12, end: 18, operations: 0, points: 0 },
        'ليلي': { start: 18, end: 24, operations: 0, points: 0 }
    };

    operations.forEach(op => {
        const hour = new Date(`2000-01-01T${op.time}`).getHours();
        const ops = cleanValue(op.operations);
        const points = cleanValue(op.points);

        if (hour >= 6 && hour < 12) {
            timeSlots['صباحي'].operations += ops;
            timeSlots['صباحي'].points += points;
        } else if (hour >= 12 && hour < 18) {
            timeSlots['مسائي'].operations += ops;
            timeSlots['مسائي'].points += points;
        } else {
            timeSlots['ليلي'].operations += ops;
            timeSlots['ليلي'].points += points;
        }
    });

    const timeList = Object.entries(timeSlots).map(([period, data]) => `
        <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span class="font-medium">${period}</span>
            <div class="text-sm text-gray-600">
                ${data.operations} عملية - ${data.points} نقطة
            </div>
        </div>
    `).join('');

    timeBreakdown.innerHTML = timeList;
}

function updateHourlyChart(operations) {
    const chartContainer = document.getElementById('hourly-chart');
    if (!chartContainer) return;

    const hourlyData = {};
    for (let i = 0; i < 24; i++) {
        hourlyData[i] = { operations: 0, points: 0 };
    }

    operations.forEach(op => {
        if (!op.time) return;
        try {
            const hour = new Date(`2000-01-01T${op.time}`).getHours();
            if (hour >= 0 && hour < 24) {
                hourlyData[hour].operations += cleanValue(op.operations);
                hourlyData[hour].points += cleanValue(op.points);
            }
        } catch (e) {
            console.warn('Invalid time format:', op.time);
        }
    });

    const maxOps = Math.max(...Object.values(hourlyData).map(d => d.operations));
    const chartHTML = Object.entries(hourlyData).map(([hour, data]) => {
        const height = maxOps > 0 ? (data.operations / maxOps) * 100 : 0;
        return `
            <div class="flex flex-col items-center">
                <div class="w-4 bg-blue-200 rounded-t" style="height: ${height}px; min-height: 4px;"></div>
                <span class="text-xs text-gray-500 mt-1">${hour}</span>
            </div>
        `;
    }).join('');

    chartContainer.innerHTML = `
        <div class="flex items-end justify-between h-32 p-4 bg-gray-50 rounded">
            ${chartHTML}
        </div>
    `;
}

function loadRecentOperations() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const operations = getEmployeeOperations(currentUser.id);
    const recentOps = operations.slice(-5).reverse();

    const recentOpsContainer = document.getElementById('recent-operations');
    if (!recentOpsContainer) return;

    const operationsList = recentOps.map(op => `
        <div class="flex justify-between items-center p-3 border-b">
            <div>
                <span class="font-medium">${op.system}</span>
                <span class="text-sm text-gray-500 mr-2">${op.time}</span>
            </div>
            <div class="text-sm text-gray-600">
                ${op.operations} عملية - ${op.points} نقطة
            </div>
        </div>
    `).join('');

    recentOpsContainer.innerHTML = operationsList || '<p class="text-gray-500 text-center p-4">لا توجد عمليات</p>';
}

function initializeLoanRequest() {
    const loanForm = document.getElementById('loan-request-form');
    if (!loanForm) return;

    loanForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitLoanRequest();
    });
}

function submitLoanRequest() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const amount = parseFloat(document.getElementById('loan-amount').value);
    const reason = document.getElementById('loan-reason').value.trim();

    if (!amount || amount < 100 || !reason) {
        showNotification('يرجى إدخال مبلغ صحيح وسبب الطلب', 'error');
        return;
    }

    const loanRequest = {
        id: Date.now(),
        employeeId: currentUser.id,
        employeeName: currentUser.name,
        amount: amount,
        reason: reason,
        status: 'pending',
        date: new Date().toISOString(),
        branch: currentUser.branch
    };

    // Save loan request
    const existingRequests = JSON.parse(localStorage.getItem('loanRequests') || '[]');
    existingRequests.push(loanRequest);
    localStorage.setItem('loanRequests', JSON.stringify(existingRequests));

    // Update button state
    updateLoanButtonState();

    showNotification('تم إرسال طلب السلفة بنجاح', 'success');
}

function updateLoanButtonState() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const loanRequests = JSON.parse(localStorage.getItem('loanRequests') || '[]');
    const pendingRequest = loanRequests.find(req => 
        req.employeeId === currentUser.id && req.status === 'pending'
    );

    const loanButton = document.getElementById('loan-request-form').querySelector('button');
    if (loanButton) {
        if (pendingRequest) {
            loanButton.textContent = 'طلب معلق';
            loanButton.disabled = true;
            loanButton.className = 'bg-gray-500 text-white font-bold py-2 px-4 rounded-full cursor-not-allowed';
        } else {
            loanButton.textContent = 'تقديم الطلب';
            loanButton.disabled = false;
            loanButton.className = 'bg-orange-500 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-700 transition';
        }
    }
}
