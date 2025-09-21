       // Dummy user data to simulate a database.
        // In a real application, this would be fetched from a server.
        const users = {
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
                        points: 45,
                        targetImpact: 30
                    }, {
                        name: 'بايتاكس',
                        operations: 38,
                        points: 38,
                        targetImpact: 65
                    }, {
                        name: 'DCL',
                        operations: 32,
                        points: 32,
                        targetImpact: 45
                    }, {
                        name: 'H4G',
                        operations: 25,
                        points: 25,
                        targetImpact: 35
                    }, {
                        name: 'ديقنس',
                        operations: 12,
                        points: 12,
                        targetImpact: 8
                    }]
                }
            },
            "manager1": {
                password: "managerpassword",
                role: "manager",
                data: {
                    name: "مدير الفرع"
                }
            },
            "area_manager1": {
                password: "areapassword",
                role: "area_manager",
                data: {
                    name: "مدير المنطقة"
                }
            },
            "owner1": {
                password: "ownerpassword",
                role: "owner",
                data: {
                    name: "المالك"
                }
            }
        };

        // Current user variable
        let currentUser = null;

        // Get current user
        function getCurrentUser() {
            return currentUser;
        }

        // DOM elements for pages and login
        const loginPageEl = document.getElementById('login-page');
        const mainAppEl = document.getElementById('main-app');
        const loginFormEl = document.getElementById('login-form');
        const usernameInputEl = document.getElementById('username');
        const passwordInputEl = document.getElementById('password');
        const loginErrorEl = document.getElementById('login-error-message');
        const welcomeMessageEl = document.getElementById('welcome-message');
        const pageTitleEl = document.getElementById('page-title');
        const logoutBtn = document.getElementById('logout-btn');

        // Header quick actions (visible in dashboards)
        const headerSettingsBtn = document.getElementById('header-settings-btn');
        const headerNotificationsBtn = document.getElementById('header-notifications-btn');
        const headerOptionsBtn = document.getElementById('header-options-btn');
        const headerOptionsMenu = document.getElementById('header-options-menu');
        const headerNotificationsBadge = document.getElementById('header-notifications-badge');
        const globalRefreshBtn = document.getElementById('global-refresh-btn');
        const globalClearBtn = document.getElementById('global-clear-btn');

        // DOM elements for dashboards
        const employeeDashboardEl = document.getElementById('employee-dashboard');
        const managerDashboardEl = document.getElementById('manager-dashboard');
        const areaManagerDashboardEl = document.getElementById('area-manager-dashboard');
        const ownerDashboardEl = document.getElementById('owner-dashboard');
        // Owner elements
        const ownerSubtitleEl = document.getElementById('owner-subtitle');
        const ownerKpiRegionsEl = document.getElementById('owner-kpi-regions');
        const ownerKpiBranchesEl = document.getElementById('owner-kpi-branches');
        const ownerKpiEmployeesEl = document.getElementById('owner-kpi-employees');
        const ownerKpiCompletionEl = document.getElementById('owner-kpi-completion');
        const ownerKpiRevenueEl = document.getElementById('owner-kpi-revenue');
        const ownerFilterRegionEl = document.getElementById('owner-filter-region');
        const ownerFilterPeriodEl = document.getElementById('owner-filter-period');
        const ownerRegionsListEl = document.getElementById('owner-regions-list');
        const ownerAlertsEl = document.getElementById('owner-alerts');
        const ownerSystemsEl = document.getElementById('owner-systems');
        const ownerExportExcelBtn = document.getElementById('owner-export-excel');
        const ownerExportPdfBtn = document.getElementById('owner-export-pdf');
        const ownerTopRegionsEl = document.getElementById('owner-top-regions');
        const ownerRiskRegionsEl = document.getElementById('owner-risk-regions');
        const ownerCostsCompareEl = document.getElementById('owner-costs-compare');
        const companyAnnForm = document.getElementById('company-ann-form');
        const companyAnnTextEl = document.getElementById('company-ann-text');
        const companyAnnListEl = document.getElementById('company-ann-list');
        // Area Manager elements
        const areaRegionTitleEl = document.getElementById('area-region-title');
        const areaRegionSubtitleEl = document.getElementById('area-region-subtitle');
        const areaKpiCompletionEl = document.getElementById('area-kpi-completion');
        const areaKpiEmployeesEl = document.getElementById('area-kpi-employees');
        const areaKpiBranchesEl = document.getElementById('area-kpi-branches');
        const areaKpiMarginEl = document.getElementById('area-kpi-margin');
        const areaKpiRevenueEl = document.getElementById('area-kpi-revenue');
        const areaBranchesListEl = document.getElementById('area-branches-list');
        const areaAlertsEl = document.getElementById('area-alerts');
        const areaSystemsEl = document.getElementById('area-systems');
        const areaFilterPerformanceEl = document.getElementById('area-filter-performance');
        const areaFilterSystemEl = document.getElementById('area-filter-system');
        const areaFilterBranchEl = document.getElementById('area-filter-branch');
        const areaFilterPeriodEl = document.getElementById('area-filter-period');
        const areaExportExcelBtn = document.getElementById('area-export-excel');
        const areaExportPdfBtn = document.getElementById('area-export-pdf');
        // Payroll elements
        const payrollTotalEl = document.getElementById('payroll-total');
        const payrollFixedEl = document.getElementById('payroll-fixed');
        const payrollVariableEl = document.getElementById('payroll-variable');
        const payrollBonusEl = document.getElementById('payroll-bonus');
        const payrollRatioEl = document.getElementById('payroll-ratio');
        const payrollIndexEl = document.getElementById('payroll-index');
        const payrollAlertsEl = document.getElementById('payroll-alerts');
        const payrollRecosEl = document.getElementById('payroll-recos');
        const areaCostsCompareEl = document.getElementById('area-costs-compare');

        // Manager Dashboard elements
        const managerBranchNameEl = document.getElementById('manager-branch-name');
        const managerBranchSubtitleEl = document.getElementById('manager-branch-subtitle');
        const kpiEmployeesEl = document.getElementById('kpi-employees');
        const kpiOpsEl = document.getElementById('kpi-ops');
        const kpiCompletionEl = document.getElementById('kpi-completion');
        const kpiTargetEl = document.getElementById('kpi-target');
        const managerEmployeesListEl = document.getElementById('manager-employees-list');
        const managerAlertsEl = document.getElementById('manager-alerts');
        const managerApprovalsEl = document.getElementById('manager-approvals');
        const managerOpsBreakdownEl = document.getElementById('manager-ops-breakdown');
        const managerSortEl = document.getElementById('manager-sort');
        const managerFilterEl = document.getElementById('manager-filter');
        const managerEmployeeSelectEl = document.getElementById('manager-employee-select');
        const mgrEmpDailyPerformanceEl = document.getElementById('mgr-emp-daily-performance');
        const mgrEmpOpsBreakdownEl = document.getElementById('mgr-emp-ops-breakdown');
        const mgrEmpPerfCardsEl = document.getElementById('mgr-emp-performance-cards');
        const mgrEmpMonthlyTargetEl = document.getElementById('mgr-emp-monthly-target');
        const mgrEmpTargetDetailsEl = document.getElementById('mgr-emp-target-details');
        const mgrEmpRecentSalesEl = document.getElementById('mgr-emp-recent-sales');
        const mgrEmpSalesPdfBtn = document.getElementById('mgr-emp-sales-pdf');
        const mgrEmpAttendanceEl = document.getElementById('mgr-emp-attendance');
        const mgrEmpLoansEl = document.getElementById('mgr-emp-loans');
        const mgrEmpPeriodEl = document.getElementById('mgr-emp-period');
        const mgrEmpSystemEl = document.getElementById('mgr-emp-system');
        const mgrEmpExportCsvBtn = document.getElementById('mgr-emp-export-csv');
        const mgrEmpExportPdfBtn = document.getElementById('mgr-emp-export-pdf');
        const managerSetDailyTargetForm = document.getElementById('manager-set-daily-target-form');
        const managerTargetEmployeeEl = document.getElementById('manager-target-employee');
        const managerTargetPointsEl = document.getElementById('manager-target-points');
        const managerDailyTargetsListEl = document.getElementById('manager-daily-targets-list');
        const managerSetMonthlyTargetForm = document.getElementById('manager-set-monthly-target-form');
        const managerMonthlyTargetEmployeeEl = document.getElementById('manager-monthly-target-employee');
        const managerMonthlyRequiredEl = document.getElementById('manager-monthly-required');
        const managerMonthlyCurrentEl = document.getElementById('manager-monthly-current');
        const managerMonthlyTargetsListEl = document.getElementById('manager-monthly-targets-list');
        // Manager daily task form elements
        const managerDailyTaskForm = document.getElementById('manager-daily-task-form');
        const dailyTaskTitleEl = document.getElementById('daily-task-title');
        const dailyTaskAssigneeEl = document.getElementById('daily-task-assignee');
        const dailyTaskDescEl = document.getElementById('daily-task-desc');
        const dailyTaskDateEl = document.getElementById('daily-task-date');
        const managerDailyTasksListEl = document.getElementById('manager-daily-tasks-list');

        // Tasks elements
        const employeeTasksEl = document.getElementById('employee-tasks');
        const employeeAddTaskBtn = document.getElementById('employee-add-task-btn');
        const managerTasksEl = document.getElementById('manager-tasks');
        const managerAddTaskBtn = document.getElementById('manager-add-task-btn');

        // Modals
        const settingsModal = document.getElementById('settings-modal');
        const settingsClose = document.getElementById('settings-close');
        const settingsSave = document.getElementById('settings-save');
        const exportExcelBtn = document.getElementById('export-excel');
        const exportPdfBtn = document.getElementById('export-pdf');
        const exportSettingsExcelBtn = document.getElementById('export-settings-excel');
        const exportSettingsPdfBtn = document.getElementById('export-settings-pdf');
        // Settings inputs
        const settingsMonthlyTarget = document.getElementById('settings-monthly-target');
        const settingsOrange = document.getElementById('settings-orange');
        const settingsPaytax = document.getElementById('settings-paytax');
        const settingsH4g = document.getElementById('settings-h4g');
        const settingsDcl = document.getElementById('settings-dcl');
        const settingsOther = document.getElementById('settings-other');
        const ppoOrangeEl = document.getElementById('ppo-orange');
        const ppoPaytaxEl = document.getElementById('ppo-paytax');
        const ppoH4gEl = document.getElementById('ppo-h4g');
        const ppoDclEl = document.getElementById('ppo-dcl');
        const ppoOtherEl = document.getElementById('ppo-other');
        const alertLow = document.getElementById('alert-low');
        const alertHigh = document.getElementById('alert-high');
        const alertDaily = document.getElementById('alert-daily');
        const notificationsModal = document.getElementById('notifications-modal');
        const notificationsClose = document.getElementById('notifications-close');
        const notificationsClear = document.getElementById('notifications-clear');
        const notificationsListEl = document.getElementById('notifications-list');
        const notificationsCountEl = document.getElementById('notifications-count');

        // Task side panel
        const taskPanel = document.getElementById('task-panel');
        const taskPanelBtn = document.getElementById('task-panel-btn');
        const taskPanelClose = document.getElementById('task-panel-close');
        const taskPanelForm = document.getElementById('task-panel-form');
        const taskTitleInput = document.getElementById('task-title');
        const taskPanelListEl = document.getElementById('task-panel-list');

        // Employee Dashboard elements
        const basicDataEl = document.getElementById('basic-data');
        const targetDetailsEl = document.getElementById('target-details');
        const targetProgressBarEl = document.getElementById('target-progress-bar');
        const targetProgressPercentageEl = document.getElementById('target-progress-percentage');
        const dailyPerformanceEl = document.getElementById('daily-performance');
        const recordAttendanceBtn = document.getElementById('record-attendance-btn');
        const attendanceStatusEl = document.getElementById('attendance-status');
        const recordCheckoutBtn = document.getElementById('record-checkout-btn');
        const checkoutStatusEl = document.getElementById('checkout-status');
        const loanRequestForm = document.getElementById('loan-request-form');
        const loanStatusEl = document.getElementById('loan-status');
        const alertsSectionEl = document.getElementById('alerts-section');
        const alertsContainerEl = document.getElementById('alerts-container');

        // New elements for the updated dashboard
        const targetCalculatorForm = document.getElementById('target-calculator-form');
        const targetInputEl = document.getElementById('target-input');
        const requiredPointsCalcEl = document.getElementById('required-points-calc');
        const requiredPercentageCalcEl = document.getElementById('required-percentage-calc');
        const avgDailyOpsEl = document.getElementById('avg-daily-ops');
        const avgWeeklyPointsEl = document.getElementById('avg-weekly-points');
        const mostProductiveDayEl = document.getElementById('most-productive-day');
        const performanceTrendEl = document.getElementById('performance-trend');
        const dailyPerformanceFullEl = document.getElementById('daily-performance-full');
        const operationDetailsEl = document.getElementById('operation-details');
        const employeeDailyTasksListEl = document.getElementById('employee-daily-tasks-list');
        const recordSaleForm = document.getElementById('record-sale-form');
        const saleSystemEl = document.getElementById('sale-system');
        const saleOpsEl = document.getElementById('sale-ops');
        const saleDateEl = document.getElementById('sale-date');
        const saleStatusEl = document.getElementById('sale-status');
        const employeeRecentSalesEl = document.getElementById('employee-recent-sales');
        const employeeSalesPdfBtn = document.getElementById('employee-sales-pdf');
        const employeeOpsPdfBtn = document.getElementById('employee-ops-pdf');

        // Filter elements
        const filterForm = document.getElementById('filter-form');
        const filterMonthEl = document.getElementById('filter-month');
        const filterSystemEl = document.getElementById('filter-system');
        const filterPeriodEl = document.getElementById('filter-period');
        const resetFilterBtn = document.getElementById('reset-filter-btn');


        // Event Listeners
        loginFormEl.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = usernameInputEl.value;
            const password = passwordInputEl.value;

            // Check in employees first
            const employee = getEmployeeByUsername(username);
            if (employee && employee.password === password) {
                // Successful employee login
                loginPageEl.classList.add('hidden');
                mainAppEl.classList.remove('hidden');
                
                // Set current user
                currentUser = employee;
                
                // Load saved profile data for employees
                loadEmployeeProfile();
                
                // Initialize empty operations if not exists
                if (!localStorage.getItem(`employeeOperations_${employee.id}`)) {
                    localStorage.setItem(`employeeOperations_${employee.id}`, JSON.stringify([]));
                }
                
                welcomeMessageEl.textContent = `مرحباً، ${employee.name}`;
                window.__lastLoggedUser = { username };
                renderDashboard(employee);
                // seed header notifications badge
                headerNotificationsBadge.textContent = '2';
                headerNotificationsBadge.classList.remove('hidden');
                return;
            }

            // Check in area managers
            const areaManagers = getAreaManagers();
            const areaManager = areaManagers.find(am => am.username === username && am.password === password);
            if (areaManager) {
                // Successful area manager login
                loginPageEl.classList.add('hidden');
                mainAppEl.classList.remove('hidden');
                
                // Set current user
                currentUser = {
                    id: areaManager.id,
                    name: areaManager.name,
                    username: areaManager.username,
                    role: 'area_manager',
                    region: areaManager.region,
                    email: areaManager.email,
                    phone: areaManager.phone
                };
                
                welcomeMessageEl.textContent = `مرحباً، ${areaManager.name}`;
                window.__lastLoggedUser = { username };
                renderDashboard(currentUser);
                return;
            }

            // Check in original users (managers, area managers, owner)
            const user = users[username];
            if (user && user.password === password) {
                // Successful login
                loginPageEl.classList.add('hidden');
                mainAppEl.classList.remove('hidden');
                
                // Set current user
                currentUser = user;
                
                // Load saved profile data for employees
                if (user.role === 'employee') {
                    loadEmployeeProfile();
                }
                
                welcomeMessageEl.textContent = `مرحباً، ${user.data.name}`;
                window.__lastLoggedUser = { username };
                renderDashboard(user);
                // seed header notifications badge
                headerNotificationsBadge.textContent = '2';
                headerNotificationsBadge.classList.remove('hidden');
            } else {
                // Failed login
                loginErrorEl.classList.remove('hidden');
            }
        });

        logoutBtn.addEventListener('click', () => {
            // Hide main app and show login page
            mainAppEl.classList.add('hidden');
            loginPageEl.classList.remove('hidden');
            loginFormEl.reset();
            loginErrorEl.classList.add('hidden');
        });

        // Header quick actions behavior
        function openSettings() { settingsModal.classList.remove('hidden'); }
        function openNotifications() { notificationsModal.classList.remove('hidden'); }
        // Load and populate settings when opening modal
        function loadSettings() {
            try {
                const raw = localStorage.getItem('branchSettings');
                const s = raw ? JSON.parse(raw) : null;
                const def = { target: 5000, orange: 25, paytax: 22, h4g: 20, dcl: 18, other: 15, alerts: { low: true, high: true, daily: true }, ppo: { orange: 3, paytax: 3, h4g: 3, dcl: 3, other: 3 } };
                const st = s || def;
                if (settingsMonthlyTarget) settingsMonthlyTarget.value = st.target;
                if (settingsOrange) settingsOrange.value = st.orange;
                if (settingsPaytax) settingsPaytax.value = st.paytax;
                if (settingsH4g) settingsH4g.value = st.h4g;
                if (settingsDcl) settingsDcl.value = st.dcl;
                if (settingsOther) settingsOther.value = st.other;
                if (alertLow) alertLow.checked = !!st.alerts.low;
                if (alertHigh) alertHigh.checked = !!st.alerts.high;
                if (alertDaily) alertDaily.checked = !!st.alerts.daily;
                if (ppoOrangeEl) ppoOrangeEl.value = st.ppo?.orange ?? 3;
                if (ppoPaytaxEl) ppoPaytaxEl.value = st.ppo?.paytax ?? 3;
                if (ppoH4gEl) ppoH4gEl.value = st.ppo?.h4g ?? 3;
                if (ppoDclEl) ppoDclEl.value = st.ppo?.dcl ?? 3;
                if (ppoOtherEl) ppoOtherEl.value = st.ppo?.other ?? 3;
            } catch (e) { /* ignore */ }
        }
        // call once at startup so values persist even before opening
        loadSettings();
        const _openSettings = () => { loadSettings(); settingsModal.classList.remove('hidden'); };
        if (headerSettingsBtn) headerSettingsBtn.addEventListener('click', _openSettings);
        if (headerNotificationsBtn) headerNotificationsBtn.addEventListener('click', openNotifications);
        if (settingsClose) settingsClose.addEventListener('click', () => settingsModal.classList.add('hidden'));
        if (settingsSave) settingsSave.addEventListener('click', () => {
            const saved = {
                target: Number(settingsMonthlyTarget?.value || 0),
                orange: Number(settingsOrange?.value || 0),
                paytax: Number(settingsPaytax?.value || 0),
                h4g: Number(settingsH4g?.value || 0),
                dcl: Number(settingsDcl?.value || 0),
                other: Number(settingsOther?.value || 0),
                alerts: {
                    low: !!alertLow?.checked,
                    high: !!alertHigh?.checked,
                    daily: !!alertDaily?.checked,
                },
                ppo: {
                    orange: Number(ppoOrangeEl?.value || 3),
                    paytax: Number(ppoPaytaxEl?.value || 3),
                    h4g: Number(ppoH4gEl?.value || 3),
                    dcl: Number(ppoDclEl?.value || 3),
                    other: Number(ppoOtherEl?.value || 3),
                }
            };
            localStorage.setItem('branchSettings', JSON.stringify(saved));
            settingsModal.classList.add('hidden');
        });
        if (notificationsClose) notificationsClose.addEventListener('click', () => notificationsModal.classList.add('hidden'));
        if (notificationsClear) notificationsClear.addEventListener('click', () => { notificationsListEl.innerHTML = ''; headerNotificationsBadge.classList.add('hidden'); });
        if (headerOptionsBtn && headerOptionsMenu) {
            headerOptionsBtn.addEventListener('click', () => headerOptionsMenu.classList.toggle('hidden'));
            document.addEventListener('click', (e) => {
                if (!headerOptionsMenu.contains(e.target) && e.target !== headerOptionsBtn) headerOptionsMenu.classList.add('hidden');
            });
        }
        // Global refresh: يعيد رسم اللوحة الحالية بدون إعادة تحميل الصفحة
        if (globalRefreshBtn) {
            globalRefreshBtn.addEventListener('click', () => {
                const userText = welcomeMessageEl.textContent || '';
                // استنتاج الدور الحالي من عنوان الصفحة
                const title = pageTitleEl.textContent || '';
                // إعادة تشغيل renderDashboard على آخر دور مُفعل بشكل مبسط
                const username = (window.__lastLoggedUser && window.__lastLoggedUser.username) || 'employee1';
                const user = users[username];
                if (user) renderDashboard(user);
            });
        }
        // Global clear: يمسح كل مفاتيح التخزين المتعلقة بالتطبيق
        if (globalClearBtn) {
            globalClearBtn.addEventListener('click', () => {
                const ok = confirm('هل تريد تفريغ جميع البيانات التجريبية؟ سيتم حذف العمليات، الأهداف، المهام، الإعدادات...');
                if (!ok) return;
                ['sales','dailyTargets','monthlyTargets','branchSettings','loanRequests','dailyTasks','tasks','companyAnnouncements']
                    .forEach(k => localStorage.removeItem(k));
                // إزالة مفاتيح employeeTarget:*
                Object.keys(localStorage).forEach(k => { if (k.startsWith('employeeTarget:')) localStorage.removeItem(k); });
                alert('تم تفريغ البيانات. سيتم تحديث اللوحة.');
                const username = (window.__lastLoggedUser && window.__lastLoggedUser.username) || 'employee1';
                const user = users[username];
                if (user) renderDashboard(user);
            });
        }
        if (taskPanelBtn && taskPanel) taskPanelBtn.onclick = () => taskPanel.classList.remove('hidden');
        if (taskPanelClose && taskPanel) taskPanelClose.onclick = () => taskPanel.classList.add('hidden');

        // Function to render the correct dashboard based on user role
        function renderDashboard(user) {
            // Hide all dashboards first
            employeeDashboardEl.classList.add('hidden');
            managerDashboardEl.classList.add('hidden');
            areaManagerDashboardEl.classList.add('hidden');
            ownerDashboardEl.classList.add('hidden');

            // Show the correct dashboard
            switch (user.role) {
                case "employee":
                    employeeDashboardEl.classList.remove('hidden');
                    pageTitleEl.textContent = 'لوحة الموظف';
                    renderEmployeeDashboard(user);
                    break;
                case "manager":
                    managerDashboardEl.classList.remove('hidden');
                    pageTitleEl.textContent = 'لوحة مدير الفرع';
                    renderManagerDashboard();
                    wireManagerHeaderActions();
                    break;
                case "area_manager":
                    areaManagerDashboardEl.classList.remove('hidden');
                    pageTitleEl.textContent = 'لوحة مدير المنطقة';
                    renderAreaManagerDashboard();
                    break;
                case "owner":
                    ownerDashboardEl.classList.remove('hidden');
                    pageTitleEl.textContent = 'لوحة الإدارة العامة';
                    renderOwnerDashboard();
                    break;
                default:
                    // Fallback to employee dashboard
                    employeeDashboardEl.classList.remove('hidden');
                    pageTitleEl.textContent = 'لوحة الموظف';
                    renderEmployeeDashboard(user.data);
            }
        }

        // Employee Dashboard Render Functions
        function renderEmployeeDashboard(data) {
            // Functions to render employee data as previously created
            // load overrides from manager monthly target if exist
            try {
                const key = `employeeTarget:${data.id}`;
                const p = JSON.parse(localStorage.getItem(key) || '{}');
                if (p.requiredPoints) data.requiredPoints = p.requiredPoints;
                if (typeof p.currentPoints === 'number') data.currentPoints = p.currentPoints;
            } catch(e) {}
            
            // Calculate current points from actual operations
            const operations = getStoredOperations();
            const employeeOps = operations.filter(op => op.employeeId === data.id);
            data.currentPoints = employeeOps.reduce((sum, op) => sum + op.points, 0);
            function renderBasicData() {
                const cardData = [{
                    title: 'الاسم',
                    value: data.name,
                    icon: '<i class="fas fa-user text-2xl text-blue-500"></i>'
                }, {
                    title: 'رقم الموظف',
                    value: data.id,
                    icon: '<i class="fas fa-id-card text-2xl text-purple-500"></i>'
                }, {
                    title: 'القسم',
                    value: data.department,
                    icon: '<i class="fas fa-briefcase text-2xl text-green-500"></i>'
                }, {
                    title: 'الفرع',
                    value: data.branch,
                    icon: '<i class="fas fa-building text-2xl text-orange-500"></i>'
                }, {
                    title: 'الراتب الأساسي',
                    value: `${data.baseSalary.toLocaleString()} جنيه`,
                    icon: '<i class="fas fa-money-bill text-2xl text-yellow-500"></i>'
                }, {
                    title: 'قيمة الهدف',
                    value: `${data.targetValue.toLocaleString()} جنيه`,
                    icon: '<i class="fas fa-chart-line text-2xl text-red-500"></i>'
                }, ];

                basicDataEl.innerHTML = cardData.map(item => `
                    <div class="card p-4 flex items-center space-x-4 space-x-reverse">
                        <div class="flex-shrink-0">${item.icon}</div>
                        <div>
                            <div class="text-sm text-gray-500">${item.title}</div>
                            <div class="font-bold text-gray-900">${item.value}</div>
                        </div>
                    </div>
                `).join('');
            }

            function renderTargetDetails() {
                const completionPercentage = (data.currentPoints / data.requiredPoints) * 100;
                const remainingPoints = data.requiredPoints - data.currentPoints;

                const cardData = [{
                    title: 'النقاط المطلوبة',
                    value: data.requiredPoints.toLocaleString(),
                    color: 'blue'
                }, {
                    title: 'النقاط الحالية',
                    value: data.currentPoints.toLocaleString(),
                    color: 'green'
                }, {
                    title: 'نسبة الإنجاز',
                    value: `${completionPercentage.toFixed(2)}%`,
                    color: 'purple'
                }, {
                    title: 'المتبقي',
                    value: remainingPoints.toLocaleString(),
                    color: 'red'
                }, ];

                targetDetailsEl.innerHTML = cardData.map(item => `
                    <div class="card p-4 text-center">
                        <div class="text-lg text-${item.color}-600 font-bold">${item.value}</div>
                        <div class="text-sm text-gray-500">${item.title}</div>
                    </div>
                `).join('');

                // Update progress bar
                targetProgressBarEl.style.width = `${completionPercentage}%`;
                targetProgressPercentageEl.textContent = `${completionPercentage.toFixed(2)}%`;
            }

            // Sales store helpers (shared)
            function getSalesStore() { const raw = localStorage.getItem('sales'); return raw ? JSON.parse(raw) : []; }
            function setSalesStore(list) { localStorage.setItem('sales', JSON.stringify(list)); }
            function todayISO() { return new Date().toISOString().slice(0,10); }
            function renderEmployeeRecentSales() {
                if (!employeeRecentSalesEl) return;
                const list = getSalesStore().filter(s => s.employeeId === data.id).slice(-10).reverse();
                employeeRecentSalesEl.innerHTML = list.map(s => `<div class="p-3 border rounded-lg flex items-center justify-between"><div>${s.systemName} — <span class=\"font-semibold\">${s.operations} عملية</span> (+${s.points} نقطة)</div><div class=\"text-xs text-gray-500\">${s.date}</div></div>`).join('') || '<div class=\"text-gray-500\">لا توجد عمليات بعد</div>';
            }

            function renderDailyPerformance() {
                const dailyPerformanceEl = document.getElementById('daily-performance-details');
                if (!dailyPerformanceEl) return;
                
                // Build buckets from sales store for last 7 days
                const days = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
                const today = new Date();
                const buckets = [];
                for (let i = 6; i >= 0; i--) {
                    const d = new Date(today);
                    d.setDate(today.getDate() - i);
                    buckets.push({ key: d.toISOString().slice(0, 10), day: days[d.getDay()], operations: 0, points: 0 });
                }
                const sales = (localStorage.getItem('sales') ? JSON.parse(localStorage.getItem('sales')) : []).filter(s => s.employeeId === data.id);
                sales.forEach(s => {
                    const b = buckets.find(x => x.key === s.date);
                    if (b) {
                        b.operations += s.operations;
                        b.points += s.points;
                    }
                });
                const source = buckets.some(b => b.operations > 0 || b.points > 0) ? buckets : data.dailyPerformance;
                dailyPerformanceEl.innerHTML = source.map(dayData => `
                    <div class="card p-4">
                        <h3 class="font-medium text-gray-800">${dayData.day}</h3>
                        <div class="mt-2 text-sm text-gray-600">العمليات: ${dayData.operations}</div>
                        <div class="mt-1 w-full bg-gray-200 rounded-full h-2"><div class="bg-blue-500 h-2 rounded-full" style="width: ${Math.min(100, (dayData.operations / 25) * 100)}%"></div></div>
                        <div class="mt-2 text-sm text-gray-600">النقاط: ${dayData.points}</div>
                        <div class="mt-1 w-full bg-gray-200 rounded-full h-2"><div class="bg-green-500 h-2 rounded-full" style="width: ${Math.min(100, (dayData.points / 60) * 100)}%"></div></div>
                    </div>
                `).join('');
            }

            function renderAttendanceStatus() {
                if (!data.attendanceStatus) {
                    data.attendanceStatus = 'لم يتم تسجيل الحضور اليوم';
                }
                if (!data.checkoutStatus) {
                    data.checkoutStatus = 'لم يتم تسجيل الانصراف اليوم';
                }
                attendanceStatusEl.textContent = data.attendanceStatus;
                if (checkoutStatusEl) {
                    checkoutStatusEl.textContent = data.checkoutStatus;
                }
            }

            // Employee Daily Tasks rendering (linked to manager assignments)
            function renderEmployeeDailyTasks() {
                if (!employeeDailyTasksListEl) return;
                const all = (localStorage.getItem('dailyTasks') ? JSON.parse(localStorage.getItem('dailyTasks')) : []);
                const today = new Date().toISOString().slice(0,10);
                const todays = all.filter(t => t.date === today && (t.assignee === 'all' || t.assignee === data.id));
                employeeDailyTasksListEl.innerHTML = todays.map((t) => {
                    const done = Array.isArray(t.doneBy) && t.doneBy.includes(data.id);
                    return `
                        <div class="p-3 border rounded-lg flex items-center justify-between">
                            <div>
                                <div class="font-semibold text-gray-800">${t.title}</div>
                                ${t.desc ? `<div class=\"text-sm text-gray-600\">${t.desc}</div>` : ''}
                                <div class="text-xs text-gray-500 mt-1">تاريخ: ${t.date}</div>
                            </div>
                            <label class="flex items-center space-x-2 space-x-reverse">
                                <input type="checkbox" data-taskid="${t.id}" ${done ? 'checked' : ''} class="employee-daily-done h-5 w-5">
                                <span class="text-sm">تم</span>
                            </label>
                        </div>`;
                }).join('') || '<div class="text-gray-500">لا توجد مهام اليوم</div>';

                // attach handlers
                employeeDailyTasksListEl.querySelectorAll('.employee-daily-done').forEach(cb => {
                    cb.addEventListener('change', (e) => {
                        const id = Number(e.target.getAttribute('data-taskid'));
                        const store = (localStorage.getItem('dailyTasks') ? JSON.parse(localStorage.getItem('dailyTasks')) : []);
                        const idx = store.findIndex(t => t.id === id);
                        if (idx >= 0) {
                            store[idx].doneBy = store[idx].doneBy || [];
                            const pos = store[idx].doneBy.indexOf(data.id);
                            if (e.target.checked && pos === -1) store[idx].doneBy.push(data.id);
                            if (!e.target.checked && pos !== -1) store[idx].doneBy.splice(pos, 1);
                            localStorage.setItem('dailyTasks', JSON.stringify(store));
                        }
                    });
                });
            }

            function renderAlerts() {
                const completionPercentage = (data.currentPoints / data.requiredPoints) * 100;
                const alerts = [];
                const highestImpactOp = data.operations.reduce((prev, current) => (prev.targetImpact > current.targetImpact) ? prev : current);

                if (completionPercentage < data.targetPercentageRequired) {
                    alerts.push({
                        message: `أداؤك أقل من ${data.targetPercentageRequired}% المطلوبة، تحتاج لزيادة الجهد لتحقيق الهدف.`,
                        type: 'warning'
                    });
                }
                alerts.push({
                    message: `لتوزيع العمليات بشكل متوازن، ركز على عملية "${highestImpactOp.name}" فإنها تحقق ${highestImpactOp.targetImpact}% من الهدف.`,
                    type: 'info'
                });

                if (alerts.length > 0) {
                    alertsSectionEl.classList.remove('hidden');
                    alertsContainerEl.innerHTML = alerts.map(alert => `
                        <div class="bg-yellow-100 text-yellow-800 p-4 rounded-md flex justify-between items-center">
                            <div>
                                <i class="fas fa-exclamation-triangle ml-2"></i> ${alert.message}
                            </div>
                            <button class="text-yellow-800 hover:text-yellow-900 focus:outline-none">
                                <i class="fas fa-times-circle"></i>
                            </button>
                        </div>
                    `).join('');
                }
            }

            function renderTargetCalculator() {
                targetCalculatorForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const targetAmount = parseFloat(targetInputEl.value);
                    if (!isNaN(targetAmount) && targetAmount > 0) {
                        const calculatedPoints = targetAmount * (data.requiredPoints / data.targetValue);
                        const calculatedPercentage = (calculatedPoints / data.requiredPoints) * 100;
                        requiredPointsCalcEl.textContent = calculatedPoints.toFixed(0);
                        requiredPercentageCalcEl.textContent = `${calculatedPercentage.toFixed(2)}%`;

                        // Update the data model and re-render monthly target details
                        data.targetValue = targetAmount;
                        data.requiredPoints = Math.round(calculatedPoints);
                        renderTargetDetails();
                        renderAlerts();
                    }
                });
            }

            function renderPerformanceReport() {
                // Build series from sales or fallback
                const days = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
                const today = new Date();
                const buckets = [];
                for (let i = 6; i >= 0; i--) {
                    const d = new Date(today);
                    d.setDate(today.getDate() - i);
                    buckets.push({ key: d.toISOString().slice(0,10), day: days[d.getDay()], operations: 0, points: 0 });
                }
                const sales = (localStorage.getItem('sales') ? JSON.parse(localStorage.getItem('sales')) : []).filter(s => s.employeeId === data.id);
                sales.forEach(s => { const b = buckets.find(x=>x.key===s.date); if (b) { b.operations += s.operations; b.points += s.points; } });
                const series = buckets.some(b=>b.operations>0||b.points>0) ? buckets : data.dailyPerformance;

                const totalOperations = series.reduce((sum, day) => sum + day.operations, 0);
                const avgDailyOps = totalOperations / series.length;
                const totalPoints = series.reduce((sum, day) => sum + day.points, 0);
                const avgWeeklyPoints = totalPoints;
                const mostProductiveDay = series.reduce((prev, current) => (prev.points > current.points) ? prev : current);
                const trend = series[series.length - 1].points - series[0].points;
                const trendText = trend > 0 ? `+${(series[0].points ? (trend / series[0].points * 100) : 0).toFixed(1)}% ارتفاع` : `${(series[0].points ? (trend / series[0].points * 100) : 0).toFixed(1)}% انخفاض`;

                avgDailyOpsEl.textContent = avgDailyOps.toFixed(1);
                avgWeeklyPointsEl.textContent = avgWeeklyPoints.toFixed(0);
                mostProductiveDayEl.textContent = mostProductiveDay.day;
                performanceTrendEl.textContent = trendText;
                performanceTrendEl.parentElement.classList.remove('bg-red-100', 'bg-green-100');
                performanceTrendEl.parentElement.classList.add(trend > 0 ? 'bg-green-100' : 'bg-red-100');
                performanceTrendEl.previousElementSibling.classList.remove('text-red-600', 'text-green-600');
                performanceTrendEl.previousElementSibling.classList.add(trend > 0 ? 'text-green-600' : 'text-red-600');
            }

            function renderDailyPerformanceFull() {
                // Build series from sales or fallback
                const days = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
                const today = new Date();
                const buckets = [];
                for (let i = 6; i >= 0; i--) {
                    const d = new Date(today);
                    d.setDate(today.getDate() - i);
                    buckets.push({ key: d.toISOString().slice(0,10), day: days[d.getDay()], operations: 0, points: 0 });
                }
                const sales = (localStorage.getItem('sales') ? JSON.parse(localStorage.getItem('sales')) : []).filter(s => s.employeeId === data.id);
                sales.forEach(s => { const b = buckets.find(x=>x.key===s.date); if (b) { b.operations += s.operations; b.points += s.points; } });
                const source = buckets.some(b=>b.operations>0||b.points>0) ? buckets : data.dailyPerformance;

                dailyPerformanceFullEl.innerHTML = source.map(dayData => `
                    <div class="card p-4">
                        <h3 class="font-medium text-gray-800">${dayData.day}</h3>
                        <div class="mt-2 text-sm text-gray-600">العمليات: ${dayData.operations}</div>
                        <div class="mt-1 w-full bg-gray-200 rounded-full h-2"><div class="bg-blue-500 h-2 rounded-full" style="width: ${Math.min(100, (dayData.operations / 25) * 100)}%"></div></div>
                        <div class="mt-2 text-sm text-gray-600">النقاط: ${dayData.points}</div>
                        <div class="mt-1 w-full bg-gray-200 rounded-full h-2"><div class="bg-green-500 h-2 rounded-full" style="width: ${Math.min(100, (dayData.points / 60) * 100)}%"></div></div>
                    </div>
                `).join('');
            }

            function renderOperationDetails() {
                // This function now depends on filtered data
                // Aggregate from sales store if available, otherwise initial data
                const sales = (localStorage.getItem('sales') ? JSON.parse(localStorage.getItem('sales')) : []).filter(s => s.employeeId === data.id);
                let opsAgg;
                if (sales.length) {
                    const by = {};
                    sales.forEach(s => { by[s.systemName] = by[s.systemName] || { name: s.systemName, operations: 0, targetImpact: 0 }; by[s.systemName].operations += s.operations; by[s.systemName].targetImpact += s.points; });
                    // Normalize impact to % of points
                    const totalPoints = Object.values(by).reduce((t,a)=>t+a.targetImpact,0) || 1;
                    opsAgg = Object.values(by).map(a => ({ name: a.name, operations: a.operations, targetImpact: Math.round((a.targetImpact/totalPoints)*100) }));
                } else {
                    opsAgg = data.operations;
                }
                const totalOps = opsAgg.reduce((s,a)=>s+a.operations,0) || 1;
                operationDetailsEl.innerHTML = opsAgg.map(op => `
                    <div class="p-4 rounded-lg bg-white card">
                        <div class="flex items-center space-x-2 space-x-reverse mb-2">
                            <div class="w-4 h-4 rounded-full bg-indigo-500"></div>
                            <div class="font-bold text-gray-800 text-lg">${op.name}</div>
                        </div>
                        <div class="text-sm text-gray-600">إجمالي العمليات: ${op.operations}</div>
                        <div class="flex justify-between items-center mt-2 text-sm">
                            <span>نسبة من العمليات</span>
                            <span class="font-semibold">${((op.operations / totalOps) * 100).toFixed(0)}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full mt-1">
                            <div class="task-bar bg-blue-500" style="width: ${((op.operations / totalOps) * 100).toFixed(0)}%;"></div>
                        </div>
                        <div class="flex justify-between items-center mt-2 text-sm">
                            <span>تأثير على التارجت</span>
                            <span class="font-semibold">${op.targetImpact}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full mt-1">
                            <div class="task-bar bg-green-500" style="width: ${op.targetImpact}%;"></div>
                        </div>
                    </div>
                `).join('');
            }

            // New filtering logic
            filterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const selectedMonth = filterMonthEl.value;
                const selectedSystem = filterSystemEl.value;
                const selectedPeriod = filterPeriodEl.value;

                // Simulate data filtering based on selections
                let filteredData = { ...data
                };

                // The filtering logic here is a placeholder. In a real app,
                // you would make an API call to get filtered data from the server.
                if (selectedSystem !== 'all') {
                    filteredData.operations = filteredData.operations.filter(op => {
                        const systemMap = {
                            "paytax": "بايتاكس",
                            "dcl": "DCL",
                            "h4g": "H4G"
                        };
                        return op.name === systemMap[selectedSystem];
                    });
                }
                
                // For a more robust demo, we can just re-render the sections based on the same data
                // as if it was already filtered.
                renderPerformanceReport(filteredData);
                renderDailyPerformanceFull(filteredData);
                renderOperationDetails(filteredData);
            });
            
            resetFilterBtn.addEventListener('click', () => {
                filterForm.reset();
                renderPerformanceReport(data);
                renderDailyPerformanceFull(data);
                renderOperationDetails(data);
            });

            // Smooth scroll for quick navigation buttons in employee dashboard
            document.querySelectorAll('#employee-dashboard [data-scroll]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const target = document.querySelector(btn.getAttribute('data-scroll'));
                    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            });


            // Re-attach event listeners for the employee dashboard
            recordAttendanceBtn.addEventListener('click', () => {
                const now = new Date();
                const timestamp = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
                const dayName = now.toLocaleDateString('ar-EG', { weekday: 'long' });
                data.attendanceStatus = `تم تسجيل الحضور يوم ${dayName} في ${timestamp}`;
                renderAttendanceStatus();
                const message = `تم تسجيل حضورك يوم ${dayName} في ${timestamp}.`;
                const loanStatusEl = document.getElementById('loan-status');
                loanStatusEl.classList.remove('hidden');
                loanStatusEl.textContent = message;
            });

            if (recordCheckoutBtn) {
                recordCheckoutBtn.addEventListener('click', () => {
                    const now = new Date();
                    const timestamp = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
                    const dayName = now.toLocaleDateString('ar-EG', { weekday: 'long' });
                    data.checkoutStatus = `تم تسجيل الانصراف يوم ${dayName} في ${timestamp}`;
                    renderAttendanceStatus();
                    const message = `تم تسجيل انصرافك يوم ${dayName} في ${timestamp}.`;
                    const loanStatusEl = document.getElementById('loan-status');
                    loanStatusEl.classList.remove('hidden');
                    loanStatusEl.textContent = message;
                });
            }

            // Loan store helpers
            function getLoanStore() {
                const raw = localStorage.getItem('loanRequests');
                return raw ? JSON.parse(raw) : [];
            }
            function setLoanStore(list) {
                localStorage.setItem('loanRequests', JSON.stringify(list));
            }

            function renderLoanStatus() {
                const list = getLoanStore().filter(l => l.employeeId === data.id).sort((a,b)=>b.id-a.id);
                if (list.length === 0) return;
                const last = list[0];
                loanStatusEl.classList.remove('hidden');
                const statusText = last.status === 'approved' ? 'تمت الموافقة' : last.status === 'rejected' ? 'تم الرفض' : 'تحت المراجعة';
                loanStatusEl.innerHTML = `آخر طلب سلفة بقيمة ${last.amount} جنيه — الحالة: <b>${statusText}</b>`;
            }

            loanRequestForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const amount = document.getElementById('loan-amount').value;
                const reason = document.getElementById('loan-reason').value;

                if (amount && reason) {
                    const store = getLoanStore();
                    const newLoanRequest = {
                        id: Date.now(),
                        employeeId: data.id,
                        employeeName: data.name,
                        amount: Number(amount),
                        reason: reason,
                        status: 'pending',
                        date: new Date().toISOString().slice(0,10)
                    };
                    store.push(newLoanRequest);
                    setLoanStore(store);
                    loanStatusEl.classList.remove('hidden');
                    loanStatusEl.innerHTML = `تم إرسال طلب سلفة بقيمة ${amount} جنيه. الحالة: تحت المراجعة`;
                    loanRequestForm.reset();
                    // bump notifications
                    headerNotificationsBadge.textContent = '1';
                    headerNotificationsBadge.classList.remove('hidden');
                }
            });
            // Initial loan status display
            renderLoanStatus();
            
            // Initial render
            renderBasicData();
            renderTargetDetails();
            renderDailyPerformance();
            renderAttendanceStatus();
            renderAlerts();
            renderTargetCalculator();
            renderPerformanceReport();
            renderDailyPerformanceFull();
            renderOperationDetails();
            renderEmployeeDailyTasks();
            renderEmployeeRecentSales();

            // Record sale behavior
            if (recordSaleForm) {
                recordSaleForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const system = saleSystemEl.value;
                    const operations = Number(saleOpsEl.value);
                    const pickedDate = saleDateEl && saleDateEl.value ? saleDateEl.value : todayISO();
                    if (!operations || operations <= 0) return;
                    const systemMap = { orange: 'أورنج كاش', paytax: 'بايتاكس', dcl: 'DCL', h4g: 'H4G', other: 'ديقنس' };
                    const saved = JSON.parse(localStorage.getItem('branchSettings') || '{}');
                    const pointsPerOp = (saved.ppo && saved.ppo[system]) ? Number(saved.ppo[system]) : 3;
                    const gainedPoints = operations * pointsPerOp;
                    data.currentPoints = Math.min(data.requiredPoints, data.currentPoints + gainedPoints);
                    renderTargetDetails();
                    const store = getSalesStore();
                    store.push({ id: Date.now(), employeeId: data.id, employeeName: data.name, system, systemName: systemMap[system], operations, points: gainedPoints, date: pickedDate });
                    setSalesStore(store);
                    if (saleStatusEl) { saleStatusEl.textContent = `تم تسجيل ${systemMap[system]} بعدد ${operations} عملية (+${gainedPoints} نقطة)`; saleStatusEl.classList.remove('hidden'); }
                    recordSaleForm.reset();
                    renderEmployeeRecentSales();
                    
                    // تحديث الإحصائيات تلقائياً بعد تسجيل العملية
                    updatePerformanceReport();
                    updateDailyOperationsStats();
                    updateAllDisplays();
                });
            }

            if (employeeSalesPdfBtn) {
                employeeSalesPdfBtn.addEventListener('click', () => {
                    const list = getSalesStore().filter(s => s.employeeId === data.id).slice(-10).reverse();
                    const rows = list.map((s,i) => `<tr><td>${i+1}</td><td>${s.systemName}</td><td>${s.operations}</td><td>${s.points}</td><td>${s.date}</td></tr>`).join('');
                    const w = window.open('', '_blank');
                    w.document.write(`<!DOCTYPE html><html lang=\"ar\" dir=\"rtl\"><head><meta charset=\"utf-8\"><title>عمليات اليوم</title><style>body{font-family:Cairo,sans-serif;padding:24px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;text-align:center}th{background:#f3f4f6}</style></head><body><h1>آخر العمليات المسجلة</h1><table><thead><tr><th>#</th><th>النظام</th><th>عدد العمليات</th><th>النقاط</th><th>التاريخ</th></tr></thead><tbody>${rows}</tbody></table></body></html>`);
                    w.document.close(); w.focus(); w.print();
                });
            }
            if (employeeOpsPdfBtn) {
                employeeOpsPdfBtn.addEventListener('click', () => {
                    const container = document.getElementById('operation-details');
                    const w = window.open('', '_blank');
                    w.document.write(`<!DOCTYPE html><html lang=\"ar\" dir=\"rtl\"><head><meta charset=\"utf-8\"><title>تفاصيل أنواع العمليات</title><style>body{font-family:Cairo,sans-serif;padding:24px}</style></head><body><h1>تفاصيل أنواع العمليات</h1>${container.outerHTML}</body></html>`);
                    w.document.close(); w.focus(); w.print();
                });
            }
        }

        // Manager Dashboard Render Functions
        function renderManagerDashboard() {
            // Load saved settings (with defaults)
            const saved = JSON.parse(localStorage.getItem('branchSettings') || '{}');
            const settings = {
                target: saved.target || 5000,
                orange: saved.orange ?? 25,
                paytax: saved.paytax ?? 22,
                h4g: saved.h4g ?? 20,
                dcl: saved.dcl ?? 18,
                other: saved.other ?? 15,
                alerts: {
                    low: saved.alerts?.low !== false,
                    high: saved.alerts?.high !== false,
                    daily: saved.alerts?.daily !== false,
                }
            };

            // Demo dataset for a branch (opsBreakdown will reflect settings)
            const branch = {
                name: 'مدير الفرع',
                subtitle: '  • 12 موظف',
                target: settings.target,
                employees: [
                    { id: 'EMP001', name: 'أحمد محمد علي', ops: 476, completion: 95.2, systems: { paytax: 98, dcl: 87, h4g: 76, other: 90 } },
                    { id: 'EMP002', name: 'نور الهدى محمود', ops: 460, completion: 92.1, systems: { paytax: 95, dcl: 83, h4g: 78, other: 86 } },
                    { id: 'EMP003', name: 'فاطمة السيد أحمد', ops: 443, completion: 88.7, systems: { paytax: 92, dcl: 79, h4g: 82, other: 80 } },
                    { id: 'EMP004', name: 'محمد عبد الرحمن', ops: 382, completion: 76.4, systems: { paytax: 78, dcl: 65, h4g: 72, other: 72 } },
                ],
                approvals: [
                    { employee: 'أحمد محمد علي', amount: 2000, reason: 'طارئ طبي', attachment: 'medical_report.pdf' },
                    { employee: 'كريم عادل', amount: 500, reason: 'ظرف طارئ', attachment: null },
                ],
                opsBreakdown: [
                    { name: 'أورنج كاش', ops: 105, targetImpact: Number(settings.orange) },
                    { name: 'بايتانس', ops: 98, targetImpact: Number(settings.paytax) },
                    { name: 'DCL', ops: 87, targetImpact: Number(settings.dcl) },
                    { name: 'H4G', ops: 76, targetImpact: Number(settings.h4g) },
                    { name: 'ديقنس', ops: 62, targetImpact: Number(settings.other) },
                ],
                alerts: [],
            };
            // expose last branch for export
            window.__lastBranchData = branch;

            // Alerts based on settings
            const avgCompletion = branch.employees.reduce((s, e) => s + e.completion, 0) / branch.employees.length;
            if (settings.alerts.low && avgCompletion < 70) {
                branch.alerts.push({ type: 'danger', message: 'انخفاض عام في أداء الفرع عن 70%، يرجى المتابعة.' });
            }
            if (settings.alerts.high && branch.employees.some(e => e.completion >= 95)) {
                const top = branch.employees.find(e => e.completion >= 95);
                branch.alerts.push({ type: 'success', message: `موظف متميز: ${top.name} تجاوز 95% من التارجت.` });
            }
            if (settings.alerts.daily) {
                branch.alerts.push({ type: 'info', message: 'ملخص يومي متاح للمراجعة.' });
            }

            // Header
            managerBranchNameEl.textContent = branch.name;
            managerBranchSubtitleEl.textContent = branch.subtitle;

            // KPIs
            // Get actual employee statistics from operations
            const actualEmployees = calculateEmployeeStatsFromOperations();
            const totalEmployees = actualEmployees.length;
            const totalOps = actualEmployees.reduce((s, e) => s + e.ops, 0);
            const avgCompletion2 = totalEmployees > 0 ? actualEmployees.reduce((s, e) => s + e.completion, 0) / totalEmployees : 0;
            
            kpiEmployeesEl.textContent = totalEmployees;
            kpiOpsEl.textContent = totalOps.toLocaleString();
            kpiCompletionEl.textContent = `${avgCompletion2.toFixed(1)}%`;
            kpiTargetEl.textContent = branch.target.toLocaleString();

            // Employees list render helper
            const renderEmployees = (list) => {
                if (list.length === 0) {
                    managerEmployeesListEl.innerHTML = `
                        <div class="text-center py-8 text-gray-500">
                            <i class="fas fa-users text-4xl mb-2"></i>
                            <p>لا توجد بيانات موظفين</p>
                            <p class="text-sm">قم بتسجيل العمليات أولاً</p>
                        </div>
                    `;
                    return;
                }
                
                managerEmployeesListEl.innerHTML = list.map((e, idx) => {
                    const color = e.completion >= 90 ? 'text-green-600' : e.completion >= 80 ? 'text-amber-600' : 'text-red-600';
                    const barColor = e.completion >= 90 ? 'bg-green-500' : e.completion >= 80 ? 'bg-yellow-500' : 'bg-red-500';
                    return `
                        <div class="p-4 rounded-xl bg-white border border-gray-100">
                            <div class="flex items-center justify-between">
                                <div class="font-semibold text-gray-800">${e.name}</div>
                                <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-700 text-sm">${idx + 1}</span>
                            </div>
                            <div class="mt-3 flex items-center space-x-3 space-x-reverse">
                                <div class="w-20 text-sm ${color} font-bold">${e.completion.toFixed(1)}%</div>
                                <div class="flex-1 h-2 bg-gray-200 rounded-full">
                                    <div class="h-2 ${barColor} rounded-full" style="width:${Math.min(100, e.completion)}%"></div>
                                </div>
                                <div class="w-20 text-xs text-gray-500 text-left">${e.ops}/500</div>
                            </div>
                            <div class="mt-3 grid grid-cols-4 text-center text-xs text-gray-500">
                                <div>بايتانس<br><span class="font-semibold text-gray-700">${e.systems.paytax}</span></div>
                                <div>H4G<br><span class="font-semibold text-gray-700">${e.systems.h4g}</span></div>
                                <div>DCL<br><span class="font-semibold text-gray-700">${e.systems.dcl}</span></div>
                                <div>ديفنس<br><span class="font-semibold text-gray-700">${e.systems.other}</span></div>
                            </div>
                        </div>
                    `;
                }).join('');
            };

            // Initial employees list - use actual data
            renderEmployees(actualEmployees);
            // Populate assignee select
            if (dailyTaskAssigneeEl) {
                dailyTaskAssigneeEl.innerHTML = `<option value="all">كل الموظفين</option>` + actualEmployees.map(e => `<option value="${e.id}">${e.name}</option>`).join('');
            }
            // Populate manager employee selects
            if (managerEmployeeSelectEl) managerEmployeeSelectEl.innerHTML = actualEmployees.map(e=>`<option value="${e.id}">${e.name}</option>`).join('');
            if (managerTargetEmployeeEl) managerTargetEmployeeEl.innerHTML = actualEmployees.map(e=>`<option value="${e.id}">${e.name}</option>`).join('');
            if (managerMonthlyTargetEmployeeEl) managerMonthlyTargetEmployeeEl.innerHTML = actualEmployees.map(e=>`<option value="${e.id}">${e.name}</option>`).join('');
            
            // Update daily task assignee select
            const dailyTaskAssigneeEl = document.getElementById('daily-task-assignee');
            if (dailyTaskAssigneeEl) {
                dailyTaskAssigneeEl.innerHTML = `<option value="all">كل الموظفين</option>` + actualEmployees.map(e => `<option value="${e.id}">${e.name}</option>`).join('');
            }
            
            // Update recently added employees display
            updateRecentlyAddedEmployees();

            // Sort & Filter handlers
            if (managerSortEl) {
                managerSortEl.onchange = () => {
                    const clone = [...actualEmployees];
                    if (managerSortEl.value === 'ops') clone.sort((a, b) => b.ops - a.ops);
                    else clone.sort((a, b) => b.completion - a.completion);
                    renderEmployees(clone);
                };
            }
            if (managerFilterEl) {
                managerFilterEl.onchange = () => {
                    let list = [...actualEmployees];
                    if (managerFilterEl.value === 'top') list = list.filter(e => e.completion >= 90);
                    if (managerFilterEl.value === 'risk') list = list.filter(e => e.completion < 80);
                    renderEmployees(list);
                };
            }

            // Alerts
            managerAlertsEl.innerHTML = branch.alerts.map(a => {
                const base = a.type === 'danger' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
                return `<div class="${base} p-4 rounded-lg flex items-center justify-between">
                            <div><i class="fas fa-circle-exclamation ml-2"></i>${a.message}</div>
                            <button class="opacity-70 hover:opacity-100"><i class="fas fa-xmark"></i></button>
                        </div>`;
            }).join('');

            // Approvals (loan requests from store)
            function getLoanStore() { const r = localStorage.getItem('loanRequests'); return r ? JSON.parse(r) : []; }
            function setLoanStore(list) { localStorage.setItem('loanRequests', JSON.stringify(list)); }
            function renderManagerApprovals() {
                const pending = getLoanStore().filter(l => l.status === 'pending');
                managerApprovalsEl.innerHTML = pending.map(l => `
                    <div class="p-4 rounded-lg bg-indigo-50 flex items-center justify-between">
                        <div class="text-sm text-gray-700">
                            <span class="font-bold">${l.employeeName}</span> | طلب سلفة: <span class="font-semibold">${l.amount} جنيه</span>
                            <span class="text-gray-500">— السبب: ${l.reason}</span>
                            <span class="text-gray-400"> • ${l.date}</span>
                        </div>
                        <div class="space-x-2 space-x-reverse">
                            <button data-id="${l.id}" data-action="approveLoan" class="px-3 py-1 rounded-full bg-green-500 text-white text-sm">موافقة</button>
                            <button data-id="${l.id}" data-action="rejectLoan" class="px-3 py-1 rounded-full bg-red-500 text-white text-sm">رفض</button>
                        </div>
                    </div>
                `).join('') || '<div class="text-gray-500">لا توجد طلبات معلقة</div>';
            }
            renderManagerApprovals();
            managerApprovalsEl.addEventListener('click', (e) => {
                const approveBtn = e.target.closest('[data-action="approveLoan"]');
                const rejectBtn = e.target.closest('[data-action="rejectLoan"]');
                if (!approveBtn && !rejectBtn) return;
                const id = Number((approveBtn||rejectBtn).dataset.id);
                const store = getLoanStore();
                const idx = store.findIndex(l => l.id === id);
                if (idx >= 0) {
                    store[idx].status = approveBtn ? 'approved' : 'rejected';
                    setLoanStore(store);
                    renderManagerApprovals();
                }
            });

            // Operations breakdown
            managerOpsBreakdownEl.innerHTML = branch.opsBreakdown.map(op => {
                const percent = Math.min(100, Math.round((op.ops / Math.max(1, branch.opsBreakdown.reduce((s, o) => s + o.ops, 0))) * 100));
                return `
                    <div class="p-4 rounded-lg bg-white card">
                        <div class="flex items-center justify-between">
                            <div class="font-bold text-gray-800">${op.name}</div>
                            <div class="text-sm text-gray-500">${op.ops} عملية</div>
                        </div>
                        <div class="mt-2 text-sm text-gray-600 flex justify-between">
                            <span>نسبة من العمليات</span>
                            <span class="font-semibold">${percent}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full mt-1">
                            <div class="task-bar bg-blue-500" style="width:${percent}%"></div>
                        </div>
                        <div class="mt-3 text-sm text-gray-600 flex justify-between">
                            <span>تأثير على التارجت</span>
                            <span class="font-semibold">${op.targetImpact}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full mt-1">
                            <div class="task-bar bg-green-500" style="width:${op.targetImpact}%"></div>
                        </div>
                    </div>
                `;
            }).join('');

            // Render manager tasks initial (empty)
            renderTasks(managerTasksEl, []);
            // Render today's assigned tasks
            renderManagerDailyTasks();

            // Render recent sales for today
            const managerRecentSalesEl = document.getElementById('manager-recent-sales');
            if (managerRecentSalesEl) {
                const sales = (localStorage.getItem('sales') ? JSON.parse(localStorage.getItem('sales')) : [])
                    .filter(s => s.date === new Date().toISOString().slice(0,10))
                    .slice(-10).reverse();
                managerRecentSalesEl.innerHTML = sales.map(s => `
                    <div class="p-3 border rounded-lg flex items-center justify-between">
                        <div><span class="font-semibold">${s.employeeName}</span> — ${s.systemName} <span class="text-emerald-700 font-bold">${s.amount.toLocaleString()} جنيه</span></div>
                        <div class="text-xs text-gray-500">${s.date}</div>
                    </div>
                `).join('') || '<div class="text-gray-500">لا يوجد نشاط اليوم</div>';
            }

            // Manager view: selected employee details (daily performance, ops breakdown, KPIs)
            function getEmployeeSales(empId) {
                let sales = (localStorage.getItem('sales') ? JSON.parse(localStorage.getItem('sales')) : []).filter(s => s.employeeId === empId);
                const now = new Date();
                const period = (mgrEmpPeriodEl && mgrEmpPeriodEl.value) || '7d';
                if (period !== 'all') {
                    const days = period === '30d' ? 30 : 7;
                    const from = new Date(now); from.setDate(now.getDate() - days + 1);
                    const fromKey = from.toISOString().slice(0,10);
                    sales = sales.filter(s => s.date >= fromKey);
                }
                const sys = (mgrEmpSystemEl && mgrEmpSystemEl.value) || 'all';
                if (sys !== 'all') sales = sales.filter(s => s.systemName === sys);
                return sales;
            }
            function renderManagerEmployeeView(empId) {
                if (!mgrEmpDailyPerformanceEl || !mgrEmpOpsBreakdownEl || !mgrEmpPerfCardsEl || !mgrEmpMonthlyTargetEl) return;
                // build last 7 days buckets
                const days = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
                const today = new Date();
                const buckets = [];
                for (let i=6;i>=0;i--) { const d = new Date(today); d.setDate(today.getDate()-i); buckets.push({ key: d.toISOString().slice(0,10), label: days[d.getDay()], ops:0, points:0 }); }
                const sales = getEmployeeSales(empId);
                sales.forEach(s=>{ const b = buckets.find(x=>x.key===s.date); if (b) { b.ops += s.operations; b.points += s.points; } });
                mgrEmpDailyPerformanceEl.innerHTML = buckets.map(b=>`
                    <div>
                        <div class="flex justify-between text-sm"><span>${b.label}</span><span class="text-gray-500">العمليات: ${b.ops}</span></div>
                        <div class="w-full bg-gray-200 rounded-full h-2"><div class="h-2 bg-blue-500 rounded-full" style="width:${Math.min(100,b.ops*5)}%"></div></div>
                        <div class="flex justify-between text-sm mt-1"><span class="text-gray-500">النقاط: ${b.points}</span></div>
                        <div class="w-full bg-gray-200 rounded-full h-2"><div class="h-2 bg-green-500 rounded-full" style="width:${Math.min(100,b.points)}%"></div></div>
                    </div>
                `).join('');
                // ops breakdown
                const bySystem = {};
                sales.forEach(s=>{ bySystem[s.systemName] = bySystem[s.systemName] || { ops:0, points:0 }; bySystem[s.systemName].ops += s.operations; bySystem[s.systemName].points += s.points; });
                const systems = Object.entries(bySystem);
                mgrEmpOpsBreakdownEl.innerHTML = systems.map(([name,agg])=>{
                    const percent = agg.ops / Math.max(1, systems.reduce((t,[_n,a])=>t+a.ops,0)) * 100;
                    const impact = agg.points / Math.max(1, systems.reduce((t,[_n,a])=>t+a.points,0)) * 100;
                    return `<div><div class="flex justify-between text-sm"><span>${name}</span><span>${agg.ops} عملية</span></div>
                        <div class="w-full bg-gray-200 rounded-full h-2 mt-1"><div class="h-2 bg-blue-500 rounded-full" style="width:${percent.toFixed(0)}%"></div></div>
                        <div class="flex justify-between text-sm mt-1"><span>تأثير على التارجت</span><span>${impact.toFixed(0)}%</span></div>
                        <div class="w-full bg-gray-200 rounded-full h-2"><div class="h-2 bg-green-500 rounded-full" style="width:${impact.toFixed(0)}%"></div></div></div>`;
                }).join('') || '<div class="text-gray-500">لا توجد عمليات</div>';
                // KPIs
                const totalOps = sales.reduce((s,a)=>s+a.operations,0);
                const totalPoints = sales.reduce((s,a)=>s+a.points,0);
                const avgDailyOps = (totalOps/Math.max(1,buckets.length)).toFixed(1);
                const avgWeeklyPoints = totalPoints; // أسبوع افتراضي
                const mostDay = buckets.reduce((p,c)=> c.points>p.points?c:p, buckets[0]);
                mgrEmpPerfCardsEl.innerHTML = `
                    <div class="card p-4 text-center bg-blue-50"><div class="text-2xl font-bold">${avgDailyOps}</div><div class="text-sm text-gray-600">متوسط العمليات اليومي</div></div>
                    <div class="card p-4 text-center bg-green-50"><div class="text-2xl font-bold">${avgWeeklyPoints}</div><div class="text-sm text-gray-600">متوسط النقاط الأسبوعي</div></div>
                    <div class="card p-4 text-center bg-purple-50"><div class="text-2xl font-bold">${mostDay.label}</div><div class="text-sm text-gray-600">أكثر يوم إنتاجية</div></div>
                `;
                // Monthly target details (from employeeTarget:emp)
                try {
                    const profile = JSON.parse(localStorage.getItem(`employeeTarget:${empId}`) || '{}');
                    const required = profile.requiredPoints || 0;
                    const current = profile.currentPoints || 0;
                    const remaining = Math.max(0, required - current);
                    const pct = required ? (current / required) * 100 : 0;
                    mgrEmpTargetDetailsEl.innerHTML = `
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div class="card p-4 text-center"><div class="text-lg font-bold text-blue-700">${required}</div><div class="text-sm text-gray-500">النقاط المطلوبة</div></div>
                            <div class="card p-4 text-center"><div class="text-lg font-bold text-green-700">${current}</div><div class="text-sm text-gray-500">النقاط الحالية</div></div>
                            <div class="card p-4 text-center"><div class="text-lg font-bold text-purple-700">${pct.toFixed(2)}%</div><div class="text-sm text-gray-500">نسبة الإنجاز</div></div>
                            <div class="card p-4 text-center"><div class="text-lg font-bold text-red-700">${remaining}</div><div class="text-sm text-gray-500">المتبقي</div></div>
                        </div>
                        <div class="mt-3 w-full bg-gray-200 rounded-full h-2"><div class="h-2 bg-green-500 rounded-full" style="width:${pct}%"></div></div>
                    `;
                } catch(e) { mgrEmpTargetDetailsEl.innerHTML = '<div class="text-gray-500">لا يوجد هدف شهري محدد</div>'; }
                // Recent sales list
                if (mgrEmpRecentSalesEl) {
                    const sales = (localStorage.getItem('sales') ? JSON.parse(localStorage.getItem('sales')) : []).filter(s => s.employeeId === empId).slice(-10).reverse();
                    mgrEmpRecentSalesEl.innerHTML = sales.map(s => `<div class="p-3 border rounded-lg flex items-center justify-between"><div>${s.systemName} — <span class=\"font-semibold\">${s.operations} عملية</span> (+${s.points} نقطة)</div><div class=\"text-xs text-gray-500\">${s.date}</div></div>`).join('') || '<div class="text-gray-500">لا توجد عمليات</div>';
                }
                // Attendance & checkout (from employeeTarget profile if left by employee actions)
                if (mgrEmpAttendanceEl) {
                    try {
                        const profile = JSON.parse(localStorage.getItem(`employeeTarget:${empId}`) || '{}');
                        const attendance = profile.attendanceStatus || '—';
                        const checkout = profile.checkoutStatus || '—';
                        mgrEmpAttendanceEl.innerHTML = `<div class=\"p-3 border rounded-lg\"><div>الحضور: ${attendance}</div><div class=\"mt-1\">الانصراف: ${checkout}</div></div>`;
                    } catch(e) { mgrEmpAttendanceEl.innerHTML = '<div class=\"text-gray-500\">لا توجد سجلات</div>'; }
                }
                // Loans for employee
                if (mgrEmpLoansEl) {
                    const loans = (localStorage.getItem('loanRequests') ? JSON.parse(localStorage.getItem('loanRequests')) : []).filter(l => l.employeeId === empId).slice(-10).reverse();
                    mgrEmpLoansEl.innerHTML = loans.map(l => `<div class=\"p-3 border rounded-lg flex items-center justify-between\"><div>طلب سلفة: <span class=\"font-semibold\">${l.amount} جنيه</span> — السبب: ${l.reason}</div><div class=\"text-xs ${l.status==='approved'?'text-green-700':l.status==='rejected'?'text-red-700':'text-gray-500'}\">${l.status}</div></div>`).join('') || '<div class=\"text-gray-500\">لا توجد طلبات</div>';
                }
            }
            if (managerEmployeeSelectEl) {
                managerEmployeeSelectEl.onchange = () => renderManagerEmployeeView(managerEmployeeSelectEl.value);
                renderManagerEmployeeView(managerEmployeeSelectEl.value || branch.employees[0].id);
            }
            if (mgrEmpPeriodEl) mgrEmpPeriodEl.onchange = () => renderManagerEmployeeView(managerEmployeeSelectEl.value);
            if (mgrEmpSystemEl) mgrEmpSystemEl.onchange = () => renderManagerEmployeeView(managerEmployeeSelectEl.value);
            if (mgrEmpSalesPdfBtn) {
                mgrEmpSalesPdfBtn.onclick = () => {
                    const empId = (managerEmployeeSelectEl && managerEmployeeSelectEl.value) || (branch.employees[0] && branch.employees[0].id);
                    const list = (localStorage.getItem('sales') ? JSON.parse(localStorage.getItem('sales')) : []).filter(s => s.employeeId === empId).slice(-10).reverse();
                    const rows = list.map((s,i) => `<tr><td>${i+1}</td><td>${s.systemName}</td><td>${s.operations}</td><td>${s.points}</td><td>${s.date}</td></tr>`).join('');
                    const w = window.open('', '_blank');
                    w.document.write(`<!DOCTYPE html><html lang=\"ar\" dir=\"rtl\"><head><meta charset=\"utf-8\"><title>عمليات الموظف</title><style>body{font-family:Cairo,sans-serif;padding:24px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;text-align:center}th{background:#f3f4f6}</style></head><body><h1>آخر العمليات المسجلة</h1><table><thead><tr><th>#</th><th>النظام</th><th>عدد العمليات</th><th>النقاط</th><th>التاريخ</th></tr></thead><tbody>${rows}</tbody></table></body></html>`);
                    w.document.close(); w.focus(); w.print();
                };
            }

            // Export filtered dataset
            function getCurrentFilteredSales() {
                const empId = (managerEmployeeSelectEl && managerEmployeeSelectEl.value) || '';
                return getEmployeeSales(empId);
            }
            if (mgrEmpExportCsvBtn) {
                mgrEmpExportCsvBtn.onclick = () => {
                    const list = getCurrentFilteredSales();
                    const header = ['النظام','عدد العمليات','النقاط','التاريخ'];
                    const rows = [header, ...list.map(s => [s.systemName, s.operations, s.points, s.date])];
                    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
                    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a'); a.href = url; a.download = 'employee-sales.csv'; a.click(); URL.revokeObjectURL(url);
                };
            }
            if (mgrEmpExportPdfBtn) {
                mgrEmpExportPdfBtn.onclick = () => {
                    const list = getCurrentFilteredSales();
                    const rows = list.map((s,i) => `<tr><td>${i+1}</td><td>${s.systemName}</td><td>${s.operations}</td><td>${s.points}</td><td>${s.date}</td></tr>`).join('');
                    const w = window.open('', '_blank');
                    w.document.write(`<!DOCTYPE html><html lang=\"ar\" dir=\"rtl\"><head><meta charset=\"utf-8\"><title>تقرير عمليات الموظف</title><style>body{font-family:Cairo,sans-serif;padding:24px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;text-align:center}th{background:#f3f4f6}</style></head><body><h1>تقرير عمليات الموظف (مُفلتر)</h1><table><thead><tr><th>#</th><th>النظام</th><th>عدد العمليات</th><th>النقاط</th><th>التاريخ</th></tr></thead><tbody>${rows}</tbody></table></body></html>`);
                    w.document.close(); w.focus(); w.print();
                };
            }

            // Daily targets persistence for employees
            function getDailyTargetsStore(){ const r=localStorage.getItem('dailyTargets'); return r?JSON.parse(r):[]; }
            function setDailyTargetsStore(list){ localStorage.setItem('dailyTargets', JSON.stringify(list)); }
            function renderManagerDailyTargets(){ if(!managerDailyTargetsListEl) return; const list=getDailyTargetsStore(); managerDailyTargetsListEl.innerHTML = list.slice(-10).reverse().map(t=>`<div class=\"p-3 border rounded-lg\"><span class=\"font-semibold\">${t.employeeName}</span> — تارجت اليوم: ${t.points} نقطة • ${t.date}</div>`).join('') || '<div class=\"text-gray-500\">لا توجد تارجتات محددة</div>'; }
            renderManagerDailyTargets();
            if (managerSetDailyTargetForm) {
                managerSetDailyTargetForm.addEventListener('submit', (e)=>{
                    e.preventDefault();
                    const empId = managerTargetEmployeeEl.value;
                    const points = Number(managerTargetPointsEl.value);
                    if (!empId || !points) return;
                    const emp = branch.employees.find(e=>e.id===empId);
                    const list = getDailyTargetsStore();
                    list.push({ id: Date.now(), employeeId: empId, employeeName: emp?emp.name:empId, points, date: new Date().toISOString().slice(0,10) });
                    setDailyTargetsStore(list);
                    managerSetDailyTargetForm.reset();
                    renderManagerDailyTargets();
                    
                    // مزامنة مع مدير المنطقة
                    syncWithAreaManager();
                });
            }

            // Monthly targets persistence
            function getMonthlyTargetsStore(){ const r=localStorage.getItem('monthlyTargets'); return r?JSON.parse(r):[]; }
            function setMonthlyTargetsStore(list){ localStorage.setItem('monthlyTargets', JSON.stringify(list)); }
            function renderManagerMonthlyTargets(){ if(!managerMonthlyTargetsListEl) return; const list=getMonthlyTargetsStore(); managerMonthlyTargetsListEl.innerHTML = list.slice(-10).reverse().map(t=>`<div class=\"p-3 border rounded-lg\"><span class=\"font-semibold\">${t.employeeName}</span> — نقاط مطلوبة: ${t.required} • حاليًا: ${t.current} • ${t.date}</div>`).join('') || '<div class=\"text-gray-500\">لا توجد أهداف شهرية محددة</div>'; }
            renderManagerMonthlyTargets();
            if (managerSetMonthlyTargetForm) {
                managerSetMonthlyTargetForm.addEventListener('submit', (e)=>{
                    e.preventDefault();
                    const empId = managerMonthlyTargetEmployeeEl.value;
                    const required = Number(managerMonthlyRequiredEl.value);
                    const current = Number(managerMonthlyCurrentEl.value || 0);
                    if (!empId || !required) return;
                    const emp = branch.employees.find(e=>e.id===empId);
                    // Save record of target change
                    const list = getMonthlyTargetsStore();
                    list.push({ id: Date.now(), employeeId: empId, employeeName: emp?emp.name:empId, required, current, date: new Date().toISOString().slice(0,10) });
                    setMonthlyTargetsStore(list);
                    renderManagerMonthlyTargets();
                    // Also persist to per-employee profile so أنه يسمع عند الموظف
                    const perEmpKey = `employeeTarget:${empId}`;
                    const profile = JSON.parse(localStorage.getItem(perEmpKey) || '{}');
                    profile.requiredPoints = required;
                    profile.currentPoints = current;
                    localStorage.setItem(perEmpKey, JSON.stringify(profile));
                    managerSetMonthlyTargetForm.reset();
                    
                    // مزامنة مع مدير المنطقة
                    syncWithAreaManager();
                });
            }

        }

        // Area Manager Dashboard Render Functions
        function renderAreaManagerDashboard() {
            // Use real data from branches and employees
            const branches = getBranches();
            const employees = getAllEmployees();
            const allOperations = getAllEmployeesOperations();
            
            // Calculate real regional data
            const region = {
                name: 'منطقة الفروع',
                subtitle: 'مدير المنطقة: ' + (currentUser ? currentUser.name : 'مدير المنطقة'),
                branches: branches.map(branch => {
                    const branchEmployees = employees.filter(emp => emp.branch === branch.name);
                    const branchOperations = allOperations.filter(op => {
                        const emp = employees.find(e => e.id === op.employeeId);
                        return emp && emp.branch === branch.name;
                    });
                    const branchPoints = branchOperations.reduce((sum, op) => sum + (op.points || 0), 0);
                    const completion = branchEmployees.length > 0 ? Math.round((branchPoints / branchEmployees.length) * 100) / 100 : 0;
                    
                    return {
                        id: branch.id,
                        name: branch.name,
                        address: branch.address,
                        manager: branch.manager,
                        phone: branch.phone,
                        employees: branchEmployees.length,
                        ops: branchOperations.length,
                        points: branchPoints,
                        completion: completion,
                        systems: calculateBranchSystems(branchOperations)
                    };
                })
            };

            // header
            if (areaRegionTitleEl) areaRegionTitleEl.textContent = region.name;
            if (areaRegionSubtitleEl) areaRegionSubtitleEl.textContent = region.subtitle;

            // KPIs
            const totalEmployees = region.branches.reduce((s,b)=>s+b.employees,0);
            const avgCompletion = region.branches.reduce((s,b)=>s+b.completion,0)/region.branches.length;
            const avgMargin = region.branches.reduce((s,b)=>s+b.margin,0)/region.branches.length;
            const totalRevenue = region.branches.reduce((s,b)=>s+b.revenue,0);
            if (areaKpiEmployeesEl) areaKpiEmployeesEl.textContent = totalEmployees;
            if (areaKpiBranchesEl) areaKpiBranchesEl.textContent = region.branches.length;
            if (areaKpiCompletionEl) areaKpiCompletionEl.textContent = `${avgCompletion.toFixed(1)}%`;
            if (areaKpiMarginEl) areaKpiMarginEl.textContent = `${avgMargin.toFixed(1)}%`;
            if (areaKpiRevenueEl) areaKpiRevenueEl.textContent = `${totalRevenue}ك`;

            // filters
            if (areaFilterBranchEl) {
                areaFilterBranchEl.innerHTML = '<option value="all">جميع الفروع</option>' + region.branches.map(b=>`<option value="${b.id}">${b.name}</option>`).join('');
            }

            // branches list render
            const renderBranches = (list) => {
                if (!areaBranchesListEl) return;
                areaBranchesListEl.innerHTML = list.map((b, idx)=>`
                    <div class="p-4 rounded-xl bg-white border border-gray-100">
                        <div class="flex items-center justify-between">
                            <div class="font-semibold text-gray-800">${b.name}</div>
                            <div class="text-xs text-gray-500">#${idx+1} • ${b.employees} موظف</div>
                        </div>
                        <div class="mt-3 grid grid-cols-2 md:grid-cols-6 gap-3 text-center">
                            <div>
                                <div class="text-2xl font-bold text-gray-900">${b.completion.toFixed(1)}%</div>
                                <div class="text-xs text-gray-500">نسبة الإنجاز</div>
                            </div>
                            <div>
                                <div class="text-2xl font-bold text-gray-900">${b.margin.toFixed(1)}%</div>
                                <div class="text-xs text-gray-500">هامش الربح</div>
                            </div>
                            <div>
                                <div class="text-lg font-bold text-red-600">ك${b.costs}</div>
                                <div class="text-xs text-gray-500">التكاليف</div>
                            </div>
                            <div>
                                <div class="text-lg font-bold text-green-600">ك${b.revenue}</div>
                                <div class="text-xs text-gray-500">الإيرادات</div>
                            </div>
                            <div>
                                <div class="text-sm font-semibold">${b.systems.dcl}</div>
                                <div class="text-xs text-gray-500">DCL</div>
                            </div>
                            <div>
                                <div class="text-sm font-semibold">${b.systems.orange}</div>
                                <div class="text-xs text-gray-500">أورنج كاش</div>
                            </div>
                        </div>
                    </div>
                `).join('');
            };
            renderBranches(region.branches);

            // alerts
            if (areaAlertsEl) {
                const alerts = [];
                if (avgCompletion < 80) alerts.push({ type:'danger', text:'انخفاض في أداء المنطقة تحت 80%'});
                const risk = region.branches.filter(b=>b.completion<75);
                if (risk.length) alerts.push({ type:'warning', text:`${risk.length} فرع يحتاج متابعة فورية`});
                alerts.push({ type:'info', text:'يوصى بزيادة الحوافز في الفروع الأعلى أداءً.'});
                areaAlertsEl.innerHTML = alerts.map(a=>{
                    const cls = a.type==='danger' ? 'bg-red-100 text-red-800' : a.type==='warning' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800';
                    return `<div class="${cls} p-3 rounded-lg">${a.text}</div>`;
                }).join('');
            }

            // systems impact
            if (areaSystemsEl) {
                const totals = region.branches.reduce((acc,b)=>{
                    acc.paytax += b.systems.paytax; acc.h4g += b.systems.h4g; acc.dcl += b.systems.dcl; acc.orange += b.systems.orange; return acc; }, {paytax:0,h4g:0,dcl:0,orange:0});
                const rows = [
                    {name:'بايتانس', val: totals.paytax, color:'bg-orange-400'},
                    {name:'H4G', val: totals.h4g, color:'bg-green-500'},
                    {name:'DCL', val: totals.dcl, color:'bg-blue-500'},
                    {name:'أورنج كاش', val: totals.orange, color:'bg-purple-500'},
                ];
                const sum = rows.reduce((s,r)=>s+r.val,0) || 1;
                areaSystemsEl.innerHTML = rows.map(r=>`
                    <div>
                        <div class="flex items-center justify-between text-sm"><span>${r.name}</span><span class="font-semibold">${r.val}</span></div>
                        <div class="w-full bg-gray-200 rounded-full h-2 mt-1"><div class="h-2 ${r.color} rounded-full" style="width:${Math.round((r.val/sum)*100)}%"></div></div>
                    </div>
                `).join('');
            }

            // simple filters
            const applyFilters = () => {
                let list = [...region.branches];
                if (areaFilterPerformanceEl && areaFilterPerformanceEl.value==='top') list = list.filter(b=>b.completion>=85);
                if (areaFilterPerformanceEl && areaFilterPerformanceEl.value==='risk') list = list.filter(b=>b.completion<75);
                if (areaFilterBranchEl && areaFilterBranchEl.value!=='all') list = list.filter(b=>b.id===areaFilterBranchEl.value);
                renderBranches(list);
            };
            if (areaFilterPerformanceEl) areaFilterPerformanceEl.onchange = applyFilters;
            if (areaFilterBranchEl) areaFilterBranchEl.onchange = applyFilters;
            if (areaFilterSystemEl) areaFilterSystemEl.onchange = applyFilters;
            if (areaFilterPeriodEl) areaFilterPeriodEl.onchange = applyFilters;

            // payroll analysis (mock aggregate)
            const payroll = {
                total: 2900, // ألف جنيه شهريًا
                fixed: 2100,
                variable: 436,
                bonus: 89,
                index: 30.3,
            };
            const ratio = payroll.fixed ? ((payroll.variable + payroll.bonus) / payroll.fixed) * 100 : 0;
            if (payrollTotalEl) payrollTotalEl.textContent = `ك${payroll.total}`;
            if (payrollFixedEl) payrollFixedEl.textContent = `ك${payroll.fixed}`;
            if (payrollVariableEl) payrollVariableEl.textContent = `ك${payroll.variable}`;
            if (payrollBonusEl) payrollBonusEl.textContent = `ك${payroll.bonus}`;
            if (payrollRatioEl) payrollRatioEl.textContent = `${ratio.toFixed(1)}%`;
            if (payrollIndexEl) payrollIndexEl.textContent = `${payroll.index}%`;
            if (payrollAlertsEl) payrollAlertsEl.innerHTML = `
                <div class="bg-red-100 text-red-800 p-3 rounded-lg">فروع بحاجة لمراجعة: الجيزة، حلوان (التكاليف > 80% من الإيرادات)</div>
                <div class="bg-amber-100 text-amber-800 p-3 rounded-lg">تراجع هامش الربح في فرع العبور</div>
            `;
            if (payrollRecosEl) payrollRecosEl.innerHTML = `
                <li>زيادة نسبة الرواتب المتغيرة لتحفيز الأداء</li>
                <li>ضبط هيكل التكاليف في الفروع عالية التكلفة</li>
                <li>ربط المكافآت بتحقيق الأهداف المحددة</li>
            `;

            // export
            if (areaExportExcelBtn) areaExportExcelBtn.onclick = () => {
                const header = ['الفرع','الموظفون','العمليات','الإنجاز%','الهامش%','التكاليف','الإيرادات'];
                const rows = [header, ...region.branches.map(b=>[b.name,b.employees,b.ops,`${b.completion}%`,`${b.margin}%`,b.costs,b.revenue])];
                exportToCSV('area-branches.csv', rows);
            };
            if (areaExportPdfBtn) areaExportPdfBtn.onclick = () => {
                const w = window.open('', '_blank');
                const trs = region.branches.map((b,i)=>`<tr><td>${i+1}</td><td>${b.name}</td><td>${b.employees}</td><td>${b.ops}</td><td>${b.completion}%</td><td>${b.margin}%</td><td>${b.costs}</td><td>${b.revenue}</td></tr>`).join('');
                w.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>Area PDF</title><style>body{font-family:Cairo,sans-serif;padding:24px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;text-align:center}th{background:#f3f4f6}</style></head><body><h1>${region.name}</h1><div>${region.subtitle}</div><table><thead><tr><th>#</th><th>الفرع</th><th>الموظفون</th><th>العمليات</th><th>الإنجاز</th><th>الهامش</th><th>التكاليف</th><th>الإيرادات</th></tr></thead><tbody>${trs}</tbody></table></body></html>`);
                w.document.close(); w.focus(); w.print();
            };

            // costs comparison section
            if (areaCostsCompareEl) {
                areaCostsCompareEl.innerHTML = region.branches.map(b=>{
                    const sum = (b.costs + b.revenue) || 1;
                    const costPct = Math.round((b.costs / Math.max(1,b.revenue)) * 100);
                    const costBar = Math.round((b.costs / sum) * 100);
                    const revBar = 100 - costBar;
                    return `
                        <div class="p-4 rounded-xl bg-white border border-gray-100">
                            <div class="flex items-center justify-between mb-2 text-sm">
                                <div class="font-semibold text-gray-800">${b.name}</div>
                                <div class="text-gray-500">نسبة الكلفة: <span class="font-bold ${costPct>80?'text-red-600':'text-gray-800'}">${costPct}%</span></div>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div class="h-3 bg-rose-500" style="width:${costBar}%"></div>
                                <div class="h-3 bg-emerald-500" style="width:${revBar}%"></div>
                            </div>
                            <div class="mt-2 flex items-center justify-between text-xs text-gray-600">
                                <div>التكاليف: <span class="font-semibold text-rose-600">ك${b.costs}</span></div>
                                <div>الإيرادات: <span class="font-semibold text-emerald-600">ك${b.revenue}</span></div>
                            </div>
                        </div>
                    `;
                }).join('');
            }
        }

        // Owner Dashboard Render Functions
        function renderOwnerDashboard() {
            // mock company data: list of regions each with branches aggregate
            const company = {
                regions: [
                    { id: 'R1', name: 'القاهرة الكبرى', branches: 8, employees: 96, completion: 86.3, revenue: 2900, systems: { orange: 3120, paytax: 2890, h4g: 2740, dcl: 2640 } },
                    { id: 'R2', name: 'الإسكندرية', branches: 5, employees: 62, completion: 82.1, revenue: 1880, systems: { orange: 1320, paytax: 1150, h4g: 980, dcl: 870 } },
                    { id: 'R3', name: 'الدلتا', branches: 6, employees: 74, completion: 79.5, revenue: 2030, systems: { orange: 1210, paytax: 1080, h4g: 920, dcl: 860 } },
                ],
            };

            if (ownerSubtitleEl) ownerSubtitleEl.textContent = 'رؤية شاملة لكل المناطق';
            if (ownerKpiRegionsEl) ownerKpiRegionsEl.textContent = company.regions.length;
            if (ownerKpiBranchesEl) ownerKpiBranchesEl.textContent = company.regions.reduce((s,r)=>s+r.branches,0);
            if (ownerKpiEmployeesEl) ownerKpiEmployeesEl.textContent = company.regions.reduce((s,r)=>s+r.employees,0);
            const avgC = company.regions.reduce((s,r)=>s+r.completion,0)/company.regions.length;
            if (ownerKpiCompletionEl) ownerKpiCompletionEl.textContent = `${avgC.toFixed(1)}%`;
            if (ownerKpiRevenueEl) ownerKpiRevenueEl.textContent = `ك${company.regions.reduce((s,r)=>s+r.revenue,0)}`;

            if (ownerFilterRegionEl) {
                ownerFilterRegionEl.innerHTML = '<option value="all">كل المناطق</option>' + company.regions.map(r=>`<option value="${r.id}">${r.name}</option>`).join('');
            }

            const renderRegions = (list) => {
                if (!ownerRegionsListEl) return;
                ownerRegionsListEl.innerHTML = list.map((r,i)=>`
                    <div class="p-4 rounded-xl bg-white border border-gray-100">
                        <div class="flex items-center justify-between">
                            <div class="font-semibold text-gray-800">${r.name}</div>
                            <div class="text-xs text-gray-500">#${i+1} • ${r.branches} فروع • ${r.employees} موظف</div>
                        </div>
                        <div class="mt-3 grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
                            <div><div class="text-2xl font-bold">${r.completion}%</div><div class="text-xs text-gray-500">الإنجاز</div></div>
                            <div><div class="text-lg font-bold text-green-600">ك${r.revenue}</div><div class="text-xs text-gray-500">الإيرادات</div></div>
                            <div><div class="text-sm font-semibold">${r.systems.orange}</div><div class="text-xs text-gray-500">أورنج كاش</div></div>
                            <div><div class="text-sm font-semibold">${r.systems.paytax}</div><div class="text-xs text-gray-500">بايتانس</div></div>
                            <div><div class="text-sm font-semibold">${r.systems.dcl}</div><div class="text-xs text-gray-500">DCL</div></div>
                        </div>
                    </div>
                `).join('');
            };
            renderRegions(company.regions);

            // leaderboards
            if (ownerTopRegionsEl) {
                const top = [...company.regions].sort((a,b)=>b.completion-a.completion).slice(0,3);
                ownerTopRegionsEl.innerHTML = top.map((r,i)=>`<div class="p-3 border rounded-lg flex items-center justify-between"><div>${i+1}. ${r.name}</div><div class="font-semibold text-green-600">${r.completion}%</div></div>`).join('');
            }
            if (ownerRiskRegionsEl) {
                const risk = [...company.regions].sort((a,b)=>a.completion-b.completion).slice(0,3);
                ownerRiskRegionsEl.innerHTML = risk.map((r,i)=>`<div class="p-3 border rounded-lg flex items-center justify-between"><div>${i+1}. ${r.name}</div><div class="font-semibold text-red-600">${r.completion}%</div></div>`).join('');
            }

            // costs compare between regions (using revenue as proxy; mock costs ~ 70% of revenue with variance)
            if (ownerCostsCompareEl) {
                ownerCostsCompareEl.innerHTML = company.regions.map(r=>{
                    const costs = Math.round(r.revenue * (0.6 + Math.random()*0.2));
                    const sum = costs + r.revenue;
                    const costBar = Math.round((costs/sum)*100);
                    const revBar = 100-costBar;
                    const costPct = Math.round((costs / Math.max(1,r.revenue))*100);
                    return `<div class=\"p-4 rounded-xl bg-white border border-gray-100\">
                        <div class=\"flex items-center justify-between mb-2 text-sm\"><div class=\"font-semibold\">${r.name}</div><div class=\"text-gray-500\">نسبة الكلفة: <span class=\"font-bold ${costPct>80?'text-red-600':'text-gray-800'}\">${costPct}%</span></div></div>
                        <div class=\"w-full bg-gray-200 rounded-full h-3 overflow-hidden\"><div class=\"h-3 bg-rose-500\" style=\"width:${costBar}%\"></div><div class=\"h-3 bg-emerald-500\" style=\"width:${revBar}%\"></div></div>
                        <div class=\"mt-2 flex items-center justify-between text-xs text-gray-600\"><div>التكاليف: <span class=\"font-semibold text-rose-600\">ك${costs}</span></div><div>الإيرادات: <span class=\"font-semibold text-emerald-600\">ك${r.revenue}</span></div></div>
                    </div>`;
                }).join('');
            }

            // announcements
            function getAnnouncements(){ const r=localStorage.getItem('companyAnnouncements'); return r?JSON.parse(r):[]; }
            function setAnnouncements(list){ localStorage.setItem('companyAnnouncements', JSON.stringify(list)); }
            function renderAnnouncements(){ if(!companyAnnListEl) return; const list=getAnnouncements(); companyAnnListEl.innerHTML=list.map(a=>`<div class=\"p-3 bg-indigo-50 rounded-lg flex items-center justify-between\"><div>${a.text}</div><span class=\"text-xs text-gray-500\">${a.date}</span></div>`).join('') || '<div class=\"text-gray-500\">لا توجد إعلانات</div>'; }
            renderAnnouncements();
            if (companyAnnForm) companyAnnForm.addEventListener('submit',(e)=>{ e.preventDefault(); const text=companyAnnTextEl.value.trim(); if(!text) return; const list=getAnnouncements(); list.unshift({ text, date: new Date().toLocaleDateString('ar-EG') }); setAnnouncements(list); companyAnnForm.reset(); renderAnnouncements(); });

            if (ownerAlertsEl) {
                const alerts = [];
                if (avgC < 80) alerts.push({ cls:'bg-red-100 text-red-800', text:'متوسط الإنجاز للشركة أقل من 80%'});
                alerts.push({ cls:'bg-blue-100 text-blue-800', text:'فرص لزيادة الإيرادات عبر تعزيز H4G'});
                ownerAlertsEl.innerHTML = alerts.map(a=>`<div class="${a.cls} p-3 rounded-lg">${a.text}</div>`).join('');
            }
            if (ownerSystemsEl) {
                const total = company.regions.reduce((acc,r)=>{acc.orange+=r.systems.orange;acc.paytax+=r.systems.paytax;acc.h4g+=r.systems.h4g;acc.dcl+=r.systems.dcl;return acc;},{orange:0,paytax:0,h4g:0,dcl:0});
                const rows = [
                    {name:'أورنج كاش', val: total.orange, color:'bg-purple-500'},
                    {name:'بايتانس', val: total.paytax, color:'bg-orange-400'},
                    {name:'H4G', val: total.h4g, color:'bg-green-500'},
                    {name:'DCL', val: total.dcl, color:'bg-blue-500'},
                ];
                const sum = rows.reduce((s,r)=>s+r.val,0)||1;
                ownerSystemsEl.innerHTML = rows.map(r=>`<div><div class="flex items-center justify-between text-sm"><span>${r.name}</span><span class="font-semibold">${r.val}</span></div><div class="w-full bg-gray-200 rounded-full h-2 mt-1"><div class="h-2 ${r.color} rounded-full" style="width:${Math.round((r.val/sum)*100)}%"></div></div></div>`).join('');
            }

            if (ownerExportExcelBtn) ownerExportExcelBtn.onclick = () => {
                const header = ['المنطقة','الفروع','الموظفون','الإنجاز%','الإيرادات'];
                const rows = [header, ...company.regions.map(r=>[r.name,r.branches,r.employees,`${r.completion}%`,r.revenue])];
                exportToCSV('company-regions.csv', rows);
            };
            if (ownerExportPdfBtn) ownerExportPdfBtn.onclick = () => {
                const w = window.open('', '_blank');
                const trs = company.regions.map((r,i)=>`<tr><td>${i+1}</td><td>${r.name}</td><td>${r.branches}</td><td>${r.employees}</td><td>${r.completion}%</td><td>${r.revenue}</td></tr>`).join('');
                w.document.write(`<!DOCTYPE html><html lang=\"ar\" dir=\"rtl\"><head><meta charset=\"utf-8\"><title>Company PDF</title><style>body{font-family:Cairo,sans-serif;padding:24px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;text-align:center}th{background:#f3f4f6}</style></head><body><h1>تقرير الشركة</h1><table><thead><tr><th>#</th><th>المنطقة</th><th>الفروع</th><th>الموظفون</th><th>الإنجاز</th><th>الإيرادات</th></tr></thead><tbody>${trs}</tbody></table></body></html>`);
                w.document.close(); w.focus(); w.print();
            };
        }

        // Header actions on manager page
        function wireManagerHeaderActions() {
            const settingsBtn = document.getElementById('manager-settings-btn');
            const notificationsBtn = document.getElementById('manager-notifications-btn');
            const optionsBtn = document.getElementById('manager-options-btn');
            const optionsMenu = document.getElementById('manager-options-menu');
            const badge = document.getElementById('manager-notifications-badge');
            if (settingsBtn) settingsBtn.onclick = () => settingsModal.classList.remove('hidden');
            if (notificationsBtn) notificationsBtn.onclick = () => notificationsModal.classList.remove('hidden');
            if (optionsBtn && optionsMenu) {
                optionsBtn.onclick = () => optionsMenu.classList.toggle('hidden');
                document.addEventListener('click', (e) => {
                    if (!optionsMenu.contains(e.target) && e.target !== optionsBtn) optionsMenu.classList.add('hidden');
                });
            }
            if (badge) { badge.textContent = '2'; badge.classList.remove('hidden'); }
        }

        // Generic tasks rendering
        function renderTasks(container, tasks) {
            const items = tasks.map((t, i) => `
                <div class="p-4 rounded-xl bg-white border border-gray-100 flex items-center justify-between">
                    <div class="flex items-center space-x-3 space-x-reverse">
                        <input type="checkbox" data-idx="${i}" class="task-toggle h-5 w-5 rounded" ${t.done ? 'checked' : ''}>
                        <div class="${t.done ? 'line-through text-gray-400' : 'text-gray-800'}">${t.title}</div>
                    </div>
                    <button data-idx="${i}" class="task-delete text-red-500 hover:text-red-600"><i class="fas fa-trash"></i></button>
                </div>`).join('');
            container.innerHTML = items || '<div class="text-gray-500">لا توجد مهام بعد</div>';
        }

        const employeeTasks = [];
        const managerTasks = [];
        function promptNewTask() {
            const title = prompt('أدخل عنوان المهمة');
            return title && title.trim() ? { title: title.trim(), done: false } : null;
        }
        function attachTaskHandlers(container, list) {
            container.addEventListener('click', (e) => {
                if (e.target.closest('.task-delete')) {
                    const idx = Number(e.target.closest('.task-delete').dataset.idx);
                    list.splice(idx, 1);
                    renderTasks(container, list);
                }
            });
            container.addEventListener('change', (e) => {
                if (e.target.classList.contains('task-toggle')) {
                    const idx = Number(e.target.dataset.idx);
                    list[idx].done = !!e.target.checked;
                    renderTasks(container, list);
                }
            });
        }
        if (employeeTasksEl) {
            renderTasks(employeeTasksEl, employeeTasks);
            attachTaskHandlers(employeeTasksEl, employeeTasks);
        }
        if (managerTasksEl) {
            renderTasks(managerTasksEl, managerTasks);
            attachTaskHandlers(managerTasksEl, managerTasks);
        }
        if (employeeAddTaskBtn) employeeAddTaskBtn.onclick = () => { const t = promptNewTask(); if (t) { employeeTasks.push(t); renderTasks(employeeTasksEl, employeeTasks); } };
        if (managerAddTaskBtn) managerAddTaskBtn.onclick = () => { const t = promptNewTask(); if (t) { managerTasks.push(t); renderTasks(managerTasksEl, managerTasks); } };
        // Daily tasks persistence helpers
        function getDailyTasksStore() {
            const raw = localStorage.getItem('dailyTasks');
            return raw ? JSON.parse(raw) : [];
        }
        function setDailyTasksStore(list) {
            localStorage.setItem('dailyTasks', JSON.stringify(list));
        }
        function todayStr(d) {
            const dt = d ? new Date(d) : new Date();
            return dt.toISOString().slice(0,10);
        }
        function renderManagerDailyTasks() {
            if (!managerDailyTasksListEl) return;
            const store = getDailyTasksStore().filter(t => t.date === todayStr());
            managerDailyTasksListEl.innerHTML = store.map((t, i) => `
                <div class="p-3 border rounded-lg flex items-center justify-between">
                    <div>
                        <div class="font-semibold text-gray-800">${t.title}</div>
                        <div class="text-xs text-gray-500">${t.assigneeName || 'كل الموظفين'} • ${t.date}</div>
                        ${t.desc ? `<div class="text-sm text-gray-600 mt-1">${t.desc}</div>` : ''}
                    </div>
                    <button class="text-red-500 hover:text-red-600" data-idx="${i}" data-action="deleteDaily"><i class="fas fa-trash"></i></button>
                </div>
            `).join('') || '<div class="text-gray-500">لا توجد مهام لليوم</div>';
        }
        if (managerDailyTasksListEl) {
            managerDailyTasksListEl.addEventListener('click', (e) => {
                const btn = e.target.closest('[data-action="deleteDaily"]');
                if (!btn) return;
                const idx = Number(btn.dataset.idx);
                const all = getDailyTasksStore();
                // find the idx within today's view
                const todayList = all.filter(t => t.date === todayStr());
                const target = todayList[idx];
                const absolute = all.findIndex(t => t.id === target.id);
                if (absolute >= 0) { all.splice(absolute, 1); setDailyTasksStore(all); renderManagerDailyTasks(); }
            });
        }
        if (managerDailyTaskForm) {
            if (dailyTaskDateEl) dailyTaskDateEl.value = todayStr();
            managerDailyTaskForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const title = dailyTaskTitleEl.value.trim();
                if (!title) return;
                const date = dailyTaskDateEl.value || todayStr();
                const assignee = dailyTaskAssigneeEl.value;
                const store = getDailyTasksStore();
                if (assignee === 'all') {
                    store.push({ id: Date.now(), title, desc: dailyTaskDescEl.value.trim(), assignee: 'all', assigneeName: 'كل الموظفين', date, doneBy: [] });
                } else {
                    const name = dailyTaskAssigneeEl.options[dailyTaskAssigneeEl.selectedIndex].textContent;
                    store.push({ id: Date.now(), title, desc: dailyTaskDescEl.value.trim(), assignee, assigneeName: name, date, doneBy: [] });
                }
                setDailyTasksStore(store);
                managerDailyTaskForm.reset();
                if (dailyTaskDateEl) dailyTaskDateEl.value = todayStr();
                renderManagerDailyTasks();
                headerNotificationsBadge.textContent = '1';
                headerNotificationsBadge.classList.remove('hidden');
            });
        }

        // Seed notifications content
        if (notificationsListEl) {
            const seed = [
                { type: 'warning', text: 'موظف متأخر في الإنجاز يحتاج متابعة.' },
                { type: 'success', text: 'تحقيق هدف شهري بنسبة 92.4%.' },
            ];
            notificationsListEl.innerHTML = seed.map(n => {
                const bg = n.type === 'warning' ? 'bg-yellow-100 text-yellow-800' : n.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
                const icon = n.type === 'warning' ? 'fa-triangle-exclamation text-yellow-600' : n.type === 'success' ? 'fa-check-circle text-green-600' : 'fa-info-circle text-blue-600';
                return `<div class="${bg} p-4 rounded-lg flex items-start">
                            <i class="fas ${icon} ml-3 mt-0.5"></i>
                            <div>
                                <div class="font-semibold mb-1">${n.type === 'warning' ? 'تنبيه' : n.type === 'success' ? 'نجاح' : 'معلومة'}</div>
                                <div class="text-sm">${n.text}</div>
                                <button class="text-xs text-blue-600 mt-1">عرض</button>
                            </div>
                        </div>`;
            }).join('');
            if (notificationsCountEl) notificationsCountEl.textContent = String(seed.length);
        }

        // Sync header badge with modal clear/mark read
        if (notificationsClear) notificationsClear.addEventListener('click', () => {
            notificationsListEl.innerHTML = '';
            if (notificationsCountEl) notificationsCountEl.textContent = '0';
            headerNotificationsBadge.classList.add('hidden');
        });
        const markReadBtn = document.getElementById('notifications-mark-read');
        if (markReadBtn) markReadBtn.addEventListener('click', () => {
            headerNotificationsBadge.classList.add('hidden');
        });

        // Export helpers
        function exportToCSV(filename, rows) {
            const process = (row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',');
            const csv = [rows[0].map(h => h), ...rows.slice(1)].map(process).join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
        function exportBranchToCSV() {
            const b = window.__lastBranchData;
            if (!b) return;
            const header = ['الموظف','العمليات','نسبة الإنجاز','بايتانس','H4G','DCL','أخرى'];
            const rows = [header, ...b.employees.map(e => [e.name, e.ops, `${e.completion}%`, e.systems.paytax, e.systems.h4g, e.systems.dcl, e.systems.other])];
            exportToCSV('branch-report.csv', rows);
        }
        function exportBranchToPDF() {
            const b = window.__lastBranchData;
            if (!b) return;
            const w = window.open('', '_blank');
            const tableRows = b.employees.map((e, i) => `<tr><td>${i+1}</td><td>${e.name}</td><td>${e.ops}</td><td>${e.completion}%</td><td>${e.systems.paytax}</td><td>${e.systems.h4g}</td><td>${e.systems.dcl}</td><td>${e.systems.other}</td></tr>`).join('');
            w.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>Branch PDF</title>
            <style>body{font-family: Cairo, sans-serif;padding:24px}h1{margin:0 0 12px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;text-align:center}th{background:#f3f4f6}</style></head><body>
            <h1>تقرير الفرع - ${b.name}</h1>
            <div>التارجت الشهري: ${b.target.toLocaleString()} | عدد الموظفين: ${b.employees.length}</div>
            <table><thead><tr><th>#</th><th>الموظف</th><th>العمليات</th><th>الإنجاز</th><th>بايتانس</th><th>H4G</th><th>DCL</th><th>أخرى</th></tr></thead><tbody>${tableRows}</tbody></table>
            </body></html>`);
            w.document.close();
            w.focus();
            w.print();
        }
        if (exportExcelBtn) exportExcelBtn.addEventListener('click', exportBranchToCSV);
        if (exportPdfBtn) exportPdfBtn.addEventListener('click', exportBranchToPDF);

        // Export Settings (CSV/PDF)
        function getSavedSettings() {
            const raw = localStorage.getItem('branchSettings');
            const s = raw ? JSON.parse(raw) : { target: 5000, orange: 25, paytax: 22, h4g: 20, dcl: 18, other: 15, alerts: { low: true, high: true, daily: true } };
            return s;
        }
        function exportSettingsCSV() {
            const s = getSavedSettings();
            const rows = [
                ['الحقل','القيمة'],
                ['التارجت الشهري', s.target],
                ['أورنج كاش %', s.orange],
                ['بايتانس %', s.paytax],
                ['H4G %', s.h4g],
                ['DCL %', s.dcl],
                ['ديقنس %', s.other],
                ['تنبيه انخفاض', s.alerts.low ? 'نعم' : 'لا'],
                ['تنبيه أداء عالي', s.alerts.high ? 'نعم' : 'لا'],
                ['ملخص يومي', s.alerts.daily ? 'نعم' : 'لا'],
            ];
            exportToCSV('branch-settings.csv', rows);
        }
        function exportSettingsPDF() {
            const s = getSavedSettings();
            const w = window.open('', '_blank');
            w.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>Settings PDF</title>
            <style>body{font-family:Cairo,sans-serif;padding:24px}h1{margin:0 0 12px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;text-align:center}th{background:#f3f4f6}</style></head><body>
            <h1>إعدادات الفرع</h1>
            <table><tbody>
            <tr><th>الحقل</th><th>القيمة</th></tr>
            <tr><td>التارجت الشهري</td><td>${s.target}</td></tr>
            <tr><td>أورنج كاش %</td><td>${s.orange}</td></tr>
            <tr><td>بايتانس %</td><td>${s.paytax}</td></tr>
            <tr><td>H4G %</td><td>${s.h4g}</td></tr>
            <tr><td>DCL %</td><td>${s.dcl}</td></tr>
            <tr><td>ديقنس %</td><td>${s.other}</td></tr>
            <tr><td>تنبيه انخفاض</td><td>${s.alerts.low ? 'نعم' : 'لا'}</td></tr>
            <tr><td>تنبيه أداء عالي</td><td>${s.alerts.high ? 'نعم' : 'لا'}</td></tr>
            <tr><td>ملخص يومي</td><td>${s.alerts.daily ? 'نعم' : 'لا'}</td></tr>
            </tbody></table>
            </body></html>`);
            w.document.close();
            w.focus();
            w.print();
        }
        if (exportSettingsExcelBtn) exportSettingsExcelBtn.addEventListener('click', exportSettingsCSV);
        if (exportSettingsPdfBtn) exportSettingsPdfBtn.addEventListener('click', exportSettingsPDF);

        // Tasks panel logic (shared list)
        const globalTasks = [];
        function renderTaskPanel() {
            taskPanelListEl.innerHTML = globalTasks.map((t, i) => `
                <div class="p-3 border rounded-lg flex items-center justify-between">
                    <div class="flex items-center space-x-2 space-x-reverse">
                        <input type="checkbox" data-idx="${i}" ${t.done ? 'checked' : ''} class="task-toggle h-4 w-4">
                        <div class="${t.done ? 'line-through text-gray-400' : ''}">${t.title}</div>
                    </div>
                    <button data-idx="${i}" class="task-delete text-red-500"><i class="fas fa-trash"></i></button>
                </div>
            `).join('') || '<div class="text-gray-500">لا توجد مهام</div>';
        }
        if (taskPanelForm) {
            taskPanelForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const title = taskTitleInput.value.trim();
                if (!title) return;
                globalTasks.push({ title, done: false });
                taskTitleInput.value = '';
                renderTaskPanel();
            });
        }
        if (taskPanelListEl) {
            taskPanelListEl.addEventListener('click', (e) => {
                if (e.target.closest('.task-delete')) {
                    const idx = Number(e.target.closest('.task-delete').dataset.idx);
                    globalTasks.splice(idx, 1);
                    renderTaskPanel();
                }
            });
            taskPanelListEl.addEventListener('change', (e) => {
                if (e.target.classList.contains('task-toggle')) {
                    const idx = Number(e.target.dataset.idx);
                    globalTasks[idx].done = !!e.target.checked;
                    renderTaskPanel();
                }
            });
        }

        // Employee Profile Management Functions
        function initializeEmployeeProfile() {
            const profileForm = document.getElementById('employee-profile-form');
            const clearProfileBtn = document.getElementById('clear-profile-btn');

            if (!profileForm || !clearProfileBtn) return;

            // Handle form submission
            profileForm.addEventListener('submit', function(e) {
                e.preventDefault();
                saveEmployeeProfile();
            });

            // Handle clear profile button
            clearProfileBtn.addEventListener('click', function() {
                if (confirm('هل أنت متأكد من مسح جميع البيانات الشخصية؟')) {
                    clearEmployeeProfile();
                }
            });
        }

        function saveEmployeeProfile() {
            if (!currentUser) return;
            
            const profileData = {
                name: document.getElementById('profile-name').value,
                id: document.getElementById('profile-id').value,
                department: document.getElementById('profile-department').value,
                branch: document.getElementById('profile-branch').value,
                baseSalary: parseInt(document.getElementById('profile-salary').value),
                targetValue: parseInt(document.getElementById('profile-target').value)
            };

            // Update employee data in the system
            updateEmployee(currentUser.id, profileData);
            
            // Update current user
            currentUser = { ...currentUser, ...profileData };

            // Show success message
            const profileStatus = document.getElementById('profile-status');
            if (profileStatus) {
                profileStatus.classList.remove('hidden');
                profileStatus.classList.add('bg-green-100', 'text-green-700');
                profileStatus.textContent = 'تم حفظ البيانات بنجاح!';

                // Hide message after 3 seconds
                setTimeout(() => {
                    profileStatus.classList.add('hidden');
                }, 3000);
            }

            // Update dashboard with new data
            updateEmployeeDataFromProfile(profileData);
        }

        function loadEmployeeProfile() {
            if (!currentUser) return;
            
            // Load profile from employee data
            const profileData = currentUser;
            
            // Update form fields if they exist
            const nameField = document.getElementById('profile-name');
            if (nameField) {
                nameField.value = profileData.name || '';
                document.getElementById('profile-id').value = profileData.id || '';
                document.getElementById('profile-department').value = profileData.department || '';
                document.getElementById('profile-branch').value = profileData.branch || '';
                document.getElementById('profile-salary').value = profileData.baseSalary || '';
                document.getElementById('profile-target').value = profileData.targetValue || '';
            }

            // Update dashboard with saved data
            updateEmployeeDataFromProfile(profileData);
        }

        function clearEmployeeProfile() {
            // Clear form
            const profileForm = document.getElementById('employee-profile-form');
            if (profileForm) {
                profileForm.reset();
            }

            // Clear localStorage
            localStorage.removeItem('employeeProfile');

            // Reset to default data
            resetToDefaultEmployeeData();

            // Show success message
            const profileStatus = document.getElementById('profile-status');
            if (profileStatus) {
                profileStatus.classList.remove('hidden');
                profileStatus.classList.add('bg-red-100', 'text-red-700');
                profileStatus.textContent = 'تم مسح البيانات بنجاح!';

                // Hide message after 3 seconds
                setTimeout(() => {
                    profileStatus.classList.add('hidden');
                }, 3000);
            }
        }

        function updateEmployeeDataFromProfile(profileData) {
            // Update current user data
            if (currentUser && currentUser.role === 'employee') {
                currentUser.name = profileData.name;
                currentUser.id = profileData.id;
                currentUser.department = profileData.department;
                currentUser.branch = profileData.branch;
                currentUser.baseSalary = profileData.baseSalary;
                currentUser.targetValue = profileData.targetValue;

                // Recalculate required points based on target value
                currentUser.requiredPoints = Math.round(profileData.targetValue * 0.8);

                // Update welcome message
                const welcomeMessage = document.getElementById('welcome-message');
                if (welcomeMessage) {
                    welcomeMessage.textContent = `مرحباً، ${profileData.name}`;
                }

                // Re-render dashboard
                renderEmployeeDashboard(currentUser);
            }
        }

        function resetToDefaultEmployeeData() {
            // Reset to default dummy data
            if (currentUser && currentUser.role === 'employee') {
                const defaultData = {
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
                        points: 45,
                        targetImpact: 30
                    }, {
                        name: 'بايتاكس',
                        operations: 38,
                        points: 38,
                        targetImpact: 65
                    }, {
                        name: 'DCL',
                        operations: 32,
                        points: 32,
                        targetImpact: 45
                    }, {
                        name: 'H4G',
                        operations: 25,
                        points: 25,
                        targetImpact: 35
                    }, {
                        name: 'ديقنس',
                        operations: 12,
                        points: 12,
                        targetImpact: 8
                    }]
                };

                currentUser.data = defaultData;
                
                // Update welcome message
                const welcomeMessage = document.getElementById('welcome-message');
                if (welcomeMessage) {
                    welcomeMessage.textContent = `مرحباً، ${defaultData.name}`;
                }
                
                renderEmployeeDashboard(currentUser.data);
            }
        }

        // Daily Operations Management System
        function initializeDailyOperations() {
            const recordSaleForm = document.getElementById('record-sale-form');
            const clearSaleFormBtn = document.getElementById('clear-sale-form');
            const salesFilterPeriod = document.getElementById('sales-filter-period');

            // Set today's date as default
            const today = new Date().toISOString().split('T')[0];
            const saleDateInput = document.getElementById('sale-date');
            if (saleDateInput) {
                saleDateInput.value = today;
            }

            // Handle form submission
            if (recordSaleForm) {
                recordSaleForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    recordDailyOperation();
                });
            }

            // Handle clear form button
            if (clearSaleFormBtn) {
                clearSaleFormBtn.addEventListener('click', function() {
                    clearSaleForm();
                });
            }

            // Handle sales filter
            if (salesFilterPeriod) {
                salesFilterPeriod.addEventListener('change', function() {
                    renderRecentSalesTable();
                });
            }

            // Load and render initial data
            renderRecentSalesTable();
            updateDailyOperationsStats();
        }

        function recordDailyOperation() {
            const system = document.getElementById('sale-system').value;
            const operations = parseInt(document.getElementById('sale-ops').value);
            const date = document.getElementById('sale-date').value;
            const time = document.getElementById('sale-time').value || new Date().toLocaleTimeString('ar-EG', {hour: '2-digit', minute: '2-digit'});
            const notes = document.getElementById('sale-notes').value;

            if (!system || !operations || !date) {
                showSaleStatus('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }

            // Calculate points based on system
            const pointsPerOperation = getPointsPerOperation(system);
            const totalPoints = operations * pointsPerOperation;

            // Get current user info
            const employeeId = currentUser?.id || 'EMP001';
            const employeeName = currentUser?.name || 'موظف';

            const operation = {
                id: Date.now(),
                employeeId: employeeId,
                employeeName: employeeName,
                system: system,
                operations: operations,
                points: totalPoints,
                date: date,
                time: time,
                notes: notes,
                timestamp: new Date().toISOString()
            };

            // Save to localStorage
            saveOperationToStorage(operation);

            // Update all related displays
            updateAllDisplays();

            // Show success message
            showSaleStatus(`تم تسجيل ${operations} عملية في ${system} بنجاح! (${totalPoints} نقطة)`, 'success');

            // Clear form
            clearSaleForm();
        }

        function getPointsPerOperation(system) {
            const pointsMap = {
                'أورنج كاش': 3,
                'بايتاكس': 3,
                'DCL': 3,
                'H4G': 3,
                'ديقنس': 3
            };
            return pointsMap[system] || 3;
        }

        function saveOperationToStorage(operation) {
            // Save operation to employee-specific storage
            const employeeId = operation.employeeId;
            const employeeOperations = getEmployeeOperations(employeeId);
            employeeOperations.unshift(operation); // Add to beginning
            
            // Save to employee-specific key
            localStorage.setItem(`employeeOperations_${employeeId}`, JSON.stringify(employeeOperations));
            
            // Also maintain a global list for managers
            const allOperations = getStoredOperations();
            allOperations.unshift(operation);
            localStorage.setItem('dailyOperations', JSON.stringify(allOperations));
            
            // تحديث الإحصائيات تلقائياً بعد حفظ العملية
            updatePerformanceReport();
            updateDailyOperationsStats();
        }

        function getStoredOperations() {
            try {
                return JSON.parse(localStorage.getItem('dailyOperations') || '[]');
            } catch (e) {
                return [];
            }
        }

        function getEmployeeOperations(employeeId) {
            try {
                const operations = JSON.parse(localStorage.getItem(`employeeOperations_${employeeId}`) || '[]');
                if (!Array.isArray(operations)) {
                    return [];
                }
                
                // Clean and validate each operation
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
            } catch (e) {
                return [];
            }
        }

        function getAllEmployeesOperations() {
            const employees = getAllEmployees();
            const allOperations = [];
            
            employees.forEach(employee => {
                if (employee && employee.id) {
                    const employeeOps = getEmployeeOperations(employee.id);
                    if (Array.isArray(employeeOps)) {
                        // Clean and validate each operation
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

        function clearSaleForm() {
            const form = document.getElementById('record-sale-form');
            if (form) {
                form.reset();
                // Set today's date as default
                const today = new Date().toISOString().split('T')[0];
                document.getElementById('sale-date').value = today;
            }
        }

        function showSaleStatus(message, type) {
            const statusEl = document.getElementById('sale-status');
            if (statusEl) {
                statusEl.classList.remove('hidden');
                statusEl.className = `mt-4 p-4 rounded-lg ${type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`;
                statusEl.textContent = message;

                setTimeout(() => {
                    statusEl.classList.add('hidden');
                }, 5000);
            }
        }

        function renderRecentSalesTable() {
            const tableBody = document.getElementById('employee-recent-sales-table');
            const emptyState = document.getElementById('employee-recent-sales-empty');
            const filterPeriod = document.getElementById('sales-filter-period')?.value || 'today';

            if (!tableBody) return;

            // Get operations for current employee only
            const operations = currentUser ? getEmployeeOperations(currentUser.id) : [];
            let filteredOperations = operations;

            // Filter by period
            if (filterPeriod !== 'all') {
                const now = new Date();
                filteredOperations = operations.filter(op => {
                    const opDate = new Date(op.date);
                    switch (filterPeriod) {
                        case 'today':
                            return opDate.toDateString() === now.toDateString();
                        case 'week':
                            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                            return opDate >= weekAgo;
                        case 'month':
                            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                            return opDate >= monthAgo;
                        default:
                            return true;
                    }
                });
            }

            if (filteredOperations.length === 0) {
                tableBody.innerHTML = '';
                if (emptyState) emptyState.classList.remove('hidden');
                return;
            }

            if (emptyState) emptyState.classList.add('hidden');

            tableBody.innerHTML = filteredOperations.slice(0, 50).map(op => `
                <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3">${formatDate(op.date)}</td>
                    <td class="px-4 py-3">${op.time}</td>
                    <td class="px-4 py-3">
                        <span class="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">${op.system}</span>
                    </td>
                    <td class="px-4 py-3 font-semibold">${op.operations}</td>
                    <td class="px-4 py-3 font-semibold text-green-600">${op.points}</td>
                    <td class="px-4 py-3 text-gray-600">${op.notes || '-'}</td>
                    <td class="px-4 py-3">
                        <button onclick="deleteOperation(${op.id})" class="text-red-600 hover:text-red-800 text-sm">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
        }

        function deleteOperation(operationId) {
            if (confirm('هل أنت متأكد من حذف هذه العملية؟')) {
                const operations = getStoredOperations();
                const filteredOperations = operations.filter(op => op.id !== operationId);
                localStorage.setItem('dailyOperations', JSON.stringify(filteredOperations));
                updateAllDisplays();
            }
        }

        function updateAllDisplays() {
            renderRecentSalesTable();
            updateDailyOperationsStats();
            updateOperationDetails();
            updateDailyPerformance();
            updatePerformanceReport();
            updateAreaManagerKPIs();
            updateAreaBranchesList();
            updateManagerDashboard();
            updateRecentlyAddedEmployees();
            
            // Update notifications
            loadEmployeeNotifications();
            loadManagerNotifications();
            
            // Update manager operations
            loadManagerOperations();
            
            // Update activity dashboard
            loadActivityDashboard();
            
            // Load employee loan data
            loadEmployeeLoanData();
            
            // Load daily performance details
            loadDailyPerformanceDetails();
            
            // Load manager loan requests
            loadManagerLoanRequests();
            
            // Load targets and tasks
            loadDailyTargets();
            loadMonthlyTargets();
            loadManagerTasks();
            
            // Load employee selection
            loadEmployeeSelection();
            
            // Update loan button states
            updateLoanButtonsOnUserChange();
            
            // Update area manager dashboard
            if (currentUser && currentUser.role === 'area_manager') {
                updateAreaManagerData();
            }
        }

        function updateManagerDashboard() {
            // Update manager dashboard with actual data
            const actualEmployees = calculateEmployeeStatsFromOperations();
            const totalEmployees = actualEmployees.length;
            const totalOps = actualEmployees.reduce((s, e) => s + e.ops, 0);
            const avgCompletion = totalEmployees > 0 ? actualEmployees.reduce((s, e) => s + e.completion, 0) / totalEmployees : 0;
            
            // Update KPIs
            if (kpiEmployeesEl) kpiEmployeesEl.textContent = totalEmployees;
            if (kpiOpsEl) kpiOpsEl.textContent = totalOps.toLocaleString();
            if (kpiCompletionEl) kpiCompletionEl.textContent = `${avgCompletion.toFixed(1)}%`;
            
            // Update employees list
            if (managerEmployeesListEl) {
                if (actualEmployees.length === 0) {
                    managerEmployeesListEl.innerHTML = `
                        <div class="text-center py-8 text-gray-500">
                            <i class="fas fa-users text-4xl mb-2"></i>
                            <p>لا توجد بيانات موظفين</p>
                            <p class="text-sm">قم بتسجيل العمليات أولاً</p>
                        </div>
                    `;
                } else {
                    const renderEmployees = (list) => {
                        managerEmployeesListEl.innerHTML = list.map((e, idx) => {
                            const color = e.completion >= 90 ? 'text-green-600' : e.completion >= 80 ? 'text-amber-600' : 'text-red-600';
                            const barColor = e.completion >= 90 ? 'bg-green-500' : e.completion >= 80 ? 'bg-yellow-500' : 'bg-red-500';
                            return `
                                <div class="p-4 rounded-xl bg-white border border-gray-100">
                                    <div class="flex items-center justify-between">
                                        <div class="font-semibold text-gray-800">${e.name}</div>
                                        <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-700 text-sm">${idx + 1}</span>
                                    </div>
                                    <div class="mt-3 flex items-center space-x-3 space-x-reverse">
                                        <div class="w-20 text-sm ${color} font-bold">${e.completion.toFixed(1)}%</div>
                                        <div class="flex-1 h-2 bg-gray-200 rounded-full">
                                            <div class="h-2 ${barColor} rounded-full" style="width:${Math.min(100, e.completion)}%"></div>
                                        </div>
                                        <div class="w-20 text-xs text-gray-500 text-left">${e.ops}/500</div>
                                    </div>
                                    <div class="mt-3 grid grid-cols-4 text-center text-xs text-gray-500">
                                        <div>بايتانس<br><span class="font-semibold text-gray-700">${e.systems.paytax}</span></div>
                                        <div>H4G<br><span class="font-semibold text-gray-700">${e.systems.h4g}</span></div>
                                        <div>DCL<br><span class="font-semibold text-gray-700">${e.systems.dcl}</span></div>
                                        <div>ديفنس<br><span class="font-semibold text-gray-700">${e.systems.other}</span></div>
                                    </div>
                                </div>
                            `;
                        }).join('');
                    };
                    renderEmployees(actualEmployees);
                }
            }
            
            // Update employee selects
            if (managerEmployeeSelectEl) {
                managerEmployeeSelectEl.innerHTML = actualEmployees.map(e=>`<option value="${e.id}">${e.name}</option>`).join('');
            }
            if (managerTargetEmployeeEl) {
                managerTargetEmployeeEl.innerHTML = actualEmployees.map(e=>`<option value="${e.id}">${e.name}</option>`).join('');
            }
            if (managerMonthlyTargetEmployeeEl) {
                managerMonthlyTargetEmployeeEl.innerHTML = actualEmployees.map(e=>`<option value="${e.id}">${e.name}</option>`).join('');
            }
            
            // Update daily task assignee select
            const dailyTaskAssigneeEl = document.getElementById('daily-task-assignee');
            if (dailyTaskAssigneeEl) {
                dailyTaskAssigneeEl.innerHTML = `<option value="all">كل الموظفين</option>` + actualEmployees.map(e => `<option value="${e.name}">${e.name}</option>`).join('');
            }
            
            // Update recently added employees display
            updateRecentlyAddedEmployees();
            
            // Load daily tasks
            loadDailyTasks();
            
            // Update notification recipient list
            const notificationRecipientEl = document.getElementById('manager-notification-recipient');
            if (notificationRecipientEl) {
                notificationRecipientEl.innerHTML = '<option value="all">جميع الموظفين</option>' + actualEmployees.map(e => `<option value="${e.name}">${e.name}</option>`).join('');
            }
            
            // Load notifications
            loadManagerNotifications();
            
            // Update operations employee filter
            const operationsEmployeeFilter = document.getElementById('manager-operations-employee-filter');
            if (operationsEmployeeFilter) {
                operationsEmployeeFilter.innerHTML = '<option value="all">جميع الموظفين</option>' + actualEmployees.map(e => `<option value="${e.name}">${e.name}</option>`).join('');
            }
            
            // Load manager operations
            loadManagerOperations();
            
            // Initialize activity dashboard
            initializeActivityDashboard();
            
            // Initialize employee details management
            initializeEmployeeDetailsManagement();
            
            // Initialize employee loan management
            initializeEmployeeLoanManagement();
            
            // Initialize daily performance details
            initializeDailyPerformanceDetails();
            
        // Initialize loan requests management
        initializeLoanRequestsManagement();
        
        // Initialize targets and tasks management
        initializeTargetsAndTasksManagement();
        
        // Initialize employee loan management
        initializeEmployeeLoanManagement();
        
        // Initialize employee selection and details
        initializeEmployeeSelectionAndDetails();
        
        // Initialize area manager dashboard
        initializeAreaManagerDashboard();
        }

        function updateDailyOperationsStats() {
            const today = new Date().toISOString().split('T')[0];
            // Get operations for current employee only
            const operations = currentUser ? getEmployeeOperations(currentUser.id) : [];
            const todayOperations = operations.filter(op => op.date === today);

            // Calculate statistics
            const totalOps = todayOperations.reduce((sum, op) => sum + op.operations, 0);
            const totalPoints = todayOperations.reduce((sum, op) => sum + op.points, 0);
            const systemsUsed = new Set(todayOperations.map(op => op.system)).size;
            const avgPerSystem = systemsUsed > 0 ? Math.round(totalOps / systemsUsed) : 0;

            // Update UI
            updateElement('today-total-ops', totalOps);
            updateElement('today-total-points', totalPoints);
            updateElement('today-systems-count', systemsUsed);
            updateElement('today-avg-per-system', avgPerSystem);

            // Update systems breakdown
            updateSystemsBreakdown(todayOperations);
            updateTimeBreakdown(todayOperations);
        }

        function updateSystemsBreakdown(operations) {
            const breakdown = {};
            operations.forEach(op => {
                if (!breakdown[op.system]) {
                    breakdown[op.system] = { operations: 0, points: 0 };
                }
                breakdown[op.system].operations += op.operations;
                breakdown[op.system].points += op.points;
            });

            const container = document.getElementById('daily-systems-breakdown');
            if (container) {
                container.innerHTML = Object.entries(breakdown).map(([system, data]) => `
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <div class="font-semibold">${system}</div>
                            <div class="text-sm text-gray-600">${data.operations} عملية • ${data.points} نقطة</div>
                        </div>
                        <div class="text-right">
                            <div class="text-lg font-bold text-indigo-600">${data.operations}</div>
                        </div>
                    </div>
                `).join('');
            }
        }

        function updateTimeBreakdown(operations) {
            const timeSlots = {
                'صباحي (6-12)': 0,
                'ظهري (12-18)': 0,
                'مسائي (18-24)': 0
            };

            operations.forEach(op => {
                const hour = parseInt(op.time.split(':')[0]);
                if (hour >= 6 && hour < 12) timeSlots['صباحي (6-12)'] += op.operations;
                else if (hour >= 12 && hour < 18) timeSlots['ظهري (12-18)'] += op.operations;
                else timeSlots['مسائي (18-24)'] += op.operations;
            });

            const container = document.getElementById('daily-time-breakdown');
            if (container) {
                container.innerHTML = Object.entries(timeSlots).map(([period, ops]) => `
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div class="font-semibold">${period}</div>
                        <div class="text-lg font-bold text-purple-600">${ops}</div>
                    </div>
                `).join('');
            }
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('ar-EG');
        }

        // Helper function to clean and validate values
        function cleanValue(value, defaultValue = 0) {
            if (value === null || value === undefined || value === '' || 
                isNaN(value) || value === 'NaN' || value === 'undefined' || 
                value === 'null' || value === 'Infinity' || value === '-Infinity') {
                return defaultValue;
            }
            
            // Convert to number if possible
            const numValue = Number(value);
            if (isNaN(numValue)) {
                return defaultValue;
            }
            
            return numValue;
        }

        // Helper function to safely calculate percentages
        function safePercentage(numerator, denominator, defaultValue = 0) {
            const num = cleanValue(numerator);
            const den = cleanValue(denominator);
            
            if (den === 0 || isNaN(num) || isNaN(den)) {
                return defaultValue;
            }
            
            return Math.round((num / den) * 100);
        }

        // Helper function to safely calculate averages
        function safeAverage(total, count, defaultValue = 0) {
            const totalValue = cleanValue(total);
            const countValue = cleanValue(count);
            
            if (countValue === 0 || isNaN(totalValue) || isNaN(countValue)) {
                return defaultValue;
            }
            
            return Math.round((totalValue / countValue) * 100) / 100;
        }

        function updateElement(id, value) {
            const element = document.getElementById(id);
            if (element) {
                const cleanVal = cleanValue(value);
                element.textContent = cleanVal;
            }
        }

        function updateOperationDetails() {
            const operations = getStoredOperations();
            const today = new Date().toISOString().split('T')[0];
            const todayOperations = operations.filter(op => op.date === today);

            // Calculate operation details
            const operationDetails = {};
            todayOperations.forEach(op => {
                if (!operationDetails[op.system]) {
                    operationDetails[op.system] = {
                        operations: 0,
                        points: 0,
                        targetImpact: 0
                    };
                }
                operationDetails[op.system].operations += op.operations;
                operationDetails[op.system].points += op.points;
            });

            // Calculate target impact
            const totalPoints = Object.values(operationDetails).reduce((sum, op) => sum + op.points, 0);
            Object.values(operationDetails).forEach(op => {
                op.targetImpact = totalPoints > 0 ? Math.round((op.points / totalPoints) * 100) : 0;
            });

            // Update UI
            const container = document.getElementById('operation-details');
            if (container) {
                container.innerHTML = Object.entries(operationDetails).map(([name, data]) => `
                    <div class="card p-4">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="font-semibold text-gray-800">${name}</h3>
                            <span class="text-sm text-gray-500">${data.targetImpact}%</span>
                        </div>
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span class="text-sm text-gray-600">العمليات:</span>
                                <span class="font-semibold">${data.operations}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm text-gray-600">النقاط:</span>
                                <span class="font-semibold text-green-600">${data.points}</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-indigo-500 h-2 rounded-full" style="width: ${data.targetImpact}%"></div>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        function updateDailyPerformance() {
            const operations = getStoredOperations();
            const last7Days = getLast7Days();
            
            const dailyData = last7Days.map(date => {
                const dayOps = operations.filter(op => op.date === date);
                const totalOps = dayOps.reduce((sum, op) => sum + op.operations, 0);
                const totalPoints = dayOps.reduce((sum, op) => sum + op.points, 0);
                
                return {
                    day: getDayName(date),
                    operations: totalOps,
                    points: totalPoints
                };
            });

            // Update daily performance display
            const container = document.getElementById('daily-performance-full');
            if (container) {
                container.innerHTML = dailyData.map(data => `
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div class="font-semibold">${data.day}</div>
                        <div class="flex items-center space-x-4 space-x-reverse">
                            <div class="text-center">
                                <div class="text-sm text-gray-600">العمليات</div>
                                <div class="font-bold text-blue-600">${data.operations}</div>
                            </div>
                            <div class="text-center">
                                <div class="text-sm text-gray-600">النقاط</div>
                                <div class="font-bold text-green-600">${data.points}</div>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        function updatePerformanceReport() {
            // Get operations for current employee if logged in, otherwise all operations
            let operations = [];
            if (currentUser && currentUser.role === 'employee') {
                operations = getEmployeeOperations(currentUser.id);
            } else {
                operations = getAllEmployeesOperations();
            }
            
            const last7Days = getLast7Days();
            const last7DaysOps = operations.filter(op => last7Days.includes(op.date));
            
            // Calculate averages
            const avgDailyOps = last7DaysOps.length > 0 ? 
                Math.round(last7DaysOps.reduce((sum, op) => sum + op.operations, 0) / 7) : 0;
            const avgWeeklyPoints = last7DaysOps.reduce((sum, op) => sum + op.points, 0);
            
            // Find most productive day
            const dailyTotals = last7Days.map(date => {
                const dayOps = operations.filter(op => op.date === date);
                return {
                    date,
                    total: dayOps.reduce((sum, op) => sum + op.operations, 0)
                };
            });
            const mostProductiveDay = dailyTotals.reduce((max, day) => 
                day.total > max.total ? day : max, {total: 0});
            
            // Calculate trend
            const firstHalf = last7Days.slice(0, 3).reduce((sum, date) => {
                const dayOps = operations.filter(op => op.date === date);
                return sum + dayOps.reduce((s, op) => s + op.operations, 0);
            }, 0);
            const secondHalf = last7Days.slice(3).reduce((sum, date) => {
                const dayOps = operations.filter(op => op.date === date);
                return sum + dayOps.reduce((s, op) => s + op.operations, 0);
            }, 0);
            const trend = secondHalf > firstHalf ? '↗️ متصاعد' : secondHalf < firstHalf ? '↘️ منخفض' : '➡️ مستقر';

            // Update UI
            updateElement('avg-daily-ops', avgDailyOps);
            updateElement('avg-weekly-points', avgWeeklyPoints);
            updateElement('most-productive-day', mostProductiveDay.total > 0 ? getDayName(mostProductiveDay.date) : '--');
            updateElement('performance-trend', trend);
        }

        function getLast7Days() {
            const days = [];
            for (let i = 6; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                days.push(date.toISOString().split('T')[0]);
            }
            return days;
        }

        function getDayName(dateString) {
            const date = new Date(dateString);
            const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
            return days[date.getDay()];
        }

        // Make deleteOperation globally available
        window.deleteOperation = deleteOperation;

        // Area Manager Employee Operations Integration
        function initializeAreaManagerEmployeeView() {
            const employeeSelect = document.getElementById('area-employee-select');
            const periodSelect = document.getElementById('area-employee-period');
            const systemSelect = document.getElementById('area-employee-system');

            if (!employeeSelect) return;

            // Load employees list
            loadAreaManagerEmployees();

            // Handle employee selection
            employeeSelect.addEventListener('change', function() {
                const selectedEmployee = this.value;
                if (selectedEmployee) {
                    loadEmployeeOperations(selectedEmployee);
                } else {
                    hideEmployeeDetails();
                }
            });

            // Handle period and system changes
            if (periodSelect) {
                periodSelect.addEventListener('change', function() {
                    const selectedEmployee = employeeSelect.value;
                    if (selectedEmployee) {
                        loadEmployeeOperations(selectedEmployee);
                    }
                });
            }

            if (systemSelect) {
                systemSelect.addEventListener('change', function() {
                    const selectedEmployee = employeeSelect.value;
                    if (selectedEmployee) {
                        loadEmployeeOperations(selectedEmployee);
                    }
                });
            }
        }

        function loadAreaManagerEmployees() {
            const employeeSelect = document.getElementById('area-employee-select');
            if (!employeeSelect) return;

            // Get all employees from localStorage
            const employees = getAllEmployeesFromStorage();
            
            employeeSelect.innerHTML = '<option value="">-- اختر موظف --</option>' +
                employees.map(emp => `<option value="${emp.id}">${emp.name} - ${emp.branch}</option>`).join('');
        }

        function getAllEmployeesFromStorage() {
            // Get all employees from the new employee management system
            return getAllEmployees();
        }

        function loadEmployeeOperations(employeeId) {
            const period = document.getElementById('area-employee-period')?.value || 'today';
            const system = document.getElementById('area-employee-system')?.value || 'all';
            
            // Get operations for specific employee
            const allOperations = getEmployeeOperations(employeeId);
            
            // Filter operations by employee (already filtered by getEmployeeOperations)
            let filteredOperations = allOperations;

            // Apply period filter
            if (period !== 'all') {
                const now = new Date();
                filteredOperations = filteredOperations.filter(op => {
                    const opDate = new Date(op.date);
                    switch (period) {
                        case 'today':
                            return opDate.toDateString() === now.toDateString();
                        case 'week':
                            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                            return opDate >= weekAgo;
                        case 'month':
                            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                            return opDate >= monthAgo;
                        default:
                            return true;
                    }
                });
            }

            // Apply system filter
            if (system !== 'all') {
                filteredOperations = filteredOperations.filter(op => op.system === system);
            }

            // Display employee details
            displayEmployeeDetails(employeeId, filteredOperations);
        }

        function displayEmployeeDetails(employeeId, operations) {
            const detailsContainer = document.getElementById('area-employee-details');
            if (!detailsContainer) return;

            // Show details container
            detailsContainer.classList.remove('hidden');

            // Get employee info
            const employees = getAllEmployeesFromStorage();
            const employee = employees.find(emp => emp.id === employeeId);

            // Calculate statistics
            const totalOps = operations.reduce((sum, op) => sum + op.operations, 0);
            const totalPoints = operations.reduce((sum, op) => sum + op.points, 0);
            const systemsUsed = new Set(operations.map(op => op.system)).size;
            const avgDaily = operations.length > 0 ? Math.round(totalOps / 7) : 0; // Assuming 7 days

            // Update statistics
            updateElement('area-emp-total-ops', totalOps);
            updateElement('area-emp-total-points', totalPoints);
            updateElement('area-emp-avg-daily', avgDaily);
            updateElement('area-emp-systems-used', systemsUsed);

            // Update profile info
            const profileInfo = document.getElementById('area-emp-profile-info');
            if (profileInfo && employee) {
                profileInfo.innerHTML = `
                    <div class="flex justify-between">
                        <span class="text-gray-600">الاسم:</span>
                        <span class="font-semibold">${employee.name}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">رقم الموظف:</span>
                        <span class="font-semibold">${employee.id}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">الفرع:</span>
                        <span class="font-semibold">${employee.branch}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">القسم:</span>
                        <span class="font-semibold">${employee.department}</span>
                    </div>
                `;
            }

            // Update operations table
            updateEmployeeOperationsTable(operations);

            // Update systems breakdown
            updateEmployeeSystemsBreakdown(operations);

            // Update daily performance
            updateEmployeeDailyPerformance(operations);
        }

        function updateEmployeeOperationsTable(operations) {
            const tableBody = document.getElementById('area-emp-operations-table');
            const noOperations = document.getElementById('area-emp-no-operations');

            if (!tableBody) return;

            if (operations.length === 0) {
                tableBody.innerHTML = '';
                if (noOperations) noOperations.classList.remove('hidden');
                return;
            }

            if (noOperations) noOperations.classList.add('hidden');

            tableBody.innerHTML = operations.slice(0, 50).map(op => `
                <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3">${formatDate(op.date)}</td>
                    <td class="px-4 py-3">${op.time}</td>
                    <td class="px-4 py-3">
                        <span class="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">${op.system}</span>
                    </td>
                    <td class="px-4 py-3 font-semibold">${op.operations}</td>
                    <td class="px-4 py-3 font-semibold text-green-600">${op.points}</td>
                    <td class="px-4 py-3 text-gray-600">${op.notes || '-'}</td>
                </tr>
            `).join('');
        }

        function updateEmployeeSystemsBreakdown(operations) {
            const breakdown = {};
            operations.forEach(op => {
                if (!breakdown[op.system]) {
                    breakdown[op.system] = { operations: 0, points: 0 };
                }
                breakdown[op.system].operations += op.operations;
                breakdown[op.system].points += op.points;
            });

            const container = document.getElementById('area-emp-systems-breakdown');
            if (container) {
                container.innerHTML = Object.entries(breakdown).map(([system, data]) => `
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <div class="font-semibold">${system}</div>
                            <div class="text-sm text-gray-600">${data.operations} عملية • ${data.points} نقطة</div>
                        </div>
                        <div class="text-right">
                            <div class="text-lg font-bold text-indigo-600">${data.operations}</div>
                        </div>
                    </div>
                `).join('');
            }
        }

        function updateEmployeeDailyPerformance(operations) {
            const last7Days = getLast7Days();
            
            const dailyData = last7Days.map(date => {
                const dayOps = operations.filter(op => op.date === date);
                const totalOps = dayOps.reduce((sum, op) => sum + op.operations, 0);
                const totalPoints = dayOps.reduce((sum, op) => sum + op.points, 0);
                
                return {
                    day: getDayName(date),
                    operations: totalOps,
                    points: totalPoints
                };
            });

            const container = document.getElementById('area-emp-daily-performance');
            if (container) {
                container.innerHTML = dailyData.map(data => `
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div class="font-semibold">${data.day}</div>
                        <div class="flex items-center space-x-4 space-x-reverse">
                            <div class="text-center">
                                <div class="text-sm text-gray-600">العمليات</div>
                                <div class="font-bold text-blue-600">${data.operations}</div>
                            </div>
                            <div class="text-center">
                                <div class="text-sm text-gray-600">النقاط</div>
                                <div class="font-bold text-green-600">${data.points}</div>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        function hideEmployeeDetails() {
            const detailsContainer = document.getElementById('area-employee-details');
            if (detailsContainer) {
                detailsContainer.classList.add('hidden');
            }
        }

        function updateAreaManagerKPIs() {
            const allOperations = getStoredOperations();
            const employees = getAllEmployeesFromStorage();
            
            // Calculate total statistics
            const totalOps = allOperations.reduce((sum, op) => sum + op.operations, 0);
            const totalPoints = allOperations.reduce((sum, op) => sum + op.points, 0);
            const totalEmployees = employees.length;
            const totalBranches = new Set(employees.map(emp => emp.branch)).size;
            
            // Calculate completion percentage (assuming target is 1000 points per employee per month)
            const monthlyTarget = totalEmployees * 1000;
            const completionPercentage = monthlyTarget > 0 ? Math.round((totalPoints / monthlyTarget) * 100) : 0;
            
            // Calculate profit margin (simplified calculation)
            const profitMargin = totalPoints > 0 ? Math.round((totalPoints * 0.1)) : 0;
            
            // Update KPI elements
            updateElement('area-kpi-completion', completionPercentage + '%');
            updateElement('area-kpi-employees', totalEmployees);
            updateElement('area-kpi-branches', totalBranches);
            updateElement('area-kpi-margin', profitMargin + '%');
            updateElement('area-kpi-revenue', totalPoints.toLocaleString());
        }

        function updateAreaBranchesList() {
            const allOperations = getStoredOperations();
            const employees = getAllEmployeesFromStorage();
            
            // Group employees by branch
            const branchStats = {};
            employees.forEach(emp => {
                if (!branchStats[emp.branch]) {
                    branchStats[emp.branch] = {
                        employees: [],
                        totalOps: 0,
                        totalPoints: 0
                    };
                }
                branchStats[emp.branch].employees.push(emp);
            });
            
            // Calculate operations for each branch
            Object.keys(branchStats).forEach(branch => {
                const branchEmployees = branchStats[branch].employees;
                const branchOps = allOperations.filter(op => 
                    branchEmployees.some(emp => emp.id === op.employeeId)
                );
                
                branchStats[branch].totalOps = branchOps.reduce((sum, op) => sum + op.operations, 0);
                branchStats[branch].totalPoints = branchOps.reduce((sum, op) => sum + op.points, 0);
            });
            
            // Update branches list
            const container = document.getElementById('area-branches-list');
            if (container) {
                container.innerHTML = Object.entries(branchStats).map(([branch, stats]) => {
                    const avgPerEmployee = stats.employees.length > 0 ? 
                        Math.round(stats.totalOps / stats.employees.length) : 0;
                    
                    return `
                        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <div class="font-semibold text-gray-800">${branch}</div>
                                <div class="text-sm text-gray-600">${stats.employees.length} موظف • ${stats.totalOps} عملية</div>
                            </div>
                            <div class="text-right">
                                <div class="text-lg font-bold text-blue-600">${stats.totalPoints}</div>
                                <div class="text-sm text-gray-500">نقطة</div>
                            </div>
                            <div class="text-right">
                                <div class="text-lg font-bold text-green-600">${avgPerEmployee}</div>
                                <div class="text-sm text-gray-500">متوسط/موظف</div>
                            </div>
                        </div>
                    `;
                }).join('');
            }
        }

        // Calculate employee statistics from actual operations
        function calculateEmployeeStatsFromOperations() {
            const employees = getAllEmployeesFromStorage();
            const operations = getAllEmployeesOperations();
            
            return employees.map(employee => {
                const employeeOps = operations.filter(op => op.employeeId === employee.id);
                const totalOps = employeeOps.reduce((sum, op) => sum + op.operations, 0);
                const totalPoints = employeeOps.reduce((sum, op) => sum + op.points, 0);
                
                // Calculate completion percentage (assuming 500 is the target)
                const target = 500;
                const completion = Math.min(100, (totalOps / target) * 100);
                
                // Calculate systems breakdown
                const systems = {
                    paytax: 0,
                    h4g: 0,
                    dcl: 0,
                    other: 0
                };
                
                employeeOps.forEach(op => {
                    switch(op.system) {
                        case 'بايتاكس':
                            systems.paytax += op.operations;
                            break;
                        case 'H4G':
                            systems.h4g += op.operations;
                            break;
                        case 'DCL':
                            systems.dcl += op.operations;
                            break;
                        case 'ديقنس':
                            systems.other += op.operations;
                            break;
                    }
                });
                
                return {
                    id: employee.id,
                    name: employee.name,
                    ops: totalOps,
                    completion: completion,
                    systems: systems,
                    totalPoints: totalPoints
                };
            });
        }

        // Branch Manager Employee Operations Integration
        function initializeBranchManagerEmployeeView() {
            const employeeSelect = document.getElementById('manager-employee-select');
            const periodSelect = document.getElementById('manager-employee-period');
            const systemSelect = document.getElementById('manager-employee-system');

            if (!employeeSelect) return;

            // Load employees list
            loadBranchManagerEmployees();

            // Handle employee selection
            employeeSelect.addEventListener('change', function() {
                const selectedEmployee = this.value;
                if (selectedEmployee) {
                    loadBranchManagerEmployeeOperations(selectedEmployee);
                } else {
                    hideBranchManagerEmployeeDetails();
                }
            });

            // Handle period and system changes
            if (periodSelect) {
                periodSelect.addEventListener('change', function() {
                    const selectedEmployee = employeeSelect.value;
                    if (selectedEmployee) {
                        loadBranchManagerEmployeeOperations(selectedEmployee);
                    }
                });
            }

            if (systemSelect) {
                systemSelect.addEventListener('change', function() {
                    const selectedEmployee = employeeSelect.value;
                    if (selectedEmployee) {
                        loadBranchManagerEmployeeOperations(selectedEmployee);
                    }
                });
            }
        }

        function loadBranchManagerEmployees() {
            const employeeSelect = document.getElementById('manager-employee-select');
            if (!employeeSelect) return;

            // Get all employees from localStorage
            const employees = getAllEmployeesFromStorage();
            
            employeeSelect.innerHTML = '<option value="">-- اختر موظف --</option>' +
                employees.map(emp => `<option value="${emp.id}">${emp.name} - ${emp.branch}</option>`).join('');
        }

        function loadBranchManagerEmployeeOperations(employeeId) {
            const period = document.getElementById('manager-employee-period')?.value || 'today';
            const system = document.getElementById('manager-employee-system')?.value || 'all';
            
            // Get operations for specific employee
            const allOperations = getEmployeeOperations(employeeId);
            
            // Filter operations by employee (already filtered by getEmployeeOperations)
            let filteredOperations = allOperations;

            // Apply period filter
            if (period !== 'all') {
                const now = new Date();
                filteredOperations = filteredOperations.filter(op => {
                    const opDate = new Date(op.date);
                    switch (period) {
                        case 'today':
                            return opDate.toDateString() === now.toDateString();
                        case 'week':
                            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                            return opDate >= weekAgo;
                        case 'month':
                            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                            return opDate >= monthAgo;
                        default:
                            return true;
                    }
                });
            }

            // Apply system filter
            if (system !== 'all') {
                filteredOperations = filteredOperations.filter(op => op.system === system);
            }

            // Display employee details
            displayBranchManagerEmployeeDetails(employeeId, filteredOperations);
        }

        function displayBranchManagerEmployeeDetails(employeeId, operations) {
            const detailsContainer = document.getElementById('manager-employee-details');
            if (!detailsContainer) return;

            // Show details container
            detailsContainer.classList.remove('hidden');

            // Get employee info
            const employees = getAllEmployeesFromStorage();
            const employee = employees.find(emp => emp.id === employeeId);

            // Calculate statistics
            const totalOps = operations.reduce((sum, op) => sum + op.operations, 0);
            const totalPoints = operations.reduce((sum, op) => sum + op.points, 0);
            const systemsUsed = new Set(operations.map(op => op.system)).size;
            const avgDaily = operations.length > 0 ? Math.round(totalOps / 7) : 0; // Assuming 7 days

            // Update statistics
            updateElement('manager-emp-total-ops', totalOps);
            updateElement('manager-emp-total-points', totalPoints);
            updateElement('manager-emp-avg-daily', avgDaily);
            updateElement('manager-emp-systems-used', systemsUsed);

            // Update profile info
            const profileInfo = document.getElementById('manager-emp-profile-info');
            if (profileInfo && employee) {
                profileInfo.innerHTML = `
                    <div class="flex justify-between">
                        <span class="text-gray-600">الاسم:</span>
                        <span class="font-semibold">${employee.name}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">رقم الموظف:</span>
                        <span class="font-semibold">${employee.id}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">الفرع:</span>
                        <span class="font-semibold">${employee.branch}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">القسم:</span>
                        <span class="font-semibold">${employee.department}</span>
                    </div>
                `;
            }

            // Update operations table
            updateBranchManagerEmployeeOperationsTable(operations);

            // Update systems breakdown
            updateBranchManagerEmployeeSystemsBreakdown(operations);

            // Update daily performance
            updateBranchManagerEmployeeDailyPerformance(operations);
        }

        function updateBranchManagerEmployeeOperationsTable(operations) {
            const tableBody = document.getElementById('manager-emp-operations-table');
            const noOperations = document.getElementById('manager-emp-no-operations');

            if (!tableBody) return;

            if (operations.length === 0) {
                tableBody.innerHTML = '';
                if (noOperations) noOperations.classList.remove('hidden');
                return;
            }

            if (noOperations) noOperations.classList.add('hidden');

            tableBody.innerHTML = operations.slice(0, 50).map(op => `
                <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3">${formatDate(op.date)}</td>
                    <td class="px-4 py-3">${op.time}</td>
                    <td class="px-4 py-3">
                        <span class="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">${op.system}</span>
                    </td>
                    <td class="px-4 py-3 font-semibold">${op.operations}</td>
                    <td class="px-4 py-3 font-semibold text-green-600">${op.points}</td>
                    <td class="px-4 py-3 text-gray-600">${op.notes || '-'}</td>
                </tr>
            `).join('');
        }

        function updateBranchManagerEmployeeSystemsBreakdown(operations) {
            const breakdown = {};
            operations.forEach(op => {
                if (!breakdown[op.system]) {
                    breakdown[op.system] = { operations: 0, points: 0 };
                }
                breakdown[op.system].operations += op.operations;
                breakdown[op.system].points += op.points;
            });

            const container = document.getElementById('manager-emp-systems-breakdown');
            if (container) {
                container.innerHTML = Object.entries(breakdown).map(([system, data]) => `
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <div class="font-semibold">${system}</div>
                            <div class="text-sm text-gray-600">${data.operations} عملية • ${data.points} نقطة</div>
                        </div>
                        <div class="text-right">
                            <div class="text-lg font-bold text-indigo-600">${data.operations}</div>
                        </div>
                    </div>
                `).join('');
            }
        }

        function updateBranchManagerEmployeeDailyPerformance(operations) {
            const last7Days = getLast7Days();
            
            const dailyData = last7Days.map(date => {
                const dayOps = operations.filter(op => op.date === date);
                const totalOps = dayOps.reduce((sum, op) => sum + op.operations, 0);
                const totalPoints = dayOps.reduce((sum, op) => sum + op.points, 0);
                
                return {
                    day: getDayName(date),
                    operations: totalOps,
                    points: totalPoints
                };
            });

            const container = document.getElementById('manager-emp-daily-performance');
            if (container) {
                container.innerHTML = dailyData.map(data => `
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div class="font-semibold">${data.day}</div>
                        <div class="flex items-center space-x-4 space-x-reverse">
                            <div class="text-center">
                                <div class="text-sm text-gray-600">العمليات</div>
                                <div class="font-bold text-blue-600">${data.operations}</div>
                            </div>
                            <div class="text-center">
                                <div class="text-sm text-gray-600">النقاط</div>
                                <div class="font-bold text-green-600">${data.points}</div>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        function hideBranchManagerEmployeeDetails() {
            const detailsContainer = document.getElementById('manager-employee-details');
            if (detailsContainer) {
                detailsContainer.classList.add('hidden');
            }
        }

        // Employee Management System
        function initializeEmployeeManagement() {
            // Initialize employees if not exists
            if (!localStorage.getItem('employees')) {
                const defaultEmployees = [
                    {
                        id: 'EMP001',
                        username: 'ahmed.mohamed',
                        password: 'password123',
                        name: 'أحمد محمد علي',
                        branch: 'فرع بنى سويف',
                        department: 'المبيعات',
                        role: 'employee',
                        baseSalary: 5000,
                        targetValue: 2000,
                        requiredPoints: 1600,
                        currentPoints: 0,
                        targetPercentageRequired: 80,
                        dailyPerformance: [],
                        loanRequests: [],
                        attendanceStatus: 'لم يتم التسجيل اليوم',
                        operations: [],
                        profile: {
                            phone: '',
                            email: '',
                            address: '',
                            emergencyContact: '',
                            hireDate: '',
                            position: 'موظف مبيعات'
                        }
                    },
                    {
                        id: 'EMP002',
                        username: 'fatima.ahmed',
                        password: 'password123',
                        name: 'فاطمة أحمد',
                        branch: 'فرع القاهرة',
                        department: 'المبيعات',
                        role: 'employee',
                        baseSalary: 4500,
                        targetValue: 1800,
                        requiredPoints: 1440,
                        currentPoints: 0,
                        targetPercentageRequired: 80,
                        dailyPerformance: [],
                        loanRequests: [],
                        attendanceStatus: 'لم يتم التسجيل اليوم',
                        operations: [],
                        profile: {
                            phone: '',
                            email: '',
                            address: '',
                            emergencyContact: '',
                            hireDate: '',
                            position: 'موظف مبيعات'
                        }
                    },
                    {
                        id: 'EMP003',
                        username: 'mohamed.hassan',
                        password: 'password123',
                        name: 'محمد حسن',
                        branch: 'فرع الإسكندرية',
                        department: 'المبيعات',
                        role: 'employee',
                        baseSalary: 4800,
                        targetValue: 1900,
                        requiredPoints: 1520,
                        currentPoints: 0,
                        targetPercentageRequired: 80,
                        dailyPerformance: [],
                        loanRequests: [],
                        attendanceStatus: 'لم يتم التسجيل اليوم',
                        operations: [],
                        profile: {
                            phone: '',
                            email: '',
                            address: '',
                            emergencyContact: '',
                            hireDate: '',
                            position: 'موظف مبيعات'
                        }
                    }
                ];
                localStorage.setItem('employees', JSON.stringify(defaultEmployees));
            }
        }

        // Get all employees
        function getAllEmployees() {
            return JSON.parse(localStorage.getItem('employees') || '[]');
        }

        // Get employee by username
        function getEmployeeByUsername(username) {
            const employees = getAllEmployees();
            return employees.find(emp => emp.username === username);
        }

        // Get employee by ID
        function getEmployeeById(id) {
            const employees = getAllEmployees();
            return employees.find(emp => emp.id === id);
        }

        // Update employee data
        function updateEmployee(employeeId, updatedData) {
            const employees = getAllEmployees();
            const index = employees.findIndex(emp => emp.id === employeeId);
            if (index !== -1) {
                employees[index] = { ...employees[index], ...updatedData };
                localStorage.setItem('employees', JSON.stringify(employees));
                return true;
            }
            return false;
        }

        // Clear dummy data and initialize with real data
        function clearDummyData() {
            // Clear any existing dummy operations
            const operations = getStoredOperations();
            if (operations.length === 0) {
                // Initialize with empty operations if none exist
                localStorage.setItem('dailyOperations', JSON.stringify([]));
            }
        }

        // Add New Employee Functions
        function initializeAddEmployeeForm() {
            const addEmployeeForm = document.getElementById('add-employee-form');
            const clearEmployeeFormBtn = document.getElementById('clear-employee-form');
            
            if (addEmployeeForm) {
                addEmployeeForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    addNewEmployee();
                });
            }
            
            if (clearEmployeeFormBtn) {
                clearEmployeeFormBtn.addEventListener('click', function() {
                    clearAddEmployeeForm();
                });
            }
        }

        function addNewEmployee() {
            const name = document.getElementById('new-employee-name').value;
            const username = document.getElementById('new-employee-username').value;
            const password = document.getElementById('new-employee-password').value;
            let id = document.getElementById('new-employee-id').value;
            const department = document.getElementById('new-employee-department').value;
            const branch = document.getElementById('new-employee-branch').value;
            const salary = parseInt(document.getElementById('new-employee-salary').value);
            const target = parseInt(document.getElementById('new-employee-target').value);
            const phone = document.getElementById('new-employee-phone').value;
            const email = document.getElementById('new-employee-email').value;

            // Validate required fields
            if (!name || !username || !password || !department || !branch || !salary || !target) {
                showAddEmployeeStatus('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }

            // Check if username already exists
            const existingEmployee = getEmployeeByUsername(username);
            if (existingEmployee) {
                showAddEmployeeStatus('اسم المستخدم موجود بالفعل', 'error');
                return;
            }

            // Generate employee ID if not provided
            if (!id) {
                const employees = getAllEmployees();
                const maxId = Math.max(...employees.map(emp => {
                    const num = emp.id.replace('EMP', '');
                    return parseInt(num) || 0;
                }));
                id = `EMP${String(maxId + 1).padStart(3, '0')}`;
                document.getElementById('new-employee-id').value = id;
            }

            // Check if employee ID already exists
            const existingById = getEmployeeById(id);
            if (existingById) {
                showAddEmployeeStatus('رقم الموظف موجود بالفعل', 'error');
                return;
            }

            // Create new employee object
            const newEmployee = {
                id: id,
                username: username,
                password: password,
                name: name,
                branch: branch,
                department: department,
                role: 'employee',
                baseSalary: salary,
                targetValue: target,
                requiredPoints: Math.round(target * 0.8),
                currentPoints: 0,
                targetPercentageRequired: 80,
                dailyPerformance: [],
                loanRequests: [],
                attendanceStatus: 'لم يتم التسجيل اليوم',
                operations: [],
                profile: {
                    phone: phone,
                    email: email,
                    address: '',
                    emergencyContact: '',
                    hireDate: new Date().toISOString().split('T')[0],
                    position: 'موظف مبيعات'
                }
            };

            // Add to employees list
            const employees = getAllEmployees();
            employees.push(newEmployee);
            localStorage.setItem('employees', JSON.stringify(employees));
            
            // Initialize empty operations for new employee
            localStorage.setItem(`employeeOperations_${newEmployee.id}`, JSON.stringify([]));

            // Show success message
            showAddEmployeeStatus(`تم إضافة الموظف ${name} بنجاح! يمكنه الآن تسجيل الدخول باستخدام: ${username}`, 'success');

            // Clear form
            clearAddEmployeeForm();

            // Update all displays
            updateAllDisplays();
            
            // Update recently added employees display
            updateRecentlyAddedEmployees();
            
            // مزامنة مع مدير المنطقة
            syncWithAreaManager();
        }

        function clearAddEmployeeForm() {
            const form = document.getElementById('add-employee-form');
            if (form) {
                form.reset();
            }
            hideAddEmployeeStatus();
        }

        function showAddEmployeeStatus(message, type) {
            const statusEl = document.getElementById('add-employee-status');
            if (statusEl) {
                statusEl.classList.remove('hidden');
                statusEl.classList.remove('bg-green-100', 'text-green-700', 'bg-red-100', 'text-red-700');
                
                if (type === 'success') {
                    statusEl.classList.add('bg-green-100', 'text-green-700');
                } else {
                    statusEl.classList.add('bg-red-100', 'text-red-700');
                }
                
                statusEl.textContent = message;

                // Hide message after 5 seconds
                setTimeout(() => {
                    hideAddEmployeeStatus();
                }, 5000);
            }
        }

        function hideAddEmployeeStatus() {
            const statusEl = document.getElementById('add-employee-status');
            if (statusEl) {
                statusEl.classList.add('hidden');
            }
        }

        function updateRecentlyAddedEmployees() {
            const container = document.getElementById('recently-added-employees');
            if (!container) return;

            const employees = getAllEmployees();
            const recentEmployees = employees.slice(-6); // Show last 6 employees

            if (recentEmployees.length === 0) {
                container.innerHTML = `
                    <div class="col-span-full text-center py-8 text-gray-500">
                        <i class="fas fa-users text-4xl mb-2"></i>
                        <p>لا توجد موظفين مضافين بعد</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = recentEmployees.map(emp => `
                <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between mb-2">
                        <h4 class="font-semibold text-gray-800">${emp.name}</h4>
                        <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">${emp.id}</span>
                    </div>
                    <div class="text-sm text-gray-600 space-y-1">
                        <div><i class="fas fa-building ml-1"></i> ${emp.branch}</div>
                        <div><i class="fas fa-briefcase ml-1"></i> ${emp.department}</div>
                        <div><i class="fas fa-user ml-1"></i> ${emp.username}</div>
                    </div>
                    <div class="mt-3 flex items-center justify-between">
                        <span class="text-xs text-gray-500">الراتب: ${emp.baseSalary.toLocaleString()} ج.م</span>
                        <span class="text-xs text-green-600">نشط</span>
                    </div>
                </div>
            `).join('');
        }

        // Quick Navigation
        function initializeQuickNavigation() {
            // Add scroll functionality to navigation buttons
            document.addEventListener('click', function(e) {
                if (e.target.matches('[data-scroll]')) {
                    e.preventDefault();
                    const targetId = e.target.getAttribute('data-scroll');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        }

        // Daily Tasks Management
        function initializeDailyTasks() {
            const dailyTaskForm = document.getElementById('manager-daily-task-form');
            const clearTaskFormBtn = document.getElementById('clear-daily-task-form');
            
            if (dailyTaskForm) {
                dailyTaskForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    sendDailyTask();
                });
            }
            
            if (clearTaskFormBtn) {
                clearTaskFormBtn.addEventListener('click', function() {
                    clearDailyTaskForm();
                });
            }
            
            // Set default date to today
            const dateInput = document.getElementById('daily-task-date');
            if (dateInput) {
                dateInput.value = new Date().toISOString().split('T')[0];
            }
            
            // Load existing tasks
            loadDailyTasks();
        }

        function sendDailyTask() {
            const title = document.getElementById('daily-task-title').value;
            const assignee = document.getElementById('daily-task-assignee').value;
            const type = document.getElementById('daily-task-type').value;
            const priority = document.getElementById('daily-task-priority').value;
            const description = document.getElementById('daily-task-desc').value;
            const date = document.getElementById('daily-task-date').value;
            const time = document.getElementById('daily-task-time').value;

            if (!title || !date) {
                showTaskStatus('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }

            const task = {
                id: Date.now(),
                title: title,
                assignee: assignee,
                type: type,
                priority: priority,
                description: description,
                date: date,
                time: time || '00:00',
                status: 'معلقة',
                createdAt: new Date().toISOString(),
                createdBy: currentUser?.name || 'مدير الفرع'
            };

            // Save task to localStorage
            const tasks = getDailyTasks();
            tasks.push(task);
            localStorage.setItem('dailyTasks', JSON.stringify(tasks));

            // Show success message
            showTaskStatus(`تم إرسال المهمة "${title}" بنجاح!`, 'success');

            // Clear form
            clearDailyTaskForm();

            // Reload tasks list
            loadDailyTasks();
            
            // مزامنة مع مدير المنطقة
            syncWithAreaManager();
        }

        function getDailyTasks() {
            return JSON.parse(localStorage.getItem('dailyTasks') || '[]');
        }

        function loadDailyTasks() {
            const container = document.getElementById('manager-daily-tasks-list');
            if (!container) return;

            const tasks = getDailyTasks();
            const today = new Date().toISOString().split('T')[0];
            const todayTasks = tasks.filter(task => task.date === today);

            if (todayTasks.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-tasks text-4xl mb-2"></i>
                        <p>لا توجد مهام مُرسلة لليوم</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = todayTasks.map(task => {
                const priorityColor = {
                    'عادية': 'bg-gray-100 text-gray-800',
                    'عالية': 'bg-yellow-100 text-yellow-800',
                    'عاجلة': 'bg-red-100 text-red-800'
                };

                const statusColor = {
                    'معلقة': 'bg-yellow-100 text-yellow-800',
                    'قيد التنفيذ': 'bg-blue-100 text-blue-800',
                    'مكتملة': 'bg-green-100 text-green-800'
                };

                return `
                    <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div class="flex items-start justify-between mb-2">
                            <div class="flex-1">
                                <h4 class="font-semibold text-gray-800 mb-1">${task.title}</h4>
                                <div class="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 mb-2">
                                    <span><i class="fas fa-user ml-1"></i> ${task.assignee === 'all' ? 'كل الموظفين' : task.assignee}</span>
                                    <span><i class="fas fa-tag ml-1"></i> ${task.type}</span>
                                    <span><i class="fas fa-clock ml-1"></i> ${task.time}</span>
                                </div>
                                ${task.description ? `<p class="text-sm text-gray-600 mb-2">${task.description}</p>` : ''}
                            </div>
                            <div class="flex items-center space-x-2 space-x-reverse">
                                <span class="px-2 py-1 rounded-full text-xs ${priorityColor[task.priority]}">${task.priority}</span>
                                <span class="px-2 py-1 rounded-full text-xs ${statusColor[task.status]}">${task.status}</span>
                            </div>
                        </div>
                        <div class="flex items-center justify-between text-xs text-gray-500">
                            <span>أرسلت بواسطة: ${task.createdBy}</span>
                            <span>${new Date(task.createdAt).toLocaleString('ar-EG')}</span>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function clearDailyTaskForm() {
            const form = document.getElementById('manager-daily-task-form');
            if (form) {
                form.reset();
                // Set default date to today
                const dateInput = document.getElementById('daily-task-date');
                if (dateInput) {
                    dateInput.value = new Date().toISOString().split('T')[0];
                }
            }
            hideTaskStatus();
        }

        function showTaskStatus(message, type) {
            // Create or update status element
            let statusEl = document.getElementById('task-status');
            if (!statusEl) {
                statusEl = document.createElement('div');
                statusEl.id = 'task-status';
                statusEl.className = 'mt-4 p-4 rounded-lg hidden';
                document.getElementById('manager-daily-task-form').parentNode.appendChild(statusEl);
            }

            statusEl.classList.remove('hidden');
            statusEl.classList.remove('bg-green-100', 'text-green-700', 'bg-red-100', 'text-red-700');
            
            if (type === 'success') {
                statusEl.classList.add('bg-green-100', 'text-green-700');
            } else {
                statusEl.classList.add('bg-red-100', 'text-red-700');
            }
            
            statusEl.textContent = message;

            // Hide message after 5 seconds
            setTimeout(() => {
                hideTaskStatus();
            }, 5000);
        }

        function hideTaskStatus() {
            const statusEl = document.getElementById('task-status');
            if (statusEl) {
                statusEl.classList.add('hidden');
            }
        }

        // Employee Daily Tasks
        function initializeEmployeeDailyTasks() {
            const refreshBtn = document.getElementById('refresh-tasks-btn');
            if (refreshBtn) {
                refreshBtn.addEventListener('click', function() {
                    loadEmployeeDailyTasks();
                });
            }
            
            // Load tasks on initialization
            loadEmployeeDailyTasks();
        }

        function loadEmployeeDailyTasks() {
            const container = document.getElementById('employee-daily-tasks-list');
            if (!container || !currentUser) return;

            const tasks = getDailyTasks();
            const today = new Date().toISOString().split('T')[0];
            const employeeTasks = tasks.filter(task => 
                task.date === today && 
                (task.assignee === 'all' || task.assignee === currentUser.name)
            );

            if (employeeTasks.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-tasks text-4xl mb-2"></i>
                        <p>لا توجد مهام مُرسلة لليوم</p>
                        <p class="text-sm">تحقق من وجود مهام جديدة</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = employeeTasks.map(task => {
                const priorityColor = {
                    'عادية': 'bg-gray-100 text-gray-800',
                    'عالية': 'bg-yellow-100 text-yellow-800',
                    'عاجلة': 'bg-red-100 text-red-800'
                };

                const statusColor = {
                    'معلقة': 'bg-yellow-100 text-yellow-800',
                    'قيد التنفيذ': 'bg-blue-100 text-blue-800',
                    'مكتملة': 'bg-green-100 text-green-800'
                };

                return `
                    <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div class="flex items-start justify-between mb-2">
                            <div class="flex-1">
                                <h4 class="font-semibold text-gray-800 mb-1">${task.title}</h4>
                                <div class="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 mb-2">
                                    <span><i class="fas fa-tag ml-1"></i> ${task.type}</span>
                                    <span><i class="fas fa-clock ml-1"></i> ${task.time}</span>
                                    <span><i class="fas fa-user ml-1"></i> ${task.createdBy}</span>
                                </div>
                                ${task.description ? `<p class="text-sm text-gray-600 mb-2">${task.description}</p>` : ''}
                            </div>
                            <div class="flex items-center space-x-2 space-x-reverse">
                                <span class="px-2 py-1 rounded-full text-xs ${priorityColor[task.priority]}">${task.priority}</span>
                                <span class="px-2 py-1 rounded-full text-xs ${statusColor[task.status]}">${task.status}</span>
                            </div>
                        </div>
                        <div class="flex items-center justify-between text-xs text-gray-500">
                            <span>تاريخ الإرسال: ${new Date(task.createdAt).toLocaleDateString('ar-EG')}</span>
                            <div class="flex items-center space-x-2 space-x-reverse">
                                <button class="text-blue-600 hover:text-blue-800" onclick="updateTaskStatus('${task.id}', 'قيد التنفيذ')">
                                    <i class="fas fa-play ml-1"></i>بدء
                                </button>
                                <button class="text-green-600 hover:text-green-800" onclick="updateTaskStatus('${task.id}', 'مكتملة')">
                                    <i class="fas fa-check ml-1"></i>إكمال
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function updateTaskStatus(taskId, newStatus) {
            const tasks = getDailyTasks();
            const taskIndex = tasks.findIndex(task => task.id == taskId);
            
            if (taskIndex !== -1) {
                tasks[taskIndex].status = newStatus;
                tasks[taskIndex].updatedAt = new Date().toISOString();
                localStorage.setItem('dailyTasks', JSON.stringify(tasks));
                
                // Reload tasks
                loadEmployeeDailyTasks();
                
                // Show success message
                const message = newStatus === 'مكتملة' ? 'تم إكمال المهمة بنجاح!' : 'تم بدء المهمة!';
                showEmployeeTaskStatus(message, 'success');
            }
        }

        function showEmployeeTaskStatus(message, type) {
            // Create or update status element
            let statusEl = document.getElementById('employee-task-status');
            if (!statusEl) {
                statusEl = document.createElement('div');
                statusEl.id = 'employee-task-status';
                statusEl.className = 'mt-4 p-4 rounded-lg hidden';
                document.getElementById('employee-daily-tasks-list').parentNode.appendChild(statusEl);
            }

            statusEl.classList.remove('hidden');
            statusEl.classList.remove('bg-green-100', 'text-green-700', 'bg-red-100', 'text-red-700');
            
            if (type === 'success') {
                statusEl.classList.add('bg-green-100', 'text-green-700');
            } else {
                statusEl.classList.add('bg-red-100', 'text-red-700');
            }
            
            statusEl.textContent = message;

            // Hide message after 3 seconds
            setTimeout(() => {
                statusEl.classList.add('hidden');
            }, 3000);
        }

        // Notifications System
        function initializeNotifications() {
            // Employee notification form
            const sendNotificationBtn = document.getElementById('send-notification-btn');
            const cancelNotificationBtn = document.getElementById('cancel-notification-btn');
            const employeeNotificationForm = document.getElementById('employee-notification-form');
            const selectAttachmentsBtn = document.getElementById('select-attachments-btn');
            const notificationAttachments = document.getElementById('notification-attachments');
            
            if (sendNotificationBtn) {
                sendNotificationBtn.addEventListener('click', function() {
                    toggleNotificationForm('employee');
                });
            }
            
            if (cancelNotificationBtn) {
                cancelNotificationBtn.addEventListener('click', function() {
                    toggleNotificationForm('employee', false);
                });
            }
            
            if (employeeNotificationForm) {
                employeeNotificationForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    sendEmployeeNotification();
                });
            }
            
            // File selection for employee
            if (selectAttachmentsBtn && notificationAttachments) {
                selectAttachmentsBtn.addEventListener('click', function() {
                    notificationAttachments.click();
                });
                
                notificationAttachments.addEventListener('change', function() {
                    previewSelectedFiles('selected-files-preview', this.files);
                });
            }
            
            // Manager notification form
            const sendManagerNotificationBtn = document.getElementById('send-manager-notification-btn');
            const cancelManagerNotificationBtn = document.getElementById('cancel-manager-notification-btn');
            const managerNotificationForm = document.getElementById('manager-notification-form');
            const selectManagerAttachmentsBtn = document.getElementById('select-manager-attachments-btn');
            const managerNotificationAttachments = document.getElementById('manager-notification-attachments');
            
            if (sendManagerNotificationBtn) {
                sendManagerNotificationBtn.addEventListener('click', function() {
                    toggleNotificationForm('manager');
                });
            }
            
            if (cancelManagerNotificationBtn) {
                cancelManagerNotificationBtn.addEventListener('click', function() {
                    toggleNotificationForm('manager', false);
                });
            }
            
            if (managerNotificationForm) {
                managerNotificationForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    sendManagerNotification();
                });
            }
            
            // File selection for manager
            if (selectManagerAttachmentsBtn && managerNotificationAttachments) {
                selectManagerAttachmentsBtn.addEventListener('click', function() {
                    managerNotificationAttachments.click();
                });
                
                managerNotificationAttachments.addEventListener('change', function() {
                    previewSelectedFiles('selected-manager-files-preview', this.files);
                });
            }
            
            // Load notifications
            loadEmployeeNotifications();
            loadManagerNotifications();
            
            // Initialize manager operations
            initializeManagerOperations();
        }

        function toggleNotificationForm(type, show = true) {
            const formId = type === 'employee' ? 'send-notification-form' : 'send-manager-notification-form';
            const form = document.getElementById(formId);
            
            if (form) {
                if (show) {
                    form.classList.remove('hidden');
                } else {
                    form.classList.add('hidden');
                    // Clear form
                    const formElement = form.querySelector('form');
                    if (formElement) {
                        formElement.reset();
                    }
                }
            }
        }

        function previewSelectedFiles(containerId, files) {
            const container = document.getElementById(containerId);
            if (!container) return;

            if (files.length === 0) {
                container.innerHTML = '';
                return;
            }

            container.innerHTML = Array.from(files).map(file => {
                const fileIcon = getFileIcon(file.type);
                const fileSize = formatFileSize(file.size);
                
                return `
                    <div class="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                        <div class="flex items-center space-x-2 space-x-reverse">
                            <i class="${fileIcon} text-lg"></i>
                            <div>
                                <p class="text-sm font-medium text-gray-800">${file.name}</p>
                                <p class="text-xs text-gray-500">${fileSize}</p>
                            </div>
                        </div>
                        <button type="button" class="text-red-500 hover:text-red-700" onclick="removeSelectedFile('${containerId}', '${file.name}')">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;
            }).join('');
        }

        function getFileIcon(fileType) {
            if (fileType.includes('pdf')) return 'fas fa-file-pdf text-red-500';
            if (fileType.includes('word') || fileType.includes('document')) return 'fas fa-file-word text-blue-500';
            if (fileType.includes('excel') || fileType.includes('spreadsheet')) return 'fas fa-file-excel text-green-500';
            if (fileType.includes('image')) return 'fas fa-file-image text-purple-500';
            if (fileType.includes('text')) return 'fas fa-file-alt text-gray-500';
            return 'fas fa-file text-gray-500';
        }

        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        function removeSelectedFile(containerId, fileName) {
            const container = document.getElementById(containerId);
            if (!container) return;

            // Find and remove the file element
            const fileElements = container.querySelectorAll('div');
            fileElements.forEach(element => {
                if (element.textContent.includes(fileName)) {
                    element.remove();
                }
            });

            // If no files left, clear the container
            if (container.children.length === 0) {
                container.innerHTML = '';
            }
        }

        function sendEmployeeNotification() {
            const type = document.getElementById('notification-type').value;
            const subject = document.getElementById('notification-subject').value;
            const message = document.getElementById('notification-message').value;
            const attachments = document.getElementById('notification-attachments').files;

            if (!subject || !message) {
                showNotificationStatus('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }

            // Process attachments
            const attachmentData = [];
            if (attachments && attachments.length > 0) {
                for (let i = 0; i < attachments.length; i++) {
                    const file = attachments[i];
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        attachmentData.push({
                            name: file.name,
                            type: file.type,
                            size: file.size,
                            data: e.target.result
                        });
                    };
                    reader.readAsDataURL(file);
                }
            }

            const notification = {
                id: Date.now(),
                from: currentUser?.name || 'موظف',
                fromId: currentUser?.id || 'EMP001',
                to: 'manager',
                toId: 'manager',
                type: type,
                subject: subject,
                message: message,
                attachments: attachmentData,
                timestamp: new Date().toISOString(),
                read: false,
                priority: 'normal'
            };

            saveNotification(notification);
            showNotificationStatus('تم إرسال الإشعار بنجاح!', 'success');
            toggleNotificationForm('employee', false);
            loadEmployeeNotifications();
        }

        function sendManagerNotification() {
            const recipient = document.getElementById('manager-notification-recipient').value;
            const type = document.getElementById('manager-notification-type').value;
            const subject = document.getElementById('manager-notification-subject').value;
            const message = document.getElementById('manager-notification-message').value;
            const attachments = document.getElementById('manager-notification-attachments').files;

            if (!subject || !message) {
                showNotificationStatus('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }

            // Process attachments
            const attachmentData = [];
            if (attachments && attachments.length > 0) {
                for (let i = 0; i < attachments.length; i++) {
                    const file = attachments[i];
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        attachmentData.push({
                            name: file.name,
                            type: file.type,
                            size: file.size,
                            data: e.target.result
                        });
                    };
                    reader.readAsDataURL(file);
                }
            }

            const notification = {
                id: Date.now(),
                from: 'مدير الفرع',
                fromId: 'manager',
                to: recipient === 'all' ? 'all_employees' : recipient,
                toId: recipient === 'all' ? 'all_employees' : recipient,
                type: type,
                subject: subject,
                message: message,
                attachments: attachmentData,
                timestamp: new Date().toISOString(),
                read: false,
                priority: type === 'تحذير' ? 'high' : 'normal'
            };

            saveNotification(notification);
            showNotificationStatus('تم إرسال الإشعار بنجاح!', 'success');
            toggleNotificationForm('manager', false);
            loadManagerNotifications();
            
            // مزامنة مع مدير المنطقة
            syncWithAreaManager();
        }

        function saveNotification(notification) {
            const notifications = getNotifications();
            notifications.unshift(notification);
            localStorage.setItem('notifications', JSON.stringify(notifications));
        }

        function getNotifications() {
            try {
                return JSON.parse(localStorage.getItem('notifications') || '[]');
            } catch (e) {
                return [];
            }
        }

        function loadEmployeeNotifications() {
            const container = document.getElementById('employee-notifications-list');
            if (!container || !currentUser) return;

            const notifications = getNotifications();
            const employeeNotifications = notifications.filter(notif => 
                notif.toId === currentUser.id || notif.toId === 'all_employees'
            );

            if (employeeNotifications.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-bell-slash text-4xl mb-2"></i>
                        <p>لا توجد إشعارات جديدة</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = employeeNotifications.map(notif => {
                const typeColor = {
                    'مهمة': 'bg-blue-100 text-blue-800',
                    'تذكير': 'bg-yellow-100 text-yellow-800',
                    'تعميم': 'bg-green-100 text-green-800',
                    'تحذير': 'bg-red-100 text-red-800',
                    'أخرى': 'bg-gray-100 text-gray-800'
                };

                return `
                    <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow ${!notif.read ? 'border-l-4 border-l-blue-500' : ''}">
                        <div class="flex items-start justify-between mb-2">
                            <div class="flex-1">
                                <h4 class="font-semibold text-gray-800 mb-1">${notif.subject}</h4>
                                <p class="text-sm text-gray-600 mb-2">${notif.message}</p>
                                ${notif.attachments && notif.attachments.length > 0 ? `
                                    <div class="mt-2 mb-2">
                                        <p class="text-xs text-gray-500 mb-1">المرفقات:</p>
                                        <div class="flex flex-wrap gap-2">
                                            ${notif.attachments.map(att => `
                                                <div class="flex items-center space-x-1 space-x-reverse bg-gray-100 rounded-lg px-2 py-1">
                                                    <i class="${getFileIcon(att.type)}"></i>
                                                    <span class="text-xs">${att.name}</span>
                                                    <div class="flex items-center space-x-1 space-x-reverse">
                                                        <button onclick="downloadAttachment('${att.name}', '${att.data}')" class="text-blue-600 hover:text-blue-800 p-1" title="تحميل">
                                                            <i class="fas fa-download text-xs"></i>
                                                        </button>
                                                        <button onclick="printAttachment('${att.name}', '${att.data}', '${att.type}')" class="text-green-600 hover:text-green-800 p-1" title="طباعة">
                                                            <i class="fas fa-print text-xs"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                ` : ''}
                                <div class="flex items-center space-x-2 space-x-reverse text-xs text-gray-500">
                                    <span><i class="fas fa-user ml-1"></i> ${notif.from}</span>
                                    <span><i class="fas fa-clock ml-1"></i> ${new Date(notif.timestamp).toLocaleString('ar-EG')}</span>
                                </div>
                            </div>
                            <div class="flex items-center space-x-2 space-x-reverse">
                                <span class="px-2 py-1 rounded-full text-xs ${typeColor[notif.type]}">${notif.type}</span>
                                ${!notif.read ? '<span class="w-2 h-2 bg-blue-500 rounded-full"></span>' : ''}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function loadManagerNotifications() {
            const container = document.getElementById('manager-alerts');
            if (!container) return;

            const notifications = getNotifications();
            const managerNotifications = notifications.filter(notif => 
                notif.toId === 'manager'
            );

            if (managerNotifications.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-bell-slash text-4xl mb-2"></i>
                        <p>لا توجد إشعارات جديدة</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = managerNotifications.map(notif => {
                const typeColor = {
                    'عمليات': 'bg-blue-100 text-blue-800',
                    'مشكلة': 'bg-red-100 text-red-800',
                    'طلب': 'bg-yellow-100 text-yellow-800',
                    'اقتراح': 'bg-green-100 text-green-800',
                    'أخرى': 'bg-gray-100 text-gray-800'
                };

                return `
                    <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow ${!notif.read ? 'border-l-4 border-l-red-500' : ''}">
                        <div class="flex items-start justify-between mb-2">
                            <div class="flex-1">
                                <h4 class="font-semibold text-gray-800 mb-1">${notif.subject}</h4>
                                <p class="text-sm text-gray-600 mb-2">${notif.message}</p>
                                ${notif.attachments && notif.attachments.length > 0 ? `
                                    <div class="mt-2 mb-2">
                                        <p class="text-xs text-gray-500 mb-1">المرفقات:</p>
                                        <div class="flex flex-wrap gap-2">
                                            ${notif.attachments.map(att => `
                                                <div class="flex items-center space-x-1 space-x-reverse bg-gray-100 rounded-lg px-2 py-1">
                                                    <i class="${getFileIcon(att.type)}"></i>
                                                    <span class="text-xs">${att.name}</span>
                                                    <div class="flex items-center space-x-1 space-x-reverse">
                                                        <button onclick="downloadAttachment('${att.name}', '${att.data}')" class="text-blue-600 hover:text-blue-800 p-1" title="تحميل">
                                                            <i class="fas fa-download text-xs"></i>
                                                        </button>
                                                        <button onclick="printAttachment('${att.name}', '${att.data}', '${att.type}')" class="text-green-600 hover:text-green-800 p-1" title="طباعة">
                                                            <i class="fas fa-print text-xs"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                ` : ''}
                                <div class="flex items-center space-x-2 space-x-reverse text-xs text-gray-500">
                                    <span><i class="fas fa-user ml-1"></i> ${notif.from}</span>
                                    <span><i class="fas fa-clock ml-1"></i> ${new Date(notif.timestamp).toLocaleString('ar-EG')}</span>
                                </div>
                            </div>
                            <div class="flex items-center space-x-2 space-x-reverse">
                                <span class="px-2 py-1 rounded-full text-xs ${typeColor[notif.type]}">${notif.type}</span>
                                ${!notif.read ? '<span class="w-2 h-2 bg-red-500 rounded-full"></span>' : ''}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function downloadAttachment(fileName, fileData) {
            try {
                // Create a temporary link element
                const link = document.createElement('a');
                link.href = fileData;
                link.download = fileName;
                
                // Append to body, click, and remove
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                showNotificationStatus(`تم تحميل الملف: ${fileName}`, 'success');
            } catch (error) {
                showNotificationStatus('خطأ في تحميل الملف', 'error');
                console.error('Download error:', error);
            }
        }

        function printAttachment(fileName, fileData, fileType) {
            try {
                // Check if file type is printable
                if (!isPrintableFile(fileType)) {
                    showNotificationStatus('هذا النوع من الملفات غير قابل للطباعة', 'error');
                    return;
                }

                // Create print preview
                const printWindow = window.open('', '_blank', 'width=800,height=600');
                
                if (fileType.includes('image')) {
                    // Print image
                    printWindow.document.write(`
                        <html>
                            <head>
                                <title>طباعة: ${fileName}</title>
                                <style>
                                    body { margin: 0; padding: 20px; text-align: center; font-family: Arial, sans-serif; }
                                    img { max-width: 100%; max-height: 80vh; border: 1px solid #ccc; }
                                    .header { margin-bottom: 20px; }
                                    .footer { margin-top: 20px; font-size: 12px; color: #666; }
                                    @media print {
                                        body { margin: 0; }
                                        .no-print { display: none; }
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="header no-print">
                                    <h2>طباعة الملف: ${fileName}</h2>
                                    <button onclick="window.print()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">طباعة</button>
                                    <button onclick="window.close()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer; margin-right: 10px;">إغلاق</button>
                                </div>
                                <img src="${fileData}" alt="${fileName}">
                                <div class="footer">
                                    <p>تم طباعة الملف: ${fileName}</p>
                                    <p>تاريخ الطباعة: ${new Date().toLocaleString('ar-EG')}</p>
                                </div>
                            </body>
                        </html>
                    `);
                } else if (fileType.includes('pdf')) {
                    // Print PDF
                    printWindow.document.write(`
                        <html>
                            <head>
                                <title>طباعة: ${fileName}</title>
                                <style>
                                    body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
                                    .header { margin-bottom: 20px; }
                                    .footer { margin-top: 20px; font-size: 12px; color: #666; }
                                    @media print {
                                        body { margin: 0; }
                                        .no-print { display: none; }
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="header no-print">
                                    <h2>طباعة الملف: ${fileName}</h2>
                                    <button onclick="window.print()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">طباعة</button>
                                    <button onclick="window.close()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer; margin-right: 10px;">إغلاق</button>
                                </div>
                                <iframe src="${fileData}" width="100%" height="600px" style="border: none;"></iframe>
                                <div class="footer">
                                    <p>تم طباعة الملف: ${fileName}</p>
                                    <p>تاريخ الطباعة: ${new Date().toLocaleString('ar-EG')}</p>
                                </div>
                            </body>
                        </html>
                    `);
                } else {
                    // Print text-based files
                    const textContent = atob(fileData.split(',')[1]);
                    printWindow.document.write(`
                        <html>
                            <head>
                                <title>طباعة: ${fileName}</title>
                                <style>
                                    body { margin: 0; padding: 20px; font-family: Arial, sans-serif; direction: rtl; }
                                    .header { margin-bottom: 20px; }
                                    .footer { margin-top: 20px; font-size: 12px; color: #666; }
                                    pre { white-space: pre-wrap; word-wrap: break-word; }
                                    @media print {
                                        body { margin: 0; }
                                        .no-print { display: none; }
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="header no-print">
                                    <h2>طباعة الملف: ${fileName}</h2>
                                    <button onclick="window.print()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">طباعة</button>
                                    <button onclick="window.close()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer; margin-right: 10px;">إغلاق</button>
                                </div>
                                <pre>${textContent}</pre>
                                <div class="footer">
                                    <p>تم طباعة الملف: ${fileName}</p>
                                    <p>تاريخ الطباعة: ${new Date().toLocaleString('ar-EG')}</p>
                                </div>
                            </body>
                        </html>
                    `);
                }
                
                printWindow.document.close();
                showNotificationStatus(`تم فتح نافذة الطباعة للملف: ${fileName}`, 'success');
                
            } catch (error) {
                showNotificationStatus('خطأ في طباعة الملف', 'error');
                console.error('Print error:', error);
            }
        }

        function isPrintableFile(fileType) {
            const printableTypes = [
                'image/jpeg', 'image/jpg', 'image/png', 'image/gif',
                'application/pdf',
                'text/plain', 'text/html',
                'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ];
            return printableTypes.some(type => fileType.includes(type));
        }

        function showNotificationStatus(message, type) {
            // Create or update status element
            let statusEl = document.getElementById('notification-status');
            if (!statusEl) {
                statusEl = document.createElement('div');
                statusEl.id = 'notification-status';
                statusEl.className = 'fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 hidden';
                document.body.appendChild(statusEl);
            }

            statusEl.classList.remove('hidden');
            statusEl.classList.remove('bg-green-100', 'text-green-700', 'bg-red-100', 'text-red-700');
            
            if (type === 'success') {
                statusEl.classList.add('bg-green-100', 'text-green-700');
            } else {
                statusEl.classList.add('bg-red-100', 'text-red-700');
            }
            
            statusEl.textContent = message;

            // Hide message after 3 seconds
            setTimeout(() => {
                statusEl.classList.add('hidden');
            }, 3000);
        }

        // Manager Operations Management
        function initializeManagerOperations() {
            const employeeFilter = document.getElementById('manager-operations-employee-filter');
            const periodFilter = document.getElementById('manager-operations-period-filter');
            const refreshBtn = document.getElementById('refresh-manager-operations-btn');

            if (employeeFilter) {
                employeeFilter.addEventListener('change', function() {
                    loadManagerOperations();
                });
            }

            if (periodFilter) {
                periodFilter.addEventListener('change', function() {
                    loadManagerOperations();
                });
            }

            if (refreshBtn) {
                refreshBtn.addEventListener('click', function() {
                    loadManagerOperations();
                });
            }

            // Load initial data
            loadManagerOperations();
        }

        function loadManagerOperations() {
            const employeeFilter = document.getElementById('manager-operations-employee-filter')?.value || 'all';
            const periodFilter = document.getElementById('manager-operations-period-filter')?.value || 'today';
            
            // Get all operations from all employees
            const allOperations = getAllEmployeesOperations();
            
            // Filter by employee
            let filteredOperations = allOperations;
            if (employeeFilter !== 'all') {
                filteredOperations = allOperations.filter(op => op.employeeName === employeeFilter);
            }

            // Filter by period
            if (periodFilter !== 'all') {
                const now = new Date();
                filteredOperations = filteredOperations.filter(op => {
                    const opDate = new Date(op.date);
                    switch (periodFilter) {
                        case 'today':
                            return opDate.toDateString() === now.toDateString();
                        case 'week':
                            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                            return opDate >= weekAgo;
                        case 'month':
                            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                            return opDate >= monthAgo;
                        default:
                            return true;
                    }
                });
            }

            // Update operations breakdown
            updateManagerOperationsBreakdown(filteredOperations);
            
            // Update operations table
            updateManagerOperationsTable(filteredOperations);
        }

        function updateManagerOperationsBreakdown(operations) {
            const container = document.getElementById('manager-ops-breakdown');
            if (!container) return;

            // Calculate breakdown by system
            const breakdown = {};
            operations.forEach(op => {
                if (!breakdown[op.system]) {
                    breakdown[op.system] = { operations: 0, points: 0, employees: new Set() };
                }
                breakdown[op.system].operations += op.operations;
                breakdown[op.system].points += op.points;
                breakdown[op.system].employees.add(op.employeeName);
            });

            // Convert to array and sort by operations count
            const breakdownArray = Object.entries(breakdown)
                .map(([system, data]) => ({
                    system,
                    operations: data.operations,
                    points: data.points,
                    employees: data.employees.size
                }))
                .sort((a, b) => b.operations - a.operations);

            if (breakdownArray.length === 0) {
                container.innerHTML = `
                    <div class="col-span-full text-center py-8 text-gray-500">
                        <i class="fas fa-chart-bar text-4xl mb-2"></i>
                        <p>لا توجد عمليات مسجلة</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = breakdownArray.map(item => `
                <div class="bg-white border border-gray-200 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-2">
                        <h3 class="font-semibold text-gray-800">${item.system}</h3>
                        <span class="text-sm text-gray-500">${item.employees} موظف</span>
                    </div>
                    <div class="space-y-2">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">عدد العمليات:</span>
                            <span class="font-semibold text-blue-600">${item.operations}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">النقاط:</span>
                            <span class="font-semibold text-green-600">${item.points}</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-blue-600 h-2 rounded-full" style="width: ${Math.min(100, (item.operations / Math.max(...breakdownArray.map(i => i.operations))) * 100)}%"></div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function updateManagerOperationsTable(operations) {
            const tbody = document.getElementById('manager-operations-table-body');
            if (!tbody) return;

            if (operations.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="7" class="px-4 py-8 text-center text-gray-500">
                            <i class="fas fa-table text-4xl mb-2"></i>
                            <p>لا توجد عمليات مسجلة</p>
                        </td>
                    </tr>
                `;
                return;
            }

            tbody.innerHTML = operations.slice(0, 20).map(op => `
                <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3">
                        <div class="flex items-center space-x-2 space-x-reverse">
                            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <i class="fas fa-user text-blue-600 text-sm"></i>
                            </div>
                            <span class="font-medium text-gray-800">${op.employeeName}</span>
                        </div>
                    </td>
                    <td class="px-4 py-3">
                        <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">${op.system}</span>
                    </td>
                    <td class="px-4 py-3 font-semibold text-gray-800">${op.operations}</td>
                    <td class="px-4 py-3">
                        <span class="text-green-600 font-semibold">${op.points}</span>
                    </td>
                    <td class="px-4 py-3 text-gray-600">${op.date}</td>
                    <td class="px-4 py-3 text-gray-600">${op.time}</td>
                    <td class="px-4 py-3 text-gray-600">${op.notes || '-'}</td>
                </tr>
            `).join('');
        }

        // Activity Dashboard Management
        function initializeActivityDashboard() {
            const timeFilter = document.getElementById('activity-time-filter');
            const refreshBtn = document.getElementById('refresh-activity-btn');

            if (timeFilter) {
                timeFilter.addEventListener('change', function() {
                    loadActivityDashboard();
                });
            }

            if (refreshBtn) {
                refreshBtn.addEventListener('click', function() {
                    loadActivityDashboard();
                });
            }

            // Load initial data
            loadActivityDashboard();
        }

        function loadActivityDashboard() {
            const timeFilter = document.getElementById('activity-time-filter')?.value || 'today';
            
            // Get all operations from all employees
            const allOperations = getAllEmployeesOperations();
            
            // Filter by time period
            let filteredOperations = allOperations;
            if (timeFilter !== 'all') {
                const now = new Date();
                filteredOperations = allOperations.filter(op => {
                    const opDate = new Date(op.date);
                    switch (timeFilter) {
                        case 'today':
                            return opDate.toDateString() === now.toDateString();
                        case 'week':
                            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                            return opDate >= weekAgo;
                        case 'month':
                            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                            return opDate >= monthAgo;
                        default:
                            return true;
                    }
                });
            }

            // Update all dashboard components
            updateActivityStats(filteredOperations);
            updateActivityTimeline(filteredOperations);
            updateEmployeePerformanceTable(filteredOperations);
            updateTopPerformers(filteredOperations);
            updateRecentOperations(filteredOperations);
        }

        function updateActivityStats(operations) {
            // Ensure operations is an array
            if (!Array.isArray(operations)) {
                operations = [];
            }

            // Calculate basic stats with safety checks
            const totalOps = operations.reduce((sum, op) => {
                return sum + cleanValue(op.operations);
            }, 0);
            
            const totalPoints = operations.reduce((sum, op) => {
                return sum + cleanValue(op.points);
            }, 0);
            
            const uniqueEmployees = new Set(operations.map(op => op.employeeName).filter(name => name && name !== 'undefined'));
            const activeEmployees = uniqueEmployees.size;
            
            // Calculate average performance per employee with safety checks
            const avgPerformance = safeAverage(totalPoints, activeEmployees);
            
            // Calculate efficiency metrics with safety checks
            const avgOpsPerEmployee = safeAverage(totalOps, activeEmployees);
            const avgPointsPerOperation = safeAverage(totalPoints, totalOps);
            
            // Calculate system diversity
            const uniqueSystems = new Set(operations.map(op => op.system || op.systemName || 'غير محدد').filter(s => s && s !== 'undefined'));
            const systemDiversity = uniqueSystems.size;
            
            // Calculate time-based metrics
            const timeFilter = document.getElementById('activity-time-filter')?.value || 'today';
            let timeRange = 1; // days
            
            switch (timeFilter) {
                case 'today':
                    timeRange = 1;
                    break;
                case 'week':
                    timeRange = 7;
                    break;
                case 'month':
                    timeRange = 30;
                    break;
            }
            
            const dailyAvgOps = safeAverage(totalOps, timeRange);
            const dailyAvgPoints = safeAverage(totalPoints, timeRange);

            // Calculate changes (compared to previous period)
            const previousOps = getPreviousPeriodOperations(timeFilter);
            const prevTotalOps = previousOps.reduce((sum, op) => {
                return sum + cleanValue(op.operations);
            }, 0);
            
            const prevTotalPoints = previousOps.reduce((sum, op) => {
                return sum + cleanValue(op.points);
            }, 0);
            
            const prevActiveEmployees = new Set(previousOps.map(op => op.employeeName).filter(name => name && name !== 'undefined')).size;
            const prevAvgPerformance = safeAverage(prevTotalPoints, prevActiveEmployees);

            // Calculate percentage changes with better handling
            const opsChange = safePercentage(totalOps - prevTotalOps, prevTotalOps, totalOps > 0 ? 100 : 0);
            const pointsChange = safePercentage(totalPoints - prevTotalPoints, prevTotalPoints, totalPoints > 0 ? 100 : 0);
            const activeChange = safePercentage(activeEmployees - prevActiveEmployees, prevActiveEmployees, activeEmployees > 0 ? 100 : 0);
            const performanceChange = safePercentage(avgPerformance - prevAvgPerformance, prevAvgPerformance, avgPerformance > 0 ? 100 : 0);

            // Update main stats with safety checks
            updateElement('total-operations-count', totalOps.toLocaleString());
            updateElement('total-points-count', totalPoints.toLocaleString());
            updateElement('active-employees-count', activeEmployees);
            updateElement('avg-performance-count', avgPerformance + '%');

            // Update changes with better formatting and safety checks
            updateElement('operations-change', (opsChange >= 0 ? '+' : '') + opsChange + '%');
            updateElement('points-change', (pointsChange >= 0 ? '+' : '') + pointsChange + '%');
            updateElement('active-change', (activeChange >= 0 ? '+' : '') + activeChange + '%');
            updateElement('performance-change', (performanceChange >= 0 ? '+' : '') + performanceChange + '%');
            
            // Store additional metrics for other functions with safety checks
            window.currentActivityMetrics = {
                totalOps: cleanValue(totalOps),
                totalPoints: cleanValue(totalPoints),
                activeEmployees: cleanValue(activeEmployees),
                avgPerformance: cleanValue(avgPerformance),
                avgOpsPerEmployee: cleanValue(avgOpsPerEmployee),
                avgPointsPerOperation: cleanValue(avgPointsPerOperation),
                systemDiversity: cleanValue(systemDiversity),
                dailyAvgOps: cleanValue(dailyAvgOps),
                dailyAvgPoints: cleanValue(dailyAvgPoints),
                opsChange: cleanValue(opsChange),
                pointsChange: cleanValue(pointsChange),
                activeChange: cleanValue(activeChange),
                performanceChange: cleanValue(performanceChange)
            };
        }

        function updateActivityTimeline(operations) {
            const container = document.getElementById('activity-timeline');
            if (!container) return;

            // Sort operations by timestamp (newest first)
            const sortedOps = operations
                .sort((a, b) => new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date))
                .slice(0, 15);

            if (sortedOps.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-clock text-4xl mb-2"></i>
                        <p>لا توجد أنشطة مسجلة</p>
                    </div>
                `;
                return;
            }

            // Group operations by time periods
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
            const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

            const groupedOps = {
                today: [],
                yesterday: [],
                thisWeek: [],
                older: []
            };

            sortedOps.forEach(op => {
                const opDate = new Date(op.timestamp || op.date);
                if (opDate >= today) {
                    groupedOps.today.push(op);
                } else if (opDate >= yesterday) {
                    groupedOps.yesterday.push(op);
                } else if (opDate >= thisWeek) {
                    groupedOps.thisWeek.push(op);
                } else {
                    groupedOps.older.push(op);
                }
            });

            container.innerHTML = Object.entries(groupedOps).map(([period, ops]) => {
                if (ops.length === 0) return '';

                const periodLabels = {
                    today: 'اليوم',
                    yesterday: 'أمس',
                    thisWeek: 'هذا الأسبوع',
                    older: 'أقدم'
                };

                const periodColors = {
                    today: 'bg-green-50 border-green-200',
                    yesterday: 'bg-blue-50 border-blue-200',
                    thisWeek: 'bg-yellow-50 border-yellow-200',
                    older: 'bg-gray-50 border-gray-200'
                };

                return `
                    <div class="mb-4">
                        <h4 class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <i class="fas fa-calendar-day text-xs ml-2"></i>
                            ${periodLabels[period]} (${ops.length})
                        </h4>
                        <div class="space-y-2">
                            ${ops.map(op => {
                                const timeAgo = getTimeAgo(new Date(op.timestamp || op.date));
                                const systemIcon = getSystemIcon(op.system || op.systemName);
                                const operations = cleanValue(op.operations);
                                const points = cleanValue(op.points);
                                const efficiency = safeAverage(points, operations);
                                
                                return `
                                    <div class="flex items-center space-x-3 space-x-reverse p-3 ${periodColors[period]} rounded-lg hover:shadow-md transition-all duration-200 border">
                                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <i class="${systemIcon} text-blue-600"></i>
                                        </div>
                                        <div class="flex-1">
                                            <div class="flex items-center justify-between">
                                                <h4 class="font-medium text-gray-800">${op.employeeName}</h4>
                                                <span class="text-xs text-gray-500">${timeAgo}</span>
                                            </div>
                                            <p class="text-sm text-gray-600">
                                                سجل ${(op.operations || 0).toLocaleString()} عملية في نظام ${op.system || op.systemName || 'غير محدد'} 
                                                <span class="text-green-600 font-semibold">(${(op.points || 0).toLocaleString()} نقطة)</span>
                                            </p>
                                            <div class="flex items-center justify-between mt-1">
                                                <div class="text-xs text-gray-500">
                                                    كفاءة: ${efficiency} نقطة/عملية
                                                </div>
                                                <div class="text-xs text-gray-500">
                                                    ${op.time || '--:--'}
                                                </div>
                                            </div>
                                            ${op.notes ? `<p class="text-xs text-gray-500 mt-1 bg-white bg-opacity-50 p-2 rounded">${op.notes}</p>` : ''}
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `;
            }).join('');
        }

        function getPreviousPeriodOperations(currentFilter) {
            const allOperations = getAllEmployeesOperations();
            const now = new Date();
            
            switch (currentFilter) {
                case 'today':
                    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                    return allOperations.filter(op => {
                        const opDate = new Date(op.date);
                        return opDate.toDateString() === yesterday.toDateString();
                    });
                case 'week':
                    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
                    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return allOperations.filter(op => {
                        const opDate = new Date(op.date);
                        return opDate >= twoWeeksAgo && opDate < oneWeekAgo;
                    });
                case 'month':
                    const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
                    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                    return allOperations.filter(op => {
                        const opDate = new Date(op.date);
                        return opDate >= twoMonthsAgo && opDate < oneMonthAgo;
                    });
                default:
                    return [];
            }
        }

        function updateEmployeePerformanceTable(operations) {
            const container = document.getElementById('employee-performance-table');
            if (!container) return;

            // Calculate performance by employee with enhanced metrics
            const employeeStats = {};
            const timeFilter = document.getElementById('activity-time-filter')?.value || 'today';
            const timeRange = timeFilter === 'today' ? 1 : timeFilter === 'week' ? 7 : 30;
            
            operations.forEach(op => {
                // Skip if no employee name or invalid data
                if (!op.employeeName || op.employeeName === 'undefined' || op.employeeName === 'null') return;
                
                if (!employeeStats[op.employeeName]) {
                    employeeStats[op.employeeName] = {
                        name: op.employeeName,
                        operations: 0,
                        points: 0,
                        systems: new Set(),
                        lastActivity: null,
                        dailyOps: 0,
                        dailyPoints: 0,
                        efficiency: 0,
                        consistency: 0,
                        activityDays: new Set()
                    };
                }
                
                const opDate = new Date(op.date);
                const operations = cleanValue(op.operations);
                const points = cleanValue(op.points);
                
                employeeStats[op.employeeName].operations += operations;
                employeeStats[op.employeeName].points += points;
                
                const systemName = op.system || op.systemName || 'غير محدد';
                if (systemName && systemName !== 'undefined' && systemName !== 'null') {
                    employeeStats[op.employeeName].systems.add(systemName);
                }
                
                if (opDate && !isNaN(opDate.getTime())) {
                    employeeStats[op.employeeName].activityDays.add(opDate.toDateString());
                }
                
                if (!employeeStats[op.employeeName].lastActivity || 
                    new Date(op.timestamp || op.date) > new Date(employeeStats[op.employeeName].lastActivity)) {
                    employeeStats[op.employeeName].lastActivity = op.timestamp || op.date;
                }
            });

            // Calculate additional metrics for each employee
            Object.values(employeeStats).forEach(emp => {
                const operations = cleanValue(emp.operations);
                const points = cleanValue(emp.points);
                const activityDays = cleanValue(emp.activityDays.size);
                
                emp.dailyOps = safeAverage(operations, timeRange);
                emp.dailyPoints = safeAverage(points, timeRange);
                emp.efficiency = safeAverage(points, operations);
                emp.consistency = safePercentage(activityDays, timeRange);
            });

            // Convert to array and sort by points
            const employeeList = Object.values(employeeStats)
                .sort((a, b) => b.points - a.points);

            if (employeeList.length === 0) {
                container.innerHTML = `
                    <tr>
                        <td colspan="6" class="px-6 py-8 text-center text-gray-500">
                            <i class="fas fa-users text-4xl mb-2"></i>
                            <p>لا توجد بيانات أداء للموظفين</p>
                        </td>
                    </tr>
                `;
                return;
            }

            container.innerHTML = employeeList.map(emp => {
                const performancePercentage = safePercentage(emp.points, 100);
                const lastActivityTime = emp.lastActivity ? getTimeAgo(new Date(emp.lastActivity)) : 'غير محدد';
                const performanceColor = performancePercentage >= 80 ? 'text-green-600' : 
                                       performancePercentage >= 60 ? 'text-yellow-600' : 'text-red-600';
                const consistencyColor = emp.consistency >= 80 ? 'text-green-500' : 
                                       emp.consistency >= 60 ? 'text-yellow-500' : 'text-red-500';
                
                return `
                    <tr class="hover:bg-gray-50 transition-colors">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center ml-3">
                                    <i class="fas fa-user text-blue-600"></i>
                                </div>
                                <div>
                                    <div class="text-sm font-medium text-gray-900">${emp.name}</div>
                                    <div class="text-xs text-gray-500">
                                        ${emp.systems.size} نظام • ${emp.consistency}% انتظام
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div>
                                <span class="font-semibold">${emp.operations.toLocaleString()}</span>
                                <div class="text-xs text-gray-500">${emp.dailyOps}/يوم</div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div>
                                <span class="font-semibold text-green-600">${emp.points.toLocaleString()}</span>
                                <div class="text-xs text-gray-500">${emp.dailyPoints}/يوم</div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div class="max-w-xs truncate" title="${Array.from(emp.systems).join(', ')}">
                                ${Array.from(emp.systems).join(', ')}
                            </div>
                            <div class="text-xs text-gray-400">كفاءة: ${emp.efficiency} نقطة/عملية</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="w-full bg-gray-200 rounded-full h-2 ml-2">
                                    <div class="bg-blue-600 h-2 rounded-full" style="width: ${Math.min(100, performancePercentage)}%"></div>
                                </div>
                                <span class="text-sm font-medium ${performanceColor}">${performancePercentage}%</span>
                            </div>
                            <div class="text-xs ${consistencyColor} mt-1">انتظام: ${emp.consistency}%</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div>${lastActivityTime}</div>
                            <div class="text-xs text-gray-400">${emp.activityDays.size} يوم نشاط</div>
                        </td>
                    </tr>
                `;
            }).join('');
        }

        function updateTopPerformers(operations) {
            const container = document.getElementById('top-performers');
            if (!container) return;

            // Calculate performance by employee with enhanced metrics
            const employeeStats = {};
            const timeFilter = document.getElementById('activity-time-filter')?.value || 'today';
            const timeRange = timeFilter === 'today' ? 1 : timeFilter === 'week' ? 7 : 30;
            
            operations.forEach(op => {
                // Skip if no employee name or invalid data
                if (!op.employeeName || op.employeeName === 'undefined' || op.employeeName === 'null') return;
                
                if (!employeeStats[op.employeeName]) {
                    employeeStats[op.employeeName] = {
                        name: op.employeeName,
                        operations: 0,
                        points: 0,
                        systems: new Set(),
                        lastActivity: null,
                        dailyOps: 0,
                        dailyPoints: 0,
                        efficiency: 0,
                        consistency: 0,
                        activityDays: new Set()
                    };
                }
                
                const opDate = new Date(op.date);
                const operations = cleanValue(op.operations);
                const points = cleanValue(op.points);
                
                employeeStats[op.employeeName].operations += operations;
                employeeStats[op.employeeName].points += points;
                
                const systemName = op.system || op.systemName || 'غير محدد';
                if (systemName && systemName !== 'undefined' && systemName !== 'null') {
                    employeeStats[op.employeeName].systems.add(systemName);
                }
                
                if (opDate && !isNaN(opDate.getTime())) {
                    employeeStats[op.employeeName].activityDays.add(opDate.toDateString());
                }
                
                if (!employeeStats[op.employeeName].lastActivity || 
                    new Date(op.timestamp || op.date) > new Date(employeeStats[op.employeeName].lastActivity)) {
                    employeeStats[op.employeeName].lastActivity = op.timestamp || op.date;
                }
            });

            // Calculate additional metrics for each employee
            Object.values(employeeStats).forEach(emp => {
                const operations = cleanValue(emp.operations);
                const points = cleanValue(emp.points);
                const activityDays = cleanValue(emp.activityDays.size);
                
                emp.dailyOps = safeAverage(operations, timeRange);
                emp.dailyPoints = safeAverage(points, timeRange);
                emp.efficiency = safeAverage(points, operations);
                emp.consistency = safePercentage(activityDays, timeRange);
            });

            // Sort by points and get top 3
            const topPerformers = Object.values(employeeStats)
                .sort((a, b) => b.points - a.points)
                .slice(0, 3);

            if (topPerformers.length === 0) {
                container.innerHTML = `
                    <div class="col-span-full text-center py-8 text-gray-500">
                        <i class="fas fa-trophy text-4xl mb-2"></i>
                        <p>لا توجد بيانات أداء</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = topPerformers.map((performer, index) => {
                const rankIcon = ['🥇', '🥈', '🥉'][index];
                const rankColor = ['from-yellow-400 to-yellow-600', 'from-gray-300 to-gray-500', 'from-orange-400 to-orange-600'][index];
                const performancePercentage = Math.round((performer.points / 100) * 100);
                const lastActivityTime = performer.lastActivity ? getTimeAgo(new Date(performer.lastActivity)) : 'غير محدد';
                const consistencyColor = performer.consistency >= 80 ? 'text-green-300' : 
                                       performer.consistency >= 60 ? 'text-yellow-300' : 'text-red-300';
                
                return `
                    <div class="bg-gradient-to-r ${rankColor} text-white p-4 rounded-lg hover:shadow-lg transition-all duration-300">
                        <div class="flex items-center justify-between mb-3">
                            <div class="text-3xl">${rankIcon}</div>
                            <div class="text-right">
                                <p class="text-sm opacity-90">المركز ${index + 1}</p>
                                <p class="text-xs opacity-75">${performancePercentage}% أداء</p>
                            </div>
                        </div>
                        <h3 class="font-bold text-lg mb-3">${performer.name}</h3>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between items-center">
                                <span class="opacity-90">العمليات:</span>
                                <div class="text-right">
                                    <span class="font-bold text-lg">${performer.operations.toLocaleString()}</span>
                                    <div class="text-xs opacity-75">${performer.dailyOps}/يوم</div>
                                </div>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="opacity-90">النقاط:</span>
                                <div class="text-right">
                                    <span class="font-bold text-lg">${performer.points.toLocaleString()}</span>
                                    <div class="text-xs opacity-75">${performer.dailyPoints}/يوم</div>
                                </div>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="opacity-90">الأنظمة:</span>
                                <span class="font-bold">${performer.systems.size}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="opacity-90">الكفاءة:</span>
                                <span class="font-bold">${performer.efficiency} نقطة/عملية</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="opacity-90">الانتظام:</span>
                                <span class="font-bold ${consistencyColor}">${performer.consistency}%</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="opacity-90">آخر نشاط:</span>
                                <span class="text-xs opacity-75">${lastActivityTime}</span>
                            </div>
                        </div>
                        <div class="mt-3 pt-2 border-t border-white border-opacity-20">
                            <div class="w-full bg-white bg-opacity-20 rounded-full h-2">
                                <div class="bg-white h-2 rounded-full" style="width: ${Math.min(100, performancePercentage)}%"></div>
                            </div>
                            <div class="flex justify-between text-xs mt-1 opacity-75">
                                <span>الأداء</span>
                                <span>${performer.activityDays.size} يوم نشاط</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function updateRecentOperations(operations) {
            const container = document.getElementById('manager-recent-sales');
            if (!container) return;

            // Sort by timestamp and get latest 5
            const recentOps = operations
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .slice(0, 5);

            if (recentOps.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-list text-4xl mb-2"></i>
                        <p>لا توجد عمليات حديثة</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = recentOps.map(op => `
                <div class="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div class="flex items-center space-x-3 space-x-reverse">
                        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-blue-600 text-sm"></i>
                        </div>
                        <div>
                            <h4 class="font-medium text-gray-800">${op.employeeName}</h4>
                            <p class="text-sm text-gray-600">${op.system} - ${op.operations} عملية</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-green-600 font-semibold">${op.points} نقطة</p>
                        <p class="text-xs text-gray-500">${op.time}</p>
                    </div>
                </div>
            `).join('');
        }

        function getTimeAgo(date) {
            const now = new Date();
            const diffInMinutes = Math.floor((now - date) / (1000 * 60));
            
            if (diffInMinutes < 1) return 'الآن';
            if (diffInMinutes < 60) return `منذ ${diffInMinutes} دقيقة`;
            
            const diffInHours = Math.floor(diffInMinutes / 60);
            if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
            
            const diffInDays = Math.floor(diffInHours / 24);
            return `منذ ${diffInDays} يوم`;
        }

        function getSystemIcon(system) {
            const icons = {
                'نظام المبيعات': 'fas fa-shopping-cart',
                'نظام العملاء': 'fas fa-users',
                'نظام المخزون': 'fas fa-boxes',
                'نظام المحاسبة': 'fas fa-calculator',
                'نظام التقارير': 'fas fa-chart-bar',
                'ديقنس': 'fas fa-desktop'
            };
            return icons[system] || 'fas fa-cog';
        }

        // Employee Details Management
        function initializeEmployeeDetailsManagement() {
            const employeeSelect = document.getElementById('manager-employee-select');
            const addNoteBtn = document.getElementById('add-note-btn');
            const addEmployeeOperationBtn = document.getElementById('add-employee-operation-btn');
            const addEmployeeNoteBtn = document.getElementById('add-employee-note-btn');

            // Employee selection change
            if (employeeSelect) {
                employeeSelect.addEventListener('change', function() {
                    const selectedEmployeeId = this.value;
                    if (selectedEmployeeId) {
                        displayEmployeeDetails(selectedEmployeeId);
                        loadEmployeeNotes(selectedEmployeeId);
                    } else {
                        hideEmployeeDetails();
                    }
                });
            }

            // Add note button
            if (addNoteBtn) {
                addNoteBtn.addEventListener('click', function() {
                    showAddNoteModal();
                });
            }

            // Add employee operation button
            if (addEmployeeOperationBtn) {
                addEmployeeOperationBtn.addEventListener('click', function() {
                    showAddEmployeeOperationModal();
                });
            }

            // Add employee note button
            if (addEmployeeNoteBtn) {
                addEmployeeNoteBtn.addEventListener('click', function() {
                    showAddEmployeeNoteModal();
                });
            }

            // Load initial data
            loadEmployeeSelect();
        }

        function loadEmployeeSelect() {
            const select = document.getElementById('manager-employee-select');
            if (!select) return;

            const employees = getAllEmployees();
            select.innerHTML = '<option value="">-- اختر موظف --</option>' + 
                employees.map(emp => `<option value="${emp.id}">${emp.name} - ${emp.branch}</option>`).join('');
        }

        function displayEmployeeDetails(employeeId) {
            const employee = getEmployeeById(employeeId);
            if (!employee) return;

            // Show profile card
            const profileCard = document.getElementById('employee-profile-card');
            if (profileCard) {
                profileCard.classList.remove('hidden');
                document.getElementById('selected-employee-name').textContent = employee.name;
                document.getElementById('selected-employee-position').textContent = employee.profile?.position || 'موظف مبيعات';
                document.getElementById('selected-employee-branch').textContent = employee.branch;
                document.getElementById('selected-employee-id').textContent = employee.id;
            }

            // Load employee operations
            loadBranchManagerEmployeeOperations(employeeId);
        }

        function hideEmployeeDetails() {
            const profileCard = document.getElementById('employee-profile-card');
            if (profileCard) {
                profileCard.classList.add('hidden');
            }
        }

        function loadEmployeeNotes(employeeId) {
            const container = document.getElementById('employee-notes-list');
            if (!container) return;

            const notes = getEmployeeNotes(employeeId);
            
            if (notes.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-sticky-note text-4xl mb-2"></i>
                        <p>لا توجد ملاحظات</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = notes.map(note => `
                <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-start justify-between mb-2">
                        <div class="flex-1">
                            <h4 class="font-semibold text-gray-800 mb-1">${note.title}</h4>
                            <p class="text-sm text-gray-600 mb-2">${note.content}</p>
                            <div class="flex items-center space-x-2 space-x-reverse text-xs text-gray-500">
                                <span><i class="fas fa-user ml-1"></i> ${note.addedBy}</span>
                                <span><i class="fas fa-clock ml-1"></i> ${new Date(note.timestamp).toLocaleString('ar-EG')}</span>
                                <span class="px-2 py-1 rounded-full text-xs ${getNoteTypeColor(note.type)}">${note.type}</span>
                            </div>
                        </div>
                        <div class="flex items-center space-x-1 space-x-reverse">
                            <button onclick="editNote('${note.id}')" class="text-blue-600 hover:text-blue-800 p-1" title="تعديل">
                                <i class="fas fa-edit text-xs"></i>
                            </button>
                            <button onclick="deleteNote('${note.id}')" class="text-red-600 hover:text-red-800 p-1" title="حذف">
                                <i class="fas fa-trash text-xs"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function showAddEmployeeOperationModal() {
            const selectedEmployeeId = document.getElementById('manager-employee-select').value;
            if (!selectedEmployeeId) {
                showNotificationStatus('يرجى اختيار موظف أولاً', 'error');
                return;
            }

            const system = prompt('النظام:');
            if (!system) return;

            const operations = prompt('عدد العمليات:');
            if (!operations || isNaN(operations)) return;

            const notes = prompt('ملاحظات (اختياري):') || '';

            const operation = {
                id: Date.now(),
                employeeId: selectedEmployeeId,
                employeeName: getEmployeeById(selectedEmployeeId)?.name || 'موظف غير معروف',
                system: system,
                operations: parseInt(operations),
                points: getPointsPerOperation(system) * parseInt(operations),
                date: new Date().toISOString().split('T')[0],
                time: new Date().toLocaleTimeString('ar-EG'),
                notes: notes,
                timestamp: new Date().toISOString()
            };

            // Save operation
            saveOperationToStorage(operation);
            
            // Update displays
            displayEmployeeDetails(selectedEmployeeId);
            loadBranchManagerEmployeeOperations(selectedEmployeeId);
            
            showNotificationStatus('تم إضافة العملية بنجاح', 'success');
        }

        function getEmployeeNotes(employeeId) {
            try {
                return JSON.parse(localStorage.getItem(`employeeNotes_${employeeId}`) || '[]');
            } catch (e) {
                return [];
            }
        }

        function getNoteTypeColor(type) {
            const colors = {
                'عام': 'bg-gray-100 text-gray-800',
                'مهم': 'bg-yellow-100 text-yellow-800',
                'تحذير': 'bg-red-100 text-red-800',
                'مشكلة': 'bg-orange-100 text-orange-800'
            };
            return colors[type] || 'bg-gray-100 text-gray-800';
        }

        function showAddNoteModal() {
            const employeeId = document.getElementById('manager-employee-select').value;
            if (!employeeId) {
                showNotificationStatus('يرجى اختيار موظف أولاً', 'error');
                return;
            }

            const title = prompt('عنوان الملاحظة:');
            if (!title) return;

            const content = prompt('محتوى الملاحظة:');
            if (!content) return;

            const type = prompt('نوع الملاحظة (عام/مهم/تحذير/مشكلة):', 'عام');
            if (!type) return;

            const note = {
                id: Date.now(),
                employeeId: employeeId,
                title: title,
                content: content,
                type: type,
                addedBy: 'مدير الفرع',
                timestamp: new Date().toISOString()
            };

            const notes = getEmployeeNotes(employeeId);
            notes.push(note);
            localStorage.setItem(`employeeNotes_${employeeId}`, JSON.stringify(notes));

            showNotificationStatus('تم إضافة الملاحظة بنجاح', 'success');
            loadEmployeeNotes(employeeId);
        }

        // Employee Loan Management
        function initializeEmployeeLoanManagement() {
            const requestLoanBtn = document.getElementById('request-loan-btn');
            const cancelLoanBtn = document.getElementById('cancel-loan-btn');
            const loanForm = document.getElementById('employee-loan-form');
            const refreshBtn = document.getElementById('refresh-loan-data-btn');

            if (requestLoanBtn) {
                requestLoanBtn.addEventListener('click', function() {
                    const form = document.getElementById('loan-request-form');
                    if (form) {
                        form.classList.toggle('hidden');
                    }
                });
            }

            if (cancelLoanBtn) {
                cancelLoanBtn.addEventListener('click', function() {
                    const form = document.getElementById('loan-request-form');
                    if (form) {
                        form.classList.add('hidden');
                        document.getElementById('employee-loan-form').reset();
                    }
                });
            }

            if (loanForm) {
                loanForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    submitLoanRequest();
                });
            }

            if (refreshBtn) {
                refreshBtn.addEventListener('click', function() {
                    loadEmployeeLoanData();
                });
            }

            // Load initial data
            loadEmployeeLoanData();
        }

        function submitLoanRequest() {
            if (!currentUser || currentUser.role !== 'employee') return;

            const amount = document.getElementById('loan-amount').value;
            const dueDate = document.getElementById('loan-due-date').value;
            const reason = document.getElementById('loan-reason').value;

            if (!amount || !dueDate || !reason) {
                showNotificationStatus('يرجى ملء جميع الحقول', 'error');
                return;
            }

            const loanRequest = {
                id: Date.now(),
                employeeId: currentUser.id,
                employeeName: currentUser.name,
                employeePosition: currentUser.position || 'موظف',
                employeeBranch: currentUser.branch || 'غير محدد',
                amount: parseInt(amount),
                dueDate: dueDate,
                reason: reason,
                date: new Date().toISOString().split('T')[0],
                status: 'معلق',
                timestamp: new Date().toISOString(),
                requestedAt: new Date().toISOString()
            };

            // Save loan request for employee
            const employeeRequests = getEmployeeLoanRequests();
            employeeRequests.push(loanRequest);
            localStorage.setItem(`employeeLoanRequests_${currentUser.id}`, JSON.stringify(employeeRequests));

            // Save loan request for manager (global list)
            const managerRequests = getManagerLoanRequests();
            managerRequests.push(loanRequest);
            localStorage.setItem('managerLoanRequests', JSON.stringify(managerRequests));

            // Send notification to manager
            sendLoanRequestNotification(loanRequest);

            // Reset form
            document.getElementById('employee-loan-form').reset();
            document.getElementById('loan-request-form').classList.add('hidden');

            // Reload data
            loadEmployeeLoanData();
            showNotificationStatus('تم إرسال طلب السلفة للمدير بنجاح', 'success');
        }

        function loadEmployeeLoanData() {
            if (!currentUser || currentUser.role !== 'employee') return;

            const requests = getEmployeeLoanRequests();
            
            // Update counts
            const pendingCount = requests.filter(r => r.status === 'معلق').length;
            const approvedCount = requests.filter(r => r.status === 'موافق').length;
            const rejectedCount = requests.filter(r => r.status === 'مرفوض').length;

            updateElement('pending-loans-count', pendingCount);
            updateElement('approved-loans-count', approvedCount);
            updateElement('rejected-loans-count', rejectedCount);

            // Update button states
            updateLoanButtonStates(requests);

            // Load history
            loadEmployeeLoanHistory(requests);
        }

        function loadEmployeeLoanHistory(requests) {
            const container = document.getElementById('employee-loan-history');
            if (!container) return;

            if (requests.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-money-bill-wave text-4xl mb-2"></i>
                        <p>لا توجد طلبات سلفة</p>
                    </div>
                `;
                return;
            }

            // Sort by date (newest first)
            const sortedRequests = requests.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

            container.innerHTML = sortedRequests.map(request => `
                <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-start justify-between mb-2">
                        <div class="flex-1">
                            <div class="flex items-center justify-between mb-2">
                                <h4 class="font-semibold text-gray-800">طلب سلفة - ${request.amount.toLocaleString()} ج.م</h4>
                                <span class="px-3 py-1 rounded-full text-sm ${getLoanStatusColor(request.status)}">${request.status}</span>
                            </div>
                            <p class="text-sm text-gray-600 mb-2">${request.reason}</p>
                            <div class="flex items-center space-x-4 space-x-reverse text-xs text-gray-500">
                                <span><i class="fas fa-calendar ml-1"></i> ${new Date(request.date).toLocaleDateString('ar-EG')}</span>
                                <span><i class="fas fa-calendar-check ml-1"></i> استحقاق: ${new Date(request.dueDate).toLocaleDateString('ar-EG')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function getEmployeeLoanRequests() {
            if (!currentUser || currentUser.role !== 'employee') return [];
            try {
                return JSON.parse(localStorage.getItem(`employeeLoanRequests_${currentUser.id}`) || '[]');
            } catch (e) {
                return [];
            }
        }

        function getManagerLoanRequests() {
            try {
                return JSON.parse(localStorage.getItem('managerLoanRequests') || '[]');
            } catch (e) {
                return [];
            }
        }

        function updateLoanButtonStates(requests) {
            const requestBtn = document.getElementById('request-loan-btn');
            const refreshBtn = document.getElementById('refresh-loan-data-btn');
            
            if (!requestBtn || !refreshBtn) return;

            const pendingCount = requests.filter(r => r.status === 'معلق').length;
            
            // Update request button state
            if (pendingCount > 0) {
                requestBtn.innerHTML = '<i class="fas fa-clock ml-2"></i>طلب معلق (' + pendingCount + ')';
                requestBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
                requestBtn.classList.add('bg-yellow-600', 'hover:bg-yellow-700');
                requestBtn.disabled = true;
            } else {
                requestBtn.innerHTML = '<i class="fas fa-plus ml-2"></i>طلب سلفة';
                requestBtn.classList.remove('bg-yellow-600', 'hover:bg-yellow-700');
                requestBtn.classList.add('bg-green-600', 'hover:bg-green-700');
                requestBtn.disabled = false;
            }

            // Update refresh button with animation
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt ml-2"></i>تحديث';
            refreshBtn.classList.add('animate-spin');
            setTimeout(() => {
                refreshBtn.classList.remove('animate-spin');
            }, 1000);
        }

        function getLoanStatusColor(status) {
            const colors = {
                'معلق': 'bg-yellow-100 text-yellow-800',
                'موافق': 'bg-green-100 text-green-800',
                'مرفوض': 'bg-red-100 text-red-800'
            };
            return colors[status] || 'bg-gray-100 text-gray-800';
        }

        // Daily Performance Details Management
        function initializeDailyPerformanceDetails() {
            const refreshBtn = document.getElementById('refresh-performance-btn');
            const viewDetailsBtn = document.getElementById('view-details-btn');

            if (refreshBtn) {
                refreshBtn.addEventListener('click', function() {
                    loadDailyPerformanceDetails();
                });
            }

            if (viewDetailsBtn) {
                viewDetailsBtn.addEventListener('click', function() {
                    showPerformanceDetailsModal();
                });
            }

            // Load initial data
            loadDailyPerformanceDetails();
        }

        function loadDailyPerformanceDetails() {
            if (!currentUser || currentUser.role !== 'employee') return;

            const today = new Date().toISOString().split('T')[0];
            const todayOperations = getEmployeeOperations(currentUser.id).filter(op => op.date === today);

            // Update summary cards
            updatePerformanceSummaryCards(todayOperations);
            
            // Update systems breakdown
            updateSystemsBreakdown(todayOperations);
            
            // Update time breakdown
            updateTimeBreakdown(todayOperations);
            
            // Update performance chart
            updatePerformanceChart(todayOperations);
            
            // Update recent operations
            updateRecentOperations(todayOperations);
        }

        function updatePerformanceSummaryCards(operations) {
            const totalOps = operations.reduce((sum, op) => sum + op.operations, 0);
            const totalPoints = operations.reduce((sum, op) => sum + op.points, 0);
            const systemsUsed = new Set(operations.map(op => op.system)).size;
            const avgOps = systemsUsed > 0 ? Math.round(totalOps / systemsUsed) : 0;

            updateElement('today-total-operations', totalOps);
            updateElement('today-total-points', totalPoints);
            updateElement('today-systems-used', systemsUsed);
            updateElement('today-avg-operations', avgOps);
        }

        function updateSystemsBreakdown(operations) {
            const container = document.getElementById('systems-breakdown');
            if (!container) return;

            if (operations.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-chart-pie text-4xl mb-2"></i>
                        <p>لا توجد عمليات مسجلة اليوم</p>
                    </div>
                `;
                return;
            }

            // Group operations by system
            const systemStats = {};
            operations.forEach(op => {
                if (!systemStats[op.system]) {
                    systemStats[op.system] = {
                        system: op.system,
                        operations: 0,
                        points: 0,
                        count: 0
                    };
                }
                systemStats[op.system].operations += op.operations;
                systemStats[op.system].points += op.points;
                systemStats[op.system].count += 1;
            });

            const totalOps = operations.reduce((sum, op) => sum + op.operations, 0);

            container.innerHTML = Object.values(systemStats).map(stat => {
                const percentage = totalOps > 0 ? Math.round((stat.operations / totalOps) * 100) : 0;
                const systemIcon = getSystemIcon(stat.system);
                
                return `
                    <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center space-x-3 space-x-reverse">
                                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <i class="${systemIcon} text-blue-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-800">${stat.system}</h4>
                                    <p class="text-sm text-gray-600">${stat.count} عملية</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="text-green-600 font-semibold">${stat.points} نقطة</p>
                                <p class="text-xs text-gray-500">${stat.operations} عملية</p>
                            </div>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-blue-600 h-2 rounded-full" style="width: ${percentage}%"></div>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">${percentage}% من إجمالي العمليات</p>
                    </div>
                `;
            }).join('');
        }

        function updateTimeBreakdown(operations) {
            const container = document.getElementById('time-breakdown');
            if (!container) return;

            if (operations.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-clock text-4xl mb-2"></i>
                        <p>لا توجد عمليات مسجلة اليوم</p>
                    </div>
                `;
                return;
            }

            // Group operations by time period
            const timeSlots = {
                'صباح': { operations: 0, points: 0, count: 0, label: '6:00 - 12:00' },
                'ظهر': { operations: 0, points: 0, count: 0, label: '12:00 - 17:00' },
                'مساء': { operations: 0, points: 0, count: 0, label: '17:00 - 22:00' },
                'ليل': { operations: 0, points: 0, count: 0, label: '22:00 - 6:00' }
            };

            operations.forEach(op => {
                const hour = new Date(`2000-01-01T${op.time}`).getHours();
                let timeSlot = 'ليل';
                
                if (hour >= 6 && hour < 12) timeSlot = 'صباح';
                else if (hour >= 12 && hour < 17) timeSlot = 'ظهر';
                else if (hour >= 17 && hour < 22) timeSlot = 'مساء';
                
                timeSlots[timeSlot].operations += op.operations;
                timeSlots[timeSlot].points += op.points;
                timeSlots[timeSlot].count += 1;
            });

            const totalOps = operations.reduce((sum, op) => sum + op.operations, 0);

            container.innerHTML = Object.entries(timeSlots).map(([time, data]) => {
                const percentage = totalOps > 0 ? Math.round((data.operations / totalOps) * 100) : 0;
                const timeIcon = getTimeSlotIcon(time);
                
                return `
                    <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center space-x-3 space-x-reverse">
                                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <i class="${timeIcon} text-green-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-800">${time}</h4>
                                    <p class="text-sm text-gray-600">${data.label}</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="text-green-600 font-semibold">${data.points} نقطة</p>
                                <p class="text-xs text-gray-500">${data.operations} عملية</p>
                            </div>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-green-600 h-2 rounded-full" style="width: ${percentage}%"></div>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">${percentage}% من إجمالي العمليات</p>
                    </div>
                `;
            }).join('');
        }

        function updatePerformanceChart(operations) {
            const container = document.getElementById('daily-performance-chart');
            if (!container) return;

            if (operations.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-chart-line text-4xl mb-2"></i>
                        <p>لا توجد بيانات لعرضها</p>
                    </div>
                `;
                return;
            }

            // Group operations by hour
            const hourlyData = {};
            for (let i = 0; i < 24; i++) {
                hourlyData[i] = { operations: 0, points: 0 };
            }

            operations.forEach(op => {
                if (!op || !op.time) return;
                try {
                    const hour = new Date(`2000-01-01T${op.time}`).getHours();
                    if (hour >= 0 && hour < 24) {
                        hourlyData[hour].operations += cleanValue(op.operations);
                        hourlyData[hour].points += cleanValue(op.points);
                    }
                } catch (e) {
                    console.warn('Invalid time format:', op.time);
                }
            });

            const maxOps = Math.max(...Object.values(hourlyData).map(d => d.operations));

            container.innerHTML = `
                <div class="space-y-2">
                    ${Object.entries(hourlyData).map(([hour, data]) => {
                        const height = maxOps > 0 ? (data.operations / maxOps) * 100 : 0;
                        const hourLabel = hour.padStart(2, '0') + ':00';
                        
                        return `
                            <div class="flex items-center space-x-2 space-x-reverse">
                                <div class="w-12 text-xs text-gray-600">${hourLabel}</div>
                                <div class="flex-1 bg-gray-200 rounded-full h-4 relative">
                                    <div class="bg-gradient-to-r from-purple-500 to-purple-600 h-4 rounded-full transition-all duration-500" 
                                         style="width: ${height}%"></div>
                                    <div class="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                                        ${data.operations > 0 ? data.operations : ''}
                                    </div>
                                </div>
                                <div class="w-16 text-xs text-gray-600 text-right">${data.points} نقطة</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }

        function updateRecentOperations(operations) {
            const container = document.getElementById('today-recent-operations');
            if (!container) return;

            if (operations.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-list text-4xl mb-2"></i>
                        <p>لا توجد عمليات مسجلة اليوم</p>
                    </div>
                `;
                return;
            }

            // Sort by timestamp (newest first) and take last 5
            const recentOps = operations
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .slice(0, 5);

            container.innerHTML = recentOps.map(op => `
                <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3 space-x-reverse">
                            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <i class="${getSystemIcon(op.system)} text-blue-600"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800">${op.system}</h4>
                                <p class="text-sm text-gray-600">${op.operations} عملية</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-green-600 font-semibold">${op.points} نقطة</p>
                            <p class="text-xs text-gray-500">${op.time}</p>
                        </div>
                    </div>
                    ${op.notes ? `<p class="text-xs text-gray-500 mt-2">${op.notes}</p>` : ''}
                </div>
            `).join('');
        }

        function getTimeSlotIcon(timeSlot) {
            const icons = {
                'صباح': 'fas fa-sun',
                'ظهر': 'fas fa-sun',
                'مساء': 'fas fa-moon',
                'ليل': 'fas fa-moon'
            };
            return icons[timeSlot] || 'fas fa-clock';
        }

        function showPerformanceDetailsModal() {
            if (!currentUser || currentUser.role !== 'employee') return;

            const today = new Date().toISOString().split('T')[0];
            const todayOperations = getEmployeeOperations(currentUser.id).filter(op => op.date === today);

            // Create modal content
            const modalContent = `
                <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div class="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-96 overflow-y-auto">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-xl font-semibold text-gray-800">تفاصيل الأداء اليومي - ${today}</h3>
                            <button onclick="closePerformanceModal()" class="text-gray-500 hover:text-gray-700">
                                <i class="fas fa-times text-xl"></i>
                            </button>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 class="font-semibold text-gray-800 mb-3">إحصائيات شاملة</h4>
                                <div class="space-y-2">
                                    <div class="flex justify-between">
                                        <span>إجمالي العمليات:</span>
                                        <span class="font-semibold">${todayOperations.reduce((sum, op) => sum + op.operations, 0)}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>إجمالي النقاط:</span>
                                        <span class="font-semibold text-green-600">${todayOperations.reduce((sum, op) => sum + op.points, 0)}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>الأنظمة المستخدمة:</span>
                                        <span class="font-semibold">${new Set(todayOperations.map(op => op.system)).size}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>متوسط العمليات:</span>
                                        <span class="font-semibold">${todayOperations.length > 0 ? Math.round(todayOperations.reduce((sum, op) => sum + op.operations, 0) / new Set(todayOperations.map(op => op.system)).size) : 0}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h4 class="font-semibold text-gray-800 mb-3">أفضل نظام أداء</h4>
                                ${getBestPerformingSystem(todayOperations)}
                            </div>
                        </div>
                        
                        <div class="mt-6">
                            <h4 class="font-semibold text-gray-800 mb-3">جميع العمليات اليوم</h4>
                            <div class="space-y-2 max-h-48 overflow-y-auto">
                                ${todayOperations.map(op => `
                                    <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
                                        <div class="flex items-center space-x-2 space-x-reverse">
                                            <i class="${getSystemIcon(op.system)} text-blue-600"></i>
                                            <span class="font-medium">${op.system}</span>
                                        </div>
                                        <div class="text-right">
                                            <span class="text-sm">${cleanValue(op.operations)} عملية - ${cleanValue(op.points)} نقطة</span>
                                            <span class="text-xs text-gray-500 mr-2">${op.time}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Add modal to page
            document.body.insertAdjacentHTML('beforeend', modalContent);
        }

        function closePerformanceModal() {
            const modal = document.querySelector('.fixed.inset-0');
            if (modal) {
                modal.remove();
            }
        }

        function getBestPerformingSystem(operations) {
            if (operations.length === 0) {
                return '<p class="text-gray-500">لا توجد عمليات</p>';
            }

            const systemStats = {};
            operations.forEach(op => {
                if (!systemStats[op.system]) {
                    systemStats[op.system] = { operations: 0, points: 0 };
                }
                systemStats[op.system].operations += op.operations;
                systemStats[op.system].points += op.points;
            });

            const bestSystem = Object.entries(systemStats)
                .sort((a, b) => b[1].points - a[1].points)[0];

            return `
                <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
                    <div class="flex items-center space-x-3 space-x-reverse">
                        <i class="${getSystemIcon(bestSystem[0])} text-2xl"></i>
                        <div>
                            <h5 class="font-bold">${bestSystem[0]}</h5>
                            <p class="text-green-100">${bestSystem[1].operations} عملية</p>
                            <p class="text-green-100">${bestSystem[1].points} نقطة</p>
                        </div>
                    </div>
                </div>
            `;
        }

        // Loan Requests Management for Manager
        function initializeLoanRequestsManagement() {
            const refreshBtn = document.getElementById('refresh-loan-requests-btn');
            const viewAllBtn = document.getElementById('view-all-loans-btn');

            if (refreshBtn) {
                refreshBtn.addEventListener('click', function() {
                    loadManagerLoanRequests();
                });
            }

            if (viewAllBtn) {
                viewAllBtn.addEventListener('click', function() {
                    showAllLoanRequestsModal();
                });
            }

            // Load initial data
            loadManagerLoanRequests();
        }

        function loadManagerLoanRequests() {
            if (!currentUser || currentUser.role !== 'manager') return;

            // Get loan requests from manager's list
            const managerRequests = getManagerLoanRequests();
            
            // Update summary cards
            updateLoanRequestsSummary(managerRequests);
            
            // Update manager button states
            updateManagerLoanButtonStates(managerRequests);
            
            // Load pending requests
            loadPendingLoanRequests(managerRequests);
        }

        function getAllLoanRequests() {
            const allRequests = [];
            const employees = getAllEmployees();
            
            employees.forEach(emp => {
                const requests = getEmployeeLoanRequests(emp.id);
                allRequests.push(...requests);
            });
            
            return allRequests;
        }

        function getEmployeeLoanRequests(employeeId) {
            try {
                return JSON.parse(localStorage.getItem(`employeeLoanRequests_${employeeId}`) || '[]');
            } catch (e) {
                return [];
            }
        }

        function updateLoanRequestsSummary(requests) {
            const pendingCount = requests.filter(r => r.status === 'معلق').length;
            const approvedCount = requests.filter(r => r.status === 'موافق').length;
            const rejectedCount = requests.filter(r => r.status === 'مرفوض').length;
            const totalAmount = requests.filter(r => r.status === 'موافق').reduce((sum, r) => sum + r.amount, 0);

            updateElement('pending-loan-requests-count', pendingCount);
            updateElement('approved-loan-requests-count', approvedCount);
            updateElement('rejected-loan-requests-count', rejectedCount);
            updateElement('total-loan-amount', totalAmount.toLocaleString());
        }

        function updateManagerLoanButtonStates(requests) {
            const refreshBtn = document.getElementById('refresh-loan-requests-btn');
            const viewAllBtn = document.getElementById('view-all-loans-btn');
            
            if (!refreshBtn || !viewAllBtn) return;

            const pendingCount = requests.filter(r => r.status === 'معلق').length;
            
            // Update refresh button with animation
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt ml-2"></i>تحديث';
            refreshBtn.classList.add('animate-spin');
            setTimeout(() => {
                refreshBtn.classList.remove('animate-spin');
            }, 1000);

            // Update view all button with count
            if (requests.length > 0) {
                viewAllBtn.innerHTML = `<i class="fas fa-eye ml-2"></i>عرض الكل (${requests.length})`;
                viewAllBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                viewAllBtn.classList.add('bg-purple-600', 'hover:bg-purple-700');
            } else {
                viewAllBtn.innerHTML = '<i class="fas fa-eye ml-2"></i>عرض الكل';
                viewAllBtn.classList.remove('bg-purple-600', 'hover:bg-purple-700');
                viewAllBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
            }

            // Add notification badge if there are pending requests
            if (pendingCount > 0) {
                refreshBtn.innerHTML = `<i class="fas fa-sync-alt ml-2"></i>تحديث <span class="bg-red-500 text-white text-xs rounded-full px-2 py-1 mr-1">${pendingCount}</span>`;
            }
        }

        function loadPendingLoanRequests(requests) {
            const container = document.getElementById('manager-loan-requests-list');
            if (!container) return;

            const pendingRequests = requests.filter(r => r.status === 'معلق');
            
            if (pendingRequests.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-money-bill-wave text-4xl mb-2"></i>
                        <p>لا توجد طلبات سلفة معلقة</p>
                    </div>
                `;
                return;
            }

            // Sort by date (newest first)
            const sortedRequests = pendingRequests.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

            container.innerHTML = sortedRequests.map(request => `
                <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <div class="flex items-center space-x-3 space-x-reverse mb-2">
                                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <i class="fas fa-user text-green-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-800">${request.employeeName}</h4>
                                    <p class="text-sm text-gray-600">${request.employeePosition} - ${request.employeeBranch}</p>
                                    <p class="text-sm text-gray-500">طلب سلفة - ${request.amount.toLocaleString()} ج.م</p>
                                </div>
                            </div>
                            <p class="text-sm text-gray-600 mb-2">${request.reason}</p>
                            <div class="flex items-center space-x-4 space-x-reverse text-xs text-gray-500">
                                <span><i class="fas fa-calendar ml-1"></i> ${new Date(request.date).toLocaleDateString('ar-EG')}</span>
                                <span><i class="fas fa-calendar-check ml-1"></i> استحقاق: ${new Date(request.dueDate).toLocaleDateString('ar-EG')}</span>
                                <span class="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">معلق</span>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2 space-x-reverse">
                            <button onclick="approveLoanRequest('${request.id}', '${request.employeeId}')" 
                                    class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                                <i class="fas fa-check ml-1"></i>موافقة
                            </button>
                            <button onclick="rejectLoanRequest('${request.id}', '${request.employeeId}')" 
                                    class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                                <i class="fas fa-times ml-1"></i>رفض
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function approveLoanRequest(requestId, employeeId) {
            // Update employee's loan requests
            const employeeRequests = getEmployeeLoanRequests(employeeId);
            const employeeRequest = employeeRequests.find(r => r.id == requestId);
            
            // Update manager's loan requests
            const managerRequests = getManagerLoanRequests();
            const managerRequest = managerRequests.find(r => r.id == requestId);
            
            if (employeeRequest && managerRequest) {
                // Update employee request
                employeeRequest.status = 'موافق';
                employeeRequest.approvedBy = currentUser.name;
                employeeRequest.approvedAt = new Date().toISOString();
                localStorage.setItem(`employeeLoanRequests_${employeeId}`, JSON.stringify(employeeRequests));
                
                // Update manager request
                managerRequest.status = 'موافق';
                managerRequest.approvedBy = currentUser.name;
                managerRequest.approvedAt = new Date().toISOString();
                localStorage.setItem('managerLoanRequests', JSON.stringify(managerRequests));
                
                // Send notification to employee
                sendLoanApprovalNotification(employeeId, employeeRequest);
                
                // Reload data and update button states
                loadManagerLoanRequests();
                
                // Update employee data if employee is logged in
                if (currentUser && currentUser.role === 'employee') {
                    loadEmployeeLoanData();
                }
                
                showNotificationStatus('تم الموافقة على طلب السلفة', 'success');
                
                // مزامنة مع مدير المنطقة
                syncWithAreaManager();
            }
        }

        function rejectLoanRequest(requestId, employeeId) {
            const reason = prompt('سبب رفض طلب السلفة:');
            if (!reason) return;

            // Update employee's loan requests
            const employeeRequests = getEmployeeLoanRequests(employeeId);
            const employeeRequest = employeeRequests.find(r => r.id == requestId);
            
            // Update manager's loan requests
            const managerRequests = getManagerLoanRequests();
            const managerRequest = managerRequests.find(r => r.id == requestId);
            
            if (employeeRequest && managerRequest) {
                // Update employee request
                employeeRequest.status = 'مرفوض';
                employeeRequest.rejectedBy = currentUser.name;
                employeeRequest.rejectedAt = new Date().toISOString();
                employeeRequest.rejectionReason = reason;
                localStorage.setItem(`employeeLoanRequests_${employeeId}`, JSON.stringify(employeeRequests));
                
                // Update manager request
                managerRequest.status = 'مرفوض';
                managerRequest.rejectedBy = currentUser.name;
                managerRequest.rejectedAt = new Date().toISOString();
                managerRequest.rejectionReason = reason;
                localStorage.setItem('managerLoanRequests', JSON.stringify(managerRequests));
                
                // Send notification to employee
                sendLoanRejectionNotification(employeeId, employeeRequest);
                
                // Reload data and update button states
                loadManagerLoanRequests();
                
                // Update employee data if employee is logged in
                if (currentUser && currentUser.role === 'employee') {
                    loadEmployeeLoanData();
                }
                
                showNotificationStatus('تم رفض طلب السلفة', 'success');
                
                // مزامنة مع مدير المنطقة
                syncWithAreaManager();
            }
        }

        function sendLoanApprovalNotification(employeeId, request) {
            const notification = {
                id: Date.now(),
                from: currentUser.name,
                to: employeeId,
                type: 'موافقة سلفة',
                subject: 'تم الموافقة على طلب السلفة',
                message: `تم الموافقة على طلب السلفة بمبلغ ${request.amount.toLocaleString()} ج.م. تاريخ الاستحقاق: ${new Date(request.dueDate).toLocaleDateString('ar-EG')}`,
                timestamp: new Date().toISOString(),
                isRead: false
            };

            const notifications = getNotifications();
            notifications.push(notification);
            localStorage.setItem('notifications', JSON.stringify(notifications));
        }

        function sendLoanRejectionNotification(employeeId, request) {
            const notification = {
                id: Date.now(),
                from: currentUser.name,
                to: employeeId,
                type: 'رفض سلفة',
                subject: 'تم رفض طلب السلفة',
                message: `تم رفض طلب السلفة بمبلغ ${request.amount.toLocaleString()} ج.م. السبب: ${request.rejectionReason}`,
                timestamp: new Date().toISOString(),
                isRead: false
            };

            const notifications = getNotifications();
            notifications.push(notification);
            localStorage.setItem('notifications', JSON.stringify(notifications));
        }

        function showAllLoanRequestsModal() {
            const allRequests = getAllLoanRequests();
            
            const modalContent = `
                <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div class="bg-white rounded-lg p-6 max-w-6xl w-full mx-4 max-h-96 overflow-y-auto">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-xl font-semibold text-gray-800">جميع طلبات السلفة</h3>
                            <button onclick="closeAllLoansModal()" class="text-gray-500 hover:text-gray-700">
                                <i class="fas fa-times text-xl"></i>
                            </button>
                        </div>
                        
                        <div class="space-y-3">
                            ${allRequests.map(request => `
                                <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center space-x-3 space-x-reverse">
                                            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <i class="fas fa-user text-blue-600"></i>
                                            </div>
                                            <div>
                                                <h4 class="font-semibold text-gray-800">${request.employeeName}</h4>
                                                <p class="text-sm text-gray-600">${request.amount.toLocaleString()} ج.م</p>
                                            </div>
                                        </div>
                                        <div class="text-right">
                                            <span class="px-3 py-1 rounded-full text-sm ${getLoanStatusColor(request.status)}">${request.status}</span>
                                            <p class="text-xs text-gray-500 mt-1">${new Date(request.date).toLocaleDateString('ar-EG')}</p>
                                        </div>
                                    </div>
                                    <p class="text-sm text-gray-600 mt-2">${request.reason}</p>
                                    ${request.status !== 'معلق' ? `
                                        <div class="mt-2 text-xs text-gray-500">
                                            ${request.status === 'موافق' ? `موافق عليه من: ${request.approvedBy}` : `مرفوض من: ${request.rejectedBy}`}
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalContent);
        }

        function closeAllLoansModal() {
            const modal = document.querySelector('.fixed.inset-0');
            if (modal) {
                modal.remove();
            }
        }

        // Targets and Tasks Management
        function initializeTargetsAndTasksManagement() {
            // Daily targets
            const dailyTargetForm = document.getElementById('manager-set-daily-target-form');
            const refreshDailyTargetsBtn = document.getElementById('refresh-daily-targets-btn');
            const viewDailyTargetsBtn = document.getElementById('view-daily-targets-btn');

            if (dailyTargetForm) {
                dailyTargetForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    sendDailyTarget();
                });
            }

            if (refreshDailyTargetsBtn) {
                refreshDailyTargetsBtn.addEventListener('click', function() {
                    loadDailyTargets();
                });
            }

            if (viewDailyTargetsBtn) {
                viewDailyTargetsBtn.addEventListener('click', function() {
                    showAllDailyTargetsModal();
                });
            }

            // Monthly targets
            const monthlyTargetForm = document.getElementById('manager-set-monthly-target-form');
            const refreshMonthlyTargetsBtn = document.getElementById('refresh-monthly-targets-btn');
            const viewMonthlyTargetsBtn = document.getElementById('view-monthly-targets-btn');

            if (monthlyTargetForm) {
                monthlyTargetForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    sendMonthlyTarget();
                });
            }

            if (refreshMonthlyTargetsBtn) {
                refreshMonthlyTargetsBtn.addEventListener('click', function() {
                    loadMonthlyTargets();
                });
            }

            if (viewMonthlyTargetsBtn) {
                viewMonthlyTargetsBtn.addEventListener('click', function() {
                    showAllMonthlyTargetsModal();
                });
            }

            // Tasks
            const taskForm = document.getElementById('manager-daily-task-form');
            const refreshTasksBtn = document.getElementById('refresh-tasks-btn');
            const viewAllTasksBtn = document.getElementById('view-all-tasks-btn');
            const taskBranchSelect = document.getElementById('task-branch-select');

            if (taskForm) {
                taskForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    sendDailyTask();
                });
            }

            if (refreshTasksBtn) {
                refreshTasksBtn.addEventListener('click', function() {
                    loadManagerTasks();
                });
            }

            if (viewAllTasksBtn) {
                viewAllTasksBtn.addEventListener('click', function() {
                    showAllTasksModal();
                });
            }

            if (taskBranchSelect) {
                taskBranchSelect.addEventListener('change', function() {
                    updateTaskEmployeesList();
                });
            }

            // Load initial data
            loadDailyTargets();
            loadMonthlyTargets();
            loadManagerTasks();
            updateTaskEmployeesList();
        }

        function sendDailyTarget() {
            const employeeId = document.getElementById('manager-target-employee').value;
            const points = document.getElementById('manager-target-points').value;
            const date = document.getElementById('manager-target-date').value;

            if (!employeeId || !points || !date) {
                showNotificationStatus('يرجى ملء جميع الحقول', 'error');
                return;
            }

            const target = {
                id: Date.now(),
                employeeId: employeeId,
                employeeName: getEmployeeById(employeeId)?.name || 'موظف غير معروف',
                points: parseInt(points),
                date: date,
                type: 'daily',
                status: 'معلق',
                sentBy: currentUser.name,
                sentAt: new Date().toISOString(),
                achievedPoints: 0
            };

            // Save target
            saveTarget(target);
            
            // Send notification to employee
            sendTargetNotification(employeeId, target);
            
            // Reset form
            document.getElementById('manager-set-daily-target-form').reset();
            
            // Reload data
            loadDailyTargets();
            showNotificationStatus('تم إرسال الهدف اليومي بنجاح', 'success');
        }

        function sendMonthlyTarget() {
            const employeeId = document.getElementById('manager-monthly-target-employee').value;
            const points = document.getElementById('manager-monthly-required').value;
            const month = document.getElementById('manager-monthly-date').value;

            if (!employeeId || !points || !month) {
                showNotificationStatus('يرجى ملء جميع الحقول', 'error');
                return;
            }

            const target = {
                id: Date.now(),
                employeeId: employeeId,
                employeeName: getEmployeeById(employeeId)?.name || 'موظف غير معروف',
                points: parseInt(points),
                month: month,
                type: 'monthly',
                status: 'معلق',
                sentBy: currentUser.name,
                sentAt: new Date().toISOString(),
                achievedPoints: 0
            };

            // Save target
            saveTarget(target);
            
            // Send notification to employee
            sendTargetNotification(employeeId, target);
            
            // Reset form
            document.getElementById('manager-set-monthly-target-form').reset();
            
            // Reload data
            loadMonthlyTargets();
            showNotificationStatus('تم إرسال الهدف الشهري بنجاح', 'success');
        }

        function sendDailyTask() {
            const branch = document.getElementById('task-branch-select').value;
            const employeeId = document.getElementById('daily-task-assignee').value;
            const description = document.getElementById('daily-task-description').value;

            if (!branch || !employeeId || !description) {
                showNotificationStatus('يرجى ملء جميع الحقول', 'error');
                return;
            }

            const task = {
                id: Date.now(),
                employeeId: employeeId,
                employeeName: getEmployeeById(employeeId)?.name || 'موظف غير معروف',
                branch: branch,
                description: description,
                status: 'معلق',
                sentBy: currentUser.name,
                sentAt: new Date().toISOString(),
                completedAt: null
            };

            // Save task
            saveTask(task);
            
            // Send notification to employee
            sendTaskNotification(employeeId, task);
            
            // Reset form
            document.getElementById('manager-daily-task-form').reset();
            
            // Reload data
            loadManagerTasks();
            showNotificationStatus('تم إرسال المهمة بنجاح', 'success');
            
            // مزامنة مع مدير المنطقة
            syncWithAreaManager();
        }

        function saveTarget(target) {
            const targets = getTargets();
            targets.push(target);
            localStorage.setItem('targets', JSON.stringify(targets));
        }

        function saveTask(task) {
            const tasks = getTasks();
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function getTargets() {
            try {
                return JSON.parse(localStorage.getItem('targets') || '[]');
            } catch (e) {
                return [];
            }
        }

        function getTasks() {
            try {
                return JSON.parse(localStorage.getItem('tasks') || '[]');
            } catch (e) {
                return [];
            }
        }

        function loadDailyTargets() {
            const targets = getTargets().filter(t => t.type === 'daily');
            
            // Update summary
            updateDailyTargetsSummary(targets);
            
            // Load targets list
            loadDailyTargetsList(targets);
        }

        function loadMonthlyTargets() {
            const targets = getTargets().filter(t => t.type === 'monthly');
            
            // Update summary
            updateMonthlyTargetsSummary(targets);
            
            // Load targets list
            loadMonthlyTargetsList(targets);
        }

        function loadManagerTasks() {
            const tasks = getTasks();
            
            // Update summary
            updateTasksSummary(tasks);
            
            // Load tasks list
            loadTasksList(tasks);
        }

        function updateDailyTargetsSummary(targets) {
            const sentCount = targets.length;
            const achievedCount = targets.filter(t => t.status === 'محقق').length;
            const completionRate = sentCount > 0 ? Math.round((achievedCount / sentCount) * 100) : 0;

            updateElement('daily-targets-sent-count', sentCount);
            updateElement('daily-targets-achieved-count', achievedCount);
            updateElement('daily-targets-completion-rate', completionRate + '%');
        }

        function updateMonthlyTargetsSummary(targets) {
            const sentCount = targets.length;
            const achievedCount = targets.filter(t => t.status === 'محقق').length;
            const completionRate = sentCount > 0 ? Math.round((achievedCount / sentCount) * 100) : 0;

            updateElement('monthly-targets-sent-count', sentCount);
            updateElement('monthly-targets-achieved-count', achievedCount);
            updateElement('monthly-targets-completion-rate', completionRate + '%');
        }

        function updateTasksSummary(tasks) {
            const sentCount = tasks.length;
            const completedCount = tasks.filter(t => t.status === 'مكتمل').length;
            const completionRate = sentCount > 0 ? Math.round((completedCount / sentCount) * 100) : 0;

            updateElement('tasks-sent-count', sentCount);
            updateElement('tasks-completed-count', completedCount);
            updateElement('tasks-completion-rate', completionRate + '%');
        }

        function loadDailyTargetsList(targets) {
            const container = document.getElementById('manager-daily-targets-list');
            if (!container) return;

            if (targets.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-bullseye text-4xl mb-2"></i>
                        <p>لا توجد أهداف يومية</p>
                    </div>
                `;
                return;
            }

            // Sort by date (newest first)
            const sortedTargets = targets.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));

            container.innerHTML = sortedTargets.map(target => `
                <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3 space-x-reverse">
                            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <i class="fas fa-bullseye text-green-600"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800">${target.employeeName}</h4>
                                <p class="text-sm text-gray-600">${target.points} نقطة - ${new Date(target.date).toLocaleDateString('ar-EG')}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <span class="px-3 py-1 rounded-full text-sm ${getTargetStatusColor(target.status)}">${target.status}</span>
                            <p class="text-xs text-gray-500 mt-1">${new Date(target.sentAt).toLocaleDateString('ar-EG')}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function loadMonthlyTargetsList(targets) {
            const container = document.getElementById('manager-monthly-targets-list');
            if (!container) return;

            if (targets.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-calendar-alt text-4xl mb-2"></i>
                        <p>لا توجد أهداف شهرية</p>
                    </div>
                `;
                return;
            }

            // Sort by month (newest first)
            const sortedTargets = targets.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));

            container.innerHTML = sortedTargets.map(target => `
                <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3 space-x-reverse">
                            <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                <i class="fas fa-calendar-alt text-indigo-600"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800">${target.employeeName}</h4>
                                <p class="text-sm text-gray-600">${target.points} نقطة - ${target.month}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <span class="px-3 py-1 rounded-full text-sm ${getTargetStatusColor(target.status)}">${target.status}</span>
                            <p class="text-xs text-gray-500 mt-1">${new Date(target.sentAt).toLocaleDateString('ar-EG')}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function loadTasksList(tasks) {
            const container = document.getElementById('manager-daily-tasks-list');
            if (!container) return;

            if (tasks.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-tasks text-4xl mb-2"></i>
                        <p>لا توجد مهام</p>
                    </div>
                `;
                return;
            }

            // Sort by date (newest first)
            const sortedTasks = tasks.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));

            container.innerHTML = sortedTasks.map(task => `
                <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3 space-x-reverse">
                            <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <i class="fas fa-tasks text-purple-600"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800">${task.employeeName}</h4>
                                <p class="text-sm text-gray-600">${task.description}</p>
                                <p class="text-xs text-gray-500">${task.branch}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <span class="px-3 py-1 rounded-full text-sm ${getTaskStatusColor(task.status)}">${task.status}</span>
                            <p class="text-xs text-gray-500 mt-1">${new Date(task.sentAt).toLocaleDateString('ar-EG')}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function updateTaskEmployeesList() {
            const branchSelect = document.getElementById('task-branch-select');
            const employeeSelect = document.getElementById('daily-task-assignee');
            
            if (!branchSelect || !employeeSelect) return;

            const selectedBranch = branchSelect.value;
            const employees = getAllEmployees();
            
            if (selectedBranch) {
                const branchEmployees = employees.filter(emp => emp.branch === selectedBranch);
                employeeSelect.innerHTML = '<option value="">-- اختر موظف --</option>' + 
                    branchEmployees.map(emp => `<option value="${emp.id}">${emp.name}</option>`).join('');
            } else {
                employeeSelect.innerHTML = '<option value="">-- اختر موظف --</option>' + 
                    employees.map(emp => `<option value="${emp.id}">${emp.name} - ${emp.branch}</option>`).join('');
            }
        }

        function getTargetStatusColor(status) {
            const colors = {
                'معلق': 'bg-yellow-100 text-yellow-800',
                'محقق': 'bg-green-100 text-green-800',
                'غير محقق': 'bg-red-100 text-red-800'
            };
            return colors[status] || 'bg-gray-100 text-gray-800';
        }

        function getTaskStatusColor(status) {
            const colors = {
                'معلق': 'bg-yellow-100 text-yellow-800',
                'مكتمل': 'bg-green-100 text-green-800',
                'متأخر': 'bg-red-100 text-red-800'
            };
            return colors[status] || 'bg-gray-100 text-gray-800';
        }

        function sendTargetNotification(employeeId, target) {
            const notification = {
                id: Date.now(),
                from: currentUser.name,
                to: employeeId,
                type: 'هدف جديد',
                subject: `هدف ${target.type === 'daily' ? 'يومي' : 'شهري'} جديد`,
                message: `تم تعيين هدف ${target.type === 'daily' ? 'يومي' : 'شهري'} جديد: ${target.points} نقطة`,
                timestamp: new Date().toISOString(),
                isRead: false
            };

            const notifications = getNotifications();
            notifications.push(notification);
            localStorage.setItem('notifications', JSON.stringify(notifications));
        }

        function sendTaskNotification(employeeId, task) {
            const notification = {
                id: Date.now(),
                from: currentUser.name,
                to: employeeId,
                type: 'مهمة جديدة',
                subject: 'مهمة يومية جديدة',
                message: `تم تعيين مهمة جديدة: ${task.description}`,
                timestamp: new Date().toISOString(),
                isRead: false
            };

            const notifications = getNotifications();
            notifications.push(notification);
            localStorage.setItem('notifications', JSON.stringify(notifications));
        }

        function showAllDailyTargetsModal() {
            const targets = getTargets().filter(t => t.type === 'daily');
            showTargetsModal('الأهداف اليومية', targets);
        }

        function showAllMonthlyTargetsModal() {
            const targets = getTargets().filter(t => t.type === 'monthly');
            showTargetsModal('الأهداف الشهرية', targets);
        }

        function showAllTasksModal() {
            const tasks = getTasks();
            showTasksModal('جميع المهام', tasks);
        }

        function showTargetsModal(title, targets) {
            const modalContent = `
                <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div class="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-96 overflow-y-auto">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-xl font-semibold text-gray-800">${title}</h3>
                            <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                                <i class="fas fa-times text-xl"></i>
                            </button>
                        </div>
                        
                        <div class="space-y-3">
                            ${targets.map(target => `
                                <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center space-x-3 space-x-reverse">
                                            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <i class="fas fa-bullseye text-blue-600"></i>
                                            </div>
                                            <div>
                                                <h4 class="font-semibold text-gray-800">${target.employeeName}</h4>
                                                <p class="text-sm text-gray-600">${target.points} نقطة</p>
                                            </div>
                                        </div>
                                        <div class="text-right">
                                            <span class="px-3 py-1 rounded-full text-sm ${getTargetStatusColor(target.status)}">${target.status}</span>
                                            <p class="text-xs text-gray-500 mt-1">${new Date(target.sentAt).toLocaleDateString('ar-EG')}</p>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalContent);
        }

        function showTasksModal(title, tasks) {
            const modalContent = `
                <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div class="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-96 overflow-y-auto">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-xl font-semibold text-gray-800">${title}</h3>
                            <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                                <i class="fas fa-times text-xl"></i>
                            </button>
                        </div>
                        
                        <div class="space-y-3">
                            ${tasks.map(task => `
                                <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center space-x-3 space-x-reverse">
                                            <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                                <i class="fas fa-tasks text-purple-600"></i>
                                            </div>
                                            <div>
                                                <h4 class="font-semibold text-gray-800">${task.employeeName}</h4>
                                                <p class="text-sm text-gray-600">${task.description}</p>
                                                <p class="text-xs text-gray-500">${task.branch}</p>
                                            </div>
                                        </div>
                                        <div class="text-right">
                                            <span class="px-3 py-1 rounded-full text-sm ${getTaskStatusColor(task.status)}">${task.status}</span>
                                            <p class="text-xs text-gray-500 mt-1">${new Date(task.sentAt).toLocaleDateString('ar-EG')}</p>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalContent);
        }

        function closeModal() {
            const modal = document.querySelector('.fixed.inset-0');
            if (modal) {
                modal.remove();
            }
        }

        // Loan Request Notification
        function sendLoanRequestNotification(loanRequest) {
            const notification = {
                id: Date.now(),
                from: currentUser.name,
                to: 'manager', // Send to manager
                type: 'طلب سلفة',
                subject: 'طلب سلفة جديد',
                message: `طلب سلفة جديد من ${loanRequest.employeeName} (${loanRequest.employeePosition} - ${loanRequest.employeeBranch}) بمبلغ ${loanRequest.amount.toLocaleString()} ج.م. السبب: ${loanRequest.reason}. تاريخ الاستحقاق: ${new Date(loanRequest.dueDate).toLocaleDateString('ar-EG')}`,
                timestamp: new Date().toISOString(),
                isRead: false,
                loanRequestId: loanRequest.id,
                employeeId: loanRequest.employeeId
            };

            const notifications = getNotifications();
            notifications.push(notification);
            localStorage.setItem('notifications', JSON.stringify(notifications));
        }

        // Employee Selection and Details Management
        function initializeEmployeeSelectionAndDetails() {
            const employeeSelection = document.getElementById('employee-selection');
            const refreshBtn = document.getElementById('refresh-employee-details-btn');
            const viewAllBtn = document.getElementById('view-all-employees-btn');

            if (employeeSelection) {
                employeeSelection.addEventListener('change', function() {
                    const selectedEmployeeId = this.value;
                    if (selectedEmployeeId) {
                        displayEmployeeDetails(selectedEmployeeId);
                    } else {
                        hideEmployeeDetails();
                    }
                });
            }

            if (refreshBtn) {
                refreshBtn.addEventListener('click', function() {
                    loadEmployeeSelection();
                    const selectedEmployeeId = document.getElementById('employee-selection').value;
                    if (selectedEmployeeId) {
                        displayEmployeeDetails(selectedEmployeeId);
                    }
                });
            }

            if (viewAllBtn) {
                viewAllBtn.addEventListener('click', function() {
                    showAllEmployeesModal();
                });
            }

            // Load initial data
            loadEmployeeSelection();
        }

        function loadEmployeeSelection() {
            const select = document.getElementById('employee-selection');
            if (!select) return;

            const employees = getAllEmployees();
            
            select.innerHTML = '<option value="">-- اختر موظف --</option>' + 
                employees.map(emp => `<option value="${emp.id}">${emp.name} - ${emp.position} (${emp.branch})</option>`).join('');
        }

        function displayEmployeeDetails(employeeId) {
            const employee = getEmployeeById(employeeId);
            if (!employee) return;

            // Show employee details card
            const detailsCard = document.getElementById('employee-details-card');
            const statistics = document.getElementById('employee-statistics');
            const operationsTable = document.getElementById('employee-operations-table');

            if (detailsCard) {
                detailsCard.classList.remove('hidden');
                document.getElementById('selected-employee-name').textContent = employee.name;
                document.getElementById('selected-employee-position').textContent = employee.position;
                document.getElementById('selected-employee-branch').textContent = employee.branch;
                document.getElementById('selected-employee-id').textContent = `#${employee.id}`;
            }

            // Load employee statistics
            loadEmployeeStatistics(employeeId);

            // Show statistics and operations table
            if (statistics) statistics.classList.remove('hidden');
            if (operationsTable) operationsTable.classList.remove('hidden');
        }

        function hideEmployeeDetails() {
            const detailsCard = document.getElementById('employee-details-card');
            const statistics = document.getElementById('employee-statistics');
            const operationsTable = document.getElementById('employee-operations-table');

            if (detailsCard) detailsCard.classList.add('hidden');
            if (statistics) statistics.classList.add('hidden');
            if (operationsTable) operationsTable.classList.add('hidden');
        }

        function loadEmployeeStatistics(employeeId) {
            const operations = getEmployeeOperations(employeeId);
            
            // Calculate statistics
            const totalOperations = operations.length;
            const totalPoints = operations.reduce((sum, op) => sum + (op.points || 0), 0);
            const avgOperations = totalOperations > 0 ? Math.round(totalOperations / 7) : 0; // Average per day
            const systemsUsed = new Set(operations.map(op => op.system)).size;

            // Update statistics display
            updateElement('employee-total-operations', totalOperations);
            updateElement('employee-total-points', totalPoints);
            updateElement('employee-avg-operations', avgOperations);
            updateElement('employee-systems-count', systemsUsed);

            // Load operations table
            loadEmployeeOperationsTable(operations);
        }

        function loadEmployeeOperationsTable(operations) {
            const tbody = document.getElementById('employee-operations-tbody');
            if (!tbody) return;

            if (operations.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="5" class="px-4 py-8 text-center text-gray-500">
                            <i class="fas fa-inbox text-4xl mb-2"></i>
                            <p>لا توجد عمليات مسجلة</p>
                        </td>
                    </tr>
                `;
                return;
            }

            // Sort by date (newest first)
            const sortedOperations = operations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

            tbody.innerHTML = sortedOperations.map(operation => `
                <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3 text-sm text-gray-600">${new Date(operation.timestamp).toLocaleDateString('ar-EG')}</td>
                    <td class="px-4 py-3 text-sm text-gray-600">${operation.system}</td>
                    <td class="px-4 py-3 text-sm text-gray-600">${operation.operationsCount}</td>
                    <td class="px-4 py-3 text-sm text-gray-600">${operation.points || 0}</td>
                    <td class="px-4 py-3 text-sm text-gray-600">${new Date(operation.timestamp).toLocaleTimeString('ar-EG')}</td>
                </tr>
            `).join('');
        }

        function showAllEmployeesModal() {
            const employees = getAllEmployees();
            
            const modalContent = `
                <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div class="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-96 overflow-y-auto">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-xl font-semibold text-gray-800">جميع الموظفين</h3>
                            <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                                <i class="fas fa-times text-xl"></i>
                            </button>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            ${employees.map(emp => `
                                <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer" onclick="selectEmployeeFromModal('${emp.id}')">
                                    <div class="flex items-center space-x-3 space-x-reverse mb-3">
                                        <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                            <i class="fas fa-user text-purple-600"></i>
                                        </div>
                                        <div>
                                            <h4 class="font-semibold text-gray-800">${emp.name}</h4>
                                            <p class="text-sm text-gray-600">${emp.position}</p>
                                        </div>
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        <p><i class="fas fa-building ml-1"></i> ${emp.branch}</p>
                                        <p><i class="fas fa-id-card ml-1"></i> #${emp.id}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalContent);
        }

        function selectEmployeeFromModal(employeeId) {
            const select = document.getElementById('employee-selection');
            if (select) {
                select.value = employeeId;
                displayEmployeeDetails(employeeId);
            }
            closeModal();
        }

        // Update loan button states when user changes
        function updateLoanButtonsOnUserChange() {
            if (currentUser && currentUser.role === 'employee') {
                loadEmployeeLoanData();
            } else if (currentUser && currentUser.role === 'manager') {
                loadManagerLoanRequests();
            }
        }

        // Area Manager Dashboard Management
        function initializeAreaManagerDashboard() {
            const branchSelection = document.getElementById('area-branch-selection');
            const timeFilter = document.getElementById('area-time-filter');
            const refreshBtn = document.getElementById('refresh-area-manager-btn');
            const performanceFilter = document.getElementById('area-filter-performance');

            if (branchSelection) {
                branchSelection.addEventListener('change', function() {
                    const selectedBranch = this.value;
                    const viewDetailsBtn = document.getElementById('view-branch-details-btn');
                    
                    if (selectedBranch) {
                        displayBranchDetails(selectedBranch);
                        updateAreaKPIsForBranch(selectedBranch);
                        if (viewDetailsBtn) {
                            viewDetailsBtn.disabled = false;
                            viewDetailsBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                        }
                        
                        // Force update after branch selection
                        setTimeout(() => {
                            updateAreaKPIsForBranch(selectedBranch);
                        }, 200);
                    } else {
                        hideBranchDetails();
                        updateAreaManagerKPIs(); // عرض KPIs العامة
                        if (viewDetailsBtn) {
                            viewDetailsBtn.disabled = true;
                            viewDetailsBtn.classList.add('opacity-50', 'cursor-not-allowed');
                        }
                        
                        // Force update general KPIs
                        setTimeout(() => {
                            updateAreaManagerKPIs();
                        }, 200);
                    }
                    
                    // إعادة تهيئة الزر بعد تغيير الفرع
                    setTimeout(() => {
                        initializeViewBranchDetailsButton();
                    }, 100);
                });
            }

            // Initialize view branch details button
            const viewBranchDetailsBtn = document.getElementById('view-branch-details-btn');
            if (viewBranchDetailsBtn) {
                viewBranchDetailsBtn.addEventListener('click', function() {
                    const selectedBranch = document.getElementById('area-branch-selection')?.value;
                    if (selectedBranch) {
                        showBranchManagerDetails(selectedBranch);
                    } else {
                        showNotificationStatus('يرجى اختيار فرع أولاً', 'warning');
                    }
                });
            }

            if (timeFilter) {
                timeFilter.addEventListener('change', function() {
                    updateAreaManagerData();
                    
                    // تحديث KPIs حسب الفترة الزمنية المحددة
                    const selectedBranch = document.getElementById('area-branch-selection')?.value;
                    if (selectedBranch) {
                        updateAreaKPIsForBranch(selectedBranch);
                    } else {
                        updateAreaManagerKPIs();
                    }
                });
            }

            if (refreshBtn) {
                refreshBtn.addEventListener('click', function() {
                    updateAreaManagerData();
                    
                    // تحديث KPIs بعد التحديث
                    const selectedBranch = document.getElementById('area-branch-selection')?.value;
                    if (selectedBranch) {
                        updateAreaKPIsForBranch(selectedBranch);
                    } else {
                        updateAreaManagerKPIs();
                    }
                });
            }

            if (performanceFilter) {
                performanceFilter.addEventListener('change', function() {
                    updateAreaManagerData();
                });
            }


            // Initialize branch management
            initializeBranchManagement();
            
            // Initialize branch notifications
            initializeBranchNotifications();
            
            // Initialize branch operations
            initializeBranchOperations();
            
            // Initialize branch employee performance
            initializeBranchEmployeePerformance();
            
            // Initialize all branches grid
            initializeAllBranchesGrid();
            
            // Load initial data
            updateAreaManagerData();
        }

        function updateAreaManagerData() {
            // Load branch selection
            loadAreaBranchSelection();
            
            // Update KPIs first
            updateAreaManagerKPIs();
            
            // Load all branches grid
            loadAllBranchesGrid();
            
            // Update branches comparison
            updateAreaBranchesComparison();
            
            // Update employee filter
            updateAreaEmployeeFilter();
            
            // Update branch notifications
            loadBranchNotifications();
            
            // Update branch operations
            loadBranchOperations();
            
            // Update branch employee performance
            loadBranchEmployeePerformance();
            
            // تحديث تفاصيل الفرع المحدد
            const selectedBranch = document.getElementById('area-branch-selection')?.value;
            if (selectedBranch) {
                loadBranchDetails(selectedBranch);
                updateAreaKPIsForBranch(selectedBranch);
            }
            
            // تحديث قائمة الفروع
            loadBranchesList();
            
            // تحديث إحصائيات الأداء
            updatePerformanceReport();
            
            // تحديث العمليات اليومية
            updateDailyOperationsStats();
            
            // تحديث جميع العروض
            updateAllDisplays();
            
            // تهيئة زر عرض تفاصيل الفرع
            initializeViewBranchDetailsButton();
            
            // Force update KPIs after a delay
            setTimeout(() => {
                updateAreaManagerKPIs();
                if (selectedBranch) {
                    updateAreaKPIsForBranch(selectedBranch);
                }
                
                // Force refresh all displays
                refreshAreaManagerDisplays();
            }, 300);
        }

        function loadAreaBranchSelection() {
            const select = document.getElementById('area-branch-selection');
            if (!select) return;

            const branches = getBranches();
            
            select.innerHTML = '<option value="">-- اختر الفرع --</option>' + 
                branches.map(branch => `<option value="${branch.name}">${branch.name}</option>`).join('');
            
            // Update view branch details button state
            const viewDetailsBtn = document.getElementById('view-branch-details-btn');
            if (viewDetailsBtn) {
                viewDetailsBtn.disabled = true;
                viewDetailsBtn.classList.add('opacity-50', 'cursor-not-allowed');
            }
        }

        function updateAreaManagerKPIs() {
            const employees = getAllEmployees();
            const allOperations = getAllEmployeesOperations();
            const branches = getBranches();
            
            // Calculate KPIs with safety checks
            const totalEmployees = cleanValue(employees.length);
            const totalOperations = cleanValue(allOperations.length);
            const totalPoints = allOperations.reduce((sum, op) => sum + cleanValue(op.points), 0);
            const totalBranches = cleanValue(branches.length);
            const avgPerformance = safePercentage(totalPoints, totalEmployees * 100); // Assuming 100 points per employee target

            // Update KPI elements
            updateElement('area-kpi-employees', totalEmployees);
            updateElement('area-kpi-operations', totalOperations);
            updateElement('area-kpi-points', totalPoints);
            updateElement('area-kpi-branches', totalBranches);
            updateElement('area-kpi-performance', avgPerformance + '%');
            
            // Force update with direct element access
            setTimeout(() => {
                const employeesEl = document.getElementById('area-kpi-employees');
                const operationsEl = document.getElementById('area-kpi-operations');
                const pointsEl = document.getElementById('area-kpi-points');
                const branchesEl = document.getElementById('area-kpi-branches');
                const performanceEl = document.getElementById('area-kpi-performance');
                
                if (employeesEl) {
                    employeesEl.textContent = totalEmployees;
                    employeesEl.style.opacity = '0.7';
                    setTimeout(() => { employeesEl.style.opacity = '1'; }, 100);
                }
                if (operationsEl) {
                    operationsEl.textContent = totalOperations;
                    operationsEl.style.opacity = '0.7';
                    setTimeout(() => { operationsEl.style.opacity = '1'; }, 100);
                }
                if (pointsEl) {
                    pointsEl.textContent = totalPoints;
                    pointsEl.style.opacity = '0.7';
                    setTimeout(() => { pointsEl.style.opacity = '1'; }, 100);
                }
                if (branchesEl) {
                    branchesEl.textContent = totalBranches;
                    branchesEl.style.opacity = '0.7';
                    setTimeout(() => { branchesEl.style.opacity = '1'; }, 100);
                }
                if (performanceEl) {
                    performanceEl.textContent = avgPerformance + '%';
                    performanceEl.style.opacity = '0.7';
                    setTimeout(() => { performanceEl.style.opacity = '1'; }, 100);
                }
            }, 100);
        }

        function updateAreaKPIsForBranch(branchName) {
            const employees = getAllEmployees();
            const allOperations = getAllEmployeesOperations();
            const branches = getBranches();
            
            // Get time filter
            const timeFilter = document.getElementById('area-time-filter')?.value || 'today';
            
            // Filter employees for selected branch
            const branchEmployees = employees.filter(emp => emp.branch === branchName);
            
            // Filter operations for selected branch employees
            const branchEmployeeIds = branchEmployees.map(emp => emp.id);
            let branchOperations = allOperations.filter(op => branchEmployeeIds.includes(op.employeeId));
            
            // Apply time filter
            const now = new Date();
            const today = now.toISOString().split('T')[0];
            
            switch (timeFilter) {
                case 'today':
                    branchOperations = branchOperations.filter(op => op.date === today);
                    break;
                case 'week':
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                    branchOperations = branchOperations.filter(op => op.date >= weekAgo);
                    break;
                case 'month':
                    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                    branchOperations = branchOperations.filter(op => op.date >= monthAgo);
                    break;
                case 'year':
                    const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                    branchOperations = branchOperations.filter(op => op.date >= yearAgo);
                    break;
            }
            
            // Calculate KPIs for selected branch with safety checks
            const totalEmployees = cleanValue(branchEmployees.length);
            const totalOperations = cleanValue(branchOperations.length);
            const totalPoints = branchOperations.reduce((sum, op) => sum + cleanValue(op.points), 0);
            const totalBranches = cleanValue(branches.length);
            const avgPerformance = safePercentage(totalPoints, totalEmployees * 100); // Assuming 100 points per employee target

            // Update KPI elements with branch-specific data
            updateElement('area-kpi-employees', totalEmployees);
            updateElement('area-kpi-operations', totalOperations);
            updateElement('area-kpi-points', totalPoints);
            updateElement('area-kpi-branches', totalBranches);
            updateElement('area-kpi-performance', avgPerformance + '%');
            
            // Force update the display
            setTimeout(() => {
                updateElement('area-kpi-employees', totalEmployees);
                updateElement('area-kpi-operations', totalOperations);
                updateElement('area-kpi-points', totalPoints);
                updateElement('area-kpi-branches', totalBranches);
                updateElement('area-kpi-performance', avgPerformance + '%');
                
                // Force visual update with animation
                const kpiElements = [
                    'area-kpi-employees',
                    'area-kpi-operations', 
                    'area-kpi-points',
                    'area-kpi-branches',
                    'area-kpi-performance'
                ];
                
                kpiElements.forEach(id => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.style.transform = 'scale(1.05)';
                        element.style.transition = 'transform 0.2s ease';
                        setTimeout(() => {
                            element.style.transform = 'scale(1)';
                        }, 200);
                    }
                });
            }, 200);
            
            // Additional update after a longer delay to ensure it works
            setTimeout(() => {
                const employeesEl = document.getElementById('area-kpi-employees');
                const operationsEl = document.getElementById('area-kpi-operations');
                const pointsEl = document.getElementById('area-kpi-points');
                const branchesEl = document.getElementById('area-kpi-branches');
                const performanceEl = document.getElementById('area-kpi-performance');
                
                if (employeesEl) employeesEl.textContent = totalEmployees;
                if (operationsEl) operationsEl.textContent = totalOperations;
                if (pointsEl) pointsEl.textContent = totalPoints;
                if (branchesEl) branchesEl.textContent = totalBranches;
                if (performanceEl) performanceEl.textContent = avgPerformance + '%';
            }, 500);
            
            // Final update to ensure it works
            setTimeout(() => {
                const employeesEl = document.getElementById('area-kpi-employees');
                const operationsEl = document.getElementById('area-kpi-operations');
                const pointsEl = document.getElementById('area-kpi-points');
                const branchesEl = document.getElementById('area-kpi-branches');
                const performanceEl = document.getElementById('area-kpi-performance');
                
                if (employeesEl) {
                    employeesEl.textContent = totalEmployees;
                    employeesEl.style.color = '#1f2937';
                    employeesEl.style.fontWeight = 'bold';
                }
                if (operationsEl) {
                    operationsEl.textContent = totalOperations;
                    operationsEl.style.color = '#1f2937';
                    operationsEl.style.fontWeight = 'bold';
                }
                if (pointsEl) {
                    pointsEl.textContent = totalPoints;
                    pointsEl.style.color = '#1f2937';
                    pointsEl.style.fontWeight = 'bold';
                }
                if (branchesEl) {
                    branchesEl.textContent = totalBranches;
                    branchesEl.style.color = '#1f2937';
                    branchesEl.style.fontWeight = 'bold';
                }
                if (performanceEl) {
                    performanceEl.textContent = avgPerformance + '%';
                    performanceEl.style.color = '#1f2937';
                    performanceEl.style.fontWeight = 'bold';
                }
            }, 800);
        }

        function displayBranchDetails(branchName) {
            const detailsDiv = document.getElementById('selected-branch-details');
            
            if (detailsDiv) {
                detailsDiv.classList.remove('hidden');
            }

            // Load branch data
            loadBranchDetails(branchName);
        }

        function hideBranchDetails() {
            const detailsDiv = document.getElementById('selected-branch-details');
            if (detailsDiv) {
                detailsDiv.classList.add('hidden');
            }
        }


        function updateManagerDashboardForBranch(branchName) {
            // Update branch name in manager dashboard
            const managerBranchNameEl = document.getElementById('manager-branch-name');
            const managerBranchSubtitleEl = document.getElementById('manager-branch-subtitle');
            
            if (managerBranchNameEl) {
                managerBranchNameEl.textContent = branchName;
            }
            if (managerBranchSubtitleEl) {
                managerBranchSubtitleEl.textContent = `مدير الفرع - ${branchName}`;
            }

            // Get branch data
            const employees = getAllEmployees().filter(emp => emp.branch === branchName);
            const allOperations = getAllEmployeesOperations();
            const branchEmployeeIds = employees.map(emp => emp.id);
            const branchOperations = allOperations.filter(op => branchEmployeeIds.includes(op.employeeId));

            // Calculate KPIs for the branch with safety checks
            const totalEmployees = cleanValue(employees.length);
            const totalOperations = cleanValue(branchOperations.length);
            const totalPoints = branchOperations.reduce((sum, op) => sum + cleanValue(op.points), 0);
            const completionRate = safePercentage(totalPoints, totalEmployees * 100); // Assuming 100 points per employee per month
            const monthlyTarget = totalEmployees * 100; // Assuming 100 points per employee per month

            // Update KPI elements
            updateElement('kpi-employees', totalEmployees);
            updateElement('kpi-ops', totalOperations);
            updateElement('kpi-completion', completionRate + '%');
            updateElement('kpi-target', monthlyTarget);

            // Load employees list for the branch
            loadManagerEmployeesList(employees, branchOperations);

            // Load employee details for the branch
            loadManagerEmployeeDetails(employees, branchOperations);
        }

        function loadManagerEmployeesList(employees, operations) {
            const container = document.getElementById('manager-employees-list');
            if (!container) return;

            if (employees.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-users text-4xl mb-2"></i>
                        <p>لا توجد بيانات موظفين</p>
                        <p class="text-sm">قم بتسجيل العمليات أولاً</p>
                    </div>
                `;
                return;
            }

            // Calculate employee statistics
            const employeeStats = employees.map(emp => {
                const empOperations = operations.filter(op => op.employeeId === emp.id);
                const totalOps = empOperations.length;
                const totalPoints = empOperations.reduce((sum, op) => sum + (op.points || 0), 0);
                const completion = totalPoints > 0 ? Math.round((totalPoints / 100) * 100) : 0; // Assuming 100 points target
                
                return {
                    ...emp,
                    ops: totalOps,
                    completion: completion,
                    points: totalPoints
                };
            });

            container.innerHTML = employeeStats.map((emp, idx) => {
                const color = emp.completion >= 90 ? 'text-green-600' : emp.completion >= 80 ? 'text-amber-600' : 'text-red-600';
                const barColor = emp.completion >= 90 ? 'bg-green-500' : emp.completion >= 80 ? 'bg-yellow-500' : 'bg-red-500';
                
                return `
                    <div class="p-4 rounded-xl bg-white border border-gray-100">
                        <div class="flex items-center justify-between">
                            <div class="font-semibold text-gray-800">${emp.name}</div>
                            <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-700 text-sm">${idx + 1}</span>
                        </div>
                        <div class="mt-3 flex items-center space-x-3 space-x-reverse">
                            <div class="w-20 text-sm ${color} font-bold">${emp.completion}%</div>
                            <div class="flex-1 h-2 bg-gray-200 rounded-full">
                                <div class="h-2 ${barColor} rounded-full" style="width:${Math.min(100, emp.completion)}%"></div>
                            </div>
                            <div class="w-20 text-xs text-gray-500 text-left">${emp.ops} عمليات</div>
                        </div>
                        <div class="mt-3 text-center text-xs text-gray-500">
                            <div>النقاط: <span class="font-semibold text-gray-700">${emp.points}</span></div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function loadManagerEmployeeDetails(employees, operations) {
            const container = document.getElementById('manager-employee-details');
            if (!container) return;

            if (employees.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-user text-4xl mb-2"></i>
                        <p>لا توجد بيانات موظفين</p>
                    </div>
                `;
                return;
            }

            // Create employee selection dropdown
            const employeeSelect = document.createElement('select');
            employeeSelect.className = 'w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4';
            employeeSelect.innerHTML = '<option value="">اختر موظفاً لعرض تفاصيله</option>' + 
                employees.map(emp => `<option value="${emp.id}">${emp.name}</option>`).join('');

            const detailsContainer = document.createElement('div');
            detailsContainer.className = 'mt-4 p-4 bg-gray-50 rounded-lg';

            employeeSelect.addEventListener('change', function() {
                const selectedEmployeeId = this.value;
                if (!selectedEmployeeId) {
                    detailsContainer.innerHTML = '<p class="text-gray-500 text-center">اختر موظفاً لعرض تفاصيله</p>';
                    return;
                }

                const employee = employees.find(emp => emp.id === selectedEmployeeId);
                const empOperations = operations.filter(op => op.employeeId === selectedEmployeeId);
                
                if (!employee) return;

                const totalOps = empOperations.length;
                const totalPoints = empOperations.reduce((sum, op) => sum + (op.points || 0), 0);
                const completion = totalPoints > 0 ? Math.round((totalPoints / 100) * 100) : 0;

                detailsContainer.innerHTML = `
                    <div class="bg-white p-6 rounded-lg">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">${employee.name}</h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div class="text-center p-4 bg-blue-50 rounded-lg">
                                <div class="text-2xl font-bold text-blue-600">${totalOps}</div>
                                <div class="text-sm text-gray-600">إجمالي العمليات</div>
                            </div>
                            <div class="text-center p-4 bg-green-50 rounded-lg">
                                <div class="text-2xl font-bold text-green-600">${totalPoints}</div>
                                <div class="text-sm text-gray-600">إجمالي النقاط</div>
                            </div>
                            <div class="text-center p-4 bg-purple-50 rounded-lg">
                                <div class="text-2xl font-bold text-purple-600">${completion}%</div>
                                <div class="text-sm text-gray-600">نسبة الإنجاز</div>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <h4 class="font-semibold text-gray-700">آخر العمليات:</h4>
                            ${empOperations.slice(0, 5).map(op => `
                                <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                                    <span class="text-sm">${op.system} - ${op.operation}</span>
                                    <span class="text-sm font-semibold">+${op.points} نقطة</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            });

            container.innerHTML = '';
            container.appendChild(employeeSelect);
            container.appendChild(detailsContainer);
        }

        function showBranchManagerDetails(branchName) {
            // Create modal for branch details
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
            modal.innerHTML = `
                <div class="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                    <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                        <h2 class="text-2xl font-bold text-gray-800 flex items-center">
                            <i class="fas fa-building text-indigo-600 ml-3"></i>
                            تفاصيل ${branchName}
                        </h2>
                        <button id="close-branch-details-modal" class="text-gray-400 hover:text-gray-600 text-2xl">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="p-6">
                        <div id="branch-manager-details-content">
                            <!-- Branch details will be loaded here -->
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            // Close modal functionality
            const closeBtn = modal.querySelector('#close-branch-details-modal');
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });

            // Close on backdrop click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });

            // Load branch details
            loadBranchManagerDetailsContent(branchName, modal.querySelector('#branch-manager-details-content'));
        }

        function initializeViewBranchDetailsButton() {
            // Use setTimeout to ensure the element exists
            setTimeout(() => {
                const viewBranchDetailsBtn = document.getElementById('view-branch-details-btn');
                if (viewBranchDetailsBtn) {
                    // Remove all existing event listeners
                    const newBtn = viewBranchDetailsBtn.cloneNode(true);
                    viewBranchDetailsBtn.parentNode.replaceChild(newBtn, viewBranchDetailsBtn);
                    
                    // Add new event listener
                    newBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        const selectedBranch = document.getElementById('area-branch-selection')?.value;
                        if (selectedBranch) {
                            showBranchManagerDetails(selectedBranch);
                        } else {
                            showNotificationStatus('يرجى اختيار فرع أولاً', 'warning');
                        }
                    });
                }
            }, 100);
        }

        function loadBranchManagerDetailsContent(branchName, container) {
            const branches = getBranches();
            const branch = branches.find(b => b.name === branchName);
            const employees = getAllEmployees().filter(emp => emp.branch === branchName);
            const allOperations = getAllEmployeesOperations();
            const branchEmployeeIds = employees.map(emp => emp.id);
            const branchOperations = allOperations.filter(op => branchEmployeeIds.includes(op.employeeId));

            if (!branch) {
                container.innerHTML = '<p class="text-center text-gray-500">الفرع غير موجود</p>';
                return;
            }

            // Calculate branch statistics with safety checks
            const totalEmployees = cleanValue(employees.length);
            const totalOperations = cleanValue(branchOperations.length);
            const totalPoints = branchOperations.reduce((sum, op) => sum + cleanValue(op.points), 0);
            const completionRate = safePercentage(totalPoints, totalEmployees * 100); // Assuming 100 points per employee target

            container.innerHTML = `
                <div class="space-y-6">
                    <!-- Branch Header -->
                    <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-4 space-x-reverse">
                                <div class="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                                    <i class="fas fa-building text-3xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-2xl font-bold">${branch.name}</h3>
                                    <p class="text-indigo-100">${branch.address}</p>
                                    <p class="text-indigo-100">مدير الفرع: ${branch.manager}</p>
                                    <p class="text-indigo-100">الهاتف: ${branch.phone}</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="text-3xl font-bold">${totalEmployees}</p>
                                <p class="text-indigo-100">موظف</p>
                            </div>
                        </div>
                    </div>

                    <!-- Branch KPIs -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <i class="fas fa-users text-blue-600 text-xl"></i>
                            </div>
                            <p class="text-2xl font-bold text-gray-800">${totalEmployees}</p>
                            <p class="text-sm text-gray-600">الموظفين</p>
                        </div>
                        <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <i class="fas fa-chart-bar text-green-600 text-xl"></i>
                            </div>
                            <p class="text-2xl font-bold text-gray-800">${totalOperations}</p>
                            <p class="text-sm text-gray-600">العمليات</p>
                        </div>
                        <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <i class="fas fa-star text-purple-600 text-xl"></i>
                            </div>
                            <p class="text-2xl font-bold text-gray-800">${totalPoints}</p>
                            <p class="text-sm text-gray-600">النقاط</p>
                        </div>
                        <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <i class="fas fa-chart-pie text-orange-600 text-xl"></i>
                            </div>
                            <p class="text-2xl font-bold text-gray-800">${completionRate}%</p>
                            <p class="text-sm text-gray-600">نسبة الإنجاز</p>
                        </div>
                    </div>

                    <!-- Employees List -->
                    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div class="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-4">
                            <h3 class="text-xl font-bold text-white flex items-center">
                                <i class="fas fa-users ml-3"></i>
                                موظفو الفرع
                            </h3>
                        </div>
                        <div class="p-6">
                            ${employees.length === 0 ? `
                                <div class="text-center py-8 text-gray-500">
                                    <i class="fas fa-users text-4xl mb-2"></i>
                                    <p>لا يوجد موظفون في هذا الفرع</p>
                                </div>
                            ` : `
                                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    ${employees.map(emp => {
                                        const empOperations = branchOperations.filter(op => op.employeeId === emp.id);
                                        const empPoints = empOperations.reduce((sum, op) => sum + cleanValue(op.points), 0);
                                        const empCompletion = safePercentage(empPoints, 100);
                                        
                                        return `
                                            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                                <div class="flex items-center justify-between mb-3">
                                                    <div class="flex items-center space-x-3 space-x-reverse">
                                                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                            <i class="fas fa-user text-blue-600"></i>
                                                        </div>
                                                        <div>
                                                            <h4 class="font-semibold text-gray-800">${emp.name}</h4>
                                                            <p class="text-sm text-gray-600">${emp.position || 'موظف'}</p>
                                                        </div>
                                                    </div>
                                                    <div class="text-right">
                                                        <p class="text-sm text-gray-600">${empOperations.length} عملية</p>
                                                        <p class="text-sm text-gray-600">${empPoints} نقطة</p>
                                                    </div>
                                                </div>
                                                <div class="w-full bg-gray-200 rounded-full h-2">
                                                    <div class="bg-blue-600 h-2 rounded-full" style="width: ${Math.min(100, empCompletion)}%"></div>
                                                </div>
                                                <p class="text-xs text-gray-500 mt-1">${empCompletion}% إنجاز</p>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            `}
                        </div>
                    </div>

                    <!-- Recent Operations -->
                    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div class="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
                            <h3 class="text-xl font-bold text-white flex items-center">
                                <i class="fas fa-chart-line ml-3"></i>
                                آخر العمليات
                            </h3>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الموظف</th>
                                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النظام</th>
                                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العمليات</th>
                                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النقاط</th>
                                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    ${branchOperations.slice(0, 10).map(op => `
                                        <tr class="hover:bg-gray-50 transition-colors">
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center ml-3">
                                                        <i class="fas fa-user text-blue-600 text-sm"></i>
                                                    </div>
                                                    <div>
                                                        <div class="text-sm font-medium text-gray-900">${op.employeeName}</div>
                                                        <div class="text-sm text-gray-500">#${op.employeeId}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    ${op.systemName || op.system}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                ${op.operations}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <span class="font-semibold text-green-600">+${op.points}</span>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                ${formatDate(op.date)}
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        }

        function loadBranchDetails(branchName) {
            const branches = getBranches();
            const branch = branches.find(b => b.name === branchName);
            const employees = getAllEmployees().filter(emp => emp.branch === branchName);
            const allOperations = getAllEmployeesOperations();
            
            // Apply time filter
            const timeFilter = document.getElementById('area-time-filter')?.value || 'today';
            let branchOperations = allOperations.filter(op => {
                const emp = getAllEmployees().find(e => e.id === op.employeeId);
                return emp && emp.branch === branchName;
            });

            // Apply time filter to operations
            const now = new Date();
            const today = now.toISOString().split('T')[0];
            
            switch (timeFilter) {
                case 'today':
                    branchOperations = branchOperations.filter(op => op.date === today);
                    break;
                case 'week':
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                    branchOperations = branchOperations.filter(op => op.date >= weekAgo);
                    break;
                case 'month':
                    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                    branchOperations = branchOperations.filter(op => op.date >= monthAgo);
                    break;
                case 'year':
                    const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                    branchOperations = branchOperations.filter(op => op.date >= yearAgo);
                    break;
            }

            if (!branch) return;

            // Update branch header
            updateElement('selected-branch-name', branch.name);
            updateElement('selected-branch-address', branch.address);
            updateElement('selected-branch-manager', branch.manager);
            updateElement('selected-branch-phone', branch.phone);

            // Calculate branch statistics
            const employeesCount = employees.length;
            const operationsCount = branchOperations.length;
            const pointsCount = branchOperations.reduce((sum, op) => sum + (op.points || 0), 0);
            const performance = employeesCount > 0 ? Math.round((pointsCount / employeesCount) * 100) / 100 : 0;

            // Update branch statistics
            updateElement('branch-employees-count', employeesCount);
            updateElement('branch-operations-count', operationsCount);
            updateElement('branch-points-count', pointsCount);
            updateElement('branch-performance', performance + '%');

            // Load branch employees list
            loadBranchEmployeesList(employees);

            // Load branch operations chart
            loadBranchOperationsChart(branches, employees, branchOperations);

            // Load branch recent operations
            loadBranchRecentOperations(branchOperations, employees);
            
            // Load detailed operations view
            loadDetailedBranchOperations(branchOperations, employees, branchName);
        }

        function loadDetailedBranchOperations(operations, employees, branchName) {
            const container = document.getElementById('branch-operations-details');
            if (!container) return;

            if (operations.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-12 text-gray-500">
                        <i class="fas fa-chart-line text-6xl mb-4 text-gray-300"></i>
                        <h3 class="text-xl font-semibold mb-2">لا توجد عمليات</h3>
                        <p>لم يتم تسجيل أي عمليات في ${branchName} للفترة المحددة</p>
                    </div>
                `;
                return;
            }

            // Add branch header
            const branchHeader = `
                <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 mb-6 text-white">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4 space-x-reverse">
                            <div class="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                                <i class="fas fa-building text-3xl"></i>
                            </div>
                            <div>
                                <h2 class="text-2xl font-bold">${branchName}</h2>
                                <p class="text-indigo-100">تفاصيل العمليات والإحصائيات</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-3xl font-bold">${operations.length}</p>
                            <p class="text-indigo-100">إجمالي العمليات</p>
                        </div>
                    </div>
                </div>
            `;

            // Group operations by system
            const systemGroups = operations.reduce((groups, op) => {
                const system = op.systemName || op.system || 'غير محدد';
                if (!groups[system]) {
                    groups[system] = [];
                }
                groups[system].push(op);
                return groups;
            }, {});

            // Calculate system statistics with safety checks
            const systemStats = Object.keys(systemGroups).map(system => {
                const systemOps = systemGroups[system];
                const totalOps = systemOps.reduce((sum, op) => sum + cleanValue(op.operations), 0);
                const totalPoints = systemOps.reduce((sum, op) => sum + cleanValue(op.points), 0);
                const avgOpsPerEmployee = safeAverage(totalOps, employees.length);
                
                return {
                    system,
                    operations: systemOps,
                    totalOps,
                    totalPoints,
                    avgOpsPerEmployee,
                    count: systemOps.length
                };
            }).sort((a, b) => b.totalOps - a.totalOps);

            // Group operations by date
            const dateGroups = operations.reduce((groups, op) => {
                const date = op.date;
                if (!groups[date]) {
                    groups[date] = [];
                }
                groups[date].push(op);
                return groups;
            }, {});

            const sortedDates = Object.keys(dateGroups).sort((a, b) => new Date(b) - new Date(a));

            container.innerHTML = branchHeader + `
                <div class="space-y-6">
                    <!-- Quick Statistics -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <i class="fas fa-users text-blue-600 text-xl"></i>
                            </div>
                            <p class="text-2xl font-bold text-gray-800">${employees.length}</p>
                            <p class="text-sm text-gray-600">الموظفين</p>
                        </div>
                        <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <i class="fas fa-chart-bar text-green-600 text-xl"></i>
                            </div>
                            <p class="text-2xl font-bold text-gray-800">${operations.reduce((sum, op) => sum + cleanValue(op.operations), 0)}</p>
                            <p class="text-sm text-gray-600">إجمالي العمليات</p>
                        </div>
                        <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <i class="fas fa-star text-purple-600 text-xl"></i>
                            </div>
                            <p class="text-2xl font-bold text-gray-800">${operations.reduce((sum, op) => sum + cleanValue(op.points), 0)}</p>
                            <p class="text-sm text-gray-600">إجمالي النقاط</p>
                        </div>
                        <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <i class="fas fa-chart-pie text-orange-600 text-xl"></i>
                            </div>
                            <p class="text-2xl font-bold text-gray-800">${safeAverage(operations.reduce((sum, op) => sum + cleanValue(op.points), 0), employees.length)}</p>
                            <p class="text-sm text-gray-600">متوسط الأداء</p>
                        </div>
                    </div>

                    <!-- System Statistics Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${systemStats.map(stat => `
                            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                                <div class="flex items-center justify-between mb-4">
                                    <div class="flex items-center space-x-3 space-x-reverse">
                                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <i class="fas fa-cogs text-blue-600 text-xl"></i>
                                        </div>
                                        <div>
                                            <h4 class="font-bold text-gray-800 text-lg">${stat.system}</h4>
                                            <p class="text-sm text-gray-600">${stat.count} عملية</p>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-2xl font-bold text-blue-600">${stat.totalOps}</p>
                                        <p class="text-sm text-gray-600">إجمالي العمليات</p>
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 gap-4 pt-4 border-t border-blue-200">
                                    <div class="text-center">
                                        <p class="text-lg font-semibold text-gray-800">${stat.totalPoints}</p>
                                        <p class="text-xs text-gray-600">النقاط</p>
                                    </div>
                                    <div class="text-center">
                                        <p class="text-lg font-semibold text-gray-800">${stat.avgOpsPerEmployee}</p>
                                        <p class="text-xs text-gray-600">متوسط/موظف</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Daily Operations Timeline -->
                    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div class="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
                            <h3 class="text-xl font-bold text-white flex items-center">
                                <i class="fas fa-calendar-alt ml-3"></i>
                                العمليات اليومية
                            </h3>
                        </div>
                        <div class="p-6">
                            <div class="space-y-4">
                                ${sortedDates.map(date => {
                                    const dayOps = dateGroups[date];
                                    const dayTotalOps = dayOps.reduce((sum, op) => sum + cleanValue(op.operations), 0);
                                    const dayTotalPoints = dayOps.reduce((sum, op) => sum + cleanValue(op.points), 0);
                                    const dayEmployees = [...new Set(dayOps.map(op => op.employeeId).filter(id => id))].length;
                                    
                                    return `
                                        <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div class="flex items-center justify-between mb-3">
                                                <div class="flex items-center space-x-3 space-x-reverse">
                                                    <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                        <i class="fas fa-calendar-day text-green-600"></i>
                                                    </div>
                                                    <div>
                                                        <h4 class="font-semibold text-gray-800">${formatDate(date)}</h4>
                                                        <p class="text-sm text-gray-600">${dayEmployees} موظف نشط</p>
                                                    </div>
                                                </div>
                                                <div class="text-right">
                                                    <p class="text-xl font-bold text-green-600">${dayTotalOps}</p>
                                                    <p class="text-sm text-gray-600">عملية</p>
                                                </div>
                                            </div>
                                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div class="text-center p-3 bg-gray-50 rounded-lg">
                                                    <p class="text-lg font-semibold text-gray-800">${dayTotalPoints}</p>
                                                    <p class="text-xs text-gray-600">إجمالي النقاط</p>
                                                </div>
                                                <div class="text-center p-3 bg-gray-50 rounded-lg">
                                                    <p class="text-lg font-semibold text-gray-800">${dayOps.length}</p>
                                                    <p class="text-xs text-gray-600">عدد العمليات</p>
                                                </div>
                                                <div class="text-center p-3 bg-gray-50 rounded-lg">
                                                    <p class="text-lg font-semibold text-gray-800">${Math.round(dayTotalOps / dayEmployees)}</p>
                                                    <p class="text-xs text-gray-600">متوسط/موظف</p>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Recent Operations Table -->
                    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div class="bg-gradient-to-r from-purple-500 to-violet-600 px-6 py-4">
                            <h3 class="text-xl font-bold text-white flex items-center">
                                <i class="fas fa-list ml-3"></i>
                                آخر العمليات المسجلة
                            </h3>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الموظف</th>
                                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النظام</th>
                                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العمليات</th>
                                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النقاط</th>
                                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
                                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الوقت</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    ${operations.slice(0, 10).map(op => `
                                        <tr class="hover:bg-gray-50 transition-colors">
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center ml-3">
                                                        <i class="fas fa-user text-blue-600 text-sm"></i>
                                                    </div>
                                                    <div>
                                                        <div class="text-sm font-medium text-gray-900">${op.employeeName}</div>
                                                        <div class="text-sm text-gray-500">#${op.employeeId}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    ${op.systemName || op.system}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                ${op.operations}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <span class="font-semibold text-green-600">+${op.points}</span>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                ${formatDate(op.date)}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                ${op.time || '--:--'}
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        }

        function formatDate(dateStr) {
            const date = new Date(dateStr);
            const today = new Date();
            const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
            
            if (dateStr === today.toISOString().split('T')[0]) {
                return 'اليوم';
            } else if (dateStr === yesterday.toISOString().split('T')[0]) {
                return 'أمس';
            } else {
                return date.toLocaleDateString('ar-EG', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }
        }

        function loadBranchEmployeesList(employees) {
            const container = document.getElementById('branch-employees-list');
            if (!container) return;

            if (employees.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-users text-4xl mb-2"></i>
                        <p>لا يوجد موظفون في هذا الفرع</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = employees.map(emp => {
                const empOperations = getAllEmployeesOperations().filter(op => op.employeeId === emp.id);
                const empPoints = empOperations.reduce((sum, op) => sum + (op.points || 0), 0);
                
                return `
                    <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-3 space-x-reverse">
                                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <i class="fas fa-user text-blue-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-800">${emp.name}</h4>
                                    <p class="text-sm text-gray-600">${emp.position}</p>
                                    <p class="text-xs text-gray-500">#${emp.id}</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="text-sm text-gray-600">${empOperations.length} عملية</p>
                                <p class="text-sm text-gray-600">${empPoints} نقطة</p>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function initializeAllBranchesGrid() {
            const refreshBtn = document.getElementById('refresh-all-branches-btn');
            const gridBtn = document.getElementById('view-branches-grid-btn');

            if (refreshBtn) {
                refreshBtn.addEventListener('click', function() {
                    loadAllBranchesGrid();
                });
            }

            if (gridBtn) {
                gridBtn.addEventListener('click', function() {
                    loadAllBranchesGrid();
                });
            }

            // Load initial grid
            loadAllBranchesGrid();
        }

        function loadAllBranchesGrid() {
            const container = document.getElementById('all-branches-grid');
            if (!container) return;

            const branches = getBranches();
            const employees = getAllEmployees();
            const allOperations = getAllEmployeesOperations();

            if (branches.length === 0) {
                container.innerHTML = `
                    <div class="col-span-full text-center py-12 text-gray-500">
                        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-building text-3xl text-gray-400"></i>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">لا توجد فروع</h3>
                        <p class="text-sm text-gray-500">اضغط "إضافة فرع" لإنشاء فرع جديد</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = branches.map(branch => {
                const branchEmployees = employees.filter(emp => emp.branch === branch.name);
                const branchOperations = allOperations.filter(op => {
                    const emp = employees.find(e => e.id === op.employeeId);
                    return emp && emp.branch === branch.name;
                });
                const branchPoints = branchOperations.reduce((sum, op) => sum + (op.points || 0), 0);
                const avgPerformance = branchEmployees.length > 0 ? Math.round((branchPoints / branchEmployees.length) * 100) / 100 : 0;

                // Get performance color based on performance
                const getPerformanceColor = (performance) => {
                    if (performance >= 80) return 'text-green-600 bg-green-100';
                    if (performance >= 60) return 'text-yellow-600 bg-yellow-100';
                    return 'text-red-600 bg-red-100';
                };

                const performanceColor = getPerformanceColor(avgPerformance);

                return `
                    <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-indigo-300 group">
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center space-x-3 space-x-reverse">
                                <div class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center">
                                    <i class="fas fa-building text-white text-lg"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-800 text-lg">${branch.name}</h4>
                                    <p class="text-sm text-gray-600 flex items-center">
                                        <i class="fas fa-map-marker-alt ml-1 text-gray-400"></i>
                                        ${branch.address}
                                    </p>
                                </div>
                            </div>
                            <div class="text-right">
                                <span class="px-3 py-1 rounded-full text-xs font-medium ${performanceColor}">
                                    ${avgPerformance}% أداء
                                </span>
                            </div>
                        </div>

                        <div class="space-y-3 mb-4">
                            <div class="flex items-center justify-between text-sm">
                                <span class="text-gray-500 flex items-center">
                                    <i class="fas fa-user-tie ml-1"></i>
                                    مدير الفرع بنى سويف 
                                </span>
                                <span class="font-medium text-gray-800">${branch.manager}</span>
                            </div>
                            <div class="flex items-center justify-between text-sm">
                                <span class="text-gray-500 flex items-center">
                                    <i class="fas fa-phone ml-1"></i>
                                    الهاتف
                                </span>
                                <span class="font-medium text-gray-800">${branch.phone}</span>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4 mb-4">
                            <div class="text-center p-3 bg-blue-50 rounded-lg">
                                <div class="text-2xl font-bold text-blue-600">${branchEmployees.length}</div>
                                <div class="text-xs text-blue-600">موظف</div>
                            </div>
                            <div class="text-center p-3 bg-green-50 rounded-lg">
                                <div class="text-2xl font-bold text-green-600">${branchOperations.length}</div>
                                <div class="text-xs text-green-600">عملية</div>
                            </div>
                        </div>

                        <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div class="text-xs text-gray-400">
                                ${new Date(branch.createdAt).toLocaleDateString('ar-SA')}
                            </div>
                            <div class="flex items-center space-x-2 space-x-reverse">
                                <button onclick="viewBranchDetails('${branch.name}')" class="bg-indigo-600 text-white px-3 py-1 rounded text-xs hover:bg-indigo-700 transition-colors">
                                    <i class="fas fa-eye ml-1"></i>عرض
                                </button>
                                <button onclick="editBranch(${branch.id})" class="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                                    <i class="fas fa-edit ml-1"></i>تعديل
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function updateAreaBranchesComparison() {
            const container = document.getElementById('area-branches-comparison');
            if (!container) return;

            const employees = getAllEmployees();
            const allOperations = getAllEmployeesOperations();
            const branches = getBranches();

            if (branches.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-building text-4xl mb-2"></i>
                        <p>لا توجد فروع</p>
                        <p class="text-sm">اضغط "إضافة فرع" لإنشاء فرع جديد</p>
                    </div>
                `;
                return;
            }

            const branchStats = branches.map(branch => {
                const branchEmployees = employees.filter(emp => emp.branch === branch.name);
                const branchOperations = allOperations.filter(op => {
                    const emp = employees.find(e => e.id === op.employeeId);
                    return emp && emp.branch === branch.name;
                });
                const branchPoints = branchOperations.reduce((sum, op) => sum + (op.points || 0), 0);
                const avgPerformance = branchEmployees.length > 0 ? Math.round((branchPoints / branchEmployees.length) * 100) / 100 : 0;

                return {
                    name: branch.name,
                    address: branch.address,
                    manager: branch.manager,
                    phone: branch.phone,
                    employees: branchEmployees.length,
                    operations: branchOperations.length,
                    points: branchPoints,
                    avgPerformance: avgPerformance
                };
            }).sort((a, b) => b.points - a.points);

            container.innerHTML = branchStats.map(branch => `
                <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-3 space-x-reverse">
                            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <i class="fas fa-building text-green-600"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800">${branch.name}</h4>
                                <p class="text-sm text-gray-600">${branch.address}</p>
                                <p class="text-xs text-gray-500">مدير الفرع: ${branch.manager}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-lg font-bold text-gray-800">${branch.points} نقطة</p>
                            <p class="text-sm text-gray-600">${branch.avgPerformance}% متوسط الأداء</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                            <p class="text-sm text-gray-500">الموظفين</p>
                            <p class="text-lg font-semibold text-blue-600">${branch.employees}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">العمليات</p>
                            <p class="text-lg font-semibold text-green-600">${branch.operations}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">النقاط</p>
                            <p class="text-lg font-semibold text-purple-600">${branch.points}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">الأداء</p>
                            <p class="text-lg font-semibold text-orange-600">${branch.avgPerformance}%</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function updateAreaEmployeeFilter() {
            const select = document.getElementById('area-employee-filter');
            if (!select) return;

            const employees = getAllEmployees();
            
            select.innerHTML = '<option value="">جميع الموظفين</option>' + 
                employees.map(emp => `<option value="${emp.id}">${emp.name} - ${emp.branch}</option>`).join('');
        }

        // Branch Notifications and Alerts Management
        function initializeBranchNotifications() {
            const refreshBtn = document.getElementById('refresh-branch-notifications-btn');
            const viewAllBtn = document.getElementById('view-all-branch-notifications-btn');

            if (refreshBtn) {
                refreshBtn.addEventListener('click', function() {
                    loadBranchNotifications();
                });
            }

            if (viewAllBtn) {
                viewAllBtn.addEventListener('click', function() {
                    showAllBranchNotifications();
                });
            }

            // Load initial notifications
            loadBranchNotifications();
        }

        function loadBranchNotifications() {
            const notifications = getBranchNotifications();
            const employees = getAllEmployees();
            const branches = getBranches();

            // Update summary cards
            updateBranchNotificationsSummary(notifications);

            // Load notifications list
            loadBranchNotificationsList(notifications, employees, branches);
        }

        function getBranchNotifications() {
            const allNotifications = getNotifications();
            const employees = getAllEmployees();
            
            // Filter notifications related to branches
            return allNotifications.filter(notification => {
                if (notification.recipient === 'area_manager') return true;
                if (notification.sender === 'area_manager') return true;
                
                // Check if notification is from/to branch employees
                const senderEmp = employees.find(emp => emp.id === notification.senderId);
                const recipientEmp = employees.find(emp => emp.id === notification.recipientId);
                
                return senderEmp || recipientEmp;
            });
        }

        function updateBranchNotificationsSummary(notifications) {
            const total = notifications.length;
            const urgent = notifications.filter(n => n.priority === 'urgent' || n.type === 'urgent').length;
            const withAttachments = notifications.filter(n => n.attachments && n.attachments.length > 0).length;
            const completed = notifications.filter(n => n.status === 'completed').length;

            updateElement('total-branch-notifications', total);
            updateElement('urgent-branch-notifications', urgent);
            updateElement('pending-branch-attachments', withAttachments);
            updateElement('completed-branch-tasks', completed);
        }

        function loadBranchNotificationsList(notifications, employees, branches) {
            const container = document.getElementById('branch-notifications-list');
            if (!container) return;

            if (notifications.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-bell text-4xl mb-2"></i>
                        <p>لا توجد تنبيهات</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = notifications.slice(0, 10).map(notification => {
                const senderEmp = employees.find(emp => emp.id === notification.senderId);
                const recipientEmp = employees.find(emp => emp.id === notification.recipientId);
                const branch = branches.find(b => 
                    (senderEmp && b.name === senderEmp.branch) || 
                    (recipientEmp && b.name === recipientEmp.branch)
                );

                const priorityColor = notification.priority === 'urgent' ? 'bg-red-100 border-red-300' : 'bg-blue-100 border-blue-300';
                const hasAttachments = notification.attachments && notification.attachments.length > 0;

                return `
                    <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow ${priorityColor}">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center space-x-2 space-x-reverse">
                                <i class="fas fa-bell text-yellow-600"></i>
                                <span class="font-semibold text-gray-800">${notification.title || 'تنبيه'}</span>
                                ${notification.priority === 'urgent' ? '<span class="bg-red-500 text-white text-xs px-2 py-1 rounded">عاجل</span>' : ''}
                            </div>
                            <span class="text-sm text-gray-500">${formatDate(notification.timestamp)}</span>
                        </div>
                        <p class="text-gray-600 text-sm mb-2">${notification.message}</p>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                                <span>من: ${notification.senderName || 'غير محدد'}</span>
                                <span>إلى: ${notification.recipientName || 'غير محدد'}</span>
                                ${branch ? `<span>الفرع: ${branch.name}</span>` : ''}
                            </div>
                            <div class="flex items-center space-x-2 space-x-reverse">
                                ${hasAttachments ? '<i class="fas fa-paperclip text-blue-600"></i>' : ''}
                                <span class="text-xs text-gray-400">${getTimeAgo(notification.timestamp)}</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function showAllBranchNotifications() {
            // Create modal to show all notifications
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            modal.innerHTML = `
                <div class="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-96 overflow-y-auto">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-800">جميع تنبيهات الفروع</h3>
                        <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div id="all-branch-notifications-list" class="space-y-3">
                        <!-- All notifications will be loaded here -->
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            // Load all notifications
            const notifications = getBranchNotifications();
            const employees = getAllEmployees();
            const branches = getBranches();
            loadBranchNotificationsList(notifications, employees, branches, 'all-branch-notifications-list');
        }

        // Branch Operations Management
        function initializeBranchOperations() {
            const refreshBtn = document.getElementById('refresh-branch-operations-btn');
            const filterSelect = document.getElementById('branch-operations-filter');

            if (refreshBtn) {
                refreshBtn.addEventListener('click', function() {
                    loadBranchOperations();
                });
            }

            if (filterSelect) {
                filterSelect.addEventListener('change', function() {
                    loadBranchOperations();
                });
            }

            // Load initial operations
            loadBranchOperations();
        }

        function loadBranchOperations() {
            const branches = getBranches();
            const employees = getAllEmployees();
            const allOperations = getAllEmployeesOperations();
            const selectedBranch = document.getElementById('branch-operations-filter').value;

            // Update filter options
            updateBranchOperationsFilter(branches);

            // Filter operations by selected branch
            let filteredOperations = allOperations;
            if (selectedBranch) {
                filteredOperations = allOperations.filter(op => {
                    const emp = employees.find(e => e.id === op.employeeId);
                    return emp && emp.branch === selectedBranch;
                });
            }

            // Load operations table
            loadBranchOperationsTable(branches, employees, filteredOperations);

            // Load operations chart
            loadBranchOperationsChart(branches, employees, filteredOperations);
            
            // Load detailed operations view
            if (selectedBranch) {
                loadDetailedBranchOperations(filteredOperations, employees.filter(emp => emp.branch === selectedBranch), selectedBranch);
            } else {
                // Clear detailed view when no branch is selected
                const detailsContainer = document.getElementById('branch-operations-details');
                if (detailsContainer) {
                    detailsContainer.innerHTML = `
                        <div class="text-center py-12 text-gray-500">
                            <i class="fas fa-chart-line text-6xl mb-4 text-gray-300"></i>
                            <h3 class="text-xl font-semibold mb-2">اختر فرع لعرض التفاصيل</h3>
                            <p>يرجى اختيار فرع من القائمة المنسدلة لعرض تفاصيل العمليات</p>
                        </div>
                    `;
                }
            }
        }

        function updateBranchOperationsFilter(branches) {
            const select = document.getElementById('branch-operations-filter');
            if (!select) return;

            select.innerHTML = '<option value="">جميع الفروع</option>' + 
                branches.map(branch => `<option value="${branch.name}">${branch.name}</option>`).join('');
        }

        function loadBranchOperationsTable(branches, employees, operations) {
            const tbody = document.getElementById('branch-operations-tbody');
            if (!tbody) return;

            // Group operations by branch
            const branchStats = {};
            branches.forEach(branch => {
                const branchEmployees = employees.filter(emp => emp.branch === branch.name);
                const branchOperations = operations.filter(op => {
                    const emp = employees.find(e => e.id === op.employeeId);
                    return emp && emp.branch === branch.name;
                });
                const branchPoints = branchOperations.reduce((sum, op) => sum + (op.points || 0), 0);
                const systems = calculateBranchSystems(branchOperations);

                branchStats[branch.name] = {
                    ...branch,
                    operations: branchOperations.length,
                    points: branchPoints,
                    systems: Object.keys(systems).length,
                    performance: branchEmployees.length > 0 ? Math.round((branchPoints / branchEmployees.length) * 100) / 100 : 0
                };
            });

            tbody.innerHTML = Object.values(branchStats).map(branch => `
                <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3 text-sm text-gray-800">${branch.name}</td>
                    <td class="px-4 py-3 text-sm text-gray-600">${branch.operations}</td>
                    <td class="px-4 py-3 text-sm text-gray-600">${branch.points}</td>
                    <td class="px-4 py-3 text-sm text-gray-600">${branch.systems}</td>
                    <td class="px-4 py-3 text-sm text-gray-600">${branch.performance}%</td>
                </tr>
            `).join('');
        }

        function loadBranchOperationsChart(branches, employees, operations) {
            const canvas = document.getElementById('branch-operations-chart');
            if (!canvas) return;

            // Simple chart implementation (you can replace with Chart.js)
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Group operations by system
            const systemStats = {};
            operations.forEach(op => {
                if (op.system) {
                    systemStats[op.system] = (systemStats[op.system] || 0) + (op.count || 0);
                }
            });

            if (Object.keys(systemStats).length === 0) {
                // Draw "No data" message
                ctx.fillStyle = '#6B7280';
                ctx.font = '16px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('لا توجد بيانات', canvas.width / 2, canvas.height / 2);
                return;
            }

            // Draw simple bar chart
            const maxOps = Math.max(...Object.values(systemStats));
            const barWidth = canvas.width / Object.keys(systemStats).length;
            const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

            Object.entries(systemStats).forEach(([systemName, ops], index) => {
                const barHeight = (ops / maxOps) * canvas.height * 0.8;
                const x = index * barWidth;
                const y = canvas.height - barHeight;

                ctx.fillStyle = colors[index % colors.length];
                ctx.fillRect(x + 10, y, barWidth - 20, barHeight);

                // Draw system name
                ctx.fillStyle = '#374151';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(systemName, x + barWidth / 2, canvas.height - 5);
            });
        }

        function loadBranchRecentOperations(operations, employees) {
            const tbody = document.getElementById('branch-recent-operations-tbody');
            if (!tbody) return;

            // Sort operations by date (newest first) and take last 10
            const recentOperations = operations
                .sort((a, b) => new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date))
                .slice(0, 10);

            if (recentOperations.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="5" class="px-4 py-8 text-center text-gray-500">
                            <i class="fas fa-inbox text-4xl mb-2"></i>
                            <p>لا توجد عمليات</p>
                        </td>
                    </tr>
                `;
                return;
            }

            tbody.innerHTML = recentOperations.map(op => {
                const emp = employees.find(e => e.id === op.employeeId);
                const empName = emp ? emp.name : 'غير محدد';
                const date = op.timestamp ? new Date(op.timestamp).toLocaleDateString('ar-SA') : 
                           op.date ? new Date(op.date).toLocaleDateString('ar-SA') : 'غير محدد';

                return `
                    <tr class="hover:bg-gray-50">
                        <td class="px-4 py-3 text-sm text-gray-800">${empName}</td>
                        <td class="px-4 py-3 text-sm text-gray-600">${op.system || 'غير محدد'}</td>
                        <td class="px-4 py-3 text-sm text-gray-600">${op.count || 0}</td>
                        <td class="px-4 py-3 text-sm text-gray-600">${op.points || 0}</td>
                        <td class="px-4 py-3 text-sm text-gray-600">${date}</td>
                    </tr>
                `;
            }).join('');
        }

        // Branch Employee Performance Management
        function initializeBranchEmployeePerformance() {
            const refreshBtn = document.getElementById('refresh-branch-employee-performance-btn');
            const filterSelect = document.getElementById('branch-employee-performance-filter');

            if (refreshBtn) {
                refreshBtn.addEventListener('click', function() {
                    loadBranchEmployeePerformance();
                });
            }

            if (filterSelect) {
                filterSelect.addEventListener('change', function() {
                    loadBranchEmployeePerformance();
                });
            }

            // Load initial performance
            loadBranchEmployeePerformance();
        }

        function loadBranchEmployeePerformance() {
            const branches = getBranches();
            const employees = getAllEmployees();
            const allOperations = getAllEmployeesOperations();
            const selectedBranch = document.getElementById('branch-employee-performance-filter').value;

            // Update filter options
            updateBranchEmployeePerformanceFilter(branches);

            // Filter employees by selected branch
            let filteredEmployees = employees;
            if (selectedBranch) {
                filteredEmployees = employees.filter(emp => emp.branch === selectedBranch);
            }

            // Load performance cards
            loadBranchEmployeePerformanceCards(branches, filteredEmployees, allOperations);

            // Load performance table
            loadBranchEmployeePerformanceTable(branches, filteredEmployees, allOperations);
        }

        function updateBranchEmployeePerformanceFilter(branches) {
            const select = document.getElementById('branch-employee-performance-filter');
            if (!select) return;

            select.innerHTML = '<option value="">جميع الفروع</option>' + 
                branches.map(branch => `<option value="${branch.name}">${branch.name}</option>`).join('');
        }

        function loadBranchEmployeePerformanceCards(branches, employees, allOperations) {
            const container = document.getElementById('branch-employee-performance-cards');
            if (!container) return;

            // Group employees by branch
            const branchEmployeeStats = {};
            branches.forEach(branch => {
                const branchEmployees = employees.filter(emp => emp.branch === branch.name);
                const branchOperations = allOperations.filter(op => {
                    const emp = employees.find(e => e.id === op.employeeId);
                    return emp && emp.branch === branch.name;
                });
                const branchPoints = branchOperations.reduce((sum, op) => sum + (op.points || 0), 0);

                branchEmployeeStats[branch.name] = {
                    employees: branchEmployees.length,
                    operations: branchOperations.length,
                    points: branchPoints,
                    avgPerformance: branchEmployees.length > 0 ? Math.round((branchPoints / branchEmployees.length) * 100) / 100 : 0
                };
            });

            container.innerHTML = Object.entries(branchEmployeeStats).map(([branchName, stats]) => `
                <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-3 space-x-reverse">
                            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <i class="fas fa-building text-purple-600"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800">${branchName}</h4>
                                <p class="text-sm text-gray-600">${stats.employees} موظف</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-lg font-bold text-purple-600">${stats.avgPerformance}%</p>
                            <p class="text-sm text-gray-600">متوسط الأداء</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p class="text-sm text-gray-500">العمليات</p>
                            <p class="text-lg font-semibold text-green-600">${stats.operations}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">النقاط</p>
                            <p class="text-lg font-semibold text-blue-600">${stats.points}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function loadBranchEmployeePerformanceTable(branches, employees, allOperations) {
            const tbody = document.getElementById('branch-employee-performance-tbody');
            if (!tbody) return;

            tbody.innerHTML = employees.map(emp => {
                const empOperations = allOperations.filter(op => op.employeeId === emp.id);
                const empPoints = empOperations.reduce((sum, op) => sum + (op.points || 0), 0);
                const performance = empOperations.length > 0 ? Math.round((empPoints / empOperations.length) * 100) / 100 : 0;

                return `
                    <tr class="hover:bg-gray-50">
                        <td class="px-4 py-3 text-sm text-gray-800">${emp.branch}</td>
                        <td class="px-4 py-3 text-sm text-gray-800">${emp.name}</td>
                        <td class="px-4 py-3 text-sm text-gray-600">${empOperations.length}</td>
                        <td class="px-4 py-3 text-sm text-gray-600">${empPoints}</td>
                        <td class="px-4 py-3 text-sm text-gray-600">${performance}%</td>
                    </tr>
                `;
            }).join('');
        }

        // Real-time data synchronization from Branch Manager to Area Manager
        function syncDataFromBranchManager() {
            // This function is called when branch manager makes changes
            // It updates the area manager dashboard in real-time
            
            // Force refresh all data from localStorage
            refreshAllDataFromStorage();
            
            if (currentUser && currentUser.role === 'area_manager') {
                updateAreaManagerData();
                
                // Force update all displays
                setTimeout(() => {
                    refreshAreaManagerDisplays();
                }, 100);
            }
        }

        function refreshAllDataFromStorage() {
            // Force refresh all data from localStorage
            try {
                // Clear any cached data
                if (window.cachedEmployees) delete window.cachedEmployees;
                if (window.cachedOperations) delete window.cachedOperations;
                if (window.cachedBranches) delete window.cachedBranches;
                
                // Force reload from localStorage
                const employees = getAllEmployees();
                const operations = getAllEmployeesOperations();
                const branches = getBranches();
                
                // Update global data
                window.allEmployees = employees;
                window.allOperations = operations;
                window.allBranches = branches;
                
            } catch (error) {
                console.error('Error refreshing data from storage:', error);
            }
        }

        // Enhanced localStorage management
        function saveToLocalStorage(key, data) {
            try {
                const serializedData = JSON.stringify(data);
                localStorage.setItem(key, serializedData);
                
                // Trigger sync if area manager is logged in
                if (currentUser && currentUser.role === 'area_manager') {
                    setTimeout(() => {
                        syncDataFromBranchManager();
                    }, 50);
                }
                
                return true;
            } catch (error) {
                console.error('Error saving to localStorage:', error);
                return false;
            }
        }

        function loadFromLocalStorage(key, defaultValue = null) {
            try {
                const data = localStorage.getItem(key);
                return data ? JSON.parse(data) : defaultValue;
            } catch (error) {
                console.error('Error loading from localStorage:', error);
                return defaultValue;
            }
        }

        // Enhanced data synchronization
        function syncAllData() {
            // Sync employees
            const employees = getAllEmployees();
            saveToLocalStorage('allEmployees', employees);
            
            // Sync operations
            const operations = getAllEmployeesOperations();
            saveToLocalStorage('allOperations', operations);
            
            // Sync branches
            const branches = getBranches();
            saveToLocalStorage('allBranches', branches);
            
            // Update global variables
            window.allEmployees = employees;
            window.allOperations = operations;
            window.allBranches = branches;
        }

        // Override functions that modify data to trigger area manager updates
        function syncWithAreaManager() {
            // Call this function whenever data is modified by branch manager
            setTimeout(() => {
                // Sync data from branch manager
                syncDataFromBranchManager();
                
                // Update area manager dashboard if open
                if (currentUser && currentUser.role === 'area_manager') {
                    updateAreaManagerData();
                    updateAreaManagerKPIs();
                    
                    // Update branch-specific data if a branch is selected
                    const selectedBranch = document.getElementById('area-branch-selection')?.value;
                    if (selectedBranch) {
                        updateAreaKPIsForBranch(selectedBranch);
                        displayBranchDetails(selectedBranch);
                    }
                }
                
                // Force refresh all area manager displays
                refreshAreaManagerDisplays();
            }, 100);
        }

        function refreshAreaManagerDisplays() {
            // Force refresh all area manager displays
            setTimeout(() => {
                // Update all KPI elements
                const kpiElements = [
                    'area-kpi-employees',
                    'area-kpi-operations', 
                    'area-kpi-points',
                    'area-kpi-branches',
                    'area-kpi-performance'
                ];
                
                kpiElements.forEach(id => {
                    const element = document.getElementById(id);
                    if (element) {
                        // Force re-render by temporarily hiding and showing
                        element.style.opacity = '0.5';
                        setTimeout(() => {
                            element.style.opacity = '1';
                        }, 50);
                    }
                });
                
                // Update branch details if visible
                const branchDetails = document.getElementById('selected-branch-details');
                if (branchDetails && !branchDetails.classList.contains('hidden')) {
                    const selectedBranch = document.getElementById('area-branch-selection')?.value;
                    if (selectedBranch) {
                        loadBranchDetails(selectedBranch);
                    }
                }
            }, 200);
        }

        // Override recordDailyOperation to sync with area manager
        const originalRecordDailyOperation = recordDailyOperation;
        recordDailyOperation = function() {
            const result = originalRecordDailyOperation.apply(this, arguments);
            syncAllData(); // Sync all data
            syncWithAreaManager();
            return result;
        };

        // Override addNewEmployee to sync with area manager
        const originalAddNewEmployee = addNewEmployee;
        addNewEmployee = function() {
            const result = originalAddNewEmployee.apply(this, arguments);
            syncAllData(); // Sync all data
            syncWithAreaManager();
            return result;
        };

        // Override sendEmployeeNotification to sync with area manager
        const originalSendEmployeeNotification = sendEmployeeNotification;
        sendEmployeeNotification = function() {
            const result = originalSendEmployeeNotification.apply(this, arguments);
            syncAllData(); // Sync all data
            syncWithAreaManager();
            return result;
        };

        // Override sendManagerNotification to sync with area manager
        const originalSendManagerNotification = sendManagerNotification;
        sendManagerNotification = function() {
            const result = originalSendManagerNotification.apply(this, arguments);
            syncAllData(); // Sync all data
            syncWithAreaManager();
            return result;
        };

        // Override submitLoanRequest to sync with area manager
        const originalSubmitLoanRequest = submitLoanRequest;
        submitLoanRequest = function() {
            const result = originalSubmitLoanRequest.apply(this, arguments);
            syncAllData(); // Sync all data
            syncWithAreaManager();
            return result;
        };

        // Override approveLoanRequest to sync with area manager
        const originalApproveLoanRequest = approveLoanRequest;
        approveLoanRequest = function() {
            const result = originalApproveLoanRequest.apply(this, arguments);
            syncAllData(); // Sync all data
            syncWithAreaManager();
            return result;
        };

        // Override rejectLoanRequest to sync with area manager
        const originalRejectLoanRequest = rejectLoanRequest;
        rejectLoanRequest = function() {
            const result = originalRejectLoanRequest.apply(this, arguments);
            syncWithAreaManager();
            return result;
        };

        // Branch Management Functions
        function initializeBranchManagement() {
            const addBranchBtn = document.getElementById('add-branch-btn');
            const saveBranchBtn = document.getElementById('save-branch-btn');
            const cancelBranchBtn = document.getElementById('cancel-branch-btn');
            const closeBranchModal = document.getElementById('close-branch-modal');
            const refreshBranchesBtn = document.getElementById('refresh-branches-btn');
            const addBranchForm = document.getElementById('add-branch-form');

            // Modal form buttons
            if (addBranchBtn) {
                addBranchBtn.addEventListener('click', function() {
                    console.log('Add Branch Button clicked!');
                    showAddBranchForm();
                });
            } else {
                console.log('Add Branch Button not found!');
            }

            if (saveBranchBtn) {
                saveBranchBtn.addEventListener('click', function() {
                    saveBranch();
                });
            }

            if (addBranchForm) {
                addBranchForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    saveBranch();
                });
            }

            if (cancelBranchBtn) {
                cancelBranchBtn.addEventListener('click', function() {
                    hideAddBranchForm();
                });
            }

            if (closeBranchModal) {
                closeBranchModal.addEventListener('click', function() {
                    hideAddBranchForm();
                });
            }

            // Close modal when clicking outside
            const addBranchModal = document.getElementById('add-branch-modal');
            if (addBranchModal) {
                addBranchModal.addEventListener('click', function(e) {
                    if (e.target === addBranchModal) {
                        hideAddBranchForm();
                    }
                });
            }

            if (refreshBranchesBtn) {
                refreshBranchesBtn.addEventListener('click', function() {
                    loadBranchesList();
                });
            }

            // Area manager form buttons (embedded form)
            const areaSaveBranchBtn = document.getElementById('area-save-branch-btn');
            const areaCancelBranchBtn = document.getElementById('area-cancel-branch-btn');

            console.log('Area Save Branch Button:', areaSaveBranchBtn);
            console.log('Area Cancel Branch Button:', areaCancelBranchBtn);

            if (areaSaveBranchBtn) {
                areaSaveBranchBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('Area Save Branch Button clicked!');
                    saveBranch();
                });
            }

            if (areaCancelBranchBtn) {
                areaCancelBranchBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('Area Cancel Branch Button clicked!');
                    hideAddBranchForm();
                });
            }

            // Load initial branches
            loadBranchesList();
            
            // Test function to verify button functionality
            testBranchFormButtons();
        }

        function testBranchFormButtons() {
            console.log('Testing Branch Form Buttons...');
            
            const addBranchBtn = document.getElementById('add-branch-btn');
            const areaSaveBranchBtn = document.getElementById('area-save-branch-btn');
            const areaCancelBranchBtn = document.getElementById('area-cancel-branch-btn');
            
            console.log('Add Branch Button found:', !!addBranchBtn);
            console.log('Area Save Branch Button found:', !!areaSaveBranchBtn);
            console.log('Area Cancel Branch Button found:', !!areaCancelBranchBtn);
            
            // Test if the form is visible
            const addBranchForm = document.getElementById('add-branch-form');
            if (addBranchForm) {
                console.log('Add Branch Form found:', !!addBranchForm);
                console.log('Add Branch Form hidden:', addBranchForm.classList.contains('hidden'));
            }
            
            // Test form inputs
            const branchName = document.getElementById('area-branch-name');
            const branchAddress = document.getElementById('area-branch-address');
            const branchManager = document.getElementById('area-branch-manager');
            const branchPhone = document.getElementById('area-branch-phone');
            
            console.log('Form inputs found:');
            console.log('- Branch Name:', !!branchName);
            console.log('- Branch Address:', !!branchAddress);
            console.log('- Branch Manager:', !!branchManager);
            console.log('- Branch Phone:', !!branchPhone);
        }

        function showAddBranchForm() {
            console.log('showAddBranchForm called');
            
            // Check if we're in area manager dashboard
            const currentUser = getCurrentUser();
            console.log('Current user role:', currentUser ? currentUser.role : 'none');
            
            if (currentUser && currentUser.role === 'area_manager') {
                const form = document.getElementById('add-branch-form');
                console.log('Area manager form found:', !!form);
                if (form) {
                    form.classList.remove('hidden');
                    form.scrollIntoView({ behavior: 'smooth' });
                    console.log('Form shown successfully');
                } else {
                    console.error('Area manager form not found!');
                }
            } else {
                // Use modal for other roles
                const modal = document.getElementById('add-branch-modal');
                console.log('Modal found:', !!modal);
                if (modal) {
                    modal.classList.remove('hidden');
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                    console.log('Modal shown successfully');
                } else {
                    console.error('Modal not found!');
                }
            }
        }

        function hideAddBranchForm() {
            // Check if we're in area manager dashboard
            const currentUser = getCurrentUser();
            if (currentUser && currentUser.role === 'area_manager') {
                const form = document.getElementById('add-branch-form');
                if (form) {
                    form.classList.add('hidden');
                    clearBranchForm();
                }
            } else {
                // Use modal for other roles
                const modal = document.getElementById('add-branch-modal');
                if (modal) {
                    modal.classList.add('hidden');
                    document.body.style.overflow = 'auto'; // Restore scrolling
                    clearBranchForm();
                }
            }
        }

        function clearBranchForm() {
            // Clear modal form
            const branchName = document.getElementById('branch-name');
            const branchAddress = document.getElementById('branch-address');
            const branchManager = document.getElementById('branch-manager');
            const branchPhone = document.getElementById('branch-phone');
            
            if (branchName) branchName.value = '';
            if (branchAddress) branchAddress.value = '';
            if (branchManager) branchManager.value = '';
            if (branchPhone) branchPhone.value = '';

            // Clear area manager form
            const areaBranchName = document.getElementById('area-branch-name');
            const areaBranchAddress = document.getElementById('area-branch-address');
            const areaBranchManager = document.getElementById('area-branch-manager');
            const areaBranchPhone = document.getElementById('area-branch-phone');
            
            if (areaBranchName) areaBranchName.value = '';
            if (areaBranchAddress) areaBranchAddress.value = '';
            if (areaBranchManager) areaBranchManager.value = '';
            if (areaBranchPhone) areaBranchPhone.value = '';
        }

        // Clear area manager loan form
        function clearAreaLoanForm() {
            const areaLoanAmount = document.getElementById('area-loan-amount');
            const areaLoanReason = document.getElementById('area-loan-reason');
            
            if (areaLoanAmount) areaLoanAmount.value = '';
            if (areaLoanReason) areaLoanReason.value = '';
        }

        function saveBranch() {
            // Check which form is being used
            const currentUser = getCurrentUser();
            let name, address, manager, phone;
            
            if (currentUser && currentUser.role === 'area_manager') {
                // Use area manager form
                const nameEl = document.getElementById('area-branch-name');
                const addressEl = document.getElementById('area-branch-address');
                const managerEl = document.getElementById('area-branch-manager');
                const phoneEl = document.getElementById('area-branch-phone');
                
                name = nameEl ? nameEl.value.trim() : '';
                address = addressEl ? addressEl.value.trim() : '';
                manager = managerEl ? managerEl.value.trim() : '';
                phone = phoneEl ? phoneEl.value.trim() : '';
            } else {
                // Use modal form
                const nameEl = document.getElementById('branch-name');
                const addressEl = document.getElementById('branch-address');
                const managerEl = document.getElementById('branch-manager');
                const phoneEl = document.getElementById('branch-phone');
                
                name = nameEl ? nameEl.value.trim() : '';
                address = addressEl ? addressEl.value.trim() : '';
                manager = managerEl ? managerEl.value.trim() : '';
                phone = phoneEl ? phoneEl.value.trim() : '';
            }

            // Validate required fields
            if (!name || !address || !manager || !phone) {
                showBranchStatus('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }

            // Validate name length
            if (name.length < 3) {
                showBranchStatus('اسم الفرع يجب أن يكون 3 أحرف على الأقل', 'error');
                return;
            }

            // Validate phone format
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phone)) {
                showBranchStatus('رقم الهاتف غير صحيح', 'error');
                return;
            }

            const saveBtn = document.getElementById('save-branch-btn');
            const branchId = saveBtn.getAttribute('data-branch-id');
            const branches = getBranches();

            // Check for duplicate names (excluding current branch if editing)
            const existingBranch = branches.find(b => b.name.toLowerCase() === name.toLowerCase() && b.id != branchId);
            if (existingBranch) {
                showBranchStatus('يوجد فرع بهذا الاسم بالفعل', 'error');
                return;
            }

            if (branchId) {
                // Update existing branch
                const branchIndex = branches.findIndex(b => b.id == branchId);
                if (branchIndex !== -1) {
                    branches[branchIndex] = {
                        ...branches[branchIndex],
                        name: name,
                        address: address,
                        manager: manager,
                        phone: phone,
                        updatedAt: new Date().toISOString()
                    };
                    localStorage.setItem('branches', JSON.stringify(branches));
                    showBranchStatus('تم تحديث الفرع بنجاح', 'success');
                    
                    // Update area manager branch selection
                    loadAreaBranchSelection();
                }
            } else {
                // Add new branch
                const branch = {
                    id: Date.now(),
                    name: name,
                    address: address,
                    manager: manager,
                    phone: phone,
                    createdAt: new Date().toISOString(),
                    employees: []
                };

                branches.push(branch);
                localStorage.setItem('branches', JSON.stringify(branches));
                
                // Create branch manager account automatically
                createBranchManagerAccount(branch);
                
                showBranchStatus('تم إضافة الفرع ومدير الفرع بنجاح', 'success');
            }

            // Reset form and reload
            hideAddBranchForm();
            loadBranchesList();
            updateAreaManagerData();
            
            // Update area manager branch selection
            loadAreaBranchSelection();
            
            // مزامنة مع مدير المنطقة
            syncWithAreaManager();
        }

        function getBranches() {
            const branches = localStorage.getItem('branches');
            return branches ? JSON.parse(branches) : [];
        }

        function loadBranchesList() {
            const container = document.getElementById('branches-list');
            if (!container) return;

            const branches = getBranches();
            const employees = getAllEmployees();

            if (branches.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-12 text-gray-500">
                        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-building text-3xl text-gray-400"></i>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">لا توجد فروع</h3>
                        <p class="text-sm text-gray-500 mb-4">اضغط "إضافة فرع" لإنشاء فرع جديد</p>
                        <button id="add-branch-btn-empty" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            <i class="fas fa-plus ml-2"></i>إضافة فرع
                        </button>
                    </div>
                `;
                
                // Add event listener for empty state button
                const emptyBtn = document.getElementById('add-branch-btn-empty');
                if (emptyBtn) {
                    emptyBtn.addEventListener('click', function() {
                        showAddBranchForm();
                    });
                }
                return;
            }

            container.innerHTML = branches.map(branch => {
                const branchEmployees = employees.filter(emp => emp.branch === branch.name);
                const branchOperations = getAllEmployeesOperations().filter(op => {
                    const emp = employees.find(e => e.id === op.employeeId);
                    return emp && emp.branch === branch.name;
                });
                const branchPoints = branchOperations.reduce((sum, op) => sum + (op.points || 0), 0);
                const performance = branchEmployees.length > 0 ? Math.round((branchPoints / branchEmployees.length) * 100) / 100 : 0;

                return `
                    <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300">
                        <div class="flex items-center justify-between mb-6">
                            <div class="flex items-center space-x-4 space-x-reverse">
                                <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                    <i class="fas fa-building text-white text-xl"></i>
                                </div>
                                <div>
                                    <h4 class="text-xl font-bold text-gray-800">${branch.name}</h4>
                                    <p class="text-sm text-gray-600 flex items-center">
                                        <i class="fas fa-map-marker-alt ml-1 text-gray-400"></i>
                                        ${branch.address}
                                    </p>
                                    <p class="text-xs text-gray-500 flex items-center mt-1">
                                        <i class="fas fa-user-tie ml-1 text-gray-400"></i>
                                        مدير الفرع: ${branch.manager}
                                    </p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-2 space-x-reverse">
                                <button onclick="viewBranchDetails('${branch.name}')" class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center">
                                    <i class="fas fa-eye ml-1"></i>عرض التفاصيل
                                </button>
                                <button onclick="editBranch(${branch.id})" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center">
                                    <i class="fas fa-edit ml-1"></i>تعديل
                                </button>
                                <button onclick="deleteBranch(${branch.id})" class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors flex items-center">
                                    <i class="fas fa-trash ml-1"></i>حذف
                                </button>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div class="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg text-center">
                                <div class="flex items-center justify-center mb-2">
                                    <i class="fas fa-users text-blue-600 text-lg"></i>
                                </div>
                                <p class="text-sm text-blue-600 font-medium">الموظفين</p>
                                <p class="text-2xl font-bold text-blue-700">${branchEmployees.length}</p>
                            </div>
                            <div class="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg text-center">
                                <div class="flex items-center justify-center mb-2">
                                    <i class="fas fa-chart-bar text-green-600 text-lg"></i>
                                </div>
                                <p class="text-sm text-green-600 font-medium">العمليات</p>
                                <p class="text-2xl font-bold text-green-700">${branchOperations.length}</p>
                            </div>
                            <div class="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg text-center">
                                <div class="flex items-center justify-center mb-2">
                                    <i class="fas fa-star text-purple-600 text-lg"></i>
                                </div>
                                <p class="text-sm text-purple-600 font-medium">النقاط</p>
                                <p class="text-2xl font-bold text-purple-700">${branchPoints}</p>
                            </div>
                            <div class="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg text-center">
                                <div class="flex items-center justify-center mb-2">
                                    <i class="fas fa-chart-pie text-orange-600 text-lg"></i>
                                </div>
                                <p class="text-sm text-orange-600 font-medium">الأداء</p>
                                <p class="text-2xl font-bold text-orange-700">${performance}%</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div class="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                                <i class="fas fa-phone text-gray-400"></i>
                                <span>${branch.phone}</span>
                            </div>
                            <div class="text-xs text-gray-400">
                                تم الإنشاء: ${new Date(branch.createdAt).toLocaleDateString('ar-SA')}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function editBranch(branchId) {
            const branches = getBranches();
            const branch = branches.find(b => b.id === branchId);
            if (!branch) return;

            // Fill form with branch data
            document.getElementById('branch-name').value = branch.name;
            document.getElementById('branch-address').value = branch.address;
            document.getElementById('branch-manager').value = branch.manager;
            document.getElementById('branch-phone').value = branch.phone;

            // Show form
            showAddBranchForm();

            // Update save button to edit mode
            const saveBtn = document.getElementById('save-branch-btn');
            if (saveBtn) {
                saveBtn.setAttribute('data-branch-id', branchId);
                saveBtn.innerHTML = '<i class="fas fa-save ml-2"></i>تحديث الفرع';
            }
        }

        function deleteBranch(branchId) {
            if (!confirm('هل أنت متأكد من حذف هذا الفرع؟')) return;

            const branches = getBranches();
            const updatedBranches = branches.filter(b => b.id !== branchId);
            localStorage.setItem('branches', JSON.stringify(updatedBranches));

            showBranchStatus('تم حذف الفرع بنجاح', 'success');
            loadBranchesList();
            updateAreaManagerData();
            
            // Update area manager branch selection
            loadAreaBranchSelection();
            
            // مزامنة مع مدير المنطقة
            syncWithAreaManager();
        }

        function viewBranchDetails(branchName) {
            // Select the branch in the dropdown
            const branchSelect = document.getElementById('area-branch-selection');
            if (branchSelect) {
                branchSelect.value = branchName;
                // Trigger change event
                const event = new Event('change', { bubbles: true });
                branchSelect.dispatchEvent(event);
            }
            
            // Scroll to branch details section
            const branchDetails = document.getElementById('selected-branch-details');
            if (branchDetails) {
                branchDetails.scrollIntoView({ behavior: 'smooth' });
            }
        }

        function createBranchManagerAccount(branch) {
            try {
                // Generate username and password for branch manager
                const username = `manager_${branch.id}`;
                const password = `manager_${branch.id}_pass`;
                
                // Create branch manager account
                const branchManager = {
                    id: Date.now() + Math.random(),
                    username: username,
                    password: password,
                    name: branch.manager,
                    position: 'مدير الفرع',
                    branch: branch.name,
                    email: `${username}@company.com`,
                    phone: branch.phone,
                    role: 'manager',
                    createdAt: new Date().toISOString(),
                    isActive: true,
                    branchId: branch.id
                };

                // Get existing employees and add the new manager
                const employees = getAllEmployees();
                employees.push(branchManager);
                localStorage.setItem('employees', JSON.stringify(employees));

                // Create branch manager dashboard
                createBranchManagerDashboard(branch, branchManager);

                // Show success message with login credentials
                showBranchManagerCredentials(branch.name, username, password);
                
                // Sync with area manager
                syncWithAreaManager();
                
            } catch (error) {
                console.error('Error creating branch manager account:', error);
                showBranchStatus('تم إضافة الفرع ولكن حدث خطأ في إنشاء حساب المدير', 'error');
            }
        }

        function createBranchManagerDashboard(branch, branchManager) {
            try {
                // Create branch manager dashboard data
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

                // Save dashboard data to localStorage
                localStorage.setItem(`branch_dashboard_${branch.id}`, JSON.stringify(dashboardData));

                // Create branch-specific data storage
                localStorage.setItem(`branch_employees_${branch.id}`, JSON.stringify([]));
                localStorage.setItem(`branch_operations_${branch.id}`, JSON.stringify([]));
                localStorage.setItem(`branch_notifications_${branch.id}`, JSON.stringify([]));
                localStorage.setItem(`branch_tasks_${branch.id}`, JSON.stringify([]));

                console.log(`تم إنشاء لوحة مدير الفرع: ${branch.name}`);
                
            } catch (error) {
                console.error('Error creating branch manager dashboard:', error);
            }
        }

        function getBranchManagerDashboard(branchId) {
            try {
                const dashboardData = localStorage.getItem(`branch_dashboard_${branchId}`);
                return dashboardData ? JSON.parse(dashboardData) : null;
            } catch (error) {
                console.error('Error getting branch manager dashboard:', error);
                return null;
            }
        }

        function updateBranchManagerDashboard(branchId, updates) {
            try {
                const dashboardData = getBranchManagerDashboard(branchId);
                if (dashboardData) {
                    Object.assign(dashboardData, updates);
                    localStorage.setItem(`branch_dashboard_${branchId}`, JSON.stringify(dashboardData));
                    return true;
                }
                return false;
            } catch (error) {
                console.error('Error updating branch manager dashboard:', error);
                return false;
            }
        }

        function openBranchManagerDashboard(username, password) {
            try {
                // Find the branch manager by username
                const employees = getAllEmployees();
                const branchManager = employees.find(emp => emp.username === username);
                
                if (!branchManager) {
                    showBranchStatus('لم يتم العثور على مدير الفرع', 'error');
                    return;
                }

                // Set current user to branch manager
                currentUser = branchManager;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));

                // Show manager dashboard
                showManagerDashboard();

                // Close the modal
                const modal = document.querySelector('.fixed.inset-0.bg-black.bg-opacity-50');
                if (modal) {
                    modal.remove();
                }

                showBranchStatus(`تم تسجيل الدخول كمدير فرع: ${branchManager.branch}`, 'success');
                
            } catch (error) {
                console.error('Error opening branch manager dashboard:', error);
                showBranchStatus('حدث خطأ في فتح لوحة مدير الفرع', 'error');
            }
        }

        function showBranchManagerCredentials(branchName, username, password) {
            // Create modal to show credentials
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
            modal.innerHTML = `
                <div class="bg-white rounded-xl max-w-md w-full p-6">
                    <div class="text-center mb-6">
                        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-user-tie text-green-600 text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">تم إنشاء حساب مدير الفرع</h3>
                        <p class="text-gray-600">${branchName}</p>
                    </div>
                    
                    <div class="bg-gray-50 rounded-lg p-4 mb-6">
                        <h4 class="font-semibold text-gray-800 mb-3">بيانات تسجيل الدخول:</h4>
                        <div class="space-y-2">
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600">اسم المستخدم:</span>
                                <span class="font-mono bg-white px-2 py-1 rounded text-sm">${username}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600">كلمة المرور:</span>
                                <span class="font-mono bg-white px-2 py-1 rounded text-sm">${password}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div class="flex items-start">
                            <i class="fas fa-info-circle text-blue-600 ml-2 mt-1"></i>
                            <div class="text-sm text-blue-800">
                                <p class="font-semibold mb-1">ملاحظة مهمة:</p>
                                <p>احفظ هذه البيانات في مكان آمن. يمكن لمدير الفرع استخدامها لتسجيل الدخول إلى لوحة التحكم.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <div class="flex items-start">
                            <i class="fas fa-check-circle text-green-600 ml-2 mt-1"></i>
                            <div class="text-sm text-green-800">
                                <p class="font-semibold mb-1">تم إنشاء لوحة مدير الفرع:</p>
                                <p>تم إنشاء لوحة تحكم مخصصة لمدير الفرع مع جميع الأدوات والإعدادات اللازمة.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex space-x-3 space-x-reverse">
                        <button onclick="copyCredentials('${username}', '${password}')" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            <i class="fas fa-copy ml-2"></i>نسخ البيانات
                        </button>
                        <button onclick="openBranchManagerDashboard('${username}', '${password}')" class="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                            <i class="fas fa-tachometer-alt ml-2"></i>فتح لوحة المدير
                        </button>
                        <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                            <i class="fas fa-check ml-2"></i>تم
                        </button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
        }

        function copyCredentials(username, password) {
            const credentials = `اسم المستخدم: ${username}\nكلمة المرور: ${password}`;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(credentials).then(() => {
                    showBranchStatus('تم نسخ البيانات إلى الحافظة', 'success');
                }).catch(() => {
                    fallbackCopyTextToClipboard(credentials);
                });
            } else {
                fallbackCopyTextToClipboard(credentials);
            }
        }

        function fallbackCopyTextToClipboard(text) {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                showBranchStatus('تم نسخ البيانات إلى الحافظة', 'success');
            } catch (err) {
                showBranchStatus('فشل في نسخ البيانات', 'error');
            }
            
            document.body.removeChild(textArea);
        }

        function showBranchStatus(message, type) {
            // Create status element
            const statusDiv = document.createElement('div');
            statusDiv.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 ${
                type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`;
            statusDiv.innerHTML = `
                <div class="flex items-center">
                    <i class="fas ${type === 'success' ? 'fa-check' : 'fa-times'} ml-2"></i>
                    ${message}
                </div>
            `;

            document.body.appendChild(statusDiv);

            // Remove after 3 seconds
            setTimeout(() => {
                if (statusDiv.parentNode) {
                    statusDiv.parentNode.removeChild(statusDiv);
                }
            }, 3000);
        }

        function calculateBranchSystems(operations) {
            const systems = {};
            operations.forEach(op => {
                if (op.system) {
                    systems[op.system] = (systems[op.system] || 0) + (op.count || 0);
                }
            });
            return systems;
        }

        function initializeSampleBranches() {
            // Check if branches already exist
            if (getBranches().length > 0) return;

            // Create sample branches
            const sampleBranches = [
                {
                    id: 1,
                    name: 'الفرع الرئيسي',
                    address: 'شارع الملك فهد، الرياض',
                    manager: 'أحمد محمد',
                    phone: '0112345678',
                    createdAt: new Date().toISOString(),
                    employees: []
                },
                {
                    id: 2,
                    name: 'فرع جدة',
                    address: 'شارع التحلية، جدة',
                    manager: 'سارة أحمد',
                    phone: '0123456789',
                    createdAt: new Date().toISOString(),
                    employees: []
                },
                {
                    id: 3,
                    name: 'فرع الدمام',
                    address: 'شارع الملك عبدالعزيز، الدمام',
                    manager: 'محمد علي',
                    phone: '0134567890',
                    createdAt: new Date().toISOString(),
                    employees: []
                },
                {
                    id: 4,
                    name: 'فرع بني سويف',
                    address: 'شارع النيل، بني سويف',
                    manager: 'فاطمة حسن',
                    phone: '0821234567',
                    createdAt: new Date().toISOString(),
                    employees: []
                },
                {
                    id: 5,
                    name: 'فرع الإسكندرية',
                    address: 'شارع سعد زغلول، الإسكندرية',
                    manager: 'علي محمود',
                    phone: '0321234567',
                    createdAt: new Date().toISOString(),
                    employees: []
                },
                {
                    id: 6,
                    name: 'فرع القاهرة',
                    address: 'شارع التحرير، القاهرة',
                    manager: 'نور الدين',
                    phone: '0221234567',
                    createdAt: new Date().toISOString(),
                    employees: []
                }
            ];

            // Save sample branches
            localStorage.setItem('branches', JSON.stringify(sampleBranches));
        }

        function initializeSampleEmployeesForBranches() {
            // Check if employees already exist
            if (getAllEmployees().length > 0) return;

            // Create sample employees for different branches
            const sampleEmployees = [
                // Employees for الفرع الرئيسي
                {
                    id: 1,
                    username: 'employee1',
                    password: 'employeepassword',
                    name: 'أحمد محمد',
                    position: 'موظف مبيعات',
                    branch: 'الفرع الرئيسي',
                    email: 'ahmed@company.com',
                    phone: '0112345678',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    username: 'employee2',
                    password: 'employeepassword',
                    name: 'فاطمة أحمد',
                    position: 'موظف خدمة عملاء',
                    branch: 'الفرع الرئيسي',
                    email: 'fatima@company.com',
                    phone: '0112345679',
                    createdAt: new Date().toISOString()
                },
                // Employees for فرع جدة
                {
                    id: 3,
                    username: 'employee3',
                    password: 'employeepassword',
                    name: 'محمد علي',
                    position: 'موظف مبيعات',
                    branch: 'فرع جدة',
                    email: 'mohamed@company.com',
                    phone: '0123456789',
                    createdAt: new Date().toISOString()
                },
                // Employees for فرع بني سويف
                {
                    id: 4,
                    username: 'employee4',
                    password: 'employeepassword',
                    name: 'سارة حسن',
                    position: 'موظف مبيعات',
                    branch: 'فرع بني سويف',
                    email: 'sara@company.com',
                    phone: '0821234567',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 5,
                    username: 'employee5',
                    password: 'employeepassword',
                    name: 'علي محمود',
                    position: 'موظف خدمة عملاء',
                    branch: 'فرع بني سويف',
                    email: 'ali@company.com',
                    phone: '0821234568',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 6,
                    username: 'employee6',
                    password: 'employeepassword',
                    name: 'نور الدين',
                    position: 'موظف مبيعات',
                    branch: 'فرع بني سويف',
                    email: 'nour@company.com',
                    phone: '0821234569',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 9,
                    username: 'employee9',
                    password: 'employeepassword',
                    name: 'محمود أحمد',
                    position: 'موظف مبيعات',
                    branch: 'فرع بني سويف',
                    email: 'mahmoud@company.com',
                    phone: '0821234570',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 10,
                    username: 'employee10',
                    password: 'employeepassword',
                    name: 'هند محمد',
                    position: 'موظف خدمة عملاء',
                    branch: 'فرع بني سويف',
                    email: 'hind@company.com',
                    phone: '0821234571',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 11,
                    username: 'employee11',
                    password: 'employeepassword',
                    name: 'خالد حسن',
                    position: 'موظف مبيعات',
                    branch: 'فرع بني سويف',
                    email: 'khaled@company.com',
                    phone: '0821234572',
                    createdAt: new Date().toISOString()
                },
                // Employees for فرع الإسكندرية
                {
                    id: 7,
                    username: 'employee7',
                    password: 'employeepassword',
                    name: 'مريم أحمد',
                    position: 'موظف مبيعات',
                    branch: 'فرع الإسكندرية',
                    email: 'mariam@company.com',
                    phone: '0321234567',
                    createdAt: new Date().toISOString()
                },
                // Employees for فرع القاهرة
                {
                    id: 8,
                    username: 'employee8',
                    password: 'employeepassword',
                    name: 'يوسف محمد',
                    position: 'موظف مبيعات',
                    branch: 'فرع القاهرة',
                    email: 'youssef@company.com',
                    phone: '0221234567',
                    createdAt: new Date().toISOString()
                }
            ];

            // Save sample employees
            localStorage.setItem('employees', JSON.stringify(sampleEmployees));
        }

        // Initialize sample operations for Beni Suef branch
        function initializeSampleOperationsForBeniSuef() {
            // Check if operations already exist for Beni Suef employees
            const beniSuefEmployees = getAllEmployees().filter(emp => emp.branch === 'فرع بني سويف');
            if (beniSuefEmployees.length === 0) return;

            // Create sample operations for the last 7 days
            const today = new Date();
            const operations = [];

            beniSuefEmployees.forEach(employee => {
                for (let i = 0; i < 7; i++) {
                    const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
                    const dateStr = date.toISOString().split('T')[0];
                    
                    // Create 2-5 operations per day per employee
                    const numOperations = Math.floor(Math.random() * 4) + 2;
                    
                    for (let j = 0; j < numOperations; j++) {
                        const systems = ['orange', 'paytax', 'dcl', 'h4g', 'other'];
                        const system = systems[Math.floor(Math.random() * systems.length)];
                        const systemMap = { orange: 'أورنج كاش', paytax: 'بايتاكس', dcl: 'DCL', h4g: 'H4G', other: 'ديقنس' };
                        const operationsCount = Math.floor(Math.random() * 20) + 5; // 5-25 operations
                        const pointsPerOp = 3; // Default points per operation
                        const points = operationsCount * pointsPerOp;

                        operations.push({
                            id: Date.now() + Math.random(),
                            employeeId: employee.id,
                            employeeName: employee.name,
                            system: system,
                            systemName: systemMap[system],
                            operations: operationsCount,
                            points: points,
                            date: dateStr,
                            time: `${String(Math.floor(Math.random() * 12) + 8).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                            notes: `عملية ${systemMap[system]} - ${dateStr}`
                        });
                    }
                }
            });

            // Save operations for each employee
            beniSuefEmployees.forEach(employee => {
                const employeeOperations = operations.filter(op => op.employeeId === employee.id);
                localStorage.setItem(`employeeOperations_${employee.id}`, JSON.stringify(employeeOperations));
            });

            // Also save to global operations list
            const allOperations = getStoredOperations();
            allOperations.push(...operations);
            localStorage.setItem('dailyOperations', JSON.stringify(allOperations));
        }

        // Test function to verify Beni Suef branch data
        function testBeniSuefBranchData() {
            console.log('=== اختبار بيانات فرع بني سويف ===');
            
            // Get Beni Suef employees
            const beniSuefEmployees = getAllEmployees().filter(emp => emp.branch === 'فرع بني سويف');
            console.log('عدد موظفي فرع بني سويف:', beniSuefEmployees.length);
            console.log('أسماء الموظفين:', beniSuefEmployees.map(emp => emp.name));
            
            // Get Beni Suef operations
            const allOperations = getAllEmployeesOperations();
            const beniSuefEmployeeIds = beniSuefEmployees.map(emp => emp.id);
            const beniSuefOperations = allOperations.filter(op => beniSuefEmployeeIds.includes(op.employeeId));
            console.log('عدد عمليات فرع بني سويف:', beniSuefOperations.length);
            
            // Calculate total points
            const totalPoints = beniSuefOperations.reduce((sum, op) => sum + (op.points || 0), 0);
            console.log('إجمالي النقاط لفرع بني سويف:', totalPoints);
            
            // Calculate average performance
            const avgPerformance = beniSuefEmployees.length > 0 ? Math.round((totalPoints / beniSuefEmployees.length) * 100) / 100 : 0;
            console.log('متوسط الأداء لفرع بني سويف:', avgPerformance + '%');
            
            // Get branches count
            const branches = getBranches();
            console.log('إجمالي عدد الفروع:', branches.length);
            
            console.log('=== انتهاء الاختبار ===');
        }

        // Area Managers Management Functions
        function initializeAreaManagersManagement() {
            const addBtn = document.getElementById('add-area-manager-btn');
            const refreshBtn = document.getElementById('refresh-area-managers-btn');
            const saveBtn = document.getElementById('save-area-manager-btn');
            const cancelBtn = document.getElementById('cancel-area-manager-btn');

            if (addBtn) {
                addBtn.addEventListener('click', showAddAreaManagerForm);
            }

            if (refreshBtn) {
                refreshBtn.addEventListener('click', loadAreaManagersList);
            }

            if (saveBtn) {
                saveBtn.addEventListener('click', saveAreaManager);
            }

            if (cancelBtn) {
                cancelBtn.addEventListener('click', hideAddAreaManagerForm);
            }

            // Load initial list
            loadAreaManagersList();
        }

        function showAddAreaManagerForm() {
            const form = document.getElementById('add-area-manager-form');
            if (form) {
                form.classList.remove('hidden');
                // Clear form
                clearAreaManagerForm();
            }
        }

        function hideAddAreaManagerForm() {
            const form = document.getElementById('add-area-manager-form');
            if (form) {
                form.classList.add('hidden');
                clearAreaManagerForm();
            }
        }

        function clearAreaManagerForm() {
            document.getElementById('area-manager-name').value = '';
            document.getElementById('area-manager-username').value = '';
            document.getElementById('area-manager-password').value = '';
            document.getElementById('area-manager-confirm-password').value = '';
            document.getElementById('area-manager-email').value = '';
            document.getElementById('area-manager-phone').value = '';
            document.getElementById('area-manager-region').value = '';
        }

        function saveAreaManager() {
            const name = document.getElementById('area-manager-name').value.trim();
            const username = document.getElementById('area-manager-username').value.trim();
            const password = document.getElementById('area-manager-password').value;
            const confirmPassword = document.getElementById('area-manager-confirm-password').value;
            const email = document.getElementById('area-manager-email').value.trim();
            const phone = document.getElementById('area-manager-phone').value.trim();
            const region = document.getElementById('area-manager-region').value.trim();

            // Validate required fields
            if (!name || !username || !password || !confirmPassword || !email || !phone || !region) {
                showAreaManagerStatus('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }

            // Validate password match
            if (password !== confirmPassword) {
                showAreaManagerStatus('كلمة المرور غير متطابقة', 'error');
                return;
            }

            // Validate password length
            if (password.length < 6) {
                showAreaManagerStatus('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'error');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAreaManagerStatus('البريد الإلكتروني غير صحيح', 'error');
                return;
            }

            // Validate phone format
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phone)) {
                showAreaManagerStatus('رقم الهاتف غير صحيح', 'error');
                return;
            }

            // Check for duplicate username
            const existingAreaManagers = getAreaManagers();
            const existingManager = existingAreaManagers.find(manager => manager.username === username);
            if (existingManager) {
                showAreaManagerStatus('اسم المستخدم موجود بالفعل', 'error');
                return;
            }

            // Create new area manager
            const areaManager = {
                id: Date.now(),
                name: name,
                username: username,
                password: password,
                email: email,
                phone: phone,
                region: region,
                role: 'area_manager',
                createdAt: new Date().toISOString(),
                isActive: true
            };

            // Save to localStorage
            existingAreaManagers.push(areaManager);
            localStorage.setItem('areaManagers', JSON.stringify(existingAreaManagers));

            // Show success message
            showAreaManagerStatus('تم إضافة مدير المنطقة بنجاح', 'success');

            // Hide form and reload list
            hideAddAreaManagerForm();
            loadAreaManagersList();
        }

        function getAreaManagers() {
            const areaManagers = localStorage.getItem('areaManagers');
            return areaManagers ? JSON.parse(areaManagers) : [];
        }

        function loadAreaManagersList() {
            const container = document.getElementById('area-managers-list');
            if (!container) return;

            const areaManagers = getAreaManagers();

            if (areaManagers.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-12 text-gray-500">
                        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-user-tie text-3xl text-gray-400"></i>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">لا يوجد مدراء مناطق</h3>
                        <p class="text-sm text-gray-500">اضغط "إضافة مدير منطقة" لإنشاء مدير منطقة جديد</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = areaManagers.map(manager => `
                <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-purple-300 group">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-4 space-x-reverse">
                            <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                                <i class="fas fa-user-tie text-white text-xl"></i>
                            </div>
                            <div>
                                <h4 class="text-xl font-bold text-gray-800">${manager.name}</h4>
                                <p class="text-sm text-gray-600 flex items-center">
                                    <i class="fas fa-map-marker-alt ml-1 text-gray-400"></i>
                                    ${manager.region}
                                </p>
                                <p class="text-xs text-gray-500 flex items-center mt-1">
                                    <i class="fas fa-user ml-1 text-gray-400"></i>
                                    ${manager.username}
                                </p>
                            </div>
                        </div>
                        <div class="text-right">
                            <span class="px-3 py-1 rounded-full text-xs font-medium ${manager.isActive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}">
                                ${manager.isActive ? 'نشط' : 'غير نشط'}
                            </span>
                        </div>
                    </div>

                    <div class="space-y-3 mb-4">
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-gray-500 flex items-center">
                                <i class="fas fa-envelope ml-1"></i>
                                البريد الإلكتروني
                            </span>
                            <span class="font-medium text-gray-800">${manager.email}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-gray-500 flex items-center">
                                <i class="fas fa-phone ml-1"></i>
                                الهاتف
                            </span>
                            <span class="font-medium text-gray-800">${manager.phone}</span>
                        </div>
                    </div>

                    <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div class="text-xs text-gray-400">
                            تم الإنشاء: ${new Date(manager.createdAt).toLocaleDateString('ar-SA')}
                        </div>
                        <div class="flex items-center space-x-2 space-x-reverse">
                            <button onclick="loginAsAreaManager('${manager.username}')" class="bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700 transition-colors">
                                <i class="fas fa-sign-in-alt ml-1"></i>تسجيل دخول
                            </button>
                            <button onclick="editAreaManager(${manager.id})" class="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                                <i class="fas fa-edit ml-1"></i>تعديل
                            </button>
                            <button onclick="deleteAreaManager(${manager.id})" class="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors">
                                <i class="fas fa-trash ml-1"></i>حذف
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function loginAsAreaManager(username) {
            // Find the area manager
            const areaManagers = getAreaManagers();
            const manager = areaManagers.find(m => m.username === username);
            
            if (!manager) {
                showAreaManagerStatus('مدير المنطقة غير موجود', 'error');
                return;
            }

            // Set current user
            currentUser = {
                id: manager.id,
                name: manager.name,
                username: manager.username,
                role: 'area_manager',
                region: manager.region,
                email: manager.email,
                phone: manager.phone
            };

            // Save to localStorage
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            // Show login success
            showAreaManagerStatus('تم تسجيل الدخول بنجاح', 'success');

            // Switch to area manager dashboard
            setTimeout(() => {
                showDashboard('area-manager-dashboard');
                updateAllDisplays();
                // تهيئة زر عرض تفاصيل الفرع
                initializeViewBranchDetailsButton();
                // تحديث الإحصائيات
                updateAreaManagerData();
                
                // Force update KPIs after dashboard is shown
                setTimeout(() => {
                    updateAreaManagerKPIs();
                }, 500);
            }, 1000);
        }

        function editAreaManager(managerId) {
            const areaManagers = getAreaManagers();
            const manager = areaManagers.find(m => m.id === managerId);
            
            if (!manager) return;

            // Fill form with manager data
            document.getElementById('area-manager-name').value = manager.name;
            document.getElementById('area-manager-username').value = manager.username;
            document.getElementById('area-manager-email').value = manager.email;
            document.getElementById('area-manager-phone').value = manager.phone;
            document.getElementById('area-manager-region').value = manager.region;

            // Show form
            showAddAreaManagerForm();

            // Set save button to edit mode
            const saveBtn = document.getElementById('save-area-manager-btn');
            saveBtn.setAttribute('data-manager-id', managerId);
            saveBtn.innerHTML = '<i class="fas fa-save ml-2"></i>تحديث مدير المنطقة';
        }

        function deleteAreaManager(managerId) {
            if (!confirm('هل أنت متأكد من حذف مدير المنطقة؟')) return;

            const areaManagers = getAreaManagers();
            const updatedManagers = areaManagers.filter(m => m.id !== managerId);
            
            localStorage.setItem('areaManagers', JSON.stringify(updatedManagers));
            showAreaManagerStatus('تم حذف مدير المنطقة بنجاح', 'success');
            loadAreaManagersList();
        }

        function showAreaManagerStatus(message, type) {
            // Create status element
            const statusDiv = document.createElement('div');
            statusDiv.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 ${
                type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`;
            statusDiv.innerHTML = `
                <div class="flex items-center">
                    <i class="fas ${type === 'success' ? 'fa-check' : 'fa-times'} ml-2"></i>
                    ${message}
                </div>
            `;

            document.body.appendChild(statusDiv);

            // Remove after 3 seconds
            setTimeout(() => {
                if (statusDiv.parentNode) {
                    statusDiv.parentNode.removeChild(statusDiv);
                }
            }, 3000);
        }

        // Initialize profile management when page loads
        document.addEventListener('DOMContentLoaded', function() {
            initializeEmployeeManagement();
            clearDummyData();
            initializeSampleBranches();
            initializeSampleEmployeesForBranches();
            initializeSampleOperationsForBeniSuef();
            testBeniSuefBranchData(); // اختبار بيانات فرع بني سويف
            initializeAreaManagersManagement();
            
            // Initialize branch management after a short delay to ensure DOM is ready
            setTimeout(() => {
                initializeBranchManagement();
            }, 100);
            initializeEmployeeProfile();
            initializeDailyOperations();
            initializeAreaManagerEmployeeView();
            initializeBranchManagerEmployeeView();
            initializeAddEmployeeForm();
            initializeQuickNavigation();
            initializeDailyTasks();
            initializeEmployeeDailyTasks();
            initializeNotifications();
            
            // تهيئة زر عرض تفاصيل الفرع
            initializeViewBranchDetailsButton();
            
            // تحديث الإحصائيات عند تحميل الصفحة
            updatePerformanceReport();
            updateDailyOperationsStats();
            
            // Force update area manager KPIs
            setTimeout(() => {
                if (currentUser && currentUser.role === 'area_manager') {
                    updateAreaManagerKPIs();
                }
            }, 1000);
        });