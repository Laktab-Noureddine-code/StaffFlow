<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmployeeRequest extends FormRequest
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
            // Informations Personnelles
            'matricule_employe' => 'nullable|string|unique:employees,matricule_employe',
            'nom_complet' => 'required|string|max:255',
            'cin' => 'required|string|max:20|unique:employees,cin',
            'date_expiration_cin' => 'required|date|after:today',
            'date_naissance' => 'required|date|before:today',
            'lieu_naissance' => 'required|string|max:255',
            'sexe' => 'required|in:homme,femme',
            'nationalite' => 'required|string|max:50',
            'situation_familiale' => 'nullable|in:célibataire,marié,divorcé,veuf',
            'nombre_enfants' => 'nullable|integer|min:0',
            'adresse' => 'required|string|max:255',
            'ville' => 'required|string|max:100',
            'code_postal' => 'required|string|max:10',
            'telephone_mobile' => 'required|string|max:15',
            'email_personnel' => 'required|email|max:255|unique:employees,email_personnel',
            'nom_contact_urgence' => 'nullable|string|max:255',
            'telephone_contact_urgence' => 'nullable|string|max:15',

            // Informations professionnelles
            'company_id' => 'required|exists:companies,id',
            'departement_id' => 'required|exists:departments,id',
            'date_embauche' => 'required|date',
            'poste' => 'required|string|max:255',
            'manager_id' => 'nullable|exists:employees,id',
            'statut' => 'nullable|in:actif,suspendu,résilié',
            'date_fin_contrat' => 'nullable|date|after_or_equal:date_embauche',
            'motif_depart' => 'nullable|string|max:255',

            // Informations de contrat
            'type_contrat' => 'required|in:CDI,CDD,Stage,Freelance,Anapec',
            'date_debut_contrat' => 'required|date',
            'periode_essai_mois' => 'nullable|integer|min:0',
            'date_fin_essai' => 'nullable|date|after_or_equal:date_debut_contrat',
            'regime_travail' => 'required|in:Temps plein,Temps partiel,Télétravail',
            'heures_par_semaine' => 'required|integer|min:1',

            // Rémunération
            'salaire_brut_mensuel' => 'required|numeric|min:0',
            'mode_paiement' => 'required|in:Virement Bancaire,Chèque,Espèces',
            'rib_bancaire' => 'nullable|string|max:34',
            'nom_banque' => 'nullable|string|max:255',

            // Informations CNSS
            'numero_cnss' => 'nullable|string|unique:employees,numero_cnss',
            'date_inscription_cnss' => 'nullable|date',
            'statut_cnss' => 'nullable|in:Non Inscrit,En Attente,Inscrit',

            // Métadonnées
            'photo_url' => 'nullable|url',
        ];
        }
}
