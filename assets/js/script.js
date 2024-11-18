const nuevaTareaInput = document.querySelector("input");
const btnAgregar = document.querySelector("button");
const tbody = document.querySelector("tbody");

const totalSpan = document.getElementById("total");
const realizadasSpan = document.getElementById("realizadas");

const tareas = [];
let resumen = {
  total: 0,
  realizadas: 0,
};
btnAgregar.addEventListener("click", () => {
  if (nuevaTareaInput.value) {
    agregarTarea(nuevaTareaInput.value);
    refresh();
  } else alert("Debe escribir la descripción de la nueva tarea");
});
const agregarTarea = (nuevaTarea) => {
  const id = Math.floor(Math.random() * 99);
  const tarea = {
    id,
    tarea: nuevaTarea,
    check: false,
  };
  tareas.push(tarea);
  nuevaTareaInput.value = "";
};
const checkInput = (id) => {
  const tarea = tareas.find((tarea) => tarea.id === id);
  const { check } = tarea;
  tarea.check = !check;
  refresh();
};
const eliminarTarea = (id) => {
  const decision = confirm("¿Seguro que quieres eliminar esta tarea?");
  if (decision) {
    const index = tareas.findIndex((tarea) => tarea.id === id);
    tareas.splice(index, 1);
    refresh();
  }
};
const llenarTabla = () => {
  tareas.forEach((tarea) => {
    const list = `
    <tr>
      <td>${tarea.id}</td>
      <td>${tarea.tarea}</td>
      <td class="x-delete">
          <input onchange="checkInput(${tarea.id})" 
            ${tarea.check ? "checked" : ""} type="checkbox"/>
          <span onclick="eliminarTarea(${tarea.id})">❌</span>
      </td>
    </tr>
    `;
    tbody.innerHTML += list;
  });
};
const crearTabla = () => (tbody.innerHTML = "");

const calcularResumen = () => {
  let total = tareas.length;
  let realizadas = tareas.filter((tarea) => tarea.check === true).length;

  resumen = { total: total, realizadas: realizadas };
};
const actualizaResultado = () => {
  totalSpan.innerHTML = resumen.total;
  realizadasSpan.innerHTML = resumen.realizadas;
};

const refresh = () => {
  crearTabla();
  llenarTabla();
  calcularResumen();
  actualizaResultado();
};
