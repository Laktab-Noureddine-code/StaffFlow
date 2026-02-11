<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'matricule_employe' => $this->matricule_employe,
            'nom_complet' => $this->nom_complet,
            'cin' => $this->cin,
            'date_expiration_cin' => $this->date_expiration_cin,
            'date_naissance' => $this->date_naissance,
            'lieu_naissance' => $this->lieu_naissance,
            'sexe' => $this->sexe,
            'nationalite' => $this->nationalite,
            'situation_familiale' => $this->situation_familiale,
            'nombre_enfants' => $this->nombre_enfants,
            'adresse' => $this->adresse,
            'ville' => $this->ville,
            'code_postal' => $this->code_postal,
            'telephone_mobile' => $this->telephone_mobile,
            'email_personnel' => $this->email_personnel,
            'nom_contact_urgence' => $this->nom_contact_urgence,
            'telephone_contact_urgence' => $this->telephone_contact_urgence,

            // Professional info
            'company_id' => $this->company_id,
            'departement_id' => $this->departement_id,
            'date_embauche' => $this->date_embauche,
            'poste' => $this->poste,
            'manager_id' => $this->manager_id,
            'statut' => $this->statut,
            'date_fin_contrat' => $this->date_fin_contrat,
            'motif_depart' => $this->motif_depart,

            // Contract info
            'type_contrat' => $this->type_contrat,
            'date_debut_contrat' => $this->date_debut_contrat,
            'periode_essai_mois' => $this->periode_essai_mois,
            'date_fin_essai' => $this->date_fin_essai,
            'regime_travail' => $this->regime_travail,
            'heures_par_semaine' => $this->heures_par_semaine,

            // Salary
            'salaire_brut_mensuel' => $this->salaire_brut_mensuel,
            'mode_paiement' => $this->mode_paiement,
            'rib_bancaire' => $this->rib_bancaire,
            'nom_banque' => $this->nom_banque,

            // CNSS info
            'numero_cnss' => $this->numero_cnss,
            'date_inscription_cnss' => $this->date_inscription_cnss,
            'statut_cnss' => $this->statut_cnss,

            // Metadata
            'photo_url' => $this->photo_url,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
