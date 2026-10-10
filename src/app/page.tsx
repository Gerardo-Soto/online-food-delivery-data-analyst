"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import Papa from "papaparse";

import {
  cleanData,
  calculateKpis,
  getFeedbackConversion,
  getOccupationConversion,
  getMaritalStatusConversion,
  getIncomeConversion,
  filterData,
  getUniqueValues,
  initialFilters,
  generateDashboardInsights,
} from "./lib/analytics";

import type { 
  FoodOrder, 
  DashboardFilters as DashboardFiltersType,
} from "./lib/analytics";
import FeedbackChart from "./components/charts/FeedbackChart";
import ConversionBarChart from "./components/charts/ConversionBarChart";
import DashboardFilters from "./components/DashboardFilters";
import InsightsPanel from "./components/InsightsPanel";

export default function Home() {
  const [data, setData] = useState<FoodOrder[]>([]);
  const [filters, setFilters] =
  useState<DashboardFiltersType>(
    initialFilters
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(
          "./data/online_food_delivery_limpio.csv"
        );

        if (!response.ok) {
          throw new Error(
            `Error HTTP: ${response.status}`
          );
        }

        const csv = await response.text();

        Papa.parse<FoodOrder>(csv, {
          header: true,
          skipEmptyLines: true,

          complete: (results) => {
            console.log(
              "Registros originales:",
              results.data.length
            );

            const cleanedData = cleanData(
              results.data
            );

            console.log(
              "Registros después de limpieza:",
              cleanedData.length
            );

            setData(cleanedData);
            setLoading(false);
          },
        });
      } catch (error) {
        console.error(
          "Error cargando dataset:",
          error
        );

        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filterOptions = useMemo(() => {
  return {
    genders:
      getUniqueValues(
        data,
        "Gender"
      ),

    occupations:
      getUniqueValues(
        data,
        "Occupation"
      ),

    maritalStatuses:
      getUniqueValues(
        data,
        "Marital Status"
      ),

    incomes:
      getUniqueValues(
        data,
        "Monthly Income"
      ),
  };
}, [data]);

  const filteredData = useMemo(() => {
  return filterData(
    data,
    filters
  );
}, [data, filters]);

//check if filteredData has any records
const hasData = filteredData.length > 0;

const activeFilters = Object.values(filters).filter(
  (value) => value !== "All"
).length;

  const kpis = calculateKpis(filteredData);
  
  const feedbackData =
  getFeedbackConversion(filteredData);

  const occupationData =
  getOccupationConversion(filteredData);

  const maritalData =
  getMaritalStatusConversion(filteredData);

  const incomeData =
  getIncomeConversion(filteredData);

  const insights =
  generateDashboardInsights(
    filteredData,
    feedbackData,
    occupationData,
    maritalData,
    incomeData
  );

  console.log(
  "Feedback:",
  feedbackData
);

console.log(
  "Occupation:",
  occupationData
);

console.log(
  "Marital Status:",
  maritalData
);

console.log(
  "Monthly Income:",
  incomeData
);

  if (loading) {
    return (
      <main className="p-10">
        <p>Cargando datos...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="mx-auto max-w-7xl">

        <h1 className="text-3xl font-bold text-gray-900">
          Online Food Delivery
        </h1>

        <p className="mt-2 text-gray-500">
          Explora qué características de los clientes están asociadas con una mayor intención de volver a ordenar.
        </p>
        <p className="text-sm text-gray-500">
          Fuente: <a href="https://www.kaggle.com/datasets/srisyra02/online-food-ordering-dataset/data">kaggle.com/datasets/srisyra02/online-food-ordering-dataset/data</a> 
        </p>

        <DashboardFilters
          filters={filters}
          options={filterOptions}
          onChange={setFilters}
          onReset={() =>
            setFilters(initialFilters)
          }
        />

        {activeFilters > 0 && (
          <div className="mt-4 flex items-center gap-2">
            <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white">
              {activeFilters}{" "}
              {activeFilters === 1 ? "filtro activo" : "filtros activos"}
            </span>

            <span className="text-sm text-gray-500">
              {filteredData.length} registros encontrados
            </span>
          </div>
        )}

        <section className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

          {/* Registros */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Registros analizados
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {kpis.total}
            </p>
          </div>

          {/* Output Yes */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Tasa Output Yes
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {kpis.yesRate.toFixed(1)}%
            </p>
          </div>

          {/* Feedback */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Feedback positivo
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {kpis.positiveFeedbackRate.toFixed(1)}%
            </p>
          </div>

          {/* Edad */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Edad promedio
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {kpis.averageAge.toFixed(1)}
            </p>
          </div>

        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">

  <FeedbackChart data={feedbackData} />

  <ConversionBarChart
    title="La conversión varía según la ocupación"
    subtitle="Identifica qué grupos ocupacionales presentan una mayor proporción de Compradores"
    data={occupationData}
  />

  <ConversionBarChart
    title="La intención de recompra cambia por estado civil"
    subtitle="Compara la tasa de Compra entre los distintos grupos de estado civil."
    data={maritalData}
  />

  <ConversionBarChart
    title="¿Cómo cambia la conversión según el ingreso?"
    subtitle="Observa si la Intención de recompra sigue algún patrón entre los diferentes niveles de ingreso."
    data={incomeData}
  />

    </section>

    <InsightsPanel
      insights={insights}
    />
      </div>
      
    </main>
  );
}