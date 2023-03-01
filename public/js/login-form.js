async function formHandler() {
  console.log('Working');
  const email = document.querySelector('#email-input').value.trim();
  const password = document.querySelector('#password-input').value.trim();
  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in. Please try again');
    }
  }
}

document.querySelector('#signin-button').addEventListener('click', (e) => {
  e.preventDefault();
  formHandler();
});