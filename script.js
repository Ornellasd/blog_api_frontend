const messageModal = document.querySelector('#newMessageDialog');
const messageForm = document.querySelector('#message-form');
const newMessageModalBtn = document.querySelector('#new-message-modal-btn');
const closeModalBtn = document.querySelector('#close-dialog-btn');
let messageContainer = document.querySelector('#message-container');

async function fetchMessages(messagesEndpoint) {
  const response = await fetch(messagesEndpoint);
  const data = await response.json();

  return data;
}

const displayMessages = (data) => {
  data.forEach(obj => {
    const div = document.createElement('div');
    const title = document.createElement('p');
    const messageText = document.createElement('p');
    const deleteBtn = document.createElement('a');

    div.classList += 'nes-container with-title message-box';
    title.classList += 'title';
    deleteBtn.classList += 'nes-btn is-error is-small';

    title.textContent = obj['title'];
    messageText.textContent = obj['text'];
    deleteBtn.textContent = 'Delete';
    deleteBtn.href = `http://localhost:3000/message/${obj._id}/delete`;

    // change to only append new objects if they dont already exist or just redo messageContainer each time
    div.appendChild(title);
    div.appendChild(messageText);
    div.appendChild(deleteBtn);
    messageContainer.appendChild(div);

    deleteBtn.addEventListener('click', () => {
      console.log('delete ' + obj._id);
    });

    console.log(obj);
  });
}

const deleteMessage = () => {

}

const postForm = (body) => {
  return fetch('http://localhost:3000/message/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
}

const handleSubmit = (e) => {
  e.preventDefault();
  const body = JSON.stringify(Object.fromEntries(new FormData(e.target)));

  messageModal.close();
  postForm(body);
  
  fetchMessages('http://localhost:3000/messages').then(data => {
    displayMessages(data);
  });
}

messageForm.addEventListener('submit', handleSubmit);

newMessageModalBtn.addEventListener('click', () => {
  messageModal.showModal();
});

closeModalBtn.addEventListener('click', () => {
  messageModal.close();
});

fetchMessages('http://localhost:3000/messages').then(data => {
  displayMessages(data);
});
