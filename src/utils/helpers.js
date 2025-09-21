// Utility helper functions
export function cleanValue(value, defaultValue = 0) {
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

export function safePercentage(numerator, denominator, defaultValue = 0) {
    const num = cleanValue(numerator);
    const den = cleanValue(denominator);
    if (den === 0 || isNaN(num) || isNaN(den)) {
        return defaultValue;
    }
    return Math.round((num / den) * 100);
}

export function safeAverage(total, count, defaultValue = 0) {
    const totalValue = cleanValue(total);
    const countValue = cleanValue(count);
    if (countValue === 0 || isNaN(totalValue) || isNaN(countValue)) {
        return defaultValue;
    }
    return Math.round((totalValue / countValue) * 100) / 100;
}

export function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        const cleanVal = cleanValue(value);
        element.textContent = cleanVal;
    }
}

export function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 ${
        type === 'success' ? 'bg-green-600' : 
        type === 'error' ? 'bg-red-600' : 
        type === 'warning' ? 'bg-yellow-600' : 'bg-blue-600'
    }`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'success' ? 'fa-check' : 
                type === 'error' ? 'fa-times' : 
                type === 'warning' ? 'fa-exclamation' : 'fa-info'} ml-2"></i>
            ${message}
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

export function formatDate(date) {
    return new Date(date).toLocaleDateString('ar-EG');
}

export function formatTime(time) {
    return time || '--:--';
}

export function generateId() {
    return Date.now() + Math.random();
}

export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export function validatePhone(phone) {
    const re = /^[0-9]{11}$/;
    return re.test(phone);
}
