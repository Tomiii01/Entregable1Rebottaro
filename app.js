
fetch('data.json')
  .then(response => response.json())
  .then(platos => {
    mostrarPlatos(platos);


    function mostrarPlatos(platos) {
      const contenedor = document.getElementById('menu');
      contenedor.innerHTML = '';

      platos.forEach(plato => {
        const platoDiv = document.createElement('div');
        platoDiv.classList.add('plato');

        const platoHTML = `
          <img src="${plato.imagen}" alt="${plato.nombre}">
          <h3>${plato.nombre}</h3>
          <p>${plato.descripcion}</p>
          <p><strong>$${plato.precio.toFixed(2)}</strong></p>
          <button onclick="agregarAlCarrito(${plato.id})">Agregar al carrito</button>
        `;
        platoDiv.innerHTML = platoHTML;

        contenedor.appendChild(platoDiv);
      });
    }

    let carrito = [];


    window.agregarAlCarrito = function(id) {
      const plato = platos.find(plato => plato.id === id);
      if (plato) {
        carrito.push(plato);
        actualizarCarrito();
        
        Swal.fire({
          title: '¡Producto agregado!',
          text: `${plato.nombre} se agregó al carrito.`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      }
    };

  
    window.eliminarDelCarrito = function(id) {
      carrito = carrito.filter(plato => plato.id !== id);
      actualizarCarrito();
      Swal.fire({
        title: 'Producto eliminado',
        text: 'El producto se eliminó del carrito.',
        icon: 'info',
        timer: 1500,
        showConfirmButton: false,
      });
    };


    function actualizarCarrito() {
      const carritoContenedor = document.getElementById('carrito-items');
      carritoContenedor.innerHTML = '';
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

      const totalHTML = document.createElement('div');
      totalHTML.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
      carritoContenedor.appendChild(totalHTML);

      const botonCompra = document.getElementById('boton-compra');
      if (carrito.length > 0) {
        botonCompra.style.display = 'block';
      } else {
        botonCompra.style.display = 'none';
      }
    }


    window.realizarCompra = function() {
      if (carrito.length > 0) {
        Swal.fire({
          title: '¡Gracias por tu compra!',
          text: 'Tu pedido será procesado pronto.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          carrito = [];
          actualizarCarrito();
        });
      } else {
        Swal.fire({
          title: 'El carrito está vacío',
          text: 'Por favor, agrega productos antes de comprar.',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
        });
      }
    };
  })
  .catch(error => {
    console.error('Error al cargar los datos:', error);
    Swal.fire({
      title: 'Error',
      text: 'Hubo un problema al cargar los datos del menú.',
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  });



  



