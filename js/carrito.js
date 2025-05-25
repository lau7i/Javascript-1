const h1 = document.getElementById("titulo");
h1.textContent = "Carrito 🛒";

let cardStorage = localStorage.getItem("cardCamiseta");
let carrito = JSON.parse(cardStorage) || [];

const cardContainer = document.getElementById("card-section");
const totalCompraElement = document.createElement("p");
totalCompraElement.id = "total-compra";
cardContainer.parentNode.insertBefore(
  totalCompraElement,
  cardContainer.nextSibling
);

function renderCamisetas() {
  cardContainer.innerHTML = "";
  if (carrito.length === 0) {
    cardContainer.innerHTML = `<p class="mensajecv">El carrito está vacío.</p>`;
    totalCompraElement.textContent = "Total: $0";
    return;
  }

  carrito.forEach((camiseta, index) => {
    const card = document.createElement("div");
    card.classList.add("camiseta-card");
    card.innerHTML = `
            <img src="${camiseta.imagen}" alt="Imagen de la camiseta del año ${
      camiseta.año
    }">
            <h3>Camiseta titular del año: ${camiseta.año}</h3>
            <h4>$${camiseta.precio}</h4>
            <div class="cantidad-control">
                <button class="restar-cantidad" data-index="${index}">-</button>
                <span>${camiseta.cantidad || 1}</span>
                <button class="sumar-cantidad" data-index="${index}">+</button>
            </div>
            <button class="eliminar-producto" data-index="${index}">Eliminar</button>
        `;
    cardContainer.appendChild(card);
  });
  actualizarTotal();
  agregarEventosBotones();
}

function agregarEventosBotones() {
  document.querySelectorAll(".eliminar-producto").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      eliminarProducto(index);
    });
  });

  document.querySelectorAll(".sumar-cantidad").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      modificarCantidad(index, 1);
    });
  });

  document.querySelectorAll(".restar-cantidad").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      modificarCantidad(index, -1);
    });
  });
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  localStorage.setItem("cardCamiseta", JSON.stringify(carrito));
  renderCamisetas();
  Swal.fire("Producto eliminado", "", "success");
}

function modificarCantidad(index, cambio) {
  if (carrito[index]) {
    carrito[index].cantidad = (carrito[index].cantidad || 1) + cambio;
    if (carrito[index].cantidad <= 0) {
      eliminarProducto(index);
    } else {
      localStorage.setItem("cardCamiseta", JSON.stringify(carrito));
      renderCamisetas();
    }
  }
}

function actualizarTotal() {
  const total = carrito.reduce((sum, camiseta) => {
    return sum + camiseta.precio * (camiseta.cantidad || 1);
  }, 0);
  totalCompraElement.textContent = `Total: $${total.toFixed(2)}`;
}

const botonVaciarCarrito = document.createElement("button");
botonVaciarCarrito.id = "btnVaciarCarrito";
botonVaciarCarrito.textContent = "Vaciar Carrito";

const botonFinalizarCompra = document.getElementById("btnComprar");
botonFinalizarCompra.textContent = "Finalizar compra";
if (botonFinalizarCompra) {
  botonFinalizarCompra.parentNode.insertBefore(
    botonVaciarCarrito,
    botonFinalizarCompra
  );
} else {
  document.body.appendChild(botonVaciarCarrito);
}

botonVaciarCarrito.addEventListener("click", () => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¡Se eliminarán todos los productos del carrito!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "red",
    cancelButtonColor: "green",
    confirmButtonText: "Sí, vaciarlo",
    cancelButtonText: "No, cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = [];
      localStorage.removeItem("cardCamiseta");
      renderCamisetas();
      Swal.fire(
        "¡Carrito vaciado!",
        "Todos los productos han sido eliminados.",
        "success"
      );
    }
  });
});

renderCamisetas();

function generarComprobante(productos, total) {
  let comprobanteHTML = `
        <h3>Comprobante de Compra</h3>
        <p>Fecha: ${new Date().toLocaleDateString()}</p>
        <p>Hora: ${new Date().toLocaleTimeString()}</p>
        <hr>
        <h4>Detalle de Productos:</h4>
        <ul>
    `;
  productos.forEach((item) => {
    comprobanteHTML += `<li>${item.cantidad || 1} x Camiseta del año ${
      item.año
    } - $${item.precio.toFixed(2)} c/u</li>`;
  });
  comprobanteHTML += `
        </ul>
        <hr>
        <p><strong>Total Pagado: $${total.toFixed(2)}</strong></p>
        <p>¡Gracias por tu compra😃!</p>
    `;
  return comprobanteHTML;
}

if (botonFinalizarCompra) {
  botonFinalizarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire(
        "Tu carrito está vacio",
        "No tienes productos para finalizar la compra.",
        "info"
      );
      return;
    }
    Swal.fire({
      title: "Desea confirmar la compra?",
      showDenyButton: true,
      confirmButtonText: "Comprar",
      denyButtonText: `Volver atras`,
    }).then((result) => {
      if (result.isConfirmed) {
        const total = carrito.reduce((sum, camiseta) => {
          return sum + camiseta.precio * (camiseta.cantidad || 1);
        }, 0);
        const comprobante = generarComprobante(carrito, total);

        Swal.fire({
          title: "¡Pago realizado con éxito!",
          html: comprobante,
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => {
          carrito = [];
          localStorage.removeItem("cardCamiseta");
          renderCamisetas();
        });
      } else if (result.isDenied) {
        Swal.fire("Compra cancelada", "Puedes seguir comprando", "info");
      }
    });
  });
}
