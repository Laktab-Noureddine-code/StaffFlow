import { useState, useMemo } from "react";
import { Download, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import DataTable, { type Column } from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import SearchInput from "@/components/shared/SearchInput";
import FilterDropdown from "@/components/shared/FilterDropdown";
import Pagination from "@/components/shared/Pagination";
import PageHeader from "@/features/employees/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Employee } from "../schemas/employeeSchema";
import { contractOptions, MOCK_EMPLOYEES, statusLabels, statusOptions, statusVariants } from "@/assets/data/mock_employees";



// ── Filters state type ──
type Filters = {
  search: string;
  status: string;
  department: string;
  contractType: string;
  page: number;
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
};

const PER_PAGE = 10;

// ── Mock data (replace with API call) ──

// ── Initials helper ──
function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ── Component ──
function ManageEmployees() {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: "",
    department: "",
    contractType: "",
    page: 1,
    sortColumn: null,
    sortDirection: "asc",
  });

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value, ...(key !== "page" ? { page: 1 } : {}) }));
  };

  const handleSort = (column: string) => {
    setFilters((prev) => ({
      ...prev,
      sortColumn: column,
      sortDirection: prev.sortColumn === column && prev.sortDirection === "asc" ? "desc" : "asc",
    }));
  };

  // Department options from data
  const departmentOptions = useMemo(() => {
    const depts = new Map<number, string>();
    MOCK_EMPLOYEES.forEach((e) => {
      if (e.department) depts.set(e.department.id, e.department.name);
    });
    return Array.from(depts, ([value, label]) => ({ value: String(value), label }));
  }, []);

  // Filter + sort + paginate
  const { paginatedData, totalItems, totalPages } = useMemo(() => {
    let result = [...MOCK_EMPLOYEES];

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (e) =>
          e.nom_complet.toLowerCase().includes(q) ||
          e.poste.toLowerCase().includes(q) ||
          e.email_personnel.toLowerCase().includes(q) ||
          e.matricule_employe.toLowerCase().includes(q)
      );
    }

    // Filter by status
    if (filters.status) result = result.filter((e) => e.statut === filters.status);

    // Filter by department
    if (filters.department) result = result.filter((e) => String(e.department?.id) === filters.department);

    // Filter by contract type
    if (filters.contractType) result = result.filter((e) => e.type_contrat === filters.contractType);

    // Sort
    if (filters.sortColumn) {
      const col = filters.sortColumn;
      const dir = filters.sortDirection === "asc" ? 1 : -1;
      result.sort((a, b) => {
        const aVal = String((a as Record<string, unknown>)[col] ?? "");
        const bVal = String((b as Record<string, unknown>)[col] ?? "");
        return aVal.localeCompare(bVal) * dir;
      });
    }

    const totalItems = result.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / PER_PAGE));
    const start = (filters.page - 1) * PER_PAGE;
    const paginatedData = result.slice(start, start + PER_PAGE);

    return { paginatedData, totalItems, totalPages };
  }, [filters]);

  // ── Column definitions (important fields only) ──
  const columns: Column<Employee>[] = [
    {
      key: "nom_complet",
      header: "Employee Name",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar size="sm">
            {row.photo_url ? (
              <AvatarImage src={row.photo_url} alt={row.nom_complet} />
            ) : null}
            <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
              {getInitials(row.nom_complet)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-900">{row.nom_complet}</p>
            <p className="truncate text-xs text-gray-400">{row.email_personnel}</p>
          </div>
        </div>
      ),
    },
    {
      key: "poste",
      header: "Job Title",
      sortable: true,
    },
    {
      key: "manager",
      header: "Line Manager",
      render: (row) => (
        <span className="text-gray-500">
          {row.manager ? `@${row.manager.nom_complet}` : "—"}
        </span>
      ),
    },
    {
      key: "department",
      header: "Department",
      sortable: true,
      render: (row) => row.department?.name ?? "—",
    },
    {
      key: "type_contrat",
      header: "Contract",
      sortable: true,
    },
    {
      key: "statut",
      header: "Employee Status",
      sortable: true,
      render: (row) => (
        <StatusBadge
          label={statusLabels[row.statut] ?? row.statut}
          variant={statusVariants[row.statut] ?? "neutral"}
        />
      ),
    },
  ];

  return (
    <div className="p-4 space-y-4 ">
      {/* Header */}
      <PageHeader
        title="Employees"
        subtitle="Manage your Employees"
        actions={
          <>
            <Button variant="outline" size="lg" className="gap-1.5 cursor-pointer ">
              <Download className="size-4 " />
              Download
            </Button>
            <Button size="lg" className="gap-1.5 bg-black hover:bg-gray-800" asChild>
              <Link to="/dashboard/add-employee">
                <Plus className="size-4" />
                Add New
              </Link>
            </Button>
          </>
        }
      />

      {/* Filters bar */}
      <div className="">
        <div className="flex flex-wrap items-center gap-3 border-b border-gray-100 px-4 py-3">
          <SearchInput
            value={filters.search}
            onChange={(v) => updateFilter("search", v)}
            placeholder="Search employee"
            className="w-56"
          />
          <FilterDropdown
            value={filters.department}
            onChange={(v) => updateFilter("department", v)}
            options={departmentOptions}
            placeholder="All Departments"
            className="w-40"
          />
          <FilterDropdown
            value={filters.contractType}
            onChange={(v) => updateFilter("contractType", v)}
            options={contractOptions}
            placeholder="All Contracts"
            className="w-40"
          />
          <FilterDropdown
            value={filters.status}
            onChange={(v) => updateFilter("status", v)}
            options={statusOptions}
            placeholder="All Status"
            className="w-36"
          />
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={paginatedData}
          getRowId={(row) => row.id}
          selectable
          sortColumn={filters.sortColumn}
          sortDirection={filters.sortDirection}
          onSort={handleSort}
          emptyMessage="No employees found."
          actions={(row) => (
            <>
              <Link
                to={`/dashboard/employees/${row.id}`}
                className="inline-flex size-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-emerald-600"
              >
                <Eye className="size-4" />
              </Link>
              <Link
                to={`/dashboard/employees/${row.id}/edit`}
                className="inline-flex size-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-blue-600"
              >
                <Pencil className="size-4" />
              </Link>
              <button
                onClick={() => console.log("Delete", row.id)}
                className="inline-flex size-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-600"
              >
                <Trash2 className="size-4" />
              </button>
            </>
          )}
        />

        {/* Pagination */}
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          totalItems={totalItems}
          perPage={PER_PAGE}
          onPageChange={(p) => updateFilter("page", p)}
        />
      </div>
    </div>
  );
}

export default ManageEmployees;