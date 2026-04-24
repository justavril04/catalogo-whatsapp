const productos = [
    {
      id: 1,
      nombre: "Nombre del producto",
      talla: "Talla: X",
      info: "Otra información",
      imagen: "img/producto-1.jpg"
    },
    {
      id: 2,
      nombre: "Nombre del producto",
      talla: "Talla: X",
      info: "Otra información",
      imagen: "img/producto-2.jpg"
    },
    {
      id: 3,
      nombre: "Nombre del producto",
      talla: "Talla: X",
      info: "Otra información",
      imagen: "img/producto-3.jpg"
    },
    {
      id: 4,
      nombre: "Nombre del producto",
      talla: "Talla: X",
      info: "Otra información",
      imagen: "img/producto-4.jpg"
    }
  ];
  
  let carrito = [];
  
  const contenedorProductos = document.getElementById("productos");
  const listaCarrito = document.getElementById("listaCarrito");
  const contador = document.getElementById("contador");
  const panel = document.getElementById("carritoPanel");
  const btnCarrito = document.getElementById("btnCarrito");
  const cerrarCarrito = document.getElementById("cerrarCarrito");
  const btnWhatsApp = document.getElementById("btnWhatsApp");
  
  function mostrarProductos() {
    contenedorProductos.innerHTML = "";
  
    productos.forEach((producto) => {
      const card = document.createElement("article");
      card.classList.add("producto");
  
      card.innerHTML = `
        <img 
          src="${producto.imagen}" 
          alt="${producto.nombre}" 
          class="producto-img"
        >
  
        <h3>${producto.nombre}</h3>
        <p>${producto.talla}</p>
        <p>${producto.info}</p>
  
        <button id="btn-${producto.id}" onclick="agregarAlCarrito(${producto.id})">
          Agregar al carrito
        </button>
      `;
  
      contenedorProductos.appendChild(card);
    });
  }
  
  function abrirCerrarCarrito() {
    panel.classList.toggle("oculto");
  }
  
  function agregarAlCarrito(id) {
    const yaExiste = carrito.includes(id);
  
    if (!yaExiste) {
      carrito.push(id);
  
      const boton = document.getElementById(`btn-${id}`);
      boton.textContent = "Agregado";
      boton.classList.add("agregado");
  
      actualizarCarrito();
    }
  }
  
  function eliminarDelCarrito(id) {
    carrito = carrito.filter((productoId) => productoId !== id);
  
    const boton = document.getElementById(`btn-${id}`);
    boton.textContent = "Agregar al carrito";
    boton.classList.remove("agregado");
  
    actualizarCarrito();
  }
  
  function actualizarCarrito() {
    contador.textContent = carrito.length;
    listaCarrito.innerHTML = "";
  
    if (carrito.length === 0) {
      listaCarrito.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío</p>`;
      return;
    }
  
    carrito.forEach((id) => {
      const producto = productos.find((item) => item.id === id);
  
      const item = document.createElement("div");
      item.classList.add("item-carrito");
  
      item.innerHTML = `
        <img 
          src="${producto.imagen}" 
          alt="${producto.nombre}" 
          class="mini-img"
        >
  
        <h4>${producto.nombre}</h4>
  
        <button onclick="eliminarDelCarrito(${producto.id})">x</button>
      `;
  
      listaCarrito.appendChild(item);
    });
  }
  
  function enviarWhatsApp() {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
  
    let mensaje = "Hola, me interesan estos productos:%0A%0A";
  
    carrito.forEach((id) => {
      const producto = productos.find((item) => item.id === id);
      mensaje += `- ${producto.nombre} / ${producto.talla}%0A`;
    });
  
    const numero = "59177293686";
    window.open(`https://wa.me/${numero}?text=${mensaje}`, "_blank");
  }
  
  btnCarrito.addEventListener("click", abrirCerrarCarrito);
  cerrarCarrito.addEventListener("click", abrirCerrarCarrito);
  btnWhatsApp.addEventListener("click", enviarWhatsApp);
  
  mostrarProductos();
  actualizarCarrito();
