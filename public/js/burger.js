const burgerBtn = document.querySelector('#burger-btn');
const navBar = document.querySelector('.hidden-nav-bar');

burgerBtn.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  navBar.classList.toggle('hidden');
});

const searchDiv = document.querySelector('.search');
const btn = document.querySelector('#search-btn');
const input = document.querySelector('.input');

btn.addEventListener('click', () => {
  searchDiv.classList.toggle('active');
});
