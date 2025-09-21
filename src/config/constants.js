// Constants and configuration data
export const USERS = {
    "employee1": {
        password: "password123",
        role: "employee",
        data: {
            id: 'EMP001',
            name: 'أحمد محمد علي',
            department: 'المبيعات',
            branch: 'فرع بنى سويف',
            baseSalary: 5000,
            targetValue: 2000,
            requiredPoints: 1600,
            currentPoints: 1200,
            targetPercentageRequired: 80,
            dailyPerformance: [{
                day: 'الاثنين',
                operations: 15,
                points: 45
            }, {
                day: 'الثلاثاء',
                operations: 18,
                points: 52
            }, {
                day: 'الأربعاء',
                operations: 12,
                points: 38
            }, {
                day: 'الخميس',
                operations: 22,
                points: 58
            }, {
                day: 'الجمعة',
                operations: 20,
                points: 61
            }, {
                day: 'السبت',
                operations: 16,
                points: 48
            }, {
                day: 'الأحد',
                operations: 19,
                points: 57
            }],
            loanRequests: [],
            attendanceStatus: 'لم يتم التسجيل اليوم',
            operations: [{
                name: 'أورج كاش',
                operations: 45,
                points: 135,
                date: '2024-01-15',
                time: '09:30'
            }, {
                name: 'نظام المبيعات',
                operations: 32,
                points: 96,
                date: '2024-01-15',
                time: '11:15'
            }, {
                name: 'إدارة العملاء',
                operations: 28,
                points: 84,
                date: '2024-01-15',
                time: '14:20'
            }],
            notes: [{
                id: 1,
                text: 'أداء ممتاز هذا الأسبوع',
                date: '2024-01-15',
                author: 'مدير الفرع'
            }]
        }
    },
    "manager1": {
        password: "manager123",
        role: "manager",
        data: {
            id: 'MGR001',
            name: 'فاطمة حسن',
            department: 'الإدارة',
            branch: 'فرع بنى سويف',
            employees: ['EMP001', 'EMP002', 'EMP003']
        }
    },
    "area_manager1": {
        password: "area123",
        role: "area_manager",
        data: {
            id: 'AREA001',
            name: 'محمد أحمد',
            department: 'إدارة المنطقة',
            branches: ['فرع بنى سويف', 'فرع القاهرة', 'فرع الإسكندرية']
        }
    },
    "owner1": {
        password: "owner123",
        role: "owner",
        data: {
            id: 'OWN001',
            name: 'المالك"
        }
    }
};

export const SAMPLE_BRANCHES = [
    {
        id: 1,
        name: "فرع بني سويف",
        address: "شارع الجمهورية، بني سويف",
        manager: "فاطمة حسن",
        phone: "01234567890",
        createdAt: "2024-01-01T00:00:00.000Z",
        employees: []
    },
    {
        id: 2,
        name: "فرع القاهرة",
        address: "شارع التحرير، القاهرة",
        manager: "أحمد علي",
        phone: "01234567891",
        createdAt: "2024-01-01T00:00:00.000Z",
        employees: []
    },
    {
        id: 3,
        name: "فرع الإسكندرية",
        address: "شارع سعد زغلول، الإسكندرية",
        manager: "مريم محمود",
        phone: "01234567892",
        createdAt: "2024-01-01T00:00:00.000Z",
        employees: []
    }
];

export const SAMPLE_EMPLOYEES = [
    {
        id: 'EMP001',
        name: 'أحمد محمد علي',
        position: 'مندوب مبيعات',
        branch: 'فرع بني سويف',
        email: 'ahmed@company.com',
        phone: '01234567890',
        role: 'employee',
        createdAt: '2024-01-01T00:00:00.000Z',
        isActive: true
    },
    {
        id: 'EMP002',
        name: 'سارة أحمد',
        position: 'مندوب مبيعات',
        branch: 'فرع بني سويف',
        email: 'sara@company.com',
        phone: '01234567891',
        role: 'employee',
        createdAt: '2024-01-01T00:00:00.000Z',
        isActive: true
    },
    {
        id: 'EMP003',
        name: 'محمد حسن',
        position: 'مندوب مبيعات',
        branch: 'فرع بني سويف',
        email: 'mohamed@company.com',
        phone: '01234567892',
        role: 'employee',
        createdAt: '2024-01-01T00:00:00.000Z',
        isActive: true
    }
];

export const SAMPLE_OPERATIONS = [
    {
        id: 1,
        employeeId: 'EMP001',
        employeeName: 'أحمد محمد علي',
        system: 'أورج كاش',
        operations: 15,
        points: 45,
        date: '2024-01-15',
        time: '09:30',
        timestamp: '2024-01-15T09:30:00.000Z',
        notes: 'عمليات مبيعات ناجحة'
    },
    {
        id: 2,
        employeeId: 'EMP002',
        employeeName: 'سارة أحمد',
        system: 'نظام المبيعات',
        operations: 12,
        points: 36,
        date: '2024-01-15',
        time: '10:15',
        timestamp: '2024-01-15T10:15:00.000Z',
        notes: 'عمليات إدارة العملاء'
    }
];
