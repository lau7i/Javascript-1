let titulo = document.getElementById("title");
titulo.innerText = "Camisetas Lauti ";

let segundotitulo = document.getElementById("otroTitulo");
segundotitulo.textContent = "Venta de camisetas de Boca Juniors";

let subtitulo = document.createElement("h2");
subtitulo.innerHTML = "<span> Envios gratis a todo el país </span>";
document.body.append(subtitulo);

let entrenadores = ["Titular 1981", "Suplente 2020", "Titular 2004"];
let dt = document.getElementById("dt");

for (const entrenador of entrenadores) {
  let li = document.createElement("li");
  li.innerHTML = entrenador;
  dt.appendChild(li);
}

const h2 = document.getElementById("subtitulo");
h2.textContent = "Camisetas mas recordadas en la historia de boca";

let carrito = JSON.parse(localStorage.getItem("cardCamiseta")) || [];

let Container = document.getElementById("camisetas-Container");

fetch("./db/data.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((camiseta) => {
      const card = document.createElement("div");
      card.classList.add("tarjeta-camiseta");
      card.innerHTML = `<img src="${camiseta.imagen}" alt="Imagen de la camiseta del año ${camiseta.año}">
                              <h2>camiseta Titular del año: ${camiseta.año}</h2>
                              <h3>precio:$${camiseta.precio}</h3>
                              <button class="Agregarproducto" id=${camiseta.id}>Agregar al carrito</button>`;
      Container.appendChild(card);
    });

    AddToCardButtons(data);
  });

function AddToCardButtons(camisetasData) {
  const addButton = document.querySelectorAll(".Agregarproducto");
  addButton.forEach((button) => {
    button.onclick = (e) => {
      const camisetaId = e.currentTarget.id;
      const selectedCamiseta = camisetasData.find(
        (camiseta) => camiseta.id == camisetaId
      );

      const productoExistente = carrito.find(
        (item) => item.id === selectedCamiseta.id
      );

      if (productoExistente) {
        productoExistente.cantidad = (productoExistente.cantidad || 1) + 1;
        Swal.fire({
          icon: "info",
          text: `Se añadió una unidad más de la camiseta del año ${selectedCamiseta.año}.`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        selectedCamiseta.cantidad = 1;
        carrito.push(selectedCamiseta);
        Swal.fire({
          icon: "success",
          title: "Agregado al carrito",
          text: `La camiseta del año ${selectedCamiseta.año} ha sido agregada.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }

      localStorage.setItem("cardCamiseta", JSON.stringify(carrito));
    };
  });
}

async function cargarCamisetas() {
  try {
    const response = await fetch("./db/data.json");
    if (!response.ok) {
      throw new Error(`¡Error! Estado: ${response.status}`);
    }
    const data = await response.json();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Algo salió mal!",
      footer: "<p>Hubo un problema al cargar las camisetas disponibles</p>",
    });
  } finally {
    Swal.fire({
      icon: "info",
      draggable: true,
      text: "Camisetas disponibles",
      footer: "<p>Aprovechalas</p>",
    });
  }
}
cargarCamisetas();
