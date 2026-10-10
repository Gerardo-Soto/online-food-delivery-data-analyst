"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";

import {
  cleanData,
  calculateKpis,
  getFeedbackConversion,
  getOccupationConversion,
  getMaritalStatusConversion,
  getIncomeConversion,
} from "./lib/analytics";

import type { FoodOrder } from "./lib/analytics";

export default function Home() {
  const [data, setData] = useState<FoodOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(
          "/data/online_food_delivery_limpio.csv"
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

  const kpis = calculateKpis(data);
  
  const feedbackData =
  getFeedbackConversion(data);

  const occupationData =
  getOccupationConversion(data);

  const maritalData =
  getMaritalStatusConversion(data);

  const incomeData =
  getIncomeConversion(data);

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
          Customer behavior dashboard
        </p>

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

  <div className="rounded-xl bg-white p-6 shadow-sm">
    <h2 className="mb-4 text-xl font-semibold">
      Feedback
    </h2>

    {feedbackData.map((item) => (
      <div
        key={item.category}
        className="mb-3 flex justify-between"
      >
        <span>
          {item.category}
        </span>

        <span className="font-semibold">
          {item.yes} Yes /{" "}
          {item.yesRate.toFixed(1)}%
        </span>
      </div>
    ))}
  </div>


  <div className="rounded-xl bg-white p-6 shadow-sm">
    <h2 className="mb-4 text-xl font-semibold">
      Occupation
    </h2>

    {occupationData.map((item) => (
      <div
        key={item.category}
        className="mb-3 flex justify-between"
      >
        <span>
          {item.category}
        </span>

        <span className="font-semibold">
          {item.yesRate.toFixed(1)}%
        </span>
      </div>
    ))}
  </div>


  <div className="rounded-xl bg-white p-6 shadow-sm">
    <h2 className="mb-4 text-xl font-semibold">
      Marital Status
    </h2>

    {maritalData.map((item) => (
      <div
        key={item.category}
        className="mb-3 flex justify-between"
      >
        <span>
          {item.category}
        </span>

        <span className="font-semibold">
          {item.yesRate.toFixed(1)}%
        </span>
      </div>
    ))}
  </div>


  <div className="rounded-xl bg-white p-6 shadow-sm">
    <h2 className="mb-4 text-xl font-semibold">
      Monthly Income
    </h2>

    {incomeData.map((item) => (
      <div
        key={item.category}
        className="mb-3 flex justify-between"
      >
        <span>
          {item.category}
        </span>

        <span className="font-semibold">
          {item.yesRate.toFixed(1)}%
        </span>
      </div>
    ))}
  </div>

</section>

      </div>

    </main>
  );
}