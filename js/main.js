const inputs = document.querySelectorAll('form input')

const handleSubmit = async (event) => {
  event.preventDefault();

  if (!validateForm()) return;

  const myForm = event.target;
  const formData = new FormData(myForm);
  const formObject = Object.fromEntries(formData.entries()); // 🔹 Conversión más limpia

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formObject),
    });

    const data = await response.json();
    console.log("Respuesta de la API:", data);

    createModal();
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

const createModal = () => {
  const section = document.createElement('section');
  section.classList.add('form-submitted');

  section.innerHTML = `
    <div class="card">
      <h1>Thanks for your request!</h1>
      <p>We would contact you as soon as we can <i class="fa fa-hourglass-half"></i>.</p>
      <button class="btn btn-primary close-modal">
        <i class="fa fa-long-arrow-left"></i> Back to site
      </button>
    </div>
  `;

  document.body.appendChild(section);

  document.querySelector('.close-modal').addEventListener("click", handleCloseModal);
};

const handleCloseModal = () => {
  const sectionForm = document.querySelector('.form-submitted');
  if (sectionForm) sectionForm.remove();
  cleanForm();
};

const cleanForm = () => {
  inputs.forEach(input => input.value = '');
};

const validateForm = () => {
  let isValid = true;

  inputs.forEach(input => {
    const label = document.querySelector(`label[for='${input.name}']`);

    if (!input.value.trim()) {
      input.classList.add('error');
      label.classList.add('error-label');
      isValid = false;
    } else {
      if (input.name === 'name' && !isValidName(input.value)) {
        label.textContent = 'Only letters and spaces';
        isValid = false;
      } else if (input.name === 'email' && !isValidEmail(input.value)) {
        label.textContent = 'Enter a valid email';
        isValid = false;
      } else {
        input.classList.remove('error');
        label.classList.remove('error-label');
      }
    }
  });

  return isValid;
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
const isValidName = (name) => {
  return /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/.test(name)
}

document.querySelector("form").addEventListener("submit", handleSubmit);