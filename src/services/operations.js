// Operations management service
import { SAMPLE_OPERATIONS } from '../config/constants.js';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storage.js';
import { generateId, cleanValue } from '../utils/helpers.js';

export function getOperations() {
    return loadFromLocalStorage('operations', SAMPLE_OPERATIONS);
}

export function getOperationById(id) {
    const operations = getOperations();
    return operations.find(op => op.id === id);
}

export function addOperation(operationData) {
    const operations = getOperations();
    const newOperation = {
        id: generateId(),
        ...operationData,
        timestamp: new Date().toISOString(),
        date: operationData.date || new Date().toISOString().split('T')[0],
        time: operationData.time || new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };
    operations.push(newOperation);
    saveToLocalStorage('operations', operations);
    return newOperation;
}

export function updateOperation(id, updates) {
    const operations = getOperations();
    const index = operations.findIndex(op => op.id === id);
    if (index !== -1) {
        operations[index] = { ...operations[index], ...updates };
        saveToLocalStorage('operations', operations);
        return operations[index];
    }
    return null;
}

export function deleteOperation(id) {
    const operations = getOperations();
    const filteredOperations = operations.filter(op => op.id !== id);
    saveToLocalStorage('operations', filteredOperations);
    return true;
}

export function getOperationsByEmployee(employeeId) {
    const operations = getOperations();
    return operations.filter(op => op.employeeId === employeeId);
}

export function getOperationsByBranch(branchName) {
    const operations = getOperations();
    return operations.filter(op => op.branch === branchName);
}

export function getOperationsByDateRange(startDate, endDate) {
    const operations = getOperations();
    return operations.filter(op => {
        const opDate = new Date(op.date);
        return opDate >= new Date(startDate) && opDate <= new Date(endDate);
    });
}

export function getOperationsBySystem(systemName) {
    const operations = getOperations();
    return operations.filter(op => op.system === systemName);
}

export function calculateEmployeeStats(employeeId) {
    const operations = getOperationsByEmployee(employeeId);
    const totalOperations = operations.reduce((sum, op) => sum + cleanValue(op.operations), 0);
    const totalPoints = operations.reduce((sum, op) => sum + cleanValue(op.points), 0);
    const uniqueSystems = new Set(operations.map(op => op.system).filter(s => s));
    const avgOperationsPerDay = totalOperations / Math.max(operations.length, 1);
    const avgPointsPerOperation = totalPoints / Math.max(totalOperations, 1);

    return {
        totalOperations,
        totalPoints,
        uniqueSystems: uniqueSystems.size,
        avgOperationsPerDay,
        avgPointsPerOperation,
        operationsCount: operations.length
    };
}

export function calculateBranchStats(branchName) {
    const operations = getOperationsByBranch(branchName);
    const totalOperations = operations.reduce((sum, op) => sum + cleanValue(op.operations), 0);
    const totalPoints = operations.reduce((sum, op) => sum + cleanValue(op.points), 0);
    const uniqueEmployees = new Set(operations.map(op => op.employeeId).filter(id => id));
    const uniqueSystems = new Set(operations.map(op => op.system).filter(s => s));

    return {
        totalOperations,
        totalPoints,
        uniqueEmployees: uniqueEmployees.size,
        uniqueSystems: uniqueSystems.size,
        operationsCount: operations.length
    };
}
