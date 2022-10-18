//Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulos_compras = [];

registrar();
function registrar() {
  // Cuando agregas un curso presionando 'Agregar al carrito'
  listaCursos.addEventListener("click", agregarCurso);

  //Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  // Al Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", limpiarHTML);
}

// Funciones
function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const curso_selecionado = e.target.parentElement.parentElement;

    leerDatosCurso(curso_selecionado);
  }
}

// Elimina un curso del carrito
function eliminarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("borrar-curso")) {
    // e.target.parentElement.parentElement.remove();
    const cursoId = e.target.getAttribute("data-id");

    // Eliminar del arreglo del carrito
    articulos_compras = articulos_compras.filter(
      (curso) => curso.id !== cursoId
    );

    carritoHTML();
  }
}

// Lee el contenido del HTML al que dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
  // console.log(curso);

  //Crear un objeto con el contenido actual
  const info_curso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // Revisa si un elemento ya existe en el carrito
  const existe = articulos_compras.some((curso) => curso.id === info_curso.id);
  if (existe) {
    // Actualizamos la cantidad
    const cursos = articulos_compras.map((curso) => {
      if (curso.id === info_curso.id) {
        curso.cantidad++;
        return curso; // retorna el objeto actualizado
      } else {
        return curso; // retorna los objetos que no son duplicados
      }
    });
    articulos_compras = [...cursos];
  } else {
    // Agrega elementos al arreglo de carrito
    articulos_compras = [...articulos_compras, info_curso];
  }

  console.log(articulos_compras);

  carritoHTML();
}

// Guardar el carrito de compra en el HTML
function carritoHTML() {
  // Limpiar el HTML
  limpiarHTML();

  // Recorre el carrito y genera el HTML
  articulos_compras.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>  
      <img src="${imagen}" width=100>
    </td>
    <td>${titulo}</td>
    <td>${precio}</td>
    <td>${cantidad} </td>
    <td>
      <a href="#" class="borrar-curso" data-id="${id}">X</a>
    </td>
    `;

    // Agrega el HTML en el carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

// Eliminar los cursos del tbody
function limpiarHTML() {
  // Forma lenta
  // contenedorCarrito.innerHTML = '';

  // version mas rapida con while, borra los elementos hijos, compara si hay otro de vuelta y vuelve a borrar.
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
