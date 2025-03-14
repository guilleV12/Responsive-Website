const formModal = document.querySelector('.form-submitted')
const inputs = document.querySelector('form').querySelectorAll('input')

const handleSubmit = (event) => {
  event.preventDefault();

  const myForm = event.target;
  const formData = new FormData(myForm);
  const formObject = {};

  // Convertir formData en un objeto JS
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  if (!validateForm()) {
    return
  }
 
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formObject)
  })
    .then(response => response.json())
    .then(data => {
      createModal()
      console.log("Respuesta de la API:", data)
    })
    .catch(error => console.error("Error en la solicitud:", error));
};

const createModal = () => {
  const section = document.createElement('section')
  section.classList.add('form-submitted')

  const div = document.createElement('div')
  div.classList.add('card')
  div.innerHTML = `<h1>Thanks for your request!</h1>
        <p>
          We would contact you as soon as we can <i class="fa fa-hourglass-half"></i> .
        </p>
        <button class="btn btn-primary close-modal"><i class="fa fa-long-arrow-left"></i> Back to site</button>`
  
  section.appendChild(div)
  document.body.appendChild(section)

  document.querySelector('.close-modal').addEventListener("click", handleCloseModal)
}

const handleCloseModal = () => {
  const sectionForm = document.querySelector('.form-submitted')
  sectionForm.remove()
  cleanForm()
}

const cleanForm = () => {
  inputs.forEach(input => {
    input.value = ''
  })
}

const validateForm = () => {
  let isValid = true

  inputs.forEach(input => {
    if (input.value === '') {
      input.classList.add('error')
      isValid = false
      document.querySelector(`label[for='${input.name}']`).classList.add('error-label')
    } else {
      if (input.name === 'name') {
        if (!isValidName(input.value)) {
          document.querySelector(`label[for='name']`).textContent = 'Only letters and spaces'
          return
        }
      }
      if (input.name === 'email') {
        if (!isValidEmail(input.value)) {
          document.querySelector(`label[for='email']`).textContent = 'Enter a valid email'
          return
        }
      }
      input.classList.remove('error')
      document.querySelector(`label[for='${input.name}']`).classList.remove('error-label')
    }
  })
  console.log(isValid)
  return isValid
}

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const isValidName = (name) => {
  return /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/.test(name)
}

document.querySelector("form").addEventListener("submit", handleSubmit);