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

4. Explicación Detallada de los Pasos
Cada paso dentro de la sección steps tiene una función específica:

Paso 1: Checkout del código
YAML

- name: Checkout del código
  uses: actions/checkout@v4
¿Qué hace? La máquina virtual de GitHub inicia vacía. Este paso utiliza la acción oficial actions/checkout para conectarse al repositorio, descargar (clonar) el código fuente y colocarlo en el directorio de trabajo del runner.

Paso 2: Configurar Node.js
YAML

- name: Configurar Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
¿Qué hace? Utiliza la acción oficial actions/setup-node para preparar el entorno. Descarga e instala la versión 20 de Node.js, asegurando que las herramientas como npm estén disponibles.

Paso 3: Instalar dependencias
YAML

- name: Instalar dependencias
  run: npm install
¿Qué hace? Ejecuta el comando de instalación de paquetes. Lee el archivo package.json y descarga las librerías necesarias para que el proyecto funcione. Se utiliza npm install para permitir flexibilidad si no existe un archivo de bloqueo estricto.

Paso 4: Ejecutar Tests
YAML

- name: Ejecutar Tests
  run: npm test
¿Qué hace? Ejecuta el script de pruebas definido en el proyecto (node test.js).

Si el script finaliza con código 0, GitHub interpreta que los tests pasaron .

Si finaliza con código 1 (error), GitHub marca el workflow como fallido  y alerta al usuario.

5. Ejecución de la Action y Evidencias
¿Cuándo y cómo se ejecuta?
La ejecución es automática. No requiere intervención manual. Se dispara inmediatamente después de hacer un git push a la rama principal.

Evidencias de Ejecución
1. Visión general de ejecuciones: En esta captura se puede observar el historial de ejecuciones. Se aprecia cómo la action detecta tanto el éxito como el fallo en función del código subido.

2. Detalle de una ejecución exitosa: A continuación, se muestra el log del paso "Ejecutar Tests". Se observa que el script test.js realizó la validación matemática correctamente (2 + 2 = 4) y el proceso terminó con éxito.

3. Simulación de error: Para probar la robustez, se forzó un error en el código. La Action detectó el fallo y detuvo el proceso, impidiendo que el código defectuoso fuera validado.

6. Conclusiones
La realización de esta práctica ha permitido extraer las siguientes conclusiones:

Fiabilidad: GitHub Actions permite estandarizar el entorno de pruebas. Al usar ubuntu-latest, eliminamos la incertidumbre de las configuraciones locales de cada programador.

Protección: El workflow actúa como un "filtro de calidad". Si los tests no pasan, el código no se considera válido, lo que protege la integridad del proyecto.

Simplicidad: Con un archivo YAML de menos de 30 líneas, hemos implementado un sistema completo de Integración Continua (CI) que es el estándar en la industria del software actual.
