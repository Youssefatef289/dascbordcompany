// Area Manager dashboard component
import { getCurrentUser } from '../services/auth.js';
import { getAllEmployees } from '../services/employees.js';
import { getAllEmployeesOperations } from '../services/operations.js';
import { getBranches, addBranch, createBranchManagerDashboard } from '../services/branches.js';
import { updateElement, cleanValue, safePercentage, safeAverage, showNotification } from '../utils/helpers.js';

export function initializeAreaManagerDashboard() {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'area_manager') return;

    updateAreaManagerData();
    initializeBranchManagement();
    initializeBranchSelection();
}

function updateAreaManagerData() {
    const employees = getAllEmployees();
    const operations = getAllEmployeesOperations();
    const branches = getBranches();

    // Calculate overall KPIs
    const totalEmployees = cleanValue(employees.length);
    const totalOperations = cleanValue(operations.length);
    const totalPoints = operations.reduce((sum, op) => sum + cleanValue(op.points), 0);
    const totalBranches = cleanValue(branches.length);
    const avgPerformance = safePercentage(totalPoints, totalEmployees * 100);

    // Update KPI elements
    updateElement('area-kpi-employees', totalEmployees);
    updateElement('area-kpi-operations', totalOperations);
    updateElement('area-kpi-points', totalPoints);
    updateElement('area-kpi-branches', totalBranches);
    updateElement('area-kpi-performance', avgPerformance + '%');

    // Load branches list
    loadBranchesList();
}

function initializeBranchManagement() {
    const addBranchBtn = document.getElementById('add-branch-btn');
    if (addBranchBtn) {
        addBranchBtn.addEventListener('click', showAddBranchForm);
    }

    const areaSaveBranchBtn = document.getElementById('area-save-branch-btn');
    if (areaSaveBranchBtn) {
        areaSaveBranchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            saveBranch();
        });
    }

    const areaCancelBranchBtn = document.getElementById('area-cancel-branch-btn');
    if (areaCancelBranchBtn) {
        areaCancelBranchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            hideAddBranchForm();
        });
    }
}

function showAddBranchForm() {
    const form = document.getElementById('add-branch-form');
    if (form) {
        form.classList.remove('hidden');
        form.scrollIntoView({ behavior: 'smooth' });
    }
}

function hideAddBranchForm() {
    const form = document.getElementById('add-branch-form');
    if (form) {
        form.classList.add('hidden');
        clearBranchForm();
    }
}

function clearBranchForm() {
    const inputs = ['area-branch-name', 'area-branch-address', 'area-branch-manager', 'area-branch-phone'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = '';
    });
}

function saveBranch() {
    const name = document.getElementById('area-branch-name').value.trim();
    const address = document.getElementById('area-branch-address').value.trim();
    const manager = document.getElementById('area-branch-manager').value.trim();
    const phone = document.getElementById('area-branch-phone').value.trim();

    if (!name || !address || !manager || !phone) {
        showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }

    try {
        // Add branch
        const branch = addBranch({
            name,
            address,
            manager,
            phone
        });

        // Create branch manager account
        createBranchManagerAccount(branch);

        showNotification('تم إضافة الفرع ومدير الفرع بنجاح', 'success');
        
        // Hide form and refresh data
        hideAddBranchForm();
        updateAreaManagerData();
        
    } catch (error) {
        console.error('Error saving branch:', error);
        showNotification('حدث خطأ في حفظ الفرع', 'error');
    }
}

function createBranchManagerAccount(branch) {
    try {
        const username = `manager_${branch.id}`;
        const password = `manager_${branch.id}_pass`;
        
        const branchManager = {
            id: Date.now() + Math.random(),
            username: username,
            password: password,
            name: branch.manager,
            position: 'مدير الفرع',
            branch: branch.name,
            email: `${username}@company.com`,
            phone: branch.phone,
            role: 'manager',
            createdAt: new Date().toISOString(),
            isActive: true,
            branchId: branch.id
        };

        // Add to employees
        const employees = getAllEmployees();
        employees.push(branchManager);
        localStorage.setItem('employees', JSON.stringify(employees));

        // Create dashboard
        createBranchManagerDashboard(branch, branchManager);

        // Show credentials
        showBranchManagerCredentials(branch.name, username, password);
        
    } catch (error) {
        console.error('Error creating branch manager account:', error);
        showNotification('تم إضافة الفرع ولكن حدث خطأ في إنشاء حساب المدير', 'error');
    }
}

function showBranchManagerCredentials(branchName, username, password) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-md w-full p-6">
            <div class="text-center mb-6">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-user-tie text-green-600 text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">تم إنشاء حساب مدير الفرع</h3>
                <p class="text-gray-600">${branchName}</p>
            </div>
            
            <div class="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 class="font-semibold text-gray-800 mb-3">بيانات تسجيل الدخول:</h4>
                <div class="space-y-2">
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600">اسم المستخدم:</span>
                        <span class="font-mono bg-white px-2 py-1 rounded text-sm">${username}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600">كلمة المرور:</span>
                        <span class="font-mono bg-white px-2 py-1 rounded text-sm">${password}</span>
                    </div>
                </div>
            </div>
            
            <div class="flex space-x-3 space-x-reverse">
                <button onclick="copyCredentials('${username}', '${password}')" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <i class="fas fa-copy ml-2"></i>نسخ البيانات
                </button>
                <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <i class="fas fa-check ml-2"></i>تم
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function loadBranchesList() {
    const branchesList = document.getElementById('branches-list');
    if (!branchesList) return;

    const branches = getBranches();
    const branchesHTML = branches.map(branch => `
        <div class="flex justify-between items-center p-4 border rounded-lg">
            <div>
                <h4 class="font-semibold">${branch.name}</h4>
                <p class="text-sm text-gray-600">${branch.address}</p>
                <p class="text-sm text-gray-500">مدير: ${branch.manager}</p>
            </div>
            <div class="text-sm text-gray-600">
                ${branch.phone}
            </div>
        </div>
    `).join('');

    branchesList.innerHTML = branchesHTML;
}

function initializeBranchSelection() {
    const branchSelect = document.getElementById('area-branch-selection');
    if (!branchSelect) return;

    const branches = getBranches();
    branchSelect.innerHTML = '<option value="">-- اختر الفرع --</option>' + 
        branches.map(branch => `<option value="${branch.name}">${branch.name}</option>`).join('');

    branchSelect.addEventListener('change', function() {
        const selectedBranch = this.value;
        if (selectedBranch) {
            updateBranchKPIs(selectedBranch);
        }
    });
}

function updateBranchKPIs(branchName) {
    const employees = getAllEmployees();
    const operations = getAllEmployeesOperations();
    const branchEmployees = employees.filter(emp => emp.branch === branchName);
    const branchOperations = operations.filter(op => op.branch === branchName);

    const totalEmployees = cleanValue(branchEmployees.length);
    const totalOperations = cleanValue(branchOperations.length);
    const totalPoints = branchOperations.reduce((sum, op) => sum + cleanValue(op.points), 0);
    const avgPerformance = safePercentage(totalPoints, totalEmployees * 100);

    updateElement('area-kpi-employees', totalEmployees);
    updateElement('area-kpi-operations', totalOperations);
    updateElement('area-kpi-points', totalPoints);
    updateElement('area-kpi-performance', avgPerformance + '%');
}

// Global functions
window.copyCredentials = function(username, password) {
    const credentials = `اسم المستخدم: ${username}\nكلمة المرور: ${password}`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(credentials).then(() => {
            showNotification('تم نسخ البيانات إلى الحافظة', 'success');
        });
    } else {
        showNotification('فشل في نسخ البيانات', 'error');
    }
};
