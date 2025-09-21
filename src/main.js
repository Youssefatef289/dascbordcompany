// Main application entry point
import { initializeAuth, getCurrentUser, setCurrentUser } from './services/auth.js';
import { initializeLoginForm } from './components/LoginForm.js';
import { initializeEmployeeDashboard } from './components/EmployeeDashboard.js';
import { initializeManagerDashboard } from './components/ManagerDashboard.js';
import { initializeAreaManagerDashboard } from './components/AreaManagerDashboard.js';
import { initializeOwnerDashboard } from './components/OwnerDashboard.js';
import { loadHTMLComponent } from './utils/htmlLoader.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Skip HTML component loading - using embedded content for file:// protocol compatibility
        console.log('Using embedded dashboard content for file:// protocol compatibility');
        
        // Initialize authentication
        initializeAuth();
        
        // Initialize login form
        initializeLoginForm();
        
        // Initialize dashboards based on current user
        const currentUser = getCurrentUser();
        console.log('Current user:', currentUser);
        if (currentUser) {
            console.log('User is logged in, showing dashboard for role:', currentUser.role);
            updateUserDisplay(currentUser);
            showDashboard(currentUser.role);
        } else {
            console.log('No user logged in, showing login page');
            showLoginPage();
        }
        
        // Initialize logout functionality
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                setCurrentUser(null);
                showLoginPage();
            });
        }
    } catch (error) {
        console.error('Error initializing application:', error);
    }
});

function showDashboard(role) {
    console.log('showDashboard called with role:', role);
    
    const loginPage = document.getElementById('login-page');
    const mainApp = document.getElementById('main-app');
    
    console.log('Login page element:', loginPage);
    console.log('Main app element:', mainApp);
    
    if (loginPage) {
        loginPage.classList.add('hidden');
        console.log('Login page hidden');
    }
    
    if (mainApp) {
        mainApp.classList.remove('hidden');
        console.log('Main app shown');
    }

    // Show appropriate dashboard based on role
    const dashboards = {
        'employee': 'employee-dashboard',
        'manager': 'manager-dashboard',
        'area_manager': 'area-manager-dashboard',
        'owner': 'owner-dashboard'
    };

    const dashboardId = dashboards[role];
    console.log('Looking for dashboard:', dashboardId);
    
    if (dashboardId) {
        const dashboard = document.getElementById(dashboardId);
        console.log('Dashboard element found:', dashboard);
        
        if (dashboard) {
            // Hide all dashboards first
            document.querySelectorAll('[id$="-dashboard"]').forEach(dash => {
                dash.classList.add('hidden');
                console.log('Hiding dashboard:', dash.id);
            });
            
            // Show the correct dashboard
            dashboard.classList.remove('hidden');
            console.log('Showing dashboard:', dashboardId);
            
            // Initialize specific dashboard
            console.log('Initializing dashboard for role:', role);
            if (role === 'employee') {
                initializeEmployeeDashboard();
            } else if (role === 'manager') {
                initializeManagerDashboard();
            } else if (role === 'area_manager') {
                initializeAreaManagerDashboard();
            } else if (role === 'owner') {
                initializeOwnerDashboard();
            }
        } else {
            console.error('Dashboard element not found:', dashboardId);
        }
    }
}

function showLoginPage() {
    const loginPage = document.getElementById('login-page');
    const mainApp = document.getElementById('main-app');
    
    if (loginPage) loginPage.classList.remove('hidden');
    if (mainApp) mainApp.classList.add('hidden');
}

function updateUserDisplay(user) {
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
