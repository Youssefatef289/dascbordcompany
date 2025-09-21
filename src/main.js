// Main application entry point
import { initializeAuth, getCurrentUser, setCurrentUser } from './services/auth.js';
import { initializeLoginForm } from './components/LoginForm.js';
import { initializeEmployeeDashboard } from './components/EmployeeDashboard.js';
import { initializeManagerDashboard } from './components/ManagerDashboard.js';
import { initializeAreaManagerDashboard } from './components/AreaManagerDashboard.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize authentication
    initializeAuth();
    
    // Initialize login form
    initializeLoginForm();
    
    // Initialize dashboards based on current user
    const currentUser = getCurrentUser();
    if (currentUser) {
        showDashboard(currentUser.role);
    }
    
    // Initialize logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            setCurrentUser(null);
            showLoginPage();
        });
    }
});

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
            
            // Initialize specific dashboard
            if (role === 'employee') {
                initializeEmployeeDashboard();
            } else if (role === 'manager') {
                initializeManagerDashboard();
            } else if (role === 'area_manager') {
                initializeAreaManagerDashboard();
            }
        }
    }
}

function showLoginPage() {
    const loginPage = document.getElementById('login-page');
    const mainApp = document.getElementById('main-app');
    
    if (loginPage) loginPage.classList.remove('hidden');
    if (mainApp) mainApp.classList.add('hidden');
}
