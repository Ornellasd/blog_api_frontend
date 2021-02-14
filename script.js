const messageModal = document.querySelector('#newMessageDialog');
const messageForm = document.querySelector('#message-form');
const newMessageModalBtn = document.querySelector('#new-message-modal-btn');
const closeModalBtn = document.querySelector('#close-dialog-btn');
let messageContainer = document.querySelector('#message-container');

async function fetchMessages(messagesEndpoint) {
  const response = await fetch(messagesEndpoint);
  const data = await response.json();

  displayMessages(data);
}

const displayMessages = (data) => {
  data.forEach(obj => {
    const div = document.createElement('div');
    const title = document.createElement('p');
    const messageText = document.createElement('p');
    const deleteBtn = document.createElement('button');

    div.classList += 'nes-container with-title message-box';
    title.classList += 'title';
    deleteBtn.classList += 'nes-btn is-error is-small';

    title.textContent = obj['title'];
    messageText.textContent = obj['text'];
    deleteBtn.textContent = 'Delete';

    div.appendChild(title);
    div.appendChild(messageText);
    div.appendChild(deleteBtn);
    messageContainer.appendChild(div);

    console.log(obj);
  });
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
}

messageForm.addEventListener('submit', handleSubmit);

newMessageModalBtn.addEventListener('click', () => {
  messageModal.showModal();
});

closeModalBtn.addEventListener('click', () => {
  messageModal.close();
});

fetchMessages('http://localhost:3000/messages');
