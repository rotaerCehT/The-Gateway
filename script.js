(() => {
  const inputs = {
    'HvsQfsohcf': 'https://youtu.be/Y9MfJp9h9EI'
  };
  const form = document.getElementById('secretForm');
  const input = document.getElementById('secretInput');

  function doRedirect(url) {
    window.location.assign(url);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (inputs[val]) {
      doRedirect(inputs[val]);
    }
  });

  input.addEventListener('input', () => {
    const val = input.value.trim();
    if (inputs[val]) doRedirect(inputs[val]);
  });
})();


