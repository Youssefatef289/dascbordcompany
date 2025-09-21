// HTML Component Loader Utility
export async function loadHTMLComponent(componentPath, targetElementId) {
    try {
        console.log(`Loading component: ${componentPath} into ${targetElementId}`);
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load component: ${response.statusText}`);
        }
        const html = await response.text();
        const targetElement = document.getElementById(targetElementId);
        if (targetElement) {
            targetElement.innerHTML = html;
            console.log(`Successfully loaded ${componentPath} into ${targetElementId}`);
        } else {
            console.error(`Target element with id '${targetElementId}' not found`);
        }
    } catch (error) {
        console.error(`Error loading HTML component ${componentPath}:`, error);
        // Fallback: try to load from a different path
        try {
            const fallbackPath = componentPath.replace('src/', '');
            console.log(`Trying fallback path: ${fallbackPath}`);
            const response = await fetch(fallbackPath);
            if (response.ok) {
                const html = await response.text();
                const targetElement = document.getElementById(targetElementId);
                if (targetElement) {
                    targetElement.innerHTML = html;
                    console.log(`Successfully loaded ${fallbackPath} into ${targetElementId}`);
                }
            }
        } catch (fallbackError) {
            console.error(`Fallback also failed for ${componentPath}:`, fallbackError);
        }
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
