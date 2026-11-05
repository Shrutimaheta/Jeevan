(() => {
  const form = document.getElementById('loginForm');
  const password = document.getElementById('password');
  const toggle = document.getElementById('passwordToggle');
  const submit = document.getElementById('loginButton');
  const status = document.getElementById('loginStatus');
  toggle.addEventListener('click', () => {
    const show = password.type === 'password';
    password.type = show ? 'text' : 'password';
    toggle.textContent = show ? 'Hide' : 'Show';
    toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    toggle.setAttribute('aria-pressed', String(show));
  });
  let resetTimer;
  function reset() {
    clearTimeout(resetTimer);
    password.type = 'password';
    toggle.textContent = 'Show';
    toggle.setAttribute('aria-label', 'Show password');
    toggle.setAttribute('aria-pressed', 'false');
    submit.disabled = false;
    submit.textContent = 'Sign In';
    form.removeAttribute('aria-busy');
    status.textContent = '';
  }
  form.addEventListener('submit', () => {
    submit.disabled = true;
    submit.textContent = 'Signing in…';
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Checking your account…';
    resetTimer = setTimeout(() => {
      reset();
      status.textContent = 'Taking longer than expected. Check your connection before trying again.';
    }, 15000);
  });
  window.addEventListener('pageshow', reset);
})();
