/** @format */
import projects from './projects.js';

// For Projects
const projectsContainer = document.getElementById('projectsContainer');
const modalContainer = document.getElementById('modalContainer');
const modalOverlay = document.getElementById('modalOverlay');

projects.forEach((project) => {
  const {
    title, img, desc, metas, stacks,
  } = project;

  const projectTemplate = document.getElementById('projectTemplate');
  const projectClone = document.importNode(projectTemplate.content, true);

  projectClone.getElementById('projectTitle').textContent = title;
  projectClone.getElementById('projectDesc').textContent = desc.slice(0, 50);
  projectClone.getElementById('projectImg').src = img;

  metas.forEach((meta) => {
    const metaElement = document.createElement('li');
    metaElement.textContent = meta;
    projectClone.getElementById('projectMeta').appendChild(metaElement);
  });

  stacks.forEach((stack) => {
    const stackElement = document.createElement('li');
    stackElement.textContent = stack;
    projectClone.getElementById('projectStacks').appendChild(stackElement);
  });

  const seeProjectBtn = projectClone.getElementById('openModal');
  seeProjectBtn.addEventListener('click', () => {
    modalContainer.innerHTML = '';

    const template = document.getElementById('modalTemplate');
    const modalClone = document.importNode(template.content, true);

    modalClone.getElementById('modalImg').src = img;
    modalClone.getElementById('modalTitle').textContent = title;
    modalClone.getElementById('modalDesc').textContent = desc;

    metas.forEach((meta) => {
      const metaElement = document.createElement('li');
      metaElement.textContent = meta;
      modalClone.getElementById('modalMeta').appendChild(metaElement);
    });

    stacks.forEach((stack) => {
      const stackElement = document.createElement('li');
      stackElement.textContent = stack;
      modalClone.getElementById('modalStacks').appendChild(stackElement);
    });

    const modalCloseBtn = modalClone.getElementById('closeModal');

    modalContainer.setAttribute('modal-visible', true);
    modalOverlay.setAttribute('overlay-visible', true);
    modalCloseBtn.addEventListener('click', () => {
      modalContainer.setAttribute('modal-visible', false);
      modalOverlay.setAttribute('overlay-visible', false);
    });

    modalContainer.appendChild(modalClone);
  });

  projectsContainer.appendChild(projectClone);
});

// For Navigation
const primaryNav = document.querySelector('.primary-navigation');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navItems = document.querySelectorAll('.nav-link');

mobileNavToggle.addEventListener('click', () => {
  const mobileNavVisible = primaryNav.getAttribute('mobileNav-visible') === 'true';

  primaryNav.setAttribute('mobileNav-visible', !mobileNavVisible);
  mobileNavToggle.setAttribute('aria-expanded', !mobileNavVisible);
  document.body.classList.toggle('mobile-navigation-open', !mobileNavVisible);
});

navItems.forEach((navItem) => navItem.addEventListener('click', () => {
  primaryNav.setAttribute('mobileNav-visible', false);
  mobileNavToggle.setAttribute('aria-expanded', false);
  document.body.classList.remove('mobile-navigation-open');
}));

// Validation
const form = document.querySelector('.contact__form');
const emailInput = document.querySelector('input[name="email"]');
const submitButton = document.querySelector('button[type="submit"]');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const lowercaseEmail = email.toLowerCase();

  if (email !== lowercaseEmail) {
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'The email address must be in lowercase.';
    submitButton.appendChild(errorMessage);
    emailInput.addEventListener('input', () => {
      const errorMessage = submitButton.querySelector('.error-message');
      if (errorMessage) errorMessage.remove();
    });
    return;
  }

  form.submit();
});

// Local Storage
const inputFields = document.querySelectorAll('#formInput');

function saveFormData() {
  const formData = {};
  inputFields.forEach((inputField) => {
    formData[inputField.name] = inputField.value;
    const jsonFormData = JSON.stringify(formData);
    localStorage.setItem('formData', jsonFormData);
  });
}
function loadFormData() {
  const jsonFormData = localStorage.getItem('formData');
  if (jsonFormData) {
    const formData = JSON.parse(jsonFormData);
    inputFields.forEach((inputField) => {
      inputField.value = formData[inputField.name];
    });
  }
}
inputFields.forEach((inputField) => {
  inputField.addEventListener('change', saveFormData);
});
window.addEventListener('load', loadFormData);