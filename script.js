document.addEventListener('DOMContentLoaded', () => {

    // --- Consejos Éticos ---
    const botonConsejos = document.getElementById('mostrar-mas-consejos');
    const listaConsejos = document.getElementById('lista-consejos');
    const masConsejos = [
        "Respeta los derechos de autor: No uses IA para reescribir contenido que ya está protegido.",
        "Considera el sesgo: Sé consciente de que la IA puede tener sesgos en sus respuestas. ¡Sé crítico!",
        "La IA no tiene conciencia: Recuerda que es una herramienta sin juicio moral. La responsabilidad es tuya."
    ];

    if (botonConsejos) {
        botonConsejos.addEventListener('click', () => {
            masConsejos.forEach(consejo => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${consejo.split(':')[0]}:</strong>${consejo.split(':')[1] || ''}`;
                listaConsejos.appendChild(li);
            });
            botonConsejos.style.display = 'none'; // Oculta el botón después de usarse
        });
    }

    // --- Casos de Estudio ---
    const botonesCasos = document.querySelectorAll('.boton-caso');
    botonesCasos.forEach(boton => {
        boton.addEventListener('click', () => {
            const respuesta = boton.nextElementSibling;
            respuesta.classList.toggle('hidden');
            if (respuesta.classList.contains('hidden')) {
                boton.textContent = 'Ver respuesta';
            } else {
                boton.textContent = 'Ocultar respuesta';
            }
        });
    });

    // --- Reflexiones de Estudiantes ---
    const formulario = document.getElementById('formulario-reflexion');
    const mensajesContainer = document.getElementById('mensajes-recibidos');
    const botonBorrar = document.getElementById('borrar-mensajes');

    function mostrarMensajes() {
        mensajesContainer.innerHTML = '';
        const mensajesGuardados = JSON.parse(localStorage.getItem('reflexiones')) || [];

        if (mensajesGuardados.length === 0) {
            mensajesContainer.innerHTML = '<p>No hay reflexiones para mostrar.</p>';
            return;
        }

        mensajesGuardados.forEach(mensaje => {
            const divMensaje = document.createElement('div');
            divMensaje.classList.add('mensaje');
            divMensaje.innerHTML = `
                <h4>${mensaje.nombre}</h4>
                <p><strong>Correo:</strong> ${mensaje.correo}</p>
                <p><strong>Reflexión:</strong> ${mensaje.mensaje}</p>
            `;
            mensajesContainer.appendChild(divMensaje);
        });
    }

    if (mensajesContainer) {
        mostrarMensajes();
    }

    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            if (nombre === '' || correo === '' || mensaje === '') {
                alert('Por favor, completa todos los campos.');
                return;
            }

            const nuevaReflexion = { nombre, correo, mensaje };
            const mensajesGuardados = JSON.parse(localStorage.getItem('reflexiones')) || [];
            mensajesGuardados.push(nuevaReflexion);
            localStorage.setItem('reflexiones', JSON.stringify(mensajesGuardados));

            formulario.reset();
            mostrarMensajes();
            alert('¡Reflexión enviada con éxito!');
        });
    }

    if (botonBorrar) {
        botonBorrar.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres borrar todas las reflexiones?')) {
                localStorage.removeItem('reflexiones');
                mostrarMensajes();
                alert('Mensajes borrados.');
            }
        });
    }
});