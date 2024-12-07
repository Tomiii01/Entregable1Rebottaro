const menu = [
  { nombre: "Pizzas", precio: 5000 },
  { nombre: "Hamburguesa simple", precio: 3800 },
  { nombre: "Hamburguesa completa", precio: 4000 },
  { nombre: "Hamburguesa especial", precio: 5000 },
  { nombre: "Lomito", precio: 4500 }
];

let pedido = JSON.parse(localStorage.getItem('pedido')) || [];

const menuContainer = document.getElementById('menu');
const pedidoList = document.getElementById('pedido-list');
const totalContainer = document.getElementById('total');
const menuSection = document.getElementById('menu-section');
const pedidoSection = document.getElementById('pedido-section');

function mostrarSeccion(seccion) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
  seccion.classList.remove('hidden');
}

function mostrarMenu() {
  menuContainer.innerHTML = menu.map((platillo, index) => `
    <div class="menu-item">
      ${platillo.nombre} - $${platillo.precio} 
      <button onclick="agregarPlatillo(${index})">Agregar</button>
    </div>
  `).join('');
}

function agregarPlatillo(index) {
  const platilloSeleccionado = menu[index];
  pedido.push(platilloSeleccionado);
  localStorage.setItem('pedido', JSON.stringify(pedido)); // Guardar en localStorage
  alert(`${platilloSeleccionado.nombre} ha sido agregado al pedido.`);
}

function mostrarPedido() {
  if (pedido.length === 0) {
    pedidoList.innerHTML = '<li>No hay productos en el pedido.</li>';
    totalContainer.textContent = '';
    return;
  }

  pedidoList.innerHTML = pedido.map(platillo => `
    <li>${platillo.nombre} - $${platillo.precio}</li>
  `).join('');

  const total = pedido.reduce((sum, platillo) => sum + platillo.precio, 0);
  totalContainer.textContent = `Total a pagar: $${total}`;
}

function confirmarPedido() {
  if (pedido.length === 0) {
    alert("No hay productos en el pedido para confirmar.");
    return;
  }

  alert("¡Gracias por su compra! Su pedido ha sido confirmado.");

  console.log("Resumen del pedido:");
  pedido.forEach(platillo => console.log(`${platillo.nombre} - $${platillo.precio}`));
  console.log(`Total pagado: $${pedido.reduce((sum, p) => sum + p.precio, 0)}`);

  
  limpiarPedido();

  pedidoList.innerHTML = '<li>¡Gracias por su compra! No hay productos en el pedido.</li>';
  totalContainer.textContent = '';
}

function cancelarPedido() {
  alert("Su pedido ha sido cancelado.");
  limpiarPedido();
}

function limpiarPedido() {
  pedido = [];
  localStorage.removeItem('pedido'); 
  mostrarPedido();
}

document.getElementById('link-menu').addEventListener('click', () => {
  mostrarSeccion(menuSection);
});

document.getElementById('link-pedido').addEventListener('click', () => {
  mostrarSeccion(pedidoSection);
  mostrarPedido();
});

document.getElementById('confirmar-pedido').addEventListener('click', confirmarPedido);
document.getElementById('cancelar-pedido').addEventListener('click', cancelarPedido);


mostrarSeccion(menuSection);
mostrarMenu();




