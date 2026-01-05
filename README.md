# GitHub-Actions
Markdown

# Práctica: GitHub Action para Integración Continua en Node.js

## Datos del Alumno
* **Nombre:** Parbjyot Singh
* **Asignatura:** Despliegue de Aplicaciones Web 
* **Opción:** Opción A (Creación de una GitHub Action desde cero)

---

## 1. Descripción General

### ¿Qué problema resuelve?
En el desarrollo de software, integrar cambios de código manualmente puede introducir errores que rompen la funcionalidad existente. Esta práctica implementa una **GitHub Action de Integración Continua (CI)**. Su objetivo es automatizar la validación del código cada vez que se suben cambios, asegurando que el proyecto se instala y pasa las pruebas correctamente antes de ser aceptado.

### ¿En qué tipo de proyectos se puede usar?
Este flujo de trabajo está diseñado para proyectos basados en **JavaScript/Node.js**, como:
* APIs REST (Express, NestJS).
* Aplicaciones Frontend (React, Vue).
* Scripts y herramientas de automatización.

### ¿Por qué se ha elegido esta action?
Se ha elegido porque automatizar el testing es el pilar fundamental de la cultura **DevOps**. Elimina el error humano, ahorra tiempo de comprobación manual y garantiza que la rama principal (`main`) siempre sea estable.

---

## 2. Ubicación del Workflow

El archivo de configuración se encuentra en la ruta estándar requerida por GitHub:

* **Ruta:** `.github/workflows/`
* **Nombre del archivo:** `node-js.yml`

---

## 3. Código del Workflow

A continuación se presenta el código YAML utilizado. Se ha configurado para ser flexible y funcionar sin necesidad de un archivo de bloqueo estricto.

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
4. Explicación Detallada de los Pasos
El workflow consta de un único trabajo (job) llamado build-and-test que se ejecuta en una máquina virtual Ubuntu (ubuntu-latest). Los pasos son los siguientes:

1. Checkout del código
YAML

- uses: actions/checkout@v4
Descripción: Utiliza la acción oficial de GitHub.

Función: Conecta la máquina virtual con el repositorio y descarga (clona) el código fuente para que pueda ser procesado. Sin este paso, la máquina virtual estaría vacía.

2. Configurar Node.js
YAML

- uses: actions/setup-node@v4
  with:
    node-version: '20'
Descripción: Prepara el entorno de ejecución.

Función: Instala la versión 20 de Node.js en el servidor. Se ha eliminado la caché en esta configuración para asegurar compatibilidad y evitar errores si falta el archivo package-lock.json.

3. Instalar dependencias
YAML

- run: npm install
Descripción: Ejecución de comando de terminal.

Función: Lee el archivo package.json y descarga todas las librerías necesarias para que el proyecto funcione. Se utiliza npm install (en lugar de npm ci) para permitir una instalación flexible de dependencias.

4. Ejecutar Tests
YAML

- run: npm test
Descripción: Ejecución del script de pruebas.

Función: Ejecuta el comando definido en scripts.test del package.json.

Si el test pasa (Exit code 0): La Action se marca en verde .

Si el test falla (Exit code 1): La Action se marca en rojo  y notifica el error.

5. Ejecución y Evidencias
La acción se dispara automáticamente en dos eventos (on):

Al hacer un Push a la rama main.

Al abrir un Pull Request hacia la rama main.

Ejemplo de Log de Éxito
Al entrar en la pestaña "Actions" de GitHub, podemos ver la salida de la consola del paso "Ejecutar Tests":

Plaintext

> proyecto@1.0.0 test
> node test.js

 ÉXITO: 2 + 2 es 4
Capturas de Pantalla
(Aquí puedes insertar las imágenes de tus capturas de pantalla de GitHub)

Imagen 1: Listado de workflows (verdes y rojos).

Imagen 2: Detalle del log donde se ve que el test pasó correctamente.

6. Archivos Auxiliares del Proyecto
Para que la demostración funcione, el repositorio incluye los siguientes archivos mínimos:

package.json: Define el script "test": "node test.js".

test.js: Un script simple de JavaScript que valida una operación matemática para simular una prueba unitaria.

7. Conclusiones
La realización de esta práctica ha permitido comprender cómo:

Estandarizar entornos: Las pruebas siempre corren en un entorno limpio (Ubuntu) y no dependen de la configuración local del desarrollador.

Protección de código: GitHub Actions actúa como un "guardián" que impide que código defectuoso se mezcle con el código principal.

Automatización: Se elimina la tarea repetitiva de ejecutar pruebas manualmente antes de cada subida.
