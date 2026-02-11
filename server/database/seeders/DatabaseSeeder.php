<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::createOrFirst([
            'name' => 'admin',
            'guard_name' => 'web'
        ]);

        Role::createOrFirst([
            'name' => 'hr',
            'guard_name' => 'web'
        ]);

        Role::createOrFirst([
            'name' => 'manager',
            'guard_name' => 'web'
        ]);
    }
}
