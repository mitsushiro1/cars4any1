const logoutBtn = document.querySelector('#log-out-account');

logoutBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  e.stopPropagation();
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
});