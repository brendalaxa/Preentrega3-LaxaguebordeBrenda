let sumartotal = 0;
let sumaRemera = 0;
let sumaPantalon = 0;
let sumaBermuda = 0;
let sumaCampera = 0;
const carrito = [];

// CONSTRUCTOR DE OBJETOS
function productos(id, nombre, precio, cantidad) {
  this.id = id;
  this.nombre = nombre;
  this.precio = precio;
  this.cantidad = cantidad;

  function mostrar() {
    return `${this.nombre} precio:${this.precio}`;
  }
}
// objetos
const remera = new productos(1, "remera", 10000, 1);
const pantalon = new productos(2, "pantalon", 23000, 1);
const bermuda = new productos(3, "bermuda", 16000, 1);
const campera = new productos(4, "campera", 35000, 1);

// prompt de compra y suma de totales
while (true) {
  compra = prompt(`seleccione lo que quiera comprar:
1 para remera 
2 para pantalon 
3 para bermuda 
4 para campera
y "fin" si desea terminar de comprar`);

  if (compra == "fin" || compra == "FIN") {
    alert(`el total es : ${sumartotal} pesos`);
    break;
  } else if (compra == remera.id) {
    sumartotal += remera.precio;
    sumaRemera += remera.cantidad;
    carrito.push(remera);
  } else if (compra == pantalon.id) {
    sumartotal += pantalon.precio;
    sumaPantalon += pantalon.cantidad;
    carrito.push(pantalon);
  } else if (compra == bermuda.id) {
    sumartotal += bermuda.precio;
    sumaBermuda += bermuda.cantidad;
    carrito.push(bermuda);
  } else if (compra == campera.id) {
    sumartotal += campera.precio;
    sumaCampera += campera.cantidad;
    carrito.push(campera);
  } else {
    alert("opcion invalida, reintente");
    continue;
  }
  alert(`el subtotal es : ${sumartotal} pesos.`);
}
// muestra el array de objetos

console.log(carrito);

//  funcion para ver el total gastado

function mostrarResultados() {
  alert(`usted ha comprado:
  ${sumaRemera} remeras
  ${sumaBermuda} bermudas
  ${sumaCampera} camperas
  ${sumaPantalon} pantalones
  el total de la compra es de ${sumartotal} pesos.`);
}
mostrarResultados();
// menu de opciones para finalizar compra
menu();
function menu() {
  while (true) {
    opciones = prompt(` ingrese 1: para finalizar la compra
           ingrese 2: para vaciar carrito
           ingrese 3: para quitar productos `);

    if (opciones == 1) {
      mediosDePago();
      break;
    } else if (opciones == 2) {
      vaciarCarrito();
      break;
    } else if (opciones == 3) {
      quitarProducto();
      break;
    } else {
      alert("opcion invalida, reintente");
      continue;
    }
  }
}
// muestra como queda el carrito
console.log(carrito);

// quitar productos

function quitarProducto() {
  while (true) {
    opciones = prompt(`
     ingrese " remera " para eliminarla;
     ingrese " pantalon " para eliminarla;
     ingrese " bermunda " para eliminarla;
     ingrese " campera " para eliminarla;
     ingrese " fin " para finalizar;  `);

    if (opciones == "remera" || opciones === "REMERA") {
      const index = carrito.findIndex((item) => item.nombre === opciones);
      if (index !== -1) {
        carrito.splice(index, 1);
        if (sumaRemera !== 0) {
          sumaRemera -= 1;
          sumartotal -= remera.precio;
        }
      }
    } else if (opciones == "pantalon" || opciones === "PANTALON") {
      const index = carrito.findIndex((item) => item.nombre === opciones);
      if (index !== -1) {
        carrito.splice(index, 1);
        if (sumaPantalon !== 0) {
          sumaPantalon -= 1;
          sumartotal -= pantalon.precio;
        }
      }
    } else if (opciones == "bermuda" || opciones === "BERMUDA") {
      const index = carrito.findIndex((item) => item.nombre === opciones);
      if (index !== -1) {
        carrito.splice(index, 1);
        if (sumaBermuda !== 0) {
          sumaBermuda -= 1;
          sumartotal -= bermuda.precio;
        }
      }
    } else if (opciones == "campera" || opciones === "CAMPERA") {
      const index = carrito.findIndex((item) => item.nombre === opciones);
      if (index !== -1) {
        carrito.splice(index, 1);
        if (sumaCampera !== 0) {
          sumaCampera -= 1;
          sumartotal -= campera.precio;
        }
      }
    } else if (opciones == "fin" || opciones == "FIN") {
      // vuelve al menu de opciones
      estadoCarrito();
      menu();
      break;
    } else {
      alert("opcion invalida, reintente");
      continue;
    }
    estadoCarrito();
  }
}
//estado carrito
function estadoCarrito() {
  alert(`Su carrito quedo asi:
   remeras : ${sumaRemera}
   bermudas :  ${sumaBermuda} 
   camperas : ${sumaCampera}
   pantalones : ${sumaPantalon}
  el subtotal de la compra es de : ${sumartotal} pesos.`);
}
// vaciar carrito
function vaciarCarrito() {
  carrito.length = 0;
  alert(" vuelva pronto");
}

// finalizar compra
function mediosDePago() {
  while (sumartotal != 0) {
    medioDePago = prompt(`
      Seleccione medio de pago:
      1 para efectivo 
      2 para 3 cuotas sin interes
      3 para 6 cuotas con interes del 28%
      4 para 12 cuotas con interes del 66%`);

    if (
      medioDePago == 1 ||
      medioDePago == 2 ||
      medioDePago == 3 ||
      medioDePago == 4
    ) {
      switch (medioDePago) {
        case "1":
          if (sumartotal >= 50000) {
            sumartotal = (sumartotal * 0.9).toFixed(2);
            alert(`Tiene un 10% de descuento en su compra y debera pagar ${sumartotal} pesos.
            Que tenga un buen dia!`);
          } else {
            alert(`Debera pagar ${sumartotal} pesos.
            Que tenga un buen dia!`);
          }

          break;
        case "2":
          sumartotal = (sumartotal / 3).toFixed(2);
          alert(`Debera pagar 3 cuotas de ${sumartotal} pesos.
            Que tenga un buen dia!`);
          break;
        case "3":
          total = (sumartotal * 1.28).toFixed(2);
          cuotas = (total / 3).toFixed(2);
          alert(`Deberas pagar 6 cuotas de ${cuotas} pesos.
             El total seria de ${total} pesos.
            Que tenga un buen dia!`);
          break;
        case "4":
          total = (sumartotal * 1.66).toFixed(2);
          cuotas = (total / 3).toFixed(2);
          alert(`Deberas pagar 12 cuotas de ${cuotas} pesos.
             El total seria de ${total} pesos.
            Que tenga un buen dia!`);
          break;
      }
      break;
    } else {
      alert("Debe ingresar un medio de pago valido");
      continue;
    }
  }
}
