const deletePostBtns = document.querySelectorAll('.delete-my-post');





deletePostBtns.forEach((button) => {
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
  });
});