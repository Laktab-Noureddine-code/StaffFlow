<?php

namespace App\Repositories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Collection;

class EmployeeRepository
{
    public function create(array $data): Employee
    {
        return Employee::create($data);
    }
    public function update(array $data): Employee
    {
        return Employee::update($data);
    }

    public function delete(Employee $employee): void
    {
        $employee->delete();
    }

    public function findById(int $id): ?Employee
    {
        return Employee::find($id);
    }

    public function getAll(): Collection
    {
        return Employee::with(['company', 'departement'])->get();
    }
}
