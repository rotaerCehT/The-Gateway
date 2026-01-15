(() => {
  const inputs = {
    'HvsQfsohcf': { url: 'https://youtu.be/1ZGAukq4j5M', action: 'redirect' }
  };
  const form = document.getElementById('secretForm');
  const input = document.getElementById('secretInput');

  function handleAction(item) {
    if (item.action === 'redirect') {
      window.location.assign(item.url);
    } else if (item.action === 'download') {
      const link = document.createElement('a');
      link.href = item.url;
      link.download = '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (inputs[val]) {
      handleAction(inputs[val]);
    }
  });

  input.addEventListener('input', () => {
    const val = input.value.trim();
    if (inputs[val]) handleAction(inputs[val]);
  });
})();
