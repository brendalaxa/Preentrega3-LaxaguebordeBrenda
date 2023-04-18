const remera = 10000;
const pantalon = 23000;
const bermuda = 16000;
const campera = 35000;
let sumartotal = 0;
let sumaRemera = 0;
let sumaPantalon = 0;
let sumaBermuda = 0;
let sumaCampera = 0;
let medioDePago = 0;
let cuotas = 0;
let total = 0;
let compra = 0;
let precio = 0;

// aca muestro el total gastado y cuantos productos compro
// ademas solicita medios de pagos
function mostrarResultados() {
  alert(`usted ha comprado:
  ${sumaRemera} remeras
  ${sumaBermuda} bermudas
  ${sumaCampera} camperas
  ${sumaPantalon} pantalones
  el total de la compra es de ${sumartotal} pesos.`);

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
// solicito ingrese la compra que desea y suma los totales
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
  } else if (compra == 1) {
    precio = 10000;
    sumartotal += precio;
    sumaRemera += 1;
  } else if (compra == 2) {
    precio = 23000;
    sumartotal += precio;
    sumaPantalon += 1;
  } else if (compra == 3) {
    precio = 16000;
    sumartotal += precio;
    sumaBermuda += 1;
  } else if (compra == 4) {
    precio = 35000;
    sumartotal += precio;
    sumaCampera += 1;
  } else {
    alert("opcion invalida, reintente");
    continue;
  }
  alert(`el total es : ${sumartotal} pesos.`);
}

mostrarResultados();
