const createCheckbox = () => {
  const checkboxContainer = document.createElement('div');
  checkboxContainer.classList.add('custom-checkbox');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'myCheckbox';

  const label = document.createElement('label');
  label.htmlFor = 'myCheckbox';
  label.textContent = 'Leí las recomendaciones sobre las entregas, garantía e instalación.';

  checkboxContainer.appendChild(checkbox);
  checkboxContainer.appendChild(label);

  return checkboxContainer;
};

const insertCheckbox = () => {
  const checkoutContainer = document.querySelector('p.newsletter');
  const checkbox = createCheckbox();
  checkoutContainer.appendChild(checkbox);

  const continueButton = document.querySelector('button#go-to-shipping');

  // Elemento para mostrar el mensaje de error
  const errorContainer = document.createElement('div');
  errorContainer.id = 'checkbox-error-message';
  errorContainer.style.color = 'red';

  continueButton.addEventListener('click', function (event) {
    const hasAttribute = checkbox.hasAttribute('data-gtm-form-interact-field-id')
    if (!hasAttribute) {
      // Muestra el mensaje de error
      errorContainer.textContent = 'Debes seleccionar el checkbox para continuar con los datos de envío.';
      
      // Inserta el mensaje de error en el DOM
      checkoutContainer.appendChild(errorContainer);

      // Evita el comportamiento predeterminado del botón (submit)
      event.preventDefault();
    } else {
      // Si el checkbox está marcado, asegúrate de que el mensaje de error esté vacío
      errorContainer.textContent = '';

      // Lógica para continuar con el pago
      console.log('Continuar con el pago...');
    }
  });


checkbox.addEventListener('click', function() {
    // Agrega el atributo cuando el checkbox es clicado
    checkbox.setAttribute('data-gtm-form-interact-field-id', '1');
    console.log('Estado actual del checkbox:', checkbox);
  });
};

// checkbox aceptar terminos

// const createCheckbox = () => {
//   const checkboxContainer = document.createElement('div');
//   checkboxContainer.classList.add('custom-checkbox');

//   const checkbox = document.createElement('input');
//   checkbox.type = 'checkbox';
//   checkbox.id = 'myCheckbox';
//   checkbox.setAttribute('data-gtm-form-interact-field-id', '1'); // Agrega el atributo

//   const label = document.createElement('label');
//   label.htmlFor = 'myCheckbox';
//   label.textContent = 'Leí las recomendaciones sobre las entregas, garantía e instalación.';

//   checkboxContainer.appendChild(checkbox);
//   checkboxContainer.appendChild(label);

//   return checkboxContainer;
// };

// const insertCheckbox = () => {
//   const checkoutContainer = document.querySelector('p.newsletter');
//   const checkbox = createCheckbox();
//   checkoutContainer.appendChild(checkbox);

//   const continueButton = document.querySelector('button#go-to-shipping');

//   continueButton.addEventListener('click', function(event) {
//     const hasAttribute = checkbox.hasAttribute('data-gtm-form-interact-field-id');

//     if (!hasAttribute) {
//       alert('Debes seleccionar el checkbox para continuar con los datos de envío.');
//       event.preventDefault();
//     } else {
//       // Lógica para continuar con el pago
//       console.log('Continuar con el pago...');
//     }
//   });

//   // Si deseas agregar un evento para verificar el cambio después de hacer clic en el checkbox
// checkbox.addEventListener('click', function() {
//     // Agrega el atributo cuando el checkbox es clicado
//     checkbox.setAttribute('data-gtm-form-interact-field-id', '1');
//     console.log('Estado actual del checkbox:', checkbox);
//   });
// };
