src/
├── assets/                          # Ressources statiques
│   ├── images/
│   │   ├── logo.png
│   │   ├── default-avatar.png
│   │   └── icons/
│   ├── fonts/
│   └── styles/
│       ├── variables.css           # Variables CSS (couleurs, tailles)
│       └── global.css              # Styles globaux
│
├── components/                      # Composants réutilisables
│   ├── common/                     # Composants communs
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.module.css
│   │   │   └── index.js
│   │   ├── Input/
│   │   │   ├── Input.jsx
│   │   │   ├── Input.module.css
│   │   │   └── index.js
│   │   ├── Select/
│   │   │   ├── Select.jsx
│   │   │   ├── Select.module.css
│   │   │   └── index.js
│   │   ├── Modal/
│   │   │   ├── Modal.jsx
│   │   │   ├── Modal.module.css
│   │   │   └── index.js
│   │   ├── Table/
│   │   │   ├── Table.jsx
│   │   │   ├── Table.module.css
│   │   │   └── index.js
│   │   ├── Card/
│   │   │   ├── Card.jsx
│   │   │   ├── Card.module.css
│   │   │   └── index.js
│   │   ├── Badge/
│   │   │   ├── Badge.jsx
│   │   │   ├── Badge.module.css
│   │   │   └── index.js
│   │   ├── Spinner/
│   │   │   ├── Spinner.jsx
│   │   │   ├── Spinner.module.css
│   │   │   └── index.js
│   │   ├── Alert/
│   │   │   ├── Alert.jsx
│   │   │   ├── Alert.module.css
│   │   │   └── index.js
│   │   ├── Pagination/
│   │   │   ├── Pagination.jsx
│   │   │   ├── Pagination.module.css
│   │   │   └── index.js
│   │   ├── DatePicker/
│   │   │   ├── DatePicker.jsx
│   │   │   ├── DatePicker.module.css
│   │   │   └── index.js
│   │   ├── FileUpload/
│   │   │   ├── FileUpload.jsx
│   │   │   ├── FileUpload.module.css
│   │   │   └── index.js
│   │   ├── SearchBar/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── SearchBar.module.css
│   │   │   └── index.js
│   │   └── Tabs/
│   │       ├── Tabs.jsx
│   │       ├── Tabs.module.css
│   │       └── index.js
│   │
│   ├── layout/                     # Composants de mise en page
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   ├── Header.module.css
│   │   │   └── index.js
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Sidebar.module.css
│   │   │   └── index.js
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   ├── Footer.module.css
│   │   │   └── index.js
│   │   ├── Breadcrumb/
│   │   │   ├── Breadcrumb.jsx
│   │   │   ├── Breadcrumb.module.css
│   │   │   └── index.js
│   │   ├── NotificationBell/
│   │   │   ├── NotificationBell.jsx
│   │   │   ├── NotificationBell.module.css
│   │   │   └── index.js
│   │   ├── MainLayout/
│   │   │   ├── MainLayout.jsx
│   │   │   ├── MainLayout.module.css
│   │   │   └── index.js
│   │   └── AuthLayout/
│   │       ├── AuthLayout.jsx
│   │       ├── AuthLayout.module.css
│   │       └── index.js
│   │
│   ├── forms/                      # Composants de formulaires
│   │   ├── EmployeeForm/
│   │   │   ├── EmployeeForm.jsx
│   │   │   ├── EmployeeForm.module.css
│   │   │   └── index.js
│   │   ├── LeaveRequestForm/
│   │   │   ├── LeaveRequestForm.jsx
│   │   │   ├── LeaveRequestForm.module.css
│   │   │   └── index.js
│   │   ├── PayrollEntryForm/
│   │   │   ├── PayrollEntryForm.jsx
│   │   │   ├── PayrollEntryForm.module.css
│   │   │   └── index.js
│   │   ├── LoginForm/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── LoginForm.module.css
│   │   │   └── index.js
│   │   ├── DepartmentForm/
│   │   │   ├── DepartmentForm.jsx
│   │   │   ├── DepartmentForm.module.css
│   │   │   └── index.js
│   │   └── UserForm/
│   │       ├── UserForm.jsx
│   │       ├── UserForm.module.css
│   │       └── index.js
│   │
│   ├── widgets/                    # Widgets tableau de bord
│   │   ├── StatsCard/
│   │   │   ├── StatsCard.jsx
│   │   │   ├── StatsCard.module.css
│   │   │   └── index.js
│   │   ├── AttendanceWidget/
│   │   │   ├── AttendanceWidget.jsx
│   │   │   ├── AttendanceWidget.module.css
│   │   │   └── index.js
│   │   ├── LeaveBalanceWidget/
│   │   │   ├── LeaveBalanceWidget.jsx
│   │   │   ├── LeaveBalanceWidget.module.css
│   │   │   └── index.js
│   │   ├── PendingRequestsWidget/
│   │   │   ├── PendingRequestsWidget.jsx
│   │   │   ├── PendingRequestsWidget.module.css
│   │   │   └── index.js
│   │   ├── CalendarWidget/
│   │   │   ├── CalendarWidget.jsx
│   │   │   ├── CalendarWidget.module.css
│   │   │   └── index.js
│   │   └── QuickActionsWidget/
│   │       ├── QuickActionsWidget.jsx
│   │       ├── QuickActionsWidget.module.css
│   │       └── index.js
│   │
│   ├── charts/                     # Composants graphiques (React)
│   │   ├── BarChart/
│   │   │   ├── BarChart.jsx
│   │   │   ├── BarChart.module.css
│   │   │   └── index.js
│   │   ├── LineChart/
│   │   │   ├── LineChart.jsx
│   │   │   ├── LineChart.module.css
│   │   │   └── index.js
│   │   ├── PieChart/
│   │   │   ├── PieChart.jsx
│   │   │   ├── PieChart.module.css
│   │   │   └── index.js
│   │   └── DonutChart/
│   │       ├── DonutChart.jsx
│   │       ├── DonutChart.module.css
│   │       └── index.js
│   │
│   └── ProtectedRoute/             # Route protégée
│       ├── ProtectedRoute.jsx
│       └── index.js
│
├── pages/                          # Pages de l'application
│   ├── Auth/                       # Pages d'authentification
│   │   ├── Login/
│   │   │   ├── Login.jsx
│   │   │   ├── Login.module.css
│   │   │   └── index.js
│   │   ├── ForgotPassword/
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── ForgotPassword.module.css
│   │   │   └── index.js
│   │   ├── ResetPassword/
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── ResetPassword.module.css
│   │   │   └── index.js
│   │   └── ChangePassword/
│   │       ├── ChangePassword.jsx
│   │       ├── ChangePassword.module.css
│   │       └── index.js
│   │
│   ├── Dashboard/                  # Tableaux de bord
│   │   ├── AdminDashboard/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminDashboard.module.css
│   │   │   └── index.js
│   │   └── EmployeeDashboard/
│   │       ├── EmployeeDashboard.jsx
│   │       ├── EmployeeDashboard.module.css
│   │       └── index.js
│   │
│   ├── Employees/                  # Gestion des employés
│   │   ├── EmployeeList/
│   │   │   ├── EmployeeList.jsx
│   │   │   ├── EmployeeList.module.css
│   │   │   └── index.js
│   │   ├── EmployeeDetail/
│   │   │   ├── EmployeeDetail.jsx
│   │   │   ├── EmployeeDetail.module.css
│   │   │   └── index.js
│   │   ├── EmployeeCreate/
│   │   │   ├── EmployeeCreate.jsx
│   │   │   ├── EmployeeCreate.module.css
│   │   │   └── index.js
│   │   ├── EmployeeEdit/
│   │   │   ├── EmployeeEdit.jsx
│   │   │   ├── EmployeeEdit.module.css
│   │   │   └── index.js
│   │   └── EmployeeDocuments/
│   │       ├── EmployeeDocuments.jsx
│   │       ├── EmployeeDocuments.module.css
│   │       └── index.js
│   │
│   ├── Attendance/                 # Gestion de la présence
│   │   ├── AttendanceCheckIn/
│   │   │   ├── AttendanceCheckIn.jsx
│   │   │   ├── AttendanceCheckIn.module.css
│   │   │   └── index.js
│   │   ├── AttendanceHistory/
│   │   │   ├── AttendanceHistory.jsx
│   │   │   ├── AttendanceHistory.module.css
│   │   │   └── index.js
│   │   ├── AttendanceReports/
│   │   │   ├── AttendanceReports.jsx
│   │   │   ├── AttendanceReports.module.css
│   │   │   └── index.js
│   │   ├── AttendanceCalendar/
│   │   │   ├── AttendanceCalendar.jsx
│   │   │   ├── AttendanceCalendar.module.css
│   │   │   └── index.js
│   │   └── AttendanceCorrection/
│   │       ├── AttendanceCorrection.jsx
│   │       ├── AttendanceCorrection.module.css
│   │       └── index.js
│   │
│   ├── Leave/                      # Gestion des congés
│   │   ├── LeaveRequest/
│   │   │   ├── LeaveRequest.jsx
│   │   │   ├── LeaveRequest.module.css
│   │   │   └── index.js
│   │   ├── LeaveRequestList/
│   │   │   ├── LeaveRequestList.jsx
│   │   │   ├── LeaveRequestList.module.css
│   │   │   └── index.js
│   │   ├── LeaveApproval/
│   │   │   ├── LeaveApproval.jsx
│   │   │   ├── LeaveApproval.module.css
│   │   │   └── index.js
│   │   ├── LeaveBalance/
│   │   │   ├── LeaveBalance.jsx
│   │   │   ├── LeaveBalance.module.css
│   │   │   └── index.js
│   │   ├── LeaveCalendar/
│   │   │   ├── LeaveCalendar.jsx
│   │   │   ├── LeaveCalendar.module.css
│   │   │   └── index.js
│   │   └── LeaveTypes/
│   │       ├── LeaveTypes.jsx
│   │       ├── LeaveTypes.module.css
│   │       └── index.js
│   │
│   ├── Payroll/                    # Gestion de la paie
│   │   ├── PayrollList/
│   │   │   ├── PayrollList.jsx
│   │   │   ├── PayrollList.module.css
│   │   │   └── index.js
│   │   ├── PayrollCreate/
│   │   │   ├── PayrollCreate.jsx
│   │   │   ├── PayrollCreate.module.css
│   │   │   └── index.js
│   │   ├── PayrollEntry/
│   │   │   ├── PayrollEntry.jsx
│   │   │   ├── PayrollEntry.module.css
│   │   │   └── index.js
│   │   ├── PayrollSummary/
│   │   │   ├── PayrollSummary.jsx
│   │   │   ├── PayrollSummary.module.css
│   │   │   └── index.js
│   │   ├── Payslips/
│   │   │   ├── Payslips.jsx
│   │   │   ├── Payslips.module.css
│   │   │   └── index.js
│   │   └── PayrollReports/
│   │       ├── PayrollReports.jsx
│   │       ├── PayrollReports.module.css
│   │       └── index.js
│   │
│   ├── Departments/                # Gestion des départements
│   │   ├── DepartmentList/
│   │   │   ├── DepartmentList.jsx
│   │   │   ├── DepartmentList.module.css
│   │   │   └── index.js
│   │   ├── DepartmentCreate/
│   │   │   ├── DepartmentCreate.jsx
│   │   │   ├── DepartmentCreate.module.css
│   │   │   └── index.js
│   │   └── DepartmentEdit/
│   │       ├── DepartmentEdit.jsx
│   │       ├── DepartmentEdit.module.css
│   │       └── index.js
│   │
│   ├── Users/                      # Gestion des utilisateurs
│   │   ├── UserList/
│   │   │   ├── UserList.jsx
│   │   │   ├── UserList.module.css
│   │   │   └── index.js
│   │   ├── UserCreate/
│   │   │   ├── UserCreate.jsx
│   │   │   ├── UserCreate.module.css
│   │   │   └── index.js
│   │   └── UserEdit/
│   │       ├── UserEdit.jsx
│   │       ├── UserEdit.module.css
│   │       └── index.js
│   │
│   ├── Settings/                   # Paramètres
│   │   ├── CompanySettings/
│   │   │   ├── CompanySettings.jsx
│   │   │   ├── CompanySettings.module.css
│   │   │   └── index.js
│   │   ├── PublicHolidays/
│   │   │   ├── PublicHolidays.jsx
│   │   │   ├── PublicHolidays.module.css
│   │   │   └── index.js
│   │   ├── WorkSchedules/
│   │   │   ├── WorkSchedules.jsx
│   │   │   ├── WorkSchedules.module.css
│   │   │   └── index.js
│   │   └── SystemSettings/
│   │       ├── SystemSettings.jsx
│   │       ├── SystemSettings.module.css
│   │       └── index.js
│   │
│   ├── Notifications/              # Notifications
│   │   ├── NotificationList/
│   │   │   ├── NotificationList.jsx
│   │   │   ├── NotificationList.module.css
│   │   │   └── index.js
│   │   └── NotificationSettings/
│   │       ├── NotificationSettings.jsx
│   │       ├── NotificationSettings.module.css
│   │       └── index.js
│   │
│   ├── Profile/                    # Profil utilisateur
│   │   ├── ViewProfile/
│   │   │   ├── ViewProfile.jsx
│   │   │   ├── ViewProfile.module.css
│   │   │   └── index.js
│   │   └── EditProfile/
│   │       ├── EditProfile.jsx
│   │       ├── EditProfile.module.css
│   │       └── index.js
│   │
│   └── Error/                      # Pages d'erreur
│       ├── NotFound/
│       │   ├── NotFound.jsx
│       │   ├── NotFound.module.css
│       │   └── index.js
│       ├── Forbidden/
│       │   ├── Forbidden.jsx
│       │   ├── Forbidden.module.css
│       │   └── index.js
│       └── ServerError/
│           ├── ServerError.jsx
│           ├── ServerError.module.css
│           └── index.js
│
├── hooks/                          # Custom React Hooks
│   ├── useAuth.js
│   ├── useEmployees.js
│   ├── useAttendance.js
│   ├── useLeave.js
│   ├── usePayroll.js
│   ├── useNotifications.js
│   ├── usePagination.js
│   ├── useDebounce.js
│   ├── useLocalStorage.js
│   └── useForm.js
│
├── context/                        # React Context API
│   ├── AuthContext.jsx
│   ├── NotificationContext.jsx
│   ├── ThemeContext.jsx
│   └── LanguageContext.jsx
│
├── services/                       # Services API
│   ├── api.js                      # Configuration Axios
│   ├── authService.js
│   ├── employeeService.js
│   ├── attendanceService.js
│   ├── leaveService.js
│   ├── payrollService.js
│   ├── departmentService.js
│   ├── userService.js
│   ├── notificationService.js
│   └── documentService.js
│
├── utils/                          # Utilitaires
│   ├── constants.js                # Constantes
│   ├── validators.js               # Validation de formulaires
│   ├── formatters.js               # Formatage dates, nombres
│   ├── calculations.js             # Calculs (heures, salaires)
│   ├── helpers.js                  # Fonctions d'aide
│   └── permissions.js              # Vérification permissions
│
├── routes/                         # Configuration des routes React Router
│   ├── index.jsx                   # Routes principales
│   ├── AdminRoutes.jsx             # Routes Admin protégées
│   ├── EmployeeRoutes.jsx          # Routes Employé protégées
│   └── PublicRoutes.jsx            # Routes publiques
│
├── store/                          # State management (Redux Toolkit ou Zustand)
│   ├── slices/
│   │   ├── authSlice.js
│   │   ├── employeeSlice.js
│   │   ├── attendanceSlice.js
│   │   ├── leaveSlice.js
│   │   ├── payrollSlice.js
│   │   └── notificationSlice.js
│   └── store.js
│
├── config/                         # Configuration
│   ├── app.config.js
│   └── theme.config.js
│
├── App.jsx                         # Composant principal React
├── main.jsx                        # Point d'entrée (Vite) ou index.jsx (CRA)
└── setupTests.js                   # Configuration tests (Jest/Vitest)