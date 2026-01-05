Práctica: Análisis y explicación de una GitHub Action
Autor: Parbjyot Singh
1. Descripción general de la GitHub Action
Nombre del workflow: Node.js CI

¿Qué problema resuelve?
Implementa un flujo de Integración Continua (CI) que valida automáticamente cada cambio subido al repositorio. Asegura que el proyecto se puede instalar y que supera las pruebas antes de llegar a producción, evitando integrar errores ("bugs").

¿En qué tipo de proyectos se puede usar?
En proyectos basados en Node.js y JavaScript, como servidores backend (Express, Fastify), aplicaciones frontend (React, Vue) o librerías NPM.

¿Por qué se ha elegido esta action?
Porque la automatización de pruebas es fundamental en la cultura DevOps. Elimina los errores humanos y soluciona el clásico problema de "en mi máquina funciona".

2. Ubicación del workflow
Ruta: .github/workflows/

Archivo YAML: node-js.yml

3. Explicación paso a paso del workflow (archivo YAML)
name
Define el nombre visible del workflow en la pestaña Actions: "Node.js CI".

on (eventos que disparan la action)
push a la rama main

pull_request hacia la rama main

jobs
Contiene los trabajos que se ejecutan. En este caso hay un job llamado build-and-test.

runs-on
Indica el sistema operativo del runner proporcionado por GitHub:

ubuntu-latest

steps
Lista ordenada de pasos que se ejecutan dentro del job de forma secuencial.

Uso de uses o run
uses: invoca acciones predefinidas (como actions/checkout@v4).

run: ejecuta comandos de terminal estándar (como npm install).

4. Explicación detallada de los pasos
Checkout del código (actions/checkout@v4) Descarga el código del repositorio y lo coloca en el entorno de trabajo del runner para poder trabajar con él.

Configurar Node.js (actions/setup-node@v4) Instala Node.js (versión 20) y configura las variables necesarias para usar los comandos node y npm.

Instalar dependencias (npm install) Instala todas las dependencias definidas en package.json. Se usa npm install para dar flexibilidad.

Ejecutar Tests (npm test) Ejecuta las pruebas definidas en el proyecto. Si tiene éxito, finaliza correctamente; si falla, marca el workflow como error.

5. Ejecución de la action
¿Cuándo se ejecuta?
Cuando se hace push a la rama main.

Cuando se crea un pull request hacia main.

Evidencias
Ejecución exitosa: Se verifica en los logs que el script de prueba (test.js) realiza la operación correctamente.

Bash

> proyecto@1.0.0 test
> node test.js

ÉXITO: 2 + 2 es 4
<img width="2874" height="1420" alt="image" src="https://github.com/user-attachments/assets/ea3bfcb0-211e-479b-856d-1e8119823895" />


6. Conclusiones
Estandarización del entorno: El uso de ubuntu-latest garantiza pruebas consistentes.

Mejora de la calidad: Ningún cambio defectuoso puede llegar a producción.

Automatización profesional: Se implementa una solución real propia de entornos DevOps.
