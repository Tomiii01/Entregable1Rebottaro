

const menu = [
  {nombre: "Pizzas", precio: 5000},
  {nombre: "Hamburguesa simple", precio: 3800},
  {nombre: "Hamburguesa completa", precio: 4000},
  {nombre: "Hamburguesa especial", precio: 5000},
  {nombre: "Lomito", precio: 4500}
]


let pedido = [];

function mostrarMenu() {
  let mensaje = "Seleccione su comida:\n";
  menu.forEach((platillo, index) => {
    mensaje += `${index + 1}. ${platillo.nombre} - $${platillo.precio}\n`;

  });
  alert(mensaje);
}


function agregarPlatillo() {
  mostrarMenu();
  let continuar = true;

  while(continuar) {
    let seleccion = parseInt(prompt("Ingrese el número de pedido que desea agregar:"));


    if(seleccion > 0 && seleccion <= menu.length){
      let platilloSeleccionado = menu[seleccion - 1];
      pedido.push(platilloSeleccionado);
      alert(`${platilloSeleccionado.nombre} ha sido agregado al pedido. `);
    } else {
      alert("Selección invalida. Por favor, ingrese un número válido.");
    }
    continuar = confirm("¿Desea agregar otro pedido?");
  }

}


function calcularTotal() {
  return pedido.reduce((total, platillo) => total + platillo.precio, 0);
}

function mostrarPedido() {
  let mensaje = "Resumen de su pedido:\n";
  pedido.forEach(platillo => {
    mensaje += `${platillo.nombre} - $${platillo.precio}\n`;
  });

  let total = calcularTotal();
  mensaje += `\nTotal a pagar: $${total}`;

  let confirmar = confirm(`${mensaje}\n\n¿Desea confirmar su pedido?`);
  if(confirmar){
    alert("¡Gracias por su compra! Su pedido ha sido confirmado.");
    mostrarPedidoConsola();
  } else{
    alert("Su pedido ha sido cancelado.");
  }
}

function mostrarPedidoConsola() {
  console.log("Resumen del pedido:");
  pedido.forEach(platillo => {
    console.log(`${platillo.nombre} - $${platillo.precio}`);
  });

  let total = calcularTotal();
  console.log(`Total a pagar: $${total}`);
}


agregarPlatillo();
mostrarPedido();