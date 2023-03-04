const deletePostBtns = document.querySelectorAll('.delete-my-post');

const deleteCommentBtns = document.querySelectorAll('.delete-my-comment');

const updatePostBtns = document.querySelectorAll('.update-my-post');

const updateCommentBtns = document.querySelectorAll('.update-my-comment');

let postIdToUpdate;
let commentIdToUpdate;

deletePostBtns.forEach((button) => {
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const idToDelete = button.parentElement.querySelector('.manage-post-id').innerText;
    console.log(idToDelete);

    const response = await fetch(`/api/postings/${idToDelete}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Something went wrong, try again');
    };
  });
});

deleteCommentBtns.forEach((button) => {
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const idToDelete = button.parentElement.querySelector('.manage-comment-id').innerText;
    console.log(idToDelete);

    const response = await fetch(`/api/comments/${idToDelete}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Something went wrong, try again');
    };
  });
});

updatePostBtns.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    postIdToUpdate = button.parentElement.querySelector('.manage-post-id').innerText;
    console.log(postIdToUpdate);
  });
});

updateCommentBtns.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    commentIdToUpdate = button.parentElement.querySelector('.manage-comment-id').innerText;
    console.log(commentIdToUpdate);
  });
});