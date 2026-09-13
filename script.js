// Validación de formulario 

const form = document.getElementById('contact-form'); 

form.addEventListener('submit', function(e) { 

    e.preventDefault(); 

    const nombre = document.getElementById('nombre').value.trim(); 
    const email = document.getElementById('email').value.trim(); 

    // Validar nombre 

    if (nombre.length < 3) { 

        alert('Nombre debe tener al menos 3 caracteres'); 
        return; 

    }
     
    // Validar email 

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (!emailRegex.test(email)) { 

        alert('Email no válido'); 
        return; 

    } 

    alert('Formulario válido. En producción se enviaría.'); 

}); 