const productos = [
  {
    id: 10,
    stock: 10,
    nombre: "Serum Rose",
    descripcion: "Serum antioxidante con vitamina c",
    precio: 15000,
    imagen: "../imagenes/serum.jpg",
  },
  {
    id: 1,
    stock: 10,
    nombre: "Rubor Milena",
    descripcion: "Rubor en polvo con forma de corazon",
    precio: 7000,
    imagen: "../imagenes/corazon rubor.jpg",
  },
  {
    id: 2,
    stock: 10,
    nombre: "Piedra y Rodillo de Cuarzo Rosa",
    descripcion: "Piedra y rodillo para skincare",
    precio: 6000,
    imagen: "../imagenes/piedra de cuarzo rosa y rodillo.jpg",
  },
  {
    id: 3,
    stock: 10,
    nombre: "Crema Hidratante Facial Watermelon",
    descripcion: "Crema hidratante facial con acido hialuronico",
    precio: 10000,
    imagen: "../imagenes/crema hidratante.jpg",
  },
  {
    id: 4,
    stock: 10,
    nombre: "Balsamo Labial",
    descripcion: "Balsamo labial de coco maxima hidratacion",
    precio: 3000,
    imagen: "../imagenes/Bálsamo Labial Exfoliante - COCO.jpg",
  },
  {
    id: 5,
    stock: 10,
    nombre: "Brochas Doja",
    descripcion: "Brochas aterciopeladas",
    precio: 10000,
    imagen: "../imagenes/brochas.jpg",
  },
  {
    id: 6,
    stock: 10,
    nombre: "Sombras Venus Nude",
    descripcion: "Sombras nude de alta cobertura",
    precio: 5000,
    imagen: "../imagenes/sombras.jpg",
  },
  {
    id: 7,
    stock: 10,
    nombre: "Labiales Anastasia",
    descripcion: "Labiales Nude Matte ",
    precio: 3000,
    imagen: "../imagenes/labiales nude.jpg",
  },
  {
    id: 8,
    stock: 10,
    nombre: "Cartera Arianna",
    descripcion: "Mini Bag blanca con bolsillo interno",
    precio: 18000,
    imagen: "../imagenes/accesorios.jpg",
  },
  {
    id: 9,
    stock: 10,
    nombre: "Cartera Diana",
    descripcion: "Cartera celeste con interior de terciopelo",
    precio: 16000,
    imagen: "../imagenes/accesorios 1.jpg",
  },
];
//-----llamado de html-------------

const cardContainer = document.querySelector(".card-container");
//---capturas para el buscador
const inputBuscar = document.querySelector("#input-buscar");
const botonBuscar = document.querySelector("#boton-buscar");
const verTodo = document.querySelector("#ver-todo");
const infoResultado = document.querySelector(".info-resultado");
//---botones agregar de las cards----
let btnAgregar = document.querySelectorAll(".btn-card");
//----sumador del carrito----
let sumaCart = document.querySelector(".suma-cart");

//   ---------   generar card y contenido -----------

function cargaDeCards(productolink) {
  productolink.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
    <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">${producto.descripcion}</p>
        <p class="card-precio">Precio: $ ${producto.precio}</p>
        <button type="button" id="${producto.id}" class="btn btn-card btn-info">Comprar</button>
        
    </div>
  
    `;
    cardContainer.appendChild(div);
  });
  actualizarBtnAgregar();
}
//------llamado a la funcion para ver las cards-----
cargaDeCards(productos);

//-----filtrado de los productos-------
const filtrar = () => {
  cardContainer.innerHTML = "";

  const texto = inputBuscar.value.toLowerCase();

  //--la bandera es para el .info-resultado----
  let bandera = false;
  for (prod of productos) {
    let nombre = prod.nombre;
    if (nombre.indexOf(texto) !== -1) {
      bandera = true;

      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
    <img src="${prod.imagen}" class="card-img-top" alt="${prod.nombre}">
    <div class="card-body">
        <h5 class="card-title">${prod.nombre}</h5>
        <p class="card-text">${prod.descripcion}</p>
        <p class="card-precio">Precio: $ ${prod.precio}</p>
        <button type="button" id="${prod.id}" class="btn btn-card btn-info">Comprar</button>
        
    </div>
  
    `;
      cardContainer.appendChild(div);
    }
  }
  if (!bandera) {
    infoResultado.innerHTML = `
    Elemento no localizado
    `;
  }
  inputBuscar.value = "";
  actualizarBtnAgregar();
};

botonBuscar.addEventListener("click", filtrar);
//-----ver todo en el filtro------
verTodo.addEventListener("click", function () {
  cardContainer.innerHTML = "";
  cargaDeCards(productos);
});
//-----actualizar boton comprar-----
function actualizarBtnAgregar() {
  btnAgregar = document.querySelectorAll(".btn-card");

  btnAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarCarrito);
  });
}
//----array vacio.---
let carrito = [];

function agregarCarrito(evento) {
  const idbtn = parseInt(evento.currentTarget.id);
  const agregarProd = productos.find((producto) => producto.id === idbtn);

  if (agregarProd) {
    // --genero una variable nueva para verificar si esta en carrito
    const existeEnCarrito = carrito.some((producto) => producto.id === idbtn);
    if (existeEnCarrito) {
      //--si esta aumento cantidad
      const index = carrito.findIndex((producto) => producto.id === idbtn);
      carrito[index].cantidad++;
      const updatedProd = Object.assign({}, agregarProd); // Copiar las propiedades del objeto agregarProd
      updatedProd.stock--; // Modificar el stock en el nuevo objeto
      productos[index] = updatedProd;
    } else {
      // sino esta hago el push
      agregarProd.cantidad = 1;
      carrito.push(agregarProd);
    }
  }
  sumadorCarrito();
  localStorage.setItem("carritoStorage", JSON.stringify(carrito));
  actualizarCarritoUI();
}

//---sumo la cantidad de producto del carrito
function sumadorCarrito() {
  let nro = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  sumaCart.innerText = nro;
}

//---traigo el carrito que esta en json para cargar el modal---

const modalVacio = document.querySelector(".modal-vacio");
const productoModal = document.querySelector(".producto-modal");
let btnEliminar = document.querySelectorAll(".btn-trash");
const vaciado = document.querySelector(".vaciado");
const divTotal = document.querySelector(".total");
let btnSumar = document.querySelectorAll(".btn-sumar");
let btnRestar = document.querySelectorAll(".btn-restar");
const prodCarrito = JSON.parse(localStorage.getItem("carritoStorage"));
//--si hay algo en el carrito ----
function actualizarCarritoUI() {
  productoModal.innerHTML = ""; // Limpiar el contenido actual del carrito

  if (carrito.length === 0) {
    modalVacio.classList.remove("no-mostrar");
    productoModal.classList.add("no-mostrar");
  } else {
    modalVacio.classList.add("no-mostrar");
    productoModal.classList.remove("no-mostrar");

    carrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("producto-modal-item");
      div.innerHTML = `
      <div class="row-card row">
      <div class="col-4 img-modal">
          <img src="${producto.imagen}" alt="${producto.nombre}">
      </div>
      <div class="col-8">
          <p class="modal-nombre">${producto.nombre}</p>
          <p class="modal-precio  position-absolute ">precio:${
            producto.precio * producto.cantidad
          } </p>
          <div class="input-group achicar mb-3">
              
              <h5 class="modal-cantidad">Cantidad: </h5>
              <h5 class="modal-cantidad">${producto.cantidad}</h5>
              
          </div>
          <button type="button" id="${
            producto.id
          }" class="btn btn-trash position-absolute top-0 end-0 btn-link">
              <i class="bi bi-trash btn-eliminar"></i>
          </button>
      </div>
      
  </div>
      `;
      productoModal.appendChild(div);
    });
  }

  actualizarBtnEliminar();

  sumaTotal();
}

if (prodCarrito) {
  carrito = prodCarrito;
  sumadorCarrito();
} else {
  carrito = [];
}
window.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carritoStorage")) || [];
  sumadorCarrito();
  actualizarCarritoUI();
});
//-----funcion para eliminar todos los producto con el mismo id---------------------
function actualizarBtnEliminar() {
  btnEliminar = document.querySelectorAll(".btn-trash");

  btnEliminar.forEach((boton) => {
    // agrego el evento y le paso la funcion como parametro
    boton.addEventListener("click", eliminarProd);
  });
}
// el evento que realiza el click de eliminar producto
function eliminarProd(evento) {
  let idbtn = parseInt(evento.currentTarget.id);
  const index = carrito.findIndex((producto) => producto.id === idbtn);

  carrito.splice(index, 1);

  actualizarCarritoUI();
  sumadorCarrito();
  localStorage.setItem("carritoStorage", JSON.stringify(carrito));
}

//----vaciado total del carrito-----
vaciado.addEventListener("click", vaciar);

function vaciar() {
  carrito = [];
  actualizarCarritoUI();
  sumadorCarrito();
  localStorage.setItem("carritoStorage", JSON.stringify(carrito));
}

// ---sumar todo lo que esta en el carrito
function sumaTotal() {
  divTotal.innerText = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
}
