let titulo = document.getElementById("title");
titulo.innerText = "Hola mundo Boca";
titulo.style.backgroundColor = "yellow";
titulo.style.textAlign = "center";

let subtitulo = document.createElement("h2");
subtitulo.innerHTML = "<span>Aguante Boca</span>";
document.body.append(subtitulo);
subtitulo.style.backgroundColor = "yellow";
subtitulo.style.textAlign = "center";

let entrenadores = ["Bianchi", "Lorenzo", "Basile"];
let dt = document.getElementById("dt");

for (const entrenador of entrenadores) {
  let li = document.createElement("li");
  li.innerHTML = entrenador;
  dt.appendChild(li);
}

const h2 = document.getElementById("subtitulo");
h2.textContent = "Entrenadores exitosos en la historia de boca";
h2.style.backgroundColor = "lightblue";
h2.style.textAlign = "center";

const camisetas = [
  {
    id: 1,
    año: 2020,
    precio: 100000,
  },
  {
    id: 2,
    año: 2021,
    precio: 100000,
  },
  {
    id: 3,
    año: 2022,
    precio: 110000,
  },
  {
    id: 4,
    año: 2023,
    precio: 120000,
  },
  {
    id: 5,
    año: 2024,
    precio: 130000,
  },
  {
    id: 6,
    año: 2025,
    precio: 150000,
  },
];

const cardCamiseta = [];
let camisetasContainer = document.getElementById("camisetas-Container");

function renderCamisetas(camisetasArray) {
  camisetasArray.forEach((camiseta) => {
    const card = document.createElement("div");
    card.innerHTML = `<h3>camiseta del año:${camiseta.año}</h3>
                      <h4>$${camiseta.precio}</h4>
                      <button class="Agregarproducto" id=${camiseta.id}>Agregar</button>`;
    camisetasContainer.appendChild(card);
  });
  addToCardButton();
}
renderCamisetas(camisetas);

function addToCardButton() {
  addButton = document.querySelectorAll(".Agregarproducto");
  addButton.forEach((button) => {
    button.onclick = (e) => {
      const camisetasId = e.currentTarget.id;
      const selectedcamiseta = camisetas.find(
        (camiseta) => camiseta.id == camisetasId
      );
      cardCamiseta.push(selectedcamiseta);
      localStorage.setItem("cardCamiseta", JSON.stringify(cardCamiseta));
    };
  });
}
