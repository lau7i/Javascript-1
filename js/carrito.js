const h1 = document.getElementById("titulo");
h1.textContent = "Carrito 🛒";

let cardStorage = localStorage.getItem("cardCamiseta");
cardStorage = JSON.parse(cardStorage);

let cardContainer = document.getElementById("card-section");
function renderCamisetas(cardItems) {
  cardItems.forEach((camiseta) => {
    const card = document.createElement("div");
    card.innerHTML = `<h3>${camiseta.año}</h3>
                          <h4>${camiseta.precio}</h4>`;
    cardContainer.appendChild(card);
  });
}
renderCamisetas(cardStorage);
