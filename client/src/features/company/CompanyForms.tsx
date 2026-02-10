import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CompanyFormsProps {
  step: number;
  companyName: string;
  setCompanyName: (v: string) => void;
  domainName: string;
  setDomainName: (v: string) => void;
  companySize: string;
  setCompanySize: (v: string) => void;
  companySizes: string[];
  ice: string;
  setIce: (v: string) => void;
  cnssEmployerNumber: string;
  setCnssEmployerNumber: (v: string) => void;
  companyNumber: string;
  setCompanyNumber: (v: string) => void;
  address: string;
  setAddress: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  logoUrl: string;
  setLogoUrl: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  statusOptions: string[];
}

const inputClass =
  "w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition";

function CompanyForms(props: CompanyFormsProps) {
  const { t } = useTranslation();
  const {
    step,
    companyName,
    setCompanyName,
    domainName,
    setDomainName,
    companySize,
    setCompanySize,
    companySizes,
    ice,
    setIce,
    cnssEmployerNumber,
    setCnssEmployerNumber,
    companyNumber,
    setCompanyNumber,
    address,
    setAddress,
    city,
    setCity,
    phone,
    setPhone,
    email,
    setEmail,
    logoUrl,
    setLogoUrl,
    status,
    setStatus,
    statusOptions,
  } = props;

  /* ───── Step 1: Company Name, Domain & Size ───── */
  if (step === 1) {
    return (
      <div className="lg:w-[55%]">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            {t("company.step1.formTitle")}
          </h2>

          <div className="mb-5">
            <label className="block text-sm text-gray-500 mb-1.5">
              {t("company.step1.companyName")} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder={t("company.step1.placeholderName")}
              className={inputClass}
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm text-gray-500 mb-1.5">
              {t("company.step1.domainName")}
            </label>
            <div className="flex">
              <input
                type="text"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
                placeholder={t("company.step1.placeholderDomain")}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-l-lg text-sm focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition"
              />
              <span className="inline-flex items-center px-4 py-2.5 bg-gray-50 border border-l-0 border-gray-300 rounded-r-lg text-sm text-gray-500">
                .hrline.com
              </span>
            </div>
          </div>

          <p className="flex items-center gap-1.5 text-xs text-gray-400 mb-8">
            <Info size={14} className="text-gray-400 shrink-0" />
            {t("company.step1.domainHint")}
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("company.step1.companySizeTitle")}
          </h3>

          <div className="grid grid-cols-4 gap-3">
            {companySizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setCompanySize(size)}
                className={`relative px-4 py-2.5 rounded-lg border text-sm font-medium transition cursor-pointer ${
                  companySize === size
                    ? "border-teal-600 bg-teal-50 text-teal-700"
                    : "border-gray-300 text-gray-600 hover:border-gray-400"
                }`}
              >
                {size}
                {companySize === size && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-teal-600 rounded-full flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5L4.5 7.5L8 3"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ───── Step 2: Legal / Registration Details ───── */
  if (step === 2) {
    return (
      <div className="lg:w-[55%]">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            {t("company.step2.formTitle")}
          </h2>

          <div className="mb-5">
            <label className="block text-sm text-gray-500 mb-1.5">
              {t("company.step2.ice")} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={ice}
              onChange={(e) => setIce(e.target.value)}
              placeholder={t("company.step2.placeholderIce")}
              className={inputClass}
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm text-gray-500 mb-1.5">
              {t("company.step2.cnssEmployerNumber")} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={cnssEmployerNumber}
              onChange={(e) => setCnssEmployerNumber(e.target.value)}
              placeholder={t("company.step2.placeholderCnss")}
              className={inputClass}
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm text-gray-500 mb-1.5">
              {t("company.step2.companyNumber")} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={companyNumber}
              onChange={(e) => setCompanyNumber(e.target.value)}
              placeholder={t("company.step2.placeholderCompanyNumber")}
              className={inputClass}
            />
          </div>

          <p className="flex items-center gap-1.5 text-xs text-gray-400">
            <Info size={14} className="text-gray-400 shrink-0" />
            {t("company.step2.hint")}
          </p>
        </div>
      </div>
    );
  }

  /* ───── Step 3: Address & Contact ───── */
  if (step === 3) {
    return (
      <div className="lg:w-[55%]">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            {t("company.step3.formTitle")}
          </h2>

          <div className="mb-5">
            <label className="block text-sm text-gray-500 mb-1.5">
              {t("company.step3.address")} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t("company.step3.placeholderAddress")}
              className={inputClass}
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm text-gray-500 mb-1.5">
              {t("company.step3.city")} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={t("company.step3.placeholderCity")}
              className={inputClass}
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm text-gray-500 mb-1.5">
              {t("company.step3.phone")} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("company.step3.placeholderPhone")}
              className={inputClass}
            />
          </div>
        </div>
      </div>
    );
  }

  /* ───── Step 4: Email, Logo & Status ───── */
  if (step === 4) {
    return (
      <div className="lg:w-[55%]">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            {t("company.step4.formTitle")}
          </h2>

          <div className="mb-5">
            <label className="block text-sm text-gray-500 mb-1.5">
              {t("company.step4.email")} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("company.step4.placeholderEmail")}
              className={inputClass}
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm text-gray-500 mb-1.5">
              {t("company.step4.logoUrl")}
            </label>
            <input
              type="url"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder={t("company.step4.placeholderLogo")}
              className={inputClass}
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm text-gray-500 mb-1.5">
              {t("company.step4.status")} <span className="text-red-500">*</span>
            </label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("company.step4.placeholderStatus")} />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((opt) => (
                  <SelectItem key={opt} value={opt} className="capitalize">
                    {t(`company.step4.status${opt.charAt(0).toUpperCase() + opt.slice(1)}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default CompanyForms;
