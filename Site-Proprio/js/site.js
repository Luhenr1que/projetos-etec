document.querySelectorAll('form[data-step]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const step = Number(form.dataset.step);
    if (step < 3) { form.reset(); window.location.href = step === 1 ? 'Senha.html' : 'Finalização.html'; return; }
    form.reset();
    const message = form.querySelector('.form-message');
    message.textContent = 'Tudo certo! Você concluiu a demonstração. Nenhum dado foi salvo ou enviado.';
    message.tabIndex = -1;
    message.focus();
  });
});
const reveal = document.querySelector('.reveal');
if (reveal) reveal.addEventListener('click', () => {
  const input = document.getElementById('password');
  const visible = input.type === 'password';
  input.type = visible ? 'text' : 'password';
  reveal.textContent = visible ? 'Ocultar' : 'Mostrar';
  reveal.setAttribute('aria-pressed', String(visible));
});
const birthday = document.getElementById('birthday');
if (birthday) {
 const today = new Date();
 birthday.max = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
}
