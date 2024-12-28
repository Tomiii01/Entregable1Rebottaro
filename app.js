// Cargar los datos de los platos desde el archivo JSON
fetch('data.json')
  .then(response => response.json())
  .then(platos => {
    // Mostrar los platos en la página
    mostrarPlatos(platos);

    // Función para mostrar los platos
    function mostrarPlatos(platos) {
      const contenedor = document.getElementById('menu');
      contenedor.innerHTML = ''; // Limpiar el contenido

      platos.forEach(plato => {
        const platoDiv = document.createElement('div');
        platoDiv.classList.add('plato');

        // Crear el contenido del plato
        const platoHTML = `
          <img src="${plato.imagen}" alt="${plato.nombre}">
          <h3>${plato.nombre}</h3>
          <p>${plato.descripcion}</p>
          <p><strong>$${plato.precio.toFixed(2)}</strong></p>
          <button onclick="agregarAlCarrito(${plato.id})">Agregar al carrito</button>
        `;
        platoDiv.innerHTML = platoHTML;

        // Añadir el plato al contenedor del menú
        contenedor.appendChild(platoDiv);
      });
    }

    // Carrito de compras
    let carrito = [];

    // Función para agregar un plato al carrito
    window.agregarAlCarrito = function(id) {
      const plato = platos.find(plato => plato.id === id);
      if (plato) {
        carrito.push(plato);
        actualizarCarrito();
      }
    };

    // Función para eliminar un plato del carrito
    window.eliminarDelCarrito = function(id) {
      carrito = carrito.filter(plato => plato.id !== id);
      actualizarCarrito();
    };

    // Función para actualizar el carrito en la interfaz
    function actualizarCarrito() {
      const carritoContenedor = document.getElementById('carrito-items');
      carritoContenedor.innerHTML = ''; // Limpiar carrito
      let total = 0;

      carrito.forEach(plato => {
        total += plato.precio;
        const itemCarrito = document.createElement('div');
        itemCarrito.classList.add('item-carrito');
        itemCarrito.innerHTML = `
          <p>${plato.nombre} - $${plato.precio.toFixed(2)}</p>
          <button onclick="eliminarDelCarrito(${plato.id})">Eliminar</button>
        `;
        carritoContenedor.appendChild(itemCarrito);
      });

      // Mostrar total
      const totalHTML = document.createElement('div');
      totalHTML.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
      carritoContenedor.appendChild(totalHTML);

      // Agregar botón de compra si el carrito no está vacío
      const botonCompra = document.getElementById('boton-compra');
      if (carrito.length > 0) {
        botonCompra.style.display = 'block';
      } else {
        botonCompra.style.display = 'none';
      }
    }

    // Función para realizar la compra
    window.realizarCompra = function() {
      const mensajeGracias = document.getElementById('mensaje-gracias');
      if (carrito.length > 0) {
        // Mostrar el mensaje de agradecimiento
        mensajeGracias.innerHTML = '<h2>¡Muchas gracias por tu compra!</h2>';
        carrito = []; // Limpiar el carrito después de la compra
        actualizarCarrito();
      } else {
        mensajeGracias.innerHTML = '<h2>El carrito está vacío. Agrega productos para realizar la compra.</h2>';
      }
    };
  })
  .catch(error => console.error('Error al cargar los datos:', error));



  



