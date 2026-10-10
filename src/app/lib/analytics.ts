export type FoodOrder = Record<string, string>;

// cleanData: Limpieza de datos
export function cleanData(rows: FoodOrder[]) {
  // 1. Eliminar espacios innecesarios
  const normalized = rows.map((row) => {
    const cleanedRow: FoodOrder = {};

    Object.entries(row).forEach(([key, value]) => {
      cleanedRow[key.trim()] =
        typeof value === "string"
          ? value.trim()
          : value;
    });

    // Columna redundante detectada durante el análisis
    delete cleanedRow["Unnamed: 13"];

    return cleanedRow;
  });

  // 2. Eliminar registros duplicados
  const uniqueRows: FoodOrder[] = [];
  const seen = new Set<string>();

  normalized.forEach((row) => {
    const rowKey = JSON.stringify(row);

    if (!seen.has(rowKey)) {
      seen.add(rowKey);
      uniqueRows.push(row);
    }
  });

  return uniqueRows;
}

// KPIs: Cálculo de métricas clave
export function calculateKpis(data: FoodOrder[]) {
  const total = data.length;

  const outputYes = data.filter(
    (row) => row.Output === "Yes"
  ).length;

  const feedbackPositive = data.filter(
    (row) => row.Feedback === "Positive"
  ).length;

  const ages = data
    .map((row) => Number(row.Age))
    .filter((age) => !Number.isNaN(age));

  const averageAge =
    ages.length > 0
      ? ages.reduce((sum, age) => sum + age, 0) /
        ages.length
      : 0;

  const yesRate =
    total > 0
      ? (outputYes / total) * 100
      : 0;

  const positiveFeedbackRate =
    total > 0
      ? (feedbackPositive / total) * 100
      : 0;

  return {
    total,
    outputYes,
    feedbackPositive,
    averageAge,
    yesRate,
    positiveFeedbackRate,
  };
}

// Tipo para graficar conversiones por categoría
export type ConversionData = {
  category: string;
  total: number;
  yes: number;
  no: number;
  yesRate: number;
};

// agrupacion generica para obtener conversiones por categoria
export function getConversionByCategory(
  data: FoodOrder[],
  column: string
): ConversionData[] {
  const groups: Record<
    string,
    {
      total: number;
      yes: number;
      no: number;
    }
  > = {};

  data.forEach((row) => {
    const category = row[column];

    if (!category) {
      return;
    }

    if (!groups[category]) {
      groups[category] = {
        total: 0,
        yes: 0,
        no: 0,
      };
    }

    groups[category].total++;

    if (row.Output === "Yes") {
      groups[category].yes++;
    }

    if (row.Output === "No") {
      groups[category].no++;
    }
  });

  return Object.entries(groups).map(
    ([category, values]) => ({
      category,
      total: values.total,
      yes: values.yes,
      no: values.no,

      yesRate:
        values.total > 0
          ? (values.yes / values.total) * 100
          : 0,
    })
  );
}


// Feedback Conversion
export function getFeedbackConversion(
  data: FoodOrder[]
) {
  return getConversionByCategory(
    data,
    "Feedback"
  );
}

// ocupation, marital status, income conversion 
export function getOccupationConversion(
  data: FoodOrder[]
) {
  return getConversionByCategory(
    data,
    "Occupation"
  ).sort(
    (a, b) => b.yesRate - a.yesRate
  );
}

// marital status, income conversion
export function getMaritalStatusConversion(
  data: FoodOrder[]
) {
  return getConversionByCategory(
    data,
    "Marital Status"
  ).sort(
    (a, b) => b.yesRate - a.yesRate
  );
}

// monthly income conversion
export function getIncomeConversion(
  data: FoodOrder[]
) {
  const incomeOrder = [
    "No Income",
    "Below Rs.10000",
    "10001 to 25000",
    "25001 to 50000",
    "More than 50000",
  ];

  return getConversionByCategory(
    data,
    "Monthly Income"
  ).sort(
    (a, b) =>
      incomeOrder.indexOf(a.category) -
      incomeOrder.indexOf(b.category)
  );
}


export type DashboardFilters = {
  gender: string;
  occupation: string;
  maritalStatus: string;
  monthlyIncome: string;
};

export const initialFilters: DashboardFilters = {
  gender: "All",
  occupation: "All",
  maritalStatus: "All",
  monthlyIncome: "All",
};


export function filterData(
  data: FoodOrder[],
  filters: DashboardFilters
) {
  return data.filter((row) => {
    const genderMatch =
      filters.gender === "All" ||
      row.Gender === filters.gender;

    const occupationMatch =
      filters.occupation === "All" ||
      row.Occupation === filters.occupation;

    const maritalMatch =
      filters.maritalStatus === "All" ||
      row["Marital Status"] === filters.maritalStatus;

    const incomeMatch =
      filters.monthlyIncome === "All" ||
      row["Monthly Income"] === filters.monthlyIncome;

    return (
      genderMatch &&
      occupationMatch &&
      maritalMatch &&
      incomeMatch
    );
  });
}


export function getUniqueValues(
  data: FoodOrder[],
  column: string
) {
  return [
    ...new Set(
      data
        .map((row) => row[column])
        .filter(Boolean)
    ),
  ].sort();
}


//logic insights
export type DashboardInsight = {
  title: string;
  description: string;
};


function getHighestConversion(
  data: ConversionData[]
) {
  if (data.length === 0) {
    return null;
  }

  return [...data].sort(
    (a, b) => b.yesRate - a.yesRate
  )[0];
}


function getLowestConversion(
  data: ConversionData[]
) {
  if (data.length === 0) {
    return null;
  }

  return [...data].sort(
    (a, b) => a.yesRate - b.yesRate
  )[0];
}


export function generateDashboardInsights(
  filteredData: FoodOrder[],
  feedbackData: ConversionData[],
  occupationData: ConversionData[],
  maritalData: ConversionData[],
  incomeData: ConversionData[]
): DashboardInsight[] {

  const insights: DashboardInsight[] = [];

  /*
   * Insight 1
   * Feedback
   */

  const positiveFeedback =
    feedbackData.find(
      (item) => item.category === "Positive"
    );

  const negativeFeedback =
    feedbackData.find(
      (item) => item.category === "Negative"
    );

  if (
    positiveFeedback &&
    negativeFeedback
  ) {

    const difference =
      positiveFeedback.yesRate -
      negativeFeedback.yesRate;

    insights.push({
      title: "Feedback y conversión",

      description:
        `Los registros con feedback positivo presentan ` +
        `${positiveFeedback.yesRate.toFixed(1)}% de Intención de recompra, ` +
        `frente a ${negativeFeedback.yesRate.toFixed(1)}% con feedback negativo. ` +
        `La diferencia observada es de ${Math.abs(difference).toFixed(1)} puntos porcentuales.`,
    });
  }


  /*
   * Insight 2
   * Occupation
   */

  const occupationHighest =
    getHighestConversion(occupationData);

  const occupationLowest =
    getLowestConversion(occupationData);

  if (
    occupationHighest &&
    occupationLowest &&
    occupationHighest.category !==
      occupationLowest.category
  ) {

    insights.push({
      title: "Segmentación por ocupación",

      description:
        `${occupationHighest.category} presenta la mayor tasa de recompra ` +
        `(${occupationHighest.yesRate.toFixed(1)}%) entre las ocupaciones visibles, ` +
        `mientras que ${occupationLowest.category} presenta ` +
        `${occupationLowest.yesRate.toFixed(1)}%.`,
    });
  }


  /*
   * Insight 3
   * Marital Status
   */

  const maritalHighest =
    getHighestConversion(maritalData);

  const maritalLowest =
    getLowestConversion(maritalData);

  if (
    maritalHighest &&
    maritalLowest &&
    maritalHighest.category !==
      maritalLowest.category
  ) {

    insights.push({
      title: "Estado civil",

      description:
        `${maritalHighest.category} tiene la mayor tasa de recompra ` +
        `(${maritalHighest.yesRate.toFixed(1)}%) dentro del segmento actual. ` +
        `${maritalLowest.category} registra ${maritalLowest.yesRate.toFixed(1)}%.`,
    });
  }


  /*
   * Insight 4
   * Monthly Income
   */

  const incomeHighest =
    getHighestConversion(incomeData);

  if (incomeHighest) {

    insights.push({
      title: "Ingreso mensual",

      description:
        `El grupo ${incomeHighest.category} presenta la mayor tasa de recompra ` +
        `entre los niveles de ingreso visibles, con ` +
        `${incomeHighest.yesRate.toFixed(1)}%.`,
    });
  }


  /*
   * Advertencia por tamaño de muestra
   */

  if (filteredData.length < 30) {

    insights.push({
      title: "Muestra reducida",

      description:
        `Los filtros actuales dejan solamente ${filteredData.length} registros. ` +
        `Los porcentajes pueden ser sensibles a pocos casos, por lo que conviene interpretarlos con cautela.`,
    });
  }


  return insights;
}