<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('company_name');
            $table->string('ice', 15)->unique();
            $table->integer('cnss_employer_number')->nullable();
            $table->string('address');
            $table->enum('company_size', ["1-10", "11-50", "51-100", "101-200", "201-500", "500+"])->default("1-10");
            $table->string('city');
            $table->string('phone', 15);
            $table->string('email', 255)->unique();
            $table->string('logo_url')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
