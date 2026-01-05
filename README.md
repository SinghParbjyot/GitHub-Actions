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
---
## Desglose de componentes:
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
---
🔹 PUNTO 4 – Explicación Detallada de los Pasos (CORREGIDO)
## 4. Explicación Detallada de los Pasos

El flujo de trabajo (`workflow`) se compone de una secuencia lineal de tareas que se ejecutan en los servidores de GitHub Actions. A continuación, se explica cada paso definido en la sección `steps`:

A. Checkout del código
### A. Checkout del código
```yaml
- name: Checkout del código
  uses: actions/checkout@v4


Acción utilizada: actions/checkout@v4 (oficial de GitHub).

Funcionamiento:
Cuando el runner se inicia, no contiene ningún archivo del repositorio. Este paso descarga el código de la rama activa y lo coloca en el directorio de trabajo ($GITHUB_WORKSPACE), permitiendo que los siguientes pasos accedan a package.json y al resto del proyecto.


---

### B. Configurar Node.js
```md
### B. Configurar Node.js
```yaml
- name: Configurar Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'


Acción utilizada: actions/setup-node@v4.

Funcionamiento:
Instala Node.js versión 20 y configura las variables de entorno necesarias para usar node y npm en el sistema.


---

### C. Instalar dependencias
```md
### C. Instalar dependencias
```yaml
- name: Instalar dependencias
  run: npm install


Funcionamiento:
Descarga todas las dependencias definidas en package.json dentro del directorio node_modules.

Nota técnica:
Se usa npm install en lugar de npm ci para permitir mayor flexibilidad durante la práctica.


---

### D. Ejecutar Tests
```md
### D. Ejecutar Tests
```yaml
- name: Ejecutar Tests
  run: npm test


Funcionamiento:

 Éxito: devuelve código 0 y el workflow finaliza correctamente.

 Fallo: devuelve código distinto de 0, el workflow se detiene y se marca como error.


---

## 🔹 **PUNTO 5 – Ejecución de la Action y Evidencias (CON IMAGEN)**

```md
## 5. Ejecución de la Action y Evidencias

¿Cuándo se ejecuta?
La GitHub Action se ejecuta automáticamente en los siguientes casos:

- **Push:** al subir código a la rama `main`.
- **Pull Request:** al solicitar la fusión hacia `main`.

Evidencia de ejecución correcta
A continuación se muestra una ejecución exitosa del workflow `build-and-test`, donde todos los pasos se completan correctamente:
<img width="2880" height="1344" alt="image" src="https://github.com/user-attachments/assets/7ac3b284-0be4-4e36-a774-31716e15b8ad" />
Ejemplo de log exitoso
```bash
> proyecto@1.0.0 test
> node test.js

ÉXITO: 2 + 2 es 4


---

### Ejecución fallida (prueba de seguridad)

```md
Para comprobar el correcto funcionamiento del sistema, se introdujo un error intencionado en el código.  
GitHub Actions detectó el fallo, detuvo la ejecución y marcó el workflow como fallido.

🔹 PUNTO 6 – Conclusiones (MEJORADO Y LIMPIO)
## 6. Conclusiones

Tras la implementación del flujo de Integración Continua (CI), se pueden extraer las siguientes conclusiones:


Estandarización del entorno:
El uso de ubuntu-latest garantiza que las pruebas se ejecutan siempre en un entorno limpio y controlado.

Mejora de la calidad del código:
La automatización evita que errores lleguen a la rama principal, actuando como un filtro de calidad obligatorio.

Eficiencia y profesionalidad:
Se ha automatizado el proceso de testing mediante un archivo YAML sencillo, siguiendo prácticas reales de DevOps utilizadas en entornos profesionales.

