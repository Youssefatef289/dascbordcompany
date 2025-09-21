// Authentication service
import { USERS } from '../config/constants.js';
import { saveToLocalStorage, loadFromLocalStorage, removeFromLocalStorage } from '../utils/storage.js';

let currentUser = null;

export function getCurrentUser() {
    return currentUser;
}

export function setCurrentUser(user) {
    currentUser = user;
    if (user) {
        saveToLocalStorage('currentUser', user);
    } else {
        removeFromLocalStorage('currentUser');
    }
}

export function login(username, password) {
    const user = USERS[username];
    if (user && user.password === password) {
        const userData = {
            username,
            role: user.role,
            ...user.data
        };
        setCurrentUser(userData);
        return { success: true, user: userData };
    }
    return { success: false, message: 'اسم المستخدم أو كلمة المرور غير صحيحة' };
}

export function logout() {
    setCurrentUser(null);
    return { success: true };
}

export function isAuthenticated() {
    return currentUser !== null;
}

export function hasRole(role) {
    return currentUser && currentUser.role === role;
}

export function initializeAuth() {
    const savedUser = loadFromLocalStorage('currentUser');
    if (savedUser) {
        currentUser = savedUser;
    }
}
