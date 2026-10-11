# Online Food Delivery — Project Case Study

## 1. Información general

- **Nombre del proyecto:** Online Food Delivery
- **Especialidad:** Data Analyst
- **Fuente del proyecto:** [Online Food Ordering Dataset - Kaggle](https://www.kaggle.com/datasets/srisyra02/online-food-ordering-dataset/data)

---

## 2. Objetivo

Analizar el comportamiento de clientes de una plataforma de pedidos de comida online para identificar qué características están asociadas con una mayor intención de volver a ordenar.

El análisis busca apoyar decisiones de negocio relacionadas con:

- Segmentación de clientes.
- Retención.
- Adquisición.
- Diseño de promociones.
- Identificación de grupos con alta intención de recompra.
- Detección de segmentos con oportunidades de recuperación.

---

## 3. Plan de trabajo

### 1. Exploración inicial

Revisar la estructura del dataset, tipos de variables, distribución de categorías, valores faltantes, duplicados y posibles inconsistencias.

### 2. Preparación de datos

Eliminar registros duplicados, normalizar valores categóricos, eliminar columnas redundantes y preparar una versión limpia del dataset para análisis.

### 3. Análisis y construcción

Realizar análisis descriptivo y estadístico para estudiar la relación entre variables como:

- Feedback.
- Ocupación.
- Estado civil.
- Ingreso mensual.

Posteriormente, construir un dashboard interactivo con **Next.js** y **Recharts**.

### 4. Evaluación

Validar la calidad del dataset limpio, comparar tasas de `Output = Yes` entre segmentos y utilizar pruebas estadísticas como:

- Chi-cuadrado.
- V de Cramér.
- Regresión logística.

El objetivo es evaluar la asociación entre distintas características de los clientes y su intención de volver a ordenar.

### 5. Conclusiones y próximos pasos

Convertir los principales hallazgos en recomendaciones de negocio e hipótesis de promociones que puedan validarse posteriormente mediante pruebas A/B o experimentos controlados.

---

## 4. Preguntas clave

1. **¿Qué características de los clientes muestran una asociación más fuerte con la intención de volver a ordenar?**

2. **¿Las promociones propuestas son rentables y generan compras incrementales, o solamente ofrecen descuentos a clientes que ya tenían alta probabilidad de volver a comprar?**

---

## 5. Qué se hizo y cómo

Se realizó una exploración inicial del dataset y se identificaron **388 registros originales**, de los cuales **103 eran duplicados exactos**.

Después del proceso de limpieza se obtuvo un dataset final de **285 registros únicos**.

Durante la preparación de los datos se realizaron las siguientes tareas:

- Eliminación de registros duplicados.
- Eliminación de columnas redundantes.
- Normalización de valores categóricos.
- Validación de la consistencia de las variables.
- Revisión de posibles valores atípicos.

Posteriormente, se realizó un análisis descriptivo y estadístico de variables como:

- `Feedback`
- `Occupation`
- `Marital Status`
- `Monthly Income`
- `Gender`
- `Age`
- `Family Size`
- `Customer Type`

Para las variables categóricas se utilizaron pruebas como **Chi-cuadrado** y **V de Cramér**.

El análisis también se complementó con **regresión logística** para estudiar la relación entre distintas características y la variable `Output`.

Finalmente, se construyó un **dashboard interactivo con Next.js**, permitiendo:

- Filtrar los datos.
- Recalcular dinámicamente KPIs.
- Explorar gráficas interactivas.
- Generar insights según los segmentos seleccionados.

También se incorporó una sección de **recomendaciones de negocio** basada en los patrones observados durante el análisis.

---

## 6. Resultados

La tasa general de intención de volver a ordenar (`Output = Yes`) fue aproximadamente de **76.1%**.

Además, el **81.1%** de los registros presentaron feedback positivo.

### Feedback e intención de recompra

El hallazgo más fuerte fue la relación entre `Feedback` y `Output`:

| Feedback | Output = Yes |
|---|---:|
| Positive | 87.4% |
| Negative | 27.8% |

La diferencia entre ambos grupos fue de aproximadamente **59.7 puntos porcentuales**.

El análisis estadístico mostró que `Feedback` era una de las variables con mayor asociación con `Output`, con un **V de Cramér aproximado de 0.54**.

### Segmentos con alta intención de volver a ordenar

También se identificaron algunos segmentos con altas tasas de `Output = Yes`:

| Segmento | Tasa de Output = Yes |
|---|---:|
| Student | 87.5% |
| No Income | 85.5% |
| Single | 84.7% |

Estos resultados se utilizaron para plantear hipótesis de negocio relacionadas con:

- Programas de referidos.
- Estrategias de fidelización.
- Promociones para aumentar la frecuencia de compra.
- Recuperación de clientes con experiencias negativas.

---

## 7. Conclusiones

### ¿Qué aprendiste?

Aprendí a trabajar con datos provenientes de fuentes externas como **Kaggle** y a revisar análisis realizados previamente por otras personas para identificar enfoques, limitaciones y oportunidades de mejora.

Esto me permitió aplicar una especie de **code review al análisis existente** y aportar una perspectiva propia basada en mis conocimientos.

Además, reforcé y amplié mis conocimientos estadísticos al incorporar técnicas que no había utilizado anteriormente, como:

- **Mann–Whitney U**
- **Corrección de Holm para comparaciones múltiples**

Estas técnicas me permitieron realizar un análisis más riguroso y reducir el riesgo de interpretar falsos positivos.

### ¿Qué mejorarías con más tiempo o recursos?

Con más tiempo, ampliaría el proyecto incorporando **modelos predictivos** para estimar la probabilidad de recompra de un cliente y comparar su desempeño mediante métricas adecuadas.

También mejoraría la experiencia visual del proyecto separando el dashboard en dos niveles:

#### Dashboard ejecutivo

Enfocado en:

- KPIs principales.
- Hallazgos relevantes.
- Segmentos de clientes.
- Recomendaciones de negocio.

#### Dashboard técnico

Orientado a:

- Exploración profunda de segmentos.
- Distribuciones.
- Relaciones entre variables.
- Resultados estadísticos.
- Análisis de asociaciones.

### ¿Qué parte mencionarías en una entrevista?

Destacaría el proceso completo de construcción y automatización del análisis:

**Exploración → Limpieza → Análisis estadístico → Insights → Dashboard → Publicación**

El proyecto incluyó:

- Exploración y limpieza de datos.
- Detección de duplicados.
- Identificación de valores atípicos.
- Análisis estadístico.
- Generación de insights.
- Creación de un dashboard interactivo.
- Publicación del proyecto mediante GitHub Pages.

También mencionaría que el resultado final no quedó limitado a un notebook.

El análisis fue transformado en una **solución web accesible públicamente**, permitiendo que cualquier persona pueda:

- Explorar los datos.
- Aplicar filtros.
- Consultar KPIs.
- Analizar diferentes segmentos.
- Revisar los principales insights.
- Consultar recomendaciones de negocio.