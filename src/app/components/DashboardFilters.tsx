"use client";

import {
  Filter,
  RotateCcw,
} from "lucide-react";

import type {
  DashboardFilters as DashboardFiltersType,
} from "../lib/analytics";


type FilterOptions = {
  genders: string[];
  occupations: string[];
  maritalStatuses: string[];
  incomes: string[];
};


type DashboardFiltersProps = {
  filters: DashboardFiltersType;
  options: FilterOptions;

  onChange: (
    filters: DashboardFiltersType
  ) => void;

  onReset: () => void;
};


export default function DashboardFilters({
  filters,
  options,
  onChange,
  onReset,
}: DashboardFiltersProps) {

  function updateFilter(
    key: keyof DashboardFiltersType,
    value: string
  ) {
    onChange({
      ...filters,
      [key]: value,
    });
  }


  return (
    <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <Filter size={18} />

          <h2 className="font-semibold text-gray-900">
            Filtros
          </h2>

        </div>


        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
        >
          <RotateCcw size={15} />

          Limpiar filtros
        </button>

      </div>


      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        {/* Gender */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            Gender
          </label>

          <select
            value={filters.gender}
            onChange={(event) =>
              updateFilter(
                "gender",
                event.target.value
              )
            }
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400"
          >

            <option value="All">
              Todos
            </option>

            {options.genders.map((value) => (
              <option
                key={value}
                value={value}
              >
                {value}
              </option>
            ))}

          </select>
        </div>


        {/* Occupation */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            Occupation
          </label>

          <select
            value={filters.occupation}
            onChange={(event) =>
              updateFilter(
                "occupation",
                event.target.value
              )
            }
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400"
          >

            <option value="All">
              Todos
            </option>

            {options.occupations.map((value) => (
              <option
                key={value}
                value={value}
              >
                {value}
              </option>
            ))}

          </select>
        </div>


        {/* Marital Status */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            Marital Status
          </label>

          <select
            value={filters.maritalStatus}
            onChange={(event) =>
              updateFilter(
                "maritalStatus",
                event.target.value
              )
            }
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400"
          >

            <option value="All">
              Todos
            </option>

            {options.maritalStatuses.map((value) => (
              <option
                key={value}
                value={value}
              >
                {value}
              </option>
            ))}

          </select>
        </div>


        {/* Monthly Income */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            Monthly Income
          </label>

          <select
            value={filters.monthlyIncome}
            onChange={(event) =>
              updateFilter(
                "monthlyIncome",
                event.target.value
              )
            }
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400"
          >

            <option value="All">
              Todos
            </option>

            {options.incomes.map((value) => (
              <option
                key={value}
                value={value}
              >
                {value}
              </option>
            ))}

          </select>
        </div>

      </div>

    </section>
  );
}