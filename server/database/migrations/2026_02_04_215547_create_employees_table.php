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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            // Informations Personnelles :
            $table->string('matricule_employe')->unique();
            $table->string('nom_complet');
            $table->string('cin')->unique();
            $table->date('date_expiration_cin');
            $table->date('date_naissance');
            $table->string('lieu_naissance');
            $table->enum('sexe', ['homme', 'femme'])->default('homme');
            $table->string('nationalite')->default('marocaine');
            $table->enum('situation_familiale', ['célibataire', 'marié', 'divorcé', 'veuf'])
                ->default('célibataire');
            $table->integer('nombre_enfants')->nullable()->default(0);
            $table->string('adresse');
            $table->string('ville');
            $table->string('code_postal');
            $table->string('telephone_mobile', 15);
            $table->string('email_personnel')->unique();
            $table->string('nom_contact_urgence')->nullable();
            $table->string('telephone_contact_urgence', 15)->nullable();

            // Informations professionnelles
            $table->foreignId('company_id')->constrained('companies');
            $table->foreignId('departement_id')->constrained('departments');
            $table->date('date_embauche');
            $table->string('poste');
            $table->foreignId('manager_id')->nullable()->constrained('employees');
            $table->enum('statut', ['actif', 'suspendu', 'résilié'])->default('actif');
            $table->string('motif_depart')->nullable();

            // Informations de contrat
            $table->enum('type_contrat', ['CDI', 'CDD', 'Stage', 'Freelance'])
                ->default('CDI');
            $table->foreignId('job_position_id')->nullable()->constrained('job_positions');
            $table->date('date_debut_contrat');
            $table->date('date_fin_contrat')->nullable();
            $table->integer('periode_essai_mois')->nullable();
            $table->date('date_fin_essai')->nullable();
            $table->enum('regime_travail', ['Temps plein', 'Temps partiel', 'Télétravail'])
                ->default('Temps plein');
            $table->integer('heures_par_semaine')->default(40);

            // Rémunération
            $table->decimal('salaire_brut_mensuel', 10, 2);
            $table->enum('mode_paiement', ['Virement Bancaire', 'Chèque', 'Espèces']);
            $table->string('rib_bancaire')->nullable();
            $table->string('nom_banque')->nullable();

            // Informations CNSS
            $table->string('numero_cnss')->nullable()->unique();
            $table->date('date_inscription_cnss')->nullable();
            $table->enum('statut_cnss', ['Non Inscrit', 'En Attente', 'Inscrit'])
                ->default('Non Inscrit');

            // Métadonnées :
            $table->string('photo_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
