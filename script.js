const messageModal = document.querySelector('#newMessageDialog');
const messageForm = document.querySelector('#message-form');
const newMessageModalBtn = document.querySelector('#new-message-modal-btn');
const closeModalBtn = document.querySelector('#close-dialog-btn');
const messagesContainer = document.querySelector('#message-container');

async function fetchMessages(messagesEndpoint) {
  const response = await fetch(messagesEndpoint);
  const data = await response.json();

  return data;
}

const createMessageMarkup = (messageObj, messageNum) => {
  const messageMarkup = 
    `<div class="nes-container with-title message-box" id="message-${messageNum}">
      <p class="title">${messageObj.title}</p>
      <p>${messageObj.text}</p>
      <button class="nes-btn is-error is-small" id="delete-message-${messageNum}" onClick="deleteControlsToggle(document.querySelector('#delete-message-${messageNum}'), document.querySelector('#confirm-controls-${messageNum}'))">Delete</button>
      <div class="confirm-controls-container" id="confirm-controls-${messageNum}">
        <button class="nes-btn is-success is-small" id="delete-confirm-${messageNum}" onClick="handleDelete('${messageObj._id}')">Yes</button>
        <button class="nes-btn is-error is-small" id="delete-cancel-${messageNum}" onClick="deleteControlsToggle(document.querySelector('#delete-message-${messageNum}'), document.querySelector('#confirm-controls-${messageNum}'))">No</button>
      </div>
    </div>`;

   return messageMarkup;
}

const deleteControlsToggle = (commenceDeleteBtn, confirmControlsContainer) => {
  if(confirmControlsContainer.style.display !== 'block') {
    confirmControlsContainer.style.display = 'block';
    commenceDeleteBtn.style.display = 'none';
  } else {
    confirmControlsContainer.style.display = 'none';
    commenceDeleteBtn.style.display = 'inline-block';
  }
}

const handleDelete = (id) => {
  fetch(`http://localhost:3000/message/${id}/delete`)
    .then(fetchMessages('http://localhost:3000/messages').then(data => {
      displayMessages(data);
    }));
  }

const displayMessages = (data) => {
  let messageNum = 1;
  let messagesMarkup = '';

  data.forEach(obj => {
    messagesMarkup += createMessageMarkup(obj, messageNum);  
    messageNum++;
  });

  messagesContainer.innerHTML = messagesMarkup;
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

  document.querySelector('#message-form').reset();
   
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

