// Login form component
import { login, setCurrentUser } from '../services/auth.js';
import { showNotification } from '../utils/helpers.js';

export function initializeLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!username || !password) {
            showNotification('يرجى إدخال اسم المستخدم وكلمة المرور', 'error');
            return;
        }

        const result = login(username, password);
        if (result.success) {
            showNotification('تم تسجيل الدخول بنجاح', 'success');
            showDashboard(result.user.role);
        } else {
            showNotification(result.message, 'error');
        }
    });
}

function showDashboard(role) {
    const loginPage = document.getElementById('login-page');
    const mainApp = document.getElementById('main-app');
    
    if (loginPage) loginPage.classList.add('hidden');
    if (mainApp) mainApp.classList.remove('hidden');

    // Show appropriate dashboard based on role
    const dashboards = {
        'employee': 'employee-dashboard',
        'manager': 'manager-dashboard',
        'area_manager': 'area-manager-dashboard',
        'owner': 'owner-dashboard'
    };

    const dashboardId = dashboards[role];
    if (dashboardId) {
        const dashboard = document.getElementById(dashboardId);
        if (dashboard) {
            // Hide all dashboards first
            document.querySelectorAll('[id$="-dashboard"]').forEach(dash => {
                dash.classList.add('hidden');
            });
            // Show the correct dashboard
            dashboard.classList.remove('hidden');
        }
    }
}
