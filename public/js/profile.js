const updateEmailBtn = document.getElementById('update-email');
const CE_close = document.getElementById('CE-close');
const CA_yes = document.getElementById('CA-yes');
const CA_no = document.getElementById('CA-no');
const updateAccountBtn = document.getElementById('update-account');

const CE_update = document.getElementById('CE-update');

const userid = parseInt(document.getElementById('profile-userid').innerText);


updateEmailBtn.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  document.querySelector('.change-email').classList.remove('hide');
});

CE_close.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  document.querySelector('.change-email').classList.add('hide');
});

updateAccountBtn.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  document.querySelector('.change-account').classList.remove('hide');
});

CA_no.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  document.querySelector('.change-account').classList.add('hide');
});

CE_update.addEventListener('click', async (e) => {
  e.preventDefault();
  e.stopPropagation();
  const newEmail = document.querySelector('.change-email #new-email').value;
  console.log(newEmail);
  const response = await fetch(`/api/users/${userid}`, {
    method: 'PATCH',
    body: JSON.stringify({
      email: newEmail
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    await fetch('/api/users/logout', {
      method: 'POST'
    });
    document.location.reload();
  } else {
    alert('Something went wrong, please try again');
  }
});

CA_yes.addEventListener('click', async (e) => {
  e.preventDefault();
  e.stopPropagation();
  const newValue = document.querySelector('#profile-is-vendor').innerText === 'false' ? true : false;
  console.log(newValue);

  const response = await fetch(`/api/users/${userid}`, {
    method: 'PATCH',
    body: JSON.stringify({
      is_vendor: newValue
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    await fetch('/api/users/logout', {
      method: 'POST'
    });
    document.location.reload();
  } else {
    alert('Something went wrong, please try again');
  }
});