app/
├── Models/
├── Http/
│   ├── Controllers/
│   ├── Requests/          # Validation des données
│   ├── Resources/         # Transformation des données (API)
│   └── Middleware/
├── Services/              # Logique métier
├── Repositories/          # Accès aux données
├── DTOs/                  # Data Transfer Objects
├── Actions/               # Actions métier spécifiques
├── Enums/                 # Énumérations
├── Traits/                # Code réutilisable
├── Observers/             # Événements de modèles
├── Events/                # Événements personnalisés
├── Listeners/             # Écouteurs d'événements
├── Jobs/                  # Tâches asynchrones
├── Notifications/         # Notifications
└── Exceptions/            # Exceptions personnalisées


## 📋 Explication de chaque couche

### 1. **Controllers** (Contrôleurs)
**Rôle** : Recevoir les requêtes HTTP et retourner les réponses
- Doivent être **minces** (thin controllers)
- Ne contiennent PAS de logique métier
- Délèguent le travail aux Services

```php
// app/Http/Controllers/EmployeeController.php
class EmployeeController extends Controller
{
    public function __construct(
        private EmployeeService $employeeService
    ) {}

    public function store(StoreEmployeeRequest $request)
    {
        $employee = $this->employeeService->create(
            EmployeeDTO::fromRequest($request)
        );
        
        return response()->json($employee, 201);
    }
}
```

### 2. **Requests** (Validation)
**Rôle** : Valider les données entrantes

```php
// app/Http/Requests/StoreEmployeeRequest.php
class StoreEmployeeRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees',
            'department_id' => 'required|exists:departments,id',
            'gross_monthly_salary' => 'required|numeric|min:0',
        ];
    }
}
```

### 3. **DTOs** (Data Transfer Objects)
**Rôle** : Transporter des données entre les couches de manière structurée

```php
// app/DTOs/EmployeeDTO.php
class EmployeeDTO
{
    public function __construct(
        public readonly string $firstName,
        public readonly string $lastName,
        public readonly string $email,
        public readonly int $departmentId,
        public readonly float $grossMonthlySalary,
        public readonly ?string $bankAccountRib = null,
    ) {}

    public static function fromRequest(Request $request): self
    {
        return new self(
            firstName: $request->input('first_name'),
            lastName: $request->input('last_name'),
            email: $request->input('email'),
            departmentId: $request->input('department_id'),
            grossMonthlySalary: $request->input('gross_monthly_salary'),
            bankAccountRib: $request->input('bank_account_rib'),
        );
    }

    public function toArray(): array
    {
        return [
            'first_name' => $this->firstName,
            'last_name' => $this->lastName,
            'email' => $this->email,
            'department_id' => $this->departmentId,
            'gross_monthly_salary' => $this->grossMonthlySalary,
            'bank_account_rib' => $this->bankAccountRib,
        ];
    }
}
```

### 4. **Services** (Logique métier)
**Rôle** : Contenir toute la logique métier de l'application

```php
// app/Services/EmployeeService.php
class EmployeeService
{
    public function __construct(
        private EmployeeRepository $repository
    ) {}

    public function create(EmployeeDTO $dto): Employee
    {
        // Logique métier complexe ici
        $employee = $this->repository->create($dto->toArray());
        
        // Envoyer une notification
        event(new EmployeeCreated($employee));
        
        return $employee;
    }

    public function calculateNetSalary(Employee $employee): float
    {
        $gross = $employee->gross_monthly_salary;
        $deductions = $this->calculateDeductions($employee);
        
        return $gross - $deductions;
    }

    private function calculateDeductions(Employee $employee): float
    {
        // Logique de calcul des retenues
        return 0;
    }
}
```

### 5. **Repositories** (Accès aux données)
**Rôle** : Interagir avec la base de données (abstraction)

```php
// app/Repositories/EmployeeRepository.php
class EmployeeRepository
{
    public function create(array $data): Employee
    {
        return Employee::create($data);
    }

    public function findById(int $id): ?Employee
    {
        return Employee::find($id);
    }

    public function getActiveEmployees(): Collection
    {
        return Employee::where('status', 'active')->get();
    }

    public function updateSalary(Employee $employee, float $newSalary): bool
    {
        return $employee->update([
            'gross_monthly_salary' => $newSalary
        ]);
    }
}
```

### 6. **Actions** (Actions métier spécifiques)
**Rôle** : Actions métier simples et réutilisables (une seule responsabilité)

```php
// app/Actions/CalculateEmployeeNetSalaryAction.php
class CalculateEmployeeNetSalaryAction
{
    public function execute(Employee $employee): float
    {
        $gross = $employee->gross_monthly_salary;
        $cnss = $gross * 0.0448; // 4.48%
        $tax = $this->calculateTax($gross);
        
        return $gross - $cnss - $tax;
    }

    private function calculateTax(float $gross): float
    {
        // Logique de calcul d'impôt
        return 0;
    }
}
```

### 7. **Enums** (Énumérations)
**Rôle** : Définir des constantes typées

```php
// app/Enums/PaymentMethod.php
enum PaymentMethod: string
{
    case BANK_TRANSFER = 'Virement Bancaire';
    case CHECK = 'Chèque';
    case CASH = 'Espèces';

    public function label(): string
    {
        return match($this) {
            self::BANK_TRANSFER => 'Virement Bancaire',
            self::CHECK => 'Chèque',
            self::CASH => 'Espèces',
        };
    }
}
```

### 8. **Resources** (Transformation API)
**Rôle** : Formater les données pour les réponses API

```php
// app/Http/Resources/EmployeeResource.php
class EmployeeResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'full_name' => $this->first_name . ' ' . $this->last_name,
            'email' => $this->email,
            'department' => new DepartmentResource($this->whenLoaded('department')),
            'salary' => [
                'gross' => $this->gross_monthly_salary,
                'currency' => 'MAD',
            ],
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}
```

## 🎯 Flux de données typique

```
Request 
  ↓
Controller (reçoit la requête)
  ↓
Request (validation)
  ↓
DTO (transformation des données)
  ↓
Service (logique métier)
  ↓
Repository (accès base de données)
  ↓
Model (Eloquent)
  ↓
Response/Resource (formatage de la réponse)
```

## 📦 Quand utiliser quoi ?

| Couche | Quand l'utiliser |
|--------|------------------|
| **Controller** | Toujours (point d'entrée HTTP) |
| **Request** | Toujours pour la validation |
| **Service** | Pour toute logique métier complexe |
| **Repository** | Projets moyens/grands, abstraction DB |
| **DTO** | Projets moyens/grands, transfert de données structuré |
| **Action** | Actions métier spécifiques et réutilisables |
| **Resource** | APIs pour formater les réponses JSON |
| **Enum** | Pour les constantes typées (statuts, types, etc.) |

## 🚀 Exemple complet d'utilisation

```php
// Route
Route::post('/employees', [EmployeeController::class, 'store']);

// Controller
class EmployeeController extends Controller
{
    public function store(
        StoreEmployeeRequest $request,
        EmployeeService $service
    ) {
        $employee = $service->create(
            EmployeeDTO::fromRequest($request)
        );
        
        return new EmployeeResource($employee);
    }
}

// Service
class EmployeeService
{
    public function create(EmployeeDTO $dto): Employee
    {
        return $this->repository->create($dto->toArray());
    }
}

// Repository
class EmployeeRepository
{
    public function create(array $data): Employee
    {
        return Employee::create($data);
    }
}
```

Cette architecture permet un code **maintenable**, **testable** et **évolutif**.