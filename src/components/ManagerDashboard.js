// Manager dashboard component
import { getCurrentUser } from '../services/auth.js';
import { getAllEmployees, getEmployeesByBranch } from '../services/employees.js';
import { getAllEmployeesOperations, getOperationsByBranch } from '../services/operations.js';
import { updateElement, cleanValue, safePercentage, safeAverage, showNotification } from '../utils/helpers.js';

export function initializeManagerDashboard() {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'manager') return;

    updateManagerData();
    initializeEmployeeManagement();
    initializeDailyTasks();
    initializeLoanManagement();
}

function updateManagerData() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    // Update manager info
    updateElement('manager-name', currentUser.name);
    updateElement('manager-branch', currentUser.branch);

    // Get branch employees and operations
    const employees = getEmployeesByBranch(currentUser.branch);
    const operations = getOperationsByBranch(currentUser.branch);

    // Calculate KPIs
    const totalEmployees = cleanValue(employees.length);
    const totalOperations = operations.reduce((sum, op) => sum + cleanValue(op.operations), 0);
    const totalPoints = operations.reduce((sum, op) => sum + cleanValue(op.points), 0);
    const completionRate = safePercentage(totalPoints, totalEmployees * 100);

    // Update KPI elements
    updateElement('kpi-employees', totalEmployees);
    updateElement('kpi-ops', totalOperations);
    updateElement('kpi-completion', completionRate + '%');
    updateElement('kpi-target', totalEmployees * 100);

    // Update employee list
    updateEmployeeList(employees);
    updateOperationsList(operations);
}

function initializeEmployeeManagement() {
    const addEmployeeBtn = document.getElementById('add-employee-btn');
    if (addEmployeeBtn) {
        addEmployeeBtn.addEventListener('click', showAddEmployeeForm);
    }

    const addEmployeeForm = document.getElementById('add-employee-form');
    if (addEmployeeForm) {
        addEmployeeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewEmployee();
        });
    }
}

function showAddEmployeeForm() {
    const form = document.getElementById('add-employee-form');
    if (form) {
        form.classList.remove('hidden');
    }
}

function addNewEmployee() {
    const name = document.getElementById('employee-name').value.trim();
    const position = document.getElementById('employee-position').value.trim();
    const email = document.getElementById('employee-email').value.trim();
    const phone = document.getElementById('employee-phone').value.trim();

    if (!name || !position || !email || !phone) {
        showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }

    const currentUser = getCurrentUser();
    const newEmployee = {
        name,
        position,
        branch: currentUser.branch,
        email,
        phone,
        role: 'employee'
    };

    // Add employee (this would typically call a service)
    showNotification('تم إضافة الموظف بنجاح', 'success');
    
    // Hide form and reset
    const form = document.getElementById('add-employee-form');
    if (form) {
        form.classList.add('hidden');
        form.reset();
    }

    // Refresh data
    updateManagerData();
}

function initializeDailyTasks() {
    const taskForm = document.getElementById('manager-daily-task-form');
    if (taskForm) {
        taskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            sendDailyTask();
        });
    }
}

function sendDailyTask() {
    const title = document.getElementById('daily-task-title').value.trim();
    const assignee = document.getElementById('daily-task-assignee').value;
    const type = document.getElementById('daily-task-type').value;
    const priority = document.getElementById('daily-task-priority').value;

    if (!title) {
        showNotification('يرجى إدخال عنوان المهمة', 'error');
        return;
    }

    const task = {
        id: Date.now(),
        title,
        assignee,
        type,
        priority,
        status: 'pending',
        createdAt: new Date().toISOString()
    };

    // Save task
    const existingTasks = JSON.parse(localStorage.getItem('dailyTasks') || '[]');
    existingTasks.push(task);
    localStorage.setItem('dailyTasks', JSON.stringify(existingTasks));

    showNotification('تم إرسال المهمة بنجاح', 'success');
    
    // Reset form
    document.getElementById('daily-task-title').value = '';
}

function initializeLoanManagement() {
    loadLoanRequests();
    
    const refreshLoansBtn = document.getElementById('refresh-loans-btn');
    if (refreshLoansBtn) {
        refreshLoansBtn.addEventListener('click', loadLoanRequests);
    }
}

function loadLoanRequests() {
    const loanRequests = JSON.parse(localStorage.getItem('loanRequests') || '[]');
    const pendingRequests = loanRequests.filter(req => req.status === 'pending');
    
    updateElement('pending-loans-count', pendingRequests.length);
    
    const loansList = document.getElementById('loans-list');
    if (loansList) {
        const loansHTML = pendingRequests.map(req => `
            <div class="flex justify-between items-center p-4 border rounded-lg">
                <div>
                    <h4 class="font-semibold">${req.employeeName}</h4>
                    <p class="text-sm text-gray-600">${req.amount} ج.م - ${req.reason}</p>
                </div>
                <div class="flex space-x-2 space-x-reverse">
                    <button onclick="approveLoan(${req.id})" class="bg-green-600 text-white px-3 py-1 rounded text-sm">
                        موافقة
                    </button>
                    <button onclick="rejectLoan(${req.id})" class="bg-red-600 text-white px-3 py-1 rounded text-sm">
                        رفض
                    </button>
                </div>
            </div>
        `).join('');
        
        loansList.innerHTML = loansHTML || '<p class="text-gray-500 text-center p-4">لا توجد طلبات معلقة</p>';
    }
}

function updateEmployeeList(employees) {
    const employeesList = document.getElementById('employees-list');
    if (!employeesList) return;

    const employeesHTML = employees.map(emp => `
        <div class="flex justify-between items-center p-4 border rounded-lg">
            <div>
                <h4 class="font-semibold">${emp.name}</h4>
                <p class="text-sm text-gray-600">${emp.position} - ${emp.branch}</p>
            </div>
            <div class="text-sm text-gray-600">
                ${emp.email}
            </div>
        </div>
    `).join('');

    employeesList.innerHTML = employeesHTML;
}

function updateOperationsList(operations) {
    const operationsList = document.getElementById('operations-list');
    if (!operationsList) return;

    const recentOps = operations.slice(-10).reverse();
    const operationsHTML = recentOps.map(op => `
        <div class="flex justify-between items-center p-3 border-b">
            <div>
                <span class="font-medium">${op.employeeName}</span>
                <span class="text-sm text-gray-500 mr-2">- ${op.system}</span>
            </div>
            <div class="text-sm text-gray-600">
                ${op.operations} عملية - ${op.points} نقطة
            </div>
        </div>
    `).join('');

    operationsList.innerHTML = operationsHTML || '<p class="text-gray-500 text-center p-4">لا توجد عمليات</p>';
}

// Global functions for loan management
window.approveLoan = function(loanId) {
    const loanRequests = JSON.parse(localStorage.getItem('loanRequests') || '[]');
    const loan = loanRequests.find(req => req.id === loanId);
    if (loan) {
        loan.status = 'approved';
        localStorage.setItem('loanRequests', JSON.stringify(loanRequests));
        showNotification('تم الموافقة على الطلب', 'success');
        loadLoanRequests();
    }
};

window.rejectLoan = function(loanId) {
    const loanRequests = JSON.parse(localStorage.getItem('loanRequests') || '[]');
    const loan = loanRequests.find(req => req.id === loanId);
    if (loan) {
        loan.status = 'rejected';
        localStorage.setItem('loanRequests', JSON.stringify(loanRequests));
        showNotification('تم رفض الطلب', 'success');
        loadLoanRequests();
    }
};
