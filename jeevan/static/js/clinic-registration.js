(() => {
  document.querySelectorAll('.registration-password-toggle').forEach(toggle => {
    const input = document.getElementById(toggle.dataset.target);
    toggle.addEventListener('click', () => {
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      toggle.textContent = show ? 'Hide' : 'Show';
      toggle.setAttribute('aria-pressed', String(show));
      const name = document.querySelector(`label[for="${input.id}"]`).textContent;
      toggle.setAttribute('aria-label', `${show ? 'Hide' : 'Show'} ${name.toLowerCase()}`);
    });
  });
  const form = document.getElementById('registrationForm');
  const password = document.getElementById('id_password');
  const confirm = document.getElementById('id_confirm_password');
  const submit = document.getElementById('registrationSubmit');
  const status = document.getElementById('registrationStatus');
  const match = () => confirm.setCustomValidity(confirm.value && confirm.value !== password.value ? 'Passwords do not match.' : '');
  password.addEventListener('input', match);
  confirm.addEventListener('input', match);
  let timer;
  function reset() {
    clearTimeout(timer);
    submit.disabled = false;
    submit.textContent = 'Create Account';
    form.removeAttribute('aria-busy');
    status.textContent = '';
  }
  form.addEventListener('submit', () => {
    submit.disabled = true;
    submit.textContent = 'Creating account…';
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Creating your patient account…';
    timer = setTimeout(() => {
      reset();
      status.textContent = 'Taking longer than expected. Check your connection before trying again.';
    }, 15000);
  });
  window.addEventListener('pageshow', reset);
})();
