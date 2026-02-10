<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
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
