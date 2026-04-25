document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupFaqAccordion();
  setupCourseFilter();
  setupContactForm();
  setCurrentYear();
});

function setupNavigation() {
  const toggleButton = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (!toggleButton || !nav) return;

  toggleButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggleButton.setAttribute('aria-expanded', String(isOpen));
    toggleButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggleButton.setAttribute('aria-expanded', 'false');
      toggleButton.setAttribute('aria-label', 'Open navigation menu');
    });
  });
}

function setupFaqAccordion() {
  const questions = document.querySelectorAll('.faq-question');
  if (!questions.length) return;

  questions.forEach((button) => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      button.setAttribute('aria-expanded', String(!isExpanded));
      answer.hidden = isExpanded;
      const icon = button.querySelector('.faq-icon');
      if (icon) icon.textContent = isExpanded ? '+' : '−';
    });
  });
}

function setupCourseFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  if (!filterButtons.length || !courseCards.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      courseCards.forEach((card) => {
        const category = card.dataset.category;
        const shouldShow = filter === 'all' || filter === category;
        card.classList.toggle('hidden-course', !shouldShow);
      });
    });
  });
}

function setupContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const messageInput = form.querySelector('#message');
  const successMessage = form.querySelector('#form-success');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameValid = validateRequiredField(nameInput, 'Please enter your full name.', 'name-error');
    const emailValid = validateEmailField(emailInput, 'Please enter a valid email address.', 'email-error');
    const messageValid = validateMessageField(messageInput, 'Please enter at least 10 characters.', 'message-error');

    if (nameValid && emailValid && messageValid) {
      successMessage.textContent = 'Thank you. Your enquiry has been submitted successfully.';
      form.reset();
      clearValidationState(nameInput, 'name-error');
      clearValidationState(emailInput, 'email-error');
      clearValidationState(messageInput, 'message-error');
    } else {
      successMessage.textContent = '';
    }
  });
}

function validateRequiredField(input, message, errorId) {
  const isValid = input.value.trim() !== '';
  toggleValidationMessage(input, errorId, isValid ? '' : message);
  return isValid;
}

function validateEmailField(input, message, errorId) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailPattern.test(input.value.trim());
  toggleValidationMessage(input, errorId, isValid ? '' : message);
  return isValid;
}

function validateMessageField(input, message, errorId) {
  const isValid = input.value.trim().length >= 10;
  toggleValidationMessage(input, errorId, isValid ? '' : message);
  return isValid;
}

function toggleValidationMessage(input, errorId, message) {
  const errorElement = document.getElementById(errorId);
  if (!errorElement) return;

  errorElement.textContent = message;
  input.classList.toggle('input-error', Boolean(message));
}

function clearValidationState(input, errorId) {
  const errorElement = document.getElementById(errorId);
  if (errorElement) errorElement.textContent = '';
  input.classList.remove('input-error');
}

function setCurrentYear() {
  document.querySelectorAll('#current-year').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
}
