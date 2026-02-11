import { z } from "zod";

// ── Enums matching the backend migration ──
export const employeeStatusEnum = ["actif", "suspendu", "résilié"] as const;
export const contractTypeEnum = ["CDI", "CDD", "Stage", "Freelance", "Anapec"] as const;
export const genderEnum = ["homme", "femme"] as const;
export const maritalStatusEnum = ["célibataire", "marié", "divorcé", "veuf"] as const;
export const paymentMethodEnum = ["Virement Bancaire", "Chèque", "Espèces"] as const;
export const workRegimeEnum = ["Temps plein", "Temps partiel", "Télétravail"] as const;
export const cnssStatusEnum = ["Non Inscrit", "En Attente", "Inscrit"] as const;

// ── Full employee schema (for create/edit validation) ──
export const employeeSchema = z.object({
  // Personal info
  matricule_employe: z.string().min(1, "Matricule is required"),
  nom_complet: z.string().min(2, "Full name is required"),
  cin: z.string().min(1, "CIN is required"),
  date_expiration_cin: z.string().min(1, "CIN expiry date is required"),
  date_naissance: z.string().min(1, "Date of birth is required"),
  lieu_naissance: z.string().min(1, "Place of birth is required"),
  sexe: z.enum(genderEnum),
  nationalite: z.string().default("marocaine"),
  situation_familiale: z.enum(maritalStatusEnum),
  nombre_enfants: z.number().int().min(0).default(0),
  adresse: z.string().min(1, "Address is required"),
  ville: z.string().min(1, "City is required"),
  code_postal: z.string().min(1, "Postal code is required"),
  telephone_mobile: z.string().min(1, "Phone number is required").max(15),
  email_personnel: z.string().email("Invalid email"),
  nom_contact_urgence: z.string().optional(),
  telephone_contact_urgence: z.string().max(15).optional(),

  // Professional info
  company_id: z.number().int().positive(),
  departement_id: z.number().int().positive(),
  date_embauche: z.string().min(1, "Hire date is required"),
  poste: z.string().min(1, "Job title is required"),
  manager_id: z.number().int().positive().nullable().optional(),
  statut: z.enum(employeeStatusEnum).default("actif"),
  motif_depart: z.string().optional(),

  // Contract info
  type_contrat: z.enum(contractTypeEnum).default("CDI"),
  job_position_id: z.number().int().positive().nullable().optional(),
  date_debut_contrat: z.string().min(1, "Contract start date is required"),
  date_fin_contrat: z.string().optional(),
  periode_essai_mois: z.number().int().min(0).optional(),
  date_fin_essai: z.string().optional(),
  regime_travail: z.enum(workRegimeEnum).default("Temps plein"),
  heures_par_semaine: z.number().int().default(40),

  // Remuneration
  salaire_brut_mensuel: z.number().positive("Salary must be positive"),
  mode_paiement: z.enum(paymentMethodEnum),
  rib_bancaire: z.string().optional(),
  nom_banque: z.string().optional(),

  // CNSS
  numero_cnss: z.string().optional(),
  date_inscription_cnss: z.string().optional(),
  statut_cnss: z.enum(cnssStatusEnum).default("Non Inscrit"),

  // Meta
  photo_url: z.string().url().nullable().optional(),
});

export type Employee = z.infer<typeof employeeSchema> & {
  id: number;
  created_at: string;
  updated_at: string;
  // Joined relations (for display)
  department?: { id: number; name: string };
  manager?: { id: number; nom_complet: string };
};

export type EmployeeFormData = z.infer<typeof employeeSchema>;
