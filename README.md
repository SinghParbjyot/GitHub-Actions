# Práctica: Análisis y explicación de una GitHub Action (Node.js CI)

**Asignatura:** Despliegue de Aplicaciones Web  
**Alumno:** Parbjyot Singh  
**Opción elegida:** Opción A (GitHub Action creada por el alumno)

---

## 1. Descripción General de la GitHub Action

### ¿Qué problema resuelve?
En el desarrollo de software colaborativo, es común que al integrar código nuevo se introduzcan errores ("bugs") que rompen funcionalidades existentes.  
Esta GitHub Action implementa un flujo de **Integración Continua (CI)** que valida automáticamente cada cambio subido al repositorio, asegurando que el proyecto se puede instalar y que supera las pruebas antes de llegar a producción.

### ¿En qué tipo de proyectos se puede usar?
Este workflow está diseñado para proyectos basados en **Node.js** y **JavaScript**, como:

- Servidores backend (Express, Fastify, NestJS)
- Aplicaciones frontend (React, Vue, Angular)
- Librerías o paquetes NPM

### ¿Por qué se ha elegido esta action?
Porque la automatización de pruebas es un pilar fundamental en la cultura **DevOps**, eliminando errores humanos y el problema de *“en mi máquina funciona”*.

---

## 2. Ubicación del Workflow

Para que GitHub ejecute la automatización, el archivo se encuentra en:

- **Directorio:** `.github/workflows/`
- **Archivo:** `node-js.yml`

---

## 3. Explicación paso a paso del Workflow

A continuación se muestra el archivo completo del workflow:

```yaml
name: Node.js CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout del código
        uses: actions/checkout@v4

      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Instalar dependencias
        run: npm install

      - name: Ejecutar Tests
        run: npm test
Desglose de componentes
name: Nombre visible del workflow en GitHub Actions.

on: Eventos que disparan la ejecución (push y pull_request).

jobs: Conjunto de tareas a ejecutar.

runs-on: Sistema operativo del runner.

steps: Pasos ejecutados secuencialmente.

uses: Acciones predefinidas.

run: Comandos de terminal.

4. Explicación Detallada de los Pasos
A. Checkout del código
yaml
Copiar código
- name: Checkout del código
  uses: actions/checkout@v4
Descarga el código del repositorio y lo coloca en el entorno de trabajo del runner.

B. Configurar Node.js
yaml
Copiar código
- name: Configurar Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
Instala Node.js versión 20 y configura las variables necesarias para usar node y npm.

C. Instalar dependencias
yaml
Copiar código
- name: Instalar dependencias
  run: npm install
Instala todas las dependencias definidas en package.json.

Se utiliza npm install en lugar de npm ci para mayor flexibilidad en la práctica.

D. Ejecutar Tests
yaml
Copiar código
- name: Ejecutar Tests
  run: npm test
Ejecuta las pruebas definidas en el proyecto.

 Éxito: el workflow finaliza correctamente.

 Fallo: el workflow se detiene y se marca como error.

5. Ejecución de la Action y Evidencias
¿Cuándo se ejecuta?
La GitHub Action se ejecuta automáticamente cuando:

Se hace push a la rama main

Se crea un pull request hacia main

Ejecución exitosa
La siguiente imagen muestra una ejecución correcta del workflow build-and-test:



Log de ejecución correcta
bash
Copiar código
> proyecto@1.0.0 test
> node test.js

ÉXITO: 2 + 2 es 4
Ejecución fallida
Para comprobar el sistema, se introdujo un error intencionado.
GitHub Actions detectó el fallo, detuvo la ejecución y marcó el workflow como fallido.

6. Conclusiones
Tras implementar este flujo de Integración Continua, se concluye que:

Estandarización del entorno:
El uso de ubuntu-latest garantiza pruebas consistentes.

Mejora de la calidad del código:
Ningún cambio defectuoso puede llegar a producción.

Automatización profesional:
Se ha implementado una solución real usada en entornos DevOps.
