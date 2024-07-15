//Arreglo que contiene las respuestas correctas
let correctas = [1,3,1,2,2];

//Arreglo donde se guardan las respuestas del usuario
let opcion_elegida = [];

let cantidad_correctas = 0;

//Funcion que toma el num de la pregunta y el input de esa pregunta

function respuesta(num_pregunta, seleccionada){
    //Guardo la respuesta elegida
    opcion_elegida[num_pregunta] = seleccionada.value;
    //console.log(opcion_elegida);

    //Poner en color blanco los inputs para cuando elige otra opcion
    //Armo el id para seleccionar el section correspondiente
    let id = `p${num_pregunta}`;
    //console.log(id);

     // Obtener el section correspondiente usando querySelector
    let section = document.querySelector(`#${id}`);
     // Obtener todas las etiquetas <label> dentro del section
    let labels = section.querySelectorAll('label');

     // Iterar sobre cada label y poner su fondo blanco
    labels.forEach(label => {
        label.style.backgroundColor = 'white';
    });
 
     // Dar color al label seleccionado
    seleccionada.parentNode.style.backgroundColor = '#cec0fc';
}

//Funcion que compara los arreglos para saber cuantas estuvieron correctas
function corregir(){

    // Obtener el campo del nombre y el error span
    let nombreInput = document.getElementById('nombre');
    let nombreError = document.getElementById('nombre-error');

    // Validar si el campo de nombre está vacío o no cumple con el patrón
    if (!nombreInput.checkValidity()) {
        nombreError.style.display = 'block';
        return; // No continuar con la corrección
    } else {
        nombreError.style.display = 'none';
    }

    cantidad_correctas = 0;
    for(let i=0; i<correctas.length; i++){
        if(correctas[i] == opcion_elegida[i]){
            cantidad_correctas++;
        }
    }

    // Calcular la nota final
    let notaFinal = 2 * cantidad_correctas;

    document.getElementById('resultado').innerHTML = cantidad_correctas;
    document.getElementById('nota').innerHTML = 'NOTA: ' + notaFinal;

    // Llamar a la función para guardar en la base de datos
    insertNotas(nombreInput.value, notaFinal);
}

// Función para reiniciar el cuestionario
function reiniciar() {
    // Reiniciar el arreglo de respuestas del usuario
    opcion_elegida = [];

    // Reiniciar la cantidad de correctas
    cantidad_correctas = 0;

    // Resetear todos los inputs de radio y los estilos de los labels
    let radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        radio.checked = false;
        radio.parentNode.style.backgroundColor = 'white';
    });

    // Limpiar los resultados y la nota
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('nota').innerHTML = '';
}

async function insertNotas(nombre, nota) {
    try {
        const response = await fetch('http://localhost:3000/insertNotas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, nota })
        });
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error al insertar las notas:', error);
    }
}