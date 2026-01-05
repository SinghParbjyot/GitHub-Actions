# Práctica: Análisis y explicación de una GitHub Action (Node.js CI)

**Asignatura:** Despliegue de Aplicaciones Web 
**Alumno:** Parbjyot Singh 
**Opción elegida:** Opción A (GitHub Action creada por el alumno)

---

## 1. Descripción General de la GitHub Action

### ¿Qué problema resuelve?
En el desarrollo de software colaborativo, es común que al integrar código nuevo se introduzcan errores ("bugs") que rompen funcionalidades existentes. Esta Action implementa un flujo de **Integración Continua (CI)**. Su función es validar automáticamente cada cambio subido al repositorio, asegurando que el proyecto se puede instalar y que supera las pruebas unitarias antes de ser aceptado en la rama principal.

### ¿En qué tipo de proyectos se puede usar?
Este workflow está diseñado para el ecosistema de **JavaScript** y **Node.js**. Es aplicable en:
* Servidores Backend (Express, Fastify, NestJS).
* Aplicaciones Frontend (React, Vue, Angular).
* Librerías o paquetes NPM.

### ¿Por qué se ha elegido esta action?
Se ha elegido porque la automatización de pruebas es el pilar fundamental de la cultura **DevOps**. Elimina la necesidad de ejecutar pruebas manualmente en la máquina del desarrollador, evita el problema de "en mi local funciona" y garantiza la estabilidad del código en producción.

---

## 2. Ubicación del Workflow

Para que GitHub reconozca y ejecute la automatización, el archivo de configuración se encuentra en la ruta estándar requerida por la plataforma:

* **Ruta del directorio:** `.github/workflows/`
* **Nombre del archivo YAML:** `node-js.yml`

---

## 3. Explicación paso a paso del Workflow

A continuación se muestra el código fuente del archivo `node-ci.yml` y el análisis de su estructura.

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
Desglose de componentes:
name: Define el identificador legible del workflow ("Node.js CI") que aparecerá en la interfaz de GitHub Actions.

on (Eventos): Especifica los disparadores que inician la ejecución:

push: Se activa al subir código directamente a la rama main.

pull_request: Se activa al abrir una solicitud de cambios hacia main.

jobs: Agrupa las tareas. En este caso, tenemos un único trabajo llamado build-and-test.

runs-on: Define el entorno de ejecución (Runner). Se utiliza ubuntu-latest, que proporciona una máquina virtual con la última versión estable de Linux Ubuntu alojada en GitHub.

steps: Contiene la secuencia lineal de acciones a ejecutar.

Uso de uses vs run:

uses: Invoca acciones prefabricadas de la comunidad (como hacer checkout del código).

run: Ejecuta comandos de terminal estándar (shell bash).

## 4. Explicación Detallada de los Pasos

El flujo de trabajo (`workflow`) se compone de una secuencia lineal de tareas que se ejecutan en el servidor de GitHub. A continuación, se analiza técnicamente qué ocurre en cada fase definida dentro de la sección `steps`:

### A. Checkout del código
```yaml
- name: Checkout del código
  uses: actions/checkout@v4
Acción utilizada: actions/checkout@v4 (Oficial de GitHub).

Funcionamiento: Cuando la máquina virtual (Runner) inicia, está completamente vacía. Este paso es fundamental porque se autentica en el repositorio, descarga la rama actual y coloca los archivos en el directorio de trabajo ($GITHUB_WORKSPACE). Sin este paso, los siguientes comandos no encontrarían el archivo package.json.

## B. Configurar Node.js
YAML

- name: Configurar Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
Acción utilizada: actions/setup-node@v4 (Oficial de GitHub).

Funcionamiento: Prepara el entorno de ejecución (Runtime). Descarga e instala el binario de Node.js en su versión 20.x y configura las variables de entorno (PATH) necesarias para poder utilizar los comandos node y npm en la terminal del sistema.

## C. Instalar dependencias
YAML

- name: Instalar dependencias
  run: npm install
Comando ejecutado: npm install

Funcionamiento: Este comando lee el archivo de configuración package.json del proyecto y descarga todas las librerías necesarias en la carpeta node_modules.

Nota técnica: Se ha optado por npm install en lugar de npm ci para ofrecer mayor flexibilidad durante la práctica, permitiendo la instalación de dependencias incluso si no existe un archivo de bloqueo (package-lock.json) sincronizado.

## D. Ejecutar Tests
YAML

- name: Ejecutar Tests
  run: npm test
Comando ejecutado: npm test

Funcionamiento: Ejecuta el script de pruebas definido en el proyecto. Es el punto crítico de validación:

Éxito: Si el test pasa correctamente, el proceso devuelve un "código de salida 0" y GitHub marca el paso en verde .

Fallo: Si el test falla, el proceso devuelve un código de error (ej. 1). GitHub detecta esto, detiene inmediatamente el workflow y lo marca en rojo , notificando el error.

## 5. Ejecución de la Action y Evidencias
## ¿Cuándo se ejecuta?
La automatización está configurada para dispararse sin intervención humana (eventos on) en dos situaciones:

Push: Cada vez que se sube código nuevo a la rama main.

Pull Request: Cada vez que se intenta fusionar una rama externa hacia main.

Evidencias de funcionamiento
A continuación se presentan las evidencias de la ejecución en la consola de GitHub Actions:

## 1. Ejecución Exitosa (Success)
En esta captura se verifica que el código es correcto. El script de prueba test.js realizó la operación matemática esperada (2+2=4) y todos los pasos se completaron satisfactoriamente.

Detalle del log observado:

Plaintext

> proyecto@1.0.0 test
> node test.js

ÉXITO: 2 + 2 es 4
## 2. Ejecución Fallida (Failure)
Para demostrar la capacidad de protección del sistema, se introdujo un error intencional en el código. Como muestra la imagen, la GitHub Action detectó el fallo lógico, detuvo el despliegue y alertó del error.

## 6. Conclusiones
Tras el desarrollo de esta práctica y la implementación del flujo de Integración Continua (CI), se concluye lo siguiente:

Estandarización del Entorno: El uso de runs-on: ubuntu-latest garantiza que el código siempre se prueba en un entorno limpio y neutral, eliminando los falsos positivos derivados de configuraciones locales ("en mi máquina funciona").

Aumento de la Calidad: La automatización actúa como un filtro de calidad obligatorio. Impide que errores humanos o descuidos lleguen a la rama principal de producción, ya que el sistema rechaza automáticamente cualquier código que no pase los tests.

Eficiencia: Se ha logrado automatizar una tarea repetitiva (el testing) con un archivo de configuración YAML sencillo y mantenible, lo cual es una de las competencias clave en el perfil de un desarrollador moderno o ingeniero DevOps.
