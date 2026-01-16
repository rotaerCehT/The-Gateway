(() => {
  const inputs = {
    'HvsQfsohcf': { action: 'redirect', url: 'https://youtu.be/1ZGAukq4j5M', mode: 'manual' },
    '1827144': { action: 'notify', message: 'task 1', mode: 'manual', next: 'Dload task 1 congratulation' },
    'Dload task 1 congratulation': { action: 'download', url: 'The first steps.txt', mode: 'auto' }
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
    } else if (item.action === 'notify') {
      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.className = 'name-input';
      nameInput.placeholder = 'Your name, please friend';
      nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const name = nameInput.value.trim();
          if (name) {
            const message = `${name} has completed ${item.message}`;
            fetch('https://ntfy.sh/ARG_completions', {
              method: 'POST',
              body: message,
              headers: {
                'Content-Type': 'text/plain'
              }
            }).then(() => {
              document.body.removeChild(nameInput);
              // Trigger subsequent actions after notify completes
              if (item.next) {
                const nexts = Array.isArray(item.next) ? item.next : [item.next];
                nexts.forEach(n => handleAction(inputs[n]));
              }
            }).catch(err => {
              alert('But it was not sent. please try again in 5 minutes.');
            });
          }
        }
      });
      document.body.appendChild(nameInput);
      nameInput.focus();
    } else {
      // For other actions, trigger next immediately
      if (item.next) {
        const nexts = Array.isArray(item.next) ? item.next : [item.next];
        nexts.forEach(n => handleAction(inputs[n]));
      }
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (inputs[val] && inputs[val].mode === 'manual') {
      handleAction(inputs[val]);
    }
  });

  input.addEventListener('input', () => {
    const val = input.value.trim();
    if (inputs[val] && inputs[val].mode === 'manual') handleAction(inputs[val]);
