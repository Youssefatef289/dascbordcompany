# نظام إدارة الموظفين - Employee Management System

## 📁 Project Structure

```
src/
├── components/           # UI Components
│   ├── LoginForm.js     # Login form component
│   ├── EmployeeDashboard.js    # Employee dashboard
│   ├── ManagerDashboard.js     # Manager dashboard
│   ├── AreaManagerDashboard.js # Area Manager dashboard
│   └── index.js         # Components export
├── services/            # Business Logic Services
│   ├── auth.js          # Authentication service
│   ├── employees.js     # Employee management
│   ├── branches.js      # Branch management
│   ├── operations.js    # Operations management
│   └── index.js         # Services export
├── utils/               # Utility Functions
│   ├── helpers.js       # Helper functions
│   ├── storage.js       # Local storage utilities
│   └── index.js         # Utils export
├── config/              # Configuration
│   └── constants.js     # Constants and sample data
└── main.js              # Application entry point

index.html               # Main HTML file
style.css               # Global styles
```

## 🚀 Features

### Employee Dashboard
- Profile management
- Daily operations recording
- Performance tracking
- Loan requests

### Manager Dashboard
- Employee management
- Daily task assignment
- Loan approval system
- Performance monitoring

### Area Manager Dashboard
- Branch management
- Multi-branch oversight
- KPI tracking
- Branch manager creation

## 🛠️ Technical Details

### File Organization
- **Components**: Each dashboard is a separate component file
- **Services**: Business logic separated by domain
- **Utils**: Reusable helper functions
- **Config**: Constants and sample data

### Key Principles
- **Separation of Concerns**: UI, business logic, and utilities are separated
- **Modularity**: Each file has a single responsibility
- **Reusability**: Common functions are in utils
- **Maintainability**: Clear file structure and naming

### Dependencies
- **Tailwind CSS**: For styling
- **Font Awesome**: For icons
- **Google Fonts**: Cairo font for Arabic support

## 📝 Usage

1. Open `index.html` in a web browser
2. Use the login credentials:
   - Employee: `employee1` / `password123`
   - Manager: `manager1` / `manager123`
   - Area Manager: `area_manager1` / `area123`
   - Owner: `owner1` / `owner123`

## 🔧 Development

The codebase is organized for easy maintenance and extension:
- Add new components in `src/components/`
- Add new services in `src/services/`
- Add utility functions in `src/utils/`
- Update constants in `src/config/constants.js`

## 📊 Data Storage

All data is stored in browser's localStorage:
- `employees`: Employee data
- `branches`: Branch information
- `operations`: Daily operations
- `loanRequests`: Loan requests
- `currentUser`: Current logged-in user
