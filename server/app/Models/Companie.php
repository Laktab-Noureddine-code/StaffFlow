<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Companie extends Model
{
    protected $fillable = [
        'company_name',
        'ice',
        'cnss_employer_number',
        'address',
        'city',
        'phone',
        'email',
        'logo_url',
        'status',
    ];
}
