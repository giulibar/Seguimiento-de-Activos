window.addEventListener("load", inicio);
// browser code

import data from './dataLP.js'
import data1 from './dataBinance.js' 

function inicio() {
    const fecha = data[0];
    let campoFecha = document.getElementById("fecha");
    campoFecha.innerHTML = fecha.toString();

    const buyPrice = parseFloat(data[1]).toFixed(2);
    let campoPrecio = document.getElementById("BestBuyPrice");
    campoPrecio.style.color = "white";
    campoPrecio.innerHTML = buyPrice.toString();

    const sellPrice = parseFloat(data[2]).toFixed(2);
    let campoPrecio1 = document.getElementById("BestSellPrice");
    campoPrecio1.style.color = "white";
    campoPrecio1.innerHTML = sellPrice.toString();
}

