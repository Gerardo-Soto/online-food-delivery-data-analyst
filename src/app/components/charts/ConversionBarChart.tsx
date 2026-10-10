"use client";

import { motion } from "motion/react";

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


type ConversionBarChartProps = {
  title: string;
  subtitle?: string;
  data: ConversionData[];
};


type TooltipProps = {
  active?: boolean;
  payload?: Array<{
    payload: ConversionData;
  }>;
};


function ConversionTooltip({
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


export default function ConversionBarChart({
  title,
  subtitle = "Porcentaje de Output = Yes",
  data,
}: ConversionBarChartProps) {

  const maxRate = data.length > 0
    ? Math.max(...data.map((item) => item.yesRate))
    : 0;

  // Más categorías requieren una gráfica un poco más alta.
  const chartHeight = Math.max(
    280,
    data.length * 55
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

      <div className="mb-6">

        <h2 className="font-semibold text-gray-900">
          {title}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {subtitle}
        </p>

      </div>


      {/* Chart */}

      <div
        className="w-full"
        style={{
          height: chartHeight,
        }}
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 10,
              right: 50,
              bottom: 10,
              left: 20,
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
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
              }}
            />

            <YAxis
              type="category"
              dataKey="category"
              width={130}
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
              }}
            />

            <Tooltip
              content={<ConversionTooltip />}
              cursor={{
                fill: "#f9fafb",
              }}
            />

            <Bar
              dataKey="yesRate"
              radius={[0, 6, 6, 0]}
              animationDuration={800}
            >

              {data.map((item) => (
                <Cell
                  key={item.category}
                  fill={
                    item.yesRate === maxRate
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