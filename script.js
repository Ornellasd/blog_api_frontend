const messageForm = document.querySelector('#message-form');
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

    div.classList += 'nes-container with-title';
    title.classList += 'title';

    title.textContent = obj['title'];
    messageText.textContent = obj['text'];

    div.appendChild(title);
    div.appendChild(messageText);
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

  postForm(body);
}

fetchMessages('http://localhost:3000/messages');
messageForm.addEventListener('submit', handleSubmit);
