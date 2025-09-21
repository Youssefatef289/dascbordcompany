// HTML Component Loader Utility
export async function loadHTMLComponent(componentPath, targetElementId) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load component: ${response.statusText}`);
        }
        const html = await response.text();
        const targetElement = document.getElementById(targetElementId);
        if (targetElement) {
            targetElement.innerHTML = html;
        } else {
            console.error(`Target element with id '${targetElementId}' not found`);
        }
    } catch (error) {
        console.error('Error loading HTML component:', error);
    }
}

export function loadAllDashboardComponents() {
    // Load Employee Dashboard
    loadHTMLComponent('src/components/html/EmployeeDashboard.html', 'employee-dashboard');
    
    // Load Manager Dashboard
    loadHTMLComponent('src/components/html/ManagerDashboard.html', 'manager-dashboard');
    
    // Load Area Manager Dashboard
    loadHTMLComponent('src/components/html/AreaManagerDashboard.html', 'area-manager-dashboard');
    
    // Load Owner Dashboard
    loadHTMLComponent('src/components/html/OwnerDashboard.html', 'owner-dashboard');
}

// Initialize component loading when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadAllDashboardComponents();
});
