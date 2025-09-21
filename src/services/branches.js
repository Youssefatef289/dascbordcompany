// Branch management service
import { SAMPLE_BRANCHES } from '../config/constants.js';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storage.js';
import { generateId } from '../utils/helpers.js';

export function getBranches() {
    return loadFromLocalStorage('branches', SAMPLE_BRANCHES);
}

export function getBranchById(id) {
    const branches = getBranches();
    return branches.find(branch => branch.id === id);
}

export function getBranchByName(name) {
    const branches = getBranches();
    return branches.find(branch => branch.name === name);
}

export function addBranch(branchData) {
    const branches = getBranches();
    const newBranch = {
        id: generateId(),
        ...branchData,
        createdAt: new Date().toISOString(),
        employees: []
    };
    branches.push(newBranch);
    saveToLocalStorage('branches', branches);
    return newBranch;
}

export function updateBranch(id, updates) {
    const branches = getBranches();
    const index = branches.findIndex(branch => branch.id === id);
    if (index !== -1) {
        branches[index] = { ...branches[index], ...updates, updatedAt: new Date().toISOString() };
        saveToLocalStorage('branches', branches);
        return branches[index];
    }
    return null;
}

export function deleteBranch(id) {
    const branches = getBranches();
    const filteredBranches = branches.filter(branch => branch.id !== id);
    saveToLocalStorage('branches', filteredBranches);
    return true;
}

export function createBranchManagerDashboard(branch, branchManager) {
    try {
        const dashboardData = {
            branchId: branch.id,
            branchName: branch.name,
            managerName: branch.manager,
            managerId: branchManager.id,
            createdAt: new Date().toISOString(),
            employees: [],
            operations: [],
            notifications: [],
            tasks: [],
            targets: {
                daily: 0,
                monthly: 0
            },
            settings: {
                theme: 'light',
                notifications: true,
                autoRefresh: true
            }
        };

        saveToLocalStorage(`branch_dashboard_${branch.id}`, dashboardData);
        saveToLocalStorage(`branch_employees_${branch.id}`, []);
        saveToLocalStorage(`branch_operations_${branch.id}`, []);
        saveToLocalStorage(`branch_notifications_${branch.id}`, []);
        saveToLocalStorage(`branch_tasks_${branch.id}`, []);

        console.log(`تم إنشاء لوحة مدير الفرع: ${branch.name}`);
        return true;
    } catch (error) {
        console.error('Error creating branch manager dashboard:', error);
        return false;
    }
}

export function getBranchManagerDashboard(branchId) {
    try {
        const dashboardData = loadFromLocalStorage(`branch_dashboard_${branchId}`);
        return dashboardData;
    } catch (error) {
        console.error('Error getting branch manager dashboard:', error);
        return null;
    }
}

export function updateBranchManagerDashboard(branchId, updates) {
    try {
        const dashboardData = getBranchManagerDashboard(branchId);
        if (dashboardData) {
            Object.assign(dashboardData, updates);
            saveToLocalStorage(`branch_dashboard_${branchId}`, dashboardData);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error updating branch manager dashboard:', error);
        return false;
    }
}
