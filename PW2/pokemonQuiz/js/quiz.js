document.querySelectorAll('.text').forEach(answer => {
  answer.addEventListener('click', event => {
    if (event.target.closest('input, label')) return;
    const radio = answer.querySelector('input[type="radio"]');
    if (radio) { radio.checked = true; radio.dispatchEvent(new Event('change', { bubbles: true })); }
  });
});
document.querySelectorAll('form').forEach(form => {
  window.addEventListener('pageshow', () => form.querySelectorAll('[type="submit"]').forEach(button => button.disabled = false));
  form.addEventListener('submit', () => form.querySelectorAll('[type="submit"]').forEach(button => button.disabled = true));
});
