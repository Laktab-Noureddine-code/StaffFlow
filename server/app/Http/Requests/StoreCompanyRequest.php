<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCompanyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'company_name' => 'required|string|max:255',
            'ice' => 'required|string|max:255|unique:companies,ice',
            'cnss_employer_number' => 'required|string|max:255|unique:companies,cnss_employer_number',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|email|unique:companies,email',
            'logo_url' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:255',
        ];
    }
}
