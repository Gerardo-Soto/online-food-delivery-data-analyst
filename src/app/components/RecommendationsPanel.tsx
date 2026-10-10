"use client";

import {
  GraduationCap,
  Gift,
  MessageCircleMore,
  FlaskConical,
} from "lucide-react";

const recommendations = [
  {
    title: "Student Referral Monday",
    segment: "Estudiantes · 87.5% Yes",
    description:
      "Permitir que un estudiante invite a una persona nueva y, presentando su credencial, Los 2 reciban un 30% de descuento los lunes.",
    objective: "Adquisición de nuevos clientes",
    metric:
      "Nuevos clientes referidos, pedidos incrementales durante la semana y tasa de recompra.",
    icon: GraduationCap,
  },

  {
    title: "Programa de fidelidad",
    segment: "No Income · 85.5% Yes",
    description:
      "Premiar la frecuencia de compra con un postre gratuito en la tercera compra y una recompensa mayor al completar cinco compras en días diferentes.",
    objective: "Incrementar frecuencia y retención",
    metric:
      "Compras por cliente, tiempo entre pedidos y tasa de clientes que alcanzan la quinta compra.",
    icon: Gift,
  },

  {
    title: "Recovery Offer",
    segment: "Feedback negativo · 27.8% Yes",
    description:
      "Ofrecer un incentivo de recuperación después de una experiencia negativa para motivar una nueva compra y recuperar clientes en riesgo.",
    objective: "Reducir pérdida de clientes",
    metric:
      "Tasa de recompra después de feedback negativo y recuperación de clientes.",
    icon: MessageCircleMore,
  },
];

export default function RecommendationsPanel() {
  return (
    <section className="mt-12">

      <div className="mb-6">

        <div className="flex items-center gap-2">
          <FlaskConical
            size={20}
            className="text-gray-700"
          />

          <h2 className="text-xl font-semibold text-gray-900">
            Recomendaciones de negocio
          </h2>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Acciones experimentales basadas en los patrones observados
          para impulsar adquisición, frecuencia de compra y retención.
        </p>

        <p className="mt-4 text-sm leading-5 text-gray-400">
        Estas recomendaciones representan hipótesis de negocio derivadas
        del análisis exploratorio. Su impacto debería validarse mediante
        experimentos antes de una implementación general (descuento real
         debería definirse después de revisar margen y costo por pedido).
      </p>


      </div>

      <div className="grid gap-5 lg:grid-cols-3">

        {recommendations.map((recommendation) => {

          const Icon = recommendation.icon;

          return (
            <article
              key={recommendation.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >

              <div className="mb-4 flex items-center justify-between">

                <div className="rounded-lg bg-gray-100 p-2">
                  <Icon
                    size={20}
                    className="text-gray-700"
                  />
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  Hipótesis
                </span>

              </div>

              <p className="text-sm font-medium text-gray-500">
                {recommendation.segment}
              </p>

              <h3 className="mt-2 text-lg font-semibold text-gray-900">
                {recommendation.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {recommendation.description}
              </p>

              <div className="mt-5 border-t border-gray-100 pt-4">

                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Objetivo
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {recommendation.objective}
                </p>

                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Cómo medirlo
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {recommendation.metric}
                </p>

              </div>

            </article>
          );
        })}

      </div>

    </section>
  );
}