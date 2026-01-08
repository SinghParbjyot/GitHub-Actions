
const suma = 2 + 3;

if (suma === 4) {
  console.log("Test Pasado: La suma de 2 + 2 es 4.");
  process.exit(0); // Código 0 significa exito
} else {
  console.error(" Test Fallido: La suma no dio 4.");
  process.exit(1); // Código 1 significa error
}
