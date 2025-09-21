// Employee management service
import { SAMPLE_EMPLOYEES } from '../config/constants.js';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storage.js';
import { generateId } from '../utils/helpers.js';

export function getAllEmployees() {
    return loadFromLocalStorage('employees', SAMPLE_EMPLOYEES);
}

export function getEmployeeById(id) {
    const employees = getAllEmployees();
    return employees.find(emp => emp.id === id);
}

export function addEmployee(employeeData) {
    const employees = getAllEmployees();
    const newEmployee = {
        id: generateId().toString(),
        ...employeeData,
        createdAt: new Date().toISOString(),
        isActive: true
    };
    employees.push(newEmployee);
    saveToLocalStorage('employees', employees);
    return newEmployee;
}

export function updateEmployee(id, updates) {
    const employees = getAllEmployees();
    const index = employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
        employees[index] = { ...employees[index], ...updates };
        saveToLocalStorage('employees', employees);
        return employees[index];
    }
    return null;
}

export function deleteEmployee(id) {
    const employees = getAllEmployees();
    const filteredEmployees = employees.filter(emp => emp.id !== id);
    saveToLocalStorage('employees', filteredEmployees);
    return true;
}

export function getEmployeesByBranch(branchName) {
    const employees = getAllEmployees();
    return employees.filter(emp => emp.branch === branchName);
}

export function getEmployeeOperations(employeeId) {
    const operations = loadFromLocalStorage(`employeeOperations_${employeeId}`, []);
    return operations.map(op => ({
        ...op,
        operations: cleanValue(op.operations),
        points: cleanValue(op.points),
        employeeName: op.employeeName || 'غير محدد',
        system: op.system || op.systemName || 'غير محدد',
        date: op.date || new Date().toISOString().split('T')[0],
        timestamp: op.timestamp || op.date || new Date().toISOString(),
        time: op.time || '--:--',
        notes: op.notes || ''
    }));
}

export function getAllEmployeesOperations() {
    const employees = getAllEmployees();
    const allOperations = [];
    employees.forEach(employee => {
        if (employee && employee.id) {
            const employeeOps = getEmployeeOperations(employee.id);
            if (Array.isArray(employeeOps)) {
                const cleanOps = employeeOps.map(op => ({
                    ...op,
                    operations: cleanValue(op.operations),
                    points: cleanValue(op.points),
                    employeeName: op.employeeName || employee.name || 'غير محدد',
                    system: op.system || op.systemName || 'غير محدد',
                    date: op.date || new Date().toISOString().split('T')[0],
                    timestamp: op.timestamp || op.date || new Date().toISOString()
                }));
                allOperations.push(...cleanOps);
            }
        }
    });
    return allOperations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

function cleanValue(value, defaultValue = 0) {
    if (value === null || value === undefined || value === '' || 
        isNaN(value) || value === 'NaN' || value === 'undefined' || 
        value === 'null' || value === 'Infinity' || value === '-Infinity') {
        return defaultValue;
    }
    const numValue = Number(value);
    if (isNaN(numValue)) {
        return defaultValue;
    }
    return numValue;
}
