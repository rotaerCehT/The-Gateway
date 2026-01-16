(() => {
  const inputs = {
    'HvsQfsohcf': { action: 'redirect', url: 'https://youtu.be/1ZGAukq4j5M' },
    '1827144': { action: 'notify', message: 'task 1' }
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
      const nameDiv = document.createElement('div');
      nameDiv.innerHTML = `
        <input type="text" id="nameInput" placeholder="Your name, please friend" />
        <button id="sendBtn">Confirm.</button>
      `;
      document.body.appendChild(nameDiv);
      document.getElementById('sendBtn').addEventListener('click', () => {
        const name = document.getElementById('nameInput').value.trim();
        if (name) {
          const message = `${name} has completed ${item.message}`;
          fetch('https://ntfy.sh/ARG_completions', {
            method: 'POST',
            body: message,
            headers: {
              'Content-Type': 'text/plain'
            }
          }).then(() => {
            alert('Notification sent!');
            document.body.removeChild(nameDiv);
          }).catch(err => {
            alert('Error sending notification: ' + err);
          });
        }
      });
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
