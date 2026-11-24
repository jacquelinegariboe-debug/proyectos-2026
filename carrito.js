
let carrito = JSON.parse(
    localStorage.getItem("carritoFresseni")
) || [];


function guardarCarrito() {
    localStorage.setItem(
        "carritoFresseni",
        JSON.stringify(carrito)
    );
}

function actualizarContador() {

    const contador = document.getElementById("contador-carrito");

    if (contador) {

        const cantidadTotal = carrito.reduce(
            (total, producto) => total + producto.cantidad,
            0
        );

        contador.textContent = cantidadTotal;
    }
}



const botonesAgregar = document.querySelectorAll(".agregar-carrito");

botonesAgregar.forEach((boton) => {

    boton.addEventListener("click", () => {

        const tarjeta = boton.closest(".tarjeta");

        const nombre = tarjeta.querySelector("h3").textContent.trim();

        const precio = parseFloat(
            tarjeta.querySelector(".precio").textContent.replace("$", "")
        );

        const imagen = tarjeta.querySelector("img").getAttribute("src");

        const productoExistente = carrito.find(
            producto => producto.nombre === nombre
        );

        if (productoExistente) {

            productoExistente.cantidad++;

        } else {

            carrito.push({
                nombre: nombre,
                precio: precio,
                imagen: imagen,
                cantidad: 1
            });

        }

        guardarCarrito();
        actualizarContador();

        alert(nombre + " se agregó a tu pedido ♡");

    });

});


function mostrarCarrito() {

    const contenedor = document.getElementById("productos-carrito");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    if (carrito.length === 0) {

        contenedor.innerHTML = `
            <div class="carrito-vacio">
                <p>Tu carrito está vacío ♡</p>
                <p>¡Agrega tus postres favoritos!</p>
            </div>
        `;

    }

    carrito.forEach((producto, indice) => {

        const elemento = document.createElement("div");

        elemento.classList.add("producto-carrito");

        elemento.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">

            <div class="info-producto">

                <h3>${producto.nombre}</h3>

                <p>$${producto.precio.toFixed(2)}</p>

                <div class="cantidad-producto">

                    <button class="disminuir" data-indice="${indice}">−</button>

                    <span>${producto.cantidad}</span>

                    <button class="aumentar" data-indice="${indice}">+</button>

                </div>

            </div>

            <button class="eliminar-producto" data-indice="${indice}">
                ×
            </button>
        `;

        contenedor.appendChild(elemento);

    });


    const subtotal = carrito.reduce(
        (total, producto) =>
            total + producto.precio * producto.cantidad,
        0
    );

    const subtotalElemento = document.getElementById("subtotal");
    const totalElemento = document.getElementById("total");

    if (subtotalElemento) {
        subtotalElemento.textContent = "$" + subtotal.toFixed(2);
    }

    if (totalElemento) {
        totalElemento.textContent = "$" + subtotal.toFixed(2);
    }


    document.querySelectorAll(".aumentar").forEach((boton) => {

        boton.addEventListener("click", () => {

            const indice = Number(boton.dataset.indice);

            carrito[indice].cantidad++;

            guardarCarrito();
            mostrarCarrito();
            actualizarContador();

        });

    });


    document.querySelectorAll(".disminuir").forEach((boton) => {

        boton.addEventListener("click", () => {

            const indice = Number(boton.dataset.indice);

            carrito[indice].cantidad--;

            if (carrito[indice].cantidad <= 0) {
                carrito.splice(indice, 1);
            }

            guardarCarrito();
            mostrarCarrito();
            actualizarContador();

        });

    });

    document.querySelectorAll(".eliminar-producto").forEach((boton) => {

        boton.addEventListener("click", () => {

            const indice = Number(boton.dataset.indice);

            carrito.splice(indice, 1);

            guardarCarrito();
            mostrarCarrito();
            actualizarContador();

        });

    });

}

actualizarContador();
mostrarCarrito();
