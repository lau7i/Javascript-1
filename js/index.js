alert("Bienvenido al mundo boca");

function bienvenida() {
  console.log("Hola mundo Boca");
}
bienvenida();

let nombreIngresado = prompt("Ingresar nombre");
let apellidoIngresado = prompt("Ingresar apellido");

if (nombreIngresado != "" && apellidoIngresado != "") {
  alert("Nombre: " + nombreIngresado + "\nApellido: " + apellidoIngresado);
} else {
  alert("Error: Ingresar nombre y apellido");
}

let entrada = prompt(
  "Ingresa tu Equipo favorito de los 5 grandes o simplemente escribí otro"
);
switch (entrada) {
  case "Boca":
    alert("Este sitio es para vos");
    break;
  case "River":
    alert("Este sitio no es para vos");
    break;
  case "Independiente":
    alert("Este sitio no es para vos");
    break;
  case "Racing":
    alert("Este sitio no es para vos");
    break;
  case "San lorenzo":
    alert("Este sitio no es para vos");
    break;
  case "otro":
    alert("Este sitio no es para vos");
    break;
  default:
    alert("Vuelve a ingresar tu equipo");
}

let presupuesto = parseFloat(prompt("ingresa el presupusto de boca"));
if (presupuesto >= 3500000) {
  alert("Boca puede comprar a paredes");
} else {
  alert("Boca compra otro 5");
}

let puntosboca = parseInt(prompt("Ingrese puntos de boca"));
let puntostalleres = parseInt(prompt("ingrese puntos de talleres"));

if (puntostalleres == puntosboca) {
  alert("Habrá final de desempate entre Boca y Talleres");
} else if (puntostalleres > puntosboca) {
  alert("Talleres será el nuevo campeón del futbol argentino");
} else if (puntostalleres < puntosboca) {
  alert("Boca Juniors será el nuevo campeón del futbol argentino");
} else {
  alert("Otro equipo salio campeon");
}

function multiplicar() {
  let numero1 = parseInt(
    prompt("¿cuantos titulos crees que ganara boca en los proximos 10 años?")
  );
  let numero2 = 10;
  let resultado = numero1 / numero2;
  alert(`Boca ganará un promedio de ${resultado} titulos por año`);
}
multiplicar();

const jugadoresdeBoca = [
  "rojo",
  "advincula",
  "battaglia",
  "blanco",
  "delgado",
  "alarcon",
  "herrera",
  "palacios",
  "cavani",
];
jugadoresdeBoca.push("gimenez");
jugadoresdeBoca.unshift("marchesín");
jugadoresdeBoca.splice(6, 1, "zenón");
console.log(jugadoresdeBoca);
console.log(jugadoresdeBoca.includes("herrera"));

const jugador12 = {
  jugador: "Brey",
  posicion: "arquero",
  camiseta: 12,
};
const jugador13 = {
  jugador: "Blondel",
  posicion: "lateral por derecha",
  camiseta: 42,
};
const jugador14 = {
  jugador: "Di lollo",
  posicion: "central por derecha",
  camiseta: 40,
};
const jugador15 = {
  jugador: "Saracchi",
  posicion: "lateral por izquierda",
  camiseta: 3,
};
const jugador16 = {
  jugador: "belmonte",
  posicion: "mediocampista",
  camiseta: 30,
};
const jugador17 = {
  jugador: "Zeballos",
  posicion: "win",
  camiseta: 7,
};
const jugador18 = {
  jugador: "Merentiel",
  posicion: "delantero",
  camiseta: 16,
};

const suplentes = {
  jugador12,
  jugador13,
  jugador14,
  jugador15,
  jugador16,
  jugador17,
  jugador18,
};
console.log(suplentes);

const bombonera = {
  color: "azul y amarillo",
  techo: false,
  capacidad: 54000,
  hinchada: "la12",
  años: 85,
  comida: "hamburguesa",
};
console.log(bombonera);

let ingresaContraseña = prompt("ingrese contraseña");
let pass = "boca123456";
let ingresosIncorrectos = 0;
while (ingresaContraseña != pass && ingresosIncorrectos < 2) {
  alert("contrasña incorrecta");
  ingresosIncorrectos++;
  ingresaContraseña = prompt("ingresar contraseña");
}

if (ingresosIncorrectos == 2) {
  alert("Acceso denegado");
} else {
  alert("Acceso concedido");
}
