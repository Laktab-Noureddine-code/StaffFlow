// c:\Users\noure\Desktop\HREM\client\src\features\employees\pages\AddEmployee.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  employeeSchema,
  genderEnum,
  maritalStatusEnum,
  contractTypeEnum,
  paymentMethodEnum,
  workRegimeEnum,
  cnssStatusEnum,
  employeeStatusEnum,
} from "../schemas/employeeSchema";
import api from "@/api/axios";
// import type { z } from "zod";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { useSelector } from "react-redux";

// ── Types ──
type EmployeeData = {
  matricule_employe: string;
  nom_complet: string;
  cin: string;
  date_expiration_cin: string;
  date_naissance: string;
  lieu_naissance: string;
  sexe: string;
  nationalite: string;
  situation_familiale: string;
  nombre_enfants: number;
  adresse: string;
  ville: string;
  code_postal: string;
  telephone_mobile: string;
  email_personnel: string;
  nom_contact_urgence: string;
  telephone_contact_urgence: string;
  company_id: number;
  departement_id: number;
  date_embauche: string;
  poste: string;
  manager_id: number | null;
  statut: string;
  motif_depart: string;
  type_contrat: string;
  date_debut_contrat: string;
  date_fin_contrat: string;
  periode_essai_mois: number;
  date_fin_essai: string;
  regime_travail: string;
  heures_par_semaine: number;
  salaire_brut_mensuel: number;
  mode_paiement: string;
  rib_bancaire: string;
  nom_banque: string;
  numero_cnss: string;
  date_inscription_cnss: string;
  statut_cnss: string;
};

type EmployeeErrors = Partial<Record<keyof EmployeeData, string>>;

// ── Step definitions ──
const STEPS = [
  { key: "personal", label: "Personal Info" },
  { key: "professional", label: "Professional Info" },
  { key: "contract", label: "Contract Details" },
  { key: "salary", label: "Remuneration" },
  { key: "cnss", label: "CNSS" },
] as const;

const TOTAL_STEPS = STEPS.length;

// Fields per step for validation
const stepFields: Record<number, (keyof EmployeeData)[]> = {
  1: [
    "matricule_employe",
    "nom_complet",
    "cin",
    "date_expiration_cin",
    "date_naissance",
    "lieu_naissance",
    "sexe",
    "situation_familiale",
    "adresse",
    "ville",
    "code_postal",
    "telephone_mobile",
    "email_personnel",
  ],
  2: ["company_id", "departement_id", "date_embauche", "poste", "statut"],
  3: [
    "type_contrat",
    "date_debut_contrat",
    "regime_travail",
    "heures_par_semaine",
  ],
  4: ["salaire_brut_mensuel", "mode_paiement"],
  5: [],
};

// ── Component ──
function AddEmployee() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<EmployeeErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const [data, setData] = useState<EmployeeData>({
    matricule_employe: "",
    nom_complet: "",
    cin: "",
    date_expiration_cin: "",
    date_naissance: "",
    lieu_naissance: "",
    sexe: "",
    nationalite: "marocaine",
    situation_familiale: "",
    nombre_enfants: 0,
    adresse: "",
    ville: "",
    code_postal: "",
    telephone_mobile: "",
    email_personnel: "",
    nom_contact_urgence: "",
    telephone_contact_urgence: "",
    company_id: 0,
    departement_id: 0,
    date_embauche: "",
    poste: "",
    manager_id: null,
    statut: "actif",
    motif_depart: "",
    type_contrat: "CDI",
    date_debut_contrat: "",
    date_fin_contrat: "",
    periode_essai_mois: 0,
    date_fin_essai: "",
    regime_travail: "Temps plein",
    heures_par_semaine: 40,
    salaire_brut_mensuel: 0,
    mode_paiement: "",
    rib_bancaire: "",
    nom_banque: "",
    numero_cnss: "",
    date_inscription_cnss: "",
    statut_cnss: "Non Inscrit",
  });
  const companyId = useSelector((state: any) => state.company).id;

  const updateField = (
    field: keyof EmployeeData,
    value: string | number | null,
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };
  useEffect(() => {
    updateField("company_id", companyId);
  }, [companyId]);

  // Validate current step
  const validateCurrentStep = (): boolean => {
    const fields = stepFields[currentStep];
    if (!fields || fields.length === 0) return true;

    const result = employeeSchema.safeParse(data);
    const stepErrors: EmployeeErrors = {};

    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof EmployeeData;
        if (fields.includes(field) && !stepErrors[field]) {
          stepErrors[field] = issue.message;
        }
      }
    }

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleNext = async () => {
    if (!validateCurrentStep()) return;

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((s) => s + 1);
    } else {
      // Submit
      setSubmitting(true);
      try {
        await api.post("/api/employees", data);
        navigate("/dashboard/manage-employees");
      } catch (err: any) {
        if (err?.response?.data?.errors) {
          setErrors(err.response.data.errors);
        }
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  return (
    <div className="p-4 space-y-6 ">
      <PageHeader
        title="Add Employee"
        subtitle="Add a new employee to your company"
      />

      {/* Step Progress */}
      <div className="flex items-center gap-1">
        {STEPS.map((step, i) => {
          const stepNum = i + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div key={step.key} className="flex items-center gap-1 flex-1">
              <div className="flex items-center gap-2 flex-1">
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-full border text-xs font-medium shrink-0 ${
                    isCompleted
                      ? "bg-gray-900 border-gray-900 text-white"
                      : isActive
                        ? "border-gray-900 text-gray-900"
                        : "border-gray-300 text-gray-400"
                  }`}
                >
                  {isCompleted ? <Check className="size-3.5" /> : stepNum}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:block truncate ${
                    isActive ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-px flex-1 min-w-4 ${
                    isCompleted ? "bg-gray-900" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Form Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
        {/* ───── Step 1: Personal Information ───── */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Personal Information
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Basic identity and contact details
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="form-label">
                  Employee ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.matricule_employe}
                  onChange={(e) =>
                    updateField("matricule_employe", e.target.value)
                  }
                  placeholder="e.g. EMP-001"
                  className={
                    errors.matricule_employe ? "form-error" : "form-input"
                  }
                />
                <ErrorMessage message={errors.matricule_employe} />
              </div>
              <div>
                <label className="form-label">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.nom_complet}
                  onChange={(e) => updateField("nom_complet", e.target.value)}
                  placeholder="Full name"
                  className={errors.nom_complet ? "form-error" : "form-input"}
                />
                <ErrorMessage message={errors.nom_complet} />
              </div>
              <div>
                <label className="form-label">
                  CIN <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.cin}
                  onChange={(e) => updateField("cin", e.target.value)}
                  placeholder="National ID number"
                  className={errors.cin ? "form-error" : "form-input"}
                />
                <ErrorMessage message={errors.cin} />
              </div>
              <div>
                <label className="form-label">
                  CIN Expiry Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={data.date_expiration_cin}
                  onChange={(e) =>
                    updateField("date_expiration_cin", e.target.value)
                  }
                  className={
                    errors.date_expiration_cin ? "form-error" : "form-input"
                  }
                />
                <ErrorMessage message={errors.date_expiration_cin} />
              </div>
              <div>
                <label className="form-label">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={data.date_naissance}
                  onChange={(e) =>
                    updateField("date_naissance", e.target.value)
                  }
                  className={
                    errors.date_naissance ? "form-error" : "form-input"
                  }
                />
                <ErrorMessage message={errors.date_naissance} />
              </div>
              <div>
                <label className="form-label">
                  Place of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.lieu_naissance}
                  onChange={(e) =>
                    updateField("lieu_naissance", e.target.value)
                  }
                  placeholder="City of birth"
                  className={
                    errors.lieu_naissance ? "form-error" : "form-input"
                  }
                />
                <ErrorMessage message={errors.lieu_naissance} />
              </div>
              <div>
                <label className="form-label">
                  Gender <span className="text-red-500">*</span>
                </label>
                <Select
                  value={data.sexe}
                  onValueChange={(v) => updateField("sexe", v)}
                >
                  <SelectTrigger
                    className={`w-full ${errors.sexe ? "border-red-400" : ""}`}
                  >
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderEnum.map((g) => (
                      <SelectItem key={g} value={g} className="capitalize">
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ErrorMessage message={errors.sexe} />
              </div>
              <div>
                <label className="form-label">
                  Marital Status <span className="text-red-500">*</span>
                </label>
                <Select
                  value={data.situation_familiale}
                  onValueChange={(v) => updateField("situation_familiale", v)}
                >
                  <SelectTrigger
                    className={`w-full ${errors.situation_familiale ? "border-red-400" : ""}`}
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {maritalStatusEnum.map((s) => (
                      <SelectItem key={s} value={s} className="capitalize">
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ErrorMessage message={errors.situation_familiale} />
              </div>
              <div>
                <label className="form-label">Nationality</label>
                <input
                  type="text"
                  value={data.nationalite}
                  onChange={(e) => updateField("nationalite", e.target.value)}
                  placeholder="Nationality"
                  className={"form-input"}
                />
              </div>
              <div>
                <label className="form-label">Number of Children</label>
                <input
                  type="number"
                  min={0}
                  value={data.nombre_enfants}
                  onChange={(e) =>
                    updateField("nombre_enfants", parseInt(e.target.value) || 0)
                  }
                  className={"form-input"}
                />
              </div>
            </div>

            {/* Address + Contact Section */}
            <div className="border-t border-gray-100 pt-5 mt-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Address & Contact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="form-label">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={data.adresse}
                    onChange={(e) => updateField("adresse", e.target.value)}
                    placeholder="Street address"
                    className={errors.adresse ? "form-error" : "form-input"}
                  />
                  <ErrorMessage message={errors.adresse} />
                </div>
                <div>
                  <label className="form-label">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={data.ville}
                    onChange={(e) => updateField("ville", e.target.value)}
                    placeholder="City"
                    className={errors.ville ? "form-error" : "form-input"}
                  />
                  <ErrorMessage message={errors.ville} />
                </div>
                <div>
                  <label className="form-label">
                    Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={data.code_postal}
                    onChange={(e) => updateField("code_postal", e.target.value)}
                    placeholder="Postal code"
                    className={errors.code_postal ? "form-error" : "form-input"}
                  />
                  <ErrorMessage message={errors.code_postal} />
                </div>
                <div>
                  <label className="form-label">
                    Mobile Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={data.telephone_mobile}
                    onChange={(e) =>
                      updateField("telephone_mobile", e.target.value)
                    }
                    placeholder="+212 6XX XXX XXX"
                    className={
                      errors.telephone_mobile ? "form-error" : "form-input"
                    }
                  />
                  <ErrorMessage message={errors.telephone_mobile} />
                </div>
                <div>
                  <label className="form-label">
                    Personal Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={data.email_personnel}
                    onChange={(e) =>
                      updateField("email_personnel", e.target.value)
                    }
                    placeholder="email@example.com"
                    className={
                      errors.email_personnel ? "form-error" : "form-input"
                    }
                  />
                  <ErrorMessage message={errors.email_personnel} />
                </div>
                <div>
                  <label className="form-label">Emergency Contact Name</label>
                  <input
                    type="text"
                    value={data.nom_contact_urgence}
                    onChange={(e) =>
                      updateField("nom_contact_urgence", e.target.value)
                    }
                    placeholder="Contact name"
                    className={"form-input"}
                  />
                </div>
                <div>
                  <label className="form-label">Emergency Contact Phone</label>
                  <input
                    type="tel"
                    value={data.telephone_contact_urgence}
                    onChange={(e) =>
                      updateField("telephone_contact_urgence", e.target.value)
                    }
                    placeholder="Phone number"
                    className={"form-input"}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ───── Step 2: Professional Information ───── */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Professional Information
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Company, department, and role details
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="form-label">
                  Department ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  value={data.departement_id || ""}
                  onChange={(e) =>
                    updateField("departement_id", parseInt(e.target.value) || 0)
                  }
                  placeholder="Department ID"
                  className={
                    errors.departement_id ? "form-error" : "form-input"
                  }
                />
                <ErrorMessage message={errors.departement_id} />
              </div>
              <div>
                <label className="form-label">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.poste}
                  onChange={(e) => updateField("poste", e.target.value)}
                  placeholder="e.g. Software Engineer"
                  className={errors.poste ? "form-error" : "form-input"}
                />
                <ErrorMessage message={errors.poste} />
              </div>
              <div>
                <label className="form-label">
                  Hire Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={data.date_embauche}
                  onChange={(e) => updateField("date_embauche", e.target.value)}
                  className={errors.date_embauche ? "form-error" : "form-input"}
                />
                <ErrorMessage message={errors.date_embauche} />
              </div>
              <div>
                <label className="form-label">Manager ID</label>
                <input
                  type="number"
                  min={1}
                  value={data.manager_id ?? ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateField("manager_id", val ? parseInt(val) : null);
                  }}
                  placeholder="Manager ID (optional)"
                  className={"form-input"}
                />
              </div>
              <div>
                <label className="form-label">
                  Status <span className="text-red-500">*</span>
                </label>
                <Select
                  value={data.statut}
                  onValueChange={(v) => updateField("statut", v)}
                >
                  <SelectTrigger
                    className={`w-full ${errors.statut ? "border-red-400" : ""}`}
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {employeeStatusEnum.map((s) => (
                      <SelectItem key={s} value={s} className="capitalize">
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ErrorMessage message={errors.statut} />
              </div>
              <div className="md:col-span-2">
                <label className="form-label">Reason for Departure</label>
                <input
                  type="text"
                  value={data.motif_depart}
                  onChange={(e) => updateField("motif_depart", e.target.value)}
                  placeholder="If applicable"
                  className={"form-input"}
                />
              </div>
            </div>
          </div>
        )}

        {/* ───── Step 3: Contract Details ───── */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Contract Details
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Contract type, duration, and work schedule
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="form-label">
                  Contract Type <span className="text-red-500">*</span>
                </label>
                <Select
                  value={data.type_contrat}
                  onValueChange={(v) => updateField("type_contrat", v)}
                >
                  <SelectTrigger
                    className={`w-full ${errors.type_contrat ? "border-red-400" : ""}`}
                  >
                    <SelectValue placeholder="Select contract type" />
                  </SelectTrigger>
                  <SelectContent>
                    {contractTypeEnum.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ErrorMessage message={errors.type_contrat} />
              </div>
              <div>
                <label className="form-label">
                  Contract Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={data.date_debut_contrat}
                  onChange={(e) =>
                    updateField("date_debut_contrat", e.target.value)
                  }
                  className={
                    errors.date_debut_contrat ? "form-error" : "form-input"
                  }
                />
                <ErrorMessage message={errors.date_debut_contrat} />
              </div>
              <div>
                <label className="form-label">Contract End Date</label>
                <input
                  type="date"
                  value={data.date_fin_contrat}
                  onChange={(e) =>
                    updateField("date_fin_contrat", e.target.value)
                  }
                  className={"form-input"}
                />
              </div>
              <div>
                <label className="form-label">Trial Period (months)</label>
                <input
                  type="number"
                  min={0}
                  value={data.periode_essai_mois}
                  onChange={(e) =>
                    updateField(
                      "periode_essai_mois",
                      parseInt(e.target.value) || 0,
                    )
                  }
                  className={"form-input"}
                />
              </div>
              <div>
                <label className="form-label">Trial End Date</label>
                <input
                  type="date"
                  value={data.date_fin_essai}
                  onChange={(e) =>
                    updateField("date_fin_essai", e.target.value)
                  }
                  className={"form-input"}
                />
              </div>
              <div>
                <label className="form-label">
                  Work Regime <span className="text-red-500">*</span>
                </label>
                <Select
                  value={data.regime_travail}
                  onValueChange={(v) => updateField("regime_travail", v)}
                >
                  <SelectTrigger
                    className={`w-full ${errors.regime_travail ? "border-red-400" : ""}`}
                  >
                    <SelectValue placeholder="Select regime" />
                  </SelectTrigger>
                  <SelectContent>
                    {workRegimeEnum.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ErrorMessage message={errors.regime_travail} />
              </div>
              <div>
                <label className="form-label">
                  Hours per Week <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={0}
                  value={data.heures_par_semaine}
                  onChange={(e) =>
                    updateField(
                      "heures_par_semaine",
                      parseInt(e.target.value) || 0,
                    )
                  }
                  className={
                    errors.heures_par_semaine ? "form-error" : "form-input"
                  }
                />
                <ErrorMessage message={errors.heures_par_semaine} />
              </div>
            </div>
          </div>
        )}

        {/* ───── Step 4: Remuneration ───── */}
        {currentStep === 4 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Remuneration
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Salary and payment information
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="form-label">
                  Gross Monthly Salary (MAD){" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={data.salaire_brut_mensuel || ""}
                  onChange={(e) =>
                    updateField(
                      "salaire_brut_mensuel",
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  placeholder="0.00"
                  className={
                    errors.salaire_brut_mensuel ? "form-error" : "form-input"
                  }
                />
                <ErrorMessage message={errors.salaire_brut_mensuel} />
              </div>
              <div>
                <label className="form-label">
                  Payment Method <span className="text-red-500">*</span>
                </label>
                <Select
                  value={data.mode_paiement}
                  onValueChange={(v) => updateField("mode_paiement", v)}
                >
                  <SelectTrigger
                    className={`w-full ${errors.mode_paiement ? "border-red-400" : ""}`}
                  >
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethodEnum.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ErrorMessage message={errors.mode_paiement} />
              </div>
              <div>
                <label className="form-label">Bank RIB</label>
                <input
                  type="text"
                  value={data.rib_bancaire}
                  onChange={(e) => updateField("rib_bancaire", e.target.value)}
                  placeholder="Bank account number"
                  className={"form-input"}
                />
              </div>
              <div>
                <label className="form-label">Bank Name</label>
                <input
                  type="text"
                  value={data.nom_banque}
                  onChange={(e) => updateField("nom_banque", e.target.value)}
                  placeholder="e.g. Attijariwafa Bank"
                  className={"form-input"}
                />
              </div>
            </div>
          </div>
        )}

        {/* ───── Step 5: CNSS ───── */}
        {currentStep === 5 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              CNSS Information
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Social security registration details
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="form-label">CNSS Number</label>
                <input
                  type="text"
                  value={data.numero_cnss}
                  onChange={(e) => updateField("numero_cnss", e.target.value)}
                  placeholder="CNSS number"
                  className={"form-input"}
                />
              </div>
              <div>
                <label className="form-label">CNSS Registration Date</label>
                <input
                  type="date"
                  value={data.date_inscription_cnss}
                  onChange={(e) =>
                    updateField("date_inscription_cnss", e.target.value)
                  }
                  className={"form-input"}
                />
              </div>
              <div>
                <label className="form-label">CNSS Status</label>
                <Select
                  value={data.statut_cnss}
                  onValueChange={(v) => updateField("statut_cnss", v)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select CNSS status" />
                  </SelectTrigger>
                  <SelectContent>
                    {cnssStatusEnum.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={handleBack}
          disabled={currentStep === 1}
          className="gap-1.5 cursor-pointer"
        >
          <ChevronLeft className="size-4" />
          Back
        </Button>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          Step {currentStep} of {TOTAL_STEPS}
        </div>

        <Button
          type="button"
          size="lg"
          onClick={handleNext}
          disabled={submitting}
          className="gap-1.5 bg-black hover:bg-gray-800 cursor-pointer"
        >
          {currentStep === TOTAL_STEPS ? (
            submitting ? (
              "Saving..."
            ) : (
              "Save Employee"
            )
          ) : (
            <>
              Continue
              <ChevronRight className="size-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default AddEmployee;
