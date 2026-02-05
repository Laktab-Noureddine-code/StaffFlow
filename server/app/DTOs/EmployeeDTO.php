<?php

namespace App\DTOs;

use Illuminate\Http\Request;

class EmployeeDTO
{
    public function __construct(
        // Informations personnelles
        public readonly string $matriculeEmploye,
        public readonly string $nomComplet,
        public readonly string $cin,
        public readonly string $dateExpirationCin,
        public readonly string $dateNaissance,
        public readonly string $lieuNaissance,
        public readonly string $sexe,
        public readonly string $nationalite,
        public readonly string $situationFamiliale,
        public readonly int $nombreEnfants,
        public readonly string $adresse,
        public readonly string $ville,
        public readonly string $codePostal,
        public readonly string $telephoneMobile,
        public readonly string $emailPersonnel,
        public readonly ?string $nomContactUrgence,
        public readonly ?string $telephoneContactUrgence,

        // Informations professionnelles
        public readonly int $entrepriseId,
        public readonly int $departementId,
        public readonly string $dateEmbauche,
        public readonly string $poste,
        public readonly ?int $managerId,
        public readonly string $statut,

        // Informations de contrat
        public readonly string $typeContrat,
        public readonly string $dateDebutContrat,
        public readonly ?string $dateFinContrat,
        public readonly ?int $periodeEssaiMois,
        public readonly ?string $dateFinEssai,
        public readonly string $regimeTravail,
        public readonly int $heuresParSemaine,

        // Rémunération
        public readonly float $salaireBrutMensuel,
        public readonly string $modePaiement,
        public readonly ?string $ribBancaire,
        public readonly ?string $nomBanque,

        // CNSS
        public readonly ?string $numeroCnss,
        public readonly ?string $dateInscriptionCnss,
        public readonly string $statutCnss,

        // Métadonnées
        public readonly ?string $photoUrl = null,
    ) {}

    public static function fromRequest(Request $request): self
    {
        return new self(
            matriculeEmploye: $request->input('matricule_employe'),
            nomComplet: $request->input('nom_complet'),
            cin: $request->input('cin'),
            dateExpirationCin: $request->input('date_expiration_cin'),
            dateNaissance: $request->input('date_naissance'),
            lieuNaissance: $request->input('lieu_naissance'),
            sexe: $request->input('sexe', 'homme'),
            nationalite: $request->input('nationalite', 'marocaine'),
            situationFamiliale: $request->input('situation_familiale', 'célibataire'),
            nombreEnfants: $request->input('nombre_enfants', 0),
            adresse: $request->input('adresse'),
            ville: $request->input('ville'),
            codePostal: $request->input('code_postal'),
            telephoneMobile: $request->input('telephone_mobile'),
            emailPersonnel: $request->input('email_personnel'),
            nomContactUrgence: $request->input('nom_contact_urgence'),
            telephoneContactUrgence: $request->input('telephone_contact_urgence'),

            entrepriseId: $request->input('entreprise_id'),
            departementId: $request->input('departement_id'),
            dateEmbauche: $request->input('date_embauche'),
            poste: $request->input('poste'),
            managerId: $request->input('manager_id'),
            statut: $request->input('statut', 'actif'),

            typeContrat: $request->input('type_contrat', 'CDI'),
            dateDebutContrat: $request->input('date_debut_contrat'),
            dateFinContrat: $request->input('date_fin_contrat'),
            periodeEssaiMois: $request->input('periode_essai_mois'),
            dateFinEssai: $request->input('date_fin_essai'),
            regimeTravail: $request->input('regime_travail', 'Temps plein'),
            heuresParSemaine: $request->input('heures_par_semaine', 40),

            salaireBrutMensuel: $request->input('salaire_brut_mensuel'),
            modePaiement: $request->input('mode_paiement'),
            ribBancaire: $request->input('rib_bancaire'),
            nomBanque: $request->input('nom_banque'),

            numeroCnss: $request->input('numero_cnss'),
            dateInscriptionCnss: $request->input('date_inscription_cnss'),
            statutCnss: $request->input('statut_cnss', 'Non Inscrit'),

            photoUrl: $request->input('photo_url'),
        );
    }
     public function toArray(): array
    {
        return [
            'matricule_employe' => $this->matriculeEmploye,
            'nom_complet' => $this->nomComplet,
            'cin' => $this->cin,
            'date_expiration_cin' => $this->dateExpirationCin,
            'date_naissance' => $this->dateNaissance,
            'lieu_naissance' => $this->lieuNaissance,
            'sexe' => $this->sexe,
            'nationalite' => $this->nationalite,
            'situation_familiale' => $this->situationFamiliale,
            'nombre_enfants' => $this->nombreEnfants,
            'adresse' => $this->adresse,
            'ville' => $this->ville,
            'code_postal' => $this->codePostal,
            'telephone_mobile' => $this->telephoneMobile,
            'email_personnel' => $this->emailPersonnel,
            'nom_contact_urgence' => $this->nomContactUrgence,
            'telephone_contact_urgence' => $this->telephoneContactUrgence,
            
            'entreprise_id' => $this->entrepriseId,
            'departement_id' => $this->departementId,
            'date_embauche' => $this->dateEmbauche,
            'poste' => $this->poste,
            'manager_id' => $this->managerId,
            'statut' => $this->statut,
            
            'type_contrat' => $this->typeContrat,
            'date_debut_contrat' => $this->dateDebutContrat,
            'date_fin_contrat' => $this->dateFinContrat,
            'periode_essai_mois' => $this->periodeEssaiMois,
            'date_fin_essai' => $this->dateFinEssai,
            'regime_travail' => $this->regimeTravail,
            'heures_par_semaine' => $this->heuresParSemaine,
            
            'salaire_brut_mensuel' => $this->salaireBrutMensuel,
            'mode_paiement' => $this->modePaiement,
            'rib_bancaire' => $this->ribBancaire,
            'nom_banque' => $this->nomBanque,
            
            'numero_cnss' => $this->numeroCnss,
            'date_inscription_cnss' => $this->dateInscriptionCnss,
            'statut_cnss' => $this->statutCnss,
            
            'photo_url' => $this->photoUrl,
        ];
    }
}
