<?php

namespace App\Services;

use App\DTOs\EmployeeDTO;
use App\Models\Employee;
use App\Repositories\EmployeeRepository;

class EmployeeService
{
    public function __construct(
        private EmployeeRepository $repository
    ) {}
    public function create(EmployeeDTO $dto): Employee
    {
        // Générer le matricule si non fourni
        $data = $dto->toArray();
        if (empty($data['matricule_employee'])) {
            $data['matricule_employee'] = $this->generateMatricule();
        }
        $employee = $this->repository->create($data);
        return $employee;
    }

    public function getAll()
    {
        return $this->repository->getAll();
    }
    
    private function generateMatricule(): string
    {
        // Générer un matricule unique (exemple : EMP-12345)
        $year = date('Y');
        $lastEmployee = Employee::latest('id')->first();
        $number = $lastEmployee ? $lastEmployee->id + 1 : 1;
        return sprintf('EMP-%s-%05d', $year, $number);
    }
}
