const userId = parseInt(document.querySelector('.dashboard-userid').innerText);
const newPostBtn = document.getElementById('new-post');

const closeBtn = document.querySelector('#close-post-form');
const newPostTitle = document.querySelector('#post-title-input').value;
const newPostBody = document.querySelector('#post-body-input').value;

const submitBtn = document.getElementById('submit-post-form');

const leaveAMessage = document.querySelectorAll('.commenting');

const addCommentBtns = document.querySelectorAll('.add-comment');

const postCommentInput = document.querySelectorAll('.article_comment');

const contentDiv = document.querySelectorAll('.content-div');

const commentsList = document.querySelectorAll('.comments-list');

const showComments = document.querySelectorAll('.show-comments');

showComments.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.parentElement.querySelector('.comments-list').classList.toggle('hidden');
  });
});

contentDiv.forEach(async (container) => {
  const postId = parseInt(container.parentElement.querySelector('.articleid').innerText);
  const response = await fetch(`/api/postings/${postId}`);
  const data = await response.json();
  container.innerHTML = `<p>${data.content}</p><div>CREATED AT: ${data.createdAt}</div><div>LAST UPDATED: ${data.updatedAt}</div>`;
});

getAllCars();

commentsList.forEach(async (list) => {
  const postId = list.parentElement.parentElement.querySelector('h6 .articleid').innerText;
  const response = await fetch(`/api/postings/${postId}`);
  const data = await response.json();
  console.log(data);
  data.comments.forEach(comment => {
    const commentCard = document.createElement('div');
    commentCard.classList.add('comment-card');
    commentCard.innerHTML = `<div class="message-left">${comment.comment}</div>
    <div class="time">CREATED AT: ${comment.createdAt}</div><div class="time">LAST UPDATE: ${comment.updatedAt}</div>`;
    list.appendChild(commentCard);
  });
});

addCommentBtns.forEach(button => {
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const postId = button.parentElement.parentElement.parentElement.parentElement.querySelector('h6 .articleid').innerText;
    const comment = button.parentElement.querySelector('.article_comment').value;
    console.log(comment, postId);
    if (!comment) {
      alert('You need to add something before posting a comment');
      return;
    }
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        comment,
        posting_id: parseInt(postId)
      }),
      headers: {'Content-type': 'application/json'}
    });
    if (response.ok) {
      button.parentElement.querySelector('.article_comment').innerText = '';
      document.location.reload();
    } else {
      alert('Something went wrong, try again');
    }
  });
});

postCommentInput.forEach(input => {
  input.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
});

leaveAMessage.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    button.parentElement.querySelector('.comments-wrapper').classList.toggle('invisible');
  });
});

newPostBtn.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  document.querySelector('.new-post-form').classList.remove('invisible');
});

closeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  document.querySelector('.new-post-form').classList.add('invisible');
  document.querySelector('#post-title-input').value = '';
  document.querySelector('#post-body-input').value = '';
});

submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  e.stopPropagation();

  if(!document.querySelector('#post-title-input').value || !document.querySelector('#post-body-input').value) {
    alert('You need add content!');
    return;
  }

  const newPostEntry = {
    title: document.querySelector('#post-title-input').value,
    content: document.querySelector('#post-body-input').value,
    vehicle_id: parseInt(document.querySelector('#select-vehicle').value),
    use_id: userId
  };

  const response = await fetch('/api/postings', {
    method: 'POST',
    body: JSON.stringify(newPostEntry),
    headers: {"Content-type":"application/json"}
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Something went wrong. Try again');
  }
});

async function getAllCars() {
  const response = await fetch('/api/vehicles');
  const data = await response.json();
  data.forEach(car => {
    const option = document.createElement('option');
    option.innerText = car.make + ' ' + car.model;
    option.value = car.id;
    document.querySelector('#select-vehicle').appendChild(option);
  });
}



