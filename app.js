const form = document.querySelector('#signin-form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const toggle = document.querySelector('#toggle-password');
const status = document.querySelector('#form-status');
const loginButton = document.querySelector('#login-button');

toggle.addEventListener('click', () => {
  const visible = password.type === 'password';
  password.type = visible ? 'text' : 'password';
  toggle.setAttribute('aria-label', visible ? 'Hide password' : 'Show password');
  toggle.setAttribute('aria-pressed', String(visible));
  document.querySelector('#eye-slash').classList.toggle('hidden', !visible);
  document.body.classList.toggle('password-visible', visible);
});

function validate(input) {
  let message = '';
  if (!input.value.trim()) message = `Please enter your ${input.id}.`;
  else if (input.id === 'email' && !input.validity.valid) message = 'Please enter a valid email address.';
  else if (input.id === 'password' && input.value.length < 6) message = 'Use at least 6 characters for this demo.';
  const error = document.querySelector(`#${input.id}-error`);
  error.textContent = message;
  error.classList.toggle('hidden', !message);
  input.setAttribute('aria-invalid', String(Boolean(message)));
  return !message;
}

for (const input of [email, password]) {
  input.addEventListener('input', () => {
    status.textContent = '';
    if (input.getAttribute('aria-invalid') === 'true') validate(input);
  });
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const emailValid = validate(email);
  const passwordValid = validate(password);
  if (!emailValid || !passwordValid) {
    (!emailValid ? email : password).focus();
    return;
  }
  loginButton.disabled = true;
  loginButton.textContent = 'Logging in…';
  await new Promise(resolve => setTimeout(resolve, 650));
  status.textContent = 'You’re all set! This is a demo — no account was accessed or details sent.';
  loginButton.disabled = false;
  loginButton.textContent = 'Log in';
  password.value = '';
  form.dispatchEvent(new CustomEvent('demo-login-success'));
});

function showInfo(title, description) {
  document.querySelector('#dialog-title').textContent = title;
  document.querySelector('#dialog-description').textContent = description;
  document.querySelector('#info-dialog').showModal();
}
document.querySelector('#forgot-password').addEventListener('click', () => showInfo('Forgot your password?', 'This demo is ready for a password reset service. In a connected app, you would receive a secure reset link by email.'));
document.querySelector('#google-login').addEventListener('click', () => showInfo('Continue with Google', 'Google sign-in is a preview in this demo. Connect your Google authentication provider to enable account access.'));
document.querySelector('#signup').addEventListener('click', () => showInfo('A fresh start', 'Account creation is a preview in this demo. Connect a registration service to let new members join.'));
