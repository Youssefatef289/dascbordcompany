// Login form component
import { login } from '../services/auth.js';

export function initializeLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) {
        console.error('Login form not found');
        return;
    }

    console.log('Initializing login form...');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        console.log('Login attempt:', { username, password });

        if (!username || !password) {
            showError('يرجى إدخال اسم المستخدم وكلمة المرور');
            return;
        }

        const result = login(username, password);
        console.log('Login result:', result);
        
        if (result.success) {
            showSuccess('تم تسجيل الدخول بنجاح');
            // Navigate to dashboard without reload
            setTimeout(() => {
                navigateToDashboard(result.user);
            }, 1000);
        } else {
            showError(result.message);
        }
    });
}

function showError(message) {
    const errorDiv = document.getElementById('login-error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }
}

function showSuccess(message) {
    const errorDiv = document.getElementById('login-error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        errorDiv.classList.add('text-green-500');
        errorDiv.classList.remove('text-red-500');
    }
}

function navigateToDashboard(user) {
    console.log('Navigating to dashboard for user:', user);
    
    // Hide login page
    const loginPage = document.getElementById('login-page');
    const mainApp = document.getElementById('main-app');
    
    if (loginPage) {
        loginPage.classList.add('hidden');
        console.log('Login page hidden');
    }
    
    if (mainApp) {
        mainApp.classList.remove('hidden');
        console.log('Main app shown');
    }

    // Update user display
    updateUserDisplayInHeader(user);

    // Show appropriate dashboard
    const dashboards = {
        'employee': 'employee-dashboard',
        'manager': 'manager-dashboard',
        'area_manager': 'area-manager-dashboard',
        'owner': 'owner-dashboard'
    };

    const dashboardId = dashboards[user.role];
    if (dashboardId) {
        // Hide all dashboards first
        document.querySelectorAll('[id$="-dashboard"]').forEach(dash => {
            dash.classList.add('hidden');
        });
        
        // Show the correct dashboard
        const dashboard = document.getElementById(dashboardId);
        if (dashboard) {
            dashboard.classList.remove('hidden');
            console.log('Dashboard shown:', dashboardId);
            
            // Initialize the dashboard
            initializeDashboard(user.role);
        }
    }
}

function initializeDashboard(role) {
    console.log('Initializing dashboard for role:', role);
    
    // Import and initialize the appropriate dashboard
    if (role === 'employee') {
        import('../components/EmployeeDashboard.js').then(module => {
            module.initializeEmployeeDashboard();
        });
    } else if (role === 'manager') {
        import('../components/ManagerDashboard.js').then(module => {
            module.initializeManagerDashboard();
        });
    } else if (role === 'area_manager') {
        import('../components/AreaManagerDashboard.js').then(module => {
            module.initializeAreaManagerDashboard();
        });
    } else if (role === 'owner') {
        import('../components/OwnerDashboard.js').then(module => {
            module.initializeOwnerDashboard();
        });
    }
}

function updateUserDisplayInHeader(user) {
    const userNameElement = document.getElementById('user-name');
    if (userNameElement && user) {
        userNameElement.textContent = user.name || user.username;
    }
    
    // Update page title based on role
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) {
        const titles = {
            'employee': 'لوحة الموظف',
            'manager': 'لوحة مدير الفرع',
            'area_manager': 'لوحة مدير المنطقة',
            'owner': 'لوحة المالك'
        };
        pageTitle.textContent = titles[user.role] || 'لوحة التحكم';
    }
}
