<?php

namespace App\Http\Controllers;

use App\DTOs\EmployeeDTO;
use App\Models\Employee;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Http\Resources\EmployeeResource;
use App\Services\EmployeeService;
use Symfony\Component\HttpFoundation\JsonResponse;

class EmployeeController extends Controller
{
    public function __construct(private EmployeeService $service) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $employees = $this->service->getAll();
       return EmployeeResource::collection($employees);
    }

  

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request):JsonResponse
    {
        $dto = EmployeeDTO::fromRequest($request);
        $employee = $this->service->create($dto);
        return response()->json($employee, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        //
    }
}
