"use client";

import {
  Lightbulb,
  AlertTriangle,
} from "lucide-react";

import { motion } from "motion/react";

import type {
  DashboardInsight,
} from "../lib/analytics";


type InsightsPanelProps = {
  insights: DashboardInsight[];
};


export default function InsightsPanel({
  insights,
}: InsightsPanelProps) {

  if (insights.length === 0) {
    return null;
  }


  return (
    <section className="mt-10">

      <div className="mb-5">

        <h2 className="text-xl font-semibold text-gray-900">
          ¿Qué nos dicen los datos?
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Principales patrones observados en el segmento seleccionado.
        </p>

      </div>


      <div className="grid gap-4 md:grid-cols-2">

        {insights.map(
          (insight, index) => {

            const warning =
              insight.title ===
              "Muestra reducida";

            return (

              <motion.div
                key={`${insight.title}-${index}`}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >

                <div className="flex gap-3">

                  <div
                    className={
                      warning
                        ? "rounded-lg bg-amber-50 p-2"
                        : "rounded-lg bg-gray-100 p-2"
                    }
                  >

                    {warning ? (
                      <AlertTriangle
                        size={19}
                        className="text-amber-600"
                      />
                    ) : (
                      <Lightbulb
                        size={19}
                        className="text-gray-700"
                      />
                    )}

                  </div>


                  <div>

                    <h3 className="font-semibold text-gray-900">
                      {insight.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {insight.description}
                    </p>

                  </div>

                </div>

              </motion.div>

            );
          }
        )}

      </div>

    </section>
  );
}