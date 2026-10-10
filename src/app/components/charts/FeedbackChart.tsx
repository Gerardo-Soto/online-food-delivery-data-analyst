"use client";

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

import type { ConversionData } from "../../lib/analytics";


type FeedbackChartProps = {
  data: ConversionData[];
};


type TooltipProps = {
  active?: boolean;
  payload?: Array<{
    payload: ConversionData;
  }>;
};


function FeedbackTooltip({
  active,
  payload,
}: TooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const item = payload[0].payload;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg">

      <p className="font-semibold text-gray-900">
        {item.category}
      </p>

      <div className="mt-2 space-y-1 text-sm text-gray-600">

        <p>
          Tasa Yes:
          <span className="ml-2 font-semibold text-gray-900">
            {item.yesRate.toFixed(1)}%
          </span>
        </p>

        <p>
          Output Yes:
          <span className="ml-2 font-semibold text-gray-900">
            {item.yes}
          </span>
        </p>

        <p>
          Output No:
          <span className="ml-2 font-semibold text-gray-900">
            {item.no}
          </span>
        </p>

        <p>
          Total:
          <span className="ml-2 font-semibold text-gray-900">
            {item.total}
          </span>
        </p>

      </div>

    </div>
  );
}


export default function FeedbackChart({
  data,
}: FeedbackChartProps) {

  const chartData = [...data].sort(
    (a, b) => b.yesRate - a.yesRate
  );

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="rounded-2xl bg-white p-6 shadow-sm"
    >

      {/* Header */}

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-lg bg-gray-100 p-2">
          <MessageCircle
            size={20}
            className="text-gray-700"
          />
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            El feedback marca la mayor diferencia
          </h2>

          <p className="text-sm text-gray-500">
            Compara la Intención de recompra entre clientes con feedback positivo y negativo.
          </p>
        </div>

      </div>


      {/* Chart */}

      <div className="h-[280px] w-full">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              top: 10,
              right: 45,
              bottom: 10,
              left: 10,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="#e5e7eb"
            />

            <XAxis
              type="number"
              domain={[0, 100]}
              tickFormatter={(value) =>
                `${value}%`
              }
              tick={{
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              type="category"
              dataKey="category"
              width={80}
              tick={{
                fontSize: 13,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              content={<FeedbackTooltip />}
              cursor={{
                fill: "#f9fafb",
              }}
            />

            <Bar
              dataKey="yesRate"
              radius={[0, 6, 6, 0]}
              animationDuration={800}
            >

              {chartData.map((item) => (
                <Cell
                  key={item.category}
                  fill={
                    item.category === "Positive"
                      ? "#111827"
                      : "#9ca3af"
                  }
                />
              ))}

              <LabelList
                dataKey="yesRate"
                position="right"
                formatter={(value) =>
                  `${Number(value).toFixed(1)}%`
                }
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  fill: "#374151",
                }}
              />

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </motion.div>
  );
}