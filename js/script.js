console.log("¡scripts.js cargado correctamente!");

$(document).ready(function () {
  // --- VALIDACIÓN DE FORMULARIO ---
  $('#formulario').on('submit', function (e) {
    e.preventDefault();

    const nombre = $('#nombre');
    const correo = $('#correo');
    let valid = true;

    if (!nombre.val()) {
      nombre.addClass('is-invalid');
      valid = false;
    } else {
      nombre.removeClass('is-invalid');
    }

    if (!correo.val() || !correo.val().includes('@')) {
      correo.addClass('is-invalid');
      valid = false;
    } else {
      correo.removeClass('is-invalid');
    }

    if (valid) {
      alert(`Gracias por tu mensaje, ${nombre.val()}! Nos pondremos en contacto contigo.`);
      $(this).trigger('reset');
    }
  });

  // --- TEST INTERACTIVO DE SEGURIDAD ---
  const preguntas = [
    {
      texto: "¿Es recomendable usar la misma contraseña en todos los sitios?",
      correcta: false
    },
    {
      texto: "¿Es recomendable evitar conectarte a redes Wi-Fi públicas sin protección?",
      correcta: true
    },
    {
      texto: "¿Deberías actualizar regularmente tu sistema operativo?",
      correcta: true
    }
  ];

  let indice = 0;
  let aciertos = 0;

  function iniciarTest() {
    indice = 0;
    aciertos = 0;
    mostrarPregunta();
  }

  function mostrarPregunta() {
    const contenedor = $('#preguntaContainer');
    const pregunta = preguntas[indice];

    contenedor.html(`
      <p><strong>Pregunta ${indice + 1}:</strong> ${pregunta.texto}</p>
      <button id="btn-si" class="btn btn-outline-success me-2">Sí</button>
      <button id="btn-no" class="btn btn-outline-danger">No</button>
    `);

    $('#respuesta').html('');

    $('#btn-si').on('click', () => responderTest(true));
    $('#btn-no').on('click', () => responderTest(false));
  }

  function responderTest(respuestaUsuario) {
    const pregunta = preguntas[indice];
    const correcta = pregunta.correcta === respuestaUsuario;

    if (correcta) {
      aciertos++;
      $('#respuesta').html(`<span class='text-success'>¡Correcto!</span>`);
    } else {
      $('#respuesta').html(`<span class='text-danger'>Incorrecto.</span>`);
    }

    indice++;

    if (indice < preguntas.length) {
      setTimeout(() => mostrarPregunta(), 1000);
    } else {
      setTimeout(() => {
        const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalTest'));
        modal.hide();
        setTimeout(() => {
          if (aciertos === 3) {
            alert("🎉 ¡Excelente! Conoces muy bien los fundamentos de la ciberseguridad.");
          } else if (aciertos === 2) {
            alert("✅ Vas por buen camino. ¡Sigue practicando!");
          } else if (aciertos === 1) {
            alert("⚠️ Necesitas estudiar un poco más.");
          } else {
            alert("❌ Te recomendamos leer toda la información nuevamente.");
          }
        }, 500);
      }, 1200);
    }
  }

  // ✅ Cargar el test correctamente al abrir el modal
  $('#modalTest').on('show.bs.modal', function () {
    setTimeout(() => {
      console.log("Modal abierto, iniciando test...");
      iniciarTest();
    }, 300); // Pequeña espera para asegurar que el DOM esté listo
  });
});