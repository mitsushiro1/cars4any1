const deletePostBtns = document.querySelectorAll('.delete-my-post');

const deleteCommentBtns = document.querySelectorAll('.delete-my-comment');

const updatePostBtns = document.querySelectorAll('.update-my-post');

const updateCommentBtns = document.querySelectorAll('.update-my-comment');

const closeUpdatePostBtn = document.querySelector('#close-update-post-form');

const submitUpdatedPost = document.querySelector('#submit-updated-post');

let postIdToUpdate;
let commentIdToUpdate;

closeUpdatePostBtn.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  document.querySelector('#update-post-form').classList.add('invisible');
});

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
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    postIdToUpdate = button.parentElement.querySelector('.manage-post-id').innerText;
    console.log(postIdToUpdate);
    document.querySelector('#update-post-form').classList.remove('invisible');
    
    const response = await fetch(`/api/postings/${postIdToUpdate}`, {
      method: 'GET'
    });
    const data = await response.json();
    console.log(data);
    const titleInput = document.querySelector('#update-post-title-input');
    titleInput.value = data.title;
    const textArea = document.querySelector('#update-post-textarea');
    console.log(textArea);
    textArea.value = data.content;
  });
});

submitUpdatedPost.addEventListener('click', async (e) => {
  e.preventDefault();
  e.stopPropagation();
  const newTitle = document.querySelector('#update-post-title-input').value;
  const newContent = document.querySelector('#update-post-textarea').value;
  const newObj = {
    title: newTitle,
    content: newContent
  }
  console.log(newObj);
  const response = await fetch(`/api/postings/${postIdToUpdate}`, {
    method: 'PATCH',
    body: JSON.stringify(newObj),
    headers: {"Content-type":"application/json"}
  });
  if (response.ok) {
    document.location.reload();
  } else {
    alert('Something went wrong, try again');
  }
});

updateCommentBtns.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    commentIdToUpdate = button.parentElement.querySelector('.manage-comment-id').innerText;
    console.log(commentIdToUpdate);
  });
});

