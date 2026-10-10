# 🍔 Online Food Delivery — Data Analysis

Análisis exploratorio e interactivo del comportamiento de clientes en pedidos de comida online, utilizando Python, Next.js y visualizaciones dinámicas.

## 🔗 Dashboard en vivo

👉 [Ver dashboard interactivo](https://gerardo-soto.github.io/online-food-delivery-data-analyst/)

## 📌 Descripción del proyecto

Este proyecto analiza un conjunto de datos de clientes de una plataforma de pedidos de comida online con el objetivo de identificar patrones de comportamiento, relaciones entre variables y factores asociados con la intención de volver a realizar un pedido.

El proyecto incluye un flujo completo de análisis de datos:

**Limpieza de datos → Análisis exploratorio → Análisis estadístico → Identificación de insights → Visualización y dashboard**

El objetivo es convertir los datos en información fácil de interpretar tanto para perfiles técnicos como para personas enfocadas en negocio.

---

## 🎯 Objetivos

* Revisar y mejorar la calidad del dataset.
* Detectar registros duplicados y variables redundantes.
* Analizar las características de los clientes.
* Identificar patrones relacionados con `Output`, variable que indica la intención de volver a realizar un pedido.
* Evaluar asociaciones entre variables mediante métodos estadísticos.
* Crear visualizaciones y dashboards para comunicar los principales resultados.

---

## 📂 Archivos utilizados

### `online_food_delivery_limpio.csv`

Dataset utilizado como base del análisis.

Contiene información como:

* Edad.
* Género.
* Estado civil.
* Ocupación.
* Ingreso mensual.
* Nivel educativo.
* Tamaño de familia.
* Ubicación.
* Feedback.
* Tipo de cliente.
* Output.

A partir de este archivo se realizan las tareas de limpieza, exploración y análisis estadístico.

---

### `analisis_estadistico_online_food_delivery_v2.ipynb`

Notebook principal de análisis desarrollado con Python.

Incluye:

* Exploración inicial del dataset.
* Revisión de valores faltantes.
* Eliminación de registros duplicados.
* Identificación de variables redundantes.
* Estadística descriptiva.
* Análisis de variables categóricas y numéricas.
* Pruebas Chi-cuadrado.
* Fisher Exact Test.
* V de Cramér.
* Mann–Whitney U.
* Correlación de Spearman.
* Correlation Ratio.
* Tamaños de efecto.
* Intervalos de confianza mediante bootstrap.
* Corrección de Holm para comparaciones múltiples.
* Regresión logística exploratoria.
* Visualizaciones e interpretación de resultados.

---

### `online_food_delivery_google_sheets_analysis.xlsx`

Versión del análisis orientada a Excel y Google Sheets.

Está organizada en diferentes hojas para facilitar la revisión del proyecto:

* **README:** descripción del archivo.
* **datos_crudos:** datos originales.
* **datos_limpios:** información utilizada después de la limpieza.
* **resumen_segmentos:** comportamiento de diferentes grupos de clientes.
* **tabla_dinamica:** cruces entre variables relevantes.
* **estadistica:** principales resultados estadísticos.
* **summary:** resumen de KPIs e insights.
* **dashboard:** visualización ejecutiva de los resultados.

---

## 🧹 Preparación de los datos

Durante la revisión del dataset se identificaron problemas que podían afectar el análisis.

El dataset contiene originalmente **388 registros**.

Después de eliminar registros duplicados se utilizaron **285 registros únicos** para el análisis.

También se identificó la columna `Unnamed: 13`, que contenía la misma información que `Output`, por lo que fue excluida para evitar redundancia y posibles problemas de *data leakage*.

---

## 📊 Principales resultados

Aproximadamente **76% de los registros analizados presentan `Output = Yes`**.

Uno de los patrones más importantes encontrados está relacionado con el feedback del cliente.

Los clientes con feedback positivo presentan una proporción considerablemente mayor de `Output = Yes` que aquellos con feedback negativo.

El análisis estadístico mediante **Chi-cuadrado y V de Cramér** confirmó que `Feedback` es una de las variables con mayor asociación con `Output` dentro del dataset.

También se encontraron relaciones entre variables como:

* Edad.
* Ocupación.
* Estado civil.
* Ingreso mensual.
* Feedback.

Sin embargo, estas relaciones se interpretan como **asociaciones estadísticas y no como relaciones causales**.

---

## 📈 Dashboard

El proyecto incluye un dashboard diseñado para resumir los principales resultados del análisis.

Entre las métricas presentadas se encuentran:

* Número de registros analizados.
* Porcentaje de `Output = Yes`.
* Porcentaje de feedback positivo.
* Edad promedio.
* Output según feedback.
* Output según ocupación.
* Output según estado civil.
* Distribución de diferentes segmentos de clientes.

El propósito del dashboard es permitir que los resultados puedan interpretarse rápidamente sin necesidad de revisar todo el análisis estadístico.

---

## 🛠️ Tecnologías utilizadas

* **Python**
* **Pandas**
* **NumPy**
* **Matplotlib**
* **SciPy**
* **Statsmodels**
* **Jupyter Notebook / Google Colab**
* **Google Sheets**
* **Microsoft Excel**

---

## 📚 Fuente de datos

El dataset original fue obtenido de Kaggle:

[Online Food Ordering Dataset — Kaggle](https://www.kaggle.com/datasets/srisyra02/online-food-ordering-dataset/data)

Los datos fueron utilizados con fines educativos y de práctica de análisis de datos.

## 📊 Dashboard interactivo

El dashboard permite explorar los datos mediante filtros por género, ocupación, estado civil e ingreso mensual.

👉 [Abrir dashboard](https://gerardo-soto.github.io/online-food-delivery-data-analyst/)

---

## 💡 Conclusión

El proyecto muestra cómo un dataset relativamente pequeño puede transformarse en información útil mediante limpieza, análisis exploratorio, métodos estadísticos y visualización.

El principal valor del análisis no consiste únicamente en describir a los clientes, sino en identificar qué características presentan una mayor asociación con su comportamiento y comunicar esos resultados de una manera comprensible.

Este proyecto forma parte de un portafolio enfocado en **Data Analytics**, demostrando habilidades en preparación de datos, análisis estadístico, interpretación de resultados y construcción de dashboards.
